<template>
    <div class="manage-users">
      <h1>Manage Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style="text-align: center;">
          <tr v-for="user in users" :key="user.userID">
            <td>{{ user.userID }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td >{{ user.emailAddress }}</td>
            <td >{{ user.isAdmin ? 'Y' : 'N' }}</td>
            <td>
              <button @click="editUser(user.userID)">Edit</button>
              <!-- <button @click="deleteUser(user.userID)">Delete</button> -->
              <button @click="toggleAdminStatus(user.userID)" v-if="!user.isAdmin">Make Admin</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
import UserService from '@/Services/UserService';

  export default {
    name: 'ManageUsersView',
    data() {
      return {
        users: [] 
      }
    },
    methods: {
      fetchUsers() {
      UserService.getAllUsers()
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the users:", error);
        });
    },
      editUser(id) {
        console.log('Editing user with ID:', id); 
      },
      deleteUser(id) {
        UserService.deleteUser(id)
        .then(() => {
          this.fetchUsers(); 
        })
        .catch((error) => {
          console.error("There was an error deleting the user:", error);
        });
      },
      toggleAdminStatus(id) {
        const user = this.users.find(user => user.userID === id);
        if (user) {
        const updatedUser = { ...user, isAdmin: true };
        console.log("User being sent for update",updatedUser);
        UserService.updateUser(updatedUser)
          .then((response) => {
            console.log("Update response:", response.data);
            this.fetchUsers();
          })
          .catch((error) => {
            console.error("There was an error updating the user:", error);
          });
      }
    }, 
    },
    mounted() {
        this.fetchUsers();
      }
  }
  </script>
  
  <style scoped>
  .manage-users {
    padding: 20px;
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
  </style>
  