<template>
  <div
    class="min-h-screen relative overflow-hidden font-['Fredoka'] selection:bg-pink-300 selection:text-white bg-[#E0F7FA]"
  >
    <component is="style">
      @import
      url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;600;700&display=swap');
    </component>

    <!-- Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        :class="`absolute inset-0 bg-gradient-to-b ${
          card?.bgGradient || 'from-sky-200 via-white to-sky-100'
        } opacity-80`"
      ></div>

      <div
        v-for="n in 15"
        :key="n"
        class="absolute opacity-40 animate-float-random filter blur-[0.5px]"
        :style="getRandomStyle()"
      >
        {{ getThemeIcon(card?.id) }}
      </div>
    </div>
    <!-- Loading State -->
    <div
      v-if="!card"
      class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md"
    >
      <div class="text-9xl animate-bounce">🤔</div>
      <h2 class="mt-6 text-3xl font-black text-blue-500 tracking-wider">
        Sedang Menyiapkan...
      </h2>
    </div>

    <template v-else>
      <!-- Sketchfab 3D Model Viewer (TAMPILAN NORMAL) -->
      <div v-show="!isARMode" class="absolute inset-0 z-10 w-full h-full">
        <iframe
          :src="getSketchfabUrl()"
          :title="card.title"
          frameborder="0"
          allowfullscreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking; vr; camera"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          class="w-full h-full"
          style="background: transparent"
        ></iframe>

        <!-- Hint untuk user -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 animate-fade-in-out z-20"
        >
          <div
            class="bg-black/50 text-white px-4 py-2 rounded-full font-bold backdrop-blur-sm"
          >
            👆 Putar aku!
          </div>
        </div>
      </div>

      <!-- AR MODE - Video Background + Three.js Model -->
      <div
        v-show="isARMode"
        class="absolute inset-0 z-10 w-full h-full bg-black"
      >
        <!-- Video Background (Kamera) -->
        <video
          ref="videoRef"
          autoplay
          playsinline
          class="absolute inset-0 w-full h-full object-cover"
        ></video>

        <!-- Three.js Canvas (Model 3D di atas video) -->
        <canvas
          ref="canvasRef"
          class="absolute inset-0 w-full h-full"
          style="pointer-events: auto"
        ></canvas>

        <!-- AR Loading Indicator -->
        <div
          v-if="isLoadingAR"
          class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-30"
        >
          <div class="text-center">
            <div class="text-6xl mb-4 animate-bounce">📸</div>
            <p class="text-white font-black text-lg">Mengaktifkan Kamera...</p>
          </div>
        </div>

        <!-- Camera Error -->
        <div
          v-if="cameraError"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-6 py-4 rounded-2xl font-black text-center max-w-md z-30"
        >
          <div class="text-4xl mb-2">⚠️</div>
          <p class="text-sm">{{ cameraError }}</p>
        </div>
      </div>

      <!-- Top Bar -->
      <div class="absolute top-0 left-0 w-full p-3 md:p-6 z-50">
        <div class="flex items-center justify-between gap-2">
          <!-- Back Button (hanya muncul saat BUKAN AR mode) -->
          <button
            v-if="!isARMode"
            @click="router.back()"
            class="group pointer-events-auto"
          >
            <div
              class="bg-white border-[3px] border-slate-800 shadow-[4px_4px_0_#1e293b] active:shadow-none active:translate-x-1 active:translate-y-1 p-2.5 md:p-3 rounded-2xl transition-all flex items-center justify-center hover:bg-red-100 group-hover:rotate-3"
            >
              <ArrowLeft
                class="w-6 h-6 md:w-8 md:h-8 text-slate-800"
                stroke-width="4"
              />
            </div>
          </button>

          <!-- Title Badge + AR Button Container -->
          <div class="flex flex-col items-end gap-2 flex-1">
            <!-- Title Badge -->
            <div
              class="bg-white/90 backdrop-blur-sm border-[3px] border-blue-400 shadow-[4px_4px_0_#60A5FA] px-4 py-2 md:px-6 md:py-3 rounded-[2rem] transform -rotate-2 animate-float-y pointer-events-auto"
            >
              <div
                class="text-[10px] md:text-xs font-black text-blue-400 uppercase tracking-widest mb-0.5 md:mb-1"
              >
                {{ isARMode ? "📸 AR Aktif" : "🔍 Model 3D" }}
              </div>
              <div
                class="text-base md:text-3xl font-black text-slate-700 leading-none"
              >
                {{ card?.title }}
              </div>
            </div>

            <!-- AR Button -->
            <button
              @click="toggleAR"
              :class="`${
                isARMode
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400'
              } text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full font-black text-xs md:text-sm shadow-[3px_3px_0_#000] border-2 border-white transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center gap-2 animate-float-y pointer-events-auto`"
            >
              <span class="text-base md:text-lg">{{
                isARMode ? "❌" : "📱"
              }}</span>
              <span>{{ isARMode ? "TUTUP AR" : "AR MODE" }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- AR Development Modal -->
      <transition name="modal-fade">
        <div
          v-if="showARModal"
          @click="showARModal = false"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div
            @click.stop
            class="bg-white rounded-3xl border-4 border-slate-800 shadow-[8px_8px_0_#000] p-6 md:p-8 max-w-md w-full transform transition-all"
            :class="showARModal ? 'scale-100 rotate-0' : 'scale-75 rotate-12'"
          >
            <div class="text-center">
              <div class="text-7xl mb-4 animate-bounce-slow">🚧</div>
              <h3 class="text-2xl md:text-3xl font-black text-slate-800 mb-3">
                Sabar Ya!
              </h3>
              <p
                class="text-slate-600 font-bold text-base md:text-lg mb-6 leading-relaxed"
              >
                Fitur AR untuk
                <span class="text-blue-500">Pembuluh Darah</span> masih dalam
                tahap pengembangan!
              </p>

              <div
                class="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 rounded-xl p-4 mb-6"
              >
                <p class="text-sm font-bold text-slate-700">
                  💡 Tip: Kamu bisa coba fitur AR di model yang lain dulu!
                </p>
              </div>

              <button
                @click="showARModal = false"
                class="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white py-4 rounded-2xl font-black text-lg border-b-4 border-purple-700 shadow-lg active:translate-y-1 active:border-b-0 transition-all"
              >
                OKE, SIAP! 🙏
              </button>
            </div>
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>
<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { cardsData } from "../data/cards";
import { ArrowLeft } from "lucide-vue-next";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const route = useRoute();
const router = useRouter();
const card = computed(() => cardsData.find((c) => c.id === route.params.id));

// AR State
const isARMode = ref(false);
const isLoadingAR = ref(false);
const cameraError = ref(null);
const videoRef = ref(null);
const canvasRef = ref(null);
const showARModal = ref(false);

// Three.js variables
let scene, camera, renderer, controls, model;
let stream = null;

// Mapping Sketchfab model IDs
const sketchfabModels = {
  jantung: "b4823f17e22047ae9d92b2380cd8af18",
  "pembuluh-darah": "b8f3b4d3dc9747ff8caab36ba360ccd3",
  darah: "e01a1817341c41cd849bed62a29e949b",
  "peredaran-kecil": "a8abc9df1d454ccf82242c43c9fe29f0",
  "peredaran-besar": "a8abc9df1d454ccf82242c43c9fe29f0",
  "fungsi-manfaat": "ceb72b4da5e84a0a82c56dfeb888e396",
};

// Mapping model lokal untuk AR
const arModelPaths = {
  jantung: new URL("../assets/models/heart.glb", import.meta.url).href,
  darah: new URL("../assets/models/health.glb", import.meta.url).href,
  "peredaran-kecil": new URL(
    "../assets/models/circulation-system.glb",
    import.meta.url
  ).href,
  "peredaran-besar": new URL(
    "../assets/models/circulation-system.glb",
    import.meta.url
  ).href,
  "fungsi-manfaat": new URL("../assets/models/kids.glb", import.meta.url).href,
};

const getSketchfabUrl = () => {
  if (!card.value) return "";
  const modelId = sketchfabModels[card.value.id];
  if (!modelId) return "";
  return `https://sketchfab.com/models/${modelId}/embed?autostart=1&transparent=1&ui_theme=dark&dnt=1&annotations_visible=1`;
};

const getARModelPath = () => {
  if (!card.value) return "";
  return arModelPaths[card.value.id] || "";
};

// --- AR FUNCTIONS ---
const toggleAR = async () => {
  if (card.value.id === "pembuluh-darah") {
    showARModal.value = true;
    return;
  }

  if (!getARModelPath()) {
    alert("❌ Model 3D untuk AR belum tersedia.");
    return;
  }

  if (!isARMode.value) {
    await startAR();
  } else {
    stopAR();
  }
};

const startAR = async () => {
  isLoadingAR.value = true;
  cameraError.value = null;

  try {
    // Request camera
    const constraints = {
      video: {
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    };

    stream = await navigator.mediaDevices.getUserMedia(constraints);

    if (videoRef.value) {
      videoRef.value.srcObject = stream;

      videoRef.value.onloadedmetadata = () => {
        videoRef.value.play();
        isARMode.value = true;
        isLoadingAR.value = false;

        // Initialize Three.js setelah video siap
        setTimeout(() => {
          initThreeAR();
        }, 100);
      };
    }
  } catch (err) {
    console.error("AR Camera Error:", err);
    cameraError.value =
      "Gagal mengakses kamera. Pastikan Anda memberikan izin kamera.";
    isLoadingAR.value = false;
  }
};

const stopAR = () => {
  // Stop camera stream
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }
  if (videoRef.value) {
    videoRef.value.srcObject = null;
  }

  // Cleanup Three.js
  if (renderer) {
    renderer.dispose();
    if (controls) controls.dispose();
    if (scene) {
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
    renderer = null;
    scene = null;
    camera = null;
    controls = null;
    model = null;
  }

  isARMode.value = false;
  cameraError.value = null;
};

const initThreeAR = () => {
  if (!canvasRef.value) return;

  const w = window.innerWidth;
  const h = window.innerHeight;

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
  camera.position.set(0, 0, 3);

  // Renderer dengan alpha (transparan)
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0); // Transparan

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enablePan = false;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight2.position.set(-5, -5, -5);
  scene.add(directionalLight2);

  // Load Model
  const loader = new GLTFLoader();
  loader.load(
    getARModelPath(),
    (gltf) => {
      model = gltf.scene;

      // Scale model agar pas
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      model.scale.multiplyScalar(scale);

      // Center model
      box.setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      scene.add(model);
    },
    undefined,
    (error) => {
      console.error("Error loading model:", error);
      cameraError.value = "Gagal memuat model 3D.";
    }
  );

  // Animation loop
  const animate = () => {
    if (!isARMode.value) return;
    requestAnimationFrame(animate);

    if (controls) controls.update();
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  };
  animate();

  // Handle resize
  const onResize = () => {
    if (!renderer || !camera) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener("resize", onResize);
};

const getThemeIcon = (id) => {
  if (!id) return "✨";
  if (id.includes("jantung")) return "🫀";
  if (id.includes("pembuluh")) return "💉";
  if (id.includes("darah")) return "🩸";
  if (id.includes("paru") || id.includes("kecil")) return "🌬️";
  if (id.includes("besar")) return "🧠";
  if (id.includes("sehat")) return "🥗";
  return "🌟";
};

const getRandomStyle = () => {
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const size = Math.random() * 3 + 2;
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 5;
  return {
    top: `${top}%`,
    left: `${left}%`,
    fontSize: `${size}rem`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  };
};

onUnmounted(() => {
  stopAR();
});
</script>
<style scoped>
@keyframes floatRandom {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 0.3;
  }
  80% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-120px) rotate(360deg);
    opacity: 0;
  }
}
.animate-float-random {
  animation: floatRandom linear infinite;
}

@keyframes floatY {
  0%,
  100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-6px) rotate(-2deg);
  }
}
.animate-float-y {
  animation: floatY 3s infinite ease-in-out;
}

@keyframes fadeOut {
  0% {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  80% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
}
.animate-fade-in-out {
  animation: fadeOut 4s ease-out forwards;
  animation-delay: 1s;
}

@keyframes bounceSlow {
  0%,
  100% {
    transform: translateY(0) rotate(2deg);
  }
  50% {
    transform: translateY(-10px) rotate(-2deg);
  }
}
.animate-bounce-slow {
  animation: bounceSlow 2s infinite ease-in-out;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .bg-white,
.modal-fade-leave-to .bg-white {
  transform: scale(0.8) rotate(12deg);
}
</style>
