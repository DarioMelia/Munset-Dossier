const body = document.querySelector("body")
const checkBox = document.querySelector("input[type='checkbox']")
const logo = checkBox.nextElementSibling
const bgDiv = document.querySelector(".bg--color")

window.addEventListener("popstate", historyHandler)
window.addEventListener("load", loadHandler)


function loadHandler(e) {
  //Remove loading screen
  const lsClasses = document.querySelector(".loading-screen").classList
  lsClasses.add("low-opacity")
  setTimeout(() => {
    lsClasses.add("display-none")
  }, 500)

  // Open menu
  setTimeout(()=>{
    if(!document.querySelector(".section-overlay.open"))checkBox.checked = "true"
  },4000)

  //tsParticles
  tsParticles
  .loadJSON("tsparticles", "./particles.json")
  .then(container => {
      console.log("callback - tsparticles config loaded")
  })
  .catch(error => {
      console.error(error)
  })
}

let backCounter = 0
let historyBackTimer 
function historyHandler(e) { 
 
  if (document.querySelector(".section-overlay.open") && allPopUpsClosed()) {
    checkBox.classList.toggle("toggler-away") 
    checkBox.checked = !checkBox.checked
    window.history.pushState(null,null,"?q=menu")
  }
  if(backCounter === 0){
    historyBackTimer = setTimeout(()=>{
      if(backCounter >= 3) {
        const exit = confirm("¿Desea salir de la página?")
        exit?
        window.location = "https://www.google.com/":null
      }
      backCounter = 0
    },1500)
  }
  backCounter += 1
  
  infoCloseHandler()
  miembrosCloseHandler()
}

function allPopUpsClosed(){
  const openMiembro = document.querySelector(".miembro.full")
  const openInfo = document.querySelector(".info__content.open")
  
  return !(openMiembro || openInfo)
}

checkBox.addEventListener("click", e => {
  
  //checkeamos por un opverlay abierto, para solo hacer esto a partir de entonces
  const openOverlay = document.querySelector(".section-overlay.open")
  if (openOverlay) {
    checkBox.classList.toggle("toggler-away") 
    window.history.pushState(null,null,"?q=menu")
    if(checkBox.checked){
      
    }
    
  }
})

const menuItems = document.querySelectorAll(".menu-item a")
menuItems.forEach(item => {
  item.addEventListener("click", e => {
    if (!document.querySelector(".section-overlay.open")) {
      body.classList.add("color-bg")
      bgDiv.classList.add("start")
      setTimeout(() => {
        document.getElementById("tsparticles").remove()
      }, 1000)
    }
    changeBg(e.target.name)
  })
})

// %%%%%%%%%%%% MIEMBROS %%%%%%%%%%%%
const miembros = document.querySelectorAll(".miembro")

document.getElementById("miembros").addEventListener("click", e => {
  let mbr = e.target.parentElement
  if (mbr.classList.contains("miembro")) {
    if (mbr.classList.contains("full")) {
      mbr.classList.remove("full")
    } else {
      mbr.classList.add("full")
      window.history.pushState({id:3},"miembro full view","?q=miembro")
    }
  }
  miembros.forEach(m => m === mbr ? null : m.classList.remove("full"))
})

function miembrosCloseHandler(){
  miembros.forEach(m=>m.classList.contains("full")?m.classList.remove("full"):null)
}

// %%%%%%%%%%%% INFO %%%%%%%%%%%%
const infoBtns = document.querySelectorAll(".info__btn")
const infoSections = document.querySelectorAll(".info__content")
const infoEvents = document.querySelector(".info__text--events .info__content")
const closeBtns = document.querySelectorAll(".info__content__close-btn")

infoBtns.forEach((btn, i) => {
  btn.addEventListener("click", e => {
    const content = e.target.parentElement.querySelector(".info__content")
    content.classList.add("open")

    if (i === 0) {
      window.history.pushState({ id: 1 }, "open about us", "?q=AboutUs")
    } else if (i === 1) {
      window.history.pushState({ id: 2 }, "open events", "?q=Events")
    }

  })
})

closeBtns.forEach(btn => btn.addEventListener("click", infoCloseHandler))

function infoCloseHandler(e) {
  infoSections.forEach(section => {
    if (section.classList.contains("open")) section.classList.remove("open") 
  })
  
}


// %%%%%%%%%%%%%%% BG CHANGE %%%%%%%%%%%%%%%%%
function changeBg(name) {
  closeOpenOverlay()
  resetAnimations()
  switch (name) {
    case "galeria":

      setAndResetBg("linear-gradient(to right, #5CE8E1, #5CE8E1)")
      openOverlay("galeria")
      startGaleriaAnimation()
      window.history.pushState(null,null,"?q=galeria")
      break
    case "miembros":

      setAndResetBg("linear-gradient(to right, #D4822E, #D4822E) ")
      openOverlay("miembros")
      startMiembrosAnimation()
      window.history.pushState(null,null,"?q=miembros")
      break
    case "info":

      setAndResetBg("linear-gradient(to right, #322134, #a946fa) ")
      openOverlay("info")
      startInfoAnimation()
      window.history.pushState(null,null,"?q=info")
      break
    case "escuchar":

      setAndResetBg("linear-gradient(to right, #38e05f, #38e0ca) ")
      openOverlay("escuchar")
      startEscucharAnimation()
      window.history.pushState(null,null,"?q=escuchar")
      break
    case "redes":

      setAndResetBg("linear-gradient(to right, #C13584, #ff1783) ")
      openOverlay("redes")
      startRedesAnimation()
      window.history.pushState(null,null,"?q=redes")
      break
    case "seis":

      setAndResetBg("linear-gradient(to right, #f5e662, #ade645) ")
      break
  }

}

