<template>
  <div>
    <h1>Lavida Character Manager</h1>
    <dice :min="1" :max="6" @result="$message($event.toString())"></dice>
    <character></character>
  </div>
</template>

<script>
import Dice from './components/Dice'
import Character from './components/Character'

export default {
  components: {
    Dice,
    Character
  }
}
</script>
