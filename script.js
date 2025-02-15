const uploadArea = document.getElementById("upload-area")
const imageInput = document.getElementById("imageInput")
const removeBackgroundButtont = document.getElementById("removeBackgroundBtn")
const resetBtn = document.getElementById("resetBtn")
const result = document.getElementById("result")
const container = document.getElementById("container")


let selectedFile = null;

uploadArea.addEventListener("click", () =>    imageInput.click())

uploadArea.addEventListener("drag", (e) => e.preventDefault());

uploadArea.addEventListener("drag", (e) =>{
    e.preventDefault();
    handdleFile(e.dataTransfer.files[0]);
});

imageInput.addEventListener("change", (e)=> handdleFile(e.target.files[0]));

function handdleFile(file){
    if(file && file.type.startsWith("image/")){
        selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => displayImage(reader.result);
        reader.readAsDataURL(file)

    }else{
        alert("Please upload a valid image file");
    }
}


function displayImage(imageSrc){
    result.innerHTML = `<img src="${imageSrc}" alt="Orginal Image"> `;
}

removeBackgroundButtont.addEventListener("click", () =>{
    if(selectedFile){
        removeBackground(selectedFile);

    }else{
        alert("Please upload an image. ");
    }
})

async function removeBackground(file){
    const apiKey = "4619Gv38tVxP4yxLav7tcDk6";


    const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", file);


  result.innerHTML = "<p>Removing Background....</p>"
    try{
        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": apiKey },
        body: formData,
        });
    
        if(!response.ok) throw new error("Field to remove background ");
        const blob = await response.blob ()
        const imageUrl = URL.createObjectURL(blob);
        
        result.innerHTML = `<img src="${imageUrl}" alt="Background Removed"> `;

        const downloadBtn = document.createElement("button");
        downloadBtn.innerText = "Download Png File";
        downloadBtn.classList.add("download-btn");
        downloadBtn.addEventListener("click", ()=>{
            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = "background_removed.png";
            link.click();
        });
        result.appendChild(downloadBtn);
    
    }catch(error){
        console.error(error)
        result.innerHTML = "<p>Error removing background. Please try again!</p>";
    }
}

resetBtn.addEventListener("click", () =>{
    selectedFile = null;
    result.innerHTML = "<p>no Image processed yet!</p>";
    imageInput.value = ""
})