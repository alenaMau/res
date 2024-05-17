<template>
  <div class="item">
    <AppButton>
      <RouterLink to="/addPicture">Добавить картинку</RouterLink>
    </AppButton>
    <AppButton>
      <RouterLink to="/editingProfile">Сменить пароль</RouterLink>
    </AppButton>
  </div>
  <div class="favorite-item">
    <AppFavorites></AppFavorites>
  </div>
  <div class="folder-item">
    <AppFolder></AppFolder>
  </div>
</template>

<script>
import AppButton from "../components/AppButton.vue";
import * as images from "../assets/mosaic/index.js"
import AppFolder from "../components/AppFolder.vue";
import AppFavorites from "../components/AppFavorites.vue";

export default {
  name: "ProfileView",
  components: {AppFavorites, AppFolder, AppButton},
  data() {
    return {
      folderImages: images.folder,
      folderName: 'Название папки'
    }
  },
}
</script>

<style scoped>
.item {
  gap: 15px;
  display: flex;
  padding: 20px;
}

.favorite-item {
  display: flex;
  flex-wrap: wrap;
}
.folder-item {
  display: flex;
  flex-wrap: wrap;
}
</style>