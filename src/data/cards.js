// --- IMPORT MODEL 3D DARI ASSETS ---
// Pastikan file .glb sudah ada di folder src/assets/models/
import modelJantung from '@/assets/models/heart.glb';
import modelParu from '@/assets/models/lungs.glb';
import modelSehat from '@/assets/models/health.glb'; 
// Gunakan placeholder heart.glb jika model spesifik belum ada
import modelPembuluh from '@/assets/models/heart.glb'; 
import modelDarah from '@/assets/models/heart.glb';
import modelTubuh from '@/assets/models/heart.glb';

export const cardsData = [
  {
    id: 'jantung',
    title: 'Jantung: Mesin Ajaib',
    subtitle: 'Pusat Kehidupan',
    description: 'Halo! Aku adalah mesin utama di tubuhmu. Ukuranku sebesar kepalan tanganmu dan aku duduk manis sedikit di kiri dadamu. Aku punya 4 kamar rahasia (ruang) yang bekerja sama: ada yang menerima darah masuk, ada yang mendorongnya keluar. Pintu-pintu kamarku disebut "Katup" agar darah tidak salah jalan! Tubuhku dibungkus selimut pelindung bernama "Perikardium" agar aku aman dari gesekan. Hebatnya, aku punya listrik alami sendiri yang membuatku berdetak ribuan kali sehari tanpa henti, bahkan saat kamu tidur lelap!',
    
    // IMAGE (Wajib ada untuk HomeView)
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1000&auto=format&fit=crop',
    
    modelUrl: modelJantung, 
    color: 'bg-rose-500',
    bgGradient: 'from-rose-100 to-rose-300',

    // QUIZ (5 Soal)
    quiz: [
      {
        question: "Berapa jumlah ruang rahasia yang dimiliki jantung?",
        options: ["2 Ruang", "4 Ruang", "6 Ruang", "1 Ruang"],
        correctIndex: 1
      },
      {
        question: "Apa nama selimut pelindung jantung?",
        options: ["Perikardium", "Helm", "Jaket", "Membran"],
        correctIndex: 0
      },
      {
        question: "Apa fungsi 'Katup' pada jantung?",
        options: ["Memompa darah", "Agar darah tidak salah jalan", "Membuat listrik", "Menyaring racun"],
        correctIndex: 1
      },
      {
        question: "Di mana letak jantungmu?",
        options: ["Di perut kanan", "Di dada sedikit ke kiri", "Di kepala", "Di punggung"],
        correctIndex: 1
      },
      {
        question: "Apakah jantung berhenti saat kita tidur?",
        options: ["Ya, ikut tidur", "Berhenti sebentar", "Tidak, terus berdetak", "Kadang-kadang"],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'pembuluh-darah',
    title: 'Pembuluh Darah',
    subtitle: 'Jalan Raya Tubuh',
    description: 'Kami adalah jaringan jalan raya super canggih di tubuhmu! Kami punya 3 jalur khusus: 1. ARTERI: Jalan tol besar yang tebal dan elastis, bertugas membawa darah bersih keluar dari jantung (Arteri terbesar namanya Aorta!). 2. VENA: Jalan balik menuju jantung, kami punya pintu satu arah agar darah tidak mundur. 3. KAPILER: Jalan tikus yang super tipis (setipis rambut!), di sinilah oksigen dan makanan diserahkan langsung ke sel-sel tubuhmu dan sampah diambil.',
    
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop',

    modelUrl: modelPembuluh,
    color: 'bg-blue-500',
    bgGradient: 'from-blue-100 to-blue-300',

    quiz: [
      {
        question: "Apa nama pembuluh darah yang membawa darah keluar dari jantung?",
        options: ["Vena", "Kapiler", "Arteri", "Selokan"],
        correctIndex: 2
      },
      {
        question: "Apa nama arteri terbesar di tubuh?",
        options: ["Aorta", "Vena Cava", "Nadi", "Pipa"],
        correctIndex: 0
      },
      {
        question: "Pembuluh mana yang memiliki katup satu arah (jalan balik)?",
        options: ["Arteri", "Vena", "Kapiler", "Paru-paru"],
        correctIndex: 1
      },
      {
        question: "Pembuluh darah yang setipis rambut disebut...",
        options: ["Aorta", "Vena", "Kapiler", "Jantung"],
        correctIndex: 2
      },
      {
        question: "Di mana pertukaran oksigen dan makanan ke sel terjadi?",
        options: ["Di Arteri", "Di Vena", "Di Kapiler", "Di Kulit"],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'darah',
    title: 'Darah & Pasukannya',
    subtitle: 'Kurir Kehidupan',
    description: 'Aku bukan sekadar cairan merah biasa! Di dalamku ada pasukan pahlawan: Si MERAH (Eritrosit) yang menggendong oksigen ke seluruh tubuh, Si PUTIH (Leukosit) tentara gagah yang berperang melawan kuman penyakit, dan KEPING DARAH (Platelet) si tukang tambal yang menutup lukamu agar berhenti berdarah saat kamu jatuh. Selain itu, aku juga membawa sari-sari makanan (Nutrisi) biar kamu tumbuh besar, pintar, dan kuat!',
    
    image: 'https://images.unsplash.com/photo-1615631648086-325025c9e51e?q=80&w=1000&auto=format&fit=crop',

    modelUrl: modelDarah,
    color: 'bg-red-600',
    bgGradient: 'from-red-100 to-red-300',

    quiz: [
      {
        question: "Siapa yang bertugas membawa oksigen?",
        options: ["Si Putih", "Si Merah", "Keping Darah", "Plasma"],
        correctIndex: 1
      },
      {
        question: "Siapa pasukan yang melawan kuman penyakit?",
        options: ["Si Merah", "Si Putih", "Nutrisi", "Air"],
        correctIndex: 1
      },
      {
        question: "Siapa 'tukang tambal' saat kamu terluka?",
        options: ["Keping Darah", "Si Merah", "Si Putih", "Oksigen"],
        correctIndex: 0
      },
      {
        question: "Nama ilmiah sel darah merah adalah...",
        options: ["Leukosit", "Trombosit", "Eritrosit", "Parasit"],
        correctIndex: 2
      },
      {
        question: "Selain oksigen, apa lagi yang dibawa darah?",
        options: ["Mainan", "Sari Makanan (Nutrisi)", "Udara kotor", "Batu"],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'peredaran-kecil',
    title: 'Peredaran Darah Kecil',
    subtitle: 'Misi Isi Ulang',
    description: 'Ini adalah misi penyelamatan napas! Disebut juga "Sistem Pulmoner". Perjalanannya pendek tapi sangat penting: Darah yang membawa sampah napas (Karbon Dioksida) berangkat dari Jantung menuju Paru-Paru. Di sana, sampah itu dibuang saat kamu menghembuskan napas, dan diganti dengan Oksigen segar saat kamu menghirup udara. Setelah darah bersih dan penuh oksigen, ia kembali lagi ke Jantung, siap untuk petualangan besar!',
    
    image: 'https://plus.unsplash.com/premium_photo-1675808564264-5006b5278453?q=80&w=1000&auto=format&fit=crop',

    modelUrl: modelParu,
    color: 'bg-sky-400',
    bgGradient: 'from-sky-100 to-sky-300',

    quiz: [
      {
        question: "Peredaran darah kecil menghubungkan Jantung dengan...",
        options: ["Otak", "Kaki", "Paru-Paru", "Perut"],
        correctIndex: 2
      },
      {
        question: "Apa sampah yang dibuang di paru-paru?",
        options: ["Oksigen", "Karbon Dioksida", "Nutrisi", "Air"],
        correctIndex: 1
      },
      {
        question: "Apa yang diambil darah dari paru-paru?",
        options: ["Oksigen Segar", "Debu", "Karbon Dioksida", "Darah Kotor"],
        correctIndex: 0
      },
      {
        question: "Nama lain peredaran darah kecil adalah sistem...",
        options: ["Sistemik", "Pulmoner", "Pencernaan", "Syaraf"],
        correctIndex: 1
      },
      {
        question: "Ke mana darah pergi setelah dari paru-paru?",
        options: ["Keluar tubuh", "Ke Kaki", "Kembali ke Jantung", "Ke Usus"],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'peredaran-besar',
    title: 'Peredaran Darah Besar',
    subtitle: 'Petualangan Panjang',
    description: 'Siap keliling dunia? Ini disebut "Sistem Sistemik". Dimulai dari Bilik Kiri Jantung yang memompa sekuat tenaga, darah bersih meluncur ke SELURUH TUBUH! Dari ujung kepala sampai ujung kaki. Tugasnya mengantar paket Oksigen dan Nutrisi agar otak bisa berpikir, tangan bisa menulis, dan kaki bisa berlari. Setelah paket diantar, darah mengambil sisa kotoran dari sel tubuh, lalu kembali pulang ke jantung untuk dibersihkan lagi.',
    
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop',
    modelUrl: modelTubuh,
    color: 'bg-orange-500',
    bgGradient: 'from-orange-100 to-orange-300',

    quiz: [
      {
        question: "Peredaran darah besar mengalirkan darah ke...",
        options: ["Hanya Paru-paru", "Hanya Otak", "Seluruh Tubuh", "Hanya Kaki"],
        correctIndex: 2
      },
      {
        question: "Dari ruang jantung mana peredaran besar dimulai?",
        options: ["Bilik Kiri", "Serambi Kanan", "Bilik Kanan", "Serambi Kiri"],
        correctIndex: 0
      },
      {
        question: "Apa yang diantar darah ke seluruh tubuh?",
        options: ["Sampah", "Oksigen & Nutrisi", "Racun", "Karbon Dioksida"],
        correctIndex: 1
      },
      {
        question: "Nama lain peredaran darah besar adalah sistem...",
        options: ["Pulmoner", "Sistemik", "Solar", "Limfatik"],
        correctIndex: 1
      },
      {
        question: "Apa yang diambil darah dari sel tubuh?",
        options: ["Makanan", "Sisa kotoran/sampah", "Vitamin", "Oksigen"],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'fungsi-manfaat',
    title: '8 Kekuatan Super',
    subtitle: 'Fungsi Utama',
    description: 'Tahukah kamu? Sistem ini punya 8 Kekuatan Super: 1. Mengantar Oksigen napas. 2. Mengantar Makanan (Nutrisi) untuk energi. 3. Membuang Sampah (Limbah CO2) dari tubuh. 4. Menjadi Perisai (Sel Darah Putih) melawan penyakit. 5. Mengatur Suhu tubuh agar kamu tetap hangat. 6. Mengantar surat perintah (Hormon). 7. Menjaga Tekanan darah agar stabil. 8. Menyembuhkan Luka dengan cepat. Wah, hebat sekali ya kerjanya!',
    
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop',

    modelUrl: modelSehat,
    color: 'bg-green-500',
    bgGradient: 'from-green-100 to-green-300',

    quiz: [
      {
        question: "Berapa 'Kekuatan Super' (Fungsi) yang disebutkan?",
        options: ["3", "5", "8", "10"],
        correctIndex: 2
      },
      {
        question: "Apa fungsi darah terkait suhu tubuh?",
        options: ["Mendinginkan", "Mengatur suhu (Hangat)", "Membekukan", "Memanaskan berlebih"],
        correctIndex: 1
      },
      {
        question: "Apa yang dimaksud dengan 'Perisai' tubuh?",
        options: ["Melawan penyakit", "Melindungi kulit", "Memakai baju besi", "Menahan pukulan"],
        correctIndex: 0
      },
      {
        question: "Apa itu 'surat perintah' yang diantar darah?",
        options: ["Surat pos", "Hormon", "Email", "Nutrisi"],
        correctIndex: 1
      },
      {
        question: "Fungsi ke-8 adalah menyembuhkan...",
        options: ["Patah hati", "Luka", "Rasa lapar", "Rasa kantuk"],
        correctIndex: 1
      }
    ]
  }
];