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
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id">
            <td>{{ movie.id }}</td>
            <td>{{ movie.title }}</td>
            <td>{{ movie.genre }}</td>
            <td>
              <button @click="editMovie(movie.id)">Edit</button>
              <button @click="deleteMovie(movie.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Add Movie Dialog (Placeholder) -->
      <div v-if="isDialogOpen" class="dialog">
        <h2>Add Movie</h2>
        <form @submit.prevent="addMovie">
          <label for="title">Title:</label>
          <input type="text" v-model="newMovie.title" id="title" required>
  
          <label for="genre">Genre:</label>
          <input type="text" v-model="newMovie.genre" id="genre" required>
  
          <button type="submit">Add</button>
          <button @click="closeDialog">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ManageMoviesView',
    data() {
      return {
        movies: [], // Replace with actual data fetching
        isDialogOpen: false,
        newMovie: {
          title: '',
          genre: ''
        }
      }
    },
    methods: {
      showAddMovieDialog() {
        this.isDialogOpen = true;
      },
      closeDialog() {
        this.isDialogOpen = false;
      },
      addMovie() {
        // Logic to add a movie
        this.movies.push({ ...this.newMovie, id: Date.now() });
        this.newMovie.title = '';
        this.newMovie.genre = '';
        this.closeDialog();
      },
      editMovie(id) {
        // Logic to edit a movie
        console.log('Editing movie with ID:', id); // Placeholder for actual implementation
      },
      deleteMovie(id) {
        // Logic to delete a movie
        this.movies = this.movies.filter(movie => movie.id !== id);
      }
    }
  }
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
  