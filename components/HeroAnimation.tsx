"use client";

import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 38; // Adjusted to match typical count if 40 files exist but safe limit

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);
  const [frameIndex, setFrameIndex] = useState(1);

  // Preload
  useEffect(() => {
    const loadImages = async () => {
      const uniqueImages: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const promise = new Promise((resolve, reject) => {
          const img = new Image();
          const paddedIndex = i.toString().padStart(3, "0");
          img.src = `/ezgif-frame-${paddedIndex}.jpg`;
          img.onload = () => resolve(img);
          img.onerror = () => reject(); // Silently fail missing frames
          uniqueImages[i] = img;
        });
        promises.push(promise);
      }

      await Promise.allSettled(promises);
      setImages(uniqueImages);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    const index = Math.min(Math.max(Math.round(latest), 1), FRAME_COUNT);
    setFrameIndex(index);
  });

  // Render
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !images[frameIndex]) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[frameIndex];
    if (!img) return;

    // Split layout: canvas takes full size of its container (right half)
    canvas.width = canvas.parentElement?.offsetWidth || 800;
    canvas.height = canvas.parentElement?.offsetHeight || 800;

    // Cover logic
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

  }, [frameIndex, isLoaded, images]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-primary">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row">
        
        {/* LEFT: Content */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 z-20 bg-primary/95 md:bg-transparent">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="max-w-xl"
          >
             <div className="inline-block px-3 py-1 mb-6 rounded-full border border-teal/20 bg-teal/5 text-teal text-xs font-mono tracking-widest">
                SYSTEM OPERATIONAL
             </div>
             <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-none">
               HELIOS <span className="text-accent">AI</span>
             </h1>
             <p className="text-xl text-zinc-400 mb-8 font-light">
               Smetti di guardare immagini. <br/>
               <span className="text-white font-medium">Inizia a incassare garanzie.</span>
             </p>
             
             <div className="border-l-4 border-accent pl-6 py-2">
               <p className="text-sm font-bold text-white uppercase tracking-wider">Founded by Francesco De Rienzo</p>
               <p className="text-xs text-zinc-500 font-mono mt-1">CERTIFIED DRONE PILOT A2 + A3</p>
             </div>
          </motion.div>
        </div>

        {/* RIGHT: Animation */}
        <div className="w-full md:w-1/2 h-full relative bg-zinc-900 overflow-hidden">
             <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
             <canvas ref={canvasRef} className="w-full h-full object-cover relative z-10 opacity-80 mix-blend-screen" />
             
             {/* Tech Overlay */}
             <div className="absolute bottom-8 left-8 z-20 flex gap-4 text-xs font-mono text-teal/80">
                <div>FRAME: {frameIndex.toString().padStart(3, "0")}</div>
                <div>STATUS: SCANNING</div>
                <div>TEMP: 42°C</div>
             </div>
        </div>
      </div>
    </div>
  );
}
