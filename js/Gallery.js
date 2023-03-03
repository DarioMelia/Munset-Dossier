
// %%%%%%%%%%%% GALERIA %%%%%%%%%%%%
const sliders = document.querySelectorAll(".slider")
const galeria = document.getElementById("galeria")
const squares = galeria.querySelectorAll(".square")
const vidSquares = galeria.querySelectorAll(".square.video")

const iframeHTML = [
  `<iframe class="square" allow="autoplay" allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/z2tiQCYf9rg?autoplay=1"></iframe>`,
  `<iframe class="square" allow="autoplay" allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/OcNpLw3WmcE?autoplay=1"></iframe>`,
  `<iframe class="square" allow="autoplay" allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/6j1URc3EO4k?autoplay=1"></iframe>`,
  `<iframe class="square" allow="autoplay" allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/yRV1pow2TQk?autoplay=1"></iframe>`,
  `<iframe class="square" allow="autoplay" allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/AH3cARZh4OM?autoplay=1"></iframe>`,
  `<iframe class="square" allow="autoplay" allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/LstgEDrQnE4?autoplay=1"></iframe>`]

vidSquares.forEach((vid,i)=>vid.dataset.iframe = iframeHTML[i])
// sliders[1].scrollLeft = sliders[1].scrollWidth //llevar el slider de fotos al final

galeria.addEventListener("click", e => {
  if (!e.target.classList.contains("square")) {
    let squaresArray = [...galeria.querySelectorAll(".square")]
    let bigSquare = squaresArray.filter(s => s.classList.contains("big"))
    bigSquare[0] ? bigSquare[0].classList.remove("big") : null
  }
})



sliders.forEach(slider => {
  const childrenCount = slider.children.length
  setScrollWheelEvent(slider)
  cloneAndApendChildren(slider, childrenCount, true)


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

  }, { passive: true })
})

squares.forEach(i => {
  if (i.classList.contains("video")) {
    i.addEventListener("click", iframeLazyLoading)
  } else {
    i.addEventListener("click", squaresClickHandler)
  }

})

function cloneAndApendChildren(parent, count, atEnd) {
  const children = parent.children
  const childrenClones = [...children].map(child => child.cloneNode(true))

  childrenClones.forEach((ch, i) => {
    if (i < count) {
      if (ch.classList.contains("video")) {
        ch.addEventListener("click", iframeLazyLoading)
      } else {
        ch.addEventListener("click", squaresClickHandler)
      }
      ch.addEventListener("click", squaresClickHandler)
      atEnd ? parent.appendChild(ch) : parent.insertBefore(ch, children[0])

    }
  })


}

function deleteFirstChildrenAddNew(parent, count) {
  const children = [...parent.children]
  cloneAndApendChildren(parent, count, true)
  children.forEach((ch, i) => {
    if (i < count) {
      ch.remove()
    }
  })
}

function deleteLastChildrenAddNew(parent, count) {
  const children = [...parent.children]
  cloneAndApendChildren(parent, count, false)
  children.forEach((ch, i) => {
    if (i >= children.length - count) {
      ch.remove()
    }
  })
}




function squaresClickHandler(e) {
  if (!e.target.classList.contains("video")) {
    let squaresArray = [...galeria.querySelectorAll("div.square")]
    squaresArray.forEach(s=>{
      if(s !== e.target)s.classList.contains("big")?s.classList.remove("big"):null
    })
     e.target.classList.toggle("big")
    
  }
}

function setScrollWheelEvent(slider) {
  let timer
  slider.addEventListener("wheel", e => {
    slider.classList.add("no-scroll-snap")
    if (timer) clearTimeout(timer)
    if (e.deltaY > 0) slider.scrollLeft += 100
    else slider.scrollLeft -= 100
    timer = setTimeout(() => {
      slider.classList.remove("no-scroll-snap")
    }, 300)
  }, { passive: true })
}

function iframeLazyLoading(e) {
  const i = this.dataset.idx
  const prevState = this.cloneNode(true)
  this.removeEventListener("click", iframeLazyLoading, false)
  this.style = ""
  this.innerHTML = this.dataset.iframe
  this.addEventListener("mouseleave", e => mouseLeaveHandler(e, prevState, i))
 
}

function mouseLeaveHandler(e, prev, i) {
  setTimeout(() => {
    e.target.parentNode.replaceChild(prev, e.target)
    
    const newNodes = document.querySelectorAll(`.square[data-idx="${i}"]`)
    newNodes.forEach(node=>node.addEventListener("click", iframeLazyLoading))
  }, 200)




}





