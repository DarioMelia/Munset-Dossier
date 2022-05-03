const body = document.querySelector("body")
const checkBox = document.querySelector("input[type='checkbox']")
const bgDiv = document.querySelector(".bg--color")



checkBox.addEventListener("click", e => {
    body.classList.toggle("color-bg")
})


const menuItems = document.querySelectorAll(".menu-item a")
menuItems.forEach(item => {
    item.addEventListener("mouseover", e => {
        changeBg(e.target.name)
    })
    // item.addEventListener("mouseleave", e =>{
    //     setCssVar("--bg-img","linear-gradient(to right, #b24592, #f15f79)")
    // })
})


function changeBg(name){
    switch(name){
        case "cuatro":
            setAndResetBg("linear-gradient(to right, #45ffd7, #5757f4)")
            break
        case "dos":
            setAndResetBg("linear-gradient(to right, #f5c842, #fa6746) ")
            break
        case "tres":
            setAndResetBg("linear-gradient(to right, #a946fa, #fd7aff) ")
            break
        case "uno":
            setAndResetBg("linear-gradient(to right, #38e05f, #38e0ca) ")
            break
        case "cinco":
            setAndResetBg("linear-gradient(to right, #C13584, #ff1783) ")
            break
        case "seis":
            setAndResetBg("linear-gradient(to right, #f5e662, #ade645) ")
            break
            
    }
}

function setCssVar(varName, value){
    document.documentElement.style.setProperty(varName,value)
}

function setAndResetBg(value){
    setCssVar("--bg-img", value)
    // bgDiv.classList.add("bg-fade-animation")
    //         setTimeout(()=>{
    //             setCssVar("--bg-img", value)
    //             setTimeout(()=>{
    //                 bgDiv.classList.remove("bg-fade-animation")
    //             },500)
    //         },500)
}

// document.documentElement.style.setProperty("--bg-img", )