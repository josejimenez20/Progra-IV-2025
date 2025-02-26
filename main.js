const { createApp, ref } = Vue;
const Dexie = window.Dexie,
    db = new Dexie('db_codigo_estudiante');

const app = createApp({
    components: {
        autor,
        libro,
        buscarAutor,
        buscarLibro
    },
    data() {
        return {
            forms: {
                autor: { mostrar: false },
                buscarAutor: { mostrar: false },
                libro: { mostrar: false },
                buscarLibro: { mostrar: false }
            },
        };
    },
    methods: {
        buscar(form, metodo) {
            this.$refs[form][metodo]();
        },
        abrirFormulario(componente) {
            this.forms[componente].mostrar = !this.forms[componente].mostrar;
        },
        modificar(form, metodo, datos) {
            this.$refs[form][metodo](datos);
        }
    },
    created() {
        db.version(1).stores({
            autores: '++idAutor, codigo, nombre, pais, telefono',
            libros: '++idLibro, autorId, codigo, titulo, editorial, edicion'
        });
    }
});

app.mount('#app');
