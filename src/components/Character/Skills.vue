<template>
  <el-card>
    <div slot="header">
      <b>技能点数</b>
      <el-button class="header-button" type="text" @click="dialog=true">分配点数</el-button>
    </div>
    <div v-if="dialog">
      <div class="dialog-top">
        <span class="dialog-top-text">剩余可分配点数：{{total-points}}</span>
        <el-button @click="dialog=false">返回</el-button>
        <el-button @click="save">确认</el-button>
      </div>
      <div class="skills-multi">
        <div v-for="(v,k) in skillList" :key="k" class="skill">
          <span :style="{'font-size':v.name.length>3?v.name.length>4?'12px':'15px':null}">{{v.name}} </span>
          <el-input class="dialog-input" type="number" :min="0" :max="100-v.basic" :value="v.add" @input="assign(k,$event*1)"></el-input>
          + {{v.basic}} = <b :style="{color:colorList[k]}">{{v.basic+v.add}}</b>
        </div>
        <div class="skill">
          自定义
          <el-input class="dialog-custom" v-model="input"></el-input>
          <el-button v-if="input.length>0" class="dialog-button" @click="custom">添加</el-button>
        </div>
      </div>
    </div>
    <div v-else class="skills-multi">
      <attribute v-for="(v,k) in value" :key="k" class="skill" :name="v.name" :value="v.value"></attribute>
    </div>
  </el-card>
</template>

<script>
import Attribute from '../Attribute'
import { mapMutations } from 'vuex'

export default {
  components: {
    Attribute
  },
  props: {
    value: Array,
    total: Number,
    index: Number
  },
  data() {
    return {
      dialog: false,
      points: 0,
      skillList: [
        { name: '会计', basic: 5, add: 0 },
        { name: '人类学', basic: 1, add: 0 },
        { name: '估价', basic: 5, add: 0 },
        { name: '考古学', basic: 1, add: 0 },
        { name: '魅惑', basic: 15, add: 0 },
        { name: '攀爬', basic: 20, add: 0 },
        { name: '计算机', basic: 5, add: 0 },
        { name: '克苏鲁神话', basic: 0, add: 0 },
        { name: '乔装', basic: 5, add: 0 },
        { name: '汽车驾驶', basic: 20, add: 0 },
        { name: '电类维修', basic: 10, add: 0 },
        { name: '电子学', basic: 1, add: 0 },
        { name: '话术', basic: 5, add: 0 },
        { name: '斗殴', basic: 25, add: 0 },
        { name: '剑术', basic: 20, add: 0 },
        { name: '手枪', basic: 20, add: 0 },
        { name: '枪械', basic: 25, add: 0 },
        { name: '急救', basic: 30, add: 0 },
        { name: '历史', basic: 5, add: 0 },
        { name: '恐吓', basic: 15, add: 0 },
        { name: '跳跃', basic: 20, add: 0 },
        { name: '法律', basic: 5, add: 0 },
        { name: '图书馆使用', basic: 20, add: 0 },
        { name: '聆听', basic: 20, add: 0 },
        { name: '锁匠', basic: 1, add: 0 },
        { name: '机类维修', basic: 10, add: 0 },
        { name: '医学', basic: 1, add: 0 },
        { name: '博物学', basic: 10, add: 0 },
        { name: '领航', basic: 10, add: 0 },
        { name: '神秘学', basic: 5, add: 0 },
        { name: '重机', basic: 1, add: 0 },
        { name: '说服', basic: 10, add: 0 },
        { name: '精神分析', basic: 1, add: 0 },
        { name: '心理学', basic: 10, add: 0 },
        { name: '骑术', basic: 5, add: 0 },
        { name: '药学', basic: 1, add: 0 },
        { name: '妙手', basic: 10, add: 0 },
        { name: '侦察', basic: 25, add: 0 },
        { name: '潜行', basic: 20, add: 0 },
        { name: '游泳', basic: 20, add: 0 },
        { name: '投掷', basic: 20, add: 0 },
        { name: '追踪', basic: 10, add: 0 },
        { name: '潜水', basic: 1, add: 0 },
        { name: '原力', basic: 0, add: 0 },
        { name: '圣光', basic: 0, add: 0 },
        { name: 'MC生存', basic: 10, add: 0 },
        { name: 'MC建筑', basic: 10, add: 0 },
        { name: 'MC红石', basic: 5, add: 0 },
        { name: 'MC战斗', basic: 10, add: 0 },
        { name: 'MC跑酷', basic: 10, add: 0 },
        { name: 'MC模组', basic: 10, add: 0 },
        { name: 'MC命令方块', basic: 1, add: 0 }
      ],
      input: ''
    }
  },
  computed: {
    colorList() {
      return this.skillList.map(e => {
        let value = e.basic + e.add
        if (value < 30) {
          return 'red'
        }
        if (value < 70) {
          return 'orange'
        }
        return 'green'
      })
    }
  },
  methods: {
    ...mapMutations(['setSkills']),
    assign(index, value) {
      let skill = this.skillList[index]
      if (value < 0 || skill.basic + value > 100) {
        return
      }
      let delta = value - skill.add
      if (this.points + delta > this.total) {
        return
      }
      skill.add = value
      this.points += delta
    },
    custom() {
      this.skillList.push({ name: this.input, basic: 0, add: 0 })
      this.input = ''
    },
    save() {
      let list = []
      for (let e of this.skillList) {
        let value = e.basic + e.add
        if (value > 0) {
          list.push({ name: e.name, value })
        }
        e.add = 0
      }
      this.points = 0
      this.setSkills({ index: this.index, skills: list })
      this.dialog = false
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

.dialog-top {
  padding: 10px;
}

.dialog-top-text {
  margin-right: 10px;
}

.skills-multi {
  display: flex;
  flex-wrap: wrap;
}

.skill {
  width: 250px;
  padding-left: 8%;
  margin-bottom: 10px;
}

.dialog-input {
  width: 70px;
}

.dialog-custom {
  width: 100px;
}

.dialog-button {
  margin-left: 10px;
}
</style>
