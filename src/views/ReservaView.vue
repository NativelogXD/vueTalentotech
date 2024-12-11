<script setup lang="ts">
import { onMounted } from 'vue'; // Importa el hook 'onMounted' de Vue para ejecutar código al montar el componente.
import { useReservaStore } from '@/stores/reservaStore'; // Importa el store de reservas que gestionará el estado de las reservas.

// Accede al store de reservas
const reservaStore = useReservaStore();

// Obtén el usuario desde el localStorage. Si no hay un usuario almacenado, se asigna un objeto vacío.
const user = JSON.parse(localStorage.getItem('user') || '{}');

// Cargar las reservas y apartamentos cuando el componente se monta
onMounted(async () => {
  if (user && user.id) { // Verifica que el usuario tenga un ID válido
    await reservaStore.loadReservas(user.id); // Llama al método 'loadReservas' del store para cargar las reservas del usuario.
  } else {
    console.error("No se encontró el ID del usuario en el localStorage."); // Si no se encuentra el ID del usuario, muestra un error.
  }
});

// Accede a los datos de reservas y apartamentos desde el store
const reservas = reservaStore.reservas; // Lista de reservas obtenidas del store
const apartamentos = reservaStore.apartamentos; // Lista de apartamentos correspondientes a las reservas, también del store
const errorMessage = reservaStore.errorMessage; // Mensaje de error, si existe, del store
</script>

<template>
  <div class="reservas-page">
    <header>
      <h1>Tus Reservas</h1> <!-- Título principal de la página -->
    </header>

    <main>
      <!-- Mostrar mensaje de error si existe -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div> <!-- Muestra el mensaje de error si está presente -->

      <!-- Si no hay reservas y no hay errores, muestra un mensaje -->
      <div v-if="reservas.length === 0 && !errorMessage">
        <p>No tienes reservas activas.</p> <!-- Mensaje cuando no hay reservas activas -->
      </div>

      <!-- Si hay reservas, las muestra -->
      <div v-else>
        <div v-for="(reserva, index) in reservas" :key="reserva.id" class="apartamento-card">
          <!-- Para cada reserva, muestra la información del apartamento correspondiente -->
          <h2>{{ apartamentos[index]?.titulo }}</h2> <!-- Título del apartamento -->
          <img :src="apartamentos[index]?.imagen" alt="Imagen del apartamento"> <!-- Imagen del apartamento -->
          <p>{{ apartamentos[index]?.descripcion }}</p> <!-- Descripción del apartamento -->
          <p>Ubicación: {{ apartamentos[index]?.ubicacion }}</p> <!-- Ubicación del apartamento -->
          <p>Fecha Inicio: {{ new Date(reserva.fechaInicio).toLocaleDateString() }}</p> <!-- Fecha de inicio de la reserva -->
          <p>Fecha Fin: {{ new Date(reserva.fechaFin).toLocaleDateString() }}</p> <!-- Fecha de fin de la reserva -->
          <p>Precio Total: {{ reserva.precioTotal }}</p> <!-- Precio total de la reserva -->
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Estilos para las cartas de apartamentos */
.apartamento-card {
  display: flex; /* Usamos Flexbox para organizar los elementos dentro de la carta */
  flex-direction: column; /* En pantallas pequeñas, los elementos dentro de la carta se organizan en columna */
  align-items: center; /* Alineamos todos los elementos de la carta al centro */
  border: 1px solid #ddd; /* Borde gris claro para la carta */
  border-radius: 8px; /* Bordes redondeados para la carta */
  padding: 1.5rem; /* Espaciado interno de la carta */
  margin-bottom: 1.5rem; /* Espaciado inferior entre las cartas */
  background-color: #ffffff; /* Fondo blanco para las cartas */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave para dar un efecto de profundidad */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transición suave para cuando el usuario pasa el mouse sobre la carta */
}

/* Estilo cuando el usuario pasa el mouse sobre la carta */
.apartamento-card:hover {
  transform: translateY(-5px); /* Eleva ligeramente la carta hacia arriba */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* Sombra más fuerte al pasar el mouse para dar el efecto de elevación */
}

/* Estilo para la imagen dentro de la carta */
.apartamento-card img {
  max-width: 100%; /* Hace que la imagen ocupe todo el ancho disponible sin exceder el tamaño del contenedor */
  height: auto; /* Mantiene la proporción de la imagen */
  border-radius: 8px; /* Bordes redondeados para la imagen */
  margin-bottom: 1rem; /* Espaciado inferior entre la imagen y el texto */
}

/* Estilo para el título de la carta */
.apartamento-card h2 {
  font-size: 1.5rem; /* Tamaño de fuente más grande para el título */
  margin: 0.5rem 0; /* Espaciado superior e inferior para el título */
  color: #333; /* Color oscuro para el título, para asegurar que sea legible */
}

/* Estilo para los párrafos dentro de la carta */
.apartamento-card p {
  margin: 0.5rem 0; /* Espaciado superior e inferior entre los párrafos */
  color: #666; /* Color gris claro para los párrafos */
  text-align: center; /* Alineación centrada para los textos en pantallas pequeñas */
}

/* Estilo para el último párrafo (generalmente el precio) */
.apartamento-card p:last-of-type {
  font-weight: bold; /* Se pone en negrita el último párrafo */
  color: #4caf50; /* Verde para destacar el precio y hacerlo resaltar */
}

/* Estilos específicos para pantallas más grandes (desde 768px en adelante) */
@media (min-width: 768px) {
  .apartamento-card {
    flex-direction: row; /* Cambia la disposición a fila (horizontal) en pantallas grandes */
    align-items: flex-start; /* Alinea los elementos al inicio en lugar de centrarlos */
  }

  .apartamento-card img {
    max-width: 40%; /* La imagen ocupa el 40% del espacio disponible en pantallas grandes */
    margin-right: 1.5rem; /* Espaciado derecho entre la imagen y el texto */
  }

  .apartamento-card h2 {
    text-align: left; /* Alinea el título a la izquierda en pantallas grandes */
  }

  .apartamento-card p {
    text-align: left; /* Alinea los párrafos a la izquierda en pantallas grandes */
  }
}
</style>

