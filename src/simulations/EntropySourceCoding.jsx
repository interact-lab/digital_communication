import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function EntropySourceCoding() {
    const [probs, setProbs] = useState([0.5, 0.25, 0.125, 0.125]);
    const symbols = ['A', 'B', 'C', 'D'];

    const entropy = useMemo(() => {
        return probs.reduce((acc, p) => acc - (p > 0 ? p * Math.log2(p) : 0), 0);
    }, [probs]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Information Entropy</h3>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">The source coding limit ($H(X)$)</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-black text-orange-500">{entropy.toFixed(2)}</div>
                    <div className="text-[8px] text-gray-600 font-bold uppercase">Bits / Symbol</div>
                </div>
            </div>

            <div className="flex-1 grid md:grid-cols-2 gap-8 mb-8">
                {/* Symbol Probabilities */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Symbol Distribution</h4>
                    <div className="space-y-3">
                        {probs.map((p, i) => (
                            <div key={symbols[i]} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group">
                                <div className="flex items-center space-x-4">
                                    <div className="w-8 h-8 rounded-lg bg-orange-600/20 border border-orange-500/30 flex items-center justify-center font-black text-orange-500">
                                        {symbols[i]}
                                    </div>
                                    <div className="w-32 h-2 bg-black rounded-full overflow-hidden">
                                        <motion.div className="h-full bg-orange-500" animate={{ width: `${p * 100}%` }} />
                                    </div>
                                </div>
                                <input
                                    type="range" min="0" max="1" step="0.05" value={p}
                                    onChange={e => {
                                        const newP = parseFloat(e.target.value);
                                        const diff = (newP - p) / (probs.length - 1);
                                        setProbs(probs.map((val, idx) => idx === i ? newP : Math.max(0, val - diff)));
                                    }}
                                    className="w-16 accent-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                                <span className="text-xs font-mono text-white">{(p * 100).toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Efficiency Visualization */}
                <div className="bg-black/20 rounded-3xl border border-white/5 p-8 flex flex-col justify-center text-center relative overflow-hidden">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-gray-700 uppercase tracking-widest">Compression Efficiency</div>
                    <div className="relative inline-block mx-auto mb-6">
                        <svg width="120" height="120" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="8" />
                            <motion.circle
                                cx="50" cy="50" r="45" fill="none" stroke="#f97316" strokeWidth="8"
                                strokeDasharray="283"
                                animate={{ strokeDashoffset: 283 - (entropy / 2) * 283 }}
                                transform="rotate(-90 50 50)"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-black text-white">{((entropy / 2) * 100).toFixed(0)}%</span>
                            <span className="text-[7px] text-gray-600 font-bold uppercase tracking-widest">Shannon Limit</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed italic">
                        A source requires at least <span className="text-white font-bold">$H(X)$</span> bits per symbol. Fixed-length coding (2 bits/symbol here) is inefficient if some symbols (like 'A') are more frequent. Source coding (compression) maps frequent symbols to shorter codes.
                    </p>
                </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="flex items-center space-x-3 text-blue-500 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <h5 className="text-[10px] font-bold uppercase tracking-widest">Surprise Factor</h5>
                </div>
                <p className="text-[11px] text-gray-500">
                    High Probability = Low Surprise = Low Information. Entropy measures the <i>average</i> surprise. When one symbol dominates (100%), entropy drops to 0—we already know the outcome, so no data needs to be sent.
                </p>
            </div>
        </div>
    );
}
