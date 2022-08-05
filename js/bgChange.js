const body = document.querySelector("body")
const checkBox = document.querySelector("input[type='checkbox']")
const logo = checkBox.nextElementSibling
const bgDiv = document.querySelector(".bg--color")
// const title = document.querySelector(".title-name")



checkBox.addEventListener("click", e => {
  body.classList.add("color-bg")
  // title.classList.add("open")

  
  
})

const menuItems = document.querySelectorAll(".menu-item a")
menuItems.forEach(item => {
  item.addEventListener("mouseover", e => {
    // if(title.classList.contains("open"))title.classList.remove("open")
    changeBg(e.target.name)
  })
})

// %%%%%%%%%%%% MIEMBROS %%%%%%%%%%%%
const miembros = document.querySelectorAll(".miembro")

document.getElementById("miembros").addEventListener("click", e => {
  let isRemoved
  miembros.forEach(m => {
    if(m.classList.contains("full")){
      m.classList.remove("full")
      logo.classList.remove("low-opacity")
      checkBox.classList.remove("no-mouse")
      isRemoved = true
    }
  })

  if(e.target.parentElement.classList.contains("miembro")){
    let mbr = e.target.parentElement
    if(Array.from(miembros).filter(mi => mi.classList.contains("full")).length === 0){
      if(!isRemoved){
        mbr.classList.add("full")
        logo.classList.add("low-opacity")
        checkBox.classList.add("no-mouse")
      }
    }
  
  }

})


// %%%%%%%%%%%% INFO %%%%%%%%%%%%
const infoBtns = document.querySelectorAll(".info__btn")
const infoContents = document.querySelectorAll(".info__text__content")
infoBtns.forEach(btn => {
  btn.addEventListener("click",e=>{
     const content = e.target.parentElement.parentElement.parentElement.querySelector(".info__text__content")
     infoContents.forEach(i=>{
      if(i.classList.contains("open")) i.classList.remove("open")
     })
     content.classList.add("open")
     logo.classList.add("z-2") // remove en resetAnimations()
     checkBox.classList.add("z-2")
     
  })
})

infoContents.forEach(i=>{
  i.addEventListener("click", e =>{
    if(i.classList.contains("open")) {
      i.classList.remove("open")
      checkBox.classList.remove("z-2")
    }
  })
})



  


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
  // bgDiv.classList.add("bg-fade-animation")
  //         setTimeout(()=>{
  //             setCssVar("--bg-img", value)
  //             setTimeout(()=>{
  //                 bgDiv.classList.remove("bg-fade-animation")
  //             },500)
  //         },500)
}

let timer //Es el timeout para hacer desaparecer el menu

const sections = document.querySelectorAll(".section-overlay")
sections.forEach(s => {
  s.addEventListener("click", e => {
    if(timer) clearTimeout(timer)
    if(checkBox.checked) checkBox.checked = false
  })
})


function openOverlay(sectionName) {
if(timer) clearTimeout(timer)
  const section = document.getElementById(sectionName)
  section.classList.add("open")
  timer = setTimeout(() => {
      checkBox.checked ? checkBox.checked=false : null
  }, 1500);
}

function closeOpenOverlay() {
  const openOverlay = document.querySelector(".section-overlay.open")
  openOverlay ? openOverlay.classList.remove("open") : null
}



 // %%%%%%%% ANIMATIONS %%%%%%%%
function startMiembrosAnimation(){
  const miembros = document.querySelectorAll(".miembro")
  let delay = 0
  let floatDelay = 0
  miembros.forEach(mi => {
    let mImg = mi.querySelector("img")
    mi.style.animation = `miembroImageAnimation 1s ${delay}s ease-in-out forwards`
    mi.querySelector("img").style.animation = `float 5s ${floatDelay}s infinite`
    mImg.src = `./css/images/miembro-${mImg.getAttribute("data-name")}.jpeg`
    delay+= 0.3
    floatDelay+=1.2
  })
}

function startEscucharAnimation(){
  const btn = document.getElementById("play-random")
  const btnDiv = document.querySelector(".random-btn");
  const links = document.querySelectorAll(".escuchar__links__container")
  btn.style.animation = "miembroImageAnimation 650ms  cubic-bezier(.18,.42,.22,1.36) forwards"
  btnDiv.style.animation = "float 4s infinite"
  links.forEach(l =>{
    l.style.animation = "miembroImageAnimation 1s 300ms cubic-bezier(.18,.42,.22,1.36) forwards"
  })
}

function startRedesAnimation(){
  const links = document.querySelectorAll("#redes a")
  let delay = 0
  links.forEach(l => {
    l.style.animation = `miembroImageAnimation 650ms ${delay}s cubic-bezier(.18,.42,.22,1.36) forwards`
    delay += 0.25  
  })
}

function startInfoAnimation(){
  const btns = document.querySelectorAll(".info__btn")
  btns.forEach(btn => btn.style.animation ="miembroImageAnimation 800ms cubic-bezier(.18,.42,.22,1.36) forwards" )
}

function startGaleriaAnimation(){
  const sliders = document.querySelectorAll(".slider")
  const squares = document.querySelectorAll(".slider.fotos .square")
  sliders.forEach(s=>{
    
    s.style.animation = "miembroImageAnimation 1.2s cubic-bezier(.18,.42,.22,1.36) forwards"
  })
  
  squares.forEach(sq =>{
    sq.style.background=`url(${sq.getAttribute("data-src")})`   
  })
}

function resetAnimations(){
  // %% MIEMBROS %%
  const miembros = document.querySelectorAll(".miembro")
  miembros.forEach(mi => {
    mi.style.animation = ""
    mi.querySelector("img").style.animation = ""
    if(mi.classList.contains("full")) mi.classList.remove("full")
  })
  // %% ESCUCHAR %%
  document.getElementById("play-random").style.animation = ""
  document.querySelectorAll(".escuchar__links__container").forEach(i => i.style.animation = "")

  // %% REDES %%
  document.querySelectorAll("#redes a").forEach(i=>i.style.animation ="")

  // %% INFO %%
  document.querySelectorAll(".info__btn").forEach(btn => btn.style.animation ="" )
  if(logo.classList.contains("z-2")) {
    logo.classList.remove("z-2")
    checkBox.classList.remove("z-2")
  }

  // %% GALERIA %%
  sliders.forEach(s=>s.style.animation = "") 
  
}