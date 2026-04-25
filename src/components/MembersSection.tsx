import { Users, Github, Linkedin, Mail } from 'lucide-react';
import PunzalanImg from '../data/PUNZALAN.png';
import NormanImg from '../data/NORMAN.jpg';
import VinceImg from '../data/VINCE.jpg';
import NootImg from '../data/NOOT.jpg';

const members = [
  {
    name: 'Lloyd Nixon Punzalan',
    role: 'Lead Developer',
    image: PunzalanImg,
    bio: 'Lead architect behind the neural logic processor and core DFA engine.',
    social: { github: '#', linkedin: '#', mail: 'lloyd@example.com' }
  },
  {
    name: 'Normal Jeremy Legaspi',
    role: 'Logic Engineer',
    image: NormanImg,
    bio: 'Specialist in formal grammar and context-free production mapping.',
    social: { github: '#', linkedin: '#', mail: 'jeremy@example.com' }
  },
  {
    name: 'Vince Pedres',
    role: 'System Designer',
    image: VinceImg,
    bio: 'Expert in high-fidelity UI/UX and cyber-industrial design systems.',
    social: { github: '#', linkedin: '#', mail: 'vince@example.com' }
  },
  {
    name: 'Von Rodgewine Noot',
    role: 'Frontend Architect',
    image: NootImg,
    bio: 'Developer of the interactive PDA flowcharts and real-time simulations.',
    social: { github: '#', linkedin: '#', mail: 'von@example.com' }
  }
];

export default function MembersSection() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">
          <Users size={12} />
          Development Team
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">The Minds Behind <span className="tech-text-glow text-blue-500">Automata_Studio</span></h2>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium">
          Our team is dedicated to making complex theoretical computer science concepts accessible and visually stunning.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member, idx) => (
          <div key={idx} className="glass-card rounded-[2.5rem] p-8 group relative overflow-hidden flex flex-col items-center text-center transition-all hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover rounded-3xl border-2 border-white/10 group-hover:border-blue-500/50 transition-colors relative z-10"
              />
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="text-xl font-black text-white">{member.name}</h3>
              <p className="text-xs font-black text-blue-400 uppercase tracking-widest">{member.role}</p>
              <p className="text-slate-400 text-xs leading-relaxed mt-4 line-clamp-3">
                {member.bio}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8 relative z-10">
              <a href={member.social.github} className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:border-white/10 transition-all">
                <Github size={16} />
              </a>
              <a href={member.social.linkedin} className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:border-white/10 transition-all">
                <Linkedin size={16} />
              </a>
              <a href={`mailto:${member.social.mail}`} className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:border-white/10 transition-all">
                <Mail size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
