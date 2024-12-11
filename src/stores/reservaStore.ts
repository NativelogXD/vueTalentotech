// Importa la función 'defineStore' de Pinia para definir un store (almacén de estado) en Vue
import { defineStore } from 'pinia';

// Importa la función 'ref' de Vue, que se usa para crear variables reactivas
import { ref } from 'vue';

// Importa el servicio 'getReservasByUserId' que obtiene las reservas de un usuario desde la API
import { getReservasByUserId } from '@/services/ReservaService';

// Importa el servicio 'getApartamentoById' que obtiene los detalles de un apartamento desde la API
import { getApartamentoById } from '@/services/ApartamentoService';

// Importa los tipos 'Reserva' y 'Apartamento' que definen las estructuras de datos
import type { Reserva } from '@/interfaces/Reserva';
import type { Apartamento } from '@/interfaces/Apartamento';

// Define el store 'reserva', donde se gestionarán las reservas y apartamentos
export const useReservaStore = defineStore('reserva', () => {
  // Estado reactivo para almacenar las reservas y los apartamentos
  const reservas = ref<Reserva[]>([]); // Lista vacía de reservas inicialmente
  const apartamentos = ref<Apartamento[]>([]); // Lista vacía de apartamentos inicialmente
  const errorMessage = ref<string>(''); // Para almacenar los mensajes de error si ocurren

  // Acción asincrónica para cargar las reservas y los apartamentos relacionados
  const loadReservas = async (userId: number) => {
    try {
      // Obtiene las reservas para el usuario con el ID proporcionado
      reservas.value = await getReservasByUserId(userId);

      // Obtiene los apartamentos asociados a esas reservas
      // `map` recorre todas las reservas y llama a `getApartamentoById` para obtener el apartamento correspondiente
      const apartamentoPromises = reservas.value.map(reserva =>
        getApartamentoById(reserva.idApartamento)
      );

      // `Promise.all` ejecuta todas las promesas y espera a que todas se resuelvan antes de continuar
      apartamentos.value = await Promise.all(apartamentoPromises);
    } catch (error) {
      // Si ocurre un error durante la carga de reservas o apartamentos, se captura aquí
      console.error('Error al obtener reservas o apartamentos:', error);
      // Se guarda un mensaje de error que puede ser mostrado en la UI
      errorMessage.value = 'Hubo un error al cargar las reservas.';
    }
  };

  // Retorna el estado reactivo y la acción para que estén disponibles en cualquier componente que use este store
  return {
    reservas,
    apartamentos,
    errorMessage,
    loadReservas,
  };
});
