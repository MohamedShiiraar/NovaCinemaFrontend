<template>
    <div class="add-movie-page">
      <h2>Add a New Movie</h2>
      <form @submit.prevent="submitMovie">
        <label for="name">Name:</label>
        <input type="text" v-model="movie.name" id="name" required />

        <label for="movieDescription">Descripton:</label>
        <input type="text" v-model="movie.movieDescription" id="movieDescription" required />

        <label for="genre">Genre:</label>
        <input type="text" v-model="movie.genre" id="genre" required />
  
        <label for="duration">Duration:</label>
        <input type="text" v-model="movie.duration" id="duration" required />

        <label for="ageRestriction">Age Restriction:</label>
        <input type="text" v-model="movie.ageRestriction" id="ageRestriction" required />
  
        <button type="submit" class="submit-button">Add Movie</button>
      </form>
    </div>
  </template>
  
  <script>
  import MovieService from '@/Services/MovieService';
  export default {
    data() {
      return {
        movie: {
          name: '',
          movieDescription: '',
          genre:'',
          duration: '',
          ageRestriction: ''
        }
      };
    },
    methods: {
      async submitMovie() {
    try {
      const movie = {
        name: this.movie.name,
        movieDescription: this.movie.movieDescription,
        genre: this.movie.genre,
        duration: this.movie.duration,
        ageRestriction: this.movie.ageRestriction
      };
      console.log(movie);
      
      const response = await MovieService.createMovie(movie);

      if (response.status === 201) { 
        alert('Created movie successfully!');
        this.$router.push('/movies'); // Redirect to login page
      } else {
        alert(`Creation failed: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Movie Creation error:', error);
      alert(`An error occurred during movie creation: ${error.response?.data?.message || 'Unknown error'}`);
    }
        console.log('Movie added:', this.movie);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here as you provided */
  .add-movie-page {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .add-movie-page h2 {
    margin-bottom: 1rem;
    color: #e50914;
  }
  
  .add-movie-page label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .add-movie-page input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .submit-button {
    background-color: #e50914;
    color: #fff;
    border: none;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #ff0a16;
  }
  </style>