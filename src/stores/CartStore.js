import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    }
  },
  getters: {
    count() {
      return this.items.length;
    },
    isEmpty() {
      return this.count === 0;
    }
  }
});