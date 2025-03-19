const {createApp, ref} = Vue;
const {v4: uuidv4} = uuid;
const Dexie = window.Dexie,
    db = new Dexie('db_academico');


    window.addEventListener('load', () => {
        if (navigator.onLine) {
            console.log("Conectado a Internet");
            sincronizarDatos(); 
        } else {
            console.log("Sin conexión, guardando en IndexedDB");
        }
    });

    window.addEventListener('online', () => {
        console.log("Se ha reconectado, sincronizando datos...");
        sincronizarDatos();
    });
    
    window.addEventListener('offline', () => {
        console.log("Se ha perdido la conexión, guardando en IndexedDB...");
    });

const app = createApp({
    components: {
        alumno,
        materia,
        buscaralumno,
        buscarmateria
    },
    data() {
        return {
            forms : {
                alumno: {mostrar: false},
                buscarAlumno: {mostrar: false},
                materia: {mostrar: false},
                buscarMateria: {mostrar: false},
                matricula: {mostrar: false},
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
            alumnos: 'codigo_transaccion, codigo, nombre, direccion, telefono, email',
            materias: 'codigo_transaccion, codigo, nombre, uv',
        });
    }
});
app.mount('#app');
