<template>
  <div class="character">
    <div class="top">
      <el-card class="basic">
        <b slot="header">基本信息</b>
        <div class="item">玩家：<editable v-model="player"></editable></div>
        <div class="multi">
          <span class="item">姓名：<editable v-model="name"></editable></span>
          <span class="item">时代：<editable v-model="time"></editable></span>
        </div>
        <div class="item">职业：<editable v-model="profession"></editable></div>
        <div class="multi">
          <span class="item">性别：<editable v-model="isMale" :options="[{label:'男',value:true},{label:'女',value:false}]"></editable></span>
          <span class="item">年龄：<editable v-model="age" :number="{min:0}"></editable></span>
        </div>
        <div class="item">住地：<editable v-model="place"></editable></div>
        <div class="item">故乡：<editable v-model="hometown"></editable></div>
      </el-card>
      <el-card class="attributes">
        <b slot="header">角色属性</b>
        <div class="multi">
          <attribute class="item" name="力量 STR" v-model="aSTR"></attribute>
          <attribute class="item" name="体质 CON" v-model="aCON"></attribute>
          <attribute class="item" name="体型 SIZ" v-model="aSIZ"></attribute>
        </div>
        <div class="multi">
          <attribute class="item" name="敏捷 DEX" v-model="aDEX"></attribute>
          <attribute class="item" name="外貌 APP" v-model="aAPP"></attribute>
          <attribute class="item" name="意志 POW" v-model="aPOW"></attribute>
        </div>
        <div class="multi">
          <attribute class="item" name="教育 EDU" v-model="aEDU"></attribute>
          <attribute class="item" name="移动力 MOV" v-model="aMOV"></attribute>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Editable from './Editable'
import Attribute from './Attribute'

export default {
  components: {
    Editable,
    Attribute
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
      aCON: 50,
      aSIZ: 0,
      aDEX: 100,
      aAPP: 100,
      aPOW: 100,
      aEDU: 100,
      aMOV: 100
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

.basic {
  width: 450px;
}

.attributes {
  width: 900px;
}

.item {
  margin-bottom: 10px;
}

.multi {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
