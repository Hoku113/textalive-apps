import { useState } from "react"


const Music = () => {

    // const [songs, setSongs] = useState([
    //     "https://youtu.be/IsxdBZ0wgq8",
    //     "https://youtu.be/BAP8IcxPBjk",
    //     "https://youtu.be/ZcWFcYediVA",
    //     "https://youtu.be/wIOUS73LahQ",
    //     "https://youtu.be/cDeu3qhZyHk",
    //     "https://youtu.be/iSIsPluigG4",
    // ])

    const showIndex = (index) => {
        // マウスカーソルが上に来たらレコードジャケットのイラストを少し変える

    }

    const getRecord = () => {
        console.log("Record function")

        // レコードのイラストをカーソルの上に表示させ、ついていくように設定する
    }

    const putRecord = () => {
        console.log("put Record")

        // 指定の位置においてあったら固定する。それ以外は元に戻す
    }

    return (
        <div className="music-list">
        </div>   
    )
}

export default Music