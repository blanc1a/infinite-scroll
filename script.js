const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let ready = false; //when page first loads, we want it to be false
let imagesLoaded = 0; //number ticking up to 30
let totalImages = 0; //keep track of the total imgs => so we know when it's done
let photosArray = []; //state

//Unsplash API
//We can create an App/a Project => get API-Key
//https://unsplash.com/documentation#get-a-random-photo

const count = 30;
const apiKey = "YYdJB44BbZdV-B8D1CoOyYjVzVgC-tWNSHX0BD8zTh0";

//Unsplash gives us information about the url to fetch content => can edit by using a template string
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded() {
  imagesLoaded++; //imagesLoaded value gets incremented with every pic that's loaded
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    //totalImages is gonna be set in the renderPhotos()
    //means page is ready and everything has finished loading
    ready = true;
    console.log("ready = ", ready);
  }
}

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
  imagesLoaded = 0; //has to be set as 0 each time bc otherwise the if statement in the imageLoaded() would not function properly => imagesLoaded would be more than 30 and ready would not be true anymore => we cannot load more photos
  totalImages = photosArray.length; //totalImages value is gonna be set by the length of the array
  console.log("total images = ", totalImages);
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
    //eventListener, check when each img is finished loading
    img.addEventListener("load", imageLoaded);
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

//Check to see if scrolling near bottom of page, load more photos
//add the eventListener to the window => is the parent of document, and grand-parent of our body => we're going to the heighest possible level
window.addEventListener("scroll", () => {
  //shows how often we trigger this event - BUT we only want it to get triggered once we reach the bottom of the page
  //console.log("scrolled");

  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
  //window.innerHeight => total height of the browser window => value stays constant unless the browser window is resized (px)
  //window.scrollY => distance of the top of the page the user has scrolled => number will keep going up (px)
  //we have to sum up those 2 values and compare it to something => document.body.offsetHeight
  //document.body.offsetHeight => height of everything in the body, includingwhat is not within view (combined height of all our imgs)
  //- 1000px => we need to substract from offsetHeight to trigger the event before the bottom is reached => in our case 1000 bc most window.innerHeights are less than 1000px
  //&& ready needs to be true
});

//On load
//Go to dev tools => network => ctrl + r => fetch request => show preview to see if the fetch is working
getPhotos();
