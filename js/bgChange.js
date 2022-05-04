const body = document.querySelector("body")
const checkBox = document.querySelector("input[type='checkbox']")
const bgDiv = document.querySelector(".bg--color")

checkBox.addEventListener("click", e => {
  body.classList.add("color-bg")
})

const menuItems = document.querySelectorAll(".menu-item a")
menuItems.forEach(item => {
  item.addEventListener("mouseover", e => {
    changeBg(e.target.name)
  })
})

function changeBg(name) {
  switch (name) {
    case "galeria":
      setAndResetBg("linear-gradient(to right, #45ffd7, #5757f4)")

      break
    case "miembros":
      closeOpenOverlay()
      setAndResetBg("linear-gradient(to right, #f5c842, #fa6746) ")
      openOverlay("miembros")
      break
    case "info":
      closeOpenOverlay()
      setAndResetBg("linear-gradient(to right, #a946fa, #fd7aff) ")
      openOverlay("info")
      break
    case "escuchar":
      closeOpenOverlay()
      setAndResetBg("linear-gradient(to right, #38e05f, #38e0ca) ")
      openOverlay("escuchar")
      break
    case "redes":
      closeOpenOverlay()
      setAndResetBg("linear-gradient(to right, #C13584, #ff1783) ")
      openOverlay("redes")
      break
    case "seis":
      closeOpenOverlay()
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
let timer
function openOverlay(sectionName) {
if(timer) clearTimeout(timer)
  const section = document.getElementById(sectionName)
  section.classList.add("open")
  timer = setTimeout(() => {
      checkBox.checked ? checkBox.checked=false : null
  }, 3000);
}

function closeOpenOverlay() {
  const openOverlay = document.querySelector(".section-overlay.open")
  openOverlay ? openOverlay.classList.remove("open") : null
}
// document.documentElement.style.setProperty("--bg-img", )
