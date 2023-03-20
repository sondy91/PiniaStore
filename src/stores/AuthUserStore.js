import { defineStore, acceptHMRUpdate } from "pinia";
export const useAuthUserStore = defineStore("authUserStore", { 
  state: () => {
    return {
      username: "asonderman"
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot));
}