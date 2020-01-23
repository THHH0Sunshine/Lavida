<template>
  <el-card>
    <div slot="header">
      <b>角色属性</b>
      <el-button class="header-button" type="text" @click="dialog=dice=true">快速开局</el-button>
      <el-dialog :visible.sync="dialog" width="60%" @closed="dice=false">
        <div class="dialog-wrapper">
          <div class="dice-wrapper">
            <dice v-if="dice" :min="1" :max="6" @result="diceFinish"></dice>
            <div class="dice-total" v-if="!diceFinished">累计点数：{{total}}</div>
            <div class="dice-total" v-if="!diceFinished">第{{round}}/{{roundMax}}轮 第{{step}}/{{stepMax}}次</div>
          </div>
          <div class="dialog-tags">
            <div class="dialog-attrtags">
              <span v-for="(v,k) in diceAttributes" :key="k" class="dialog-tag">
                {{v.name}}：
                <el-button @click="setAttr(k)">{{v.value==null?'???':v.value}}</el-button>
              </span>
              <span class="dialog-tag">移动 MOV：<b class="dialog-number">{{aMOV}}</b></span>
              <span class="dialog-tag">幸运 Luck：<el-input class="dialog-input" type="number" :min="0" :max="70" :value="aLuck" @input="aLuck=$event*1"></el-input></span>
              <span class="dialog-tag">信用评级：<el-input class="dialog-input" type="number" :min="0" :max="70" :value="aMoney" @input="aLuck=70-$event"></el-input></span>
              <span class="dialog-tag">体力 HP：<b class="dialog-number">{{aHP}}</b></span>
              <span class="dialog-tag">魔法 MP：<b class="dialog-number">{{aMP}}</b></span>
              <el-button v-if="canSave" class="dialog-tag" icon="el-icon-check" circle @click="save"></el-button>
            </div>
            <el-divider></el-divider>
            <div>
              <el-button
                v-for="(v,k) in diceResults"
                :key="k"
                class="dialog-tag"
                :type="selected==k?'primary':null"
                @click="selected=selected==k?null:k">{{v}}</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="multi">
      <el-card class="item"><attribute name="力量 STR" :value="value.STR"></attribute></el-card>
      <el-card class="item"><attribute name="体质 CON" :value="value.CON"></attribute></el-card>
      <el-card class="item"><attribute name="体型 SIZ" :value="value.SIZ"></attribute></el-card>
      <el-card class="item"><attribute name="敏捷 DEX" :value="value.DEX"></attribute></el-card>
      <el-card class="item"><attribute name="外貌 APP" :value="value.APP"></attribute></el-card>
      <el-card class="item"><attribute name="智力 INT" :value="value.INT"></attribute></el-card>
      <el-card class="item"><attribute name="意志 POW" :value="value.POW"></attribute></el-card>
      <el-card class="item"><attribute name="教育 EDU" :value="value.EDU"></attribute></el-card>
      <el-card class="item"><variable name="移动 MOV" :value="value.MOV" constant></variable></el-card>
      <el-card class="item"><variable name="幸运 Luck" :value="value.Luck" constant></variable></el-card>
      <el-card class="item"><variable name="信用评级" :value="value.Money" constant></variable></el-card>
    </div>
  </el-card>
</template>

<script>
import Dice from '../Dice'
import Attribute from '../Attribute'
import Variable from '../Variable'

export default {
  components: {
    Dice,
    Attribute,
    Variable
  },
  props: {
    value: Object
  },
  data() {
    return {
      dialog: false,
      dice: false,
      roundMax: 8,
      round: 1,
      step: 1,
      total: 0,
      diceAttributes: [
        { name: '力量 STR', value: null },
        { name: '体质 CON', value: null },
        { name: '体型 SIZ', value: null },
        { name: '敏捷 DEX', value: null },
        { name: '外貌 APP', value: null },
        { name: '智力 INT', value: null },
        { name: '意志 POW', value: null },
        { name: '教育 EDU', value: null }
      ],
      diceResults: [],
      selected: null,
      aLuck: 35
    }
  },
  computed: {
    stepMax() {
      return this.round > 6 ? 2 : 3
    },
    diceFinished() {
      return this.round > this.roundMax
    },
    aMOV() {
      return 7 +
        (this.diceAttributes[0].value > this.diceAttributes[2].value) +
        (this.diceAttributes[3].value > this.diceAttributes[2].value)
    },
    aMoney() {
      return 70 - this.aLuck
    },
    aHP() {
      return Math.floor((this.diceAttributes[1].value + this.diceAttributes[2].value) / 10)
    },
    aMP() {
      return this.diceAttributes[5].value / 5
    },
    canSave() {
      if (this.aLuck < 0 || this.aMoney < 0) {
        return false
      }
      for (let v of this.diceAttributes) {
        if (v.value == null) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    pushResult(tot) {
      let i = 0
      while (i < this.diceResults.length && this.diceResults[i] > tot) {
        i++
      }
      this.diceResults.splice(i, 0, tot)
    },
    diceFinish(e) {
      if (this.diceFinished) {
        return
      }
      this.total += e
      if (++this.step > this.stepMax) {
        this.pushResult(this.total * 5)
        if (++this.round > this.roundMax) {
          return
        }
        this.total = this.round > 6 ? 5 : 0
        this.step = 1
      }
      this.dice = false
      this.$nextTick(() => this.dice = true)
    },
    setAttr(k) {
      if (this.diceAttributes[k].value == null) {
        if (this.diceResults[this.selected] != null) {
          this.diceAttributes[k].value = this.diceResults[this.selected]
          this.diceResults.splice(this.selected, 1)
          this.selected = null
        }
      } else {
        this.pushResult(this.diceAttributes[k].value)
        this.diceAttributes[k].value = null
      }
    },
    save() {
      this.$emit('input', {
        ...this.value,
        STR: this.diceAttributes[0].value,
        CON: this.diceAttributes[1].value,
        SIZ: this.diceAttributes[2].value,
        DEX: this.diceAttributes[3].value,
        APP: this.diceAttributes[4].value,
        INT: this.diceAttributes[5].value,
        POW: this.diceAttributes[6].value,
        EDU: this.diceAttributes[7].value,
        MOV: this.aMOV,
        Luck: this.aLuck,
        Money: this.aMoney,
        HP: this.aHP,
        SAN: 99,
        MP: this.aMP
      })
      this.dialog = false
      this.round = 1
      this.step = 1
      this.total = 0
      for (let v of this.diceAttributes) {
        v.value = null
      }
      this.diceResults = []
      this.selected = null
      this.aLuck = 35
    }
  }
}
</script>

<style scoped>
.header-button {
  float: right;
  padding: 3px 0;
  font-size: 16px;
}

.dialog-wrapper {
  display: flex;
  align-items: center;
}

.dice-wrapper {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dice-total {
  margin-top: 10px;
}

.dialog-tags {
  padding: 20px;
}

.dialog-attrtags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.dialog-tag {
  margin: 5px;
}

.dialog-number {
  font-size: 16px;
  margin: 0 15px;
}

.dialog-input {
  width: 70px;
}

.multi {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.item {
  margin-bottom: 10px;
}
</style>
