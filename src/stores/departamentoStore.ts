// Importa la función 'defineStore' de Pinia, que es usada para definir un "store" (almacén de estado) en Vue
import { defineStore } from 'pinia';

// Importa la función 'ref' de Vue, que se utiliza para crear variables reactivas
import { ref } from 'vue';

// Importa el servicio 'getDepartamentos', que obtiene los departamentos desde la API
import { getDepartamentos } from '@/services/ApartamentoService'; // Asegúrate de importar tu servicio

// Importa el tipo 'Apartamento', para asegurar que los datos sean del tipo correcto
import type { Apartamento } from '@/interfaces/Apartamento';

// Define el store de Pinia para gestionar el estado de los departamentos
export const useDepartamentoStore = defineStore('departamento', () => {
  // Estado reactivo para almacenar la lista de departamentos
  const departamentos = ref<Apartamento[]>([]); // Una lista vacía de 'departamento' inicialmente
  const errorMessage = ref<string>(''); // Para almacenar un mensaje de error si ocurre algún problema

  // Acción asincrónica para cargar los departamentos desde la API
  const loadDepartamentos = async () => {
    try {
      // Se obtienen los departamentos usando el servicio 'getDepartamentos'
      departamentos.value = await getDepartamentos();
    } catch (error) {
      // Si ocurre un error durante la carga de departamentos, se maneja aquí
      console.error('Error al obtener los departamentos:', error);
      // Se guarda un mensaje de error que puede ser mostrado en la UI
      errorMessage.value = 'Hubo un error al cargar los departamentos.';
    }
  };

  // Retorna el estado reactivo y la acción para que estén disponibles en el componente que use este store
  return {
    departamentos,
    errorMessage,
    loadDepartamentos,
  };
});
