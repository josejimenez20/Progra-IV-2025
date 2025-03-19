    
 const materia = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            materias: [],
            materia : {
                codigo: '',
                nombre: '',
                uv: '',
                codigo_transaccion: uuidv4(),
                estado: 'nuevo'
            },
        }
    },
    methods: {
        buscarMateria() {
            this.forms.buscarMateria.mostrar = !this.forms.buscarMateria.mostrar;
            this.$emit('buscar');
        },
        modificarMateria(materia) {
            this.accion = 'modificar';
            this.materia = {...materia};
            this.materia.estado = 'modificada';
        },
        guardarMateria() {
            let materia = {...this.materia};
            if(navigator.onLine){
            delete materia.estado;
            fetch(`private/modulos/materias/materia.php?accion=${this.accion}&materias=${JSON.stringify(materia)}`)
                .then(response => response.json())
                .then(data => alertify.success("Materia exitosamente guardada"))
                .catch(error => console.log(error));
            materia.estado = 'sincronizado';
        }
        db.materias.put(materia);
        this.nuevoMateria();
        this.$emit('buscar');
        },
        nuevoMateria() {
            this.accion = 'nuevo';
            this.materia = {
                codigo: '',
                nombre: '',
                uv: '',
                codigo_transaccion: uuidv4(),
                estado: 'nuevo'
            }
        }
    },
    template: `
    <div class="container mt-4">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-secondary text-white text-center">
                <h4 class="mb-0">Registro de Materias</h4>
            </div>
            <div class="card-body">
                <form id="frmMateria" name="frmMateria" @submit.prevent="guardarMateria">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Código</label>
                            <input required v-model="materia.codigo" type="text" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Nombre</label>
                            <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="materia.nombre" type="text" class="form-control">
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">UV</label>
                            <input required v-model="materia.uv" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="text-center mt-4 d-flex justify-content-center gap-3">
                        <button type="submit" class="btn btn-primary px-4">Guardar</button>
                        <button type="reset" class="btn btn-warning px-4">Nuevo</button>
                        <button type="button" @click="buscarMateria" class="btn btn-info px-4">Buscar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`
}