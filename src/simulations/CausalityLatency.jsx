import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function CausalityLatency() {
    const [delay, setDelay] = useState(2);
    const [showNonCausal, setShowNonCausal] = useState(false);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Causality & Real-time Delay</h3>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">The physics of $h(t) = 0, \forall t &lt; 0$</p>
                </div>
                <button
                    onClick={() => setShowNonCausal(!showNonCausal)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border transition-all ${showNonCausal ? 'bg-red-600/20 border-red-500 text-red-500' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
                >
                    {showNonCausal ? 'Non-Causal Mode' : 'Strictly Causal'}
                </button>
            </div>

            <div className="flex-1 bg-black/20 rounded-2xl border border-white/5 p-8 flex flex-col justify-center relative overflow-hidden">
                <div className="grid grid-rows-2 gap-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Input Pulse $x(t)$</span>
                        <div className="h-20 border-l border-b border-white/10 relative">
                            <motion.div
                                className="absolute w-8 h-12 bg-blue-600/20 border border-blue-500/50"
                                animate={{ x: [0, 400] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">System Output $y(t)$</span>
                        <div className="h-20 border-l border-b border-white/10 relative">
                            {/* Non causal ghost */}
                            {showNonCausal && (
                                <motion.div
                                    className="absolute w-8 h-12 border border-red-500/30 bg-red-500/5 flex items-center justify-center text-[8px] text-red-500 font-black"
                                    animate={{ x: [0, 400] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                >
                                    FUTURE SEEING
                                </motion.div>
                            )}
                            {/* Delayed real output */}
                            <motion.div
                                className="absolute w-8 h-12 bg-orange-600/20 border border-orange-500/50"
                                animate={{ x: [0, 400] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: delay * 0.1 }}
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="absolute top-1/2 h-full w-px bg-white/5 dash-array shadow-[0_0_10px_white]"
                    style={{ left: `${delay * 20}px` }}
                />
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-8 items-center bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="space-y-4">
                    <label className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <span>Group Delay / Latency ($\tau$)</span>
                        <span className="text-orange-500 font-black">{delay.toFixed(1)} ms</span>
                    </label>
                    <input type="range" min="0" max="10" step="0.5" value={delay} onChange={e => setDelay(parseFloat(e.target.value))} className="w-full accent-orange-500" />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed italic">
                    In any real-world filter (Causal), the output cannot precede the input. High-performance filters (like sharp cutoff brickwalls) inherently introduce <span className="text-white font-bold">Latency</span>. Non-causal systems are mathematically useful but physically impossible as they would require "seeing" the future input.
                </p>
            </div>
        </div>
    );
}
