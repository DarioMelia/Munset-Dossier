const playBtn = document.getElementById("play-random")

const dbf = new Audio("DBF.mp3")

playBtn.addEventListener("click", e =>{
    dbf.play()
})
