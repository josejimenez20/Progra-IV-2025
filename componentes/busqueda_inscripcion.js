const buscarinscripcion = {
    data() {
        return {
            inscripciones: [], 
            filtroAlumno: '', 
            alumnos: [], 
            materias: [] 
        };
    },
    methods: {
        listarInscripciones() {
            db.inscripciones.toArray().then(inscripciones => {
                this.inscripciones = inscripciones;
            }).catch(error => {
                console.error("Error al cargar inscripciones:", error);
            });
        },
        aplicarFiltro() {
            if (this.filtroAlumno) {
                db.inscripciones.where('alumnoSeleccionado').equals(this.filtroAlumno).toArray().then(inscripciones => {
                    this.inscripciones = inscripciones;
                });
            } else {
                this.listarInscripciones();
            }
        },
        modificarInscripcion(inscripcion) {
            this.$emit('modificar', inscripcion);
        },
        eliminarInscripcion(inscripcion) {
            alertify.confirm(
                'Eliminar Inscripción',
                `¿Estás seguro de eliminar la inscripción de ${this.obtenerNombreAlumno(inscripcion.alumnoSeleccionado)}?`,
                () => {
                    db.inscripciones.delete(inscripcion.idInscripcion).then(() => {
                        alertify.success('Inscripción eliminada correctamente.');
                        this.listarInscripciones();
                    }).catch(() => {
                        alertify.error('Error al eliminar la inscripción.');
                    });
                },
                () => {
                    alertify.warning('Eliminación cancelada.');
                }
            );
        },
        obtenerNombreAlumno(idAlumno) {
            const alumno = this.alumnos.find(a => a.idAlumno === idAlumno);
            return alumno ? alumno.nombre : 'Desconocido';
        },
        obtenerNombreMateria(idMateria) {
            const materia = this.materias.find(m => m.idMateria === idMateria);
            return materia ? materia.nombre : 'Desconocida';
        },
        cargarAlumnos() {
            db.alumnos.toArray().then(alumnos => {
                this.alumnos = alumnos;
            }).catch(error => {
                console.error("Error al cargar alumnos:", error);
            });
        },
        cargarMaterias() {
            db.materias.toArray().then(materias => {
                this.materias = materias;
            }).catch(error => {
                console.error("Error al cargar materias:", error);
            });
        }
    },
    mounted() {
        this.listarInscripciones();
        this.cargarAlumnos();
        this.cargarMaterias();
    },
    template: `
        <div class="row">
            <div class="col-12">
                <div class="card border-dark mb-3">
                    <div class="card-header bg-dark text-white">Buscar Inscripciones</div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col-3 col-md-2">Filtrar por alumno:</div>
                            <div class="col-9 col-md-4">
                                <select v-model="filtroAlumno" class="form-control" @change="aplicarFiltro">
                                    <option value="">Todos los alumnos</option>
                                    <option v-for="alumno in alumnos" :key="alumno.idAlumno" :value="alumno.idAlumno">
                                        {{ alumno.nombre }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Alumno</th>
                                    <th>Fecha</th>
                                    <th>Materias Inscritas</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="inscripcion in inscripciones" :key="inscripcion.idInscripcion">
                                    <td>{{ obtenerNombreAlumno(inscripcion.alumnoSeleccionado) }}</td>
                                    <td>{{ inscripcion.fecha }}</td>
                                    <td>
                                        <ul>
                                            <li v-for="materia in inscripcion.materias" :key="materia.idMateria">
                                                {{ obtenerNombreMateria(materia.idMateria) }}
                                            </li>
                                        </ul>
                                    </td>
                                    <td>
                                        <button @click="modificarInscripcion(inscripcion)" class="btn btn-warning">Modificar</button>
                                        <button @click="eliminarInscripcion(inscripcion)" class="btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
};