import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { modules } from '../data/modules';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function ModulePage() {
    const { moduleId } = useParams();
    const module = modules.find(m => m.id === moduleId);

    if (!module) return <div className="pt-32 text-center">Module not found</div>;

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <Link to="/" className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-8 font-medium transition-colors group">
                    <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Modules
                </Link>

                <header className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">{module.title}</h1>
                    <p className="text-gray-400 text-xl leading-relaxed max-w-2xl">{module.description}</p>
                </header>

                <div className="grid gap-6">
                    {module.topics.map((topic, index) => (
                        <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                to={`/theory/${topic.id}`}
                                className="flex items-center justify-between p-8 rounded-2xl glass-card group hover:shadow-xl hover:shadow-orange-950/10"
                            >
                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 rounded-xl bg-orange-600/10 flex items-center justify-center group-hover:bg-orange-600/20 transition-colors">
                                        <BookOpen className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
                                            {topic.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm">{topic.description}</p>
                                    </div>
                                </div>
                                <div className="p-2 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-all group-hover:border-orange-500/50">
                                    <ArrowLeft className="w-5 h-5 text-orange-500 rotate-180" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
