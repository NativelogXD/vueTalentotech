// Importa el tipo 'Apartamento' desde un archivo de interfaces, que define la estructura de un objeto Apartamento
import type { Apartamento } from "@/interfaces/Apartamento";

// Importa la librería 'axios' para hacer solicitudes HTTP a una API externa
import axios from "axios";

// Función para obtener todos los departamentos desde una API externa
export async function getDepartamentos(): Promise<Apartamento[]> {
  try {
    // Hace una solicitud GET usando axios para obtener los departamentos desde la API externa
    const response = await axios.get<Apartamento[]>(
      "https://670560a8031fd46a830fbb25.mockapi.io/api/v1/apartamento"
    );
    // Retorna los datos de la respuesta (un array de departamentos)
    return response.data;
  } catch (error) {
    // Si ocurre un error durante la solicitud, se imprime el error en la consola
    console.error("Error al obtener los departamentos", error);
    // En caso de error, retorna una lista vacía
    return [];
  }
}

// Función para obtener los detalles de un apartamento específico usando su ID
export const getApartamentoById = async (id: number): Promise<Apartamento> => {
  try {
    // Hace una solicitud GET usando axios para obtener un apartamento específico por ID
    const response = await axios.get<Apartamento>(
      `https://670560a8031fd46a830fbb25.mockapi.io/api/v1/apartamento/${id}`
    );
    // Retorna los datos del apartamento obtenido
    return response.data;
  } catch (error) {
    // Si ocurre un error durante la solicitud, se imprime el error en la consola
    console.error('Error fetching apartamento:', error);
    // Lanza un nuevo error personalizado para indicar que no se pudo obtener el apartamento
    throw new Error('Could not fetch apartamento');
  }
};
