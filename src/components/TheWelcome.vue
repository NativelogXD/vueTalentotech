<script setup lang="ts"></script>

<template>
  <div class="home">
    <header class="header">
      <h1>Reserva tu Hotel Ideal</h1>
      <p>Encuentra las mejores ofertas en hoteles alrededor del mundo.</p>
    </header>

    <main class="main-content">
      <section class="intro">
        <h2>Bienvenido a Nuestra Plataforma</h2>
        <p>
          Ofrecemos una amplia variedad de opciones de alojamiento para que tu viaje sea inolvidable.
        </p>
      </section>

      <section class="features">
        <h2>Características Destacadas</h2>
        <ul>
          <li>Cancelación gratuita en la mayoría de las reservas</li>
          <li>Ofertas exclusivas y descuentos especiales</li>
          <li>Asistencia 24/7 para tus consultas</li>
          <li>Comparación de precios en tiempo real</li>
        </ul>
      </section>

      <section class="actions">
        <h2>Empieza Ahora</h2>
        <router-link to="/register" class="action-button">Registrarse</router-link>
        <router-link to="/login" class="action-button">Iniciar Sesión</router-link>
      </section>
    </main>
  </div>
</template>

<style scoped>
:root {
  --dark-green: #1e3b1e;
  --medium-green: #4caf50;
  --light-green: #66bb6a;
  --white: #ffffff;
}

.home {
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background-color: var(--dark-green); /* Fondo verde oscuro */
  color: var(--white); /* Texto blanco */
}

.header {
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--light-green);
}

p {
  font-size: 1.2rem;
  color: var(--white);
}

.main-content {
  max-width: 800px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.05); /* Fondo sutilmente transparente */
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.intro, .features, .actions {
  margin-bottom: 2rem;
}

h2 {
  font-size: 2rem;
  color: var(--light-green);
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--medium-green);
  padding-bottom: 0.5rem;
}

ul {
  list-style: none;
  padding: 0;
  color: var(--white);
}

li {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.action-button {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  margin: 0.5rem;
  background-color: var(--medium-green);
  color: var(--white);
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
}

.action-button:hover {
  background-color: var(--light-green);
  transform: translateY(-3px); /* Efecto de elevación */
}

.action-button:active {
  background-color: var(--medium-green);
  transform: translateY(0); /* Restablecer elevación */
}
</style>
