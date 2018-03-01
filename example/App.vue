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
    <h1>Default</h1>
    <div class="slider-container">

      <Slider
        :current="index"
        :per-page="3"
        :orientation="orientation"
        :loop="loop"
        :class="sliderSize"
        class="slider flex">
        <div
          v-for="i in 10"
          :key="i"
          class="items pa3 tc white b bg-blue">
          {{ i }}
        </div>
      </Slider>
      <!-- <Slider
          :current="index"
          :per-page="4"
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
      <Slider
          :current="index"
          :per-page="5"
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
      </Slider> -->
    </div>

    <h1>Autosize</h1>
    <Slider
      :current="index"
      :per-page="3"
      :orientation="orientation"
      :loop="loop"
      :class="sliderSize"
      :auto-size="true"
      class="sliderautosized flex">
      <div
        v-for="i in 10"
        :key="i"
        class="items pa3 tc white b bg-blue">
        {{ i }}
      </div>
    </Slider>

    <h1>Clone</h1>
    <div class="slider-container">
      <Slider
        :current="index"
        :per-page="4"
        :orientation="orientation"
        :loop="loop"
        :clone="true"
        :class="sliderSize"
        class="slider flex">
        <div
          v-for="i in 2"
          :key="i"
          class="items pa3 tc white b bg-blue">
          {{ i }}
        </div>
      </Slider>
    </div>
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
      if (key === 'ArrowLeft') this.index--
      if (key === 'ArrowRight') this.index++
    })
  }
}
</script>

<style lang="css">

.slider-container{
  height: 100px;
  width: 100%;
}
.slider.-small .items{
  height: 100px;
  /* width: 100px; */
}
.slider.-big .items{
  height: 200px;
  /* width: 200px; */
}

</style>
