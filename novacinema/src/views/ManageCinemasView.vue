<template>
    <div class="manage-cinemas">
      <h1>Manage Cinemas</h1>
      <div class="controls">
        <button @click="showAddCinemaDialog">Add Cinema</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>LocationID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style="text-align: center;">
          
          <tr v-for="cinema in cinemas" :key="cinema.locationID">
            <td>{{ cinema.locationID }}</td>
            <td>{{ cinema.name }}</td>
            <td>{{ cinema.address }}</td>
            <td>
            
              <button @click="editCinema(cinema)">Edit</button>
              <button @click="deleteCinema(cinema.locationID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      
      <div v-if="isDialogOpen" class="dialog">
        <h2>{{ isEditing ? 'Edit Cinema' : 'Add Cinema' }}</h2>
        <form @submit.prevent="isEditing ? updateCinema() : addCinema()">
          <label for="name">Cinema Name:</label>
          <input type="text" v-model="newCinema.name" id="name" required>
    
          <label for="address">Address:</label>
          <input type="text" v-model="newCinema.address" id="address" required>
    
          <button type="submit">{{ isEditing ? 'Update' : 'Add' }}</button>
          <button type="button" @click="closeDialog">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import CinemaService from '@/Services/CinemaService';
  
  export default {
    name: 'ManageCinemasView',
    data() {
      return {
        cinemas: [],
        isDialogOpen: false,
        isEditing: false,
        newCinema: {
          name: "",
          address: "",
        },
      };
    },
    methods: {
      fetchCinemas() {
        CinemaService.getAllCinemas()
          .then((response) => {
            this.cinemas = response.data;
          })
          .catch((error) => {
            console.error("There was an error fetching the cinemas:", error);
          });
      },
      showAddCinemaDialog() {
        this.isEditing = false; 
        this.newCinema = { name: "", address: "" }; 
        this.isDialogOpen = true;
      },
      closeDialog() {
        this.isDialogOpen = false;
      },
      addCinema() {
        CinemaService.createCinema(this.newCinema)
          .then(() => {
            this.fetchCinemas(); 
            this.closeDialog(); 
          })
          .catch((error) => {
            console.error("There was an error adding the cinema:", error);
          });
      },
      editCinema(cinema) {
        this.isEditing = true; 
        this.newCinema = { ...cinema }; 
        this.isDialogOpen = true;
      },
      updateCinema() {
        CinemaService.updateCinema(this.newCinema)
          .then(() => {
            this.fetchCinemas(); 
            this.closeDialog(); 
          })
          .catch((error) => {
            console.error("There was an error updating the cinema:", error);
          });
      },
      deleteCinema(id) {
        CinemaService.deleteCinema(id)
          .then(() => {
            this.cinemas = this.cinemas.filter(cinema => cinema.locationID !== id);
          })
          .catch((error) => {
            console.error("There was an error deleting the cinema:", error);
          });
      }
    },
    mounted() {
      this.fetchCinemas(); 
    },
  };
  </script>
  
  <style scoped>
  .manage-cinemas {
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
  