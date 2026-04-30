const startDate = new Date("2023-09-10");
const today = new Date();
const daysDiff = Math.floor((today - startDate) / (1000 * 3600 * 24));

const titles = ["Untuk Sayangku...", "Semangat Mimom!", "Ryuka ❤️"];
let titleIndex = 0;
setInterval(() => { document.title = titles[titleIndex]; titleIndex = (titleIndex + 1) % titles.length; }, 2000);

const dialogs = [
    { main: "SAYANGKU", sub: "Mungkin aku bukan pria yang pandai merangkai kata-kata indah setiap hari...", icon: "💍" },
    { main: "KITA", sub: `Gak kerasa, sudah ${daysDiff} hari kita saling memiliki sejak 10 September 2023.`, icon: "CUSTOM_CALENDAR" },
    { main: "JARAK INI", sub: "Maafin aku yang harus melangkah jauh setiap awal minggu untuk bekerja.", icon: "🏢" },
    { main: "MAAFIN AKU", sub: "Maafin aku yang gak bisa selalu ada di sampingmu saat kamu merasa mual dan lelah.", icon: "😔" },
    { main: "USAHAKU", sub: "Tapi percayalah sayang, setiap lelahku di sana tujuannya cuma untuk kebahagiaan kita.", icon: "⚡" },
    { main: "PERJUANGANMU", sub: "Aku melihat betapa hebatnya kamu menjaga nyawa baru di dalam tubuhmu tanpa mengeluh.", icon: "🤰" },
    { main: "LELAH MU", sub: "Melihatmu sulit bernapas dan sulit mencari posisi tidur yang nyaman setiap malam...", icon: "🛌" },
    { main: "PENGORBANAN", sub: "Semua rasa sakit itu kamu telan sendiri demi kebaikan Mimom dan si kecil nanti.", icon: "💧" },
    { main: "WANITA HEBAT", sub: "Kamu benar-benar wanita terhebat. Aku merasa sangat kecil di depan ketulusanmu.", icon: "🌟" },
    { main: "SAYANG", sub: "Sebentar lagi doa kita akan hadir. Seorang mungil yang akan memanggilmu 'Mimom'.", icon: "👼" },
    { main: "RYUKA", sub: "Aku ingin Ryuka Sevara Mylaff nanti punya senyum manis dan hati yang luas... persis sepertimu.", icon: "🌸" },
    { main: "OBAT RINDU", sub: "Nanti kalau aku jauh, wajah mungil Ryuka akan jadi pengobat rinduku padamu.", icon: "🧸" },
    { main: "DUA BULAN", sub: "Gak kerasa tinggal sekitar 2 bulan lagi kita akan menyapa keajaiban kecil kita.", icon: "📅" },
    { main: "DEBARAN", sub: "Aku tahu kamu pasti merasa takut, deg-degan, dan lelah menghadapi hari itu.", icon: "💓" },
    { main: "JANGAN TAKUT", sub: "Tapi tolong ingat ini: Aku akan selalu ada di baris terdepan untuk menjagamu.", icon: "🛡️" },
    { main: "JANJIKU", sub: "Apapun yang terjadi nanti, aku gak akan lepasin tanganmu sekejap pun.", icon: "🤝" },
    { main: "PASTI BISA", sub: "Kamu wanita hebat, Mimom yang luar biasa. Kamu pasti bisa melalui hari besar itu.", icon: "🥇" },
    { main: "KUATLAH", sub: "Semangat ya sayang untuk sisa perjalanan ini. Sebentar lagi kita jadi keluarga utuh.", icon: "🌈" },
    { main: "HARTAKU", sub: "Kalian berdua adalah alasan aku tetap kuat berdiri menghadapi kerasnya dunia.", icon: "💎" },
    { main: "PAPA HEBAT", sub: "Aku berjanji akan belajar menjadi papa yang hebat, yang selalu bisa kalian andalkan.", icon: "💪" },
    { main: "KELUARGA KITA", sub: "Aku, kamu, dan si kecil akan menjadi satu tim yang paling bahagia di dunia.", icon: "👨‍👩‍👦" },
    { main: "SABARMU", sub: "Terima kasih sudah tetap sabar menungguku pulang di setiap penghujung hari.", icon: "🛤️" },
    { main: "MASA DEPAN", sub: "Percayalah sayang, hari-hari yang lebih cerah sedang menunggu kita di depan sana. Akan baik-baik saja karena cinta kita lebih besar dari rasa takut manapun.", icon: "🕯️" },
    { main: "TERIMA KASIH", sub: "Terima kasih sudah menjadi Istri sekaligus calon Mimom yang luar biasa.", icon: "🙏" },
    { main: "I LOVE YOU", sub: "Terima kasih sudah menjadi segalanya bagiku. Terima kasih telah mencintaiku dengan cara yang membuatku lebih mencintai diriku sendiri.", icon: "❤️" },
    { main: "HADIAHKU", sub: "kenangan kita ada di sini. Klik karakternya ya sayang...", icon: "🎁" }
];

