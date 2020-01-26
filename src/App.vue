<template>
  <div class="app">
    <h1>Lavida Character Manager</h1>
    <character ref="char"></character>
    <console></console>
  </div>
</template>

<script>
import Character from './components/Character'
import Console from './components/Console'

export default {
  components: {
    Character,
    Console
  },
  data() {
    return {
      charList: []
    }
  },
  mounted() {
    this.charList.push(this.$refs.char)
  }
}
</script>

<style>
.app {
  padding-bottom: 40vh;
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
