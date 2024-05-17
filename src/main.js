import './assets/main.css'
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import {getStorage} from "firebase/storage"
import {getAuth } from "firebase/auth";
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const firebaseConfig = {
        apiKey: "AIzaSyD_k_hizUjEyT6eFVXw92X8hR9JMWlM7Ms",
        authDomain: "platform-de513.firebaseapp.com",
        databaseURL: "https://platform-de513-default-rtdb.firebaseio.com",
        projectId: "platform-de513",
        storageBucket: "platform-de513.appspot.com",
        messagingSenderId: "94324169690",
        appId: "1:94324169690:web:be1d15c54fde796aeefee3"
}
const apps = initializeApp(firebaseConfig);
const storage = getStorage(apps)
const auth = getAuth(apps)
const app = createApp(App)


const database = getDatabase(apps);
app.use(router)
app.use(createPinia())
app.mount('#app')
export {database,storage,auth,apps }
