window.onload = init;

function init() {
    // 곡 추가버튼
    let button = document.getElementById("addButton");
    button.onclick = handleAddButtonClick;

    // 곡 삭제버튼
    let button1 = document.getElementById("deleteButton");
    button1.onclick = function(e) {
        removeAll();
    };
    loadPlayList();
}

function handleAddButtonClick(e) {
    let songName = document.getElementById("songTextInput").value;
    alert("확인 : " + songName);

    if(songName==="")
        alert("곡을 입력하세요");
    else{
        let playlistArray = getStoreArray("playlist");
        playlistArray.push(songName);
        localStorage.setItem("playlist", JSON.stringify(playlistArray));

        addSongList([songName]); // 함수 변경
    }
}

function getStoreArray(key) {
    let playlistArray = localStorage.getItem(key);

    if(playlistArray === null || playlistArray === "") 
        playlistArray = new Array();
    else 
        playlistArray = JSON.parse(playlistArray);

    return playlistArray;
}

function loadPlayList() {
    let playlistArray = getStoreArray("playlist");
    addSongList(playlistArray);
}

function addSongList(songList) {
    let ul = document.getElementById("playlist");
    for (let i = 0; i < songList.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = songList[i];
        ul.appendChild(li);
    }
}

function removeAll() {
    if(confirm("모두 지울까요?")){
        localStorage.clear();
        let ul = document.getElementById("playlist");
        ul.innerHTML = "";
    }
}