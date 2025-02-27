    
 const buscarautor = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            autores: [],
        }
    },
    methods: {
        modificarAutor(autor){
            this.$emit('modificar', autor);
        },
        eliminarAutor(autor) {
            alertify.confirm('Eliminar Autor', `¿Esta seguro de eliminar el autor ${autor.nombre}?`, () => {
                db.autores.delete(autor.idAutor);
                this.listarAutores();
                alertify.success(`Autor ${autor.nombre} eliminado`);
            }, () => { });
        },
        async listarAutores() {
            this.autores = await db.autores.filter(autor => autor[this.buscarTipo].toLowerCase().includes(this.buscar.toLowerCase())).toArray();
        },
    },
    created() {
        this.listarAutores();
    },
    template: `
    <div class="row">
        <div class="col-12">
            <table class="table table-sm table-bordered table-hover">
                <thead>
                    <tr>
                        <th>BUSCAR POR</th>
                        <th>
                            <select v-model="buscarTipo" class="form-control">
                                <option value="codigo">CODIGO</option>
                                <option value="titulo">TITULO</option>
                                <option value="editorial">EDITORIAL</option>
                                <option value="edicion">EDICION</option>
                            </select>
                        </th>
                        <th colspan="3">
                            <input type="text" @keyup="listarLibros()" v-model="buscar" class="form-control">
                        </th>
                    </tr>
                    <tr>
                        <th>CODIGO</th>
                        <th>TITULO</th>
                        <th>EDITORIAL</th>
                        <th>EDICION</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="libro in libros" @click="modificarLibro(libro)" :key="libro.idLibro">
                        <td>{{ libro.codigo }}</td>
                        <td>{{ libro.titulo }}</td>
                        <td>{{ libro.editorial }}</td>
                        <td>{{ libro.edicion }}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" 
                                @click.stop="eliminarLibro(libro)">DEL</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
`
};


