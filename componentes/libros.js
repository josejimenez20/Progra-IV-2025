const libro = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            libros: [],
            idLibro: '',
            codigo: '',
            nombre: '',
            autor: '',
            editorial: '',
        }
    },
    methods: {
        buscarLibro() {
            this.forms.buscarLibro.mostrar = !this.forms.buscarLibro.mostrar;
            this.$emit('buscar');
        },
        modificarLibro(libro) {
            this.accion = 'modificar';
            this.idLibro = libro.idLibro;
            this.codigo = libro.codigo;
            this.nombre = libro.nombre;
            this.autor = libro.autor;
            this.editorial = libro.editorial;
        },
        guardarLibro() {
            let libro = {
                codigo: this.codigo,
                nombre: this.nombre,
                autor: this.autor,
                editorial: this.editorial
            };
            if (this.accion == 'modificar') {
                libro.idLibro = this.idLibro;
            }
            db.libros.put(libro);
            this.nuevoLibro();
            this.listarLibros();
        },
        nuevoLibro() {
            this.accion = 'nuevo';
            this.idLibro = '';
            this.codigo = '';
            this.nombre = '';
            this.autor = '';
            this.editorial = '';
        }
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmLibro" name="frmLibro" @submit.prevent="guardarLibro">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Libros</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CÓDIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="codigo" type="text" name="txtCodigoLibro" id="txtCodigoLibro" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="nombre" type="text" name="txtNombreLibro" id="txtNombreLibro" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">AUTOR</div>
                                <div class="col-9 col-md-8">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,100}" v-model="autor" type="text" name="txtAutorLibro" id="txtAutorLibro" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">EDITORIAL</div>
                                <div class="col-9 col-md-8">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,100}" v-model="editorial" type="text" name="txtEditorialLibro" id="txtEditorialLibro" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-dark text-center">
                            <input type="submit" value="Guardar" class="btn btn-primary"> 
                            <input type="reset" value="Nuevo" class="btn btn-warning" @click="nuevoLibro">
                            <input type="button" @click="buscarLibro" value="Buscar" class="btn btn-info">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};
