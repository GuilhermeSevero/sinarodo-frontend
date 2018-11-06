<template>
    <q-page class="generic-margin">
        <q-table
            ref="table"
            color="primary"
            :data="serverData"
            :columns="columns"
            selection="single"
            :selected.sync="selected"
            row-key="id"
            :pagination.sync="serverPagination"
            @request="request"
            :loading="loading"
        />
    </q-page>
</template>

<script>
export default {
  name: 'PageUsuarios',

  data () {
    return {
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        sortBy: 'id',
        descending: false
      },
      columns: [
        {
          name: 'id',
          required: true,
          label: 'Código',
          align: 'rigth',
          field: 'id',
          sortable: true
        },
        {
          name: 'nome',
          required: true,
          label: 'Nome',
          align: 'left',
          field: 'nome',
          sortable: true
        },
        {
          name: 'apelido',
          required: true,
          label: 'Apelido',
          align: 'left',
          field: 'apelido',
          sortable: true
        },
        {
          name: 'telefone',
          required: true,
          label: 'Telefone',
          align: 'left',
          field: 'telefone'
        },
        {
          name: 'funcao1',
          required: true,
          label: 'Função 1',
          align: 'left',
          field: 'funcao1',
          sortable: true
        },
        {
          name: 'funcao2',
          required: true,
          label: 'Função 2',
          align: 'left',
          field: 'funcao2',
          sortable: true
        }
      ],
      selected: [],
      loading: false
    }
  },

  mounted () {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  },

  methods: {
    request (props) {
      this.loading = true

      this.serverPagination = props.pagination

      let { page, rowsPerPage, sortBy, descending } = props.pagination

      this.$axios.get('/usuarios/', {
        params: {
          perPage: rowsPerPage,
          page: page,
          sort: `${sortBy}${(descending ? '-' : '')}`
        }
      })
        .then(response => {
          console.log(response)
          let rows = response.data

          let table = this.$refs.table
          table.sortMethod(rows, sortBy, descending)

          this.serverPagination.rowsNumber = response.headers.rows

          this.serverData = rows
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
