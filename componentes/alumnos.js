    
 const alumno = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            alumno : {
                codigo: '',
                nombre: '',
                direccion: '',
                telefono: '',
                email: '',
                codigo_transaccion: uuidv4(),
                estado: 'nuevo'
            },
        }
    },
    methods: {
        buscarAlumno() {
            this.forms.buscarAlumno.mostrar = !this.forms.buscarAlumno.mostrar;
            this.$emit('buscar');
        },
        modificarAlumno(alumno) {
            this.accion = 'modificar';
            this.alumno = {...alumno};
            this.alumno.estado = 'modificado';
        },
        guardarAlumno() {
            let alumno = {...this.alumno};
            console.log(alumno.estado);
            if(navigator.onLine){
                delete alumno.estado;
                fetch(`private/modulos/alumnos/alumno.php?accion=${this.accion}&alumnos=${JSON.stringify(alumno)}`)
                    .then(response => response.json())
                    .then(data => alertify.success("Alumno exitosamente guardado"))
                    .catch(error => console.log(error));
                alumno.estado = 'sincronizado';
            }
            db.alumnos.put(alumno);
            this.nuevoAlumno();
            this.$emit('buscar');
        },
        nuevoAlumno() {
            this.accion = 'nuevo';
            this.alumno = {
                codigo: '',
                nombre: '',
                direccion: '',
                telefono: '',
                email: '',
                codigo_transaccion: uuidv4(),
                estado: 'nuevo'
            };
        }
    },
    template: `
    <div class="container mt-4">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-secondary text-white text-center">
                <h4 class="mb-0">Registro de Alumnos</h4>
            </div>
            <div class="card-body">
                <form id="frmAlumno" name="frmAlumno" @submit.prevent="guardarAlumno">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Código</label>
                            <input required v-model="alumno.codigo" type="text" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Nombre</label>
                            <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="alumno.nombre" type="text" class="form-control">
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Dirección</label>
                            <input required v-model="alumno.direccion" type="text" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Teléfono</label>
                            <input v-model="alumno.telefono" type="text" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Email</label>
                            <input v-model="alumno.email" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="text-center mt-4 d-flex justify-content-center gap-3">
                        <button type="submit" class="btn btn-primary px-4">Guardar</button>
                        <button type="reset" class="btn btn-warning px-4">Nuevo</button>
                        <button type="button" @click="buscarAlumno" class="btn btn-info px-4">Buscar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`
};