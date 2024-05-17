<template>
  <div class="background" @click="toggleAdd">
    <img :src="add" class="add" alt="Добавление">
    <div @click="addPicture=!addPicture" class="like"></div>
    <transition v-if="addPicture">
      <div class="window">
        <p v-for="folder in folders" :key="folder.key" @click="addingFolder(images,folder)">
          Добавить в папку "{{ folder.name }}"
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import * as images from "../assets/mosaic/index.js";
import AppButton from "../components/AppButton.vue";
import {getDatabase, push, set, ref as path} from "firebase/database";

export default {
  name: "AppAdd",
  components: {AppButton},
  props: {
    images: Object,
    imageUrl: String,
    imageName: String,
    folders: Array,
  },
  data() {
    return {
      addPicture: false,
      add: images.add,
      selectedImage: null,
      selectedFolder: null
    };
  },
  methods: {
    toggleAdd() {
      this.addPicture = !this.addPicture;
    },

    addingFolder(images,folder) {
      const db = getDatabase()
      const pathRef = `folders/${folder.key}/img`
      const foldersRef = path(db, pathRef)
      const newFolderRef = push(foldersRef);
      set(newFolderRef, {
        id: images.id,
        url: images.url,
        name: images.name
      }).then(() => {
        console.log("Папка успешно добавлена");
      }).catch((error) => {
        console.error(error);
      });
    }
  }
};

</script>


<style scoped>
@media screen  and (max-width: 768px) {
  .background {
    min-width: 40px;
  }
}

@media screen  and (max-width: 768px) {
  .background {
    min-width: 40px;
  }
}

@media screen  and (max-width: 475px) {
  .background {
    min-width: 40px;
  }
}

@media screen  and (max-width: 1200px) {
  .background {
    min-width: 40px;
  }
}

p {
  width: 170px;
  padding: 10px;
}


.add {
  position: relative;
  left: 6px;
}

.background {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border: 2px solid #989898;
  display: flex;
  cursor: pointer;
  align-items: center;
  position: relative;
}


@media screen  and (max-width: 768px) {
  .window {
    max-width: 150px;
    right: 70px;
    bottom: 165px;
    left: auto;
  }
}

.window {
  background: #ffffff;
  padding: 20px;
  width: 200px;
  height: fit-content;
  border-radius: 20px;
  border: 2px solid #c6c6c6;
  z-index: 1;
  left: auto;
  position: relative;
}

</style>