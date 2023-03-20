<script setup>
import TheHeader from "@/components/TheHeader.vue";
import { ref, reactive } from 'vue';
import ProductCard from "@/components/ProductCard.vue";
//import products from "@/data/products.json";
import { useProductStore } from "./stores/ProductStore";
import { useCartStore } from "./stores/CartStore";
const productStore = useProductStore();
productStore.fill();
const cartStore = useCartStore();
const history = reactive([]);
const future = reactive([]);
const updatingHistory = ref(false);
history.push(JSON.stringify(cartStore.$state));
const redo = ()=> {
  const latestState = future.pop();
  if(!latestState) return;
  updatingHistory.value = true;
  history.push(latestState);
  cartStore.$state = JSON.parse(latestState);
  updatingHistory.value = false;
}
const undo = ()=> {
  if(history.length === 1) return;
  updatingHistory.value = true;
  future.push(history.pop());
  cartStore.$state = JSON.parse(history.at(-1));
  updatingHistory.value = false;
}
cartStore.$subscribe((mutation, state) => {
  if(!updatingHistory.value) {
    history.push(JSON.stringify(state));
    future.splice(0, future.length);
  }
})
cartStore.$onAction(({
  name,
  store,
  args,
  after,
  onError
}) => {
  if (name === 'addItems') {
    after(() => {
      console.log(args[0]);
    });
    onError((error) => {
      console.log("addItems error: ", error.message);
    })
  }
})
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="undo">Undo</AppButton>
      <AppButton class="ml-2" @click="redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
        @addToCart="cartStore.addItems($event, product)" />
    </ul>
  </div>
</template>
