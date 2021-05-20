<template>
  <main>
    <header>Music</header>
    <router-link to="/">Back to all</router-link>
    <section>
      <div><router-link to="/music/popular"> Popular</router-link></div>
      <div><router-link to="/music/categories">Categories</router-link></div>
      <div><router-link to="/music/saved">Saved</router-link></div>
    </section>
  </main>
</template>
<style lang="scss" scoped>
main {
  header {
    text-align: center;
    font-size: 30px;
    margin: 16px auto;
  }
  section {
    display: flex;
    justify-content: space-around;
    div {
      font-size: 18px;
    }
  }
}
</style>
