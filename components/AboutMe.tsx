'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, GraduationCap, Briefcase, Plane, ArrowRight, User } from 'lucide-react';

const AboutMe = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#FDB813]/10 bg-[#0A0A0A]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* About Section */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#FDB813]/10 rounded border border-[#FDB813]/20 text-[#FDB813]">
                <User size={20} />
              </div>
              <span className="text-[#FDB813] font-mono text-sm tracking-widest uppercase">Chi Sono</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Francesco <span className="text-zinc-500">De Rienzo.</span>
            </h2>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                La mia idea di Helios AI è nata dalla mia profonda passione per i <span className="text-white font-medium">droni</span> e le loro potenzialità nell'industria moderna. 
                Ho sempre creduto che l'unione tra hardware avanzato e intelligenza artificiale potesse rivoluzionare il modo in cui gestiamo le infrastrutture energetiche.
              </p>
              
              <div className="grid grid-cols-1 gap-4 pt-4">
                <div className="flex gap-4 p-4 border border-zinc-800 bg-zinc-900/30 rounded-lg hover:border-[#FDB813]/30 transition-colors group">
                  <div className="mt-1 text-[#FDB813]"><GraduationCap size={20}/></div>
                  <div>
                    <h4 className="text-white font-bold">Istruzione</h4>
                    <p className="text-sm">Diploma presso <span className="text-[#FDB813]">"ITS Apulia Digital Maker"</span> (2025).</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-4 border border-zinc-800 bg-zinc-900/30 rounded-lg hover:border-[#FDB813]/30 transition-colors group">
                  <div className="mt-1 text-[#FDB813]"><Briefcase size={20}/></div>
                  <div>
                    <h4 className="text-white font-bold">Esperienza Attuale</h4>
                    <p className="text-sm">Collaborazione attiva con l'azienda <span className="text-[#FDB813]">PugliAI</span>.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 border border-zinc-800 bg-zinc-900/30 rounded-lg hover:border-[#FDB813]/30 transition-colors group">
                  <div className="mt-1 text-[#FDB813]"><Plane size={20}/></div>
                  <div>
                    <h4 className="text-white font-bold">Visione</h4>
                    <p className="text-sm">Automazione totale delle ispezioni solari tramite sciami di droni intelligenti.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="relative p-8 border border-[#FDB813]/30 bg-zinc-900/20 rounded-none overflow-hidden h-full flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FDB813]/5 to-transparent pointer-events-none" />
          <div className="relative z-10 space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2 font-mono">CONTATTI</h3>
              <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">Connect with the project</p>
            </div>

            <div className="space-y-6">
              <a 
                href="mailto:francideri05@gmail.com" 
                className="flex items-center gap-4 p-4 bg-black/40 border border-zinc-800 hover:border-[#FDB813] transition-all group"
              >
                <div className="p-3 bg-[#FDB813]/10 text-[#FDB813] group-hover:bg-[#FDB813] group-hover:text-black transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-mono uppercase">Email</div>
                  <div className="text-white font-bold">francideri05@gmail.com</div>
                </div>
                <ArrowRight className="ml-auto text-zinc-700 group-hover:text-[#FDB813] transition-colors" size={20} />
              </a>

              <a 
                href="tel:+393391925382" 
                className="flex items-center gap-4 p-4 bg-black/40 border border-zinc-800 hover:border-[#FDB813] transition-all group"
              >
                <div className="p-3 bg-[#FDB813]/10 text-[#FDB813] group-hover:bg-[#FDB813] group-hover:text-black transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-mono uppercase">Telefono</div>
                  <div className="text-white font-bold">+39 339 192 5382</div>
                </div>
                <ArrowRight className="ml-auto text-zinc-700 group-hover:text-[#FDB813] transition-colors" size={20} />
              </a>
            </div>

            <div className="pt-8 border-t border-zinc-800">
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">
                Helios AI // Founder Communication Protocol
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
