const buscarmateria = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            materias: [],
        };
    },
    methods: {
        modificarMateria(materia) {
            this.$emit('modificar', materia);
        },
        eliminarMateria(materia) {
            alertify.confirm('Eliminar Materia', `¿Está seguro de eliminar la materia ${materia.nombre}?`, async () => {
                try {
                    let respuesta = await fetch(`private/modulos/materias/materia.php?accion=eliminar&materias=${JSON.stringify(materia)}`);
                    let data = await respuesta.json();
                    
                    if (data.msg !== 'ok') {
                        alertify.error(data.msg);
                    } else {
                        db.materias.delete(materia.idMateria);
                        this.listarMaterias();
                        alertify.success(`Materia ${materia.nombre} eliminada`);
                    }
                } catch (error) {
                    console.error("Error eliminando materia:", error);
                    alertify.error("Hubo un error al eliminar la materia.");
                }
            }, () => {});
        },
        async listarMaterias() {
            try {
                this.materias = await db.materias.toArray();
                
                if (this.materias.length < 1) {
                    let respuesta = await fetch('private/modulos/materias/materia.php?accion=consultar');
                    let data = await respuesta.json();
                    
                    if (Array.isArray(data) && data.length > 0) {
                        this.materias = data;
                        await db.materias.bulkAdd(data).catch(err => console.error("Error guardando en IndexedDB:", err));
                    }
                }
            } catch (error) {
                console.error("Error listando materias:", error);
            }
        },
        nuevoMateria() {
            this.$emit('nuevo');
        }
    },
    created() {
        this.listarMaterias();
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
                                    <option value="uv">UV</option>
                                </select>
                            </th>
                            <th colspan="4">
                                <input type="text" @input="listarMaterias" v-model="buscar" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>NOMBRE</th>
                            <th>UV</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="materia in materias" :key="materia.idMateria">
                            <td>{{ materia.codigo }}</td>
                            <td>{{ materia.nombre }}</td>
                            <td>{{ materia.uv }}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" @click.stop="eliminarMateria(materia)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};
