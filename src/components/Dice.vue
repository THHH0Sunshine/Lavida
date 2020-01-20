<template>
  <div class="wrapper">
    <div class="dice">
      <div class="number" :style="diceUpperStyle">{{upper}}</div>
      <div class="number" :style="diceLowerStyle">{{lower}}</div>
    </div>
    <el-button class="button" @click="stop=true">STOP</el-button>
  </div>
</template>

<script>
export default {
  props: {
    min: Number,
    max: Number
  },
  data() {
    return {
      upper: 0,
      lower: 0,
      stop: false,
      timer: null,
      interval: 1,
      position: 0
    }
  },
  computed: {
    len() {
      return this.max - this.min + 1
    },
    diceUpperStyle() {
      return { top: this.position - 100 + '%' }
    },
    diceLowerStyle() {
      return { top: this.position + '%' }
    }
  },
  mounted() {
    this.timer = setInterval(() => this.nextFrame(), this.interval)
  },
  methods: {
    nextFrame() {
      if (this.stop) {
        if (this.interval < 40) {
          clearInterval(this.timer)
          this.timer = setInterval(() => this.nextFrame(), this.interval += 1)
        } else if (!this.position) {
          clearInterval(this.timer)
          this.$emit('result', this.lower)
          return
        }
      }
      if ((this.position += 4) >= 100) {
        this.position = 0
        let next = Math.floor(Math.random() * this.len) + this.min
        this.lower = this.upper
        this.upper = next
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100px;
}

.dice {
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 10px;
  border: 2px solid gray;
}

.number {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: wheat;
  font-size: 50px;
  line-height: 100px;
  text-align: center;
}

.button {
  margin-top: 10px;
}
</style>
