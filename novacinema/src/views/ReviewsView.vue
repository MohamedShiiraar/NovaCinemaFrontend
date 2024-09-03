<template>
  <div class="reviews-view">
    <h2>Reviews for {{ cinemaName }}</h2>
    <div class="reviews-list">
      <div v-for="review in reviews" :key="review.id" class="review-item">
        <h4>{{ review.author }}</h4>
        <p>{{ review.content }}</p>
        <span class="star-rating">Rating: {{ review.rating }} / 5</span>
      </div>
    </div>
    <div class="leave-review">
      <h3>Leave a Review</h3>
      <form @submit.prevent="submitReview">
        <textarea v-model="newReview.content" placeholder="Write your review here..." required></textarea>
        <label for="rating">Rating:</label>
        <select v-model="newReview.rating" required>
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['cinemas'],
  data() {
    return {
      cinemaName: "", 
      reviews: [
       
        { id: 1, author: "John Doe", content: "Great cinema!", rating: 4 },
        { id: 2, author: "Jane Smith", content: "Good selection of movies.", rating: 5 }
      ],
      newReview: {
        content: "",
        rating: null
      }
    };
  },
  methods: {
    submitReview() {
      
      const newReview = {
        id: this.reviews.length + 1,
        author: "Anonymous", 
        content: this.newReview.content,
        rating: this.newReview.rating
      };
      this.reviews.push(newReview);
      
      this.$emit('review-submitted', this.$route.query.cinemaId);
      
      this.newReview.content = "";
      this.newReview.rating = null;
    },
    getCinemaName(id) {
      
      if (this.cinemas) {
        const cinema = this.cinemas.find(cinema => cinema.id === Number(id));
        return cinema ? cinema.name : "Unknown Cinema";
      }
      return "Unknown Cinema";
    }
  },
  mounted() {
   
    const cinemaId = this.$route.query.cinemaId;
    this.cinemaName = this.getCinemaName(cinemaId);
  }
};
</script>
<style scoped>
.reviews-view {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.reviews-list {
  margin-bottom: 2rem;
}
.review-item {
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}
.star-rating {
  color: #FFD700;
}
.leave-review form {
  display: flex;
  flex-direction: column;
}
textarea {
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
select {
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #e50914;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
