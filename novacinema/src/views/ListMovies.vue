<template>
  <div class="movies">
    <main>
      <h2>Now Showing</h2>
      <div class="filters">
        <div class="filter-group">
          <select v-model="selectedGenre" @change="filterMovies">
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Horror">Horror</option>
          </select>
          <select v-model="selectedRating" @change="filterMovies">
            <option value="">All Ratings</option>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
          </select>
        </div>
        <input type="text" v-model="searchTerm" placeholder="Search movies..." @input="filterMovies">
      </div>
      <div class="movie-grid">
        <div v-for="movie in filteredMovies" :key="movie.id" class="movie-card">
          <img :src="movie.posterUrl || 'https://via.placeholder.com/200x300?text=No+Image'" :alt="movie.title + ' Poster'">
          <div class="movie-info">
            <h3 style="text-align: center;" >{{ movie.name }}</h3>
            <p style="font-weight: bold;">Genre: {{ movie.genre.name }}</p>
            <p style="font-weight: bold;">Duration: {{ movie.duration }}</p>
            <p style="font-weight: bold;">Age Restriction: {{ movie.ageRestriction }}</p>
          </div>
          <a @click="openBookingView(movie)" class="book-button">Book Now</a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import MovieService from "@/Services/MovieService";

export default {
  data() {
    return {
      movies: [],
      selectedGenre: '',
      selectedRating: '',
      searchTerm: '',
    };
  },
  computed: {
    filteredMovies() {
    const filtered = this.movies.filter(movie => {
      return (movie.title || '').toLowerCase().includes((this.searchTerm || '').toLowerCase());
    });
    console.log('Filtered movies:', filtered); 
    return filtered;
  }
    
  },
  methods: {
    openBookingView(movie) {
    this.$router.push({
      path: '/booking',
      query: {
        title: movie.name,
        poster: movie.posterUrl,
        genre: movie.genre.name,
        duration: movie.duration,
        ageRestriction: movie.ageRestriction,
        movieDescription: movie.movieDescription,
        stars: movie.stars
      }
    });
  },
    fetchMovies() {
    MovieService.getAllMovies()
      .then(response => {
        this.movies = response.data;
        console.log('Movies fetched:', this.movies); 
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
      });
  },
    filterMovies() {
      
    }
  },
  created() {
    this.fetchMovies();
  }
};
</script>

<style scoped>
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
  main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  .filter-group {
    display: flex;
    gap: 1rem;
  }
  select, input[type="text"] {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
  }
  .movie-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  height: 100%; /* Ensures the card takes full height in grid */
}
.movie-card:hover {
  transform: translateY(-5px);
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
  flex: 1; /* Allows info section to grow and push the button down */
}
  .movie-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }
  .movie-info p {
    margin: 0 0 0.5rem 0;
    color: #666;
    font-size: 0.9rem;
  }
  .rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .star {
    color: #ffd700;
  }
  .book-button {
  display: block;
  width: 100%;
  padding: 0.8rem;
  background-color: #e50914;
  color: #fff;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-top: auto; /* Pushes button to the bottom */
}
.book-button:hover {
  background-color: #ff0a16;
}
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  .pagination button {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  .pagination button:hover {
    background-color: #555;
  }
  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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

</style>