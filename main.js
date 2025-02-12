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
            sexo: '',
            editando: false,
            mostrarTabla: false
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
        calcularEdad(fechaNacimiento) {
            let hoy = new Date();
            let nacimiento = new Date(fechaNacimiento);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            let mes = hoy.getMonth() - nacimiento.getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }
            return edad;
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
            this.editando = true; 
        },
        guardarAlumno() {
            if (this.alumnos.some(a => a.codigo === this.codigo && !this.editando)) {
                alertify.error("El código ya está registrado");
                return;
            }

            let edad = this.calcularEdad(this.fechaNacimiento);
            if (edad < 18) {
                alertify.warning("El alumno es menor de edad");
            } else if (edad >= 18 && edad < 21) {
                alertify.message("El alumno tiene entre 18 y 21 años");
            } else {
                alertify.success("El alumno es mayor de 21 años");
            }
            
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

            alertify.success(this.editando ? `Alumno ${alumno.nombre} actualizado` : `Alumno ${alumno.nombre} guardado correctamente`);

            this.limpiarFormulario();
        },
        listarAlumnos() {
            this.alumnos = [];
            for (let i = 0; i < localStorage.length; i++) {
                let clave = localStorage.key(i);
                let valor = localStorage.getItem(clave);
                this.alumnos.push(JSON.parse(valor));
            }
        },
        limpiarFormulario() {
            this.codigo = '';
            this.nombre = '';
            this.direccion = '';
            this.municipio = '';
            this.distrito = '';
            this.departamento = '';
            this.telefono = '';
            this.fechaNacimiento = '';
            this.sexo = '';
            this.editando = false;
        },
        toggleTabla() {
            this.mostrarTabla = !this.mostrarTabla;
        }
    },
    created() {
        this.listarAlumnos();
    }
}).mount('#app');
