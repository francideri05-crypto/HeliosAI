import { Zap, FileCheck, ShieldCheck, Settings, MessageSquare } from "lucide-react";

export default function BentoGrid() {
  const pillars = [
    { title: "CFO Virtuale", desc: "ROI reale da dati SCADA.", icon: Zap, span: "md:col-span-2" },
    { title: "Zero Burocrazia", desc: "RMA automatico.", icon: FileCheck, span: "md:col-span-1" },
    { title: "Filtro Verità", desc: "Fisica vs Falsi Positivi.", icon: ShieldCheck, span: "md:col-span-1" },
    { title: "Logistica", desc: "Gestione ricambi predittiva.", icon: Settings, span: "md:col-span-1" },
    { title: "Chat Asset", desc: "RAG su dataset termici.", icon: MessageSquare, span: "md:col-span-3" },
  ];

  return (
    <section className="bg-primary py-24 px-4 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
         <h2 className="text-3xl font-bold mb-12 text-white font-mono">
           <span className="text-accent">/</span> SYSTEM CAPABILITIES
         </h2>
         
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
            {pillars.map((item, i) => (
              <div 
                key={i} 
                className={`${item.span} relative group bg-zinc-900/80 border border-zinc-800 p-8 rounded-xl backdrop-blur-md overflow-hidden hover:border-accent/40 transition-colors`}
              >
                 <div className="absolute -right-12 -top-12 w-32 h-32 bg-accent/5 rounded-full blur-[40px] group-hover:bg-accent/10 transition-all" />
                 
                 <item.icon className="text-accent mb-6 h-8 w-8" />
                 <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                 <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                 
                 <div className="absolute bottom-4 right-4 text-zinc-800 font-mono text-xs group-hover:text-accent/50 transition-colors opacity-0 group-hover:opacity-100">
                    0{i+1} // ACCESS
                 </div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
}