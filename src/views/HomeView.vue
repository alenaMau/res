<script>
import * as images from "../assets/mosaic/index.js"
import AppBackground from "../components/AppBackground.vue";
import AppButton from "../components/AppButton.vue";


export default {
  components: {AppBackground, AppButton},
  data() {
    return {
      imgCatWrite: images.imgCatWrite,
      imgGreenWoman: images.imgGreenWoman,
      imgCat: images.imgCat,
      imgMosaic: images.imgMosaic,
      imgRoomWithOpenworkWindow: images.imgRoomWithOpenworkWindow,
      imgDrawnFox: images.imgDrawnFox,
      imgGirlWithFlowers: images.imgGirlWithFlowers,
      imgWomanInKimano: images.imgWomanInKimano,
      imgCatMosaic: images.imgCatMosaic,
      imgGirlPoster: images.imgGirlPoster,
      imgPaintedWomanBackgroundOfOranges: images.imgPaintedWomanBackgroundOfOranges,
      imgRoomWithForest: images.imgRoomWithForest,
      imgHand: images.imgHand,
      imgPosterChroma: images.imgPosterChroma,
      imgBackgroundStrawberry: images.imgBackgroundStrawberry,
      imgCatBackgroundOfFlowers: images.imgCatBackgroundOfFlowers,
      imgPosterWomanPosing: images.imgPosterWomanPosing,
      imgBackgroundOfDaisies: images.imgBackgroundOfDaisies,
    }
  },

}
</script>
<template>
  <section class="wrap center">
    <h1 class="title">Найдите свежие идеи</h1>
    <div class="row">
      <div class="column">
        <img :src="imgCatWrite" class="pictures" alt="Изображение"/>
        <img :src="imgMosaic" class="pictures" alt="Image 1">
        <img :src="imgRoomWithOpenworkWindow" class="pictures"/>
      </div>
      <div class="column">
        <img :src="imgDrawnFox" class="pictures"/>
        <img :src="imgGirlWithFlowers" class="pictures"/>
        <img :src="imgWomanInKimano" class="pictures"/>
      </div>
      <div class="column">
        <img :src="imgCatMosaic" class="pictures"/>
        <img :src="imgGirlPoster" class="pictures"/>
      </div>
      <div class="column">
        <img :src="imgPaintedWomanBackgroundOfOranges" class="pictures"/>
        <img :src="imgRoomWithForest" class="pictures"/>
      </div>
      <div class="column">
        <img :src="imgHand" class="pictures"/>
        <img :src="imgPosterChroma" class="pictures"/>
        <img :src="imgBackgroundStrawberry" class="pictures"/>
      </div>
      <div class="column">
        <img :src="imgCatBackgroundOfFlowers" class="pictures"/>
        <img :src="imgPosterWomanPosing" class="pictures"/>
        <img :src="imgBackgroundOfDaisies" class="pictures"/>
      </div>
    </div>
    <AppBackground>
      <section class="row">
        <div class="item">
          <p class="text">
            Просмотрите, сделайте, опробуйте и примерьте<br>
            В Pinterest вы можете находить для себя новые увлечения и идеи со всего мира.
          </p>
          <p class="text">
            Найдите идею<br>
            Что еще вы хотите опробовать? Придумайте запрос на интересующую тему,
            например «простые блюда из курицы на ужин», и просмотрите результаты.
          </p>
          <p class="text">
            Сохраняйте понравившиеся идеи<br>
            Сохраняйте понравившиеся идеи, чтобы вернуться к ним в будущем.
          </p>
        </div>
        <div class="item">
          <p class="text">
            Просмотрите, сделайте, опробуйте и примерьте<br>
            В Pinterest вы можете находить для себя новые увлечения и идеи со всего мира.
          </p>
          <p class="text">
            Найдите идею<br>
            Что еще вы хотите опробовать? Придумайте запрос на интересующую тему,
            например «простые блюда из курицы на ужин», и просмотрите результаты.
          </p>
          <p class="text">
            Сохраняйте понравившиеся идеи<br>
            Сохраняйте понравившиеся идеи, чтобы вернуться к ним в будущем.
          </p>
        </div>
      </section>
    </AppBackground>
    <AppBackground background-color="var(--color-background-consideration)">
      <div class="row_form">
        <div class="form">
          <span class="title_form">Добро пожаловать в Тво́рчество!</span>
          <span class="description">Находите новые идеи для вдохновения</span>
          <div class="item_button">
            <AppButton disabled>
              <RouterLink to="/regis">Зарегистрироваться</RouterLink>
            </AppButton>
            <AppButton disabled>
              <RouterLink to="/auth">Войти</RouterLink>
            </AppButton>
          </div>
          <span class="conditions">Продолжая, вы соглашаетесь с Условиями предоставления услуг и Политике конфиденциальности  </span>
        </div>
        <img :src="imgGreenWoman" alt="imgGreenWoman" class="pictures_from">
      </div>
    </AppBackground>
  </section>
</template>

<style scoped>
.description {
  text-align: center;
  width: 222px;
  font-size: 1.25rem;
}

@media screen  and (max-width: 320px) {
  .description {
    max-width: 125px;
    font-size: medium;
  }
}


.form {
  align-items: center;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  max-width: 455px;
  max-height: 680px;
  border-radius: 20px;
  justify-content: center;
  gap: 66px;
  left: 35px;
  position: relative;
}

@media screen  and (max-width: 768px) {
  .form {
    padding-left: 10px;
    padding-right: 10px;
    background: none;
    gap: 98px;
  }
}

@media screen  and (max-width: 1024px) {
  .form {
    background: none;
    margin-left: 29px;
    max-width: 128%;
  }
}

@media screen  and (max-width: 320px) {
  .form {
    max-width: 150px;
  }
}

@media (min-width: 320px) and (max-width: 425px) {
  .conditions {
    max-width: 158px;
    font-size: xx-small;
    min-height: 94px;
  }
}


@media (min-width: 425px)  and (max-width: 768px) {
  .conditions {
    max-width: 250px;
  }
}

.center {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.title_form {
  text-align: center;
  font-size: 1.875rem;
  font-weight: 500;
  max-width: 290px;
  max-height: 97px;
}

@media screen  and (max-width: 320px) {
  .title_form {
    font-size: x-large;
  }
}


.conditions {
  text-align: center;
  width: 351px;
  height: 69px;
  color: #cccccc;
}

.item_button {
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.item {
  display: flex;
  gap: 30px;
  flex-direction: column;
  padding: 20px;
  max-width: 100%;
  flex-flow: wrap;
  height: fit-content;
  border-radius: 48px;
}

.pictures {
  max-width: 200px;
  min-width: 200px;
  border-radius: 15px;
}

@media screen and (max-width: 1200px) {
  .pictures {
    max-height: 100%;
  }
}


@media screen and (max-width: 1200px) {
  .item {
    padding: 0;
    font-size: large;
  }
}

@media screen and (max-width: 1200px) {
  .pictures_from {
    display: none;
  }
}

.pictures_from {
  max-width: 405px;
  border-radius: 20px;
}

.row_form {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-left: 110px;
  padding-right: 110px;
}

@media screen and (max-width: 1200px) {
  .row_form {
    display: flex;
    flex-direction: column;
    max-width: 64%;
    font-size: 1rem;
    padding: 0;
  }
}

.row {
  gap: 15px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

@media screen and (max-width: 1200px) {
  .row {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
  }
}

.title {
  font-size: 1.875rem;
  font-weight: bolder;
  margin: 15px;
  display: flex;
  justify-content: center;
}

.column {
  display: flex;
  gap: 15px;
  flex-direction: column;
}

</style>


