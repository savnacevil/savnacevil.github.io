const songs = [
  "songs/Godzilla-Eminem.mp4",
  "songs/song2.mp3",
  "songs/song3.mp3"
  // add all 20 here
];

const audio = document.getElementById("audio");
const songList = document.getElementById("songList");
const nowPlaying = document.getElementById("nowPlaying");
const progress = document.getElementById("progress");
const shuffleBtn = document.getElementById("shuffleBtn");

let currentSongIndex = -1;

// Build song list
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.split("/").pop().replace(".mp3", "");
  li.onclick = () => playSong(index);
  songList.appendChild(li);
});

function playSong(index) {
  currentSongIndex = index;
  audio.src = songs[index];
  audio.play();
  nowPlaying.textContent = `Playing: ${songs[index]
    .split("/")
    .pop()
    .replace(".mp3", "")}`;
}

// Shuffle
shuffleBtn.onclick = () => {
  const randomIndex = Math.floor(Math.random() * songs.length);
  playSong(randomIndex);
};

// Progress bar update
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Auto play next
audio.addEventListener("ended", () => {
  playSong((currentSongIndex + 1) % songs.length);
});
