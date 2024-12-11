<!-- Componente principal (App.vue) -->
<template>
  <!-- Renderiza el componente NavBar y establece una clave dinámica -->
  <!-- :key="$route.fullPath" indica que el componente NavBar debe volver a montarse
       cada vez que cambia la ruta, ya que $route.fullPath cambia con cada nueva URL -->
  <NavBar :key="$route.fullPath" />

  <!-- RouterView es el componente de Vue Router que renderiza la vista 
       correspondiente a la ruta actual -->
  <RouterView />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';  // Importa useRoute para acceder a la ruta actual
import NavBar from '@/components/NavBar.vue'; // Importa el componente NavBar

// Define una constante 'route' que contiene la información de la ruta actual.
// Esto permite acceder a datos de la ruta, como el valor de $route.fullPath.
const route = useRoute();
</script>
