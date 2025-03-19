const buscarmateria = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            materias: [],
        }
    },
    methods: {
        modificarMateria(materia) {
            this.$emit('modificar', materia);
        },
        eliminarMateria(materia) {
            alertify.confirm('Eliminar Materia', `¿Está seguro de eliminar la materia ${materia.nombre}?`, async () => {
                materia.estado = "eliminado";
                await db.materias.put(materia);
                this.listarMaterias();
                alertify.success(`Materia ${materia.nombre} eliminada`);
            }, () => { });
        },
        async bajarMaterias() {
            let respuesta = await fetch('private/modulos/materias/materia.php?accion=consultar');
            let data = await respuesta.json();
            if (Array.isArray(data)) {
                await db.materias.clear();
                await db.materias.bulkAdd(data);
                this.listarMaterias();
            }
        },
        async listarMaterias() {
            this.materias = await db.materias
                .where(this.buscarTipo)
                .startsWithIgnoreCase(this.buscar)
                .toArray();
            
            if (this.materias.length < 1 && navigator.onLine) {
                this.bajarMaterias();
            }
        },
        async subirMaterias() {
            let materiasLocales = await db.materias.toArray();
            
            for (let materia of materiasLocales) {
                if (materia.estado === "nuevo") {
                    await fetch('private/modulos/materias/materia.php?accion=nuevo', {
                        method: 'POST',
                        body: JSON.stringify(materia),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await db.materias.delete(materia.codigo_transaccion);
                } else if (materia.estado === "modificado") {
                    await fetch('private/modulos/materias/materia.php?accion=modificar', {
                        method: 'POST',
                        body: JSON.stringify(materia),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await db.materias.put({ ...materia, estado: undefined });
                } else if (materia.estado === "eliminado") {
                    await fetch('private/modulos/materias/materia.php?accion=eliminar', {
                        method: 'POST',
                        body: JSON.stringify(materia),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await db.materias.delete(materia.codigo_transaccion);
                }
            }
        },
        async sincronizarDatos() {
            await this.subirMaterias();
            await this.bajarMaterias();
        }
    },
    created() {
        this.listarMaterias();
        window.addEventListener('online', this.sincronizarDatos);
    },
    beforeUnmount() {
        window.removeEventListener('online', this.sincronizarDatos);
    },
    template: `
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-dark text-white text-center">
                    <h5 class="mb-0">📚 Buscar Materias</h5>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <label class="form-label fw-bold">Buscar por:</label>
                            <select v-model="buscarTipo" class="form-select">
                                <option value="codigo">Código</option>
                                <option value="nombre">Nombre</option>
                                <option value="uv">UV</option>
                            </select>
                        </div>
                        <div class="col-md-8">
                            <label class="form-label fw-bold">Término de búsqueda:</label>
                            <input type="text" class="form-control" v-model="buscar" 
                                   @keyup="listarMaterias" placeholder="Ingrese el dato a buscar...">
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead class="table-dark text-center">
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>UV</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="materia in materias" :key="materia.codigo_transaccion"
                                    @click="modificarMateria(materia)" class="clickable-row">
                                    <td>{{ materia.codigo }}</td>
                                    <td>{{ materia.nombre }}</td>
                                    <td>{{ materia.uv }}</td>
                                    <td class="text-center">
                                        <button class="btn btn-danger btn-sm" 
                                            @click.stop="eliminarMateria(materia)">
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