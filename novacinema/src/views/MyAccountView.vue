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
        <li><a href="/account#profile" class="active">Profile</a></li>
        <li><a href="/account#payment">Payment Methods</a></li>
        <li><a href="/account#bookings">My Bookings</a></li>
      </ul>
    </aside>
    <section class="content">
      <h2 class ="h5">Profile Information</h2>
      <form class="profile-info">
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
    </section>
  </main>
  </div>
</template>

<script>
export default {

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
