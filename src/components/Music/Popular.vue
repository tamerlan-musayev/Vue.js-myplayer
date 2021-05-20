<template>
  <div id="all">
    <div id="container">
      <youtube
        :video-id="$store.state.videos2[index]"
        ref="youtube"
        @ended="playerReady"
        class="iframe"
        allow="autoplay"
      ></youtube>
      <div id="text-controllers">
        <h4>{{ title }}</h4>
        <div id="controller">
          <button @click="previousMusic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-skip-backward-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z"
              />
            </svg>
          </button>
          <button @click="playMyMusic" id="play" v-if="!isPlay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-play-circle-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
              />
            </svg>
          </button>
          <button @click="pauseVideo" id="pause" v-if="isPlay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-stop-circle-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z"
              />
            </svg>
          </button>
          <button @click="nextMusic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-skip-forward-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5z"
              />
            </svg>
          </button>
          <div id="controller-2">
            <button @click="randomMusic" :class="{ isActive: isRandom }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-shuffle"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"
                />
                <path
                  d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"
                />
              </svg>
            </button>
            <button @click="loopMusic" :class="{ isActive: isLoop }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-arrow-repeat"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
                />
                <path
                  fill-rule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                />
              </svg>
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
      return this.index + 1 + "/" + this.$store.state.videos2.length;
    },
  },
  methods: {
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
        this.randomOperation();
      } else if (this.isLoop === true) {
        this.loopMusic();
      } else {
        this.randomOperation();
      }
    },
    pauseVideo() {
      this.player.pauseVideo();
      this.isPlay = false;
    },
    nextMusic() {
      if (this.index >= this.$store.state.videos2.length - 1) {
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
        this.index = this.$store.state.videos2.length - 1;
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
    this.$store.state.videos2 = [];
    this.videos.forEach((element) => {
      this.$store.state.videos2.push(element.slice(72));
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
