let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: { lat: 37.4663507, lng: 126.9328951 },
    zoom: 15,
  });
}

initMap();
