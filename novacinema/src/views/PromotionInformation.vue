<template>
    <div>
        <main>
          <h1>Promotions</h1>
            <div v-if="loading">Loading...</div>
            <div v-if="error">{{ error }}</div>
            <div v-if="promotions.length">
              <div v-for="promotion in promotions" :key="promotion.promotionID" class="promotion">
                <section class="{{ promotion.promotionName }}">
                  <h2>{{ promotion.promotionName }}</h2>
                  <p>{{ promotion.promotionDescription }}</p>
                  <p>Discount: {{ promotion.discountPercentage * 100 }}%</p>
                  <p>Valid From: {{ new Date(promotion.validFrom).toLocaleString() }}</p>
                  <p>Valid Until: {{ new Date(promotion.validUntil).toLocaleString() }}</p>
                </section>
              </div>
            </div>
        </main>
    </div>
</template>
  
<script>
  import PromotionService from '@/Services/PromotionService';
  export default {
    data() {
      return {
        promotions: [],
        loading: true,
        error: null
      };
    },

    mounted() {
      this.fetchPromotions();
      const section = this.$route.query.section;
          if (section) {
              this.scrollToSection(section);
          }
    },

    methods: {
      scrollToSection(section) {
          const element = this.$refs[section];
          if (element) {
              const top = element.offsetTop;
              window.scrollTo({ top, behavior: 'smooth' });
              }
          },
      async fetchPromotions() {
        try {
          const response = await PromotionService.getAllPromotions();
          this.promotions = response.data;
        } catch (error) {
          this.error = "Failed to load promotions.";
        } finally {
          this.loading = false;
        }
      }
    }
  };
</script>
  
<style scoped>
.promotion {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px 0;
}

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