<!-- src/components/NavBar.vue -->
<template>
    <header>
      <nav>
        <!-- Si el usuario no está autenticado, muestra el enlace de "Inicio" -->
        <RouterLink v-if="!isAuthenticated" to="/" class="nav-link">Inicio</RouterLink>
  
        <!-- Si el usuario está autenticado, muestra el enlace de "Departamentos" -->
        <RouterLink v-else to="/departamentos" class="nav-link">Departamentos</RouterLink>
  
        <!-- Si el usuario no está autenticado, muestra los enlaces para registrarse e iniciar sesión -->
        <RouterLink v-if="!isAuthenticated" to="/register" class="nav-link">Registrarse</RouterLink>
        <RouterLink v-if="!isAuthenticated" to="/login" class="nav-link">Iniciar Sesión</RouterLink>
  
        <!-- Si el usuario está autenticado, muestra el enlace de "Reservas" -->
        <RouterLink v-else to="/reservas" class="nav-link">Reservas</RouterLink>
  
        <!-- Si el usuario está autenticado, muestra el botón de "Cerrar Sesión" -->
        <button v-if="isAuthenticated" @click="logout" class="nav-link">Cerrar Sesión</button>
      </nav>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'; // Importa las funciones necesarias de Vue
  import { useRouter } from 'vue-router'; // Importa useRouter para manejar la navegación
  
  // Declara una variable reactiva 'isAuthenticated' para saber si el usuario está autenticado
  const isAuthenticated = ref(false);
  
  // Crea una instancia del enrutador para poder redirigir después de la acción de cierre de sesión
  const router = useRouter();
  
  // Verifica si el usuario está en el localStorage (para mantener la sesión)
  onMounted(() => {
    const user = localStorage.getItem('user'); // Obtiene el objeto 'user' desde el localStorage
    if (user) {
      isAuthenticated.value = true; // Si el usuario existe en localStorage, el usuario está autenticado
    }
  });
  
  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('user'); // Elimina el objeto 'user' del localStorage para cerrar sesión
    isAuthenticated.value = false; // Cambia el estado de autenticación a falso
    router.push('/login'); // Redirige al usuario a la página de login después de cerrar sesión
  };
  </script>
  
  <style scoped>
  /* Estilos para el header, nav y nav-link */
  header {
    height: 10%; /* Altura del encabezado */
    background-color: #1b3a1b; /* Color de fondo verde oscuro */
    padding: 1rem 0; /* Espaciado vertical */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* Sombra sutil */
  }
  
  nav {
    display: flex; /* Para que los enlaces estén en línea */
    justify-content: center; /* Centra los enlaces */
    width: 100%; /* Asegura que el nav ocupe todo el ancho disponible */
  }
  
  .nav-link {
    display: inline-block; /* Muestra los enlaces en línea */
    padding: 0.75rem 1.5rem; /* Espaciado de los enlaces */
    color: white; /* Color del texto blanco */
    text-decoration: none; /* Sin subrayado */
    font-weight: bold; /* Texto en negrita */
    transition: background-color 0.3s, color 0.3s; /* Transición para el cambio de color */
    border-radius: 5px; /* Bordes redondeados */
    margin: 0 0.5rem; /* Espaciado entre los enlaces */
  }
  
  .nav-link:hover {
    background-color: #2e6e2e; /* Cambia el color de fondo cuando se pasa el ratón */
  }
  
  .nav-link.router-link-exact-active {
    background-color: #4caf50; /* Color de fondo verde cuando el enlace está activo */
    color: white; /* Texto blanco cuando el enlace está activo */
  }
  
  /* Estilo para el botón de cerrar sesión */
  button.nav-link {
    background-color: transparent; /* Fondo transparente para el botón */
    border: none; /* Sin borde */
    padding: 0.75rem 1.5rem; /* Espaciado del botón */
    color: white; /* Texto blanco */
    font-weight: bold; /* Texto en negrita */
    border-radius: 5px; /* Bordes redondeados */
    cursor: pointer; /* Cambia el cursor a puntero al pasar sobre el botón */
    transition: background-color 0.3s, color 0.3s; /* Transición para el cambio de color */
  }
  
  button.nav-link:hover {
    background-color: #d9534f; /* Fondo rojo claro cuando se pasa el ratón */
    color: white; /* Texto blanco al pasar el ratón */
  }
  </style>
  