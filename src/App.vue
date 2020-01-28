<template>
  <div class="app">
    <h1>Lavida Character Manager</h1>
    <div class="buttons">
      <el-button @click="addChar">新建角色</el-button>
    </div>
    <el-tabs type="card" v-model="tab">
      <el-tab-pane v-for="(v,k) in characters" :key="k" :label="v.info.name==null?'未命名':v.info.name" :name="k.toString()">
        <character :char="v" :index="k" @delete="removeChar"></character>
      </el-tab-pane>
    </el-tabs>
    <console :charList="characters"></console>
  </div>
</template>

<script>
import Character from './components/Character'
import Console from './components/Console'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    Character,
    Console
  },
  computed: mapGetters(['characters']),
  data() {
    return {
      tab: '0'
    }
  },
  methods: {
    ...mapMutations(['addChar', 'deleteChar']),
    removeChar() {
      let tabNum = Number(this.tab)
      let nextNum = tabNum + 1 < this.characters.length ? tabNum : tabNum ? tabNum - 1 : 0
      this.tab = nextNum.toString()
      this.deleteChar(tabNum)
    }
  }
}
</script>

<style>
.app {
  padding-bottom: 40vh;
}

.app .buttons {
  padding: 10px;
}

.icon-dice {
  display: inline-block;
  width: 14px;
  height: 14px;
  background-image: url(./assets/dice.svg);
  background-size: 14px 14px;
}

.icon-dice::before {
  content: '_';
  color: transparent;
}
</style>
