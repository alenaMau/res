<template>
  <header class="wrap">
    <div class="item">
      <img :src="imgLogo" class="logo" alt="Изображение"/>
      <RouterLink class="title" to="/main">Творчество</RouterLink>
    </div>
    <div class="item_button">
      <AppButton v-if="!isAuth">
        <RouterLink to="/regis">Зарегистрироваться</RouterLink>
      </AppButton>
      <AppButton v-if="!isAuth">
        <RouterLink to="/auth">Войти</RouterLink>
      </AppButton>
      <form @submit.prevent="logout">
        <AppButton type="submit" v-if="isAuth">Выйти</AppButton>
      </form>
      <AppButton v-if="isAuth">
        <RouterLink to="/profile">Профиль</RouterLink>
      </AppButton>
      <AppButton v-if="isAuth">
        <RouterLink to="/main">Главная страница</RouterLink>
      </AppButton>
    </div>
  </header>
</template>

<script>
import * as images from "../assets/mosaic/index.js"
import AppButton from "@/components/AppButton.vue";
import {getAuth, signOut} from "firebase/auth";
import {useUserStore} from "@/stores/user.js";
import {ref, watch} from 'vue';
import {storeToRefs} from "pinia/dist/pinia";
import router from "@/router";
// import router from "@/router";
// import router from "../router/index.js";


export default {
  components: {AppButton},
  data() {
    return {
      imgLogo: images.imgLogo
    }
  },
  setup() {
    const userStore = storeToRefs(useUserStore())
    const { isAuth } = userStore

    return {
      isAuth,
    }
  },
  methods: {
    logout() {
      const user = getAuth();
      if (this.isAuth) {
        signOut(user)
            .then(() => {
              localStorage.removeItem('user');
              this.isAuth = false;
              this.$router.push('/auth');
            })
            .catch((error) => {
              console.error('Error:', error.message);
            });
      } else {
        console.log('Пользователь был не авторизован');
      }
    }
  }
}
</script>

<style scoped>
.title {
  font-weight: bolder;
  font-size: 1.25rem;
}

header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item {
  display: flex;
  flex-flow: row;
  gap: 8px;
  align-items: center;
}

.logo {
  width: 80px;
  height: 80px;
}

@media screen and (max-width: 1200px) {
  .logo {
    width: 40px;
    height: 40px;
  }
}

.item_button {
  padding: 14px 20px;
  display: flex;
  flex-flow: row;
  gap: 8px;
  align-items: center;
}

@media screen and (max-width: 1200px) {
  .item_button {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

@media screen and (max-width: 1200px) {
  .item {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
