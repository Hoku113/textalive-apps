import { Player } from 'textalive-app-api';

import {PlayButton, JumpButton, PauseButton, RewindButton} from './component/order_button';
import AddPhrase from './component/phrase';

import "./index.css"

function App() {
  const animateWord = (now, unit) => {
    if (unit.contains(now)) {
      document.querySelector(".text").textContent = unit.text;
      const content = document.createTextNode(unit.text)
      // document.querySelector(".phrase").textContent = content.textContent
      
    }
  };
  
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
  
  // Register event listeners
  player.addListener({
    onAppReady,
    onAppParameterUpdate,
    onAppMediaChange,
    onVideoReady,
    onTimerReady,
    onThrottledTimeUpdate,
    // onPlay,
    onPause,
    onStop,
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


  return (
    <>
    {/* <div id="overlay"><button class="play" disabled>再生</button></div> */}
    <div id="container">
      <div>
        <p id="lyrics">
          <span class="text"></span> {/* ここでフレーズを適宜変更している */}
        </p>

          <p class="phrase"></p>

      </div>
    </div>
    <div id="media"></div>
    <div id="header">
      <div id="meta">
        <div id="artist"><strong>artist:</strong> <span>-</span></div>
        <div id="song"><strong>song:</strong> <span>-</span></div>
      </div>
    </div>
    <div id="footer">
      <p>
        <span id="position"><strong>-</strong> [ms]</span>
      </p>
      <div id="control">
        <button class="play" onClick={() => PlayButton(player )}>再生</button>
        <button class="jump" onClick={() => JumpButton(player)}>歌詞頭出し</button>
        <button class="pause" onClick={() => PauseButton(player)}>一時停止</button>
        <button class="rewind" onClick={() => RewindButton(player)}>巻き戻し</button>
      </div>
    </div>
    </>
  );
}

export default App;
