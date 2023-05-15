/* myLoc.js */
//추가1

var ourCoords = {
	latitude: 47.624851,
	longitude: -122.52099
	};
 
 
 window.onload = getMyLocation;
 
 function getMyLocation() {
	if (navigator.geolocation) {
 
	   navigator.geolocation.getCurrentPosition(
		  displayLocation, 
		  displayError);
	}
	else {
	   alert("이런, 지오로케이션이 제공되지 않네요");
	}
 }
 
 function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
 
	var div = document.getElementById("location");
	div.innerHTML = "당신은 위도: " + latitude + ", 경도: " + longitude + "에 있습니다";
 
 //추가2
 let km = computeDistance(position.coords, ourCoords);
 let distance = document.getElementById('distance');
 distance.innerHTML = "너는 WickedlySmart HQ과 " + km + "km 떨어져 있다."
 
 
 }
 
 
 // --------------------- 준비 코드 시작 ------------------
 //
 // 구면 코사인 법칙으로 두 위도/경도 지점의 거리를 구함
 //
 //추가3
 
 function computeDistance(start, dest) {
	let startLat = degreesToRadians(start.latitude);
	let startLng = degreesToRadians(start.longitude);
	let destLat = degreesToRadians(dest.latitude);
	let destLng = degreesToRadians(dest.longitude);
 
	let Radius = 6371;
	let distance = Math.acos(Math.sin(startLat) * Math.sin(destLat) + Math.cos(startLat) * Math.cos(destLat) * Math.cos(startLng - destLng)) * Radius;
	
	return distance;
 }
 
 function degreesToRadians(d) {
	radians = (d * Math.PI) / 180;
	return radians;
 }
 
 
 
 
 
 
 // ------------------ 준비 코드 종료 -----------------
 
 
 function displayError(error) {
	var errorTypes = {
	   0: "알려지지 않은 에러",
	   1: "사용자가 권한 거부",
	   2: "위치를 찾을 수 없음",
	   3: "요청 응답 시간 초과"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
	   errorMessage = errorMessage + " " + error.message;
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
 }
 