// Importa las funciones necesarias para crear un enrutador en Vue 3
import { createRouter, createWebHistory } from 'vue-router';

// Importa el componente HomeView que se usará en la ruta principal ('/')
import HomeView from '../views/HomeView.vue';

// Crea una instancia del enrutador con la configuración deseada
const router = createRouter({
  // Define el tipo de historial para la navegación. Utiliza el historial de HTML5.
  // `import.meta.env.BASE_URL` se usa para obtener la URL base de la aplicación.
  history: createWebHistory(import.meta.env.BASE_URL),

  // Define las rutas de la aplicación como un array de objetos
  routes: [
    // Ruta principal de la aplicación, se carga el componente 'HomeView'
    {
      path: '/',  // Ruta raíz, cuando el usuario navega a '/'
      name: 'home',  // Nombre de la ruta, útil para navegación programática
      component: HomeView,  // El componente que se cargará para esta ruta
    },

    // Ruta para la página de login, cargando 'LoginView' de manera perezosa
    {
      path: '/login',  // Ruta para acceder a la página de login
      name: 'login',  // Nombre de la ruta para usar en navegación programática
      // Utiliza importación dinámica (lazy loading) para cargar el componente solo cuando sea necesario
      component: () => import('../views/LoginView.vue'),
    },

    // Ruta para la página de registro, cargando 'RegisterView' de manera perezosa
    {
      path: '/register',  // Ruta para acceder a la página de registro
      name: 'register',  // Nombre de la ruta
      // Importa el componente 'RegisterView.vue' de manera perezosa
      component: () => import('../views/RegisterView.vue'),
    },

    // Ruta para la página de departamentos, cargando 'Departamento' de manera perezosa
    {
      path: '/departamentos',  // Ruta para acceder a la página de departamentos
      name: 'departamentos',  // Nombre de la ruta
      // Importa el componente 'Departamento.vue' de manera perezosa
      component: () => import('../views/Departamento.vue'),
    },

    // Ruta para la página de reservas, cargando 'ReservaView' de manera perezosa
    {
      path: '/reservas',  // Ruta para acceder a la página de reservas
      name: 'reservas',  // Nombre de la ruta
      // Importa el componente 'ReservaView.vue' de manera perezosa
      component: () => import('../views/ReservaView.vue'),
    },

    // Ruta dinámica para mostrar los detalles de un apartamento, con un parámetro 'id'
    {
      path: '/apartamento/:id',  // Ruta que incluye un parámetro dinámico 'id'
      name: 'apartamento-detail',  // Nombre de la ruta para navegación programática
      // Importa el componente 'ApartamentoDetail.vue' de manera perezosa
      component: () => import('../views/ApartamentoDetail.vue'),
      // `props: true` permite que el parámetro `id` se pase como prop al componente
      props: true,  // Pasa el parámetro 'id' de la ruta como propiedad al componente
    },
  ],  // Fin del array de rutas
});

// Exporta el enrutador para que pueda ser utilizado en el archivo principal de la aplicación
export default router;
