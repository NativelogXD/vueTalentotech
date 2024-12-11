<script setup lang="ts">
import { ref, onMounted } from 'vue'; // Importa las funciones necesarias de Vue
import { useRoute } from 'vue-router'; // Importa useRoute para acceder a los parámetros de la ruta
import { getApartamentoById } from '@/services/ApartamentoService'; // Función para obtener el apartamento por ID
import { createReserva } from '@/services/ReservaService'; // Función para crear una reserva
import type { Apartamento } from '@/interfaces/Apartamento'; // Importa el tipo Apartamento para la tipificación

const route = useRoute(); // Accede a la ruta actual para obtener el parámetro 'id' del apartamento
const apartamento = ref<Apartamento | null>(null); // Define una variable reactiva para almacenar el apartamento obtenido

// Variables reactivas para las fechas de la reserva
const fechaInicio = ref('');
const fechaFin = ref('');

// Llama a la función para obtener el apartamento cuando el componente se monta
onMounted(async () => {
  const id = Number(route.params.id); // Obtiene el ID del apartamento de la URL
  if (id) {
    try {
      // Obtiene el apartamento por ID usando la función de servicio
      apartamento.value = await getApartamentoById(id);
    } catch (error) {
      console.error('Error al obtener el apartamento:', error); // Maneja errores si no se puede obtener el apartamento
    }
  }
});

// Función para manejar el envío del formulario de reserva
const submitReserva = async () => {
  // Verifica si los campos de fecha y apartamento están completos
  if (!fechaInicio.value || !fechaFin.value || !apartamento.value) {
    alert('Por favor, completa todos los campos del formulario.'); // Alerta si faltan campos
    return;
  }

  // Convierte las fechas de inicio y fin a objetos Date
  const startDate = new Date(fechaInicio.value);
  const endDate = new Date(fechaFin.value);

  // Verifica que la fecha de inicio sea anterior a la fecha de fin
  if (startDate >= endDate) {
    alert('La fecha de inicio debe ser anterior a la fecha de fin.'); // Alerta si las fechas no son válidas
    return;
  }

  // Obtener el usuario desde el localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.id; // Accede al ID del usuario desde el localStorage

  // Asegurarse de que el ID del usuario esté presente
  if (!userId) {
    alert('No se encontró el usuario en el localStorage. Por favor, inicia sesión.');
    return;
  }

  try {
    // Crea el objeto de datos para la nueva reserva
    const reservaData = {
      idUsuario: userId, // Usar el ID del usuario desde el localStorage
      idApartamento: apartamento.value.id, // Obtiene el ID del apartamento
      fechaInicio: startDate, // Fecha de inicio de la reserva
      fechaFin: endDate, // Fecha de fin de la reserva
    };

    // Llama a la función para crear la reserva
    const nuevaReserva = await createReserva(reservaData);
    alert(`Reserva realizada con éxito. Precio total: $${nuevaReserva.precioTotal}`); // Muestra una alerta con el precio total de la reserva
  } catch (error) {
    console.error('Error al crear la reserva:', error); // Maneja errores si no se puede crear la reserva
    alert('Hubo un problema al crear la reserva.'); // Alerta en caso de error
  }
};
</script>

<template>
  <!-- Contenedor principal de la vista de detalles del apartamento -->
  <div class="apartamento-detail">
    
    <!-- Sección del encabezado -->
    <header class="header">
      <!-- Título principal de la página de detalles -->
      <h1>Detalles del Apartamento</h1>
    </header>
    
    <!-- Contenido principal de la página -->
    <main class="main-content">
      
      <!-- Mostrar la información del apartamento solo si existe -->
      <div v-if="apartamento" class="apartamento-info">
        
        <!-- Título del apartamento -->
        <h2>{{ apartamento.titulo }}</h2>
        
        <!-- Imagen del apartamento -->
        <img :src="apartamento.imagen" alt="Imagen del apartamento" class="apartamento-image">
        
        <!-- Descripción del apartamento -->
        <p class="apartamento-description">{{ apartamento.descripcion }}</p>
        
        <!-- Precio del apartamento -->
        <p class="apartamento-detail">Precio: ${{ apartamento.precio }}</p>
        
        <!-- Ubicación del apartamento -->
        <p class="apartamento-detail">Ubicación: {{ apartamento.ubicacion }}</p>
      </div>
  
      <!-- Formulario de reserva del apartamento -->
      <form @submit.prevent="submitReserva" class="reserva-form">
        <!-- Título del formulario de reserva -->
        <h3>Reserva este Apartamento</h3>
        
        <!-- Campo para seleccionar la fecha de inicio de la reserva -->
        <label for="fechaInicio">Fecha de Inicio</label>
        <input type="date" id="fechaInicio" v-model="fechaInicio" required>
        
        <!-- Campo para seleccionar la fecha de fin de la reserva -->
        <label for="fechaFin">Fecha de Fin</label>
        <input type="date" id="fechaFin" v-model="fechaFin" required>
        
        <!-- Botón para enviar el formulario de reserva -->
        <button type="submit">Reservar</button>
      </form>
    </main>
  </div>
