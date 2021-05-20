<template>
  <div id="all">
    <div id="music_menu" @click="backToMenu">Music Menu</div>
    <div id="container">
      <youtube
        :video-id="$store.state.videos2[index]"
        ref="youtube"
        @playing="playing"
        @ended="playerReady"
        class="iframe"
        allow="autoplay"
      ></youtube>
      <button @click="previousMusic">Previous</button>
      <button @click="playMyMusic" id="play">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button @click="pauseVideo" id="pause">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
          />
        </svg>
      </button>
      <button @click="nextMusic">
        Next
      </button>
      <button @click="randomMusic">{{ isRandomText }}</button>
      <button @click="loopMusic">{{ isLoopText }}</button>
      <h4>{{ title }}</h4>
      <h5>
        Audio {{ `${this.index + 1}/ ${this.$store.state.videos2.length}` }}
      </h5>
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
      randomText: "",
      isLoop: false,
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
    isRandomText() {
      if (this.isRandom === false) {
        return "Set Random Music";
      } else {
        return "Clear Random Music";
      }
    },
    isLoopText() {
      if (this.isLoop === false) {
        return "Start looping";
      } else {
        return "Stop looping";
      }
    },
  },
  methods: {
    backToMenu() {
      this.$router.push("/music");
    },
    fetchTitle() {
      fetch(
        "https://noembed.com/embed?url=https://www.youtube.com/watch?v=" +
          this.$store.state.videos2[this.index]
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
      this.player.playVideo();
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
    playerReady() {
      if (this.isRandom) {
        let randomNumber = Math.floor(Math.random() * 100);
        this.index = randomNumber;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1);
      } else if (this.isLoop) {
        this.index = this.index + 0;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1);
      } else {
        this.playMyMusic();
        this.index++;
        this.fetchTitle();
      }
    },
    pauseVideo() {
      this.player.pauseVideo();
    },
    playing() {
      this.player.playVideo();
    },
    nextMusic() {
      if (this.index >= this.$store.state.videos2.length - 1) {
        this.index = 0;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1);
      } else if (this.index === 101) {
        for (let i = 0; i < 10; i++) {
          console.log("FUCK YOU");
        }
      } else if (this.isRandom === true) {
        let randomNumber = Math.floor(Math.random() * 100);
        this.index = randomNumber;
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
        this.index = this.$store.state.videos2.length - 1;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1);
      } else if (this.isRandom === true) {
        let randomNumber = Math.floor(Math.random() * 100);
        this.index = randomNumber;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1);
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
      if (this.isRandom) {
        let randomNumber = Math.floor(Math.random() * 100);
        this.index = randomNumber;
        this.fetchTitle();
        setTimeout(() => {
          this.playMyMusic();
        }, 1);
      }
    },
  },
  created() {
    this.$store.state.videos2 = [];
    this.videos.forEach((element) => {
      this.$store.state.videos2.push(element.slice(72));
    });
  },
  mounted() {
    this.fetchTitle();
    this.player.playVideo();
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
  }
}
.iframe {
  display: none !important;
}
#music_menu {
  color: snow;
  cursor: pointer;
  padding: 16px 0px 0px 16px;
  &:hover {
    text-decoration: underline;
  }
}
button {
  border: 2px solid gray;
}
</style>
