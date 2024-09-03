<template>
  <div class="myaccount">

  <main class="main2">
    <aside class="sidebar">
      <ul>
          <li><a href="#" @click="showSection('profile')" :class="{ active: currentSection === 'profile' }">Profile</a></li>
          <li><a href="#" @click="showSection('payment')" :class="{ active: currentSection === 'payment' }">Payment Methods</a></li>
          <li><a href="#" @click="showSection('bookings')" :class="{ active: currentSection === 'bookings' }">My Bookings</a></li>
        </ul>
    </aside>
    <section class="content">
        <div v-if="currentSection === 'profile'">
          <h2 class="h5">Profile Information</h2>
          <form class="profile-info" @submit.prevent="saveProfile">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="loggedInUser.name">
            
            <label for="surname">Surname:</label>
            <input type="text" id="surname" v-model="loggedInUser.surname">

            <label for="emailAddress">Email:</label>
            <input type="email" id="emailAddress" v-model="loggedInUser.emailAddress">

            <label for="password">Current Password:</label>
            <input type="password" id="password" v-model="loggedInUser.password">

            <label for="password">New Password:</label>
            <input type="password" id="password" >
        
        <label for="language">Preferred Language:</label>
        <select id="language" name="language">
          <option value="en" selected>English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
        
        <div></div>
            <button type="submit" class="save-button">Save Changes</button>
          </form>
        </div>

        
        <div v-if="currentSection === 'payment'">
          <h2 class="h5">Payment Methods</h2>
          <ul class="cards-list">
            <li v-for="card in savedCards" :key="card.id" class="card-item">
              <span>{{ card.brand }} ending in {{ card.last4 }}</span>
              <button @click="removeCard(card.id)">Remove</button>
            </li>
          </ul>
          <form class="add-card-form" @submit.prevent="addCard">
            <label for="card-number" style="padding-bottom: 2px;">Card Number:</label>
            <input type="text" style="padding-bottom: 2px" id="card-number" v-model="newCard.number" placeholder="Card Number" required>

            <label for="expiry-date" style="padding-bottom: 2px;padding-top: 10px;">Expiry Date:</label>
            <input type="text" id="expiry-date" v-model="newCard.expiry" placeholder="MM/YY" required>

            <label for="cvc" style="padding-bottom: 2px;padding-top: 10px;">CVC:</label>
            <input type="text" id="cvc" v-model="newCard.cvc" placeholder="CVC" required>

            <button type="submit" class="save-button">Add Card</button>
          </form>
        </div>

       
        <div v-if="currentSection === 'bookings'">
          <h2 class="h5">My Bookings</h2>    // Add history of movies watched
          <p>Booking details would go here.</p>
        </div>
      </section>
  </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSection: 'profile',
      savedCards: [
        { id: 1, brand: 'Visa', last4: '1234' },
        { id: 2, brand: 'MasterCard', last4: '5678' },
      ],
      newCard: {
        number: '',
        expiry: '',
        cvc: ''
      },
      loggedInUser: {
        name: '',
        email: '',
        phone: '',
        dob: '',
        address: '',
        language: 'en'
      }
      
    };
  },
  methods: {
    showSection(section) {
      this.currentSection = section;
    },
    saveProfile() {
      alert('Profile saved!');
    },
    addCard() {
      const last4 = this.newCard.number.slice(-4);
      this.savedCards.push({ 
        id: Date.now(), 
        brand: this.getCardBrand(this.newCard.number), 
        last4 
      });
      this.newCard = { number: '', expiry: '', cvc: '' };
    },
    removeCard(id) {
      this.savedCards = this.savedCards.filter(card => card.id !== id);
    },
    getCardBrand(number) {
      if (number.startsWith('4')) return 'Visa';
      if (number.startsWith('5')) return 'MasterCard';
      return 'Unknown';
    },
    loadProfile() {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (user) {
        this.loggedInUser = { 
          name: user.name,
          surname: user.surname || '',
          emailAddress: user.emailAddress,
          password: user.password,
          language: user.language || 'en'
        };
      }
    }
  },
  created() {
    this.loadProfile(); 
  }
}
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
.main2 {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
    display: flex;
  }
  .sidebar {
    width: 250px;
    background-color: #fff;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  .sidebar ul li {
    margin-bottom: 1rem;
  }
  .sidebar ul li a {
    color: #333;
    text-decoration: none;
    display: block;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  .sidebar ul li a:hover, .sidebar ul li a.active {
    background-color: #f0f0f0;
  }
  .content {
    flex-grow: 1;
    margin-left: 2rem;
    background-color: #fff;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .h5 {
    margin-top: 0;
    color: black;
  }
  .profile-info {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 1rem;
    align-items: center;
  }
  .profile-info label {
    font-weight: bold;
  }
  .profile-info input, .profile-info select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .save-button {
    background-color: black;
    color: #fff;
    border: none;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
  }
  .save-button:hover {
    background-color: green;
  }

  .cards-list {
  margin-top: 1rem; /* Space between Payment Methods heading and the first card entry */
}

.card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 2rem; 
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-item span {
  flex-grow: 1;
}

.card-item button {
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 0.5rem 0.8rem; 
  font-size: 0.75rem; 
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-width: 100px; 
  width: auto; 
}

.card-item button:hover {
  background-color: #ff0a16;
}
</style>
