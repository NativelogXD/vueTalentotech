// Importa la función 'ref' de Vue para crear variables reactivas
import { ref } from 'vue';

// Importa la función 'defineStore' de Pinia para crear un store que gestione el estado de la autenticación
import { defineStore } from 'pinia';

// Importa el servicio 'getUsuarioByEmailAndPassword' que obtiene un usuario según su correo electrónico y contraseña
import { getUsuarioByEmailAndPassword } from '@/services/UsuarioService';

// Importa el hook 'useRouter' de Vue Router para manejar la navegación entre páginas
import { useRouter } from 'vue-router';

// Importa el tipo 'Usuario' que define la estructura del objeto usuario
import type { Usuario } from '@/interfaces/Usuario';

// Define el store de autenticación (login/logout)
export const useStoreLogin = defineStore('auth', () => {
  // Estado reactivo para almacenar el usuario (si está logueado) o null si no está logueado
  const user = ref<Usuario | null>(null);  // El usuario puede ser un objeto de tipo Usuario o null si no hay usuario autenticado
  
  // Estado reactivo para almacenar el mensaje de error, si ocurre alguno durante el login
  const errorMessage = ref('');

  // Obtiene el router para realizar redirecciones en la aplicación
  const router = useRouter();

  // Función asincrónica para iniciar sesión
  const login = async (email: string, password: string) => {
    // Verifica si los campos de correo y contraseña no están vacíos
    if (email && password) {
      // Llama al servicio para obtener el usuario con el correo y la contraseña proporcionados
      const usuario = await getUsuarioByEmailAndPassword(email, password);

      // Si el usuario fue encontrado, significa que las credenciales son correctas
      if (usuario) {
        user.value = usuario;  // Asigna el usuario a la variable reactiva 'user'
        
        // Almacena el usuario en el almacenamiento local (localStorage) para que persista en futuras sesiones
        localStorage.setItem('user', JSON.stringify(usuario));

        // Redirige al usuario a la página de departamentos después de un inicio de sesión exitoso
        router.push({ name: 'departamentos' });
      } else {
        // Si no se encuentra un usuario con las credenciales proporcionadas, muestra un mensaje de error
        errorMessage.value = 'Correo electrónico o contraseña incorrectos';
      }
    } else {
      // Si los campos están vacíos, muestra un mensaje de error
      errorMessage.value = 'Por favor, completa todos los campos';
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    // Resetea el valor de 'user' a null para indicar que el usuario ya no está autenticado
    user.value = null;

    // Elimina la información del usuario del almacenamiento local (localStorage) para limpiar la sesión
    localStorage.removeItem('user');

    // Redirige al usuario de vuelta a la página de login después de cerrar sesión
    router.push({ name: 'login' });
  };

  // Retorna las propiedades y funciones que estarán disponibles para los componentes que usen este store
  return { user, errorMessage, login, logout };
});
