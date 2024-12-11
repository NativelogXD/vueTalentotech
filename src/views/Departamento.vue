<script setup lang="ts">
import { onMounted } from 'vue';
import { useDepartamentoStore } from '@/stores/departamentoStore'; // Importa el store que gestiona los departamentos
import type { Apartamento } from '@/interfaces/Apartamento'; // Importa el tipo Apartamento

const departamentoStore = useDepartamentoStore(); // Accede al store para obtener los departamentos

// Llama a la acción 'loadDepartamentos' cuando el componente se monta
onMounted(async () => {
  await departamentoStore.loadDepartamentos(); // Carga la lista de departamentos al montarse el componente
});

// Accede a la lista de departamentos y al mensaje de error desde el store
const departamentos = departamentoStore.departamentos;
const errorMessage = departamentoStore.errorMessage;
</script>

<template>
  <div class="departamentos-page">
    <header class="header">
      <h1>Bienvenido a la Vista de Departamentos</h1>
      <p>Aquí puedes ver y reservar departamentos.</p>
    </header>

    <main class="main-content">
      <!-- Mostrar mensaje de error si existe -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <div v-if="!errorMessage" class="departamentos-grid">
        <router-link 
          v-for="departamento in departamentos" 
          :key="departamento.id" 
          :to="{ name: 'apartamento-detail', params: { id: departamento.id } }"
          class="departamento-card-link"
        >
          <div class="departamento-card">
            <!-- Imagen del departamento -->
            <img :src="departamento.imagen" :alt="departamento.titulo" class="departamento-image" />
            
            <!-- Título del departamento -->
            <h2 class="departamento-title">{{ departamento.titulo }}</h2>
            
            <!-- Descripción breve del departamento -->
            <p class="departamento-description">{{ departamento.descripcion }}</p>
            
            <!-- Ubicación del departamento -->
            <p class="departamento-location">Ubicación: {{ departamento.ubicacion }}</p>
            
            <!-- Precio del departamento -->
            <p class="departamento-price">Precio: ${{ departamento.precio }}</p>
            
            <!-- Disponibilidad del departamento -->
            <p class="departamento-availability">
              Disponibilidad: 
              <span :class="{ available: departamento.disponibilidad, unavailable: !departamento.disponibilidad }">
                {{ departamento.disponibilidad ? 'Disponible' : 'No disponible' }}
              </span>
            </p>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<style scoped>
:root {
  /* Definición de las variables de color para uso global */
  --dark-green: #1e3b1e; /* Verde oscuro para el fondo */
  --medium-green: #4caf50; /* Verde medio para resaltar elementos */
  --light-green: #66bb6a; /* Verde claro para texto o detalles secundarios */
  --white: #ffffff; /* Blanco para el texto */
}

.departamentos-page {
  /* Estilo principal de la página de departamentos */
  height: 90%; /* La altura de la página ocupa el 90% de la pantalla */
  text-align: center; /* Centra el texto dentro de la página */
  padding: 2rem; /* Agrega espacio interno alrededor del contenido */
  background-color: var(--dark-green); /* Fondo verde oscuro */
  color: var(--white); /* Texto blanco */
}

.header {
  /* Estilo para la cabecera de la página */
  margin-bottom: 2rem; /* Añade espacio debajo de la cabecera */
}

.main-content {
  /* Estilo para el contenedor de los departamentos */
  display: flex; /* Utiliza Flexbox para organizar los elementos */
  justify-content: center; /* Centra los elementos en el contenedor */
  flex-wrap: wrap; /* Permite que los elementos se ajusten a nuevas filas cuando sea necesario */
}

.departamentos-grid {
  /* Estilo para el grid de departamentos */
  display: grid; /* Utiliza CSS Grid para organizar las tarjetas de los departamentos */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Crea columnas que se ajustan al espacio disponible */
  gap: 1.5rem; /* Espacio entre las tarjetas de los departamentos */
  width: 100%; /* El grid ocupa el 100% del ancho disponible */
  max-width: 1200px; /* Limita el ancho máximo del grid a 1200px */
  margin: 0 auto; /* Centra el grid dentro de su contenedor */
}

.departamento-card-link {
  /* Estilo para los enlaces que rodean las tarjetas de los departamentos */
  text-decoration: none; /* Elimina el subrayado del enlace */
  color: inherit; /* El color del texto se hereda del contenedor */
  display: block; /* Hace que el enlace sea un bloque de nivel completo */
  transition: transform 0.3s, box-shadow 0.3s; /* Agrega transiciones suaves para los efectos hover */
}

.departamento-card-link:hover .departamento-card {
  /* Estilo para la tarjeta del departamento cuando el enlace es hoverizado */
  transform: scale(1.05); /* Agranda ligeramente la tarjeta */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5); /* Agrega una sombra de caja más prominente */
}

.departamento-card {
  /* Estilo para la tarjeta de cada departamento */
  background-color: rgba(255, 255, 255, 0.05); /* Fondo ligeramente transparente */
  padding: 1rem; /* Añade espacio interno alrededor del contenido */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombra sutil para la tarjeta */
}

.departamento-image {
  /* Estilo para la imagen del departamento */
  width: 100%; /* La imagen ocupa todo el ancho de la tarjeta */
  height: 150px; /* Fija una altura para la imagen */
  object-fit: cover; /* Asegura que la imagen se recorte para llenar el área sin distorsionarse */
  border-radius: 4px; /* Bordes redondeados para la imagen */
  margin-bottom: 0.5rem; /* Espacio debajo de la imagen */
}

.departamento-title {
  /* Estilo para el título de la tarjeta del departamento */
  font-size: 1.5rem; /* Tamaño de fuente grande */
  color: var(--light-green); /* Usa el verde claro para el título */
  margin: 0.5rem 0; /* Espacio encima y debajo del título */
}

.departamento-description, 
.departamento-location, 
.departamento-price, 
.departamento-availability {
  /* Estilo para la descripción, ubicación, precio y disponibilidad */
  font-size: 1rem; /* Tamaño de fuente estándar */
  color: var(--white); /* Texto blanco */
  margin: 0.3rem 0; /* Espacio entre cada párrafo */
}

.departamento-availability .available {
  /* Estilo para el texto de disponibilidad cuando el departamento está disponible */
  color: var(--medium-green); /* Usa el verde medio para los departamentos disponibles */
}

.departamento-availability .unavailable {
  /* Estilo para el texto de disponibilidad cuando el departamento no está disponible */
  color: red; /* Rojo para los departamentos no disponibles */
}
</style>


