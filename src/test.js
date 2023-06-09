import { Player } from "textalive-app-api";

const player = new Player({
    app: {
        token: "your token"
    }, 

    mediaElement: document.querySelector("#media"), 
    mediaBannerPosition: "bottom right"
})