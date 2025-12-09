<template>
  <div class="min-h-screen md:h-screen w-full bg-[#E0F7FA] font-['Fredoka'] text-slate-800 relative flex flex-col overflow-y-auto md:overflow-hidden selection:bg-pink-300 selection:text-white pb-24 md:pb-0">
    
    <component is="style">
      @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;600;700&display=swap');
    </component>

    <div class="absolute inset-0 opacity-10 pointer-events-none" 
         style="background-image: radial-gradient(#2DD4BF 3px, transparent 3px); background-size: 24px 24px;">
    </div>

    <nav class="fixed md:absolute top-0 left-0 w-full z-50 px-4 py-3 flex justify-between md:justify-center pointer-events-none transition-all duration-300 bg-[#E0F7FA]/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b-2 border-slate-200 md:border-0">
      <div class="bg-white/90 backdrop-blur-md border-b-4 border-r-4 border-blue-400 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-xl flex items-center gap-3 pointer-events-auto transition-transform hover:scale-105">
        <span class="text-2xl md:text-4xl animate-bounce">🎒</span>
        <div>
          <h1 class="text-lg md:text-2xl font-black text-blue-500 tracking-wide leading-none">
            PETUALANGAN<span class="text-pink-500">.</span>TUBUH
          </h1>
        </div>
      </div>
    </nav>

    <div class="flex-1 flex flex-col md:flex-row w-full h-auto md:h-full pt-24 px-4 md:pt-24 md:pb-6 md:px-6 gap-5 md:gap-4">
      
      <div 
        v-for="(card, index) in cardList" 
        :key="card.id"
        class="group relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
               rounded-3xl border-4 border-slate-900 cursor-pointer overflow-hidden shadow-lg
               flex flex-col md:flex-row bg-white flex-shrink-0"
        :class="[
           // Mobile Active: Tinggi 650px (Lebih lega)
           activeCardId === card.id ? 'h-[650px]' : 'h-32',
           // Desktop Logic
           'md:h-full',
           activeCardId === card.id ? 'md:flex-[10] z-20 shadow-2xl ring-4 ring-yellow-400 ring-offset-2 ring-offset-[#E0F7FA]' : 'md:flex-[2] md:hover:flex-[3]',
        ]"
        @click="handleCardClick(card.id)"
        @mouseenter="handleMouseEnter(card.id)"
        @mouseleave="handleMouseLeave"
      >
        
        <div class="relative transition-all duration-700 overflow-hidden"
             :class="[
               // Mobile: Gambar 35%
               activeCardId === card.id ? 'h-[35%]' : 'h-full',
               // Desktop
               activeCardId === card.id ? 'md:h-full md:flex-[1]' : 'md:h-full md:flex-[3]'
             ]">
             
          <div class="absolute inset-0 transition-colors duration-500" :class="card.bgColor"></div>
          
          <img 
            :src="card.image" 
            class="absolute inset-0 w-full h-full object-cover mix-blend-overlay transition-all duration-1000"
            :class="activeCardId === card.id ? 'opacity-60 scale-110' : 'opacity-30 scale-100 grayscale'"
          >

          <span class="absolute top-2 left-3 md:top-4 md:left-4 text-3xl md:text-5xl font-black text-white/50 select-none z-10">
            {{ index + 1 }}
          </span>

          <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 z-20"
               :class="activeCardId === card.id ? 'opacity-0 scale-50' : 'opacity-100 scale-100 animate-wiggle'">
            <div class="bg-white/20 backdrop-blur-sm p-3 md:p-4 rounded-full border-[3px] border-white shadow-sm">
               <span class="text-3xl md:text-4xl filter drop-shadow-md">
                 {{ getEmoji(card.id) }}
               </span>
            </div>
          </div>

          <div class="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none transition-opacity duration-300 z-20"
               :class="activeCardId === card.id ? 'opacity-0' : 'opacity-100'">
             <h3 class="text-xl lg:text-3xl font-black text-white tracking-widest -rotate-90 uppercase drop-shadow-md whitespace-nowrap">
               {{ card.title }}
             </h3>
          </div>

           <div class="md:hidden absolute bottom-4 w-full text-center transition-opacity duration-300 z-20 px-4"
               :class="activeCardId === card.id ? 'opacity-0' : 'opacity-100'">
             <div class="bg-white/20 backdrop-blur-md rounded-xl py-1 px-3 border border-white/30 inline-block">
               <span class="text-white text-lg font-black uppercase drop-shadow-md tracking-wide leading-none">
                 {{ card.title }}
               </span>
             </div>
          </div>
        </div>


        <div class="relative flex flex-col justify-center bg-white transition-all duration-700 overflow-hidden border-l-0 md:border-l-4 border-slate-100"
             :class="[
               activeCardId === card.id ? 'flex-1 opacity-100 p-6 md:p-10' : 'h-0 p-0 opacity-0',
               activeCardId === card.id ? 'md:h-full md:flex-[1]' : 'md:h-full md:flex-[1]'
             ]">
          
          <div class="flex flex-col h-full justify-center overflow-y-auto no-scrollbar min-w-[200px] transition-opacity duration-500 delay-100 pb-4"
               :class="activeCardId === card.id ? 'opacity-100' : 'opacity-0'">
             
             <div class="inline-block self-start bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 shrink-0">
               {{ card.subtitle }}
             </div>

             <h2 class="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-4 shrink-0">
               {{ card.title }}
             </h2>

             <p class="text-slate-500 text-base md:text-lg font-bold leading-relaxed mb-8">
               {{ card.description }}
             </p>

             <div class="mt-auto shrink-0 pt-2">
               <button 
                 @click.stop="goToDetail(card.id)" 
                 class="w-full bg-[#FFD93D] hover:bg-[#FFC107] text-slate-900 border-b-[6px] border-yellow-600 active:border-b-0 active:translate-y-2 px-6 py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2 transition-all group-btn"
               >
                 <span>MULAI</span>
                 <span class="group-btn-hover:rotate-12 transition-transform text-xl">🚀</span>
               </button>
             </div>
          </div>

        </div>

      </div>

      <div class="h-24 w-full md:hidden flex-shrink-0"></div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Ganti path ini sesuai project Anda
