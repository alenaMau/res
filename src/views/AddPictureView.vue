<template>
  <p class="text">Если хотите опубликовать свои картинки для других пользователь здесь вы сможете это сделать</p>
  <form @submit.prevent="upload">
    <input type="file" @change="handleFileChange" accept="image/jpeg,image/png">
    <AppButton type="submit">Добавить</AppButton>
    <span v-if="uploading" class="loading">Загрузка...</span>
    <span v-if="errorUser" :class="{'invalid':errorUser}">{{errorUser}}</span>
    <span v-if="done" class="success">Файл загружен</span>
  </form>
</template>
<script>
import {ref, uploadBytes} from "firebase/storage";
import {storage} from "../main.js";
import AppImages from "../components/AppImages.vue";
import AppButton from "../components/AppButton.vue";

export default {
  name: "AddPictureView",
  components: {AppButton, AppImages},
  data() {
    return {
      errorUser:"",
      done:'',
      uploading: false,
    }
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        this.file = file;
        this.errorUser = "";
      } else {
        this.errorUser = "Пожалуйста, выберите файл в формате JPEG или PNG.";
      }
    },
    upload: function () {
      if (!this.file) {
        this.errorUser = "Файл не выбран"
      }
      this.uploading = true;
      this.errorUser = "";
      const storageRef = ref(storage, 'images/' + this.file.name)
      uploadBytes(storageRef, this.file).then(
          (snapshot) => {
            this.done = snapshot
            this.uploading = false;
            this.file = null;
          })
          .catch((error) => {
            this.uploading = false;
            this.errorUser = "Ошибка при загрузке файла: " + error.message;
          });
    }
  }
}
</script>

<style scoped>

@media screen  and (max-width: 768px) {
  p {
    font-size: 1.15rem;
  }
}

@media screen  and (max-width: 768px) {
  input {
    padding: 5px;
  }
}

.invalid {
  color: var(--color-error);
}

form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

input {
  border-radius: 20px;
  border: var(--color-border);
  padding: 15px;
  margin: 10px;
}
input::-webkit-file-upload-button {
  padding: 10px;
  background:var(--color-primary);
  cursor: pointer;
  border-radius: 10px;
  border: none;
  outline: none;
}

.invalid {
  margin: 5px;
  color: red;
}
.loading {
  margin: 5px;
  color: orange;
}
.success {
  margin: 5px;
  color: green;
}


</style>