<template>
  <div class="home">
  <main>
    <section class="hero">
      <div class="hero-content">
        <h2>Experience Movies Like Never Before</h2>
        <p>Book your tickets now and immerse yourself in the world of cinema</p>
        <a href="/movies" class="cta-button">Browse Movies</a>
      </div>
    </section>
    
    <section class="featured-section">
        <h2> Now Showing </h2>
        <div class="movie-carousel">
          <div v-for="movie in movies" :key="movie.id" class="movie-card">
            <img :src="'http://localhost:8080' + movie.imageURL" alt="Movie Image">
            <div class="movie-info">
              <h3 style="text-align: center;">{{ movie.name || 'Unknown Movie' }}</h3>
              <p style="font-weight: bold;" v-if="movie.genre">{{ movie.genre.name }}</p>
              <p style="font-weight: bold;">Duration: {{ movie.duration || 'Unknown' }}</p>
            </div>
          </div>
        </div>
      </section>
    
    <section class="featured-section">
      <h2>Special Promotions</h2>
      <div class="promotions">
        <div v-for="promotion in promotions" :key="promotion.promotionID" class="promo-card">
          <img src="https://via.placeholder.com/300x150?text=Student+Discount" alt="Student Discount Promotion">
          <div class="promo-info">
            <h2>{{ promotion.promotionName }}</h2>
            <p>{{ promotion.promotionDescription }}</p>
            <router-link :to="{ name: 'Promotions', query: { section: '{{ promotion.promotionName }}' } }" class="promo-button">Learn More</router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
  </div>
  
</template>

<script>
import MovieService from "@/Services/MovieService";
import PromotionService from '@/Services/PromotionService';
import defaultMovieImage from "@/assets/movieImage.jpg";

export default {
  data() {
    return {
      promotions: [],
      movies: [], 
      loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || {},
      defaultImage: defaultMovieImage,
      loadingMovies: false,
      loadingPromotions: false,
      errorMovies: null,
      errorPromotions: null,
    };
  },
  created() {
    this.fetchPromotions();
    this.fetchMovies();
  },
  methods: {
    async fetchPromotions() {
        try {
          const response = await PromotionService.getAllPromotions();
          this.promotions = response.data;
        } catch (error) {
          this.error = "Failed to load promotions.";
        } finally {
          this.loading = false;
        }
      },
      async fetchMovies() {
  try {
    const response = await MovieService.getAllMovies();
    if (response.data && Array.isArray(response.data)) {
      this.movies = response.data.map(movie => {
        return {
          ...movie,
          imageURL: movie.imageURL ? movie.imageURL : '/images/default-movie.jpg' 
        };
      });
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
},
    logout() {
    localStorage.removeItem('loggedInUser');
      this.loggedInUser = {};
      this.$router.push('/'); 
    }
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
  header {
    background-color: #1a1a1a;
    color: #fff;
    padding: 1rem;
    text-align: center;
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
  }
  nav ul li a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
  nav ul li a.active {
    color: #e50914;
  }

  .add-movie {
  position: relative;
}

.add-movie-button {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 0.9rem; 
  font-weight: bold; 
  text-transform: uppercase; 
}

.add-movie:hover .add-movie-button {
  display: block;
}

.add-movie-button:hover {
  background-color: #ff0a16;
}
  main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  .hero {
    background-image: url('@/assets/film-strip-perspective-3d-isometric-600nw-2144961605.jpg');
    background-size: cover;
    background-position: center;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .hero-content {
    text-align: center;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 2rem;
    border-radius: 8px;
  }
  .hero h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  .hero p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  .cta-button {
    display: inline-block;
    background-color: #e50914;
    color: #fff;
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  .cta-button:hover {
    background-color: #ff0a16;
  }
  .featured-section {
    margin-bottom: 3rem;
  }
  .featured-section h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  .movie-carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    padding: 0 1rem; 
  margin: 0 -1rem; 
  }

  .movie-carousel::-webkit-scrollbar {
  display: none; 
}
.movie-carousel {
  scrollbar-width: none; 
  -ms-overflow-style: none; 
}
  .movie-card {
    flex: 0 0 auto;
  width: 200px;
  margin-right: 1rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  scroll-snap-align: start;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.promo-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5); 
  transform: scale(1.05); 
}
.movie-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5); 
  transform: scale(1.05); 
}
  .movie-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  .movie-info {
    padding: 1rem;
  }
  .movie-info h3 {
    margin: 0 0 0.5rem 0;
  }
  .movie-info p {
    margin: 0;
    color: #666;
  }
  .promotions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  .promo-card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }
  .promo-card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  .promo-info {
    padding: 1rem;
  }
  .promo-info h3 {
    margin: 0 0 0.5rem 0;
  }
  .promo-info p {
    margin: 0 0 1rem 0;
    color: #666;
  }
  .promo-button {
    display: inline-block;
    background-color: #333;
    color: #fff;
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
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

.dropdown-content button {
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 0.5rem 0.8rem;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%; /* Full width */
}

.dropdown-content button:hover {
  background-color: #ff0a16;
}
</style>