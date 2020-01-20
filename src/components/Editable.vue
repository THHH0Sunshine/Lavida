<template>
  <span v-if="editing">
    <el-select v-if="options" class="input" v-model="input">
      <el-option v-for="(v,k) in options" :key="k" :label="v.label" :value="v.value"></el-option>
    </el-select>
    <el-input v-else-if="number" class="input" v-model="input" type="number" :min="number.min" :max="number.max"></el-input>
    <el-input v-else class="input" v-model="input"></el-input>
    <el-button v-if="canSave" icon="el-icon-check" circle @click="save"></el-button>
    <el-button v-if="canClose" icon="el-icon-close" circle @click="cancel"></el-button>
  </span>
  <span v-else>
    {{display}} <el-button icon="el-icon-edit" circle @click="edit"></el-button>
  </span>
</template>

<script>
export default {
  props: ['value', 'options', 'number'],
  data() {
    return {
      editing: false,
      input: null,
      canClose: true
    }
  },
  computed: {
    display() {
      if (this.options) {
        for (let v of this.options) {
          if (v.value == this.value) {
            return v.label
          }
        }
      }
      return this.value
    },
    canSave() {
      return this.input != null &&
        (this.input.length == null || this.input.length > 0) &&
        (this.number == null || (this.number.min == null || this.input >= this.number.min) && (this.number.max == null || this.input <= this.number.max))
    }
  },
  mounted() {
    if (this.value == null) {
      this.canClose = false
      this.edit()
    }
  },
  methods: {
    edit() {
      this.editing = true
      this.input = this.value
    },
    save() {
      this.canClose = true
      this.editing = false
      this.$emit('input', this.input)
    },
    cancel() {
      this.editing = false
    }
  }
}
</script>

<style scoped>
.input {
  width: 120px;
  margin-right: 10px;
}
</style>
