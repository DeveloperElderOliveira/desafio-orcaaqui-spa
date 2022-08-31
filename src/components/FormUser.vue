<template>
    <div>
        <h2>Cadastrar {{tipo == 'Comprador' ? 'Solicitação' : 'Produto'}}</h2>
        <form class="adicionar-file">
            <FormSolicit v-if="tipo == 'Comprador'" :unidades="unidades" :produtos="produtos" />
            <FormProduct v-else/>
        </form>
        
    </div>
</template>

<script>
import FormSolicit from "@/components/FormSolicit.vue";
import FormProduct from "@/components/FormProduct.vue";
export default {
   components : {
      FormSolicit,
      FormProduct
   },
   name: "FormUser" ,
   props: {
        tipo: String,
        unidades: Array,
        produtos: Array,
    }
}
</script>

<style>
.btn{
    grid-column: 2;
}

.adicionar-file {
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    margin-bottom: 60px;
}
</style>