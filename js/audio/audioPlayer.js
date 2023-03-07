const playBtn = document.getElementById("play-random")

const dbf = new Audio("https://soundcloud.com/munset/dead-bird-flying?si=17f2b30614984513aa59831324217bea&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing")
const lu = new Audio("https://soundcloud.com/munset?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing")
const audios = [dbf,lu]

let isPlaying = false

let prevAudio
// playBtn.addEventListener("click", e =>{
//     isPlaying=!isPlaying
//     let audioIdx = Math.floor(Math.random()*2)
//     let audio = audios[audioIdx]
//     if(audio === prevAudio){
//         audioIdx
//     }
//     if(isPlaying){
//         playBtn.classList.add("playing")
//         audio.currentTime = 0
//         audio.play()
//         prevAudio = audio
//     }else{
//         playBtn.classList.remove("playing")
//         prevAudio.pause()
//     }

//     audio.addEventListener("ended", e=>{
//         playBtn.classList.remove("playing")
//         isPlaying= false
//     })

// })
