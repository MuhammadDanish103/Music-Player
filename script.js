const musicPlayer = document.getElementById('music-player');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const stopBtn = document.getElementById('stop');
const addMusicInput = document.getElementById('add-music');

const progress = document.getElementById('progress');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');
const titleElem = document.getElementById('title');
const artistElem = document.getElementById('artist');
const coverElem = document.getElementById('cover');

// Array of songs
let songs = [
  {
    name: "song1.mp3",
    title: "Song One",
    artist: "Artist One",
    cover: "cover1.jpg"
  },
  {
    name: "song2.mp3",
    title: "Song Two",
    artist: "Artist Two",
    cover: "cover2.jpg"
  },
  {
    name: "song3.mp3",
    title: "Song Three",
    artist: "Artist Three",
    cover: "cover3.jpg"
  }
];

let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio(songs[currentSongIndex].name);

// Load song details
function loadSong(song) {
  titleElem.textContent = song.title;
  artistElem.textContent = song.artist;
  coverElem.src = song.cover;
  audio.src = song.name;
}

// Play song
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
}

// Pause song
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

// Toggle play/pause
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

// Stop song
stopBtn.addEventListener('click', () => {
  audio.pause();
  audio.currentTime = 0;
  isPlaying = false;
  playBtn.textContent = "▶️";
});

// Previous song
prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});

// Next song
nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});

// Progress bar update
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent;
  currentTimeElem.textContent = formatTime(audio.currentTime);
  durationElem.textContent = formatTime(audio.duration);
});

// Seek song
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Format time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Add new music
addMusicInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const newSong = {
    name: URL.createObjectURL(file),
    title: file.name,
    artist: "Unknown Artist",
    cover: "default-cover.jpg"
  };
  songs.push(newSong);
  loadSong(newSong);
  playSong();
});

// Initial load
loadSong(songs[currentSongIndex]);
