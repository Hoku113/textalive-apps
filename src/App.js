import { Player } from 'textalive-app-api';

import {PlayButton, JumpButton, PauseButton, RewindButton} from './component/order_button';
import AddPhrase from './component/phrase';

import "./index.css"

function App() {  
  // Instantiate a TextAlive Player instance
  const player = new Player({
    app: {
      token: "zTmodBTGeXC5AZgO",
      parameters: [
        {title: "Gradation start color", name: "gradationStartcolor", className: "Color", initialValue: "#63d0e2"},
        {title: "Gradation end color", name: "gradationEndColor", className: "color", initialValue: "#ff9438"}
      ]
    },
    mediaElement: document.querySelector("#media"),
    mediaBannerPosition: "bottom right",
  });

  const overlay = document.querySelector("#overlay");
  const bar = document.querySelector("#bar");
  const textContainer = document.querySelector("#text")
  const seekbar = document.querySelector("#seekbar")
  const paintedSeekbar = seekbar.querySelector("div")
  let b, c;


  console.log(paintedSeekbar)
  
  // Register event listeners
  player.addListener({
    onAppReady,
    onAppParameterUpdate,
    onAppMediaChange,
    onVideoReady,
    onTimerReady,
    onTimeUpdate,
    onPlay,
    onPause,
  });

/**
 * 
 *
 * @param {IPlayerApp} app - https://developer.textalive.jp/packages/textalive-app-api/interfaces/iplayerapp.html
 */
const onAppReady = (app) => {
    if (app.managed) {
        document.querySelector("#control").className = "disabled";
    }
    if (!app.songUrl) {
        document.querySelector("#media").className = "disabled";
        
        // default song
        player.createFronSongUrl("https://piapro.jp/t/FDb1/20210213190029", {
            video:{
                beatId: 3953882,
                repetitiveSegmentId: 2099561,
                lyricId: 52065,
                lyricDiffId: 5093,
            },
        });
    }
}

const onAppParameterUpdate = () => {
  const params = player.app.options.parameters;
  const sc = player.app.parameters.gradationStartColor, scString = sc ? `rgb(${sc.r}, ${sc.g}, ${sc.b})` : params[0].initialValue;
  const ec = player.app.parameters.gradationEndColor, ecString = ec ? `rgb(${ec.r}, ${ec.g}, ${ec.b})` : params[1].initialValue;
  document.body.style.backgroundColor = ecString;
  document.body.style.backgroundImage = `linear-gradient(0deg, ${ecString} 0%, ${scString} 100%)`;
}


const onAppMediaChange = () => {
  overlay.className = "";
  bar.className = "";
  resetChars();
}


const onVideoReady = (video) => {
  document.querySelector("#artist span").textContent = player.data.song.artist.name;
  document.querySelector("#song span").textContent = player.data.song.name;

  c = null
}

const onTimerReady = () => {
  overlay.className = "disabled";
  document.querySelector("#control > a#play").className = "";
  document.querySelector("#control > a#stop").className = "";
}

const onTimeUpdate = (position) => {
  paintedSeekbar.style.width = `${
    parseInt((position * 1000) / player.video.duration) / 10
  } %`

  let beat = player.findBeat(position);
  if (b !== beat) {
    if(beat) {
      requestAnimationFrame(() => {
        bar.className = "active";
        requestAnimationFrame(() => {
          bar.className = "active beat"
        })
      })
    }
    b = beat;
  }


  if (!player.video.firstChar) {
    return;
  }

  if (c && c.startTime > position + 1000) {
    resetChars();
  }

  let current = c || player.video.firstChar;
  while (current && current.startTime < position + 500){
    if (c !== current) {
      newChar(current);
      c = current
    }
    current = current.next;
  }
}

const onPlay = () => {
  const a = document.querySelector("#control > a#play");
  while (a.firstChild) a.removeChild(a.firstChild);
  a.appendChild(document.createTextNode("\uf28b"))
}

const onPause = () => {
  const a = document.querySelector("#control > a#play");
  while (a.firstChild) a.removeChild(a.firstChild);
  a.appendChild(document.createTextNode("\uf144"))
}

// start, stop button

document.querySelector("#control > a#play").addEventListener("click", (e) => {
  e.preventDefault();
  if (player) {
    if(player.isPlaying) {
      player.requestPause();
    } else {
      player.requestPlay()
    }
  }
  return false;
})

// stop button
document.querySelector("#control > a#stop").addEventListener("click", (e) => {
  e.preventDefault();
  if (player) {
    player.requestStop();

    bar.className = "";
    resetChars();
  }
  return false;
})


// seek bar
seekbar.addEventListener("click", (e) => {
  e.preventDefault();

  if (player) {
    player.requestMediaSeek(
      (player.video.duration * e.offsetX) / seekbar.clientWidth
    );
  }
  return false;
})


const newChar = (current) => {
  const classes = [];

  if (
    current.parent.pos === "N" ||
    current.parent.pos === "PN" ||
    current.parent.pos === "X"
  ){
    classes.push("noun")
  }


  if (current.parent.parent.lastChar === current) {
    classes.push("lastChar");
  }

  if(current.parent.language === "en") {
    if (current.parent.lastChar === current) {
      classes.push("lastCharInEnglishWord");
    } else if (current.parent.firstChar === current) {
      classes.push("firstCharInEnglishWord")
    }
  }

  const div = document.createElement("div");
  div.appendChild(document.createTextNode(current.text));

  const container = document.createElement("div");
  container.className = classes.join(" ");
  container.addEventListener("click", () => {
    player.requestMediaSeek(current.startTime);
  })
  textContainer.appendChild(container)
}

// reset characters

const resetChars = () => {
  c = null;
  while (textContainer.firstChild)
    textContainer.removeChild(textContainer.firstChild)
}

  return (
    <>
      <div id="overlay">
        <p><span class="far">&#xf254;</span>now loading</p>
      </div>

      <div id="header">
        <div id="control" class="far">
          <a href="#" id="play" class="disabled">&#xf144;</a>
          <a href="#" id="stop" class="disabled">&#xf28d;</a>
        </div>

        <div id="meta">
          <div id="artist">artist: <span>-</span></div>
          <div id="song">song: <span>-</span></div>
        </div>
      </div>

      <div id="media"></div>

      <div id="lyrics">
        <div id="text"></div>

        <div id="bar"></div>
      </div>

      <div id="seekbar">
        <div></div>
      </div>


      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/textalive-app-api/dist/index.js"></script>

    </>
  );
}

export default App;
