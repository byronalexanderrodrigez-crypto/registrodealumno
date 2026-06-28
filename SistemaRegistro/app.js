import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
updateDoc,
doc,
onSnapshot
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

//=========================
// VARIABLES
//=========================

const alumnos = collection(db,"alumnos");

const txtNombre=document.getElementById("nombre");
const txtApellido=document.getElementById("apellido");
const txtTelefono=document.getElementById("telefono");
const txtCarrera=document.getElementById("carrera");
const txtSemestre=document.getElementById("semestre");
const txtTurno=document.getElementById("turno");

const btnGuardar=document.getElementById("guardar");

const usuario=document.getElementById("usuario");
const password=document.getElementById("password");

const btnLogin=document.getElementById("btnLogin");

const btnCerrar=document.getElementById("cerrarSesion");

const panel=document.getElementById("panelAdmin");

const publico=document.getElementById("registroPublico");

const tabla=document.getElementById("tabla");

const buscar=document.getElementById("buscar");

let editando=false;

let idEditar="";
//=========================
// LOGIN
//=========================

btnLogin.addEventListener("click", () => {

    const u = usuario.value.trim();
    const p = password.value.trim();

    if (
        (u === "byron" && p === "byron123") ||
        (u === "clara" && p === "clara123")
    ) {

        panel.style.display = "block";
        publico.style.display = "none";
        btnCerrar.style.display = "block";

        cargarAlumnos();

    } else {

        alert("Usuario o contraseña incorrectos.");

    }

});

//=========================
// CERRAR SESIÓN
//=========================

btnCerrar.addEventListener("click", () => {

    usuario.value = "";
    password.value = "";

    panel.style.display = "none";
    publico.style.display = "block";
    btnCerrar.style.display = "none";

});

//=========================
// GUARDAR
//=========================

btnGuardar.addEventListener("click", async () => {

    const alumno = {

        nombre: txtNombre.value.trim(),
        apellido: txtApellido.value.trim(),
        telefono: txtTelefono.value.trim(),
        carrera: txtCarrera.value.trim(),
        semestre: txtSemestre.value,
        turno: txtTurno.value

    };

    if (
        alumno.nombre === "" ||
        alumno.apellido === "" ||
        alumno.telefono === "" ||
        alumno.carrera === "" ||
        alumno.semestre === "" ||
        alumno.turno === ""
    ) {

        alert("Complete todos los campos.");
        return;

    }

    if (editando) {

        await updateDoc(doc(db, "alumnos", idEditar), alumno);

        editando = false;
        idEditar = "";

        btnGuardar.textContent = "Guardar Registro";

    } else {

        await addDoc(alumnos, alumno);

    }

    txtNombre.value = "";
    txtApellido.value = "";
    txtTelefono.value = "";
    txtCarrera.value = "";
    txtSemestre.value = "";
    txtTurno.value = "";

    alert("Registro guardado correctamente.");

});
//=========================
// CARGAR ALUMNOS
//=========================

function cargarAlumnos() {

    onSnapshot(alumnos, (snapshot) => {

        tabla.innerHTML = "";

        snapshot.forEach((registro) => {

            const alumno = registro.data();

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.telefono}</td>
                <td>${alumno.carrera}</td>
                <td>${alumno.semestre}</td>
                <td>${alumno.turno}</td>
                <td>
                    <button class="editar">Editar</button>
                    <button class="eliminar">Eliminar</button>
                </td>
            `;

            // BOTÓN EDITAR

            fila.querySelector(".editar").addEventListener("click", () => {

                txtNombre.value = alumno.nombre;
                txtApellido.value = alumno.apellido;
                txtTelefono.value = alumno.telefono;
                txtCarrera.value = alumno.carrera;
                txtSemestre.value = alumno.semestre;
                txtTurno.value = alumno.turno;

                editando = true;
                idEditar = registro.id;

                btnGuardar.textContent = "Actualizar Registro";

                window.scrollTo({
                    top:0,
                    behavior:"smooth"
                });

            });

            // BOTÓN ELIMINAR

            fila.querySelector(".eliminar").addEventListener("click", async () => {

                const respuesta = confirm("¿Desea eliminar este registro?");

                if(!respuesta) return;

                await deleteDoc(doc(db,"alumnos",registro.id));

            });

            tabla.appendChild(fila);

        });

    });

}