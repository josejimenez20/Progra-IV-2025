const { createApp } = Vue;

createApp({
    data() {
        return {
            alumnos: [],
            busqueda: '', 
            codigo: '',
            nombre: '',
            direccion: '',
            municipio: '',
            distrito: '',
            departamento: '',
            telefono: '',
            fechaNacimiento: '',
            sexo: ''
        };
    },
    computed: {
        alumnosFiltrados() {
            return this.alumnos.filter(alumno => 
                alumno.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                alumno.telefono.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                alumno.codigo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                alumno.fechaNacimiento.toLowerCase().includes(this.busqueda.toLowerCase()) 
            );
        }
    },
    methods: {
        validarTelefono() {
            this.telefono = this.telefono.replace(/[^0-9-]/g, '');
        },
        eliminarAlumno(alumno) {
            alertify.confirm(
                "Confirmación",
                `¿Está seguro de eliminar al alumno ${alumno.nombre}?`,
                () => {
                    localStorage.removeItem(alumno.codigo);
                    this.listarAlumnos();
                    alertify.success(`Alumno ${alumno.nombre} eliminado correctamente`);

                },
                () => {
                    alertify.error('Cancelada');
                }
            );
        },
        verAlumno(alumno) {
            this.codigo = alumno.codigo;
            this.nombre = alumno.nombre;
            this.direccion = alumno.direccion;
            this.municipio = alumno.municipio;
            this.distrito = alumno.distrito;
            this.departamento = alumno.departamento;
            this.telefono = alumno.telefono;
            this.fechaNacimiento = alumno.fechaNacimiento;
            this.sexo = alumno.sexo;
        },
        guardarAlumno() {
            let alumno = {
                codigo: this.codigo,
                nombre: this.nombre,
                direccion: this.direccion,
                municipio: this.municipio,
                distrito: this.distrito,
                departamento: this.departamento,
                telefono: this.telefono,
                fechaNacimiento: this.fechaNacimiento,
                sexo: this.sexo
            };
            localStorage.setItem(this.codigo, JSON.stringify(alumno));
            this.listarAlumnos();
            alertify.success(`Alumno ${alumno.nombre} guardado correctamente`);
        },
        listarAlumnos() {
            this.alumnos = [];
            for (let i = 0; i < localStorage.length; i++) {
                let clave = localStorage.key(i),
                    valor = localStorage.getItem(clave);
                this.alumnos.push(JSON.parse(valor));
            }
        }
    },
    created() {
        this.listarAlumnos();
    }
}).mount('#app');