let currentStep = 0;
let started = false;

function startExperience(e) {
    e.stopPropagation();
    document.getElementById('welcome-overlay').classList.add('hidden');
    document.getElementById('content').classList.remove('hidden');
    document.getElementById('bgMusic').play();
    started = true;
    nextDialog();
}

function handleClick(event) {
    if (!started || document.getElementById('photoGallery').classList.contains('active')) return;
    const x = event.pageX; const y = event.pageY;
    const heart = document.createElement('div');
    heart.innerHTML = '❤️'; heart.className = 'heart-sparkle';
    heart.style.left = x + 'px'; heart.style.top = y + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
    nextDialog();
}

function nextDialog() {
    if (currentStep < dialogs.length) {
        updateContent();
        currentStep++;
        checkFinalScene();
    }
}

function prevDialog(e) {
    if (e) e.stopPropagation();
    if (currentStep > 1) {
        currentStep -= 2; 
        const content = document.getElementById('content');
        content.classList.remove('move-to-top');
        document.getElementById('tapBox').classList.remove('hidden');
        document.getElementById('mainCharacter').classList.add('hidden');
        document.getElementById('final-hint').classList.add('hidden');
        document.getElementById('photoGallery').classList.remove('active');
        nextDialog();
    }
}

function updateContent() {
    const content = document.getElementById('content');
    const mainTxt = document.getElementById('main-text');
    const subTxt = document.getElementById('sub-text');
    const mainIcon = document.getElementById('main-icon');
    const btnBack = document.getElementById('btn-back');

    content.style.opacity = '0';
    setTimeout(() => {
        const data = dialogs[currentStep];
        if(!data) return;
        mainTxt.innerText = data.main;
        subTxt.innerText = data.sub;
        if (data.icon === "CUSTOM_CALENDAR") mainIcon.innerHTML = '<div class="calendar-icon"></div>';
        else mainIcon.innerHTML = data.icon;
        
        if(["❤️", "💓", "💖"].includes(data.icon)) mainIcon.classList.add('heartbeat');
        else mainIcon.classList.remove('heartbeat');

        if (currentStep > 0) btnBack.classList.remove('hidden');
        else btnBack.classList.add('hidden');
        content.style.opacity = '1';
    }, 200); 
}

function checkFinalScene() {
    if (currentStep === dialogs.length) {
        const trans = document.getElementById('pixel-transition');
        trans.classList.remove('hidden');
        trans.classList.add('active');

        setTimeout(() => {
            const content = document.getElementById('content');
            const tapBox = document.getElementById('tapBox');
            const char = document.getElementById('mainCharacter');
            const finalHint = document.getElementById('final-hint');
            const photoGal = document.getElementById('photoGallery');

            content.classList.add('move-to-top'); 
            tapBox.classList.add('hidden'); 
            char.classList.remove('hidden'); 
            finalHint.classList.remove('hidden'); 
            
            char.onclick = (e) => {
                e.stopPropagation();
                if (!photoGal.classList.contains('active')) {
                    photoGal.classList.add('active');
                    char.src = "./img/karakter_senyum.png";
                    finalHint.classList.add('hidden');
                    startBubbles();
                } else {
                    photoGal.classList.remove('active');
                    char.src = "./img/karakter_diam.png";
                    finalHint.classList.remove('hidden');
                }
            };
            
            trans.classList.add('out');
            setTimeout(() => {
                trans.classList.remove('active', 'out');
                trans.classList.add('hidden');
            }, 500);
            
        }, 600);
    }
}

function startBubbles() {
    const container = document.getElementById('bubbleContainer');
    if(container.innerHTML !== "") return;
    setInterval(() => {
        const b = document.createElement('div');
        b.className = 'bubble';
        const s = Math.random() * 10 + 5 + "px";
        b.style.width = s; b.style.height = s; b.style.left = Math.random() * 100 + "%";
        container.appendChild(b);
        setTimeout(() => b.remove(), 4000);
    }, 500);
}

document.querySelectorAll('.pixel-frame').forEach((frame) => {
    frame.onclick = (e) => {
        e.stopPropagation();
        document.getElementById('gameScreen').classList.add('screen-shake');
        setTimeout(() => document.getElementById('gameScreen').classList.remove('screen-shake'), 200);
        const img = frame.querySelector('img').src;
        const desc = frame.getAttribute('data-desc');
        document.getElementById('modalImg').src = img;
        document.getElementById('modalDesc').innerText = desc;
        document.getElementById('pixelModal').style.display = 'flex';
    };
});

function closeModal() { document.getElementById('pixelModal').style.display = 'none'; }
