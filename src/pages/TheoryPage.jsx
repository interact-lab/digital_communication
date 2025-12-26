import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { modules } from '../data/modules';
import { theoryContent } from '../data/theoryContent';
import { ArrowLeft, Lightbulb, Code, Target, Info, ChevronDown, ExternalLink, Bookmark } from 'lucide-react';
import { simulations } from '../simulations';
import { useState } from 'react';

export default function TheoryPage() {
    const { topicId } = useParams();
    const [isTheoryOpen, setIsTheoryOpen] = useState(false);

    // Find topic in modules data
    let topic = null;
    let module = null;
    for (const m of modules) {
        const t = m.topics.find(t => t.id === topicId);
        if (t) {
            topic = t;
            module = m;
            break;
        }
    }

    const content = theoryContent[topicId] || {
        title: topic?.title,
        description: topic?.description,
        requirements: ["Visualization of the concept", "Interactive controls for parameters", "Real-time analysis results"],
        theory: "The theory for this topic involves understanding how digital signals are processed and transmitted in modern communication systems. This area covers the mathematical foundations and practical implementations used in telecommunications today.",
        references: [
            { name: "Principles of Communication Systems - Taub & Schilling", url: "#" },
            { name: "Digital Signal Processing - Oppenheim & Schafer", url: "#" }
        ]
    };

    const Simulation = simulations[topicId];

    if (!topic) return <div className="pt-32 text-center text-white">Topic not found</div>;

    return (
        <div className="pt-24 pb-20 px-4 md:px-8 min-h-screen max-w-[1400px] mx-auto">
            <div className="mb-8">
                <Link
                    to={`/module/${module.id}`}
                    className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-6 font-medium transition-colors group text-sm"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to {module.title}
                </Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">{content.title}</h1>
                        <p className="text-gray-400 max-w-2xl text-sm md:text-base">{content.description}</p>
                    </div>
                    <button
                        onClick={() => setIsTheoryOpen(!isTheoryOpen)}
                        className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 transition-all text-xs font-bold uppercase tracking-wider group"
                    >
                        <Lightbulb size={16} className={isTheoryOpen ? "text-orange-500" : "text-gray-400"} />
                        <span>Theory & References</span>
                        <ChevronDown size={16} className={`transition-transform duration-300 ${isTheoryOpen ? 'rotate-180 text-orange-500' : 'text-gray-400'}`} />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isTheoryOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-12"
                    >
                        <div className="grid lg:grid-cols-3 gap-8 p-8 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl">
                            <div className="lg:col-span-2 space-y-8">
                                <section>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 bg-orange-600/20 rounded-lg">
                                            <Target className="w-4 h-4 text-orange-500" />
                                        </div>
                                        <h2 className="text-lg font-bold text-white uppercase tracking-wider">Historical & Mathematical Context</h2>
                                    </div>
                                    <div className="text-gray-400 leading-relaxed text-sm bg-black/20 p-6 rounded-2xl border border-white/5">
                                        {content.theory}
                                    </div>
                                </section>

                                <section>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 bg-blue-600/20 rounded-lg">
                                            <Info className="w-4 h-4 text-blue-500" />
                                        </div>
                                        <h2 className="text-lg font-bold text-white uppercase tracking-wider">Core Principles</h2>
                                    </div>
                                    <div className="grid gap-3">
                                        {content.requirements.map((req, i) => (
                                            <div key={i} className="flex items-start space-x-3 p-4 rounded-xl bg-black/20 border border-white/5 text-xs text-gray-400">
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                                                <span>{req}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <div className="space-y-8">
                                <section className="bg-orange-600/5 p-6 rounded-3xl border border-orange-500/10">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <Bookmark className="w-5 h-5 text-orange-500" />
                                        <h2 className="text-lg font-bold text-white uppercase tracking-wider">References</h2>
                                    </div>
                                    <div className="space-y-3">
                                        {(content.references || [
                                            { name: "Principles of Communication Systems - Taub & Schilling", url: "https://www.mheducation.com" },
                                            { name: "Digital Signal Processing - Oppenheim & Schafer", url: "https://www.pearson.com" }
                                        ]).map((ref, i) => (
                                            <a
                                                key={i} href={ref.url} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-orange-500/30 transition-all group"
                                            >
                                                <span className="text-xs text-gray-400 group-hover:text-white transition-colors line-clamp-2 pr-4">{ref.name}</span>
                                                <ExternalLink size={14} className="text-gray-500 group-hover:text-orange-500 flex-shrink-0" />
                                            </a>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Interactive Visualization */}
            <section className="simulation-wrapper relative">
                <div className="absolute inset-0 bg-orange-600/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
                <div className="p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10">
                    <div className="rounded-[22px] overflow-hidden bg-black/60 shadow-inner min-h-[600px] flex flex-col">
                        {Simulation ? (
                            <Simulation />
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6">
                                    <Code className="w-10 h-10 text-gray-700" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-300 mb-3">Interactive Workspace</h3>
                                <p className="text-gray-500 max-w-sm mb-8">
                                    The visualization for <span className="text-orange-500">"{content.title}"</span> is currently being rendered.
                                </p>
                                <div className="w-full max-w-xs bg-white/5 h-1.5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                                        initial={{ width: 0 }}
                                        animate={{ width: "70%" }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
