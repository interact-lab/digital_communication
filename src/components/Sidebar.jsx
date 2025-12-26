import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, LayoutDashboard, Database, Activity, Share2, ShieldCheck, Cpu } from 'lucide-react';
import { modules } from '../data/modules';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {

    const getIcon = (moduleId) => {
        switch (moduleId) {
            case 'fourier-analysis': return Activity;
            case 'digital-filters': return Cpu;
            case 'signal-transmission': return Share2;
            case 'information-theory': return Database;
            case 'multiple-access': return LayoutDashboard;
            case 'spread-spectrum': return ShieldCheck;
            default: return Activity;
        }
    };

    return (
        <motion.div
            initial={false}
            animate={{ width: isCollapsed ? '80px' : '280px' }}
            transition={{ duration: 0 }}
            className="fixed left-0 top-0 h-screen bg-black/80 backdrop-blur-xl border-r border-white/10 z-40 hidden lg:block overflow-hidden"
        >
            <div className="flex flex-col h-full">
                <div className="p-6 flex items-center justify-between border-b border-white/10 h-16">
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0 }}
                            className="text-lg font-black tracking-tighter"
                        >
                            <span className="text-white">DIGI</span>
                            <span className="text-orange-500">COM</span>
                        </motion.div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors mx-auto"
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
                    {modules.map((module) => {
                        const Icon = getIcon(module.id);
                        return (
                            <div key={module.id} className="mb-4">
                                {!isCollapsed && (
                                    <div className="px-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">
                                        {module.title}
                                    </div>
                                )}
                                <div className="space-y-1">
                                    {module.topics.map((topic) => (
                                        <NavLink
                                            key={topic.id}
                                            to={`/theory/${topic.id}`}
                                            className={({ isActive }) =>
                                                `flex items-center space-x-3 px-3 py-2 rounded-xl transition-all group ${isActive
                                                    ? 'bg-orange-600/10 text-orange-500 border border-orange-500/20'
                                                    : 'text-gray-400 hover:bg-white/5 border border-transparent'
                                                }`
                                            }
                                        >
                                            <Icon size={18} className="flex-shrink-0" />
                                            {!isCollapsed && (
                                                <span className="text-xs font-medium truncate">{topic.title}</span>
                                            )}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
