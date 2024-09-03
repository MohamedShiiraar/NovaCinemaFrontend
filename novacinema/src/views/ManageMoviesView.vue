<template>
    <div class="manage-movies">
      <h1>Manage Movies</h1>
      <div class="controls">
        <button @click="showAddMovieDialog">Add Movie</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Movie Description</th>
            <th>Genre</th>
            <th>Duration</th>
            <th>Age Restriction</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody style="text-align: center;">
          <tr v-for="movie in movies" :key="movie.movieID">
            <td>{{ movie.movieID }}</td>
            <td>{{ movie.name }}</td>
            <td>{{ movie.movieDescription }}</td>
            <td>{{ movie.genre.name }}</td>
            <td>{{ movie.duration }}</td>
            <td>{{ movie.ageRestriction }}</td>

            <td>
              <button @click="editMovie(movie.movieID)">Edit</button>
              <button @click="deleteMovie(movie.movieID)">Delete</button>
            
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="isDialogOpen" class="dialog">
        <h2>Add Movie</h2>
        <form @submit.prevent="addMovie">
          <label for="title">Title:</label>
          <input type="text" v-model="newMovie.name" id="name" required>

          <label for="genre">Description:</label>
          <input type="text" v-model="newMovie.movieDescription" id="movieDescription" required>

          <label for="genre">Genre:</label>
          <input type="text" v-model="newMovie.genre" id="genre" required>
  
          <label for="genre">Duration:</label>
          <input type="text" v-model="newMovie.duration" id="duration" required>

          <label for="genre">Age Restriction:</label>
          <input type="text" v-model="newMovie.ageRestriction" id="ageRestriction" required>
  
          <button type="submit">Add</button>
          <button @click="closeDialog">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import MovieService from '@/Services/MovieService';

  export default {
    name: 'ManageMoviesView',
    data() {
      return {
        movies: [], 
        isDialogOpen: false,
        newMovie: {
        name: "",
        movieDescription: "",
        genre: "",
        duration: "",
        ageRestriction: "",
        },
        loggedInUser: {}
      }
    },
    methods: {
      fetchMovies() {
      MovieService.getAllMovies()
        .then((response) => {
          this.movies = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the movies:", error);
        });
    },
      showAddMovieDialog() {
        this.isDialogOpen = true;
      },
      closeDialog() {
        this.isDialogOpen = false;
      },
      addMovie() {
        MovieService.createMovie(this.newMovie)
        .then(() => {
          this.fetchMovies(); 
          this.closeDialog();
        })
        .catch((error) => {
          console.error("There was an error adding the movie:", error);
        });
    },
      editMovie(id) {
        console.log('Editing movie with ID:', id); 
      },
      deleteMovie(id) {
        this.movies = this.movies.filter(movie => movie.id !== id);
      }
    },
    mounted() {
    this.fetchMovies(); 
  },
  };
  </script>
  
  <style scoped>
  .manage-movies {
    padding: 20px;
  }
  
  .controls {
    margin-bottom: 20px;
  }
  
  button {
    margin-right: 10px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  .dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: 1px solid #ddd;
    background-color: white;
    z-index: 1000;
  }
  </style>
  