</template>

<style scoped>
/* Definición de colores en el :root para reutilizarlos en toda la hoja de estilos */
:root {
  --dark-green: #1e3b1e;   /* Verde oscuro para el fondo */
  --medium-green: #4caf50; /* Verde medio para botones y elementos destacados */
  --light-green: #66bb6a;  /* Verde claro para algunos detalles y textos */
  --white: #ffffff;        /* Blanco para texto y elementos de fondo */
}

/* Estilos generales para el contenedor principal de la página de detalles del apartamento */
.apartamento-detail {
  height: 100%;  /* La altura ocupa todo el contenedor disponible */
  padding: 2rem;  /* Espaciado interior */
  background-color: var(--dark-green); /* Fondo verde oscuro */
  color: var(--white);  /* Color de texto blanco */
}

/* Estilo para el encabezado de la página */
.header {
  text-align: center; /* Centra el texto */
  margin-bottom: 2rem; /* Espaciado inferior */
}

/* Estilos para el contenido principal de la página */
.main-content {
  display: flex;
  flex-direction: column;  /* Organiza el contenido de manera vertical */
  align-items: center; /* Centra los elementos horizontalmente */
}

/* Contenedor para la información del apartamento */
.apartamento-info {
  text-align: center;/* Centra el texto */
  margin-bottom: 2rem; /* Espaciado inferior */
}

/* Estilo para la imagen del apartamento */
.apartamento-image {
  max-width: 100%; /* Asegura que la imagen no se desborde del contenedor */
  height: auto;  /* Mantiene la proporción de la imagen */
  border-radius: 8px; /* Bordes redondeados para la imagen */
  margin: 1rem 0;   /* Espaciado alrededor de la imagen */
}

/* Estilo común para las descripciones y detalles del apartamento */
.apartamento-description, 
.apartamento-detail {
  font-size: 1.1rem; /* Tamaño de fuente ligeramente mayor */
  color: var(--white); /* Color de texto blanco */
  margin: 0.5rem 0; /* Espaciado superior e inferior */
}

/* Estilos para el formulario de reserva */
.reserva-form {
  background-color: rgba(255, 255, 255, 0.1);  /* Fondo ligeramente transparente */
  padding: 1.5rem;   /* Espaciado interno */
  border-radius: 8px; /* Bordes redondeados */
  width: 100%;    /* Ancho completo del contenedor */
  max-width: 400px;  /* Limita el ancho máximo a 400px */
  text-align: left; /* Alinea el texto a la izquierda */
}

/* Título del formulario de reserva */
.reserva-form h3 {
  color: var(--light-green); /* Color verde claro para el título */
  margin-bottom: 1rem; /* Espaciado inferior */
}

/* Estilos para las etiquetas dentro del formulario */
.reserva-form label {
  display: block; /* Hace que las etiquetas se muestren en bloque */
  margin-bottom: 0.5rem; /* Espaciado inferior */
  font-weight: bold; /* Hace las etiquetas en negrita */
}

/* Estilos para los campos de entrada en el formulario */
.reserva-form input {
  width: 100%; /* Asegura que los campos de entrada ocupen todo el ancho disponible */
  padding: 0.5rem; /* Espaciado interno */
  margin-bottom: 1rem; /* Espaciado inferior */
  border: none; /* Sin borde por defecto */
  border-radius: 4px; /* Bordes ligeramente redondeados */
  background-color: rgba(255, 255, 255, 0.2);  /* Fondo sutilmente transparente */
  color: var(--white); /* Texto blanco dentro del campo */
}

/* Estilos para el botón de enviar del formulario */
.reserva-form button {
  width: 100%; /* Hace que el botón ocupe todo el ancho disponible */
  padding: 0.7rem; /* Espaciado interno */
  border: none; /* Sin borde */
  border-radius: 4px; /* Bordes redondeados */
  background-color: var(--medium-green); /* Fondo verde medio */
  color: var(--white); /* Color de texto blanco */
  font-weight: bold; /* Texto en negrita */
  cursor: pointer; /* Cambia el cursor a mano cuando se pasa sobre el botón */
  transition: background-color 0.3s; /* Transición suave para el cambio de color */
}

/* Efecto de hover para el botón */
.reserva-form button:hover {
  background-color: var(--light-green); /* Cambia el color de fondo a verde claro */
}
</style>

