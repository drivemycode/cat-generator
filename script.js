const newCatButton = document.querySelector("#button");
const downloadButton = document.querySelector("#secondary-button");
const galleryToggle = document.querySelector("#tertiary-button");
const imageElement = document.querySelector("#cat-image");
const galleryElement = document.querySelector("#gallery");
const downloadNode = document.querySelector("#download");
let imageArr = [];
let galleryOn = false;
galleryElement.style.display = "none";

const fetchImage = async () => {
  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  const data = await response.json();
  const imageObj = data[0];
  return imageObj;
};

const storeImages = () => {
  imageArr.forEach((obj) => {
    localStorage.setItem(obj.id, obj.url);
  });
};

const updateGallery = (imageArr) => {
  galleryElement.innerHTML = "";
  imageArr = [...new Set(imageArr)];
  imageArr.forEach((obj) => {
    const html = `<img id=gallery-image src=${obj.url}>`;
    galleryElement.insertAdjacentHTML("afterbegin", html);
  });
};

newCatButton.addEventListener("click", async () => {
  try {
    const imageObj = await fetchImage();
    storeImages(imageObj);
    imageElement.innerHTML = "";
    const image = document.createElement("img");

    image.src = imageObj.url;
    image.id = imageObj.id;
    image.style.height = imageObj.height;
    image.style.width = imageObj.width;

    updateGallery(imageArr);

    imageArr.push(imageObj);
    imageElement.appendChild(image);
    console.log(galleryOn);
  } catch (e) {
    console.log(e);
  }
});

downloadButton.addEventListener("click", async () => {
  try {
    const image = imageElement.querySelector("img");
    downloadNode.href = image.src;
  } catch (e) {
    console.log(e);
  }
});

galleryToggle.addEventListener("click", async () => {
  try {
    galleryOn = !galleryOn;
    if (galleryOn) {
      galleryElement.style.display = "block";
    } else {
      galleryElement.style.display = "none";
    }
  } catch (e) {
    console.log(e);
  }
});
