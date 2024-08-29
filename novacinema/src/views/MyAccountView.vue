<template>
  <div class="myaccount">
    <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/movies">Movies</a></li>
      <li><a href="/cinema">Cinema</a></li>
      <li><a href="/promotions">Promotions</a></li>
      <li class="dropdown">
      <a href="/myaccount"  class="dropbtn">My Account</a>
      <div class="dropdown-content">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </li>
    </ul>
  </nav>

  <main class="main2">
    <aside class="sidebar">
      <ul>
          <li><a href="#" @click="showSection('profile')" :class="{ active: currentSection === 'profile' }">Profile</a></li>
          <li><a href="#" @click="showSection('payment')" :class="{ active: currentSection === 'payment' }">Payment Methods</a></li>
          <li><a href="#" @click="showSection('bookings')" :class="{ active: currentSection === 'bookings' }">My Bookings</a></li>
        </ul>
    </aside>
    <section class="content">
        <!-- Profile Information -->
        <div v-if="currentSection === 'profile'">
          <h2 class="h5">Profile Information</h2>
          <form class="profile-info" @submit.prevent="saveProfile">
            <!-- Profile fields remain the same -->
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="Name">
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="Email">
        
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" value="Phone">
        
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" value="Date Of Birth">
        
        <label for="address">Address:</label>
        <input type="text" id="address" name="address" value="Address">
        
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

        <!-- Payment Methods -->
        <div v-if="currentSection === 'payment'">
          <h2 class="h5">Payment Methods</h2>
          <ul class="cards-list">
            <li v-for="card in savedCards" :key="card.id" class="card-item">
              <span>{{ card.brand }} ending in {{ card.last4 }}</span>
              <button @click="removeCard(card.id)">Remove</button>
            </li>
          </ul>
          <form class="add-card-form" @submit.prevent="addCard">
            <label for="card-number">Card Number:</label>
            <input type="text" id="card-number" v-model="newCard.number" placeholder="Card Number" required>

            <label for="expiry-date">Expiry Date:</label>
            <input type="text" id="expiry-date" v-model="newCard.expiry" placeholder="MM/YY" required>

            <label for="cvc">CVC:</label>
            <input type="text" id="cvc" v-model="newCard.cvc" placeholder="CVC" required>

            <button type="submit" class="save-button">Add Card</button>
          </form>
        </div>

        <!-- My Bookings -->
        <div v-if="currentSection === 'bookings'">
          <h2 class="h5">My Bookings</h2>
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
      currentSection: 'profile', // Default to showing profile
      savedCards: [
        { id: 1, brand: 'Visa', last4: '1234' },
        { id: 2, brand: 'MasterCard', last4: '5678' },
      ],
      newCard: {
        number: '',
        expiry: '',
        cvc: ''
      }
    };
  },
  methods: {
    showSection(section) {
      this.currentSection = section;
    },
    saveProfile() {
      // Handle profile save logic here
      alert('Profile saved!');
    },
    addCard() {
      // Logic to add a new card to savedCards
      const last4 = this.newCard.number.slice(-4);
      this.savedCards.push({ 
        id: Date.now(), 
        brand: this.getCardBrand(this.newCard.number), 
        last4 
      });
      this.newCard = { number: '', expiry: '', cvc: '' }; // Reset form
    },
    removeCard(id) {
      this.savedCards = this.savedCards.filter(card => card.id !== id);
    },
    getCardBrand(number) {
      // A simple function to determine the card brand
      if (number.startsWith('4')) return 'Visa';
      if (number.startsWith('5')) return 'MasterCard';
      return 'Unknown';
    }
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
    color: #e50914;
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
    background-color: #e50914;
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
    background-color: #ff0a16;
  }
</style>
