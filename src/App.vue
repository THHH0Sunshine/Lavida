<template>
  <div>
    <h1>Lavida Character Manager</h1>
    <character></character>
  </div>
</template>

<script>
import Character from './components/Character'

export default {
  components: {
    Character
  }
}
</script>

<style>
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
