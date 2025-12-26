import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ChromaticDispersion() {
    const [dispersion, setDispersion] = useState(20);
    const [fiberLength, setFiberLength] = useState(50);

    const wavelengths = [
        { color: '#ef4444', label: '1550nm', speed: 1.0 },
        { color: '#10b981', label: '1310nm', speed: 1.05 },
        { color: '#3b82f6', label: '850nm', speed: 1.1 },
    ];

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Chromatic Dispersion</h3>
                <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Fiber smearing over distance ($D \cdot L \cdot \Delta \lambda$)</p>
            </div>

            <div className="flex-1 bg-black/20 rounded-2xl border border-white/5 p-8 flex flex-col justify-center relative overflow-hidden">
                <div className="mb-12">
                    <div className="text-[10px] font-bold text-gray-600 uppercase mb-4">Pulse Components entering Fiber</div>
                    <div className="flex space-x-1">
                        {wavelengths.map(w => (
                            <div key={w.label} className="w-10 h-6 rounded border border-white/10" style={{ backgroundColor: w.color }} />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="text-[10px] font-bold text-gray-600 uppercase">Propagation through {fiberLength}km Fiber</div>
                    <div className="h-24 bg-black/40 rounded-full border border-white/5 relative overflow-hidden flex items-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent w-20" />
                        {wavelengths.map((w, i) => (
                            <motion.div
                                key={w.label}
                                className="absolute w-4 h-12 blur-sm rounded-full"
                                style={{ backgroundColor: w.color }}
                                animate={{
                                    x: [0, 800],
                                    opacity: [0, 1, 1, 0]
                                }}
                                transition={{
                                    duration: 4 / (w.speed - (dispersion / 1000) * i),
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-12">
                    <div className="flex justify-between items-end mb-2">
                        <div className="text-[10px] font-bold text-gray-600 uppercase">Output Pulse (Smearing / ISI)</div>
                        <div className="text-[8px] font-black text-red-500 uppercase tracking-widest">Time Delay Spread ($\Delta\tau$)</div>
                    </div>
                    <div className="h-12 bg-white/5 rounded-xl border border-white/5 flex items-center px-4 relative">
                        <div className="absolute left-2 text-[7px] text-gray-700 font-bold uppercase">Rx</div>
                        <div className="flex-1 h-2 relative">
                            {/* Smear visualization */}
                            <div
                                className="absolute inset-0 bg-red-500/20 blur-md transition-all duration-500"
                                style={{ width: `${10 + dispersion * 2}%`, left: '40%' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-8 bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            <span>Fiber Length ($L$)</span>
                            <span className="text-white font-black">{fiberLength} km</span>
                        </label>
                        <input type="range" min="1" max="100" value={fiberLength} onChange={e => setFiberLength(parseInt(e.target.value))} className="w-full accent-orange-500" />
                    </div>
                    <div className="space-y-2">
                        <label className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            <span>Dispersion Coefficient ($D$)</span>
                            <span className="text-white font-black">{dispersion} ps/(nm·km)</span>
                        </label>
                        <input type="range" min="0" max="50" value={dispersion} onChange={e => setDispersion(parseInt(e.target.value))} className="w-full accent-orange-500" />
                    </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed italic">
                    Different spectral components of a signal travel at different group velocities. Over long distances, this causes the pulse to "spread" in time, leading to <span className="text-white font-bold">Inter-Symbol Interference (ISI)</span> and limiting the maximum data rate (baud rate) of optical networks.
                </p>
            </div>
        </div>
    );
}
