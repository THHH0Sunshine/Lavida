import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    characters: [
      {
        info: {
          player: 'Merlin',
          name: '石块',
          time: '瘟疫危机',
          profession: '防疫专家',
          gender: '女',
          age: '25',
          place: '武汉',
          hometown: '石家庄'
        },
        attributes: {
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
        note: ''
      }
    ]
  },
  getters: {
    characters(state) {
      return state.characters
    }
  },
  mutations: {
    addChar(state) {
      state.characters.push({
        info: {
          player: null, name: null, time: null, profession: null,
          gender: null, age: null, place: null, hometown: null
        },
        attributes: {
          STR: null, CON: null, SIZ: null, DEX: null,
          APP: null, INT: null, POW: null, EDU: null,
          MOV: null, Luck: null, Money: null,
          HP: null, SAN: null, MaxMP: null, MP: null
        },
        skills: [],
        note: ''
      })
    },
    deleteChar(state, index) {
      state.characters.splice(index, 1)
    },
    setChar(state, payload) {
      Vue.set(state.characters, payload.index, payload.character)
    },
    setOneInfo(state, payload) {
      state.characters[payload.index].info[payload.name] = payload.value
    },
    setAttribute(state, payload) {
      state.characters[payload.index].attributes[payload.name] = payload.value
    },
    changeAttributes(state, payload) {
      for (let change of payload.changes) {
        state.characters[payload.index].attributes[change.name] = change.value
      }
    },
    setSkills(state, payload) {
      state.characters[payload.index].skills = payload.skills
    },
    addSkill(state, payload) {
      state.characters[payload.index].skills.push(payload.skill)
    },
    deleteSkill(state, payload) {
      state.characters[payload.index].skills.splice(payload.skillIndex, 1)
    },
    setSkillValue(state, payload) {
      state.characters[payload.index].skills[payload.skillIndex].value = payload.value
    },
    setNote(state, payload) {
      state.characters[payload.index].note = payload.note
    }
  },
  actions: {
  },
  modules: {
  }
})
