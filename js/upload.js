const inputElement = document.getElementById("file");
const fileElement = document.querySelector(".circle-content svg");
const tickElement = document.querySelector(".tick");

inputElement.addEventListener("change",(event)=>{
    tickElement.style.setProperty("transform","scale(1)");
    fileElement.style.setProperty("display","none");
});
