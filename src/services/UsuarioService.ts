// Importa el tipo 'Usuario' desde un archivo de interfaces, que define la estructura de un objeto Usuario
import type { Usuario } from "@/interfaces/Usuario";

// Importa la librería 'axios' para realizar solicitudes HTTP a una API externa
import axios from "axios";

// Función asincrónica para obtener un usuario que coincide con el email y la contraseña
export async function getUsuarioByEmailAndPassword(email: string, contrasenia: string): Promise<Usuario | null> {
    try {
        // Hace una solicitud GET para obtener todos los usuarios de la API
        const response = await axios.get<Usuario[]>(
            'https://670560a8031fd46a830fbb25.mockapi.io/api/v1/usuario'
        );
        
        // Filtra los usuarios para encontrar uno que coincida con el email y la contraseña proporcionados
        const usuario = response.data.find(user => user.email === email && user.contrasenia === contrasenia);
        
        // Retorna el usuario encontrado o null si no se encuentra
        return usuario || null; // Si no se encuentra un usuario que coincida, retorna null
    } catch (error) {
        // Si ocurre un error durante la solicitud, se imprime en la consola y retorna null
        console.error("Error al obtener el usuario", error);
        return null; // Retorna null en caso de error, para indicar que la operación no fue exitosa
    }
}

// Función asincrónica para registrar un nuevo usuario
export async function storeUsuario(usuario: Usuario): Promise<Usuario | null> {
    try {
        // Hace una solicitud POST para registrar un nuevo usuario en la API
        const response = await axios.post<Usuario>(
            'https://670560a8031fd46a830fbb25.mockapi.io/api/v1/usuario',
            usuario // Se envía el objeto 'usuario' al endpoint de la API
        );
        
        // Retorna el usuario que se ha registrado, con el ID asignado por la API
        return response.data; // El objeto 'usuario' con los datos registrados, incluyendo el ID generado por la API
    } catch (error) {
        // Si ocurre un error durante la solicitud, se imprime en la consola y retorna null
        console.error("Error al registrar el usuario", error);
        return null; // Retorna null si hay un error al registrar el usuario
    }
}
