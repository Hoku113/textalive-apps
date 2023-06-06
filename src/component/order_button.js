
// css
import "../css/button.css"

// start player
export const PlayButton = (player) => {
    console.log("Start player")
    player.video && player.requestPlay()
}

// Jump to first character
export const JumpButton = (player) => {
    console.log("Jump")
    player.video && player.requestMediaSeek(player.video.firstChar.startTime)
}

// pause video player
export const PauseButton = (player) => {
    console.log("Pause")
    player.video && player.requestPause()
}

// rewind video player
export const RewindButton = (player) => {
    console.log("ReWind")
    player.video && player.requestMediaSeek(0)
}


