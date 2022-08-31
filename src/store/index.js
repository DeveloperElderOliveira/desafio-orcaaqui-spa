import Vue from 'vue'
import Vuex from 'vuex'
import { api } from "@/services.js"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      name: "",
      tipo: "",
    },
    solicitacoes: null,
    unidades: null,
    produtos: null
  },
  mutations: {
    UPDATE_LOGIN(state, payload){
      state.login = payload
    },
    UPDATE_USUARIO(state, payload){
      state.usuario = Object.assign(state.usuario,payload);
    },
    UPDATE_SOLICITACOES(state, payload){
      state.solicitacoes = payload;
    },
    UPDATE_UNIDADES(state, payload){
      state.unidades = payload;
    },
    UPDATE_PRODUTOS(state, payload){
      state.produtos = payload;
    },
  },
  actions: {
    getSolicitacoes(context) {
      api.get(`/solicit`).then(response => {
        context.commit("UPDATE_SOLICITACOES", response.data.solicitacoes)
      });  
    },
    getUnidades(context) {
      api.get(`/unit`).then(response => {
        context.commit("UPDATE_UNIDADES", response.data.unidades)
      });  
    },
    getProdutos(context) {
      api.get(`/product`).then(response => {
        context.commit("UPDATE_PRODUTOS", response.data.produtos)
      });  
    },
    logarUsuario(context,payload) {
      return api.login(
        {
          name: payload.name,
          password: payload.password
        }
      ).then(response => {
          context.commit("UPDATE_USUARIO", {id: response.data.user.id,name: response.data.user.name, tipo: response.data.user.entity.nome});
          context.commit("UPDATE_LOGIN", true);
          window.localStorage.token = `Bearer ${response.data.access_token}`;
      });
    },
    deslogarUsuario(context){   
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
      });
      context.commit("UPDATE_LOGIN",false);
      window.localStorage.token = '';
    },
  },
  
  modules: {
  }
})
