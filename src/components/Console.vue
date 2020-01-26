<template>
  <div class="console" :style="{bottom:visible?null:'-40vh'}">
    <el-button class="button" type="info" size="mini" @click="visible=!visible">
      <span class="button-content">控制台</span>
    </el-button>
    <div class="console-content">
      <div class="text" ref="text">{{text}}</div>
      <input class="input" v-model="input" @keydown.enter="send" @keydown.up="historyUp" @keydown.down="historyDown">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      text: '',
      input: '',
      history: [],
      historyIndex: -1
    }
  },
  methods: {
    println(str) {
      this.text += str + '\n'
      this.$nextTick(() => this.$refs.text.scrollTop = this.$refs.text.scrollHeight)
    },
    send() {
      if (this.input.length <= 0) {
        return
      }
      if (this.input[0] == '/') {
        this.command(this.input.substring(1).trim().split(/ +/))
      } else {
        this.println(this.input)
      }
      this.history.push(this.input)
      this.input = ''
      this.historyIndex = -1
    },
    historyUp() {
      if (this.history.length <= 0 || this.historyIndex == 0) {
        return
      }
      if (this.historyIndex < 0) {
        this.historyIndex = this.history.length
      }
      this.input = this.history[--this.historyIndex]
    },
    historyDown() {
      if (this.historyIndex < 0) {
        return
      }
      if (this.historyIndex == this.history.length - 1) {
        this.historyIndex = -1
        this.input = ''
      } else {
        this.input = this.history[++this.historyIndex]
      }
    },
    command(args) {
      let char, value, old
      switch (args[0]) {
        case 'cls':
          this.text = ''
          break
        case 'get':
          if (args.length < 3) {
            return this.println('错误使用命令 `get`')
          }
          char = this.findChar(args[1])
          if (!char) {
            return this.println('找不到角色 `' + args[1] + '`')
          }
          value = this.getValue(char, args[2])
          if (value === undefined) {
            return this.println('找不到属性或技能 `' + args[2] + '`')
          }
          this.println(args[1] + '.' + args[2] + ': ' + value)
          break
        case 'set':
          if (args.length < 4) {
            return this.println('错误使用命令 `set`')
          }
          char = this.findChar(args[1])
          if (!char) {
            return this.println('找不到角色 `' + args[1] + '`')
          }
          old = this.setValue(char, args[2], args[3])
          if (old === undefined) {
            return this.println('类型错误或找不到属性或技能 `' + args[2] + '`')
          }
          this.println(args[1] + '.' + args[2] + ': ' + old + ' -> ' + args[3])
          break
        case 'addskill':
          if (args.length < 4) {
            return this.println('错误使用命令 `addskill`')
          }
          char = this.findChar(args[1])
          if (!char) {
            return this.println('找不到角色 `' + args[1] + '`')
          }
          value = Number(args[3])
          if (!isFinite(value)) {
            return this.println('非法数字 `' + args[3] + '`')
          }
          char.skills.push({ name: args[2], value })
          this.println(args[1] + '.' + args[2] + ': ' + args[3])
          break
        case 'delskill':
          if (args.length < 3) {
            return this.println('错误使用命令 `delskill`')
          }
          char = this.findChar(args[1])
          if (!char) {
            return this.println('找不到角色 `' + args[1] + '`')
          }
          old = []
          for (let i = 0; i < char.skills.length; i++) {
            let skill = char.skills[i]
            if (skill.name == args[2]) {
              old.push(skill)
              char.skills.splice(i, 1)
              i--
            }
          }
          if (old.length <= 0) {
            return this.println('找不到技能 `' + args[2] + '`')
          }
          value = '共删除' + old.length + '项技能：'
          for (let skill of old) {
            value += '\n' + skill.name + ': ' + skill.value
          }
          this.println(value)
          break
        case '':
          this.println('命令不能为空')
          break
        default:
          this.println('未知命令 `' + args[0] + '`')
      }
    },
    findChar(name) {
      for (let ch of this.$parent.charList) {
        if (ch.info.name == name) {
          return ch
        }
      }
    },
    getValue(char, key) {
      let value = char.info[key]
      if (value !== undefined) {
        return value
      }
      value = char.attributes[key]
      if (value !== undefined) {
        return value
      }
      for (let skill of char.skills) {
        if (skill.name == key) {
          return skill.value
        }
      }
    },
    setValue(char, key, value) {
      let old = char.info[key]
      if (old !== undefined) {
        char.info[key] = value
        return old
      }
      old = char.attributes[key]
      if (old !== undefined) {
        value = Number(value)
        if (!isFinite(value)) {
          return
        }
        char.attributes[key] = value
        return value
      }
      for (let skill of char.skills) {
        if (skill.name == key) {
          value = Number(value)
          if (!isFinite(value)) {
            return
          }
          old = skill.value
          skill.value = value
          return old
        }
      }
    }
  }
}
</script>

<style scoped>
.console {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40vh;
  transition: bottom 0.4s;
}

.button {
  position: absolute;
  left: 40px;
  top: -24px;
  transition: top 0.2s;
}

.button:hover {
  top: -30px;
}

.button-content {
  display: inline-block;
  height: 20px;
}

.console-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 2px solid #cccccc;
  background-color: black;
  display: flex;
  flex-direction: column;
}

.text {
  flex-grow: 1;
  font-size: 16px;
  color: white;
  padding: 4px 10px;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-y: auto;
}

.input {
  background-color: black;
  color: white;
  font-size: 16px;
  padding: 4px 10px;
  border: none;
  border-top: 2px solid #cccccc;
  font-family: monospace;
}
</style>
