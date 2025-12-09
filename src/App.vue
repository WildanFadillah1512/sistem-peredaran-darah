<template>
  <div class="fixed inset-0 w-full h-full overflow-hidden bg-[#FFF9F0]">
    
    <div class="absolute inset-0 pointer-events-none z-0">
       <div class="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-yellow-300/20 blur-[100px] rounded-full animate-pulse-slow"></div>
       <div class="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-blue-300/20 blur-[100px] rounded-full animate-pulse-slow" style="animation-delay: 2s;"></div>
    </div>

    <router-view v-slot="{ Component }">
      <transition name="fly-zoom" mode="out-in">
        <component 
          :is="Component" 
          class="absolute inset-0 w-full h-full z-10 overflow-hidden" 
        />
      </transition>
    </router-view>
    
  </div>
</template>

<style>
/* Reset Dasar */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #FFF9F0;
  /* Mencegah efek bounce scroll di iOS (Penting untuk app feel) */
  overscroll-behavior: none; 
  /* Kunci scroll body agar yang scroll hanya elemen di dalam Vue */
  overflow: hidden; 
}

/* --- ANIMASI TRANSISI HALAMAN (FLY ZOOM) --- */
.fly-zoom-enter-active {
  animation: fly-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); /* Lebih smooth */
  z-index: 50;
  transform-origin: center bottom;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* Shadow saat melayang */
}

.fly-zoom-leave-active {
  animation: fly-out 0.4s ease-in;
  z-index: 0;
  pointer-events: none; /* Mencegah klik saat halaman keluar */
}

@keyframes fly-in {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(40px);
    border-radius: 24px; /* Efek kartu saat masuk */
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    border-radius: 0px;
  }
}

@keyframes fly-out {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px);
  }
  100% {
    opacity: 0;
    transform: scale(0.95);
    filter: blur(4px);
  }
}

@keyframes pulseSlow {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.5; }
}
.animate-pulse-slow {
  animation: pulseSlow 8s infinite ease-in-out;
}
</style>