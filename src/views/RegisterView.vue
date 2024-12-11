<script setup lang="ts">
import { ref } from 'vue';  // Importamos `ref` de Vue para crear variables reactivas.
import { useStoreRegister } from '@/stores/storeRegister'; // Importamos la tienda de registro, para acceder a la lógica de registro

const authStore = useStoreRegister(); // Accedemos a la tienda de registro

// Variables reactivas para almacenar los valores del formulario
const username = ref('');  // Nombre de usuario
const email = ref('');     // Correo electrónico
const password = ref('');  // Contraseña

// Función que maneja el envío del formulario
const handleRegister = async () => {
  // Verificamos que todos los campos estén completos
  if (username.value && email.value && password.value) {
    // Llamamos a la función `register` de la tienda para registrar al usuario
    const usuarioRegistrado = await authStore.register(username.value, email.value, password.value);
    // Si el registro es exitoso, mostramos una alerta al usuario
    if (usuarioRegistrado) {
      alert('¡Registro exitoso!');
    } else {
      // Si hubo un error, mostramos el mensaje de error desde la tienda
      alert(authStore.errorMessage);
    }
  } else {
    // Si algún campo está vacío, mostramos una alerta pidiendo completar todos los campos
    alert('Por favor, completa todos los campos.');
  }
};
</script>

<template>
  <div class="register-page"> <!-- Contenedor principal para la página de registro -->
    <header class="header"> <!-- Encabezado de la página -->
      <h1>Crear Cuenta</h1> <!-- Título de la página -->
      <p>Únete y comienza a reservar tu hotel ideal</p> <!-- Subtítulo -->
    </header>

    <main class="main-content"> <!-- Contenedor principal del formulario -->
      <!-- Formulario de registro -->
      <form class="register-form" @submit.prevent="handleRegister">
        <!-- Campo de nombre de usuario -->
        <div class="form-group">
          <label for="username">Nombre de usuario</label> <!-- Etiqueta para el campo de nombre de usuario -->
          <input type="text" id="username" v-model="username" required /> <!-- Campo de entrada para el nombre de usuario -->
        </div>
        
        <!-- Campo de correo electrónico -->
        <div class="form-group">
          <label for="email">Correo Electrónico</label> <!-- Etiqueta para el campo de correo electrónico -->
          <input type="email" id="email" v-model="email" required /> <!-- Campo de entrada para el correo electrónico -->
        </div>
        
        <!-- Campo de contraseña -->
        <div class="form-group">
          <label for="password">Contraseña</label> <!-- Etiqueta para el campo de contraseña -->
          <input type="password" id="password" v-model="password" required /> <!-- Campo de entrada para la contraseña -->
        </div>

        <!-- Botón de envío del formulario -->
        <button type="submit" class="submit-button">Registrarse</button> <!-- Botón para enviar el formulario -->
      </form>

      <!-- Mensaje de error que se muestra si existe algún error -->
      <div v-if="authStore.errorMessage" class="error-message">{{ authStore.errorMessage }}</div> <!-- Mostramos el mensaje de error si la tienda tiene uno -->
    </main>
  </div>
</template>

<style scoped>
/* Definimos las variables de color en :root para facilitar su reutilización a lo largo del CSS */
:root {
  --dark-green: #1e3b1e; /* Verde oscuro */
  --medium-green: #4caf50; /* Verde medio (usado para botones) */
  --light-green: #66bb6a; /* Verde claro */
  --white: #ffffff; /* Blanco */
}

/* Estilos para la página de registro */
.register-page {
  height: 90%; /* Define la altura de la página */
  display: flex; /* Usa flexbox para el layout */
  flex-direction: column; /* Organiza los elementos en una columna */
  align-items: center; /* Centra los elementos horizontalmente */
  text-align: center; /* Centra el texto */
  padding: 2rem; /* Espaciado interno de 2rem */
  background-color: var(--dark-green); /* Fondo verde oscuro */
  color: var(--white); /* Texto blanco */
}

