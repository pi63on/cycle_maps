// async function getData() {
// 	return new Promise((resolve, reject) => {
// 		Papa.parse('data.csv', {
// 			header:true,
// 			complete:(results) => {				
// 				resolve(results.data);
// 			}
// 		});
// 	});
// }

// let data = await getData();


// initialize map
let map = L.map('map', {
    center: [48.14364, 17.113266],
    zoom: 14,
    minZoom: 13,
    maxZoom: 16,
});

// bounds setting
let southWest = L.latLng(48.036315, 17.018509),
    northEast = L.latLng(48.2, 17.215233),
    bounds = L.latLngBounds(southWest, northEast);

//create tile layer from third-party provider
let Stadia_StamenTonerLite = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 13,
	maxZoom: 16,
    maxBounds: bounds,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
}).addTo(map);

// let marker = L.marker([51.5, -0.09]).addTo(map);
let circle = L.circle([48.136709, 17.117214], {
    color: 'black',
    fillColor: 'rgb(0, 0, 0)',
    fillOpacity: 0.5,
    radius: 5
}).addTo(map);

// path object
let path = L.polyline([
    [48.139802, 17.1173],
    [48.13986, 17.122364],
    [48.145702, 17.123737]
    ], {
        color: 'black',
        weight: 5,
        stroke: true,
        lineJoin: 'round',

    }).addTo(map);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// let popup = L.popup()
//     .setLatLng([51.513, -0.09])
//     .setContent("I am a standalone popup.")
//     // .addTo(map);
//     .openOn(map);

// onclick show latlong
let popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);