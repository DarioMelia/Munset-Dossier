const playBtn = document.getElementById("play-random")

const dbf = new Audio("https://github.com/DarioMelia/Lissandra-Dossier/blob/main/js/songs/dbf.mp3?raw=true")
const lu = new Audio("https://github.com/DarioMelia/Lissandra-Dossier/blob/main/js/songs/lu.mp3?raw=true")
const audios = [dbf,lu]

let isPlaying = false

let prevAudio
playBtn.addEventListener("click", e =>{
    isPlaying=!isPlaying
    let audio = audios[Math.floor(Math.random()*2)]
    if(isPlaying){
        playBtn.classList.add("playing")
        audio.currentTime = 0
        audio.play()
        prevAudio = audio
    }else{
        playBtn.classList.remove("playing")
        prevAudio.pause()
    }

})
