<template>
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
                            </select>
                        </th>
                        <th colspan="3">
                            <input type="text" @keyup="listarDocentes()" v-model="buscar" class="form-control">
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
                    <tr v-for="docente in docentes" @click="modificarDocente(docente)" :key="docente.codigo_transaccion">
                        <td>{{ docente.codigo }}</td>
                        <td>{{ docente.nombre }}</td>
                        <td>{{ docente.uv }}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" @click.stop="eliminarDocente(docente)">DEL</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import alertify from 'alertifyjs';

export default {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            docentes: [],
        }
    },
    methods: {
        modificarDocente(docente) {
            this.$emit('modificar', docente);
        },
        eliminarDocente(docente) {
            alertify.confirm('Eliminar Docente', `¿Está seguro de eliminar al docente ${docente.nombre}?`, async () => {
                axios({
                    method: 'DELETE',
                    url: `docente`,
                    data: docente,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.data.msg !== 'ok') {
                        alertify.error(response.data.msg);
                    } else {
                        db.docentes.delete(docente.codigo_transaccion);
                        this.listarDocentes();
                        alertify.success(`Docente ${docente.nombre} eliminado`);
                    }
                }).catch(error => {
                    alertify.error('Error al eliminar el docente: ' + error);
                });
            }, () => {});
        },
        async listarDocentes() {
            this.docentes = await db.docentes.filter(docente =>
                docente[this.buscarTipo]?.toLowerCase().includes(this.buscar.toLowerCase())
            ).toArray();

            if (this.docentes.length < 1) {
                axios({
                    method: 'GET',
                    url: `docente`,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    this.docentes = response.data;
                    db.docentes.bulkAdd(response.data);
                }).catch(error => {
                    alertify.error('Error al obtener los docentes: ' + error);
                });
            }
        },
    },
    created() {
        this.listarDocentes();
    }
}
</script>
