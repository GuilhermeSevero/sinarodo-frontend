<template>
    <q-page class="layout-padding">
        <div
            class="row justify-center"
        >
            <div class="q-headline text-primary">
                Olá, Você acessou o sistema de premiação da Sinarodo!
            </div>
        </div>
        <hr class="q-hr q-my-lg">
        <div class="q-ma-xl quote q-subheading shadow-1">
            Os Usuários serão classificados a partir de níveis (Administrador, Gerência, Funcionário).<br>
            - Se você é um usuário classificado como Administrador, você terá acesso total
            as configurações e relatórios do sistema.<br>
            - Se você é um usuário classificado como Gerência, terá acesso as premiações e relatórios
            do sistema.<br>
            - Se você é um usuário classificado como funcionário, terá somente acesso aos seus pontos
            de premiação e valor classificados mensalmente.
        </div>
        <div class="quote q-subheading shadow-1">
            Este sistema tem como total objetivo, gerenciar a premiação dos funcionários em campo,
            ele não deve ser utilizado para outros fins ao qual foi desenvolvido, você só deve
            utilizar o sistema caso seja autorizado pela diretoria, ou funcionários encarregados.<br>
            Os dados aqui adicionados serão salvos no Banco de Dados, é necessário muita atenção
            ao alimentar o sistema, pois as informações alimentadas e salvas não poderão ser desfeitas
            e são de total responsabilidade dos usuários.<br>
            Qualquer tipo de erro deve ser levado ao responsável da empresa para que possa ser resolvido.<br>
            O Sistema funciona de forma automatizada, porém necessita que seja alimentado corretamente.
        </div>
    </q-page>
</template>

<script>
export default {
    name: 'PageSobre'
}
</script>

<style lang="scss" scoped>

</style>
