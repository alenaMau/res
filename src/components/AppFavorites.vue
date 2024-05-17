<template>
  <div class="favorite">
    <img :src="folderImage" class="folders" alt="Папка" @click="toggleFolder()">
    <p class="name">Избранные</p>
  </div>
  <transition v-if="clickFolder">
    <div class="folder-images">
      <img v-for="(favorite, index) in folderImages" :key="index" :src="favorite.url" :alt="favorite.name"
           class="folder-image">
    </div>
  </transition>
</template>

<script>
import * as image from "../assets/mosaic";
import {equalTo, get, getDatabase, orderByChild, query, ref} from "firebase/database";
import {useUserStore} from "../stores/user.js";

export default {
  name: "AppFavorites",
  props: {
    favorite: {
      type: Array
    },
  },
  setup() {
    const userStore = useUserStore();
    const uid = userStore.user?.uid;
    return {
      uid
    }
  },
  data() {
    return {
      folderImages: [],
      folderImage: image.folder,
      clickFolder: false
    }
  },
  methods: {
    toggleFolder() {
      if (!this.clickFolder) {
        this.loadFavoritesImages();
      }
      this.clickFolder = !this.clickFolder;
    },

    loadFavoritesImages() {
      const db = getDatabase();
      const favoriteRef = ref(db, 'favorites');
      const queryRef = query(favoriteRef, orderByChild('userUID'), equalTo(this.uid));
      get(queryRef).then(snapshot => {
        this.folderImages = [];
        snapshot.forEach(childSnapshot => {
          const favorite = childSnapshot.val();
          console.log(childSnapshot.val())
          favorite.key = childSnapshot.key
          this.folderImages.push(favorite)
        });
      }).catch(error => {
        console.error("Ошибка при получении данных из базы данных:", error);
      });
    },
  },
}
</script>

<style scoped>
.folders {
  width: 150px;
  height: 150px;
  cursor: pointer;
}

.folder-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
}

.favorite {
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: fit-content;
}

.folder-image {
  padding: 10px;
  width: 200px;
  height: 250px;
  border-radius: 20px;
  object-fit: cover;
}

.name {
  display: flex;
  justify-content: center;
  cursor: pointer;
}
</style>