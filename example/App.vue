<template lang="html">
  <div class="pa5 flex flex-column">
    <select v-model="orientation">
      <option value="horizontal">horizontal</option>
      <option value="vertical">vertical</option>
    </select>
    <select v-model="loop">
      <option :value="true">loop</option>
      <option :value="false">no loop</option>
    </select>
    <select v-model="sliderSize">
      <option value="-small">small</option>
      <option value="-big">big</option>
    </select>
    <!-- <div class="flex w-100">

      <VirtualViewport
        :per-page="3"
        :index="index">
        <div
          v-for="i in 10"
          :key="i"
          class="items pa3 tc black b ba flex-auto">
          {{ i }}
        </div>
      </VirtualViewport>
    </div> -->
    <Slider
      ref="slider"
      :per-page="3"
      :orientation="orientation"
      :loop="loop"
      :class='sliderSize'
      class="slider flex">
      <div
        v-for="i in 10"
        :key="i"
        class="items pa3 tc white b bg-blue">
        {{ i }}
      </div>
    </Slider>
  </div>
</template>

<script>
import VirtualViewport from '@/VirtualViewport'
export default {
  components: {
    VirtualViewport
  },
  data () {
    return {
      orientation: 'horizontal',
      index: 0,
      loop: false,
      sliderSize: '-small'
    }
  },
  mounted () {
    window.addEventListener('keydown', (e) => {
      const key = e.key
      if (key === 'ArrowLeft') this.$refs.slider.prev()
      if (key === 'ArrowRight') this.$refs.slider.next()
    })
  }
}
</script>

<style lang="css">

.slider.-small .items{
  height: 100px;
  /* width: 100px; */
}
.slider.-big .items{
  height: 200px;
  /* width: 200px; */
}

</style>
