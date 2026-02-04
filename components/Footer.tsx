import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Helios AI</h3>
            <p className="text-gray-500 text-sm">Cervello Analitico Verticale per il Solare.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-solar transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="text-gray-400 hover:text-solar transition-colors"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="text-gray-400 hover:text-solar transition-colors"><Github className="h-5 w-5" /></a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 Helios AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Termini</a>
          </div>
        </div>
      </div>
    </footer>
  );
}