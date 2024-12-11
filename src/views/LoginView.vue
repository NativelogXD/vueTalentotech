<script setup lang="ts">
import { ref } from 'vue'; // Importa la función 'ref' de Vue para crear variables reactivas
import { useStoreLogin } from '@/stores/storeLogin'; // Importa el store de autenticación

// Variables del formulario
const email = ref(''); // Variable reactiva para capturar el email
const password = ref(''); // Variable reactiva para capturar la contraseña

// Store de autenticación
const authStore = useStoreLogin(); // Accede al store de login

// Acceso al mensaje de error en el store
const errorMessage = authStore.errorMessage; // Extrae el mensaje de error del store

// Función para manejar el envío del formulario
const handleLogin = async () => {
  await authStore.login(email.value, password.value); // Llama al método login del store con los valores del formulario
};
</script>

<template>
  <div class="login-page">
    <header class="header">
      <h1>Iniciar Sesión</h1>
      <p>Accede para gestionar tus reservas y mucho más.</p>
    </header>

    <main class="main-content">
      <form class="login-form" @submit.prevent="handleLogin">
        <!-- Si existe un mensaje de error, se muestra debajo del formulario -->
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <!-- Campo para capturar el email -->
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <!-- Campo para capturar la contraseña -->
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required />
        </div>

        <!-- Botón de envío -->
        <button type="submit" class="submit-button">Iniciar Sesión</button>
      </form>
    </main>
  </div>
</template>

<style scoped>
/* Definición de variables de colores para la paleta del sitio */
:root {
  --dark-green: #1e3b1e; /* Verde oscuro */
  --medium-green: #4caf50; /* Verde medio */
  --light-green: #66bb6a; /* Verde claro */
  --white: #ffffff; /* Blanco */
}

/* Estilo general de la página de login */
.login-page {
  height: 90%; /* La página ocupará el 90% de la altura de la ventana */
  display: flex; /* Utiliza Flexbox para alinear elementos */
  flex-direction: column; /* Los elementos se apilarán en columna */
  align-items: center; /* Los elementos se alinean horizontalmente al centro */
  text-align: center; /* El texto se centra */
  padding: 2rem; /* Espaciado interno de 2rem */
  background-color: var(--dark-green); /* Fondo verde oscuro */
  color: var(--white); /* Texto blanco */
}

/* Estilo del encabezado dentro de la página de login */
.header {
  margin-bottom: 2rem; /* Espaciado debajo del encabezado */
}

/* Estilo del título (h1) */
h1 {
  font-size: 2.5rem; /* Tamaño de fuente grande */
  color: var(--light-green); /* Color verde claro */
  font-weight: bold; /* Negrita */
  margin-bottom: 0.5rem; /* Espaciado debajo del título */
}

/* Estilo del subtítulo (p) */
p {
  font-size: 1.2rem; /* Tamaño de fuente para el subtítulo */
  color: var(--white); /* Color blanco */
}

/* Estilos para el contenedor principal del formulario */
.main-content {
  width: 100%; /* El contenedor ocupa todo el ancho disponible */
  max-width: 500px; /* Pero tiene un ancho máximo de 500px */
  margin: 0 auto; /* Centrado horizontal */
  background-color: rgba(255, 255, 255, 0.05); /* Fondo blanco semitransparente */
  border-radius: 8px; /* Bordes redondeados */
  padding: 2rem; /* Espaciado interno de 2rem */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombra suave para dar profundidad */
}

/* Estilos para el formulario de login */
.login-form {
  display: flex; /* Utiliza flexbox para el formulario */
  flex-direction: column; /* Los campos se apilan verticalmente */
  gap: 1.5rem; /* Espaciado entre los elementos del formulario */
}

/* Estilo para cada grupo de campos (input + label) */
.form-group {
  display: flex; /* Utiliza flexbox dentro del grupo */
  flex-direction: column; /* Los elementos dentro del grupo se apilan verticalmente */
  align-items: flex-start; /* Alinea los elementos al principio */
}

/* Estilos para las etiquetas de los campos */
label {
  font-size: 1rem; /* Tamaño de fuente para las etiquetas */
  color: var(--light-green); /* Color verde claro */
  margin-bottom: 0.5rem; /* Espaciado inferior */
}

/* Estilos para los campos de entrada (input) */
input[type="email"],
input[type="password"] {
  width: 100%; /* Los campos ocupan todo el ancho disponible */
  padding: 0.6rem; /* Espaciado interno en los campos */
  border: 2px solid var(--medium-green); /* Borde verde medio */
  border-radius: 4px; /* Bordes redondeados */
  background-color: var(--white); /* Fondo blanco */
  color: var(--dark-green); /* Color de texto verde oscuro */
  font-size: 1rem; /* Tamaño de fuente estándar */
  transition: border-color 0.3s; /* Transición suave al cambiar el color del borde */
}

/* Estilo cuando los campos de entrada están enfocados */
input[type="email"]:focus,
input[type="password"]:focus {
  border-color: var(--light-green); /* Cambia el borde a verde claro cuando está enfocado */
  outline: none; /* Elimina el borde azul por defecto del navegador */
}

/* Estilos para el mensaje de error */
.error-message {
  color: #ff6b6b; /* Color rojo suave para el mensaje de error */
  margin-bottom: 1rem; /* Espaciado debajo del mensaje de error */
  font-size: 0.9rem; /* Tamaño de fuente más pequeño */
}

/* Estilos para el botón de envío */
.submit-button {
  padding: 0.8rem; /* Espaciado interno */
  background-color: var(--medium-green); /* Fondo verde medio */
  color: var(--white); /* Texto blanco */
  font-weight: bold; /* Texto en negrita */
  font-size: 1rem; /* Tamaño de fuente estándar */
  border: none; /* Sin borde */
  border-radius: 6px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor a mano al pasar sobre el botón */
  transition: background-color 0.3s, transform 0.3s; /* Transiciones suaves para el fondo y la elevación */
}

/* Efecto al pasar el mouse sobre el botón */
.submit-button:hover {
  background-color: var(--light-green); /* Cambia el fondo a verde claro al pasar el mouse */
  transform: translateY(-2px); /* Eleva el botón ligeramente */
}

/* Efecto cuando el botón es presionado */
.submit-button:active {
  background-color: var(--medium-green); /* Restaura el fondo a verde medio cuando se presiona */
  transform: translateY(0); /* Restaura la elevación */
}
</style>

