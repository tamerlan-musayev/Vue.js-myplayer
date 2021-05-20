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
            <button @click="loopMusic" :class="{ isActive: isLoop }">
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
      title: "",
      isRandom: false,
      index: 0,
      isLoop: false,
      isPlay: false,
      videos: [
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=SlPhMPnQ58k",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=tQ0yjYUFKAE",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=k2qgadSvNyU",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=TdyllLZeviY",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=aZla1ttZHaw",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=izIyhdEHSPo",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=ZMmwDy-27AM",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=_I_D_8Z4sJE",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=Els_GCWuJVk",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=OQitfe8u7i4",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=ExJmET8boVw",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=TyHvyGVs42U",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=DGzy8FE1Rhk",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=tjA7nAHOAww",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=voG07pt-KYI",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=M4ZoCHID9GI",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=oWw1BcFhk-k",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=J75enyWdbBM",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=KXanlLjOFh0",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=36tggrpRoTI",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=zxtl5ExJmag",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=JudqK1hL18w",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=Mgfe5tIwOj0",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=W5kM5wAwRug",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=De4FqIkvHX0",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=T2sO8gK2IKk",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=jzD_yyEcp0M",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=Dh-ULbQmmF8",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=tCXGJQYZ9JA",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=Lj6Y6JCu-l4",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=bhxhNIQBKJI",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=M-P4QBt-FWw",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=ffxKSjUwKdU",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=EQnk-h-LCpQ",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=kcRWyLMVrFM",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=F1B9Fk_SgI0",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=3SHJ5OywydA",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=TNa_RmRby8s",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=xTlNMmZKwpA",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=seh_fZJqB94",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=-qnyd7Ht9uc",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=ZisN7CcIatw",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=k73EBmeJ950",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=EKF6ghfcQic",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=UYwF-jdcVjY",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=kxloC1MKTpg",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=84yTsE4eNYQ",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=RnH1288zn-g",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=6-v1b9waHWY",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=DylzGXE_ibU",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=5vheNbQlsyU",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=sJXZ9Dok7u8",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=77RmU8QcM4k",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=nuckTcoZG4Q",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=XeKoCLVXKNo",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=kHLHSlExFis",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=bIv16itYi_0",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=-MZ8guTxcFU",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=Q4-jOuHO-z4",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=VY1eFxgRR-k",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=n_1XpKHWMU0",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=btrzs54s1Rc",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=XCQK6LmhYqc",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=kN0iD0pI3o0",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=hlznpxNGFGQ",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=x3bfa3DZ8JM",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=uF9YayOgjRg",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=kkLk2XWMBf8",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=Il-an3K9pjg",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=56WBK4ZK_cw",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=kg1BljLu9YY",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=DkeiKbqa02g",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=47EbYNhjrJc",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=gl1aHhXnN1k",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=pRfmrE0ToTo",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=JcV0SvIDjAA",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=ixkoVwKQaJg",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=ir6nk2zrMG0",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=fSOpiZo1BAA",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=m7Bc3pLyij0",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=8JnfIa84TnU",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=5hqK-A0UxKw",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=av5JD1dfj_c",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=LdH7aFjDzjI",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=Ao3XJ-UDdzI",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=BQogzYUoQWU",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=kO8fTk6oKQg",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=TIjK17v9vj4",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=bPYefBD1Rzs",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=LH4Y1ZUUx2g",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=hE2Ira-Cwxo",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=ft4jcPSLJfY",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=0H6vdQSXaR4",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=3y-O-4IL-PU",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=A8N4_cjLXH8",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=A9hcJgtnm6Q",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=WXBHCQYxwr0",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=SJOgTMP8cs4",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=DGzy8FE1Rhk",
        "https://www.youtube.com/watch?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10&v=M4ZoCHID9GI",
      ],
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
      if (this.isRandom) {
        this.randomOperation();
      } else if (this.isLoop === true) {
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
        }, 1);
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
        }, 1);
      } else if (this.isRandom === true) {
        this.randomOperation();
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
        this.index = this.videos2.length - 1;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1);
      } else if (this.isRandom === true) {
        this.randomOperation();
      } else {
        this.index = this.index - 1;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1);
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
    this.videos2 = [];
    this.videos.forEach((element) => {
      this.videos2.push(element.slice(72));
    });
  },
  mounted() {
    this.fetchTitle();
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
  display: none !important;
}
.isActive {
  color: rgb(4, 226, 255);
}
</style>
