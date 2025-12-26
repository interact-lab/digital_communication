import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PNSequence() {
    const [register, setRegister] = useState([1, 0, 0, 1]);
    const [history, setHistory] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    const step = () => {
        // Feedback for m-sequence (taps: 4, 3)
        const feedback = register[3] ^ register[2];
        const newReg = [feedback, ...register.slice(0, 3)];
        setRegister(newReg);
        setHistory(prev => [...prev, register[3]].slice(-32));
    };

    useEffect(() => {
        if (!isRunning) return;
        const interval = setInterval(step, 300);
        return () => clearInterval(interval);
    }, [isRunning, register]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">PRN Generation (LFSR)</h3>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Linear Feedback Shift Register</p>
                </div>
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase border transition-all ${isRunning ? 'bg-red-600/20 border-red-500 text-red-500' : 'bg-green-600/20 border-green-500 text-green-500'}`}
                >
                    {isRunning ? 'Stop LFSR' : 'Start Sequence'}
                </button>
            </div>

            <div className="flex-1 space-y-12 flex flex-col justify-center">
                {/* LFSR Visualization */}
                <div className="flex items-center justify-center space-x-4 relative">
                    <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 text-[8px] font-black text-orange-500/40 uppercase tracking-[0.5em]">Feedback Topology</div>
                    {register.map((val, i) => (
                        <div key={i} className="relative">
                            <motion.div
                                layoutId={`reg-${i}`}
                                className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl font-black transition-all ${val === 1 ? 'bg-orange-600/20 border-orange-500 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]' : 'bg-black border-white/10 text-gray-700'}`}
                            >
                                {val}
                            </motion.div>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-gray-600 uppercase">
                                Reg stage {i}
                            </div>
                            {i < 3 && (
                                <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-gray-700">→</div>
                            )}
                        </div>
                    ))}
                    <div className="pl-8 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full border border-orange-500/50 flex items-center justify-center text-orange-500 font-black text-xs">⊕</div>
                        <div className="text-[7px] text-gray-600 font-bold uppercase mt-2">Modulo-2 Sum</div>
                    </div>
                </div>

                {/* Generated Stream */}
                <div className="bg-black/20 rounded-2xl border border-white/5 p-6 overflow-hidden">
                    <div className="text-[9px] font-bold text-gray-600 uppercase mb-4">Pseudo-Random Bitstream</div>
                    <div className="flex gap-1 flex-wrap">
                        {history.map((bit, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`w-4 h-6 rounded flex items-center justify-center text-[10px] font-bold ${bit === 1 ? 'bg-orange-600 text-white' : 'bg-white/5 text-gray-600'}`}
                            >
                                {bit}
                            </motion.div>
                        ))}
                        <motion.div className="w-1 h-6 bg-orange-500 animate-pulse" />
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white/5 p-6 rounded-2xl border border-white/5">
                <p className="text-xs text-gray-500 leading-relaxed italic">
                    Pseudo-Noise (PN) sequences look like random noise but are deterministic. Using an <span className="text-white font-bold">LFSR</span> with primitive polynomials ensures a maximal length sequence (m-sequence) of $2^n - 1$ states before repeating. These sequences provide the "keys" for CDMA and spread spectrum isolation.
                </p>
            </div>
        </div>
    );
}
