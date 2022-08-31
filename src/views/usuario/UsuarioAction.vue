<template>
    <section>
        <FormUser :tipo="usuario.tipo" :unidades="unidades" :produtos="produtos"/>
        
        <h2>Suas Solicitações</h2>
        
        <transition-group v-if="solicitacoes" name="list" tag="ul">             
                <table key="table">
                    <tr>
                        <th align='center'>Observação</th>
                        <th align='center'>Data</th>             
                        <th align='center'>Status</th>
                        <th align='center'>Visualizar NF</th>
                    </tr>
                    <tr v-for="(solicitacao, index) in solicitacoes" :key="index">
                        <td>{{solicitacao.observacao}}</td>
                        <td>{{solicitacao.created_at}}</td>
                        <td>{{solicitacao.status}}</td>
                        <td><b><a href="" target="_blank" >IMPRIMIR</a></b></td>
                    </tr>
                </table>
            
        </transition-group>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormUser from "@/components/FormUser.vue";

export default {
    components : {
      FormUser
    },
    name: "UsuarioAction",
    data() {
        return {
            enviando: false,
            file : "",
            erros: []
        }
    },
    
    computed: {
        ...mapState(["login", "usuario", "solicitacoes","unidades","produtos"])
    },
    methods: {
      ...mapActions(["getSolicitacoes","getUnidades","getProdutos"]),
      
    },
    created(){
        this.getSolicitacoes();
        this.getUnidades();
        this.getProdutos();
    }
    
}
</script>

<style>
.btn-product{
    font-size:20px;color:rgb(18 207 32);font-weight: bold;cursor:pointer
}
.btn-remove{
    font-size:25px;color:red;cursor:pointer
}
table{
    width: 100%;
    
}
tr{
        width: 100%;
}
th,td{
    box-sizing:border-box;
    padding: 6px;
}

th{
    background: #87f;
    color: #fff;
    text-align: left;
}
  
.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
    transition: all .3s;
}

</style>
