<template>
  <section class="wrap profile">
    <p>Сменить пароля</p>
    <form  @submit.prevent="updateUserData()">
      <input
          type="password"
          name="newPassword"
          placeholder="Введите новый пароль"
          v-model="formData.newPassword"
      />
      <AppValidate :validate="validation" :formData="formData"  @validation-error="handleValidationError"></AppValidate>
      <span v-if="completed" :class="{'completed':completed}">Пароль изменен</span>
      <AppButton type="submit" >Войти</AppButton>
    </form>
  </section>
</template>

<script>
import {getAuth,updatePassword } from "firebase/auth";
import AppButton from "../components/AppButton.vue";
import {useUserStore} from "../stores/user.js";
import AppValidate from "../components/AppValidate.vue";

export default {
  components: {AppButton,AppValidate},
  name: "EditingProfileView",
  data() {
    return {
      completed:'',
      formData: {
        newPassword: '',
      },
      validation: {
        newPassword: 'Введите new password'
      }
    }
  },
  setup() {
    const userStore = useUserStore();
    const auth = getAuth();
    const uid = userStore.user?.uid;
    const user = userStore.user
    return {
      auth,
      uid,
      user
    }
  },
  methods: {
    updateUserData() {
      if (this.formData.newPassword) {
        updatePassword(this.auth.currentUser, this.formData.newPassword).then(() => {
          this.completed = "Пароль успешно обновлен"
          this.formData.newPassword = "";
        }).catch((error) => {
          console.error("Ошибка при обновлении пароля:", error);
        });
      }
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

.completed {
  color: var(--color-completed);
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  padding: 5px;
  font-weight: bolder;
}

input {
  border-radius: 20px;
  border: var(--color-border);
  padding: 20px;
}
</style>