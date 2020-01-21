<template>
  <div class="character">
    <div class="top">
      <el-card class="basic">
        <b slot="header">基本信息</b>
        <div class="multi">
          <span class="item">玩家：<editable v-model="player"></editable></span>
          <span class="item">姓名：<editable v-model="name"></editable></span>
          <span class="item">时代：<editable v-model="time"></editable></span>
          <span class="item">职业：<editable v-model="profession"></editable></span>
          <span class="item">性别：<editable v-model="isMale" :options="[{label:'男',value:true},{label:'女',value:false}]"></editable></span>
          <span class="item">年龄：<editable v-model="age" :number="{min:0}"></editable></span>
          <span class="item">住地：<editable v-model="place"></editable></span>
          <span class="item">故乡：<editable v-model="hometown"></editable></span>
        </div>
      </el-card>
      <el-card class="attributes">
        <div slot="header">
          <b>角色属性</b>
          <el-button class="header-button" type="text">快速开局</el-button>
        </div>
        <div class="multi">
          <el-card class="item"><attribute name="力量 STR" :value="aSTR"></attribute></el-card>
          <el-card class="item"><attribute name="体质 CON" :value="aCON"></attribute></el-card>
          <el-card class="item"><attribute name="体型 SIZ" :value="aSIZ"></attribute></el-card>
          <el-card class="item"><attribute name="敏捷 DEX" :value="aDEX"></attribute></el-card>
          <el-card class="item"><attribute name="外貌 APP" :value="aAPP"></attribute></el-card>
          <el-card class="item"><attribute name="智力 INT" :value="aPOW"></attribute></el-card>
          <el-card class="item"><attribute name="意志 POW" :value="aPOW"></attribute></el-card>
          <el-card class="item"><attribute name="教育 EDU" :value="aEDU"></attribute></el-card>
          <el-card class="item"><attribute name="移动 MOV" :value="aMOV"></attribute></el-card>
          <el-card class="item"><variable name="幸运 Luck" :value="aLuck" constant></variable></el-card>
          <el-card class="item"><variable name="信用评级" :value="aMoney" constant></variable></el-card>
          <el-card class="item"><attribute name="闪避" :value="aShanBi"></attribute></el-card>
        </div>
      </el-card>
    </div>
    <div class="center">
      <el-card class="variables">
        <b slot="header">基本变量</b>
        <div class="multi">
          <el-card class="item"><variable name="体力 HP" v-model="vHP"></variable></el-card>
          <el-card class="item"><variable name="理智 SAN" v-model="vSAN"></variable></el-card>
          <el-card class="item"><variable name="魔法 MP" v-model="vMP" :max="10"></variable></el-card>
        </div>
      </el-card>
      <el-card class="skills">
        <div slot="header">
          <b>技能点数</b>
          <el-button class="header-button" type="text">分配点数</el-button>
        </div>
        <div class="skills-multi">
          <attribute v-for="(v,k) in skills" :key="k" class="item skill" :name="v.name" :value="v.value"></attribute>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Editable from './Editable'
import Attribute from './Attribute'
import Variable from './Variable'

export default {
  components: {
    Editable,
    Attribute,
    Variable
  },
  data() {
    return {
      player: null,
      name: null,
      time: null,
      profession: null,
      isMale: null,
      age: null,
      place: null,
      hometown: null,
      aSTR: 100,
      aCON: 60,
      aSIZ: 20,
      aDEX: null,
      aAPP: 100,
      aPOW: 100,
      aEDU: 100,
      aMOV: 100,
      aLuck: 35,
      aMoney: null,
      aShanBi: null,
      vHP: 10,
      vSAN: null,
      vMP: 10,
      skills: [
        { name: '急救', value: 80 },
        { name: '聆听', value: 70 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: 60 },
        { name: '妙手', value: null },
      ]
    }
  }
}
</script>

<style scoped>
.character {
  font-size: 20px;
}

.top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.center {
  margin-top: 10px;
}

.basic {
  width: 500px;
}

.attributes {
  width: 800px;
}

.skills {
  margin-top: 10px;
}

.header-button {
  float: right;
  padding: 3px 0;
  font-size: 16px;
}

.multi {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.item {
  margin-bottom: 10px;
}

.skills-multi {
  display: flex;
  flex-wrap: wrap;
}

.skill {
  width: 250px;
  padding-left: 8%;
}
</style>
