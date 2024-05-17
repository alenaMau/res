<template>
  <section class="wrap authorization">
    <p class="">Авторизация</p>
    <form @submit.prevent="handleSubmit">
      <input
          v-model="formData.email"
          name="email"
          placeholder="email"
          type="email"
      />
      <input
          type="password"
          name="password"
          placeholder="password"
          v-model="formData.password"
      />
      <AppValidate :validate="validation" :formData="formData" @validation-error="handleValidationError"></AppValidate>
      <span v-if="errorUser" :class="{'invalid':errorUser}">Данные не верны</span>
      <AppButton type="submit">Войти</AppButton>
    </form>
  </section>
</template>

<script>
import AppButton from "../components/AppButton.vue";
import {apps} from "../main.js";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useUserStore} from "../stores/user.js";
import {storeToRefs} from 'pinia'
import AppValidate from "../components/AppValidate.vue";
import router from "../router/index";

export default {
  components: {AppValidate, AppButton},
  setup() {
    const userStore = storeToRefs(useUserStore())
    const {user} = userStore

    return {
      user,
    }
  },
  data() {
    return {
      errorUser: '',
      errors: [],
      formData: {
        email: '',
        password: '',
      },
      validation: {
        email: 'Введите email',
        password: 'Введите password'
      }
    }
  },
  methods: {
    handleSubmit() {
      const userAuth = getAuth(apps)
      signInWithEmailAndPassword(userAuth, this.formData.email, this.formData.password).then((res) => {
        const userData = res.user;
        localStorage.setItem('userUID', userData.uid);
        this.user = userData;
        console.log(this.user)
        router.push('/main');
      }).catch((error) => {
            this.errorUser = error.message
      })
    },
    handleValidationError(errors) {
      console.log(errors);
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  border: #e0e0e0 2px solid;
  width: fit-content;
  padding: 30px;
  height: fit-content;
}

.authorization {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  padding: 5px;
  font-weight: bolder;
}

.invalid {
  color: var(--color-error);
}

input {
  border-radius: 20px;
  border: var(--color-border);
  padding: 20px;
}
</style>