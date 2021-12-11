const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const progressContainer = document.querySelector(".progress-container");
const volBtn = document.querySelector("#volume")
const volumeSlider = document.getElementById("volumeslider");
const seekbar = document.querySelector('.seekbar')
const bola = document.querySelector('.bola')
const musicInfo = document.querySelector('.music-info')
const video = document.querySelector('#video')
const videoContainer = document.querySelector('.video-container')
const titulo = document.querySelector(".titulo")
const body = document.querySelector('body')
const movieInfo = document.querySelector('.movie-info')

// socorro anoes 



// Song titles
const songs = ['yam yam', 'trigun', 'missyou', 'renee', 'you & the others', 'different age', 'no surprises', "heaven knows i'm miserable now", 'stop crying your heart out', 'open your eyes'];


// Keep track of song
let songIndex = 4;
let movieIndex = 4;

// Initially load song details into DOM
loadSong(songs[songIndex]);





// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  video.src = `videos_low/${song}.mp4`;

}




function playSong() {
  musicContainer.classList.add('play')
  musicContainer.classList.add('pause')

  videoContainer.classList.add('play')

  titulo.classList.add('branco')

  body.classList.add('xdxd')

  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
  audio.volume = 0.5;
  video.play()
  video.volume = 0;
}

function pauseSong() {
  musicContainer.classList.remove('play')
  musicContainer.classList.remove('pause')

  video.pause()
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

function prevSong() {
  songIndex--

  if(songIndex <0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])

  playSong()
}

function nextSong() {
  songIndex++

  if(songIndex > songs.length -1) {
    songIndex = 0
  }

  loadSong(songs[songIndex])

  playSong()

  movieInfo.remove('desc-2')
}

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  const progressPer = (currentTime / duration) * 96
  progress.style.width = `${progressPercent}%`
  bola.style.left = `${progressPer}%`

}


function setProgress(e) {
    const width = this.clientWidth
    const clickX  = e.offsetX
    const duration = audio.duration 

    audio.currentTime = (clickX / width) * duration


}

function setVideo(e) {
  const width = this.clientWidth
  const clickX  = e.offsetX
  const duration = video.duration 

  video.currentTime = (clickX / width) * duration


}

function muteSong() {
  volBtn.querySelector('i.fas').classList.remove('fa-volume-up')
  volBtn.querySelector('i.fas').classList.add('fa-volume-mute')
}

function unMuteSong() {
  volBtn.querySelector('i.fas').classList.add('fa-volume-up')
  volBtn.querySelector('i.fas').classList.remove('fa-volume-mute')
}

function volUp() {
  musicContainer.classList.add('vol')
}

function volDown() {
  musicContainer.classList.remove('vol')
}

// Event listeners 
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')

  if(isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

volBtn.addEventListener('click', () => {
   if(audio.muted == true) {
     audio.muted = false;
     unMuteSong()
     volumeSlider.value = 10;
   }

   else if (audio.muted == false) {
     audio.muted = true;
     muteSong()
     volumeSlider.value = 0;
   }

   

})

function setvolume(){
  audio.volume = volumeSlider.value / 10;

  if(audio.volume == 0) {
  muteSong()
} else if (audio.volume == 0.1){
  unMuteSong()
}}

function replay(){
  video.loop = true;
}
// Change song events 
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)
progressContainer.addEventListener('click', setVideo)


video.addEventListener('ended', replay())

audio.addEventListener('ended', nextSong)

volumeSlider.addEventListener('mousemove', setvolume);

volBtn.addEventListener('mouseenter', volUp)


volumeSlider.addEventListener('mouseleave', volDown)

musicContainer.addEventListener('mouseleave', volDown)

nextBtn.addEventListener('mouseenter', volDown)

progressContainer.addEventListener('mouseenter', volDown)

musicInfo.addEventListener('mouseenter', volDown)


