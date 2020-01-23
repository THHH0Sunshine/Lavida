<template>
  <div class="wrapper">
    <div class="dice">
      <div class="number" :style="diceUpperStyle">{{upper}}</div>
      <div class="number" :class="{emphasized}" :style="diceLowerStyle">{{lower}}</div>
    </div>
    <el-button class="button" @click="stop=true">STOP</el-button>
    <div v-if="basic==null" class="bonus">
      奖励骰子 <el-switch v-model="bonus"></el-switch>
    </div>
    <div v-else class="bonus">
      基础点数：{{basic}}
    </div>
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
      position: 0,
      emphasized: false,
      bonus: false,
      basic: null
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
  beforeDestroy() {
    if (this.timer != null) {
      clearInterval(this.timer)
    }
  },
  methods: {
    nextFrame() {
      if (this.stop) {
        if (this.interval < 40) {
          clearInterval(this.timer)
          this.timer = setInterval(() => this.nextFrame(), this.interval += 1)
        } else if (!this.position) {
          clearInterval(this.timer)
          this.timer = null
          if (this.bonus) {
            if (this.basic == null) {
              this.emphasize(() => {
                this.basic = this.lower
                this.upper = this.lower = 0
                this.stop = false
                this.interval = 1
                this.timer = setInterval(() => this.nextFrame(), this.interval)
              })
            } else {
              this.emphasize(() => this.$emit('result', this.basic - this.lower))
            }
          } else {
            this.emphasize(() => this.$emit('result', this.lower))
          }
          return
        }
      }
      if ((this.position += 4) >= 100) {
        this.position = 0
        let len = this.basic == null ? this.len : 6
        let min = this.basic == null ? this.min : 1
        let next = Math.floor(Math.random() * len) + min
        this.lower = this.upper
        this.upper = next
      }
    },
    emphasize(then) {
      this.emphasized = true
      this.timer = setInterval(() => {
        clearInterval(this.timer)
        this.timer = null
        this.emphasized = false
        then()
      }, 1000)
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
  transition: transform 0.2s;
}

.emphasized {
  transform: scale(2, 2);
}

.button,
.bonus {
  margin-top: 10px;
  font-size: 13px;
}
</style>
