<template>
  <div class="wrapper">
    <b class="tag">{{name}}</b>
    <el-popover v-if="editable" trigger="hover">
      <el-input class="hover-input" v-model="input" type="number" :min="1"></el-input>
      <el-button class="hover-button" size="mini" icon="el-icon-minus" circle @click="plus(-input)"></el-button>
      <el-button class="hover-button" size="mini" icon="el-icon-s-promotion" circle @click="diceOpen(input*1,true)"></el-button>
      <el-button slot="reference" size="mini" icon="el-icon-minus" circle @click="plus(-1)"></el-button>
    </el-popover>
    <b class="value" :style="{color:valueColor}">{{value==null?'--':value}}{{max==null?'':'/'+max}}</b>
    <el-popover v-if="editable" trigger="hover">
      <el-input class="hover-input" v-model="input" type="number" :min="1"></el-input>
      <el-button class="hover-button" size="mini" icon="el-icon-plus" circle @click="plus(input*1)"></el-button>
      <el-button class="hover-button" size="mini" icon="el-icon-s-promotion" circle @click="diceOpen(input*1,false)"></el-button>
      <el-button slot="reference" size="mini" icon="el-icon-plus" circle @click="plus(1)"></el-button>
    </el-popover>
    <el-dialog :visible.sync="dialog" width="30%" @closed="diceClose">
      <div class="check">
        <dice v-if="dice" :min="1" :max="dice.max" @result="diceFinish"></dice>
        <b v-if="diceResult!=null" class="check-text" :style="{color:diceResultColor}">{{diceResult.old}} -> {{value}}</b>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Dice from './Dice'

export default {
  components: {
    Dice
  },
  props: {
    name: String,
    value: Number,
    max: Number,
    constant: Boolean
  },
  data() {
    return {
      input: '1',
      dialog: false,
      dice: null,
      diceResult: null
    }
  },
  computed: {
    editable() {
      return !this.constant && this.value != null
    },
    valueColor() {
      if (this.value == null) {
        return 'red'
      }
      if (this.max == null) {
        if (this.value <= 0) {
          return 'red'
        }
        return 'green'
      } else {
        let vp = this.value / this.max
        if (vp < 0.3) {
          return 'red'
        }
        if (vp < 0.7) {
          return 'orange'
        }
        return 'green'
      }
    },
    diceResultColor() {
      return this.dice.minus ? 'red' : 'green'
    }
  },
  methods: {
    plus(num) {
      let cur = this.value * 1 + num
      if (this.max != null && cur > this.max) {
        cur = this.max
      }
      this.$emit('input', cur)
    },
    diceOpen(max, minus) {
      this.dialog = true
      this.dice = { max, minus }
    },
    diceFinish(e) {
      this.diceResult = {
        old: this.value,
        delta: e
      }
      let cur = this.value * 1 + e * (this.dice.minus ? -1 : 1)
      if (this.max != null && cur > this.max) {
        cur = this.max
      }
      this.$emit('input', cur)
    },
    diceClose() {
      this.dice = null
      this.diceResult = null
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
}

.tag {
  border: 1px solid gray;
  border-left: none;
  border-right: none;
  padding: 4px;
  margin-right: 10px;
}

.value {
  padding: 0 10px;
}

.hover-input {
  width: 105px;
}

.hover-button {
  margin-left: 15px;
}

.check {
  display: flex;
  align-items: center;
}

.check-text {
  font-size: 50px;
  flex-grow: 1;
  text-align: center;
}
</style>
