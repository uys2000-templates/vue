import { Capacitor } from "@capacitor/core";

export const getPlatform = () => {
  return Capacitor.getPlatform();
};
