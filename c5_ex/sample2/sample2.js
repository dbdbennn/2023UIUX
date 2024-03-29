function initMap() {
    const mirim = new google.maps.LatLng(37.4663507, 126.9328951);
    const map = new google.maps.Map(document.getElementById("map"), {
      center: mirim,
      zoom: 18,
    });
    const coordInfoWindow = new google.maps.InfoWindow();
  
    coordInfoWindow.setContent(createInfoWindowContent(mirim, map.getZoom()));
    coordInfoWindow.setPosition(mirim);
    coordInfoWindow.open(map);
    map.addListener("zoom_changed", () => {
      coordInfoWindow.setContent(createInfoWindowContent(mirim, map.getZoom()));
      coordInfoWindow.open(map);
    });
  }
  
  const TILE_SIZE = 256;
  
  function createInfoWindowContent(latLng, zoom) {
    const scale = 1 << zoom;
    const worldCoordinate = project(latLng);
    const pixelCoordinate = new google.maps.Point(
      Math.floor(worldCoordinate.x * scale),
      Math.floor(worldCoordinate.y * scale)
    );
    const tileCoordinate = new google.maps.Point(
      Math.floor((worldCoordinate.x * scale) / TILE_SIZE),
      Math.floor((worldCoordinate.y * scale) / TILE_SIZE)
    );
    return [
      "미림여자정보과학고등학교",
      "LatLng: " + latLng,
      "Zoom level: " + zoom,
      "World Coordinate: " + worldCoordinate,
      "Pixel Coordinate: " + pixelCoordinate,
      "Tile Coordinate: " + tileCoordinate,
    ].join("<br>");
  }
  
  // The mapping between latitude, longitude and pixels is defined by the web
  // mercator projection.
  function project(latLng) {
    let siny = Math.sin((latLng.lat() * Math.PI) / 180);
  
    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);
    return new google.maps.Point(
      TILE_SIZE * (0.5 + latLng.lng() / 360),
      TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
    );
  }
  
  window.initMap = initMap;