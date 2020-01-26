<template>
  <span v-if="editing">
    <el-input class="input" v-model="input"></el-input>
    <el-button v-if="canSave" icon="el-icon-check" circle @click="save"></el-button>
    <el-button v-if="canClose" icon="el-icon-close" circle @click="cancel"></el-button>
  </span>
  <span v-else>
    {{value}} <el-button icon="el-icon-edit" circle @click="edit"></el-button>
  </span>
</template>

<script>
export default {
  props: {
    value: String
  },
  data() {
    return {
      editing: false,
      input: null
    }
  },
  watch: {
    value(v) {
      this.editing = v == null
    }
  },
  computed: {
    canSave() {
      return this.input != null && (this.input.length == null || this.input.length > 0)
    },
    canClose() {
      return this.value != null
    }
  },
  mounted() {
    if (this.value == null) {
      this.edit()
    }
  },
  methods: {
    edit() {
      this.editing = true
      this.input = this.value
    },
    save() {
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
