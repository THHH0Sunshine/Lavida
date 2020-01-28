<template>
  <div class="character">
    <div class="toptop">
      <el-button @click="del">删除角色</el-button>
      <el-button @click="load">从文件读取角色</el-button>
      <el-button @click="save">保存角色到文件</el-button>
      <el-button @click="noteVisible=true">记录</el-button>
    </div>
    <div class="top">
      <info class="basic" :value="char.info" :index="index"></info>
      <attributes class="attributes" :value="char.attributes" :index="index"></attributes>
    </div>
    <div class="center">
      <el-card class="variables">
        <b slot="header">基本变量</b>
        <div class="multi">
          <el-card class="item">
            <variable name="体力 HP" :value="char.attributes.HP" @input="setAttribute({index,name:'HP',value:$event})"></variable>
          </el-card>
          <el-card class="item">
            <variable name="理智 SAN" :value="char.attributes.SAN" @input="setAttribute({index,name:'SAN',value:$event})"></variable>
          </el-card>
          <el-card class="item">
            <variable name="魔法 MP" :value="char.attributes.MP" :max="char.attributes.MaxMP" @input="setAttribute({index,name:'MP',value:$event})"></variable>
          </el-card>
        </div>
      </el-card>
      <skills class="skills" :total="char.attributes.EDU==null?0:char.attributes.EDU*5" :value="char.skills" :index="index"></skills>
    </div>
    <el-drawer :visible.sync="noteVisible" :title="'角色 '+char.info.name+' 的记录'" direction="rtl" size="300px">
      <el-input class="note-input" type="textarea" resize="none" rows="16" :value="char.note" @input="setNote({index,note:$event})"></el-input>
    </el-drawer>
  </div>
</template>

<script>
import Info from './Info'
import Attributes from './Attributes'
import Skills from './Skills'
import Editable from '../Editable'
import Attribute from '../Attribute'
import Variable from '../Variable'
import { mapMutations } from 'vuex'

export default {
  components: {
    Info,
    Attributes,
    Skills,
    Editable,
    Attribute,
    Variable
  },
  props: {
    char: Object,
    index: Number
  },
  data() {
    return {
      noteVisible: false
    }
  },
  methods: {
    ...mapMutations(['setChar', 'setAttribute', 'setNote']),
    del() {
      let name = this.char.info.name
      let tip = name == null ?
        '是否删除该未命名角色？' :
        '是否删除角色`' + name + '`？'
      this.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.$emit('delete')).catch(() => {})
    },
    load() {
      let input = document.createElement('input')
      input.type = 'file'
      input.accept = 'application/json'
      input.onchange = (e) => {
        if (e.target.files.length <= 0) {
          return
        }
        let reader = new FileReader()
        reader.onload = (ee) => {
          let obj
          try {
            obj = JSON.parse(ee.target.result)
          } catch (e) {
            this.$message({ type: 'error', message: e.toString() })
            return
          }
          if (obj.info == null) {
            obj.info = {}
          }
          if (obj.attributes == null) {
            obj.attributes = {}
          }
          if (obj.skills == null) {
            obj.skills = []
          }
          let info = {}
          for (let k of Object.keys(this.char.info)) {
            if (obj.info[k] == null) {
              info[k] = null
            } else {
              let value = obj.info[k].toString()
              info[k] = value.length > 0 ? value : null
            }
          }
          let attributes = {}
          for (let k of Object.keys(this.char.attributes)) {
            if (obj.attributes[k] == null) {
              attributes[k] = null
            } else {
              let value = Number(obj.attributes[k])
              attributes[k] = isFinite(value) ? value : null
            }
          }
          let skills = []
          if (Array.isArray(obj.skills)) {
            for (let o of obj.skills) {
              if (o.name == null || o.value == null) {
                continue
              }
              let value = Number(o.value)
              if (!isFinite(value)) {
                continue
              }
              skills.push({ name: o.name.toString(), value })
            }
          } else {
            for (let k of Object.keys(obj.skills)) {
              if (obj.skills[k] == null) {
                continue
              }
              let value = Number(obj.skills[k])
              if (!isFinite(value)) {
                continue
              }
              skills.push({ name: k, value })
            }
          }
          let note = obj.note == null ? '' : obj.note.toString()
          this.setChar({
            index: this.index,
            character: { info, attributes, skills, note }
          })
        }
        reader.readAsText(e.target.files[0])
      }
      input.click()
    },
    save() {
      let obj = {
        info: this.char.info,
        attributes: this.char.attributes,
        skills: this.char.skills,
        note: this.char.note
      }
      let blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
      let url = URL.createObjectURL(blob)
      let a = document.createElement('a')
      a.href = url
      a.download = this.char.info.name + '.json'
      a.click()
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style scoped>
.character {
  font-size: 20px;
}

.top {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.center {
  margin-top: 10px;
}

.basic {
  width: 450px;
}

.attributes {
  width: 800px;
}

.skills {
  margin-top: 10px;
}

.multi {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.item {
  margin-bottom: 10px;
}

.note-input {
  padding: 10px;
}
</style>
