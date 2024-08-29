<template>
    <div class = 'movies'>
        <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/" class="active">Movies</a></li>
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
    <h2>Now Showing</h2>
    <div class="filters">
      <div class="filter-group">
        <select id="genre-filter">
          <option value="">All Genres</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="scifi">Sci-Fi</option>
          <option value="horror">Horror</option>
        </select>
        <select id="rating-filter">
          <option value="">All Ratings</option>
          <option value="g">G</option>
          <option value="pg">PG</option>
          <option value="pg13">PG-13</option>
          <option value="r">R</option>
        </select>
      </div>
      <input type="text" id="search" placeholder="Search movies...">
    </div>
    <div class="movie-grid">
      <div class="movie-card">
        <img src="https://via.placeholder.com/200x300?text=Movie+1" alt="Movie 1 Poster">
        <div class="movie-info">
          <h3>Galactic Odyssey</h3>
          <p>Genre: Sci-Fi</p>
          <p>Rating: PG-13</p>
          <div class="rating">
            <span class="star">★★★★</span>
            <span>4.0</span>
          </div>
        </div>
        <a href="/movies/galactic-odyssey" class="book-button">Book Now</a>
      </div>
      <div class="movie-card">
        <img src="https://via.placeholder.com/200x300?text=Movie+2" alt="Movie 2 Poster">
        <div class="movie-info">
          <h3>Laughter Lane</h3>
          <p>Genre: Comedy</p>
          <p>Rating: PG</p>
          <div class="rating">
            <span class="star">★★★★★</span>
            <span>4.5</span>
          </div>
        </div>
        <a href="/movies/laughter-lane" class="book-button">Book Now</a>
      </div>
      
      <div class="movie-card">
        <img src="https://via.placeholder.com/200x300?text=Movie+4" alt="Movie 4 Poster">
        <div class="movie-info">
          <h3>Heartstrings</h3>
          <p>Genre: Drama</p>
          <p>Rating: PG-13</p>
          <div class="rating">
            <span class="star">★★★★★</span>
            <span>4.8</span>
          </div>
        </div>
        <a href="/movies/heartstrings" class="book-button">Book Now</a>
      </div>
      <div class="movie-card">
        <img src="https://via.placeholder.com/200x300?text=Movie+5" alt="Movie 5 Poster">
        <div class="movie-info">
          <h3>Adrenaline Rush</h3>
          <p>Genre: Action</p>
          <p>Rating: PG-13</p>
          <div class="rating">
            <span class="star">★★★★</span>
            <span>4.3</span>
          </div>
        </div>
        <a href="/movies/adrenaline-rush" class="book-button">Book Now</a>
      </div>
      <div class="movie-card">
        <img src="https://via.placeholder.com/200x300?text=Movie+6" alt="Movie 6 Poster">
        <div class="movie-info">
          <h3>Timeless Love</h3>
          <p>Genre: Romance</p>
          <p>Rating: PG</p>
          <div class="rating">
            <span class="star">★★★★</span>
            <span>4.1</span>
          </div>
        </div>
        <a href="/movies/timeless-love" class="book-button">Book Now</a>
      </div>
    </div>
    <div class="pagination">
      <button disabled>Previous</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>Next</button>
    </div>
  </main>
    </div>
    
    
  
</template>

<script>
document.addEventListener('DOMContentLoaded', () => {
      const genreFilter = document.getElementById('genre-filter');
      const ratingFilter = document.getElementById('rating-filter');
      const searchInput = document.getElementById('search');
      const movieCards = document.querySelectorAll('.movie-card');

      function filterMovies() {
        const selectedGenre = genreFilter.value.toLowerCase();
        const selectedRating = ratingFilter.value.toLowerCase();
        const searchTerm = searchInput.value.toLowerCase();

        movieCards.forEach(card => {
          const genre = card.querySelector('.movie-info p:nth-child(2)').textContent.toLowerCase();
          const rating = card.querySelector('.movie-info p:nth-child(3)').textContent.toLowerCase();
          const title = card.querySelector('.movie-info h3').textContent.toLowerCase();

          const genreMatch = selectedGenre === '' || genre.includes(selectedGenre);
          const ratingMatch = selectedRating === '' || rating.includes(selectedRating);
          const searchMatch = title.includes(searchTerm);

          if (genreMatch && ratingMatch && searchMatch) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }

      genreFilter.addEventListener('change', filterMovies);
      ratingFilter.addEventListener('change', filterMovies);
      searchInput.addEventListener('input', filterMovies);
    });



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
  main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  .filter-group {
    display: flex;
    gap: 1rem;
  }
  select, input[type="text"] {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
  }
  .movie-card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  .movie-card:hover {
    transform: translateY(-5px);
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
    font-size: 1.2rem;
  }
  .movie-info p {
    margin: 0 0 0.5rem 0;
    color: #666;
    font-size: 0.9rem;
  }
  .rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .star {
    color: #ffd700;
  }
  .book-button {
    display: block;
    width: 100%;
    padding: 0.8rem;
    background-color: #e50914;
    color: #fff;
    text-align: center;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  .book-button:hover {
    background-color: #ff0a16;
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  .pagination button {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  .pagination button:hover {
    background-color: #555;
  }
  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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