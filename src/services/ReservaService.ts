// Importa la librería 'axios' para hacer solicitudes HTTP
import axios from 'axios';

// Importa los tipos de datos 'Reserva' y 'Apartamento' para definir la estructura de los objetos
import type { Reserva } from '@/interfaces/Reserva';
import type { Apartamento } from '@/interfaces/Apartamento';

// Función asincrónica para obtener todas las reservas asociadas a un usuario específico mediante su ID
export const getReservasByUserId = async (userId: number): Promise<Reserva[]> => {
  try {
    // Hace una solicitud GET para obtener todas las reservas de la API
    const response = await axios.get<Reserva[]>("https://6723e99e493fac3cf24ca4bf.mockapi.io/api/v1/reservas");

    // Filtra las reservas recibidas para devolver solo las que corresponden al 'idUsuario' especificado
    const reservasFiltradas = response.data.filter(reserva => reserva.idUsuario == userId);

    // Retorna el array de reservas filtrado
    return reservasFiltradas;
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola y lanza un error personalizado
    console.error('Error fetching reservas:', error);
    throw new Error('Could not fetch reservas');
  }
};

// Función para obtener los detalles de un apartamento específico a partir de su ID
const getApartamentoById = async (id: number): Promise<Apartamento> => {
  try {
    // Hace una solicitud GET para obtener los detalles de un apartamento específico usando el ID
    const response = await axios.get<Apartamento>(`https://670560a8031fd46a830fbb25.mockapi.io/api/v1/apartamento/${id}`);
    
    // Retorna los detalles del apartamento
    return response.data;
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola y lanza un error personalizado
    console.error('Error fetching apartamento:', error);
    throw new Error('Could not fetch apartamento');
  }
};

// Función para crear una nueva reserva. Recibe los datos de la reserva sin el 'id' ni el 'precioTotal' (estos se generan automáticamente)
export const createReserva = async (reserva: Omit<Reserva, 'id' | 'precioTotal'>): Promise<Reserva> => {
  try {
    // Llama a la función 'getApartamentoById' para obtener los detalles del apartamento relacionado con la reserva
    const apartamento = await getApartamentoById(reserva.idApartamento);

    // Calcula la cantidad de días que el usuario se quedará en el apartamento
    const fechaInicio = new Date(reserva.fechaInicio);  // Convierte la fecha de inicio de la reserva en un objeto Date
    const fechaFin = new Date(reserva.fechaFin);  // Convierte la fecha de fin de la reserva en un objeto Date

    // Calcula la diferencia de tiempo entre la fecha de inicio y fin
    const diffTime = Math.abs(fechaFin.getTime() - fechaInicio.getTime());

    // Convierte la diferencia de tiempo de milisegundos a días
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Redondea al número entero más cercano

    // Calcula el precio total de la reserva multiplicando la cantidad de días por el precio del apartamento
    const precioTotal = diffDays * apartamento.precio;

    // Hace una solicitud POST para crear una nueva reserva con los datos proporcionados y el precio total calculado
    const response = await axios.post<Reserva>("https://6723e99e493fac3cf24ca4bf.mockapi.io/api/v1/reservas", {
      ...reserva,  // Incluye todos los datos de la reserva
      precioTotal,  // Agrega el precio total calculado
    });

    // Retorna la reserva creada, que incluye el 'id' y 'precioTotal' generado en la API
    return response.data;
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola y lanza un error personalizado
    console.error('Error creating reserva:', error);
    throw new Error('Could not create reserva');
  }
};
