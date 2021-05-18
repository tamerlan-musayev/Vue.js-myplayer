<template>
  <div>
    <youtube :video-id="videoId" ref="youtube" @playing="playing" id="iframe"></youtube>
    <button @click="playVideo">play</button>
    <button @click="pauseVideo">stop</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoId: "lG0Ys-2d4MA",
    };
  },
  methods: {
    playVideo() {
      this.player.playVideo();
    },
    pauseVideo() {
      this.player.pauseVideo();
    },
    playing() {
      console.log(" we are watching!!!");
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
};
</script>
<style lang="scss">
#iframe {
  display: none !important;
}
</style>