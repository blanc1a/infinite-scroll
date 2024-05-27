//Unsplash API
//We can create an App/a Project => get API-Key
//https://unsplash.com/documentation#get-a-random-photo

const count = 10;
const apiKey = "YYdJB44BbZdV-B8D1CoOyYjVzVgC-tWNSHX0BD8zTh0";

//Unsplash gives us information about the url to fetch content => can edit by using a template string
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get photos from the Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
  } catch (error) {
    //catch error here
  }
}

//On load
//Go to dev tools => network => ctrl + r => fetch request => show preview to see if the fetch is working
getPhotos();
