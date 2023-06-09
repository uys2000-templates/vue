import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./registerServiceWorker";
import "./styles/tailwind.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount("body");
