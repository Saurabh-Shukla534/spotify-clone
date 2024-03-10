let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let currentItem = document.getElementById('currentItem');
let progress = document.getElementById('progress');
let playGif = document.getElementById('playGif');
let currentSongName = document.getElementById('currentSongName');
songItems = Array.from(document.getElementsByClassName('songItem'));
let gif = document.getElementById('itemGif');

songsArray = [
    {songName: "Cheap Thrills", filePath: "songs/1.mp3", coverPath: "covers/1.png"},
    {songName: "Bijuria", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Chhaiya Chhaiya", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Hum Hai Naye", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Khalbali", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Khalibali", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Make Some Noise", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Patakha Guddi", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Yeh Dil Deewana", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Tere Naina", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songsArray[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songsArray[i].songName;
});

const makeAllGifPause = () => {
    Array.from(document.getElementsByClassName('songItemGif')).forEach((element) => {
        element.getElementsByTagName('img')[0].style.opacity = 0;
    })
}

makeAllGifPause();

// Play/pause song
currentItem.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        currentItem.classList.remove('fa-circle-play');
        currentItem.classList.add('fa-circle-pause');
        playGif.style.opacity = 1;
        Array.from(document.getElementsByClassName('songIcon'))[songIndex].classList.remove('fa-circle-play');
        Array.from(document.getElementsByClassName('songIcon'))[songIndex].classList.add('fa-circle-pause');
        document.getElementById('itemGif' + `${songIndex}`).style.opacity = 1;    
    } else {
        makeAllIconPlay();
        audioElement.pause();
        currentItem.classList.remove('fa-circle-pause');
        currentItem.classList.add('fa-circle-play');
        playGif.style.opacity = 0;
        document.getElementById('itemGif' + `${songIndex}`).style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', () => {
    myProgress = (audioElement.currentTime/audioElement.duration) * 100;
    progress.value = myProgress;
    if(progress.value >= 100) {
        makeAllIconPlay();
        currentItem.classList.remove('fa-circle-pause');
        currentItem.classList.add('fa-circle-play');
        playGif.style.opacity = 0;
        document.getElementById('itemGif' + `${songIndex}`).style.opacity = 0;
        document.getElementById('nextItem').click();
    }
    document.getElementById('currentDuration').innerText = str_pad_left(parseInt(audioElement.currentTime/60), '0', 2) + ':' + str_pad_left(parseInt(audioElement.currentTime%60), '0', 2);
})

progress.addEventListener('input', (event) => {
    currTime = event.target.value * audioElement.duration / 100;
    audioElement.currentTime = currTime;
})

