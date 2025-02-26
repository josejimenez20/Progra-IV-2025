const buscarLibro = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            libros: [],
        }
    },
    methods: {
        modificarLibro(libro) {
            this.$emit('modificar', libro);
        },
        eliminarLibro(libro) {
            alertify.confirm('Eliminar Libro', `¿Está seguro de eliminar el libro ${libro.nombre}?`, () => {
                db.libros.delete(libro.idLibro);
                this.listarLibros();
                alertify.success(`Libro ${libro.nombre} eliminado`);
            }, () => { });
        },
        async listarLibros() {
            this.libros = await db.libros.filter(libro => libro[this.buscarTipo].toLowerCase().includes(this.buscar.toLowerCase())).toArray();
        }
    },
    created() {
        this.listarLibros();
    },
    template: `
        <div class="row">
            <div class="col-6">
                <table class="table table-sm table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>BUSCAR POR</th>
                            <th>
                                <select v-model="buscarTipo" class="form-control">
                                    <option value="codigo">CÓDIGO</option>
                                    <option value="nombre">NOMBRE</option>
                                    <option value="autor">AUTOR</option>
                                    <option value="editorial">EDITORIAL</option>
                                </select>
                            </th>
                            <th colspan="3">
                                <input type="text" @keyup="listarLibros()" v-model="buscar" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>NOMBRE</th>
                            <th>AUTOR</th>
                            <th>EDITORIAL</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="libro in libros" @click="modificarLibro(libro)" :key="libro.idLibro">
                            <td>{{ libro.codigo }}</td>
                            <td>{{ libro.nombre }}</td>
                            <td>{{ libro.autor }}</td>
                            <td>{{ libro.editorial }}</td>
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
