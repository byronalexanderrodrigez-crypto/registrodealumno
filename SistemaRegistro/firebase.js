// Importar Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Configuración

const firebaseConfig = {

apiKey: "AIzaSyDPZH8Vy07h_Gb2bph1tDSHZSCx1WqDZdM",

authDomain: "conalep-prueba.firebaseapp.com",

projectId: "conalep-prueba",

storageBucket: "conalep-prueba.firebasestorage.app",

messagingSenderId: "1007581219700",

appId: "1:1007581219700:web:eaff766e9eecaa5c1afa21",

measurementId: "G-5K5MMKBQBG"

};

// Inicializar

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Exportar

export { db };