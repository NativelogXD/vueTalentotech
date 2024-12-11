// Importa la función 'ref' de Vue para crear variables reactivas
import { ref } from 'vue';

// Importa la función 'defineStore' de Pinia para definir un store que gestionará el estado de la autenticación y el registro
import { defineStore } from 'pinia';

// Importa el servicio 'storeUsuario' que registra un nuevo usuario en la API
import { storeUsuario } from '@/services/UsuarioService';

// Importa el tipo 'Usuario' que define la estructura de un objeto usuario
import type { Usuario } from '@/interfaces/Usuario';

// Define el store para gestionar el registro de usuarios
export const useStoreRegister = defineStore('auth', () => {
  // Estado reactivo para almacenar el usuario registrado (si existe) o null si no hay usuario autenticado
  const user = ref<Usuario | null>(null); // El usuario puede ser de tipo Usuario o null

  // Estado reactivo para almacenar el mensaje de error, si ocurre durante el proceso de registro
  const errorMessage = ref('');

  // Método asincrónico para registrar un nuevo usuario
  const register = async (username: string, email: string, password: string) => {
    // Crea un objeto con la información del nuevo usuario
    const nuevoUsuario = {
      id: 0, // El ID será generado automáticamente por el backend (en este caso es 0)
      name: username, // El nombre del usuario proporcionado
      email: email, // El correo electrónico proporcionado
      contrasenia: password, // La contraseña proporcionada
    };

    try {
      // Llama al servicio 'storeUsuario' para registrar el nuevo usuario en la base de datos
      const usuarioRegistrado = await storeUsuario(nuevoUsuario);

      // Si el registro es exitoso, guarda al usuario en el estado reactivo 'user'
      user.value = usuarioRegistrado;

      // También guarda al usuario registrado en el almacenamiento local (localStorage) para mantener la sesión
      localStorage.setItem('user', JSON.stringify(usuarioRegistrado));

      // Limpia cualquier mensaje de error previo, ya que el registro fue exitoso
      errorMessage.value = '';

      // Retorna el usuario registrado
      return usuarioRegistrado;
    } catch (error) {
      // Si ocurre un error durante el proceso de registro, muestra un mensaje de error
      console.error('Error al registrar el usuario:', error);
      errorMessage.value = 'Hubo un error en el registro. Inténtalo nuevamente.';
      
      // Retorna null para indicar que no se pudo registrar el usuario
      return null;
    }
  };

  // Método para cerrar sesión
  const logout = () => {
    // Resetea el valor de 'user' a null, indicando que el usuario ha cerrado sesión
    user.value = null;

    // Elimina al usuario del localStorage, borrando la sesión actual
    localStorage.removeItem('user');
  };

  // Retorna las propiedades y funciones que estarán disponibles para los componentes que usen este store
  return { user, errorMessage, register, logout };
});
