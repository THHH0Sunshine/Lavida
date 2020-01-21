<template>
  <el-card>
    <el-tag class="tag">{{name}}</el-tag>
    <el-popover trigger="hover">
      <el-input class="hover-input" v-model="input" type="number" :min="1"></el-input>
      <el-button class="hover-button" size="mini" icon="el-icon-minus" circle @click="plus(-input)"></el-button>
      <el-button slot="reference" size="mini" icon="el-icon-minus" circle @click="plus(-1)"></el-button>
    </el-popover>
    <b class="value" :style="{color:valueColor}">{{value}}</b>
    <el-popover trigger="hover">
      <el-input class="hover-input" v-model="input" type="number" :min="1"></el-input>
      <el-button class="hover-button" size="mini" icon="el-icon-plus" circle @click="plus(input*1)"></el-button>
      <el-button slot="reference" size="mini" icon="el-icon-plus" circle @click="plus(1)"></el-button>
    </el-popover>
    <el-popover trigger="hover">
      <div class="check-hover">
        <el-button size="mini" @click="checkOpen(2)">困难</el-button>
        <el-button size="mini" @click="checkOpen(5)">极难</el-button>
      </div>
      <el-button slot="reference" class="check-button" icon="el-icon-s-promotion" circle @click="checkOpen(1)"></el-button>
    </el-popover>
    <el-dialog :visible.sync="dialog" width="30%" @closed="checkClose">
      <div class="check">
        <dice v-if="dice" :min="1" :max="100" @result="diceResult=$event"></dice>
        <b v-if="diceResult!=null" class="check-text" :style="{color:diceResultColor}">{{diceResultText}}</b>
      </div>
    </el-dialog>
  </el-card>
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
      input: '1',
      dialog: false,
      dice: false,
      diceResult: null,
      difficulty: 1
    }
  },
  computed: {
    valueColor() {
      if (this.value < 30) {
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
      return this.diceResult <= this.value ? 'green' : 'red'
    }
  },
  methods: {
    plus(num) {
      this.$emit('input', this.value * 1 + num)
    },
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
.tag {
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
