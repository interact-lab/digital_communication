import { motion } from 'framer-motion';
import { modules } from '../data/modules';
import ModuleCard from '../components/ModuleCard';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="pt-40 pb-20 px-4">
                <div className="max-w-[1400px] mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]"
                    >
                        Digital <br /> Communication <span className="orange-gradient-text italic">Suite</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                    >
                        A high-fidelity laboratory for exploring the mathematical foundations of modern communication protocols.
                    </motion.p>
                </div>
            </section>

            {/* Modules Section */}
            <section id="modules" className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                        <div>
                            <h2 className="text-sm font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Laboratory</h2>
                            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Core Research Modules</h3>
                        </div>
                        <p className="text-gray-500 max-w-sm text-sm font-medium">Explore the domains of signal processing, transmission, and information theory through interactive math.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {modules.map((module, i) => (
                            <ModuleCard key={module.id} module={module} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
