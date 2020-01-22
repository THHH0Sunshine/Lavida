<template>
  <div class="wrapper">
    <b class="tag">{{name}}</b>
    <b class="value" :style="{color:valueColor}">{{value==null?'--':value}}</b>
    <el-popover v-if="value!=null" trigger="hover">
      <div class="check-hover">
        <el-button size="mini" @click="checkOpen(2)">困难</el-button>
        <el-button size="mini" @click="checkOpen(5)">极难</el-button>
      </div>
      <el-button slot="reference" class="check-button" icon="icon-dice" circle @click="checkOpen(1)"></el-button>
    </el-popover>
    <el-dialog :visible.sync="dialog" width="30%" @closed="checkClose">
      <div class="check">
        <dice v-if="dice" :min="1" :max="100" @result="diceResult=$event"></dice>
        <b v-if="diceResult!=null" class="check-text" :style="{color:diceResultColor}">{{diceResultText}}</b>
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
    value: Number
  },
  data() {
    return {
      dialog: false,
      dice: false,
      diceResult: null,
      difficulty: 1
    }
  },
  computed: {
    valueColor() {
      if (this.value == null || this.value < 30) {
        return 'red'
      }
      if (this.value < 70) {
        return 'orange'
      }
      return 'green'
    },
    diceResultText() {
      if (this.diceResult == null) {
        return ''
      }
      if (this.diceResult <= this.value / this.difficulty) {
        return this.diceResult <= 1 ? '大成功' : '成功'
      }
      return this.diceResult >= 96 ? '大失败' : '失败'
    },
    diceResultColor() {
      return this.diceResult <= this.value / this.difficulty ? 'green' : 'red'
    }
  },
  methods: {
    checkOpen(difficulty) {
      this.dialog = true
      this.dice = true
      this.difficulty = difficulty
    },
    checkClose() {
      this.dice = false
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

.check-hover {
  display: flex;
  justify-content: space-around;
}

.check-button {
  margin-left: 10px;
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
