import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { setULogger } from "u-logger";

const app = createApp(App);
setULogger(true);

app.use(createPinia());
app.use(router);

app.mount("#app");

declare global {
  interface Window {
    lang: string;
  }
}
