<template>
  <div class="admin-dashboard">
    <aside class="sidebar">
      <ul>
        <li @click="showSection('movies')">Manage Movies</li>
        <li @click="showSection('users')">Manage Users</li>
        <li @click="showSection('cinemas')">Manage Cinemas</li>
        <li @click="showSection('promotions')">Manage Promotions</li>
        <li @click="logout">Logout</li>
      </ul>
    </aside>

    <section class="content">
      <div v-if="currentSection === 'movies'">
        <manage-movies-view />
      </div>
      <div v-if="currentSection === 'users'">
        <manage-user-view />
      </div>
      <div v-if="currentSection === 'cinemas'">
        <manage-cinemas-view/>
      </div>
      <div v-if="currentSection==='promotions'">
        <manage-promotions />
      </div>
    </section>
  </div>
</template>
  
  <script>
  import ManageMoviesView from './ManageMoviesView.vue';
  import ManageUserView from './ManageUserView.vue';

  import ManagePromotions from './ManagePromotions.vue';

  import ManageCinemasView from './ManageCinemasView.vue';

  export default {
  components: {
    ManageMoviesView,
    ManageUserView,

    ManagePromotions,

    ManageCinemasView, 

  },
    ManageUserView,
  data() {
    return {
      currentSection: null, 
      loggedInUser: null // JSON.parse(localStorage.getItem('loggedInUser')) || {}
    };
  },
  methods: {
    showSection(section) {
      this.currentSection = section;
    },
    logout() {
      localStorage.removeItem('loggedInUser');
        // this.loggedInUser = {};
        this.$router.push('/login');
    },
    adminCheck() {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!loggedInUser || !loggedInUser.admin) {
        alert('You are not authorized to view this page');
        this.$router.push({ name: 'Login' });
      }
    },
  },
  created() {
    this.adminCheck();
  }
};
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
  