function setCssVar(varName, value) {
  document.documentElement.style.setProperty(varName, value)
}

function setAndResetBg(value) {
  setCssVar("--bg-img", value)
}

let timer //Es el timeout para hacer desaparecer el menu

const sections = document.querySelectorAll(".section-overlay")
sections.forEach(s => {
  s.addEventListener("click", e => {
    if (timer) clearTimeout(timer)
    if (checkBox.checked) checkBox.checked = false
    checkBox.classList.add("toggler-away")
  })
})


function openOverlay(sectionName) {
  if (timer) clearTimeout(timer)
  const section = document.getElementById(sectionName)
  section.classList.add("open")
  timer = setTimeout(() => {
    checkBox.checked ? checkBox.checked = false : null
    checkBox.classList.add("toggler-away")
  }, 1500);
}

function closeOpenOverlay() {
  const openOverlay = document.querySelector(".section-overlay.open")
  openOverlay ? openOverlay.classList.remove("open") : null
  checkBox.classList.remove("toggler-away")
}


// %%%%%%%% ANIMATIONS %%%%%%%%
function startMiembrosAnimation() {
  const miembros = document.querySelectorAll(".miembro")
  let delay = 0
  let floatDelay = 0
  miembros.forEach(mi => {
    let mImg = mi.querySelector("img")
    mi.style.animation = `miembroImageAnimation 1s ${delay}s ease-in-out forwards`
    mi.querySelector("img").style.animation = `float 5s ${floatDelay}s infinite`
    mImg.src = `./css/images/miembro-${mImg.getAttribute("data-name")}.webp`
    delay += 0.3
    floatDelay += 1.2
  })
}

function startEscucharAnimation() {
  const spfIframeHtml = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/artist/4xTfBlNSKGj1WVOpPNURMe?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
  // const btn = document.getElementById("play-random")
  const btnDiv = document.querySelector(".spf-player");
  const links = document.querySelectorAll(".escuchar__links__container")
  // btn.style.animation = "miembroImageAnimation 650ms  cubic-bezier(.18,.42,.22,1.36) forwards"
  btnDiv.innerHTML = spfIframeHtml
  btnDiv.firstChild.style.animation = "float 4s infinite"
  links.forEach(l => {
    l.style.animation = "miembroImageAnimation 1s 300ms cubic-bezier(.18,.42,.22,1.36) forwards"
  })
}

function startRedesAnimation() {
  const links = document.querySelectorAll("#redes a")
  let delay = 0
  links.forEach(l => {
    l.style.animation = `miembroImageAnimation 650ms ${delay}s cubic-bezier(.18,.42,.22,1.36) forwards`
    delay += 0.25
  })
}

function startInfoAnimation() {
  const btns = document.querySelectorAll(".info__btn")
  btns.forEach(btn => btn.style.animation = "miembroImageAnimation 800ms cubic-bezier(.18,.42,.22,1.36) forwards")
}

function startGaleriaAnimation() {
  const sliders = document.querySelectorAll(".slider")
  const squares = document.querySelectorAll(".slider.fotos .square")
  const videos = document.querySelectorAll(".square.video")
  sliders.forEach(s => {

    s.style.animation = "miembroImageAnimation 1.2s cubic-bezier(.18,.42,.22,1.36) forwards"
  })

  squares.forEach(sq => {
    sq.style.background = `url(${sq.getAttribute("data-src")})`
  })
  let limit = 5
  videos.forEach((v,i)=>{
    if(i<=limit){
      v.style=`background-image: url("./css/images/thumbnail/real${i+1}.webp")`
    }else{
      v.style=`background-image: url("./css/images/thumbnail/real${i -limit}.webp")`
    }
    
  })
}

function resetAnimations() {
  // %% MIEMBROS %%
  const miembros = document.querySelectorAll(".miembro")
  miembros.forEach(mi => {
    mi.style.animation = ""
    mi.querySelector("img").style.animation = ""
    if (mi.classList.contains("full")) mi.classList.remove("full")
  })
  // %% ESCUCHAR %%
  // document.getElementById("play-random").style.animation = ""
  document.querySelectorAll(".escuchar__links__container").forEach(i => i.style.animation = "")

  // %% REDES %%
  document.querySelectorAll("#redes a").forEach(i => i.style.animation = "")

  // %% INFO %%
  document.querySelectorAll(".info__btn").forEach(btn => btn.style.animation = "")
  document.querySelectorAll(".info__content.open").forEach(div => div.classList.remove("open"))

  // %% GALERIA %%
  sliders.forEach(s => s.style.animation = "")

}