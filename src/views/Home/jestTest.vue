<template>
  <div>
    <h1 class="div">Vue app</h1>
    <h2>Count: {{ count }}</h2>
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "jestTest",
  setup() {
    let count = ref(0);
    function increment() {
      count.value++;
    }
    return {
      count,
      increment,
    };
  },
});
</script>
