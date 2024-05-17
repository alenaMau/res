<template>
  <section class="wrap registration">
    <p>Регистрация</p>
    <form @submit.prevent="handleSubmit">
    <input
        type="email"
        name="email"
        placeholder="email"
        v-model="formData.email"
        required
    />
    <input
        type="password"
        name="password"
        placeholder="password"
        v-model="formData.password"
        required
    />
      <AppValidate :validate="validation" :formData="formData"  @validation-error="handleValidationError"></AppValidate>
      <span v-if="errorUser" :class="{'invalid':errorUser}">Такой пользователь уже есть</span>
      <span v-if="errorEmail" :class="{'invalid':errorEmail}">Пользователь с таким адресом электронной почты уже зарегистрирован</span>
    <AppButton type="submit">Зарегистрироваться</AppButton>
    </form>
  </section>
</template>

<script>
import AppButton from "../components/AppButton.vue";
import {apps} from "../main.js";
import {getAuth, createUserWithEmailAndPassword,fetchSignInMethodsForEmail} from "firebase/auth";
import {storeToRefs} from "pinia";
import {useUserStore} from "../stores/user.js";
import AppValidate from "../components/AppValidate.vue";

export default {
  components: {AppButton,AppValidate},

  data () {
    return {
      errorUser:'',
      errorEmail:"",
      errors: [],
      formData: {
        email:'',
        password:'',
      },
      validation: {
        email: 'Введите email',
        password: 'Введите password'
      }
    }
  },
  setup() {
    const userStore = storeToRefs(useUserStore())
    const { user } = userStore

    return {
      user
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const userAuth = getAuth(apps)
        const signInMethods = await fetchSignInMethodsForEmail(userAuth, this.formData.email);
        if (signInMethods.length > 0) {
          this.errorEmail = signInMethods.length > 0
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(userAuth, this.formData.email, this.formData.password);
        const userData = userCredential.user;
        localStorage.setItem('userUID', userData.uid);
        this.user = userData;
        this.$router.push({ name: 'main' });
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          this.errorEmail = ''
          this.errorUser = error
        }
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error:', errorMessage,errorCode);
      }
    },
    handleValidationError(errors) {
      console.log(errors);
    }
  }
}

</script>

<style scoped>

.registration {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.invalid {
  color: var(--color-error);
}

p {
  padding: 5px;
  font-weight: bolder;
}

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

input {
  border-radius: 20px;
  border: var( --color-border);
  padding: 20px;
}

</style>