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
            <button @click="showEditMovieDialog(movie)">Edit</button>
            <button @click="deleteMovie(movie.movieID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="isAddDialogOpen" class="dialog">
      <h2>Add Movie</h2>
      <form @submit.prevent="addMovie">
        <label for="name">Title:</label>
        <input type="text" v-model="newMovie.name" id="name" required>

        <label for="movieDescription">Description:</label>
        <input type="text" v-model="newMovie.movieDescription" id="movieDescription" required>

        <label for="genre">Genre:</label>
        <select v-model="newMovie.genre" id="genre" required>
          <option v-for="genre in genres" :key="genre.id" :value="genre">{{ genre.name }}</option>
        </select>

        <label for="duration">Duration:</label>
        <input type="text" v-model="newMovie.duration" id="duration" required>

        <label for="ageRestriction">Age Restriction:</label>
        <input type="text" v-model="newMovie.ageRestriction" id="ageRestriction" required>

        <button type="submit">Add</button>
        <button @click="closeAddDialog">Cancel</button>
      </form>
    </div>

    <div v-if="isEditDialogOpen" class="dialog">
      <h2>Edit Movie</h2>
      <form @submit.prevent="updateMovie">
        <label for="edit-name">Title:</label>
        <input type="text" v-model="editedMovie.name" id="edit-name" required>

        <label for="edit-movieDescription">Description:</label>
        <input type="text" v-model="editedMovie.movieDescription" id="edit-movieDescription" required>

        <label for="edit-genre">Genre:</label>
        <select v-model="editedMovie.genre" id="edit-genre" required>
          <option v-for="genre in genres" :key="genre.id" :value="genre">{{ genre.name }}</option>
        </select>

        <label for="edit-duration">Duration:</label>
        <input type="text" v-model="editedMovie.duration" id="edit-duration" required>

        <label for="edit-ageRestriction">Age Restriction:</label>
        <input type="text" v-model="editedMovie.ageRestriction" id="edit-ageRestriction" required>

        <button type="submit">Update</button>
        <button @click="closeEditDialog">Cancel</button>
      </form>
    </div>
  </div>
</template>
  
  <script>
import GenreService from '@/Services/GenreService';
import MovieService from '@/Services/MovieService';

  export default {
    name: 'ManageMoviesView',
    data() {
      return {
        movies: [], 
        genre: [],
        isAddDialogOpen: false,
        isEditDialogOpen: false,
        newMovie: {
        name: "",
        movieDescription: "",
        genre: null,
        duration: "",
        ageRestriction: "",
        },
        editedMovie: null,
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
    fetchGenres() {
      GenreService.getAllGenres()
        .then((response) => {
          this.genres = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the genres:", error);
        });
    },
    showAddMovieDialog() {
      this.isAddDialogOpen = true;
    },
    closeAddDialog() {
      this.isAddDialogOpen = false;
    },
    addMovie() {
      MovieService.createMovie(this.newMovie)
        .then(() => {
          this.fetchMovies();
          this.closeAddDialog();
        })
        .catch((error) => {
          console.error("There was an error adding the movie:", error);
        });
    },
    showEditMovieDialog(movie) {
      this.editedMovie = { ...movie }; 
      this.isEditDialogOpen = true;
    },
    closeEditDialog() {
      this.isEditDialogOpen = false;
    },
    updateMovie() {
      MovieService.updateMovie(this.editedMovie)
        .then(() => {
          this.fetchMovies();
          this.closeEditDialog();
        })
        .catch((error) => {
          console.error("There was an error updating the movie:", error);
        });
    },
    deleteMovie(id) {
      MovieService.deleteMovie(id)
        .then(() => {
          this.fetchMovies();
        })
        .catch((error) => {
          console.error("There was an error deleting the movie:", error);
        });
    },
  },
  mounted() {
    this.fetchMovies();
    this.fetchGenres();
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
  