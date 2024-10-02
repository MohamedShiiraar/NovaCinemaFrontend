<template>
  <div class="cinema">
    <header>
      <h1>Our Cinemas</h1>
    </header>
    
    <main>
      <section class="cinema-section">
        <div v-for="cinema in cinemaData" :key="cinema.locationID" class="cinema-card-wrapper">
          <div class="cinema-card">
            <router-link :to="{ name: 'movies', query: { cinemaId: cinema.locationID, cinemaName: cinema.name } }" class="cinema-card-link">
              <img :src="defaultImage" :alt="cinema.name" class="cinema-image">
              <h3>{{ cinema.name }}</h3>
              <p>{{ cinema.address }}</p>
            </router-link>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import CinemaService from "@/Services/CinemaService"; 
import defaultCinemaImage from "@/assets/cinemaImage.jpg";

export default {
  data() {
    return {
      cinemaData: [],
      defaultImage: defaultCinemaImage, 
    };
  },
  methods: {
    fetchCinemas() {
      CinemaService.getAllCinemas()
        .then(response => {
          this.cinemaData = response.data;
          console.log("Cinemas fetched:", this.cinemaData); 
        })
        .catch(error => {
          console.error("Error fetching cinemas:", error);
        });
    },
  },
  created() {
    this.fetchCinemas(); 
  },
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
.cinema-card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.cinema-reviews {
  margin-top: 1rem;
  text-align: center;
}
.star-rating {
  color: #FFD700;
}
.review-count {
  margin-left: 0.5rem;
  color: #666;
}
.review-link {
  display: block;
  margin-top: 0.5rem;
  color: #e50914;
  text-decoration: none;
  cursor: pointer;
}
</style>