/* Estilos para el encabezado de la página */
.header {
  margin-bottom: 2rem; /* Espaciado debajo del encabezado */
}

/* Estilos para el título principal */
h1 {
  font-size: 2.5rem; /* Tamaño de fuente grande */
  color: var(--light-green); /* Color del texto verde claro */
  font-weight: bold; /* Pone el título en negrita */
  margin-bottom: 0.5rem; /* Espaciado debajo del título */
}

/* Estilos para el párrafo que describe la página */
p {
  font-size: 1.2rem; /* Tamaño de fuente para el párrafo */
  color: var(--white); /* Texto blanco */
}

/* Contenedor principal que envuelve el formulario */
.main-content {
  width: 100%; /* Asegura que ocupe todo el ancho disponible */
  max-width: 500px; /* Limita el ancho máximo del contenedor */
  margin: 0 auto; /* Centra el contenedor horizontalmente */
  background-color: rgba(255, 255, 255, 0.05); /* Fondo sutilmente transparente (efecto de desvanecimiento) */
  border-radius: 8px; /* Bordes redondeados */
  padding: 2rem; /* Espaciado interno de 2rem */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombra sutil para dar profundidad */
}

/* Estilos para el formulario de registro */
.register-form {
  display: flex; /* Usamos flexbox para el formulario */
  flex-direction: column; /* Los elementos se disponen en columna */
  gap: 1.5rem; /* Espaciado de 1.5rem entre cada campo */
}

/* Estilos para cada grupo de campos de formulario */
.form-group {
  display: flex; /* Usamos flexbox */
  flex-direction: column; /* Los elementos se disponen en columna */
  align-items: flex-start; /* Alineamos los elementos al inicio (izquierda) */
}

/* Estilos para las etiquetas del formulario */
label {
  font-size: 1rem; /* Tamaño de la fuente para las etiquetas */
  color: var(--light-green); /* Color de las etiquetas (verde claro) */
  margin-bottom: 0.5rem; /* Espaciado debajo de la etiqueta */
}

/* Estilos para los campos de texto, email y contraseña */
input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%; /* Los campos ocupan todo el ancho disponible */
  padding: 0.6rem; /* Espaciado interno de 0.6rem */
  border: 2px solid var(--medium-green); /* Borde de 2px con color verde medio */
  border-radius: 4px; /* Bordes redondeados */
  background-color: var(--white); /* Fondo blanco */
  color: var(--dark-green); /* Texto en verde oscuro */
  font-size: 1rem; /* Tamaño de fuente estándar */
  transition: border-color 0.3s; /* Transición suave para el color del borde */
}

/* Estilos para cuando los campos de entrada están enfocados */
input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  border-color: var(--light-green); /* Cambia el color del borde a verde claro cuando está enfocado */
  outline: none; /* Elimina el contorno por defecto */
}

/* Estilos para el botón de envío (registrarse) */
.submit-button {
  padding: 0.8rem; /* Espaciado interno de 0.8rem */
  background-color: var(--medium-green); /* Fondo verde medio */
  color: var(--white); /* Texto blanco */
  font-weight: bold; /* Negrita para el texto */
  font-size: 1rem; /* Tamaño de fuente estándar */
  border: none; /* Elimina el borde por defecto */
  border-radius: 6px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor a pointer (mano) */
  transition: background-color 0.3s, transform 0.3s; /* Transición suave para el color y el movimiento */
}

/* Estilos para cuando el botón es hover (cuando el mouse pasa por encima) */
.submit-button:hover {
  background-color: var(--light-green); /* Cambia el color de fondo a verde claro */
  transform: translateY(-2px); /* Efecto de elevación cuando el mouse pasa por encima */
}

/* Estilos para cuando el botón está activo (cuando se hace clic) */
.submit-button:active {
  background-color: var(--medium-green); /* Restaura el color de fondo al verde medio */
  transform: translateY(0); /* Restablece la elevación */
}
</style>

