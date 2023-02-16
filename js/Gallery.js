
// %%%%%%%%%%%% GALERIA %%%%%%%%%%%%
const sliders = document.querySelectorAll(".slider")
const galeria = document.getElementById("galeria")
const squares = galeria.querySelectorAll(".square")
const vidSquares = galeria.querySelectorAll(".square.video")

const iframeHTML = [`<iframe class="square" allow="autoplay" allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/6j1URc3EO4k"></iframe>`,
`<iframe class="square" allow="autoplay" allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/yRV1pow2TQk"></iframe>`,
`<iframe class="square" allow="autoplay" allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/AH3cARZh4OM"></iframe>`,
`<iframe class="square" allow="autoplay" allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/LstgEDrQnE4"></iframe>`]

// sliders[1].scrollLeft = sliders[1].scrollWidth //llevar el slider de fotos al final

galeria.addEventListener("click",e=>{
  if(!e.target.classList.contains("square")){
    let squaresArray = [...galeria.querySelectorAll(".square")]
    let bigSquare = squaresArray.filter(s=>s.classList.contains("big"))
    bigSquare[0]?bigSquare[0].classList.remove("big"):null
  }
})



sliders.forEach(slider => {
  const childrenCount = slider.children.length
  setScrollWheelEvent(slider)
  cloneAndApendChildren(slider,childrenCount,true)
  
 
  slider.addEventListener("scroll", e => {
    if (e.target.clientWidth + e.target.scrollLeft >= e.target.scrollWidth) {
      console.log("Llegaste al final")
      deleteFirstChildrenAddNew(e.target, childrenCount)
      e.target.scrollLeft = 0
    } else if (e.target.scrollLeft <= 0) {
    //   console.log("llegaste al principio")
    //   deleteLastChildrenAddNew(e.target,childrenCount)
    //   e.target.scrollLeft = e.target.scrollWidth
      
    }

  },{passive: true})
})

squares.forEach(i=>{
  if(i.classList.contains("video")){
    i.addEventListener("click",iframeLazyLoading)
  }else{
    i.addEventListener("click",squaresClickHandler)
  }
    
  })

  function cloneAndApendChildren(parent,count,atEnd){
    const children = parent.children
    const childrenClones = [...children].map(child=>child.cloneNode(true))
  
    childrenClones.forEach((ch,i)=>{
        if(i<count){
          if(ch.classList.contains("video")){
            ch.addEventListener("click",iframeLazyLoading)
          }else{
            ch.addEventListener("click",squaresClickHandler)
          }
            ch.addEventListener("click",squaresClickHandler)
            atEnd?parent.appendChild(ch):parent.insertBefore(ch,children[0])
            
          }
    })

    
  }

  function deleteFirstChildrenAddNew(parent, count){
    const children = [...parent.children]
    cloneAndApendChildren(parent,count,true)
    children.forEach((ch,i) => {
      if(i<count){
        ch.remove()
      }
    })
  }

  function deleteLastChildrenAddNew(parent,count){
    const children = [...parent.children]
    cloneAndApendChildren(parent,count,false)
    children.forEach((ch,i) => {
        if(i>=children.length - count){
          ch.remove()
        }
      })
  }

  


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
    },{passive: true})
  }

  function iframeLazyLoading(e){
    const i = parseInt(this.getAttribute("data-idx"))
    // this.removeEventListener("click",iframeLazyLoading,false)
    this.style = ""
    this.classList.remove("square")
    this.innerHTML = iframeHTML[i]
    console.log("aquí")
  }


  
  