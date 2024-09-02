<template>
  <header>
    <router-link to="/">
      <h1><span>Nova </span>Cinema</h1>
    </router-link>
  </header>
  <main>
    <router-view :cinemas="cinemas" @review-submitted="addReview"></router-view>
  </main>
</template>
<script>
export default {
  data() {
    return {
      cinemas: [
        { id: 1, name: "Backdrop Cinema", location: "123 Main St, Cityville", image: "https://via.placeholder.com/300x200?text=Backdrop+Cinema", reviews: 2 },
        { id: 2, name: "FrontRow Cinema", location: "456 Elm St, Cityville", image: "https://via.placeholder.com/300x200?text=FrontRow+Cinema", reviews: 2 },
        { id: 3, name: "Steveson Rd Cinema", location: "789 Oak St, Townsville", image: "https://via.placeholder.com/300x200?text=Steveson+Cinema", reviews: 2 },
        { id: 4, name: "Cont Cinema", location: "101 Pine St, Metropolis", image: "https://via.placeholder.com/300x200?text=Cont+Cinema", reviews: 2 },
        { id: 5, name: "Cinemito Cinema", location: "202 Maple St, Rivercity", reviews: 2 }
      ]
    };
  },
  methods: {
    addReview(cinemaId) {
      const cinema = this.cinemas.find(c => c.id === Number(cinemaId));
      if (cinema) {
        cinema.reviews += 1;
      }
    }
  }
};
</script>
<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fire Sans',sans-serif;
  &::selection {
    background: transparentize(#42b883,0.5);
  }
}
body {
  background: color #35495e;
}
a {
  text-decoration: none;
}
header{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  background-color: #2c3d4e;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  h1 {
    color: white;
    font-size: 28px;
    span {
      color: #42b883;
    }
  }
}
</style>