const inputElement = document.getElementById("file");
const fileElement = document.querySelector(".circle-content svg");
const tickElement = document.querySelector(".tick");
const uploadButton = document.getElementById("upload-button");
const divButton = document.getElementById("div-button");
const formElement = document.getElementById("upload-form");
const uploadForm = document.getElementById("form");

inputElement.addEventListener("change",(event)=>{

    inputElement.addEventListener("click",()=>{
        tickElement.style.setProperty("transform","scale(0)");
    })

    tickElement.style.setProperty("transform","scale(1)");
    divButton.style.setProperty("display","block");
    fileElement.style.setProperty("display","none");
});

divButton.addEventListener("click",()=>{
    // uploadForm.style.setProperty("filter","blur(30px)");
    formElement.style.setProperty("display","block");
});
