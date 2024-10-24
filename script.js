
         document.documentElement.setAttribute("translate", "no");
     let currentlyPlaying = null;
    
// Menambahkan event listener untuk setiap pemutar audio
(function() {
    // Namespace untuk audio player
    const AudioPlayerNamespace = {
        currentlyPlaying: null,

        updatePlayPauseButton(audio, playIcon, pauseIcon) {
            if (audio.paused || audio.currentTime === 0) {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            } else {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }
        },

        playAudio(audio, playIcon, pauseIcon) {
            if (this.currentlyPlaying && this.currentlyPlaying !== audio) {
                this.currentlyPlaying.pause();
                this.currentlyPlaying.currentTime = 0;
            }
            audio.play();
            this.currentlyPlaying = audio;
            this.updatePlayPauseButton(audio, playIcon, pauseIcon);
        },

        pauseAudio(audio, playIcon, pauseIcon) {
            audio.pause();
            this.currentlyPlaying = null;
            this.updatePlayPauseButton(audio, playIcon, pauseIcon);
        },

        init() {
            document.querySelectorAll('.audio-player').forEach(player => {
                const audio = player.querySelector('audio');
                const playPauseBtn = player.querySelector('.play-pause');
                const playIcon = playPauseBtn.querySelector('.play-icon');
                const pauseIcon = playPauseBtn.querySelector('.pause-icon');
                const progress = player.querySelector('.progress');

                // Set volume penuh (100%)
                audio.volume = 1.0;

                // Memperbarui ikon saat metadata di-load
                audio.addEventListener('loadedmetadata', () => {
                    this.updatePlayPauseButton(audio, playIcon, pauseIcon);
                });

                audio.addEventListener('timeupdate', () => {
                    const value = (audio.currentTime / audio.duration) * 100;
                    progress.value = value;
                    this.updatePlayPauseButton(audio, playIcon, pauseIcon);
                });

                playPauseBtn.addEventListener('click', () => {
                    if (audio.paused) {
                        this.playAudio(audio, playIcon, pauseIcon);
                    } else {
                        this.pauseAudio(audio, playIcon, pauseIcon);
                    }
                });

                progress.addEventListener('input', () => {
                    const time = (progress.value / 100) * audio.duration;
                    audio.currentTime = time;
                });

                audio.addEventListener('ended', () => {
                    this.pauseAudio(audio, playIcon, pauseIcon);
                });
            });
        }
    };

    // Inisialisasi audio player
    AudioPlayerNamespace.init();
})();

     
     window.onload = function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100); // menunggu 100 milidetik sebelum menggulir ke atas
};

// Namespace untuk ScrollToTop
const ScrollToTopNamespace = (function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const profileSection = document.getElementById('portal');
    const windowHeight = window.innerHeight;

    // Fungsi untuk menampilkan tombol saat profil tidak terlihat
    function toggleScrollToTopBtn() {
        const profileBottom = profileSection.getBoundingClientRect().bottom;

        // Tampilkan tombol jika profil sudah tidak terlihat di viewport
        if (profileBottom < 0) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }

    // Fungsi untuk scroll ke bagian atas/profil
    function scrollToTop() {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'  // Scroll secara halus
        });
    }

    // Fungsi untuk memulai event listener
    function init() {
        // Memantau scroll untuk menampilkan/menyembunyikan tombol
        document.addEventListener('scroll', toggleScrollToTopBtn);

        // Fungsi untuk scroll ke atas ketika tombol diklik
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }

    // Return object untuk menginisialisasi namespace
    return {
        init: init
    };
})();

// Inisialisasi ketika konten selesai dimuat
document.addEventListener('DOMContentLoaded', ScrollToTopNamespace.init);
     
// Namespace untuk Animasi Typing
const TypingAnimationNamespace = (function() {
    // Fungsi untuk menghentikan dan memulai ulang animasi typing saat scroll
    function resetTypingAnimation() {
        const typingElement = document.querySelector('#typing');
        if (typingElement) {
            typingElement.style.animation = 'none'; // Hentikan animasi
            typingElement.offsetHeight; // Trigger reflow
            typingElement.style.animation = ''; // Mulai ulang animasi
        }
    }

    // Fungsi untuk memulai event listener
    function init() {
        document.addEventListener('scroll', resetTypingAnimation);
    }

    // Return object untuk menginisialisasi namespace
    return {
        init: init
    };
})();

