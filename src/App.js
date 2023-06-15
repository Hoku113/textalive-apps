import "../src/css/app.css"

import "../src/script/player.js"

function App() {  
  return (
    <>
    <div id="overlay">
      <p><span className="far">&#xf254;</span>now loading...</p>
    </div>
    <div id="header">
      <div id="control" className="far">
        <a href="#" id="play" className="disabled">再生</a>
        <a href="#" id="stop" className="disabled">停止</a>
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

    </>
  );
}

export default App;
