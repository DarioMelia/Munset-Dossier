
// %%%%%%%%%%%% GALERIA %%%%%%%%%%%%
const sliders = document.querySelectorAll(".slider")
const galeria = document.getElementById("galeria")
const squares = galeria.querySelectorAll(".square")

// sliders[1].scrollLeft = sliders[1].scrollWidth //llevar el slider de fotos al final

galeria.addEventListener("click",e=>{
  if(!e.target.classList.contains("square")){
    let squaresArray = [...galeria.querySelectorAll(".square")]
    let bigSquare = squaresArray.filter(s=>s.classList.contains("big"))
    bigSquare[0]?bigSquare[0].classList.remove("big"):null
  }
})
squares.forEach(i=>{
    i.addEventListener("click",squaresClickHandler)
  })


sliders.forEach(slider => {
  const childrenCount = slider.children.length
  setScrollWheelEvent(slider)
  cloneAndApendChildren(slider)

  slider.addEventListener("scroll", e => {
    if (e.target.clientWidth + e.target.scrollLeft >= e.target.scrollWidth) {
      console.log("Llegaste al final")
      deleteChildrensAtBegining(e.target, childrenCount)
      e.target.scrollLeft = 0
    } else if (e.target.scrollLeft <= 0) {
      console.log("llegaste al principio")
    }
  })
})







function squaresClickHandler(e){
    let isBig = false;
    if(e.target.classList.contains("big")) isBig = true
    let squaresArray = [...galeria.querySelectorAll(".square")]
    let bigSquare = squaresArray.filter(s=>s.classList.contains("big"))
    if(bigSquare){
    bigSquare.forEach(s=>{
      s.classList.remove("big")
    })}
    if(!isBig)e.target.classList.add("big")
  }

  function cloneAndApendChildren(parent){
    const children = parent.children
    const childrenClones = [...children].map(child=>child.cloneNode(true))
    childrenClones.forEach((ch,i)=>{
      ch.addEventListener("click",squaresClickHandler)
      parent.appendChild(ch)
    })
  }

  function deleteChildrensAtBegining(parent, count){
    const children = [...parent.children]
    const childrenClones = children.map(child=>child.cloneNode(true))
    childrenClones.forEach((ch,i)=>{
      
      if(i<count){
        ch.addEventListener("click",squaresClickHandler)
        parent.appendChild(ch)
      }
    })
    children.forEach((ch,i) => {
      if(i<count){
        ch.remove()
      }
    })
    console.log("Children after del: ", children)
  }


  function setScrollWheelEvent(slider){
    let timer
    slider.addEventListener("wheel", e => {
      slider.classList.add("no-scroll-snap")
      if (timer) clearTimeout(timer)
      if (e.deltaY > 0) slider.scrollLeft += 100
      else slider.scrollLeft -= 100
      timer = setTimeout(() => {
        slider.classList.remove("no-scroll-snap")
      }, 300)
    })
  }