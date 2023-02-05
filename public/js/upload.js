const inputElement = document.getElementById("file");
const fileElement = document.querySelector(".circle-content svg");
const tickElement = document.querySelector(".tick");
const uploadButton = document.getElementById("upload-button");
const divButton = document.getElementById("div-button");
const formElement = document.getElementById("upload-form");
const uploadForm = document.getElementById("form");
const loadElement = document.querySelector(".load");

inputElement.addEventListener("change",(event)=>{

    inputElement.addEventListener("click",()=>{
        loadElement.style.setProperty("display","block");
        tickElement.style.setProperty("transform","scale(0)");
        tickElement.style.setProperty("transition","transform 0s");
    })

    tickElement.style.setProperty("transform","scale(1)");
    tickElement.style.setProperty("transition","transform 1s ease");
    divButton.style.setProperty("display","block");
    fileElement.style.setProperty("display","none");
    loadElement.style.setProperty("display","none");
});

divButton.addEventListener("click",()=>{
    formElement.style.setProperty("height","90vh");
});