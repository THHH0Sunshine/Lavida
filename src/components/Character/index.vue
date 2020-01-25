<template>
  <div class="character">
    <div class="toptop">
        <el-button @click="load">从文件读取角色</el-button>
        <el-button @click="save">保存角色到文件</el-button>
        <el-button @click="noteVisible=true">记录</el-button>
    </div>
    <div class="top">
      <el-card class="basic">
        <b slot="header">基本信息</b>
        <div class="multi">
          <span class="item">玩家：<editable v-model="attributes.player"></editable></span>
          <span class="item">姓名：<editable v-model="attributes.name"></editable></span>
          <span class="item">时代：<editable v-model="attributes.time"></editable></span>
          <span class="item">职业：<editable v-model="attributes.profession"></editable></span>
          <span class="item">性别：<editable v-model="attributes.isMale" :options="[{label:'男',value:true},{label:'女',value:false}]"></editable></span>
          <span class="item">年龄：<editable v-model="attributes.age" :number="{min:0}"></editable></span>
          <span class="item">住地：<editable v-model="attributes.place"></editable></span>
          <span class="item">故乡：<editable v-model="attributes.hometown"></editable></span>
        </div>
      </el-card>
      <attributes class="attributes" v-model="attributes"></attributes>
    </div>
    <div class="center">
      <el-card class="variables">
        <b slot="header">基本变量</b>
        <div class="multi">
          <el-card class="item"><variable name="体力 HP" v-model="attributes.HP"></variable></el-card>
          <el-card class="item"><variable name="理智 SAN" v-model="attributes.SAN"></variable></el-card>
          <el-card class="item"><variable name="魔法 MP" v-model="attributes.MP" :max="attributes.MaxMP"></variable></el-card>
        </div>
      </el-card>
      <skills class="skills" :total="attributes.EDU==null?0:attributes.EDU*5" v-model="skills"></skills>
    </div>
    <el-drawer :visible.sync="noteVisible" :title="'角色 '+attributes.name+' 的记录'" direction="rtl" size="300px">
      <el-input class="note-input" type="textarea" resize="none" rows="16" v-model="note"></el-input>
    </el-drawer>
  </div>
</template>

<script>
import Attributes from './Attributes'
import Skills from './Skills'
import Editable from '../Editable'
import Attribute from '../Attribute'
import Variable from '../Variable'

export default {
  components: {
    Attributes,
    Skills,
    Editable,
    Attribute,
    Variable
  },
  data() {
    return {
      attributes: {
        player: 'Merlin',
        name: '石块',
        time: '瘟疫危机',
        profession: '防疫专家',
        isMale: false,
        age: 30,
        place: '武汉',
        hometown: '石家庄',
        STR: 50,
        CON: 50,
        SIZ: 50,
        DEX: 50,
        APP: 50,
        INT: 50,
        POW: 50,
        EDU: 50,
        MOV: 7,
        Luck: 35,
        Money: 35,
        HP: 10,
        SAN: 99,
        MaxMP: 10,
        MP: 10
      },
      skills: [
        { name: '检疫', value: 100 },
        { name: '急救', value: 80 },
        { name: '聆听', value: 70 },
        { name: '妙手', value: 60 }
      ],
      noteVisible: false,
      note: ''
    }
  },
  methods: {
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
          let attributes = {}, skills = []
          if (obj.attributes == null) {
            obj.attributes = {}
          }
          if (obj.skills == null) {
            obj.skills = []
          }
          attributes = obj.attributes
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
          this.attributes = attributes
          this.skills = skills
          if (obj.note != null) {
            this.note = obj.note.toString()
          }
        }
        reader.readAsText(e.target.files[0])
      }
      input.click()
    },
    save() {
      let obj = {
        attributes: this.attributes,
        skills: this.skills,
        note: this.note
      }
      let blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
      let url = URL.createObjectURL(blob)
      let a = document.createElement('a')
      a.href = url
      a.download = this.attributes.name + '.json'
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
