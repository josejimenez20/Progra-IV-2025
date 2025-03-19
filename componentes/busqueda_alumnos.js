const buscaralumno = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            alumnos: [],
        }
    },
    methods: {
        modificarAlumno(alumno){
            this.$emit('modificar', alumno);
        },
        async eliminarAlumno(alumno) {
            alertify.confirm('Eliminar Alumno', `¿Esta seguro de eliminar el alumno ${alumno.nombre}?`, async () => {
                let alumnoEliminado = {...alumno};
                alumnoEliminado.estado = 'eliminado';
                await db.alumnos.put(alumnoEliminado);
                console.log("Alumno eliminado localmente");
                await this.listarAlumnos();
                alertify.success(`Alumno ${alumno.nombre} eliminado`);
            }, () => { });
        },
        async TomarAlumnos() {
            console.log("tomando alumnos...");
            fetch('private/modulos/alumnos/alumno.php?accion=consultar')
            .then(response => response.json())
            .then(data =>{
                this.alumnos = data;
                db.alumnos.bulkAdd(data);
                console.log("Alumnos tomados correctamente");
            });
        },
        async listarAlumnos() {
            alertify.success(`Sincronizando datos alumnos...`);
            if(navigator.onLine){
                await this.sincronizarDatos();
            }
            this.alumnos = await db.alumnos.filter(alumno => alumno[this.buscarTipo].toLowerCase().includes(this.buscar.toLowerCase())&&!(alumno.estado==='eliminado')).toArray()
        },
        async subirAlumnos() {
            let alumnos = await db.alumnos.filter(alumno => alumno.estado === 'nuevo').toArray();
            console.log(alumnos);
            if (alumnos.length > 0) {
                alertify.success(`Sincronizando datos alumnos...`);
                console.log(alumnos);
                alumnos.forEach(async alumno => {
                    let respuesta = await fetch(`private/modulos/alumnos/alumno.php?accion=nuevo&alumnos=${JSON.stringify(alumno)}`),
                    data = await respuesta.json();
                    if(!data.success){
                        console.log(data.msg);
                    }
                    
                });
            }
            alumnos = await db.alumnos.filter(alumno => alumno.estado === 'modificado').toArray();
            if (alumnos.length > 0) {
                alertify.success(`Sincronizando datos alumnos...`);
                //console.log("Subiendo alumnos modificados...");
                alumnos.forEach(async alumno => {
                    let respuesta = await fetch(`private/modulos/alumnos/alumno.php?accion=modificar&alumnos=${JSON.stringify(alumno)}`),
                    data = await respuesta.json();
                    if(!data.success){
                        console.log(data.msg);
                    }
                });
            }
          
            alumnos = await db.alumnos.filter(alumno => alumno.estado === 'eliminado').toArray();
            if (alumnos.length > 0) {
                alertify.success(`Sincronizando datos alumnos...`);
                //console.log("Eliminando alumnos...");
                alumnos.forEach(async alumno => {
                    let respuesta = await fetch(`private/modulos/alumnos/alumno.php?accion=eliminar&alumnos=${JSON.stringify(alumno)}`),
                    data = await respuesta.json();
                    if(!data.success){
                        console.log(data.msg); 
                    }
                });

                console.log("Los alumnos eliminados se eliminaron correctamente");
            }
        },
        async sincronizarDatos(){
            await this.subirAlumnos();
            await db.alumnos.clear();
            await this.TomarAlumnos();
        }
    },
    created() {
        this.listarAlumnos();
    },
    mounted() {
        window.addEventListener('online', this.sincronizarDatos);
    },
    template: `
        <div class="row justify-content-center">
        <div class="col-lg-8">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-dark text-white text-center">
                    <h5 class="mb-0">🔍 Buscar Alumnos</h5>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <label class="form-label fw-bold">Buscar por:</label>
                            <select v-model="buscarTipo" class="form-select">
                                <option value="codigo">Código</option>
                                <option value="nombre">Nombre</option>
                                <option value="direccion">Dirección</option>
                                <option value="telefono">Teléfono</option>
                                <option value="email">Email</option>
                            </select>
                        </div>
                        <div class="col-md-8">
                            <label class="form-label fw-bold">Término de búsqueda:</label>
                            <input type="text" class="form-control" v-model="buscar" 
                                   @keyup="listarAlumnos()" placeholder="Ingrese el dato a buscar...">
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead class="table-dark text-center">
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Dirección</th>
                                    <th>Teléfono</th>
                                    <th>Email</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="alumno in alumnos" :key="alumno.idAlumno" 
                                    @click="modificarAlumno(alumno)" class="clickable-row">
                                    <td>{{ alumno.codigo }}</td>
                                    <td>{{ alumno.nombre }}</td>
                                    <td>{{ alumno.direccion }}</td>
                                    <td>{{ alumno.telefono }}</td>
                                    <td>{{ alumno.email }}</td>
                                    <td class="text-center">
                                        <button class="btn btn-danger btn-sm" 
                                            @click.stop="eliminarAlumno(alumno)">
                                            ❌
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
`,
style: `
    .clickable-row {
        cursor: pointer;
        transition: background 0.2s ease-in-out;
    }
    .clickable-row:hover {
        background-color: #f8f9fa !important;
    }
`
};