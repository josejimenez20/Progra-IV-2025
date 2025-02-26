const buscarmatricula = {
    data() {
        return {
            matriculas: [],
            filtroPeriodo: '', 
            periodos: [ 
                { valor: 'Ciclo I - 2025', texto: 'Ciclo I - 2025' },
                { valor: 'Ciclo II - 2025', texto: 'Ciclo II - 2025' },
            ],
            alumnos: [] 
        };
    },
    methods: {
        listarMatriculas() {
            db.matriculas.toArray().then(matriculas => {
                this.matriculas = matriculas;
            });
        },
        aplicarFiltro() {
            if (this.filtroPeriodo) {
                db.matriculas.where('periodo').equals(this.filtroPeriodo).toArray().then(matriculas => {
                    this.matriculas = matriculas;
                });
            } else {
                this.listarMatriculas();
            }
        },
        modificarMatricula(matricula) {
            this.$emit('modificar', matricula);
        },
        eliminarMatricula(matricula) {
            alertify.confirm(
                'Eliminar Matrícula',
                `¿Estás seguro de eliminar la matrícula de ${this.obtenerNombreAlumno(matricula.alumnoSeleccionado)} (${matricula.periodo})?`,
                () => {
                    db.matriculas.delete(matricula.idMatricula).then(() => {
                        alertify.success('Matrícula eliminada correctamente.');
                        this.listarMatriculas();
                    }).catch(() => {
                        alertify.error('Error al eliminar la matrícula.');
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
        }
    },
    mounted() {
        this.listarMatriculas();
        db.alumnos.toArray().then(alumnos => {
            this.alumnos = alumnos;
        });
    },
    template: `
        <div class="row">
            <div class="col-12">
                <div class="card border-dark mb-3">
                    <div class="card-header bg-dark text-white">Buscar Matrículas</div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col-3 col-md-2">Filtrar por período:</div>
                            <div class="col-9 col-md-4">
                                <select v-model="filtroPeriodo" class="form-control" @change="aplicarFiltro">
                                    <option value="">Todos los períodos</option>
                                    <option v-for="periodo in periodos" :key="periodo.valor" :value="periodo.valor">
                                        {{ periodo.texto }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Alumno</th>
                                    <th>Fecha</th>
                                    <th>Período</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="matricula in matriculas" :key="matricula.idMatricula">
                                    <td>{{ obtenerNombreAlumno(matricula.alumnoSeleccionado) }}</td>
                                    <td>{{ matricula.fecha }}</td>
                                    <td>{{ matricula.periodo }}</td>
                                    <td>
                                        <button @click="modificarMatricula(matricula)" class="btn btn-warning">Modificar</button>
                                        <button @click="eliminarMatricula(matricula)" class="btn btn-danger">Eliminar</button>
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