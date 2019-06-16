
export default {
    state: {
        autenticado: false,
        usuario: {
            id: -1,
            matricula: null,
            nome: '',
            apelido: '',
            email: '',
            telefone: '',
            login: '',
            cpf: '',
            permissao: -1
        }
    },

    getters: {
        getCodigoUsuario: (state) => state.usuario.id,
        getUsuarioLogado: (state) => state.usuario,
        getUsuarioAutenticado: (state) => state.autenticado,
        getPermissao: (state) => state.usuario.permissao
    },

    mutations: {
        login(state, dadosUsuario){
            state.usuario = dadosUsuario
            state.autenticado = dadosUsuario.id > 0
        },

        logout(state){
            state.usuario = {
                codigo: -1,
                matricula: null,
                nome: '',
                apelido: '',
                email: '',
                telefone: '',
                login: '',
                cpf: '',
                permissao: -1
            }
            state.autenticado = false
        }
    }
}
