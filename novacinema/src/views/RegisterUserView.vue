<template>
  <div class="registeruser">
    <nav>
    <ul>
      <li><a href="/" >Home</a></li>
      <li><a href="/movies">Movies</a></li>
      <li><a href="/cinema">Cinema</a></li>
      <li><a href="/promotions">Promotions</a></li>
      <li class="dropdown">
      <a href="/myaccount" class="dropbtn">My Account</a>
      <div class="dropdown-content">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </li>
    </ul>
  </nav>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="surname">Surname:</label>
        <input type="text" id="surname" v-model="surname" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login here</router-link>.</p>
  </div> 
  </div>
</template>

<script>
import UserService from '@/Services/UserService'; // Import the UserService

export default {
  name: 'RegisterUser',
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    async handleRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const user = {
        name: this.name,
        surname: this.surname,
        emailAddress: this.email,
        password: this.password
      };
      console.log(user);
      
      const response = await UserService.createUser(user);

      if (response.status === 201) { 
        alert('Registration successful!');
        this.$router.push('/login'); // Redirect to login page
      } else {
        alert(`Registration failed: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(`An error occurred during registration: ${error.response?.data?.message || 'Unknown error'}`);
    }
  }
}
}
</script>

<style>
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

.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

p {
  margin-top: 10px;
  text-align: center;
}

</style>