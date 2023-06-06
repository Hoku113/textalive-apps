import { Player } from 'textalive-app-api';

import {PlayButton, JumpButton, PauseButton, RewindButton} from './component/order_button';
import AddPhrase from './component/phrase';

import "./index.css"

function App() {

  const positionEl = document.querySelector("#position strong");
  const artistSpan = document.querySelector("#artist span");
  const songSpan = document.querySelector("#song span");

  const div = document.createElement("div");

  const animateWord = (now, unit) => {
    if (unit.contains(now)) {
      document.querySelector("#text").textContent = unit.text;
      const content = document.createTextNode(unit.text)
      document.querySelector(".phrase").textContent = content.textContent
      
    }
  };
  
  // Instantiate a TextAlive Player instance
  const player = new Player({
    app: {
      token: "zTmodBTGeXC5AZgO",
    },
    mediaElement: document.querySelector("#media"),
  });
  
  // Register event listeners
  player.addListener({
    onAppReady,
    onVideoReady,
    onTimerReady,
    onThrottledTimeUpdate,
    onPlay,
    onPause,
    onStop,
  });

  /**
   * 
   *
   * @param {IPlayerApp} app - https://developer.textalive.jp/packages/textalive-app-api/interfaces/iplayerapp.html
   */


  function onAppReady(app) {
  
    // Show control if this app is launched standalone (not connected to a TextAlive host)
    if (!app.managed) {
      document.querySelector("#control").style.display = "block";
    }
  
    // Load a song when a song URL is not specified
    if (!app.songUrl) {
      player.createFromSongUrl("https://piapro.jp/t/FDb1/20210213190029", {
        video: {
          // 音楽地図訂正履歴: https://songle.jp/songs/2121525/history
          beatId: 3953882,
          repetitiveSegmentId: 2099561,
          // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FFDb1%2F20210213190029
          lyricId: 52065,
          lyricDiffId: 5093,
        },
      });
    }
  }
  
  /**
   * 
   *
   * @param {IVideo} v - https://developer.textalive.jp/packages/textalive-app-api/interfaces/ivideo.html
   */

  function onVideoReady(v) {
    // Show meta data
    artistSpan.textContent = player.data.song.artist.name;
    songSpan.textContent = player.data.song.name;

    
  
    // Set "animate" function
    let beats = player.getBeats()
    let w = player.video.firstPhrase;

    while (w) {
      w.animate = animateWord;
      w = w.next;

     
    }
  }
  
  /**
   * 
   *
   * @param {Timer} t - https://developer.textalive.jp/packages/textalive-app-api/interfaces/timer.html
   */
  function onTimerReady(t) {

    // Enable buttons
    if (!player.app.managed) {
      document
        .querySelectorAll("button")
        .forEach((btn) => (btn.disabled = false));
    }
  }
  
  /**
   * 
   *
   * @param {number} position - https://developer.textalive.jp/packages/textalive-app-api/interfaces/playereventlistener.html#onthrottledtimeupdate
   */


  function onThrottledTimeUpdate(position) {
    // Update current position
    positionEl.textContent = String(Math.floor(position));
  
    // More precise timing information can be retrieved by `player.timer.position` at any time
  }
  
  // Hide #overlay when music playback started
  function onPlay() {
    
  }
  
  // Reset lyrics text field when music playback is paused or stopped
  function onPause() {
    document.querySelector("#text").textContent = "-";
  }
  function onStop() {
    document.querySelector("#text").textContent = "-";
  }

  return (
    <>
    {/* <div id="overlay"><button class="play" disabled>再生</button></div> */}
    <div id="container">
      <div>
        <p id="lyrics">
          <span id="text"></span> {/* ここでフレーズを適宜変更している */}
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
