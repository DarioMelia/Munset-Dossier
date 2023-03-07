const body = document.querySelector("body")
const checkBox = document.querySelector("input[type='checkbox']")
const logo = checkBox.nextElementSibling
const bgDiv = document.querySelector(".bg--color")

window.addEventListener("popstate", historyHandler)
window.addEventListener("load", removeLoadingScreen)



tsParticles
    .loadJSON("tsparticles", "./js/particles.json")
    .then(container => {
        console.log("callback - tsparticles config loaded");
    })
    .catch(error => {
        console.error(error);
    });


function removeLoadingScreen(e) {
  const lsClasses = document.querySelector(".loading-screen").classList
  lsClasses.add("low-opacity")
  setTimeout(() => {
    lsClasses.add("display-none")
  }, 500)
  setTimeout(()=>{
    if(!document.querySelector(".section-overlay.open"))checkBox.checked = "true"
    
  },1000)
}

function historyHandler(e) { 
  infoCloseHandler()
  miembrosCloseHandler()
  if (openOverlay) {
    checkBox.classList.toggle("toggler-away") 
    checkBox.checked = !checkBox.checked
    window.history.pushState(null,null,"?q=menu")
  }
  
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
    const content = e.target.parentElement.parentElement.parentElement.querySelector(".info__content")
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

      setAndResetBg("linear-gradient(to right, #45ffd7, #5757f4)")
      openOverlay("galeria")
      startGaleriaAnimation()
      
      break
    case "miembros":

      setAndResetBg("linear-gradient(to right, #f5c842, #fa6746) ")
      openOverlay("miembros")
      startMiembrosAnimation()
      
      break
    case "info":

      setAndResetBg("linear-gradient(to right, #a946fa, #fd7aff) ")
      openOverlay("info")
      startInfoAnimation()
    
      break
    case "escuchar":

      setAndResetBg("linear-gradient(to right, #38e05f, #38e0ca) ")
      openOverlay("escuchar")
      startEscucharAnimation()

      break
    case "redes":

      setAndResetBg("linear-gradient(to right, #C13584, #ff1783) ")
      openOverlay("redes")
      startRedesAnimation()
     
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
  // const btn = document.getElementById("play-random")
  const btnDiv = document.querySelector(".random-btn");
  const links = document.querySelectorAll(".escuchar__links__container")
  // btn.style.animation = "miembroImageAnimation 650ms  cubic-bezier(.18,.42,.22,1.36) forwards"
  btnDiv.style.animation = "float 4s infinite"
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
  sliders.forEach(s => {

    s.style.animation = "miembroImageAnimation 1.2s cubic-bezier(.18,.42,.22,1.36) forwards"
  })

  squares.forEach(sq => {
    sq.style.background = `url(${sq.getAttribute("data-src")})`
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