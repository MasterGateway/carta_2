// ===== MUSIC-BOX.JS - CAJA MUSICAL =====

class MusicBox {
    constructor() {
        this.playlist = [
            { title: "Perfect", artist: "Ed Sheeran", emoji: "💕" },
            { title: "All of Me", artist: "John Legend", emoji: "💖" },
            { title: "Thinking Out Loud", artist: "Ed Sheeran", emoji: "💗" },
            { title: "A Thousand Years", artist: "Christina Perri", emoji: "💝" },
            { title: "Love Story", artist: "Taylor Swift", emoji: "💘" },
            { title: "Make You Feel My Love", artist: "Adele", emoji: "💓" },
            { title: "Can't Help Myself", artist: "Four Tops", emoji: "💕" },
            { title: "At Last", artist: "Etta James", emoji: "💖" }
        ];
        
        this.currentSong = 0;
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.renderPlaylist();
        this.updateNowPlaying();
        this.setupEventListeners();
    }

    renderPlaylist() {
        const playlist = document.getElementById('playlist');
        playlist.innerHTML = '';
        
        this.playlist.forEach((song, index) => {
            const item = document.createElement('div');
            item.className = `playlist-item ${index === this.currentSong ? 'active' : ''}`;
            item.dataset.index = index;
            item.innerHTML = `
                <span class="song-emoji">${song.emoji}</span>
                <div class="song-details">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
            `;
            playlist.appendChild(item);
        });
    }

    updateNowPlaying() {
        const song = this.playlist[this.currentSong];
        document.getElementById('song-title').textContent = song.title;
        document.getElementById('song-artist').textContent = song.artist;
        
        // Actualizar lista activa
        document.querySelectorAll('.playlist-item').forEach((item, index) => {
            item.classList.toggle('active', index === this.currentSong);
        });
    }

    setupEventListeners() {
        document.getElementById('play-pause-btn').addEventListener('click', () => {
            this.togglePlay();
        });
        
        document.getElementById('prev-btn').addEventListener('click', () => {
            this.prevSong();
        });
        
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextSong();
        });
        
        document.getElementById('playlist').addEventListener('click', (e) => {
            const item = e.target.closest('.playlist-item');
            if (item) {
                this.currentSong = parseInt(item.dataset.index);
                this.updateNowPlaying();
                this.renderPlaylist();
            }
        });
    }

    togglePlay() {
        const btn = document.getElementById('play-pause-btn');
        this.isPlaying = !this.isPlaying;
        btn.textContent = this.isPlaying ? '⏸️' : '▶️';
        
        if (this.isPlaying) {
            window.LoveUtils?.showNotification(`🎵 Reproduciendo: ${this.playlist[this.currentSong].title}`);
            window.ParticleEffects?.loveWaves(window.innerWidth / 2, window.innerHeight / 2);
        }
    }

    prevSong() {
        this.currentSong = (this.currentSong - 1 + this.playlist.length) % this.playlist.length;
        this.updateNowPlaying();
        this.renderPlaylist();
    }

    nextSong() {
        this.currentSong = (this.currentSong + 1) % this.playlist.length;
        this.updateNowPlaying();
        this.renderPlaylist();
    }
}

window.MusicBox = MusicBox;