const imageContainer = document.getElementById('image-container');
const loader =  document.getElementById("loader");
let photosArray = [];
let ready = false;

let imagesLoaded = 0;
let totalImages = 0;
let count = 5;
let isInitialLoad = true;
let initialCount = 5;
// Access Key
const apiKey = "TJ50VRFiZWq2icJ2RM9GnMGgTonSi4gmlnh9-w4YtEA";
let apiUrl =  `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;



function imageLoaded() {

    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }


// Helper function to set Attributes on Dom Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create element for Links & photos Add to DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {

        // create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {href: photo.links.html, target: '_blank'});

        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description});

        // Event Listner, check when each is finished loading
        img.addEventListener('load', imageLoaded);



        // put <img> inside <a>, then put both inside image containerElement
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}



async function getFotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

        if (isInitialLoad) {
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
        }
        
    } catch(error) {

    }
}


// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        loader.hidden = false;
        getFotos();
    }
})


getFotos();


                

