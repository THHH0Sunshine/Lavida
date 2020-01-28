<template>
  <el-card>
    <b slot="header">基本信息</b>
    <div class="multi">
      <span v-for="(v,k) in items" :key="k" class="item">
        {{v.label}}：
        <editable :value="value[v.name]" @input="setOneInfo({index,name:v.name,value:$event})"></editable>
      </span>
    </div>
  </el-card>
</template>

<script>
import Editable from '../Editable'
import { mapMutations } from 'vuex'

export default {
  components: {
    Editable
  },
  props: {
    value: Object,
    index: Number
  },
  data() {
    return {
      items: [
        { name: 'player', label: '玩家' },
        { name: 'name', label: '姓名' },
        { name: 'time', label: '时代' },
        { name: 'profession', label: '职业' },
        { name: 'gender', label: '性别' },
        { name: 'age', label: '年龄' },
        { name: 'place', label: '住地' },
        { name: 'hometown', label: '故乡' }
      ]
    }
  },
  methods: mapMutations(['setOneInfo'])
}
</script>

<style scoped>
.multi {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.item {
  margin-bottom: 10px;
}
</style>
