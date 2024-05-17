<template >
  <footer>
    <p class="title">Тво́рчество</p>
    <div class="item">
      <span class="link">О нас</span>
      <span class="link">О компании</span>
      <span class="link">Отзывы</span>
    </div>
    <div class="item">
      <div class="itemIcon">
        <img :src="iconVk" class="icon" alt="иконка вк"/>
        <img :src="iconTg" class="icon" alt="иконка телеграма"/>
        <p>+7 (433) 320-32-43</p>
      </div>
    </div>
  </footer>
</template>

<script>
import * as images from "../assets/mosaic/index.js"

export default {
  name: "AppFooter",
  data() {
    return {
      iconVk: images.iconVk,
      iconTg: images.iconTg,
    }
  },
}
</script>

<style scoped>

@media screen  and (max-width: 425px) {
  footer {
    display: flex;
    flex-direction: column;
  }
}


footer {
  width: 100%;
  border: var(--color-border);
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  border-radius: 30px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.title {
  font-size: 1.125rem;
  font-weight: bolder;
  padding: 10px;
}

.icon {
  height: 50px;
  margin: 8px;
  cursor: pointer;
}

.itemIcon {
  margin: 5px;
  display: flex;
  align-items: center;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.link {
  padding: 5px;
}
</style>