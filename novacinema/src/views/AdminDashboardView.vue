<template>
    <div class="admin-dashboard">
      <aside class="sidebar">
        <ul>
          <li><a href="/manage-movies"> Manage Movies</a></li>
                    
          <li><a href="/manage-users">Manage Users</a></li>
          
          <li @click="logout">Logout</li>
        </ul>
      </aside>
  
      <section class="content">
        <router-view></router-view>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
        goToManageMovies() {
      this.$router.push({ name: 'ManageMovies' });
    },
    goToManageUsers() {
      this.$router.push({ name: 'ManageUsers' });
    },
    goToViewReports() {
      this.$router.push({ name: 'ViewReports' });
    },
  
      logout() {
        // Add your logout logic here
        this.$router.push({ name: 'Login' });
      }
    }
  }
  </script>
  
  <style scoped>
  .admin-dashboard {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    width: 250px;
    background-color: #333;
    color: #fff;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar ul li {
    padding: 15px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .sidebar ul li:hover {
    background-color: #444;
  }
  
  .content {
    flex: 1;
    padding: 20px;
    background-color: #f0f0f0;
  }
  </style>
  