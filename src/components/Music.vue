<template>
  <div id="all">
    <div id="container">
      <youtube
        :video-id="videos2[index]"
        ref="youtube"
        @ended="playerReady"
        class="iframe"
        allow="autoplay"
      ></youtube>
      <div id="text-controllers">
        <h4>{{ title }}</h4>
        <div id="controller">
          <button @click="previousMusic">
            <b-icon-skip-backward-fill></b-icon-skip-backward-fill>
          </button>
          <button @click="playMyMusic" id="play" v-if="!isPlay">
            <b-icon-play-circle-fill></b-icon-play-circle-fill>
          </button>
          <button @click="pauseVideo" id="pause" v-if="isPlay">
            <b-icon-stop-circle-fill></b-icon-stop-circle-fill>
          </button>
          <button @click="nextMusic">
            <b-icon-skip-forward-fill></b-icon-skip-forward-fill>
          </button>
          <div id="controller-2">
            <button @click="randomMusic" :class="{ isActive: isRandom }">
              <b-icon-shuffle></b-icon-shuffle>
            </button>
            <button @click="loopMusic" :class="{ isActive: isLoop }" id="loop">
              <b-icon-arrow-repeat></b-icon-arrow-repeat>
            </button>
          </div>
        </div>
        <h5>Audio: {{ audioIndex }}</h5>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Maroon 5 - Memories",
      isRandom: false,
      index: 0,
      isLoop: false,
      isPlay: false,
      videos: [],
      videos2: [],
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    audioIndex() {
      return this.index + 1 + "/" + this.videos2.length;
    },
  },
  methods: {
    fetchTitle() {
      fetch(
        "https://noembed.com/embed?url=https://www.youtube.com/watch?v=" +
          this.videos2[this.index]
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.title.includes("(")) {
            data.title = data.title.replace(/ *\([^)]*\) */g, " ");
          }
          if (data.title.includes("[")) {
            data.title = data.title.replace(/\[.+?\]/g, " ");
          }
          this.title = data.title;
        });
    },
    playMyMusic() {
      this.isPlay = true;
      this.player.playVideo();
    },
    randomOperation() {
      let randomNumber = Math.floor(Math.random() * 100);
      this.index = randomNumber;
      this.fetchTitle();
      setTimeout(() => {
        this.playMyMusic();
      }, 1);
    },
    playerReady() {
      if (this.isRandom && this.isRandom === true) {
        this.randomOperation();
      } else if (this.isLoop && this.isLoop === true) {
        this.loopMusic();
      } else {
        this.randomOperation();
      }
    },
    loopMusic() {
      this.isLoop = !this.isLoop;
      if (this.isLoop === true) {
        this.isRandom = false;
        this.index = this.index + 0;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1000);
      } else {
        this.isLoop = true;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1000);
      }
    },
    pauseVideo() {
      this.player.pauseVideo();
      this.isPlay = false;
    },
    nextMusic() {
      if (this.index >= this.videos2.length - 1) {
        this.index = 0;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1000);
      } else if (this.isRandom === true) {
        this.randomOperation();
      } else {
        this.index = this.index + 1;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1000);
      }
    },
    previousMusic() {
      if (this.index <= 0) {
        this.index = this.videos2.length - 1;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1000);
      } else if (this.isRandom === true) {
        this.randomOperation();
      } else {
        this.index = this.index - 1;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1000);
      }
    },
    randomMusic() {
      this.isRandom = !this.isRandom;
      if (this.isRandom === true) {
        this.randomOperation();
      }
    },
  },
  created() {
    this.fetchTitle();
  },
  mounted() {
    fetch("https://vue-router-45613-default-rtdb.firebaseio.com/" + ".json")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.videos = response;
        this.fetchTitle();
        this.videos.forEach((element) => {
          this.videos2.push(element.slice(72));
        });
      });
  },
};
</script>
<style lang="scss">
#all {
  background-image: url("https://i.gifer.com/2A5.gif");
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
  @media screen and (max-width: 1000px) {
    background-position-x: -100px;
  }
  @media screen and (max-width: 800px) {
    background-position-x: -200px;
  }
  @media screen and (max-width: 650px) {
    background-position-x: -250px;
  }
  @media screen and (max-width: 400px) {
    background-position-x: -380px;
  }
  #container {
    position: absolute;
    bottom: 0;
    padding: 20px;
    #text-controllers {
      margin-left: 20px;
      margin-bottom: 8px;
      h4 {
        font-weight: bold;
        margin-bottom: 8px;
        font-size: 18px;
        text-shadow: 0.5px 0.5px 0.5px black;
      }
      h5 {
        margin-top: 6px;
        font-size: 16px;
        font-weight: bold;
      }
      #play,
      #pause {
        margin: 0px 8px;
      }
      svg {
        height: 40px;
        width: auto;
        padding-left: 5px;
        &:hover {
          color: rgb(8, 255, 234);
        }
      }
    }
  }
}
.iframe {
  // display: none !important;
}
.isActive {
  color: rgb(4, 226, 255);
}
@media screen and (max-width: 650px) {
  #container {
    padding: 3px;
  }
  #all #container #text-controllers {
    margin-left: 3px !important;
  }
}
</style>
