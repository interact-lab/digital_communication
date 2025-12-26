import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ModuleCard({ module, index }) {
    const { id, title, description } = module;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <Link
                to={`/module/${id}`}
                className="block p-8 rounded-2xl glass-card relative overflow-hidden group hover:shadow-2xl hover:shadow-orange-950/20"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-6xl font-black italic">{index + 1}</span>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-500 transition-colors">
                    {title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                    {description}
                </p>

                <div className="flex items-center text-orange-600 font-semibold text-sm group-hover:text-orange-400 transition-colors">
                    Explore Topics <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </Link>
        </motion.div>
    );
}
