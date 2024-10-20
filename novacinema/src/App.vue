<template>
  <header>
    <router-link to="/">
      <h1><span>Nova</span></h1>
    </router-link>
  </header>
  <NavBar />
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fire Sans', sans-serif;
  &::selection {
    background: transparentize(#42b883, 0.5);
  }
}
body {
  background: color #35495e;
}
a {
  text-decoration: none;
}
header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  background-color: #2c3d4e;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
}
h1 {
  color: white;
  font-size: 28px;
  span {
    color: #42b883;
  }
}
</style>
