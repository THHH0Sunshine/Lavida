<template>
  <div class="character">
    <div class="toptop">
        <el-button @click="load">从文件读取角色</el-button>
        <el-button @click="save">保存角色到文件</el-button>
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
      <el-card class="attributes">
        <div slot="header">
          <b>角色属性</b>
          <el-button class="header-button" type="text">快速开局</el-button>
        </div>
        <div class="multi">
          <el-card class="item"><attribute name="力量 STR" :value="attributes.STR"></attribute></el-card>
          <el-card class="item"><attribute name="体质 CON" :value="attributes.CON"></attribute></el-card>
          <el-card class="item"><attribute name="体型 SIZ" :value="attributes.SIZ"></attribute></el-card>
          <el-card class="item"><attribute name="敏捷 DEX" :value="attributes.DEX"></attribute></el-card>
          <el-card class="item"><attribute name="外貌 APP" :value="attributes.APP"></attribute></el-card>
          <el-card class="item"><attribute name="智力 INT" :value="attributes.INT"></attribute></el-card>
          <el-card class="item"><attribute name="意志 POW" :value="attributes.POW"></attribute></el-card>
          <el-card class="item"><attribute name="教育 EDU" :value="attributes.EDU"></attribute></el-card>
          <el-card class="item"><attribute name="移动 MOV" :value="attributes.MOV"></attribute></el-card>
          <el-card class="item"><variable name="幸运 Luck" :value="attributes.Luck" constant></variable></el-card>
          <el-card class="item"><variable name="信用评级" :value="attributes.Money" constant></variable></el-card>
          <el-card class="item"><attribute name="闪避" :value="attributes.ShanBi"></attribute></el-card>
        </div>
      </el-card>
    </div>
    <div class="center">
      <el-card class="variables">
        <b slot="header">基本变量</b>
        <div class="multi">
          <el-card class="item"><variable name="体力 HP" v-model="attributes.HP"></variable></el-card>
          <el-card class="item"><variable name="理智 SAN" v-model="attributes.SAN"></variable></el-card>
          <el-card class="item"><variable name="魔法 MP" v-model="attributes.MP" :max="10"></variable></el-card>
        </div>
      </el-card>
      <el-card class="skills">
        <div slot="header">
          <b>技能点数</b>
          <el-button class="header-button" type="text">分配点数</el-button>
        </div>
        <div class="skills-multi">
          <attribute v-for="(v,k) in skills" :key="k" class="item skill" :name="v.name" :value="v.value"></attribute>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Editable from './Editable'
import Attribute from './Attribute'
import Variable from './Variable'

export default {
  components: {
    Editable,
    Attribute,
    Variable
  },
  data() {
    return {
      attributes: {},
      skills: []
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
        }
        reader.readAsText(e.target.files[0])
      }
      input.click()
    },
    save() {
      let obj = {
        attributes: this.attributes,
        skills: this.skills
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

.header-button {
  float: right;
  padding: 3px 0;
  font-size: 16px;
}

.multi {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.item {
  margin-bottom: 10px;
}

.skills-multi {
  display: flex;
  flex-wrap: wrap;
}

.skill {
  width: 250px;
  padding-left: 8%;
}
</style>