const makeAllIconPlay = () => {
    Array.from(document.getElementsByClassName('songIcon')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songIcon')).forEach((element) => {
    element.addEventListener('click', (event) => {
        makeAllGifPause();
        if(songIndex !== parseInt(event.target.id)) {
            makeAllIconPlay();
            songIndex = parseInt(event.target.id);
            event.target.classList.remove('fa-circle-play');
            event.target.classList.add('fa-circle-pause');
            audioElement.src = `./songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            currentSongName.innerText = songsArray[songIndex].songName;
            currentItem.classList.remove('fa-circle-play');
            currentItem.classList.add('fa-circle-pause');
            document.getElementById('totalDuration').innerText = str_pad_left(parseInt(songsArray[songIndex].duration/60), '0', 2) + ':' + str_pad_left(parseInt(songsArray[songIndex].duration%60), '0', 2);
            playGif.style.opacity = 1;
            document.getElementById('itemGif' + `${songIndex}`).style.opacity = 1;
        } else {  
            if(audioElement.paused || audioElement.currentTime <= 0) {
                event.target.classList.remove('fa-circle-play');
                event.target.classList.add('fa-circle-pause');
                currentItem.classList.remove('fa-circle-play');
                currentItem.classList.add('fa-circle-pause');
                audioElement.play();
                playGif.style.opacity = 1;
                document.getElementById('itemGif' + `${songIndex}`).style.opacity = 1;
            } else {
                event.target.classList.remove('fa-circle-pause');
                event.target.classList.add('fa-circle-play');
                currentItem.classList.remove('fa-circle-pause');
                currentItem.classList.add('fa-circle-play');
                audioElement.pause();
                playGif.style.opacity = 0;
            }
        }
    })
})

document.getElementById('nextItem').addEventListener('click', () => {
    if(songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    makeAllIconPlay();
    audioElement.src = `./songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    currentSongName.innerText = songsArray[songIndex].songName;
    currentItem.classList.remove('fa-circle-play');
    currentItem.classList.add('fa-circle-pause');
    Array.from(document.getElementsByClassName('songIcon'))[songIndex].classList.remove('fa-circle-play');
    Array.from(document.getElementsByClassName('songIcon'))[songIndex].classList.add('fa-circle-pause');
    document.getElementById('totalDuration').innerText = str_pad_left(parseInt(songsArray[songIndex].duration/60), '0', 2) + ':' + str_pad_left(parseInt(songsArray[songIndex].duration%60), '0', 2);
    playGif.style.opacity = 1;
    makeAllGifPause();
    document.getElementById('itemGif' + `${songIndex}`).style.opacity = 1;
})

document.getElementById('previousItem').addEventListener('click', () => {
    if(songIndex <= 0) {
        songIndex = 9;
    } else {
        songIndex -= 1;
    }
    makeAllIconPlay();
    audioElement.src = `./songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    currentSongName.innerText = songsArray[songIndex].songName;
    currentItem.classList.remove('fa-circle-play');
    currentItem.classList.add('fa-circle-pause');
    Array.from(document.getElementsByClassName('songIcon'))[songIndex].classList.remove('fa-circle-play');
    Array.from(document.getElementsByClassName('songIcon'))[songIndex].classList.add('fa-circle-pause');
    document.getElementById('totalDuration').innerText = str_pad_left(parseInt(songsArray[songIndex].duration/60), '0', 2) + ':' + str_pad_left(parseInt(songsArray[songIndex].duration%60), '0', 2);
    playGif.style.opacity = 1;
    makeAllGifPause();
    document.getElementById('itemGif' + `${songIndex}`).style.opacity = 1;
})

function getDuration(audioPath, callBack) {
    let audioElement = new Audio(audioPath);
    audioElement.addEventListener("loadedmetadata", function() {
        callBack(audioElement.duration)
    })
}

Promise.all(songsArray.map(song => new Promise(resolve => {
    getDuration(song.filePath, duration => {
      song.duration = duration;
      resolve();
    });
  })))
  .then(() => {
    // Now each object has a 'duration' property (after all durations are retrieved)
    songItems.forEach((element, i) => {
        element.getElementsByClassName('songTime')[0].innerText = str_pad_left(parseInt(songsArray[i].duration/60), '0', 2) + ':' + str_pad_left(parseInt(songsArray[i].duration%60), '0', 2) + ' ';
    });
  });

function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

progress.addEventListener('mousemove', (event) => {
    let w = progress.clientWidth;
    let x = event.offsetX;
    let percents = x / w;
    let max = progress.max;
    let progressPercent = Math.floor(percents * max);
    let duration = (progressPercent/100) * audioElement.duration;
    if(duration >= 0 && duration <= audioElement.duration) {
        tooltip.innerHTML = str_pad_left(parseInt(duration/60), '0', 2) + ':' + str_pad_left(parseInt(duration%60), '0', 2);
    }
})
progress.addEventListener('touchmove', (event) => {
    let w = progress.clientWidth;
    let rect = event.target.getBoundingClientRect();
    let x = event.targetTouches[0].pageX - rect.left;
    let percents = x / w;
    let max = progress.max;
    let progressPercent = Math.floor(percents * max);
    let duration = (progressPercent/100) * audioElement.duration;
    if(duration >= 0 && duration <= audioElement.duration) {
        tooltip.innerHTML = str_pad_left(parseInt(duration/60), '0', 2) + ':' + str_pad_left(parseInt(duration%60), '0', 2);
    }
})

window.onmousemove = function (e) {
    let x = (e.clientX) + 'px';
    tooltip.style.left = x;
}

window.ontouchmove = function (e) {
    let x = (e.targetTouches[0].clientX) + 'px';
    tooltip.style.left = x;
}

window.addEventListener('resize', (event) => {
    let icons = Array.from(document.getElementsByClassName('icons')[0].children);
    if(event.target.outerWidth <= 500) {
        icons.forEach((element) => {
            element.classList.remove('fa-2x');
        })
    } else {
        icons.forEach((element) => {
            element.classList.add('fa-2x');
        })
    }
})


