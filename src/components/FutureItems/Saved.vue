<template>
  <div id="saved">
    <div id="music_menu" @click="backToMenu">Music Menu</div>
    <youtube
      :video-id="$store.state.savedArray[this.index]"
      ref="youtube"
      @playing="playing"
      class="iframe"
      allow="autoplay"
    ></youtube>
    <button @click="playMyMusic">play</button>
    <button @click="pauseVideo">stop</button>
    <button @click="nextMusic">
      Next
    </button>
    <button @click="previousMusic">Previous</button>
    <h4>{{ title }}</h4>
    <h5>
      Audio {{ `${this.index + 1}/ ${this.$store.state.savedArray.length}` }}
    </h5>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      index: 0,
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
  methods: {
    backToMenu() {
      this.$router.push("/music");
    },
    fetchTitle() {
      fetch(
        "https://noembed.com/embed?url=https://www.youtube.com/watch?v=" +
          this.$store.state.savedArray[this.index]
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.title = data.title;
        });
    },
    playerReady() {
      this.player.playVideo();
      this.index++;
      this.fetchTitle();
    },
    playMyMusic() {
      this.player.playVideo();
    },
    pauseVideo() {
      this.player.pauseVideo();
    },
    playing() {
      this.player.playVideo();
    },
    nextMusic() {
      if (this.index >= this.$store.state.savedArray.length - 1) {
        this.index = 0;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1);
      } else {
        this.index = this.index + 1;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1);
      }
    },
    previousMusic() {
      if (this.index <= 0) {
        this.index = this.$store.state.savedArray.length - 1;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1);
      } else {
        this.index = this.index - 1;
        this.fetchTitle();
        this.playMyMusic();
        setTimeout(() => {
          this.playMyMusic();
        }, 1);
      }
    },
  },
  mounted() {
    this.fetchTitle();
    this.player.playVideo();
  },
};
</script>
<style>
.iframe {
  display: none !important;
}
h4,
#music_menu,
h5 {
  color: black;
}
</style>
