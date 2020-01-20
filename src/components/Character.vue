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
      </el-card>
    </div>
  </div>
</template>

<script>
import Editable from './Editable'

export default {
  components: {
    Editable
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
      hometown: null
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
  width: 630px;
}

.attributes {
  width: 630px;
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
