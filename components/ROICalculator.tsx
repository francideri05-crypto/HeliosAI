"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";

function Counter({ value }: { value: number }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
     return display.on("change", (latest) => setDisplayValue(latest));
  }, [display]);

  return <span>€ {displayValue.toLocaleString("it-IT")}</span>;
}

export default function ROICalculator() {
  const [mw, setMw] = useState<number | "">("");
  const [loss, setLoss] = useState(0);

  useEffect(() => {
    if (mw) {
       // €12,400 per MW is the efficiency loss constant
       setLoss(Number(mw) * 12400); 
    } else {
       setLoss(0);
    }
  }, [mw]);

  return (
    <section className="py-24 bg-onyx relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-3xl p-1 border border-white/10 shadow-2xl">
          <div className="bg-onyx/50 rounded-[22px] p-8 md:p-16 backdrop-blur-xl relative overflow-hidden">
            
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-circuit/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Calcola le tue Perdite</h2>
              <p className="text-gray-400 font-light">Inserisci la capacità del tuo impianto per una stima immediata.</p>
            </div>

            <div className="flex flex-col items-center gap-8">
              <div className="w-full max-w-xs relative group">
                <input
                  type="number"
                  value={mw}
                  onChange={(e) => setMw(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="Capacità in MW"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-center text-3xl font-bold text-white focus:outline-none focus:border-circuit/50 focus:ring-1 focus:ring-circuit/50 transition-all placeholder:text-gray-700 font-mono"
                />
                <div className="absolute bottom-4 right-4 text-xs font-mono text-gray-500 pointer-events-none">MW</div>
              </div>

              <div className="h-px w-full max-w-sm bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="text-center">
                <p className="text-gray-500 text-sm tracking-widest uppercase mb-2">Potenziale Recuperabile (Annuale)</p>
                <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 font-mono tracking-tight">
                    <Counter value={loss} />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}