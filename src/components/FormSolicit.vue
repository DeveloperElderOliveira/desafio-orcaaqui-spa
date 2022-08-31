<template>
    <div>
        <i @click="addRowProduct" class="btn-product">+ Produto</i>
        <table class="table">
                <thead>
                    <tr>                            
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Unidade</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for='(produto, index) in solicitacoes.produtos' :key="index">                            
                        <td>
                            <select v-model="produto.product_id" required>
                                <option value="">Selecione Produto</option>
                                <option v-for="(produto, index) in produtos" :key="index" :value="produto.id">{{produto.descricao}}</option>
                            </select>
                        </td>
                        <td>
                            <input required v-model="produto.quantidade" type="text" />
                        </td>
                        <td>
                            <select v-model="produto.unit_id" required>
                                <option value="">Selecione Unidade</option>
                                <option v-for="(unidade, index) in unidades" :key="index" :value="unidade.id">{{unidade.descricao}}</option>
                            </select>
                        </td>
                        <td>
                            <i @click="deleteRowProduct(index)" class="btn-remove">X</i>
                        </td>
                    </tr>                        
            </tbody>
        </table>
        <label for="observacao">Observação</label>
        <textarea v-model="solicitacoes.observacao" name="" id="observacao" cols="50" rows="1"></textarea>
        <button class="btn" v-if="!enviando" @click.prevent="addSolicitacao">Solicitar</button>
        <PaginaCarregandoFile v-else/>
        <!-- <ErroNotificacao :erros="erros"/> -->
    </div>

</template>

<script>
import {api} from "@/services.js"
import { mapActions } from 'vuex'
export default {
   name: "FormSolicit",
   props: {
        unidades: Array,
        produtos: Array
    },
   data() {
        return {
            enviando: false,
            solicitacoes: {
                produtos : [{product_id:'',quantidade:1,unit_id:''}],
                observacao: '',
                status: 1 
            },
            // erros: []
                 
        }
    },
    methods : {
         ...mapActions(["getSolicitacoes"]),

        addRowProduct: function() {      
            this.solicitacoes.produtos.push({product_id:'',quantidade:1,unit_id:''})
        },
        deleteRowProduct(index){    
            this.solicitacoes.produtos.splice(index,1);             
        },
        addSolicitacao: function(){
            this.enviando = true;
            api.post("/solicit", this.solicitacoes).then(() => {
                alert("Solicitação realizada com sucesso!");
                this.enviando = false;
                this.getSolicitacoes();
            }).catch(() => {
                alert("Todos os campos devem ser preenchidos.");
                // this.erros.push(error.response.data.errors);
                this.enviando = false;
            });
        }    
    }
}
</script>

<style scoped>
th {
    padding: 7px;
}
label {
    font-size: 1.5em;
    font-weight: bold;
}
textarea {
    margin-top: 10px;
}

</style>