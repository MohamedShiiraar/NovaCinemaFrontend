<template>
  <div class="cinema">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/movies">Movies</router-link></li>
        <li><router-link to="/cinema" class="active">Cinema</router-link></li>
        <li class="dropdown">
          <router-link to="/myaccount" class="dropbtn">My Account</router-link>
          <div class="dropdown-content">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
          </div>
        </li>
      </ul>
    </nav>

    <header>
      <h1>Our Cinemas</h1>
    </header>
    <main>
      <section class="cinema-section">
        <router-link 
          v-for="cinema in cinemas" 
          :key="cinema.id" 
          :to="{ name: 'movies', query: { cinemaId: cinema.id } }" 
          class="cinema-card-link"
        >
          <div class="cinema-card">
            <img :src="cinema.image" :alt="cinema.name" class="cinema-image">
            <h3>{{ cinema.name }}</h3>
            <p>{{ cinema.location }}</p>
          </div>
        </router-link>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cinemas: [
        { id: 1, name: "Backdrop Cinema", location: "123 Main St, Cityville", image: "https://via.placeholder.com/300x200?text=Backdrop+Cinema" },
        { id: 2, name: "FrontRow Cinema", location: "456 Elm St, Cityville", image: "https://via.placeholder.com/300x200?text=FrontRow+Cinema" },
        { id: 3, name: "Steveson Rd Cinema", location: "789 Oak St, Townsville", image: "https://via.placeholder.com/300x200?text=Steveson+Cinema" },
        { id: 4, name: "Cont Cinema", location: "101 Pine St, Metropolis", image: "https://via.placeholder.com/300x200?text=Cont+Cinema" },
        { id: 5, name: "Cinemito Cinema", location: "202 Maple St, Rivercity", image: "https://via.placeholder.com/300x200?text=Cinemito+Cinema" }
      ]
    };
  }
};
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
  color: #333;
}

nav {
  background-color: #333;
  padding: 0.5rem;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

nav ul li {
  margin: 0 1rem;
  position: relative; 
}

nav ul li a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}

nav ul li a.active {
  color: #e50914;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 100%; 
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

header {
  background-color: #1a1a1a;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

main {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.cinema-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.cinema-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.cinema-card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #333;
}

.cinema-card p {
  color: #666;
}

.cinema-card-link {
  display: block;
  text-decoration: none;
}

.cinema-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style>