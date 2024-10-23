<template>
  <div>
    <h2>Reviews for Movie: {{ movieTitle }}</h2>
    <div v-if="reviews.length > 0">
      <ul>
        <li v-for="review in reviews" :key="review.id" class="review-item">
          <strong>{{ review.user.name }}</strong>
          <p class="comment">{{ review.comment }} </p>
          <div class="stars">
            <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= review.rating }">★</span>
          </div>
          <p class="timestamp">{{ formatDate(review.timestamp) }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No reviews available for this movie.</p>
    </div>
    <h3>Add a Review</h3>
    <form @submit.prevent="submitReview" class="review-form">
      <textarea v-model="newReview.comment" placeholder="Write your review" required></textarea>
      <div class="star-rating">
        <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= newReview.rating }"
          @click="setRating(n)">★</span>
      </div>
      <button type="submit">Submit Review</button>
    </form>
  </div>
</template>

<script>
import ReviewService from '@/Services/ReviewService';
import MovieService from '@/Services/MovieService';
import UserService from '@/Services/UserService';

export default {
  data() {
    return {
      movieTitle: this.$route.query.title,
      movieID: this.$route.query.movieID,
      reviews: [],
      newReview: {
        comment: '',
        rating: null,
        timestamp: "",
        movie: null,
        user: null,
      },
      loggedInUser: null,
      movie: [],
      user: [],
    };
  },
  async created() {
    // this.movieTitle = this.$route.query.title;
    // this.movieID = this.$route.query.movieID;
    // // Get loggedInUser from local storage
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    // this.newReview.user = this.loggedInUser ? this.loggedInUser.userID : null;
    console.log('Movie ID:', this.movieID);
    console.log('User ID:', this.loggedInUser ? this.loggedInUser.userID : 'No user logged in');
    console.log(localStorage.getItem('loggedInUser'));
    await this.fetchReviews();
    const movie = await MovieService.getMovieById(this.movieID);
    const user = await UserService.getUserById(this.loggedInUser.userID);
    console.log(movie);
    console.log(user);
    this.newReview.movie = movie.data;
    this.newReview.user = user.data;
  },


  methods: {
    setRating(n) {
      this.newReview.rating = n;
    },

    fetchReviews() {
      console.log('Fetching reviews for movie:', this.movieID);
      ReviewService.getReviewsByMovieId(this.movieID)
        .then(response => {
          this.reviews = response.data;
          console.log('Reviews fetched:', this.reviews);
        })
        .catch(error => {
          console.error("Error fetching movies:", error);
        });
    },
    
    async submitReview() {
      const review = {
        comment: this.newReview.comment,
        rating: this.newReview.rating,
        timestamp: new Date().toISOString(),
        movie: this.newReview.movie,
        user: this.newReview.user,
      };
      console.log('Submitting review:', review);
      try {
        await ReviewService.createReview(review);
        this.newReview.comment = '';
        this.newReview.rating = null;
        await this.fetchReviews();
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    },

    formatDate(timestamp) {
      const date = new Date(timestamp);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  }
};
</script>

<style scoped>
.review-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.star-rating {
  display: flex;
  gap: 5px;
  font-size: 30px;
  cursor: pointer;
}

.stars {
  font-size: 20px;
  color: #ccc;
}

.star {
  cursor: pointer;
  color: #ccc;
}

.filled {
  color: #f39c12;
}

.star.filled {
  color: #f39c12;
}

.comment {
  text-align: left;
  margin-top: 5px;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.review-form textarea {
  width: 100%;
  height: 150px;
  resize: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.review-form input[type="number"] {
  width: 150px;
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.review-form button {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.review-date {
  font-size: 0.9em;
  color: gray;
  margin-left: 10px;
}

.review-form button:hover {
  background-color: #e67e22;
}

.timestamp {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
  text-align: left;
}
</style>

