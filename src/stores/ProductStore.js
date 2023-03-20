import { defineStore } from "pinia";
export const useProductStore = defineStore("ProductStore", {
  // state
  state: () => {
    return {
      //products, //using Javascripts object-property shorthand same as products: products
      products: []
    }
  },
  // actions
  actions: {
    async fill() {
      this.products = (await import("@/data/products.json")).default;
      // this.proucts = (await axios.get("/some/end/point")).data;
    }
  },
  // getters
});