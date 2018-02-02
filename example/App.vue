<template lang="html">
  <div class="pa5 flex flex-column">
    <Slider ref="slider" :per-page="3">
      <div v-for="i in 10" class="items pa3 tc white b" :class="{ 'bg-red': i%2, 'bg-blue': !(i%2) }">
        {{ i }}
      </div>
    </Slider>
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key === "ArrowLeft") this.$refs.slider.prev()
      if (key === "ArrowRight") this.$refs.slider.next()
    })
  }
}
</script>

<style lang="css">
.items {
  height: 20vh;
}
</style>
