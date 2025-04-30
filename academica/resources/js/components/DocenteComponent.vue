<template>
    <div class="row">
        <div class="col-6">
            <form id="frmDocente" name="frmDocente" @submit.prevent="guardarDocente">
                <div class="card border-dark mb-3">
                    <div class="card-header bg-dark text-white">Registro de Docentes</div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col-3 col-md-2">CÓDIGO</div>
                            <div class="col-9 col-md-4">
                                <input required v-model="docente.codigo" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">NOMBRE</div>
                            <div class="col-9 col-md-6">
                                <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="docente.nombre" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">UV</div>
                            <div class="col-9 col-md-4">
                                <input required type="number" min="1" v-model="docente.uv" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-dark text-center">
                        <input type="submit" value="Guardar" class="btn btn-primary">
                        <input type="reset" value="Nuevo" class="btn btn-warning" @click="nuevoDocente">
                        <input type="button" @click="buscarDocente" value="Buscar" class="btn btn-info">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import alertify from 'alertifyjs';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

export default {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            docente: {
                codigo: '',
                nombre: '',
                uv: '',
                codigo_transaccion: uuidv4(),
            }
        }
    },
    methods: {
        buscarDocente() {
            this.forms.buscarDocente.mostrar = !this.forms.buscarDocente.mostrar;
            this.$emit('buscar');
        },
        modificarDocente(docente) {
            this.accion = 'modificar';
            this.docente = { ...docente };
        },
        guardarDocente() {
            let docente = { ...this.docente },
                metodo = 'POST';

            docente.hash = CryptoJS.SHA256(JSON.stringify({
                codigo: docente.codigo,
                nombre: docente.nombre,
                uv: docente.uv
            })).toString();

            if (this.accion === 'modificar') {
                metodo = 'PUT';
            }

            axios({
                method: metodo,
                url: `docente`,
                data: docente,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.data.msg !== 'ok') {
                    alertify.error(response.data.msg);
                } else {
                    this.nuevoDocente();
                    this.$emit('buscar');
                }
            }).catch(error => {
                alertify.error('Error al guardar el docente: ' + error);
            });
        },
        nuevoDocente() {
            this.accion = 'nuevo';
            this.docente = {
                codigo: '',
                nombre: '',
                uv: '',
                codigo_transaccion: uuidv4()
            };
        }
    }
}
</script>
