const playBtn = document.getElementById("play-random")

const dbf = new Audio("https://github.com/DarioMelia/Munset-Dossier/blob/main/js/audio/dbf.mp3?raw=true")
const lu = new Audio("https://github.com/DarioMelia/Munset-Dossier/blob/main/js/audio/LU.mp3?raw=true")
const audios = [dbf,lu]

let isPlaying = false

let prevAudio
playBtn.addEventListener("click", e =>{
    isPlaying=!isPlaying
    let audioIdx = Math.floor(Math.random()*2)
    let audio = audios[audioIdx]
    if(audio === prevAudio){
        audioIdx
    }
    if(isPlaying){
        playBtn.classList.add("playing")
        audio.currentTime = 0
        audio.play()
        prevAudio = audio
    }else{
        playBtn.classList.remove("playing")
        prevAudio.pause()
    }

    audio.addEventListener("ended", e=>{
        playBtn.classList.remove("playing")
        isPlaying= false
    })

})