// import { cardsData } from '../data/cards'; 

// DATA DUMMY UNTUK CONTOH (Hapus jika sudah import)
const cardsData = [
  { 
    id: 'jantung', 
    title: 'JANTUNG: MESIN AJAIB', 
    subtitle: 'Sistem Kardiovaskular',
    description: 'Jantungmu bekerja tanpa henti memompa darah ke seluruh tubuh! Temukan bagaimana otot super ini bekerja 24 jam sehari.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-[#FF4757]', 
  },
  { 
    id: 'pembuluh-darah', 
    title: 'PEMBULUH DARAH', 
    subtitle: 'Jalan Raya Tubuh',
    description: 'Bayangkan jalan tol super panjang di dalam tubuhmu! Pembuluh darah mengantar nutrisi dan oksigen ke setiap sel.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-[#5352ED]', 
  },
  { 
    id: 'darah', 
    title: 'DARAH & PASUKANNYA', 
    subtitle: 'Sistem Pertahanan',
    description: 'Darah bukan cuma cairan merah! Ada pasukan sel darah putih yang siap melawan kuman jahat yang masuk.',
    image: 'https://plus.unsplash.com/premium_photo-1675802562758-005663584347?auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-[#FF6B6B]', 
  },
  { 
    id: 'peredaran-kecil', 
    title: 'PEREDARAN KECIL', 
    subtitle: 'Menuju Paru-paru',
    description: 'Perjalanan singkat namun penting! Darah pergi ke paru-paru untuk mengambil oksigen segar dan membuang nafas kotor.',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-[#48DBFB]', 
  },
  { 
    id: 'peredaran-besar', 
    title: 'PEREDARAN BESAR', 
    subtitle: 'Keliling Tubuh',
    description: 'Waktunya jalan-jalan jauh! Darah kaya oksigen diantar dari ujung kepala sampai ujung kaki agar kita bisa bergerak.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-[#FFA502]', 
  },
  { 
    id: 'fungsi-manfaat', 
    title: '8 KEKUATAN SUPER', 
    subtitle: 'Tips Kesehatan',
    description: 'Ingin tubuhmu sekuat superhero? Pelajari 8 rahasia makanan dan aktivitas agar jantungmu tetap kuat!',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-[#2ED573]', 
  },
];

const router = useRouter();
const cardList = cardsData;
const activeCardId = ref(null);

const goToDetail = (id) => {
  router.push(`/card/${id}`);
};

const handleMouseEnter = (id) => {
  if (window.innerWidth >= 768) {
    activeCardId.value = id;
  }
};

const handleMouseLeave = () => {
  if (window.innerWidth >= 768) {
    activeCardId.value = null;
  }
};

const handleCardClick = (id) => {
  if (window.innerWidth >= 768) {
    goToDetail(id);
  } else {
    // Mobile: Toggle Buka/Tutup
    if (activeCardId.value === id) {
      activeCardId.value = null; 
    } else {
      activeCardId.value = id; 
      // Auto Scroll agar kartu terlihat penuh (delay sedikit agar animasi jalan dulu)
      setTimeout(() => {
        const el = document.activeElement; // Atau target event
        if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }
};

const getEmoji = (id) => {
  if (id.includes('jantung')) return '❤️';
  if (id.includes('pembuluh')) return '🛣️';
  if (id.includes('darah')) return '🩸';
  if (id.includes('kecil') || id.includes('paru')) return '🌬️';
  if (id.includes('besar') || id.includes('tubuh')) return '🏃';
  if (id.includes('sehat')) return '🥗';
  return '✨';
};
</script>

<style scoped>
@keyframes wiggle {
  0%, 100% { transform: rotate(-8deg); }
  50% { transform: rotate(8deg); }
}
.animate-wiggle {
  animation: wiggle 2s ease-in-out infinite;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>