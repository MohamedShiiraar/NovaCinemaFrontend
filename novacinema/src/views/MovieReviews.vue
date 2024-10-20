<template>
  <div>
    <!-- Display reviews based on the movie title -->
    <h2>Reviews for Movie: {{ movieTitle }}</h2>
    
    <!-- Display reviews list -->
    <div v-if="reviews.length > 0">
      <ul>
        <li v-for="review in reviews" :key="review.id">
          <strong>{{ review.user.username }}</strong>: {{ review.comment }} ({{ review.rating }}/5)
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No reviews available for this movie.</p>
    </div>

    <!-- Add review form -->
    <h3>Add a Review</h3>
    <form @submit.prevent="submitReview">
      <textarea v-model="newReview.comment" placeholder="Write your review" required></textarea>
      <input v-model.number="newReview.rating" type="number" min="1" max="5" placeholder="Rating (1-5)" required>
      <button type="submit">Submit Review</button>
    </form>
  </div>
</template>

<script>
import ReviewService from '@/Services/ReviewService';
import MovieService from '@/Services/MovieService';

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
    };
  },
  async created() {
    // this.movieTitle = this.$route.query.title;
    // this.movieID = this.$route.query.movieID;

    // // Get loggedInUser from local storage
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    this.newReview.user = this.loggedInUser ? this.loggedInUser.userID : null;

    console.log('Movie ID:', this.movieID);
    console.log('User ID:', this.loggedInUser ? this.loggedInUser.userID : 'No user logged in');

    console.log(localStorage.getItem('loggedInUser'));



    // Fetch existing reviews for the movie
    await this.fetchReviews();

    // Fetch the movie details
    this.movie = await MovieService.getMovieById(this.movieID);
  },

  
  methods: {
    async fetchReviews() {
      try {
        const response = await ReviewService.getAllReviews();
        this.reviews = response.data.filter(review => review.movie.movieID === this.movieID); // Ensure to filter reviews based on the movieID
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    },


    async submitReview() {
      // Create a review object
      const review = {
        comment: this.newReview.comment,
        rating: this.newReview.rating,
        timestamp: new Date().toISOString(),
        movie: this.newReview.movie, // Assuming the backend requires movieID
        user: this.newReview.user, // Assuming the logged-in user has an ID
      };

      // Log the review object for debugging
      console.log('Submitting review:', review);

      // Send the review to the backend
      try {
        await ReviewService.createReview(review);

        // Clear the form
        this.newReview.comment = '';
        this.newReview.rating = null;

        // Fetch the updated reviews list
        await this.fetchReviews();
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
