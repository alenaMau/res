<template>
  <div class="background" @click="toggleLike(images)">
    <div class="like" :class="{ active: like }"></div>
    <img v-if="!like" :src="likesNone" class="liked-image" alt="likeNone">
    <transition name="fade">
      <img v-if="like" :src="likes" class="liked-image" alt="like">
    </transition>
  </div>
</template>

<script>
import * as image from "../assets/mosaic/index.js"
import {getDatabase, push, set, ref as path, query, orderByChild, equalTo, get} from "firebase/database";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia/dist/pinia";

export default {
  name: "AppLike",
  props: {
    images: Object,
  },
  setup() {
    const userStore = useUserStore();
    const { user }  = storeToRefs(userStore);

    return {
      user
    }
  },
  data() {
    return {
      like: false,
      likes: image.likes,
      likesNone: image.likesNone,
    }
  },
  mounted() {
    const db = getDatabase();

    const favoriteRef = path(db, 'favorites');
    const queryRef = query(favoriteRef, orderByChild('userUID'), equalTo(this.user?.uid));
    get(queryRef).then(snapshot => {
      snapshot.forEach(childSnapshot => {
        const data = childSnapshot.val();
        if (data.id === this.images.id) {
          this.like = true;
          this.key = childSnapshot.key;
        }
      });
    }).catch(error => {
      console.error("Ошибка при получении данных из базы данных:", error);
    });
  },
  methods: {
    toggleLike(images) {
      this.addFavorites(images);
      this.like = !this.like;
    },
    addFavorites(images) {
      const db = getDatabase()
      if (!this.like) {
        const favoriteRef = path(db, "favorites")
        const newFavoriteRef = push(favoriteRef)
        set(newFavoriteRef, {
          id: images.id,
          url: images.url,
          name: images.name,
          userUID: this.uid,
        }).then(() => {
          const key = newFavoriteRef.key
          this.key = key;
        }).catch((error) => {
          console.error(error);
        });
      } else {
        const favoriteRefDelete = path(db, `favorites/${this.key}`)
        set(favoriteRefDelete, null).then(() => {
          console.log("Лайк успешно удален");
        }).catch((error) => {
          console.error("Ошибка при удалении лайка:", error);
        });
      }
    }
  }
}
</script>


<style scoped>
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

.background {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border: 2px solid #989898;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.like {
  width: 20px;
  height: 20px;
}


.liked-image {
  width: 65%;
  position: relative;
  right: 6px;
}
</style>
