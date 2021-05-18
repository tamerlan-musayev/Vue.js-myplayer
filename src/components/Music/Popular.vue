<template>
  <div>
    <youtube
      :video-id="playlist[index].videoId"
      ref="youtube"
      @playing="playing"
      id="iframe"
    ></youtube>
    <button @click="playAudio">play</button>
    <button @click="pauseVideo">stop</button>
    <button @click="nextMusic">Next</button>
    <button @click="previousMusic">Previous</button>
    <h4>{{ title }}</h4>
    <h5>Playlist {{ `${this.index + 1}/ ${this.playlist.length}` }}</h5>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      index: 0,
      playlist: [
        {
          videoId: "tQ0yjYUFKAE",
        },
        {
          videoId: "lG0Ys-2d4MA",
        },
      ],
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
  methods: {
    playAudio() {
      this.player.playVideo();
    },
    pauseVideo() {
      this.player.pauseVideo();
    },
    playing() {
      console.log(" we are watching!!!");
    },
    fetchTitle() {
      fetch(
        "https://noembed.com/embed?url=https://www.youtube.com/watch?v=" +
          this.playlist[this.index].videoId
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.title = data.title;
        });
    },
    nextMusic() {
      if (this.index >= this.playlist.length - 1) {
        return (this.index = this.playlist.length - 1);
      } else {
        this.index = this.index + 1;
        console.log(this.index);
        this.fetchTitle();
      }
    },
    previousMusic() {
      if (this.index <= 0) {
        return (this.index = 0);
      } else {
        this.index = this.index - 1;
        this.fetchTitle();
      }
    },
  },
  mounted() {
    this.fetchTitle();
  },
};
</script>
<style>
#iframe {
  display: none !important;
}
</style>
