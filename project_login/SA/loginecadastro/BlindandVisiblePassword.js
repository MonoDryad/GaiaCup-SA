let inputPassword = document.querySelector("#password")
let imgBlind = document.querySelector("#blind")
let imgVisible = document.querySelector("#visible")


const clickBlindVisible = function(){
if(imgBlind.style.display = 'none'){
inputPassword.setAttribute("type", "text")
} 
if(imgVisible.style.display = 'block'){
inputPassword.setAttribute("type", "text")
}
}
const clickVisibleBlind = function(){
if(imgVisible.style.display = 'block'){
inputPassword.setAttribute("type", "password")
}
if(imgBlind.style.display = 'block'){
inputPassword.setAttribute("type", "password")
}
}

let inputComfirmPassword = document.querySelector("#comfirmPassword")
let imgBlind1 = document.querySelector("#blind1")
let imgVisible1 = document.querySelector("#visible1")

const clickVisibleBlind2 = function (){
if(imgBlind1.style.display= 'none'){
inputComfirmPassword.setAttribute("type", "text")
}
if(imgVisible1.style.display= 'block'){
inputComfirmPassword.setAttribute("type", "text")
}
}
const clickVisibleBlind1 = function (){
if(imgVisible1.style.display= 'block'){
inputComfirmPassword.setAttribute("type", "password")
}
if(imgBlind1.style.display= 'block'){
inputComfirmPassword.setAttribute("type", "password")
}
}


