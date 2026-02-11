'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, ShieldCheck, BarChart3, MessageSquare, ArrowRight, Activity, CheckCircle, Database, Server, TrendingUp, Globe, Lock, X, FileText, Send } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

function cn(...inputs: (string | undefined | null | false)[]) { return twMerge(clsx(inputs)); }

// -- HERO SCROLL ANIMATION COMPONENT --
const HeroScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 20 });

  useEffect(() => {
    // PRE-LOAD 40 FRAMES
    const loadImages = async () => {
      const promises = [];
      for (let i = 1; i <= 40; i++) {
        promises.push(new Promise<HTMLImageElement | null>((resolve) => {
          const img = new Image();
          img.src = `/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
          img.onload = () => resolve(img);
          img.onerror = () => { console.warn(`Failed to load frame ${i}`); resolve(null); };
        }));
      }
      const results = await Promise.all(promises);
      const validImages = results.filter((img): img is HTMLImageElement => img !== null);
      setImages(validImages);
      setLoaded(true);
    };
    loadImages();
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !loaded || images.length === 0) return;

    const render = () => {
      const progress = smoothProgress.get(); 
      const frameIndex = Math.min(images.length - 1, Math.floor(progress * (images.length - 1)));
      const img = images[frameIndex];

      if (img && canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;

        const scale = Math.max(canvasRef.current.width / img.width, canvasRef.current.height / img.height);
        const x = (canvasRef.current.width / 2) - (img.width / 2) * scale;
        const y = (canvasRef.current.height / 2) - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
      requestAnimationFrame(render);
    };

    const id = requestAnimationFrame(render);
    return () => cancelAnimationFrame(id);
  }, [loaded, images, smoothProgress]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#0A0A0A]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        <motion.div 
           style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
           className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none"
        >
          <div className="text-center space-y-6 max-w-4xl px-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
              HELIOS <span className="text-[#FDB813]">AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 font-mono">
              SCROLL TO DEPLOY AGENTS
            </p>
          </div>
        </motion.div>
         <motion.div 
           style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]) }}
           className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
             <h2 className="text-4xl md:text-6xl font-bold text-white bg-black/50 p-4 rounded-xl backdrop-blur-md border border-[#FDB813]/20">
               SYSTEM ONLINE
             </h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// -- AGENTS DATA & MODAL --
const agents = [
 {
   title:'CFO Virtuale',
   id:'ROI ENGINE',
   desc:'Calcolo ROI in tempo reale su dati SCADA.',
   techTitle: 'Analisi Finanziaria Predittiva',
   techDesc: 'Integrazione API con dati SCADA per calcolare la perdita di produzione in tempo reale.',
   icon:BarChart3,
   col:'md:col-span-1',
   grad:'from-yellow-500/20'
 },
 {
   title:'Zero Burocrazia',
   id:'RMA AUTOMATOR',
   desc:'Generazione e invio automatico moduli RMA ai produttori.',
   techTitle: 'Eliminazione Carico Amministrativo',
   techDesc: 'L\'IA estrae i seriali dei moduli difettosi e genera automaticamente il file PDF/XML per portali Jinko/Longi.',
   icon:ShieldCheck,
   col:'md:col-span-2',
   grad:'from-blue-500/20'
 },
 {
   title:'Filtro Verità',
   id:'PHYSICS-INFORMED AI',
   desc:'IA addestrata sulla fisica per eliminare i falsi positivi.',
   techTitle: 'Accuratezza Superiore',
   techDesc: 'Superamento soglie di mercato tramite incrocio GPS, RGB e Termico. Distinzione netta tra soiling e Hotspot.',
   icon:Activity,
   col:'md:col-span-1',
   grad:'from-purple-500/20'
 },
 {
   title:'Logistica Integrata',
   id:'SPARE PARTS MANAGER',
   desc:'Gestione predittiva degli spare parts.',
   techTitle: 'Ottimizzazione Magazzino',
   techDesc: 'Monitoraggio stock e ordini automatici basati sul tasso di degradazione rilevato dai droni.',
   icon:Zap,
   col:'md:col-span-1',
   grad:'from-green-500/20'
 },
 {
   title:'Chat con l\'Impianto',
   id:'RAG INTERFACE',
   desc:'Interfaccia RAG per interrogare i dataset ispettivi.',
   techTitle: 'Accesso Immediato ai Dati',
   techDesc: 'Interfaccia NLP: "Qual è lo stato dell\'inverter 4?" -> Risposta immediata da ultimo report.',
   icon:MessageSquare,
   col:'md:col-span-1',
   grad:'from-indigo-500/20'
 }
];

const AgentModal = ({ agent, onClose }: { agent: any, onClose: () => void }) => {
  if (!agent) return null;

  const renderContent = () => {
    switch(agent.id) {
      case 'ROI ENGINE':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-2">
              <span>REAL-TIME REVENUE RECOVERY</span>
              <span className="text-[#FDB813] animate-pulse">● LIVE</span>
            </div>
            <div className="relative h-48 w-full bg-zinc-900/50 rounded border border-zinc-800 flex items-end justify-between px-4 pb-2 overflow-hidden">
               {/* Simsulated Graph */}
               {[40, 65, 50, 80, 70, 90, 85].map((h, i) => (
                 <motion.div 
                   key={i}
                   initial={{ height: 0 }}
                   animate={{ height: `${h}%` }}
                   transition={{ duration: 0.5, delay: i * 0.1 }}
                   className="w-8 bg-[#FDB813]/20 border-t-2 border-[#FDB813] hover:bg-[#FDB813]/40 transition-colors"
                 />
               ))}
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-zinc-900/50 p-2 rounded border border-zinc-800">
                <div className="text-xs text-zinc-500">Recuperabile</div>
                <div className="text-xl font-bold text-white">€ 24,590</div>
              </div>
              <div className="bg-zinc-900/50 p-2 rounded border border-zinc-800">
                <div className="text-xs text-zinc-500">Perdita Attuale</div>
                <div className="text-xl font-bold text-red-500">-3.2%</div>
              </div>
            </div>
          </div>
        );
      case 'RMA AUTOMATOR':
        return (
          <div className="space-y-4">
             <div className="flex flex-col space-y-2">
               {['Jinko_Claim_404.xml', 'Warranty_Auth_Req.pdf', 'Thermal_Proof_Batch.jpg'].map((file, i) => (
                 <motion.div 
                   key={file}
                   initial={{ x: -20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: i * 0.15 }}
                   className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded group hover:border-blue-500/50 transition-colors"
                 >
                   <div className="flex items-center gap-3">
                     <FileText size={16} className="text-blue-400"/>
                     <span className="text-sm text-zinc-300 font-mono">{file}</span>
                   </div>
                   <CheckCircle size={16} className="text-green-500"/>
                 </motion.div>
               ))}
             </div>
             <div className="p-3 bg-green-500/10 border border-green-500/20 rounded text-center">
               <span className="text-xs text-green-400 font-mono">READY FOR PORTAL UPLOAD</span>
             </div>
          </div>
        );
      case 'PHYSICS-INFORMED AI':
        return (
           <div className="space-y-4">
             <div className="relative h-48 bg-zinc-900 rounded border border-zinc-800 overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566093097221-ac2335b09e70?q=80&w=2689&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                
                {/* Simulated Detection Box */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                  className="absolute top-1/3 left-1/2 w-16 h-16 border-2 border-red-500 -translate-x-1/2 rounded-sm"
                >
                   <div className="absolute -top-6 left-0 bg-red-500 text-black text-[10px] font-bold px-1">HOTSPOT</div>
                </motion.div>

                 <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] font-mono text-zinc-500 bg-black/80 p-2 rounded">
                   <span>GPS: 45.4642° N</span>
                   <span>TEMP: 68°C</span>
                   <span className="text-green-500">CONFIDENCE: 99.8%</span>
                 </div>
             </div>
           </div>
        );
      case 'SPARE PARTS MANAGER':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
               {[
                 { item: 'Jinko Tiger Neo 72HL4', stock: 12, status: 'LOW' },
                 { item: 'Inverter String Huawei', stock: 4, status: 'OK' },
                 { item: 'MC4 Connectors', stock: 200, status: 'OK' }
               ].map((part, i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                    <div>
                      <div className="text-sm font-bold text-white">{part.item}</div>
                      <div className="text-xs text-zinc-500">Stock: {part.stock}</div>
                    </div>
                    <span className={cn("text-xs font-mono px-2 py-1 rounded", part.status === 'LOW' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500')}>
                      {part.status}
                    </span>
                 </div>
               ))}
            </div>
            <button className="w-full py-2 bg-[#FDB813]/10 border border-[#FDB813] text-[#FDB813] text-xs font-mono uppercase hover:bg-[#FDB813] hover:text-black transition-all">
              Sincronizza Ordine
            </button>
          </div>
        );
      case 'RAG INTERFACE':
        return (
          <div className="flex flex-col h-64 bg-zinc-900/50 border border-zinc-800 rounded overflow-hidden">
             <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                <div className="flex justify-end">
                   <div className="bg-[#FDB813]/20 text-[#FDB813] text-xs p-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg max-w-[80%]">
                     Qual è lo stato dell'inverter 4?
                   </div>
                </div>
                <div className="flex justify-start">
                   <div className="bg-zinc-800 text-zinc-300 text-xs p-2 rounded-tr-lg rounded-tl-lg rounded-br-lg max-w-[80%] border border-zinc-700">
                     Dall'ultima ispezione termografica, l'inverter 4 mostra un surriscaldamento anomalo (+14°C rispetto alla media). Si consiglia verifica ventole.
                   </div>
                </div>
             </div>
             <div className="p-2 border-t border-zinc-800 bg-black flex gap-2">
                <input type="text" placeholder="Chiedi al dataset..." className="flex-1 bg-transparent border-none text-xs text-white focus:ring-0 placeholder:text-zinc-600"/>
                <button className="p-1 text-[#FDB813] hover:bg-[#FDB813]/10 rounded"><Send size={14}/></button>
             </div>
          </div>
        );
      default: return null;
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-black/90 backdrop-blur-2xl border border-[#FDB813] rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(253,184,19,0.3)]"
      >
         {/* HEADER */}
         <div className="p-6 border-b border-[#FDB813]/20 flex justify-between items-start bg-gradient-to-r from-[#FDB813]/5 to-transparent">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-[#FDB813]/10 rounded-lg border border-[#FDB813]/20 text-[#FDB813]">
                  {React.createElement(agent.icon, { size: 24 })}
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{agent.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-xs font-mono text-[#FDB813] border border-[#FDB813]/30 px-2 py-0.5 rounded">{agent.id}</span>
                     <span className="text-xs text-zinc-500 font-mono">ACTIVE // V.2.4</span>
                  </div>
               </div>
            </div>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
              <X size={24} strokeWidth={1.5} />
            </button>
         </div>

         {/* BODY */}
         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <div>
                 <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-widest mb-2">Protocollo Operativo</h4>
                 <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-[#FDB813]/50 pl-4">{agent.techDesc}</p>
               </div>
               <div>
                  <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-widest mb-2">Capabilities</h4>
                  <ul className="space-y-2">
                     <li className="flex items-center gap-2 text-xs text-zinc-400">
                        <CheckCircle size={12} className="text-[#FDB813]"/> Autonomous Execution
                     </li>
                     <li className="flex items-center gap-2 text-xs text-zinc-400">
                        <CheckCircle size={12} className="text-[#FDB813]"/> Real-time Latency (12ms)
                     </li>
                     <li className="flex items-center gap-2 text-xs text-zinc-400">
                        <CheckCircle size={12} className="text-[#FDB813]"/> Enterprise Grade Security
                     </li>
                  </ul>
               </div>
            </div>

            {/* DYNAMIC CONTENT AREA */}
            <div className="bg-black/40 rounded-lg border border-zinc-800 p-4">
                <h4 className="text-xs font-mono text-zinc-500 mb-4 border-b border-zinc-800 pb-2 flex justify-between">
                   <span>LIVE DATA STREAM</span>
                   <Activity size={12} className="text-green-500 animate-pulse"/>
                </h4>
                {renderContent()}
            </div>
         </div>

         {/* FOOTER */}
         <div className="p-4 border-t border-[#FDB813]/20 bg-[#FDB813]/5 flex justify-between items-center">
            <span className="text-[10px] font-mono text-zinc-500">SYSTEM ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            <button className="flex items-center gap-2 text-xs font-bold text-black bg-[#FDB813] px-4 py-2 rounded hover:bg-[#ffc636] transition-colors">
               FULL DEPLOYMENT <ArrowRight size={14}/>
            </button>
         </div>
      </motion.div>
    </motion.div>
  );
}

const AgentsGrid = () => {
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-[#0A0A0A]">
      <AnimatePresence>
        {selectedAgent && <AgentModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}
      </AnimatePresence>
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-mono">THE AGENT SWARM.</h2>
        <p className="text-zinc-400 max-w-2xl text-lg">
          5 Agenti specializzati che lavorano 24/7 sui tuoi dati.
          Un ecosistema autonomo per la gestione degli asset solari.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {agents.map((a,i)=>(
          <div 
            key={a.title} 
            className={cn('group relative overflow-hidden rounded-none border border-[#FDB813]/30 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 transition-all duration-300 cursor-pointer', a.col)}
            onClick={() => setSelectedAgent(a)}
          >
            <div className={cn('absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500', a.grad)} />
            <div className='relative z-10 flex flex-col h-full justify-between space-y-8'>
              <div>
                <div className='flex items-center justify-between mb-6'>
                   <div className='text-[#FDB813]'><a.icon size={32} strokeWidth={1.5}/></div>
                   <span className='text-xs font-mono text-zinc-500 border border-zinc-800 px-2 py-1'>{a.id}</span>
                </div>
                <h3 className='text-xl font-bold text-white mb-2 font-mono'>{a.title}</h3>
                <p className='text-zinc-400 text-sm leading-relaxed'>{a.desc}</p>
              </div>
              <div className='flex items-center text-xs font-mono text-[#FDB813] tracking-widest uppercase'>
                   <span className="group-hover:mr-4 transition-all duration-300">Activate</span>
                   <ArrowRight className='w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// -- SERVICE ARCHITECTURE COMPONENT --
const ServiceArchitecture = () => (
    <section className="py-24 bg-zinc-950 border-y border-[#FDB813]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <span className="text-[#FDB813] font-mono text-sm tracking-widest uppercase">Come Funziona</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    Dal Drone al Bonifico.<br/>
                    <span className="text-zinc-500">Zero azione umana.</span>
                </h2>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="mt-1"><div className="w-8 h-8 rounded bg-[#FDB813]/10 flex items-center justify-center text-[#FDB813]"><Database size={18}/></div></div>
                        <div>
                            <h4 className="text-white font-bold text-lg">Ingestione Dati</h4>
                            <p className="text-zinc-400">Carichiamo i tuoi dataset termici ed RGB grezzi. Supportiamo DJI, Autel e FLIR.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mt-1"><div className="w-8 h-8 rounded bg-[#FDB813]/10 flex items-center justify-center text-[#FDB813]"><Cpu size={18}/></div></div>
                        <div>
                            <h4 className="text-white font-bold text-lg">Physics-Informed AI</h4>
                            <p className="text-zinc-400">La nostra IA analizza i difetti basandosi sulle leggi della fisica, non solo pixel.</p>
                        </div>
                    </div>
                     <div className="flex gap-4">
                        <div className="mt-1"><div className="w-8 h-8 rounded bg-[#FDB813]/10 flex items-center justify-center text-[#FDB813]"><Server size={18}/></div></div>
                        <div>
                            <h4 className="text-white font-bold text-lg">Gestione RMA Automatica</h4>
                            <p className="text-zinc-400">Helios compila i moduli di garanzia e li invia ai produttori (Jinko, Trina, ecc.).</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative h-[500px] w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                 <div className="text-center space-y-4 z-10">
                     <div className="p-4 border border-[#FDB813] text-[#FDB813] font-mono text-xl inline-block bg-black">RAW DATA</div>
                     <div className="h-8 w-px bg-[#FDB813] mx-auto"></div>
                     <div className="p-6 border border-white text-white font-mono text-2xl inline-block bg-zinc-900 shadow-[0_0_50px_-10px_#FDB813]">HELIOS CORE</div>
                     <div className="h-8 w-px bg-[#FDB813] mx-auto"></div>
                     <div className="p-4 border border-[#FDB813] text-[#FDB813] font-mono text-xl inline-block bg-black">RMA CLAIM</div>
                 </div>
            </div>
        </div>
    </section>
);

// -- NEW: ACTIVE ASSET DEFENCE COMPONENT --
const ActiveAssetDefence = () => (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#FDB813]/10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1 space-y-6">
                <div className="w-12 h-12 rounded bg-[#FDB813] flex items-center justify-center text-black mb-6"><ShieldCheck size={28}/></div>
                <h3 className="text-3xl font-bold text-white">Active Asset Defence&trade;</h3>
                <p className="text-zinc-400 leading-relaxed">
                    Helios AI is non una semplice dashboard. È un sistema di difesa attivo per il tuo portfolio solare. 
                    I nostri agenti navigano autonomamente i protocolli dei produttori per recuperare ricavi persi, riducendo l'overhead umano del 90%.
                </p>
                <button className="text-[#FDB813] font-mono text-sm border-b border-[#FDB813] pb-1 hover:opacity-80 transition-opacity">READ THE MANIFESTO</button>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-zinc-800 bg-zinc-900/30 rounded-lg space-y-4 hover:border-[#FDB813]/30 transition-colors">
                    <TrendingUp className="text-[#FDB813]" size={24}/>
                    <h4 className="text-xl font-bold text-white">Revenue Recovery</h4>
                    <p className="text-sm text-zinc-500">Identifichiamo perdite invisibili e le convertiamo in claims bancabili.</p>
                </div>
                <div className="p-6 border border-zinc-800 bg-zinc-900/30 rounded-lg space-y-4 hover:border-[#FDB813]/30 transition-colors">
                    <Lock className="text-[#FDB813]" size={24}/>
                    <h4 className="text-xl font-bold text-white">Bank-Grade Security</h4>
                    <p className="text-sm text-zinc-500">Dati criptati e conformi agli standard industriali europei.</p>
                </div>
                 <div className="p-6 border border-zinc-800 bg-zinc-900/30 rounded-lg space-y-4 hover:border-[#FDB813]/30 transition-colors">
                    <Globe className="text-[#FDB813]" size={24}/>
                    <h4 className="text-xl font-bold text-white">Global Reach</h4>
                    <p className="text-sm text-zinc-500">Compatibile con impianti in Europa, MENA e US.</p>
                </div>
                <div className="p-6 border border-zinc-800 bg-zinc-900/30 rounded-lg space-y-4 hover:border-[#FDB813]/30 transition-colors">
                    <Activity className="text-[#FDB813]" size={24}/>
                    <h4 className="text-xl font-bold text-white">Continuous Monitoring</h4>
                    <p className="text-sm text-zinc-500">Analisi costante 24/7/365 senza pause.</p>
                </div>
            </div>
        </div>
    </section>
);

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white font-sans selection:bg-[#FDB813] selection:text-black">
       <HeroScroll />
       <ServiceArchitecture />
       <AgentsGrid />
       <ActiveAssetDefence />
       
       <footer className="py-12 border-t border-[#FDB813]/10 text-center text-zinc-600 font-mono text-sm bg-black">
         <div className="mb-4 text-zinc-500">HELIOS AI - MILAN, ITALY</div>
         &copy; 2026. INDUSTRIAL SOLAR INTELLIGENCE.
       </footer>
    </main>
  );
}

