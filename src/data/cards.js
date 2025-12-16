// src/data/cards.js

// --- IMPORT MODEL 3D DARI ASSETS ---
import modelJantung from "../assets/models/heart.glb?url";
import modelParu from "../assets/models/lungs.glb?url";
import modelSehat from "../assets/models/health.glb?url";

// Menggunakan heart.glb sebagai placeholder untuk model lain yang belum ada
import modelPembuluh from "../assets/models/heart.glb?url";
import modelDarah from "../assets/models/heart.glb?url";
import modelTubuh from "../assets/models/heart.glb?url";

export const cardsData = [
  {
    id: "jantung",
    title: "Jantung: Mesin Ajaib",
    subtitle: "Pusat Kehidupan",
    description:
      'Halo! Aku adalah mesin utama di tubuhmu. Ukuranku sebesar kepalan tanganmu dan aku duduk manis sedikit di kiri dadamu. Aku punya 4 kamar rahasia (ruang) yang bekerja sama: ada yang menerima darah masuk, ada yang mendorongnya keluar. Pintu-pintu kamarku disebut "Katup" agar darah tidak salah jalan! Tubuhku dibungkus selimut pelindung bernama "Perikardium" agar aku aman dari gesekan. Hebatnya, aku punya listrik alami sendiri yang membuatku berdetak ribuan kali sehari tanpa henti, bahkan saat kamu tidur lelap!',

    fullContent: `Jantung adalah organ berotot yang bekerja seperti mesin utama tubuh. Bentuknya menyerupai kepalan tangan dan berada sedikit ke kiri dada. Di dalamnya terdapat empat ruang yang masing-masing memiliki katup untuk mengatur aliran darah. Keempat ruang ini bekerja terkoordinasi: ada yang menerima darah dan ada yang memompa darah keluar.

Jantung dilapisi oleh perikardium, yaitu selaput pelindung yang mencegah gesekan dengan organ sekitar. Kerja jantung diatur oleh sinyal listrik alami tubuh, sehingga detaknya teratur dan bisa menyesuaikan kebutuhan, misalnya saat beristirahat atau beraktivitas.

Yang menarik, jantung bisa berdetak puluhan ribu kali dalam sehari, bahkan ketika kita tidur. Semakin aktif kita bergerak, semakin cepat jantung memompa darah untuk memenuhi kebutuhan oksigen tubuh.`,

    funFacts: [
      "💓 Jantungmu berdetak lebih dari 100.000 kali setiap hari!",
      "🚀 Dalam sehari, jantungmu memompa darah sejauh ribuan kilometer!",
      "😴 Bahkan saat tidur, jantungmu tetap bekerja tanpa henti",
      "🏃 Saat berlari atau tertawa, jantung berdetak lebih cepat untuk memberi energi ekstra",
      "⚡ Jantung punya listrik alami sendiri untuk mengatur detaknya",
    ],

    image:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1000&auto=format&fit=crop",

    modelUrl: modelJantung,
    color: "bg-rose-500",
    bgGradient: "from-rose-100 to-rose-300",

    quiz: [
      {
        question: "Berapa jumlah ruang rahasia yang dimiliki jantung?",
        options: ["2 Ruang", "4 Ruang", "6 Ruang", "1 Ruang"],
        correctIndex: 1,
      },
      {
        question: "Apa nama selimut pelindung jantung?",
        options: ["Perikardium", "Helm", "Jaket", "Membran"],
        correctIndex: 0,
      },
      {
        question: "Apa fungsi 'Katup' pada jantung?",
        options: [
          "Memompa darah",
          "Agar darah tidak salah jalan",
          "Membuat listrik",
          "Menyaring racun",
        ],
        correctIndex: 1,
      },
      {
        question: "Di mana letak jantungmu?",
        options: [
          "Di perut kanan",
          "Di dada sedikit ke kiri",
          "Di kepala",
          "Di punggung",
        ],
        correctIndex: 1,
      },
      {
        question: "Apakah jantung berhenti saat kita tidur?",
        options: [
          "Ya, ikut tidur",
          "Berhenti sebentar",
          "Tidak, terus berdetak",
          "Kadang-kadang",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "pembuluh-darah",
    title: "Pembuluh Darah",
    subtitle: "Jalan Raya Tubuh",
    description:
      "Kami adalah jaringan jalan raya super canggih di tubuhmu! Kami punya 3 jalur khusus: ARTERI (jalan tol besar yang tebal dan elastis untuk darah bersih), VENA (jalan balik dengan pintu satu arah), dan KAPILER (jalan tikus setipis rambut untuk antar oksigen langsung ke sel). Arteri terbesar namanya Aorta!",

    fullContent: `Pembuluh darah adalah "jalan raya" di dalam tubuh yang dilalui oleh darah. Setiap jenis pembuluh darah memiliki bentuk, arah aliran, dan tugas yang berbeda-beda sehingga seluruh tubuh bisa mendapat oksigen dan nutrisi dengan tepat.

ARTERI: Pembuluh darah yang membawa darah keluar dari jantung. Dinding arteri bersifat tebal dan elastis karena harus menahan tekanan darah yang tinggi saat jantung memompa. Arteri terbesar bernama aorta, yang bercabang menjadi arteri-arteri lebih kecil menuju seluruh tubuh.

VENA: Pembuluh darah yang bertugas membawa darah kembali menuju jantung. Berbeda dari arteri, vena memiliki katup kecil di dalamnya untuk mencegah darah mengalir mundur. Vena sering terlihat di permukaan kulit, terutama di tangan.

KAPILER: Pembuluh darah paling kecil dan paling tipis, bahkan begitu tipis sampai hanya terdiri dari satu lapisan sel. Kapiler menghubungkan arteri dan vena, serta menjadi tempat pertukaran zat penting antara darah dan sel-sel tubuh.`,

    funFacts: [
      "🛣️ Jika semua pembuluh darahmu disambung, panjangnya bisa 100.000 km - cukup untuk mengelilingi Bumi 2,5 kali!",
      "🔴 Arteri membawa darah merah segar penuh oksigen",
      "🔵 Vena membawa darah biru gelap yang sudah 'capek'",
      "🔬 Kapiler begitu kecil, hanya bisa dilalui satu sel darah merah dalam satu waktu!",
      "💪 Gerakan otot tubuh membantu vena mendorong darah kembali ke jantung",
    ],

    image:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop",

    modelUrl: modelPembuluh,
    color: "bg-blue-500",
    bgGradient: "from-blue-100 to-blue-300",

    quiz: [
      {
        question:
          "Pembuluh darah yang berfungsi membawa darah keluar dari jantung disebut…",
        options: ["Vena", "Arteri", "Kapiler", "Limfa"],
        correctIndex: 1,
      },
      {
        question: "Pembuluh darah yang membawa darah menuju jantung adalah…",
        options: ["Arteri", "Kapiler", "Vena", "Aorta"],
        correctIndex: 2,
      },
      {
        question:
          "Pembuluh darah yang ukurannya paling kecil dan tipis adalah…",
        options: ["Arteri", "Vena", "Aorta", "Kapiler"],
        correctIndex: 3,
      },
      {
        question: "Di pembuluh kapiler terjadi proses…",
        options: [
          "Pemompaan darah",
          "Penyaringan darah",
          "Pertukaran oksigen dan zat makanan",
          "Penyimpanan darah",
        ],
        correctIndex: 2,
      },
      {
        question: "Pembuluh darah yang dindingnya tebal dan kuat adalah…",
        options: ["Kapiler", "Vena", "Arteri", "Limfa"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "darah",
    title: "Darah & Pasukannya",
    subtitle: "Kurir Kehidupan",
    description:
      "Aku bukan sekadar cairan merah biasa! Di dalamku ada pasukan pahlawan: Si MERAH (Eritrosit) yang menggendong oksigen ke seluruh tubuh, Si PUTIH (Leukosit) tentara gagah yang berperang melawan kuman penyakit, dan KEPING DARAH (Platelet) si tukang tambal yang menutup lukamu agar berhenti berdarah saat kamu jatuh. Selain itu, aku juga membawa sari-sari makanan (Nutrisi) biar kamu tumbuh besar, pintar, dan kuat!",

    fullContent: `Darah bukan sekadar cairan merah biasa! Di dalamnya ada pasukan pahlawan yang masing-masing punya tugas penting:

SEL DARAH MERAH (Eritrosit): Bertugas menggendong oksigen ke seluruh tubuh. Mereka yang membuat darah berwarna merah!

SEL DARAH PUTIH (Leukosit): Tentara gagah yang berperang melawan kuman penyakit. Mereka menjaga tubuh agar tetap sehat.

KEPING DARAH (Platelet/Trombosit): Si tukang tambal yang menutup lukamu agar berhenti berdarah saat kamu jatuh atau terluka.

PLASMA: Cairan bening yang membawa nutrisi, vitamin, dan hormon ke seluruh tubuh.`,

    funFacts: [
      "🔴 Tubuhmu punya 25 TRILIUN sel darah merah!",
      "⚔️ Sel darah putih adalah tentara super yang bisa 'memakan' kuman!",
      "🩹 Keping darah bekerja cepat: luka kecil bisa berhenti berdarah dalam 3-5 menit",
      "🏭 Sel darah merah diproduksi di sumsum tulang dengan kecepatan 2 juta sel per detik!",
      "♻️ Sel darah merah hanya 'hidup' 120 hari, lalu diganti dengan yang baru",
    ],

    image:
      "https://images.unsplash.com/photo-1615631648086-325025c9e51e?q=80&w=1000&auto=format&fit=crop",

    modelUrl: modelDarah,
    color: "bg-red-600",
    bgGradient: "from-red-100 to-red-300",

    quiz: [
      {
        question:
          "Darah manusia terdiri dari beberapa bagian. Berikut ini yang bukan termasuk bagian darah adalah…",
        options: ["Sel darah merah", "Sel darah putih", "Keping darah", "Otot"],
        correctIndex: 3,
      },
      {
        question:
          "Bagian darah yang berfungsi mengangkut oksigen ke seluruh tubuh adalah…",
        options: [
          "Plasma darah",
          "Sel darah putih",
          "Sel darah merah",
          "Keping darah",
        ],
        correctIndex: 2,
      },
      {
        question: "Sel darah putih memiliki fungsi utama untuk…",
        options: [
          "Mengangkut sari-sari makanan",
          "Melawan kuman dan penyakit",
          "Membekukan darah",
          "Memberi warna merah pada darah",
        ],
        correctIndex: 1,
      },
      {
        question: "Keping darah (trombosit) berperan penting dalam proses…",
        options: [
          "Pernapasan",
          "Pencernaan",
          "Pembekuan darah",
          "Peredaran oksigen",
        ],
        correctIndex: 2,
      },
      {
        question: "Plasma darah berfungsi untuk…",
        options: [
          "Melawan bakteri",
          "Mengangkut zat makanan dan hormon",
          "Menghentikan pendarahan",
          "Mengedarkan oksigen",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "peredaran-kecil",
    title: "Peredaran Darah Kecil",
    subtitle: "Misi Isi Ulang",
    description:
      'Ini adalah misi penyelamatan napas! Disebut juga "Sistem Pulmoner". Perjalanannya pendek tapi sangat penting: Darah yang membawa sampah napas (Karbon Dioksida) berangkat dari Jantung menuju Paru-Paru. Di sana, sampah itu dibuang saat kamu menghembuskan napas, dan diganti dengan Oksigen segar saat kamu menghirup udara. Setelah darah bersih dan penuh oksigen, ia kembali lagi ke Jantung, siap untuk petualangan besar!',

    fullContent: `Peredaran darah kecil adalah proses perjalanan darah dari jantung menuju paru-paru lalu kembali lagi ke jantung. Meskipun jalurnya lebih pendek, proses ini sangat penting karena di sinilah darah "diisi ulang" dengan oksigen yang dibutuhkan seluruh tubuh.

Pada awalnya, darah yang masuk ke paru-paru adalah darah yang kaya karbon dioksida, yaitu sisa pernapasan dari sel-sel tubuh. Ketika darah sampai pada pembuluh kapiler di paru-paru, terjadi pertukaran gas:
- Karbon dioksida dilepaskan dan dihembuskan saat kita bernapas
- Oksigen diambil dari udara yang kita hirup

Darah yang sudah memiliki oksigen kemudian kembali ke jantung untuk dipompa ke seluruh tubuh melalui peredaran darah besar.

Peredaran darah kecil juga berperan membantu tubuh menjaga suhu, membersihkan udara dari kotoran yang kita hirup, dan memastikan setiap sel darah merah membawa oksigen dalam jumlah cukup.`,

    funFacts: [
      "🫁 Paru-parumu punya 300 juta kantung udara kecil (alveoli)!",
      "💨 Setiap napas yang kamu ambil mengandung oksigen untuk jutaan sel",
      "♻️ Pertukaran gas di paru-paru terjadi super cepat, hanya butuh 0.25 detik!",
      "🌬️ Kamu bernapas sekitar 20.000 kali setiap hari",
      "❄️ Napasmu terlihat saat cuaca dingin karena uap air dari paru-paru!",
    ],

    image:
      "https://plus.unsplash.com/premium_photo-1675808564264-5006b5278453?q=80&w=1000&auto=format&fit=crop",

    modelUrl: modelParu,
    color: "bg-sky-400",
    bgGradient: "from-sky-100 to-sky-300",

    quiz: [
      {
        question: "Apa yang dimaksud dengan peredaran darah kecil?",
        options: [
          "Peredaran darah dari jantung ke seluruh tubuh",
          "Peredaran darah dari jantung ke paru-paru lalu kembali ke jantung",
          "Peredaran darah dari otak ke jantung",
          "Peredaran darah dari kaki ke kepala",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Organ utama yang terlibat dalam peredaran darah kecil adalah…",
        options: [
          "Jantung dan hati",
          "Jantung dan ginjal",
          "Jantung dan paru-paru",
          "Jantung dan usus",
        ],
        correctIndex: 2,
      },
      {
        question: "Fungsi utama peredaran darah kecil adalah…",
        options: [
          "Mengedarkan sari-sari makanan",
          "Mengangkut oksigen ke seluruh tubuh",
          "Membersihkan darah dari zat sisa",
          "Menukar karbon dioksida dengan oksigen",
        ],
        correctIndex: 3,
      },
      {
        question:
          "Darah yang menuju paru-paru pada peredaran darah kecil mengandung banyak…",
        options: ["Oksigen", "Nutrisi", "Karbon dioksida", "Vitamin"],
        correctIndex: 2,
      },
      {
        question:
          "Setelah darah mendapat oksigen dari paru-paru, darah akan kembali ke…",
        options: ["Seluruh tubuh", "Jantung", "Ginjal", "Otak"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "peredaran-besar",
    title: "Peredaran Darah Besar",
    subtitle: "Petualangan Panjang",
    description:
      'Siap keliling dunia? Ini disebut "Sistem Sistemik". Dimulai dari Bilik Kiri Jantung yang memompa sekuat tenaga, darah bersih meluncur ke SELURUH TUBUH! Dari ujung kepala sampai ujung kaki. Tugasnya mengantar paket Oksigen dan Nutrisi agar otak bisa berpikir, tangan bisa menulis, dan kaki bisa berlari. Setelah paket diantar, darah mengambil sisa kotoran dari sel tubuh, lalu kembali pulang ke jantung untuk dibersihkan lagi.',

    fullContent: `Peredaran darah besar adalah perjalanan darah bersih dari jantung ke seluruh tubuh. Darah ini membawa oksigen dan makanan, seperti kurir yang mengantar energi ke setiap bagian tubuh.

Dimulai dari bilik kiri jantung yang memompa sekuat tenaga, darah kaya oksigen mengalir melalui aorta (arteri terbesar) kemudian bercabang ke seluruh tubuh:
- Ke otak agar bisa berpikir
- Ke tangan agar bisa menulis dan bekerja
- Ke kaki agar bisa berlari dan berjalan
- Ke semua organ penting lainnya

Setelah mengantarkan oksigen dan nutrisi, darah mengambil kembali karbon dioksida dan limbah metabolisme dari sel-sel tubuh. Darah yang sudah "kotor" ini kemudian kembali ke jantung melalui vena untuk dibersihkan lagi di paru-paru.

Perjalanan ini terjadi terus-menerus tanpa henti, sehingga tubuh kita bisa bergerak, berpikir, dan beraktivitas dengan baik setiap hari.`,

    funFacts: [
      "🌍 Darah menyelesaikan satu putaran penuh ke seluruh tubuh hanya dalam 60 detik!",
      "🧠 Otak menggunakan 20% dari seluruh oksigen yang kamu hirup",
      "💪 Otot yang bekerja keras membutuhkan lebih banyak darah - makanya wajahmu merah saat olahraga!",
      "🎯 Jantung memompa sekitar 5 liter darah per menit saat istirahat",
      "🏃 Saat berolahraga, jantung bisa memompa hingga 25 liter per menit!",
    ],

    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop",
    modelUrl: modelTubuh,
    color: "bg-orange-500",
    bgGradient: "from-orange-100 to-orange-300",

    quiz: [
      {
        question:
          "Peredaran darah besar adalah peredaran darah dari jantung ke seluruh tubuh dan kembali lagi ke jantung. Peredaran darah besar dimulai dari…",
        options: ["Serambi kanan", "Bilik kanan", "Serambi kiri", "Bilik kiri"],
        correctIndex: 3,
      },
      {
        question: "Fungsi utama peredaran darah besar adalah…",
        options: [
          "Mengedarkan darah ke paru-paru",
          "Mengangkut oksigen dan zat makanan ke seluruh tubuh",
          "Membersihkan darah di ginjal",
          "Mengatur suhu tubuh",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Pembuluh darah yang membawa darah kaya oksigen dari jantung ke seluruh tubuh disebut…",
        options: ["Vena", "Kapiler", "Arteri", "Serambi"],
        correctIndex: 2,
      },
      {
        question: "Urutan peredaran darah besar yang tepat adalah…",
        options: [
          "Jantung → paru-paru → seluruh tubuh → jantung",
          "Jantung → seluruh tubuh → jantung",
          "Paru-paru → jantung → seluruh tubuh",
          "Seluruh tubuh → paru-paru → jantung",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Darah yang kembali ke jantung setelah mengedarkan oksigen ke seluruh tubuh mengandung banyak…",
        options: ["Oksigen", "Karbon dioksida", "Zat makanan", "Air"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "fungsi-manfaat",
    title: "8 Kekuatan Super",
    subtitle: "Fungsi & Kesehatan",
    description:
      "Tahukah kamu? Sistem ini punya 8 Kekuatan Super: Mengantar Oksigen napas, Mengantar Makanan untuk energi, Membuang Sampah dari tubuh, Menjadi Perisai melawan penyakit, Mengatur Suhu tubuh agar tetap hangat, Mengantar surat perintah (Hormon), Menjaga Tekanan darah stabil, dan Menyembuhkan Luka dengan cepat. Wah, hebat sekali ya kerjanya!",

    fullContent: `Sistem peredaran darah memiliki 8 fungsi super penting:

1. MENGANTAR OKSIGEN: Membawa oksigen dari paru-paru ke seluruh sel tubuh
2. MENGANTAR NUTRISI: Mendistribusikan makanan dan vitamin untuk energi
3. MEMBUANG LIMBAH: Mengangkut karbon dioksida dan zat sisa ke organ pembuangan
4. PERTAHANAN TUBUH: Sel darah putih melawan kuman dan penyakit
5. MENGATUR SUHU: Menjaga tubuh tetap hangat atau dingin sesuai kebutuhan
6. TRANSPORTASI HORMON: Mengirim "pesan kimia" ke organ-organ penting
7. MENJAGA TEKANAN: Memastikan darah mengalir dengan tekanan yang tepat
8. PENYEMBUHAN LUKA: Keping darah membantu menutup luka dengan cepat

Tips menjaga kesehatan jantung:
- Bergerak aktif dan berolahraga ringan
- Makan buah dan sayur bergizi
- Tidur cukup 8-10 jam per hari
- Minum air putih yang cukup
- Kurangi makanan manis dan berlemak`,

    funFacts: [
      "💪 Jantung adalah otot terkuat di tubuhmu!",
      "🍎 Makan apel setiap hari baik untuk kesehatan jantung",
      "😄 Tertawa membuat jantung lebih sehat!",
      "💧 Minum 6-8 gelas air per hari membantu darah mengalir lancar",
      "🏃 30 menit olahraga sehari bisa menambah 5 tahun hidupmu!",
      "🌙 Tidur cukup membuat jantung beristirahat dan pulih",
      "🥗 Sayuran hijau penuh vitamin untuk jantung kuat",
    ],

    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop",

    modelUrl: modelSehat,
    color: "bg-green-500",
    bgGradient: "from-green-100 to-green-300",

    quiz: [
      {
        question: "Berapa 'Kekuatan Super' (Fungsi) yang disebutkan?",
        options: ["3", "5", "8", "10"],
        correctIndex: 2,
      },
      {
        question: "Apa fungsi darah terkait suhu tubuh?",
        options: [
          "Mendinginkan",
          "Mengatur suhu (Hangat)",
          "Membekukan",
          "Memanaskan berlebih",
        ],
        correctIndex: 1,
      },
      {
        question: "Apa yang dimaksud dengan 'Perisai' tubuh?",
        options: [
          "Melawan penyakit",
          "Melindungi kulit",
          "Memakai baju besi",
          "Menahan pukulan",
        ],
        correctIndex: 0,
      },
      {
        question: "Apa itu 'surat perintah' yang diantar darah?",
        options: ["Surat pos", "Hormon", "Email", "Nutrisi"],
        correctIndex: 1,
      },
      {
        question: "Fungsi ke-8 adalah menyembuhkan...",
        options: ["Patah hati", "Luka", "Rasa lapar", "Rasa kantuk"],
        correctIndex: 1,
      },
    ],
  },
];
