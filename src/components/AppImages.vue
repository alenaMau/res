<template>
<img :src="url" alt=""/>
</template>

<script>
import {ref,getDownloadURL} from "firebase/storage";
import {storage} from "../main.js";
export default {
  name: "AppImages",
  props: {
    path:String,
  },
  data:()=> {
    return{
      url:'',
    }
  },
  mounted() {
    getDownloadURL(ref(storage,this.path)).then(
        (download_url) => (this.url = download_url)
    )
  }
}
</script>

<style scoped>

</style>