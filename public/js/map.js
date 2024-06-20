
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
let maptoken = mapToken;
console.log(maptoken);
mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v9',
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 10   // starting zoom
});
 
// console.log(coordinates);

const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
    .setPopup (new mapboxgl.Popup({offset:25 })
    .setHTML(`<h4>${listing.location}</h4><p>Exact Location provided after booking!</p>`))
    .addTo(map);