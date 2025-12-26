import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DSSSSimulation() {
    const [dataBit, setDataBit] = useState(1);
    const [chipSequence, setChipSequence] = useState([1, -1, 1, 1, -1, 1, -1, -1]);
    const [noise, setNoise] = useState(0.2);

    const spreadSignal = chipSequence.map(c => c * dataBit);
    const noisySignal = spreadSignal.map(s => s + (Math.random() - 0.5) * noise * 4);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Transmitter Side */}
                <div className="space-y-6">
                    <div className="p-4 bg-orange-600/5 rounded-2xl border border-orange-500/20">
                        <h4 className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-4">Step 1: Spreading</h4>
                        <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl border transition-all ${dataBit === 1 ? 'bg-orange-600 border-orange-500' : 'bg-black border-white/10 text-gray-500'}`} onClick={() => setDataBit(dataBit === 1 ? -1 : 1)}>
                                {dataBit > 0 ? '1' : '0'}
                            </div>
                            <div className="text-gray-500 font-black">X</div>
                            <div className="flex space-x-1 flex-1 overflow-x-auto py-2">
                                {chipSequence.map((c, i) => (
                                    <div key={i} className={`w-6 h-8 rounded flex items-center justify-center text-[8px] font-mono border ${c > 0 ? 'bg-blue-600/20 border-blue-500/40 text-blue-400' : 'bg-purple-600/20 border-purple-500/40 text-purple-400'}`}>
                                        {c > 0 ? '1' : '0'}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 text-[10px] text-gray-500 italic">Data bit multiplied by high-speed PRN code</div>
                    </div>

                    <div className="h-40 bg-black/20 rounded-2xl border border-white/5 relative overflow-hidden p-4">
                        <h5 className="text-[9px] font-bold text-gray-600 uppercase mb-2">Transmitted Waveform (Spread)</h5>
                        <div className="absolute left-1 top-1/2 -rotate-90 text-[7px] text-gray-700 uppercase font-black">Level</div>
                        <svg width="100%" height="80%" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <path
                                d={`M ${spreadSignal.map((s, i) => `${(i / spreadSignal.length) * 100},${20 - s * 15} L ${((i + 1) / spreadSignal.length) * 100},${20 - s * 15}`).join(' ')}`}
                                stroke="#f97316" fill="none" strokeWidth="1"
                            />
                        </svg>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] text-gray-700 uppercase font-black">Chip Intervals (Tc)</div>
                    </div>
                </div>

                {/* Receiver Side */}
                <div className="space-y-6">
                    <div className="p-4 bg-green-600/5 rounded-2xl border border-green-500/20">
                        <h4 className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-4">Step 2: Despreading</h4>
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="text-[10px] text-gray-400 mb-2">Integrator Output</div>
                                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-green-500"
                                        animate={{ width: dataBit > 0 ? '100%' : '0%' }}
                                    />
                                </div>
                            </div>
                            <div className="ml-4 px-4 py-2 bg-black/40 rounded-xl border border-white/5 font-black text-white">
                                {dataBit > 0 ? 'REC 1' : 'REC 0'}
                            </div>
                        </div>
                    </div>

                    <div className="h-40 bg-black/20 rounded-2xl border border-white/5 relative overflow-hidden p-4">
                        <h5 className="text-[9px] font-bold text-gray-600 uppercase mb-2">Received with {noise > 0.3 ? 'Heavy' : 'Light'} Noise</h5>
                        <div className="absolute left-1 top-1/2 -rotate-90 text-[7px] text-gray-700 uppercase font-black">Noisy Level</div>
                        <svg width="100%" height="80%" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <path
                                d={`M ${noisySignal.map((s, i) => `${(i / noisySignal.length) * 100},${20 - s * 15}`).join(' L ')}`}
                                stroke="#ffffff" opacity="0.4" fill="none" strokeWidth="0.5"
                            />
                        </svg>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] text-gray-700 uppercase font-black">Sampling Instant (T)</div>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-none">Channel Interference Level (Jamming)</label>
                    <span className="text-orange-500 font-black">{(noise * 100).toFixed(0)}%</span>
                </div>
                <input
                    type="range" min="0" max="1" step="0.01" value={noise}
                    onChange={(e) => setNoise(parseFloat(e.target.value))}
                    className="w-full accent-orange-500 h-2 bg-black/40 rounded-full appearance-none mb-6"
                />
                <p className="text-xs text-gray-500 leading-relaxed italic">
                    Spread Spectrum achieves <span className="text-white font-bold">Processing Gain</span>. Even if noise is stronger than the signal, correlating with the known chip sequence "lifts" the signal back above the floor.
                </p>
            </div>
        </div>
    );
}
