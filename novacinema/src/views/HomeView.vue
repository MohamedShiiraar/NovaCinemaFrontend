<template>
  <div class="home">
   <nav>
    <ul>
      <li><a href="/" class="active">Home</a></li>
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
  <main>
    <section class="hero">
      <div class="hero-content">
        <h2>Experience Movies Like Never Before</h2>
        <p>Book your tickets now and immerse yourself in the world of cinema</p>
        <a href="/movies" class="cta-button">Browse Movies</a>
      </div>
    </section>
    
    <section class="featured-section">
      <h2>Featured Movies</h2>
      <div class="movie-carousel">
        <div class="movie-card">
          <img src="https://via.placeholder.com/200x300?text=Movie+1" alt="Movie 1 Poster">
          <div class="movie-info">
            <h3>Movie Title 1</h3>
            <p>Genre: Action</p>
          </div>
        </div>
        <div class="movie-card">
          <img src="https://via.placeholder.com/200x300?text=Movie+2" alt="Movie 2 Poster">
          <div class="movie-info">
            <h3>Movie Title 2</h3>
            <p>Genre: Comedy</p>
          </div>
        </div>
        <div class="movie-card">
          <img src="https://via.placeholder.com/200x300?text=Movie+3" alt="Movie 3 Poster">
          <div class="movie-info">
            <h3>Movie Title 3</h3>
            <p>Genre: Drama</p>
          </div>
        </div>
        <div class="movie-card">
          <img src="https://via.placeholder.com/200x300?text=Movie+4" alt="Movie 4 Poster">
          <div class="movie-info">
            <h3>Movie Title 4</h3>
            <p>Genre: Sci-Fi</p>
          </div>
        </div>
        <div class="movie-card">
          <img src="https://via.placeholder.com/200x300?text=Movie+5" alt="Movie 5 Poster">
          <div class="movie-info">
            <h3>Movie Title 5</h3>
            <p>Genre: Horror</p>
          </div>
        </div>
        <div class="movie-card">
          <img src="https://via.placeholder.com/200x300?text=Movie+6" alt="Movie 6 Poster">
          <div class="movie-info">
            <h3>Movie Title 6</h3>
            <p>Genre: Horror</p>
          </div>
        </div>
        <div class="movie-card">
          <img src="https://via.placeholder.com/200x300?text=Movie+7" alt="Movie 7 Poster">
          <div class="movie-info">
            <h3>Movie Title 7</h3>
            <p>Genre: Horror</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="featured-section">
      <h2>Special Promotions</h2>
      <div class="promotions">
        <div class="promo-card">
          <img src="https://via.placeholder.com/300x150?text=Student+Discount" alt="Student Discount Promotion">
          <div class="promo-info">
            <h3>Student Discount</h3>
            <p>Get 20% off on all movie tickets with your student ID</p>
            <router-link :to="{ name: 'Promotions', query: { section: 'student' } }" class="promo-button">Learn More</router-link>
          </div>
        </div>
        <div class="promo-card">
          <img src="https://via.placeholder.com/300x150?text=Family+Package" alt="Family Package Promotion">
          <div class="promo-info">
            <h3>Family Package</h3>
            <p>Save big with our family package for groups of 4 or more</p>
            <router-link :to="{ name: 'Promotions', query: { section: 'family' } }" class="promo-button">Learn More</router-link>
          </div>
        </div>
        <div class="promo-card">
          <img src="https://via.placeholder.com/300x150?text=Senior+Citizen+Offer" alt="Senior Citizen Offer">
          <div class="promo-info">
            <h3>Senior Citizen Offer</h3>
            <p>Enjoy special discounts for our senior moviegoers</p>
            <router-link :to="{ name: 'Promotions', query: { section: 'senior' } }" class="promo-button">Learn More</router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
  </div>
  
  
  
  
</template>

<script>

export default {

}
</script>

<style scoped>
body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
    color: #333;
  }
  header {
    background-color: #1a1a1a;
    color: #fff;
    padding: 1rem;
    text-align: center;
  }
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
  main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  .hero {
    background-image: url('@/assets/film-strip-perspective-3d-isometric-600nw-2144961605.jpg');
    background-size: cover;
    background-position: center;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .hero-content {
    text-align: center;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 2rem;
    border-radius: 8px;
  }
  .hero h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  .hero p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  .cta-button {
    display: inline-block;
    background-color: #e50914;
    color: #fff;
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  .cta-button:hover {
    background-color: #ff0a16;
  }
  .featured-section {
    margin-bottom: 3rem;
  }
  .featured-section h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  .movie-carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  .movie-card {
    flex: 0 0 auto;
    width: 200px;
    margin-right: 1rem;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    scroll-snap-align: start;
  }
  .movie-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  .movie-info {
    padding: 1rem;
  }
  .movie-info h3 {
    margin: 0 0 0.5rem 0;
  }
  .movie-info p {
    margin: 0;
    color: #666;
  }
  .promotions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  .promo-card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .promo-card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  .promo-info {
    padding: 1rem;
  }
  .promo-info h3 {
    margin: 0 0 0.5rem 0;
  }
  .promo-info p {
    margin: 0 0 1rem 0;
    color: #666;
  }
  .promo-button {
    display: inline-block;
    background-color: #333;
    color: #fff;
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.9rem;
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
</style>