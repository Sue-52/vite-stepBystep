<template>
  <div>
    HomePage
    <div class='box'>{{ $store.state.num }}</div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped lang='scss'>
.box {
  color: $redColor;
}
</style>
