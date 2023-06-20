import { useState } from "react"


const Music = () => {

    const [songs, setSongs] = useState([
        "https://youtu.be/IsxdBZ0wgq8",
        "https://youtu.be/BAP8IcxPBjk",
        "https://youtu.be/ZcWFcYediVA",
        "https://youtu.be/wIOUS73LahQ",
        "https://youtu.be/cDeu3qhZyHk",
        "https://youtu.be/iSIsPluigG4",
    ])

    const showIndex = (index) => {
        console.log(index.pageY)
    }

    return (
        <div className="music-list">
            {songs.map((song, index) => (
                <table>
                    <tbody>
                        <tr>
                            <td onMouseMove={(index) => showIndex(index)}>{song}</td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>   
    )
}

export default Music