// Inisialisasi ketika konten selesai dimuat
document.addEventListener('DOMContentLoaded', TypingAnimationNamespace.init);
document.addEventListener('DOMContentLoaded', function () {
    const deviceInfo = [
        `User Agent: ${navigator.userAgent}`,
        `Platform: ${navigator.platform}`,
        `Language: ${navigator.language}`,
        `Screen Resolution: ${window.screen.width} x ${window.screen.height}`,
        `Browser Width: ${window.innerWidth}`,
        `Browser Height: ${window.innerHeight}`
    ];

    const deviceList = document.getElementById('device-list');

    if (deviceInfo.length > 0) {
        deviceInfo.forEach(info => {
            const infoDiv = document.createElement('div');
            infoDiv.className = 'comment'; // Ganti kelas jika perlu
            infoDiv.textContent = info;
            deviceList.appendChild(infoDiv);
        });
    } else {
        const noInfoMessage = document.createElement('p');
        noInfoMessage.textContent = 'Informasi perangkat Unfined';
        deviceList.appendChild(noInfoMessage);
    }

    // Ambil dan tampilkan alamat IP menggunakan ipify API
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipDiv = document.createElement('div');
            ipDiv.className = 'comment'; // Ganti kelas jika perlu
            ipDiv.textContent = `IP Address: ${data.ip}`;
            deviceList.appendChild(ipDiv);
        })
        .catch(error => {
            console.error('Terjadi kesalahan saat mengambil alamat IP:', error);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'comment'; // Ganti kelas jika perlu
            errorDiv.textContent = 'IP Address: Unfined';
            deviceList.appendChild(errorDiv);
        });

    // Tambahkan catatan waktu pengunjung mengakses web
    const accessTime = new Date();
    const formattedTime = `${accessTime.getFullYear()}-${('0' + (accessTime.getMonth() + 1)).slice(-2)}-${('0' + accessTime.getDate()).slice(-2)} ${('0' + accessTime.getHours()).slice(-2)}:${('0' + accessTime.getMinutes()).slice(-2)}:${('0' + accessTime.getSeconds()).slice(-2)}`;

    const timeDiv = document.createElement('div');
    timeDiv.className = 'comment'; // Ganti kelas jika perlu
    timeDiv.textContent = `Access Time: ${formattedTime}`;
    deviceList.appendChild(timeDiv);
});
     
document.addEventListener('DOMContentLoaded', function () {
    const emailButton = document.getElementById('my-email');

    emailButton.addEventListener('click', function(event) {
        event.preventDefault(); // Mencegah default action

        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        const language = navigator.language;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const browserWidth = window.innerWidth;
        const browserHeight = window.innerHeight;
        const accessTime = new Date();
        const formattedTime = `${accessTime.getFullYear()}-${('0' + (accessTime.getMonth() + 1)).slice(-2)}-${('0' + accessTime.getDate()).slice(-2)} ${('0' + accessTime.getHours()).slice(-2)}:${('0' + accessTime.getMinutes()).slice(-2)}:${('0' + accessTime.getSeconds()).slice(-2)}`;

        // Menggunakan ipify API untuk mendapatkan IP address
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ipAddress = data.ip;
                
                // Semua info perangkat dimasukkan ke subjek
                const subject = `Platform: ${platform}, Resolusi Layar: ${screenWidth}x${screenHeight}, Browser: ${browserWidth}x${browserHeight}, Bahasa: ${language}, IP: ${ipAddress}, User-Agent: ${userAgent}, Waktu Akses: ${formattedTime}`;

                // Body hanya untuk menulis pesan
                const emailBody = `Tulis pesan Anda di sini:`;

                const mailtoLink = `mailto:azkaarrodhi11@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
                window.location.href = mailtoLink; // Membuka aplikasi email dengan subjek yang sudah diisi
            })
            .catch(error => {
                console.error('Terjadi kesalahan saat mengambil alamat IP:', error);
                alert('Tidak dapat mengambil informasi IP. Coba lagi nanti.');
            });
    });
});
     function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    document.getElementById('digital-clock').textContent = timeString;
  }

  // Memperbarui jam setiap detik
  setInterval(updateClock, 10);

  // Memperbarui jam saat halaman dimuat
  document.addEventListener('DOMContentLoaded', updateClock);
     
document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const profileSection = document.getElementById('profile-pic');
    const fadeInElements = document.querySelectorAll('.fade-in, .fade-in-side, .fade-in-up, .fade-in-down .fade-in-diagonal, .fade-in-bottom, .fade-in-rotate, .fade-in-scale, .fade-in-shake, .fade-in-bounce, .fade-in-right, .fade-in-zoom, .fade-in-slide, .fade-in-color'); // Tambahkan fade-in-down
    let profileSeen = false; // Flag untuk menandai apakah profil sudah terlihat
    let topReached = false;  // Flag untuk menandai jika scroll sudah sampai ke atas
    
    // Fungsi untuk menjalankan animasi scroll
    function runScrollAnimation() {
        const windowHeight = window.innerHeight;

        // Deteksi apakah profil sudah terlihat sepenuhnya
        const profileTop = profileSection.getBoundingClientRect().top;
        const profileBottom = profileSection.getBoundingClientRect().bottom;

        if (profileTop < windowHeight && profileBottom > 0) {
            profileSeen = true; // Tandai bahwa profil sudah terlihat
        }

        // Deteksi apakah scroll sudah sampai ke atas
        if (window.scrollY === 0) {
            topReached = true; // Tandai bahwa pengguna sudah mencapai bagian atas
            fadeInElements.forEach(el => {
                el.classList.add('closing'); // Tambahkan animasi penutup saat kembali ke bagian atas
                el.classList.remove('visible'); // Hilangkan kelas visible
            });
        } else {
            topReached = false;
        }

        // Jika profil sudah terlihat dan scroll tidak berada di bagian atas
        if (profileSeen && !topReached) {
            fadeInElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const elementBottom = el.getBoundingClientRect().bottom;

                // Muncul ketika elemen terlihat di viewport
                if (elementTop < windowHeight && elementBottom > 100) {
                    el.classList.add('visible');
                    el.classList.remove('closing'); // Hilangkan animasi penutup
                }
            });
        }
    }

    // Memantau scroll untuk menjalankan animasi
    document.addEventListener('scroll', runScrollAnimation);

    // Fungsi untuk scroll ke bagian atas/profil
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'  // Scroll secara halus
        });
    });
});

// Memantau scroll untuk menjalankan animasi
document.addEventListener('scroll', runScrollAnimation);
