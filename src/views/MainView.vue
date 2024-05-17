<template>
  <div id="api">
    <div class="image-container wrap" v-for="image in images" :key="image.name">
      <img :src="image.url" alt="Image">
      <div class="item">
        <AppLike v-if="image.url" :imageId="image.url" :imageName="image.name" :images="image"></AppLike>
        <AppAdd :images="image" :imageUrl="image.url" :imageName="image.name" :folders="folders"></AppAdd>
      </div>
    </div>
  </div>
</template>

<script>
import AppLike from "../components/AppLike.vue";
import AppAdd from "../components/AppAdd.vue";
import AppButton from "../components/AppButton.vue";
import {ref, listAll, getDownloadURL,} from "firebase/storage";
import {storage} from "../main.js";
import {get, getDatabase, ref as path} from "firebase/database";
import {useUserStore} from "../stores/user.js";

export default {
  name: "MainView",
  components: {AppButton, AppLike, AppAdd},
  element: "#api",

  setup() {
    const userStore = useUserStore();
    const uid = userStore.user?.uid;
    return {
      uid
    }
  },
  data() {
    return {
      images: [],
      selectedImage: null,
      folders: [],
    }
  },

  async created() {
    try {
      const storageRef = ref(storage, 'images')
      const files = await listAll(storageRef)
      const urls = await Promise.all(files.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return {name: item.name, url, id: item.fullPath};
      }));
      this.images = urls;
      await this.loadUserFolders()
    } catch (error) {
      console.log(error)
    }
  },

  methods: {
    async loadUserFolders() {
      const db = getDatabase()
      const foldersRef = path(db, "folders")
      get(foldersRef)
          .then(snapshot =>
              snapshot.forEach(childSnapshot => {
                const folder = childSnapshot.val();
                const key = childSnapshot.ref.key
                folder.key = key
                if (folder.userUID === this.uid) {
                  this.folders.push(folder);
                }
              })
          )
    },
  },
}
</script>

<style scoped>

@media screen  and (max-width: 768px) {
  .image-container {
    width: 200px;
  }
}

@media screen  and (max-width: 768px) {
  #api {
    margin: 10px;
    display: flex;
    flex-direction: column;
    padding-right: 127px;
    align-content: center;
  }
}

@media screen  and (max-width: 1200px) {
  #api {
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-content: center;
    padding-right: 138px;
  }
}

@media screen  and (max-width: 475px) {
  #api {
    margin: 10px;
    display: flex;
    flex-direction: column;
  }
}

@media screen  and (max-width: 768px) {
  .item {
    display: flex;
    flex-direction: column;
    gap: 125px;
  }
}

@media screen  and (max-width: 768px) {
  .image-container img {
    max-width: 240px;
    height: 250px;
  }
}

#api {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.image-container {
  width: calc(18% - 10px);
  margin: 5px;
  flex-grow: 0;
}

.image-container img {
  width: 200px;
  height: 250px;
  border-radius: 20px;
  object-fit: cover;
}

.item {
  display: flex;
  flex-direction: row;
  gap: 120px;
}
</style>