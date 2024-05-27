const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let photosArray = []; //state

//Unsplash API
//We can create an App/a Project => get API-Key
//https://unsplash.com/documentation#get-a-random-photo

const count = 10;
const apiKey = "YYdJB44BbZdV-B8D1CoOyYjVzVgC-tWNSHX0BD8zTh0";

//Unsplash gives us information about the url to fetch content => can edit by using a template string
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper Function to set attributes on DOM elements
//=> to have dry code => which means that the codes does not repeat itself unnecessarily
function setAttributes(element, attributes) {
  //key is gonna be the href, src, alt, title
  //attributes is gonna be the obj which conaints both the key and the value we actually wanna set
  for (const key in attributes) {
    //element is gonna be item or img
    element.setAttribute(key, attributes[key]);
  }
}

function renderPhotos() {
  //photos is a self named el in the array => just like we do in the for in or for of loops
  photosArray.forEach((photo) => {
    //create link to unsplash
    const item = document.createElement("a");
    //Go to dev tools =>fetch request => show preview to see which attributes to add
    //in this case each obj has the nested property links which includes a html link (link back to the unsplash site)
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //create img for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //append the elements
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

//Get photos from the Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    renderPhotos();
  } catch (error) {
    //catch error here
  }
}

//On load
//Go to dev tools => network => ctrl + r => fetch request => show preview to see if the fetch is working
getPhotos();
