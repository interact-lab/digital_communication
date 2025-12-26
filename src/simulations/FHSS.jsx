import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FHSSSimulation() {
    const [isHopping, setIsHopping] = useState(true);
    const [currentFreq, setCurrentFreq] = useState(0);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!isHopping) return;
        const interval = setInterval(() => {
            const nextFreq = Math.floor(Math.random() * 8);
            setCurrentFreq(nextFreq);
            setHistory(prev => [{ freq: nextFreq, time: Date.now() }, ...prev].slice(0, 20));
        }, 400);
        return () => clearInterval(interval);
    }, [isHopping]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Frequency Hopping (FHSS)</h3>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Resilience through temporal evasion</p>
                </div>
                <button
                    onClick={() => setIsHopping(!isHopping)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border transition-all ${isHopping ? 'bg-orange-600 border-orange-500 text-white' : 'bg-white/5 border-white/10 text-gray-400'}`}
                >
                    {isHopping ? 'Active Hopping' : 'Static Carrier'}
                </button>
            </div>

            <div className="flex-1 bg-black/20 rounded-2xl border border-white/5 p-8 grid grid-cols-[auto_1fr] md:gap-8 overflow-hidden">
                <div className="flex flex-col justify-between py-4 text-[9px] font-black text-gray-600 uppercase tracking-widest h-full">
                    {[7, 6, 5, 4, 3, 2, 1, 0].map(i => <span key={i}>CH {i + 1}</span>)}
                </div>

                <div className="relative border-l border-b border-white/10 h-full overflow-hidden">
                    {/* Waterfall / Spectrogram display */}
                    <div className="absolute inset-0 grid grid-rows-8 divide-y divide-white/[0.02]">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="relative">
                                {currentFreq === (7 - i) && (
                                    <motion.div
                                        layoutId="freq-indicator"
                                        className="absolute inset-0 bg-orange-600/40 border-y border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* History blocks */}
                    <div className="absolute inset-0 flex">
                        <AnimatePresence>
                            {history.map((h, i) => (
                                <motion.div
                                    key={h.time}
                                    initial={{ opacity: 0, x: 0 }}
                                    animate={{ opacity: 1 - i * 0.05, x: i * 40 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute w-8 h-[12.5%] bg-blue-600/20 border border-blue-500/30"
                                    style={{ bottom: `${h.freq * 12.5}%` }}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white/5 p-6 rounded-2xl border border-white/5">
                <p className="text-xs text-gray-500 leading-relaxed italic">
                    FHSS transmits data by rapidly switching a carrier among many frequency channels, using a pseudorandom sequence known to both transmitter and receiver. This makes the signal highly resistant to <span className="text-white font-bold">Narrowband Jamming</span> and eavesdropping, as the "target" frequency is constantly moving.
                </p>
            </div>
        </div>
    );
}
