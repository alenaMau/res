<template>
  <div>
    <form @submit.prevent="createFolder">
      <input v-model="folderName" type="text" placeholder="Введите имя папки">
      <AppButton type="submit">Создать папку</AppButton>
    </form>
    <div class="folder">
      <div v-for="(folder, key) in folders" :key="key" class="column">
        <img :src="folderImage" class="folders" alt="Папка" @click="redirectToFolder(folder.key)">
        <p class="name">{{ folder.name }}</p>
      </div>
    </div>
    <div class="folder-images">
      <div v-if="typeof folderImages === 'string'">
        <p class="images">{{ folderImages }}</p>
      </div>
      <div v-else>
        <img v-for="(image, index) in folderImages" :key="index" :src="image.url" :alt="image.name"
             class="folder-image">
      </div>
    </div>
  </div>
</template>

<script>
import * as images from "@/assets/mosaic";
import AppButton from "../components/AppButton.vue";
import {equalTo, get, getDatabase, orderByChild, push, query, ref as path, ref} from "firebase/database";
import {useUserStore} from "@/stores/user.js";

export default {
  components: {AppButton},
  setup() {
    const userStore = useUserStore();
    const uid = userStore.user?.uid;
    return {
      uid
    }
  },
  data() {
    return {
      error:'',
      folderImages: false,
      folderImage: images.folder,
      folderName: '',
      folders: [],
      selectedImage: '',
      noImagesText: ""
    }
  },
  created() {
    this.loadUserFolders()
  },
  methods: {
    createFolder() {
      const newFolderName = this.folderName.trim();
      const db = getDatabase();
      const folderData = {name: newFolderName, userUID: this.uid};
      if (newFolderName) {
        const foldersRef = ref(db, 'folders');
        push(foldersRef, folderData)
            .then((newFolderRef) => {
              folderData.id = newFolderRef.key;
              this.folders.push(folderData);
              this.folderName = '';
            })
            .catch(error => {
              console.error('Ошибка при сохранении папки в базе данных:', error);
            });
      } else {
        alert('Пожалуйста, введите имя папки');
      }
    },
    async redirectToFolder(key, folder) {
      this.folderImages = !this.folderImages
      await this.loadFolderImages(key)
      this.$router.push({name: 'folder', params: {key}});
    },
    async loadFolderImages(key, folder) {
      const db = getDatabase();
      const pathRef = `folders/${key}/img`;
      const foldersRef = path(db, pathRef);
      this.$router.push({name: 'folder', params: {key}});
      try {
        const snapshot = await get(foldersRef);
        if (snapshot.exists()) {
          const images = snapshot.val();
          this.folderImages = Object.values(images);
        } else {
          this.noImagesText = 'Изображений в папке нет'
          this.folderImages = this.noImagesText
        }
      } catch (error) {
        console.error("Ошибка при получении изображений из папки:", error);
        this.folderImages = [];
      }
    },
    loadUserFolders() {
      const db = getDatabase();
      const foldersRef = ref(db, 'folders');
      const queryRef = query(foldersRef, orderByChild('userUID'), equalTo(this.uid));
      get(queryRef).then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const folder = childSnapshot.val();
          folder.key = childSnapshot.key;
          this.folders.push(folder);
        });
      }).catch(error => {
        console.error("Ошибка при получении данных из базы данных:", error);
      });
    },
  }
}

</script>


<style scoped>

.folder {
  display: flex;
  flex-wrap: wrap;
}

form {
  padding: 20px;
  display: flex;
  gap: 15px;
}

@media screen  and (max-width: 344px)  {
  form {
    flex-direction: column;
  }
}


.column {
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  flex-grow: 1;
}

.folders {
  width: 150px;
  height: 150px;
  cursor: pointer;
}

.name {
  display: flex;
  justify-content: center;
  cursor: pointer;
}

input {
  border-radius: 20px;
  border: var(--color-border);
  padding: 15px;
}

.folder-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.folder-image {
  padding: 10px;
  width: 200px;
  height: 250px;
  border-radius: 20px;
  object-fit: cover;
}

.images {
  color: var(--color-card);
}
</style>
