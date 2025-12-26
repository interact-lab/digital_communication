import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Orthogonality() {
    const [phaseShift, setPhaseShift] = useState(0); // degrees

    const seqA = [1, 1, -1, -1];
    const seqB = useMemo(() => {
        // Rotating second sequence to show loss of orthogonality
        const rad = (phaseShift * Math.PI) / 180;
        return seqA.map((v, i) => Math.cos(rad) * seqA[i] + Math.sin(rad) * (i % 2 === 0 ? 1 : -1));
    }, [phaseShift]);

    const dotProduct = useMemo(() => {
        return seqA.reduce((acc, v, i) => acc + v * seqB[i], 0);
    }, [seqB]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Orthogonal Channels</h3>
                <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Cross-Correlation Isolation ($\int s_1(t)s_2(t)dt = 0$)</p>
            </div>

            <div className="flex-1 grid md:grid-cols-2 gap-12 mb-8 items-center">
                <div className="space-y-8">
                    <div className="relative h-48 w-48 mx-auto">
                        <svg width="100%" height="100%" viewBox="-2 -2 4 4">
                            <circle cx="0" cy="0" r="1.5" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="0.02" />
                            <line x1="-2" y1="0" x2="2" y2="0" stroke="white" strokeOpacity="0.1" strokeWidth="0.01" />
                            <line x1="0" y1="-2" x2="0" y2="2" stroke="white" strokeOpacity="0.1" strokeWidth="0.01" />

                            {/* Vector A */}
                            <line x1="0" y1="0" x2="1.5" y2="0" stroke="#3b82f6" strokeWidth="0.05" markerEnd="url(#arrow)" />
                            {/* Vector B */}
                            <motion.line
                                x1="0" y1="0"
                                animate={{
                                    x2: 1.5 * Math.cos(phaseShift * Math.PI / 180),
                                    y2: 1.5 * Math.sin(phaseShift * Math.PI / 180)
                                }}
                                stroke="#f97316" strokeWidth="0.05"
                            />
                        </svg>
                        <div className="absolute top-0 right-0 text-[8px] font-bold text-blue-500 uppercase">Channel 1</div>
                        <div className="absolute top-8 right-0 text-[8px] font-bold text-orange-500 uppercase">Channel 2</div>
                    </div>
                </div>

                <div className="bg-black/20 rounded-3xl border border-white/5 p-8 flex flex-col items-center">
                    <div className="text-[10px] font-bold text-gray-600 uppercase mb-4">Correlation (Isolation)</div>
                    <div className={`text-5xl font-black transition-colors ${Math.abs(dotProduct) < 0.1 ? 'text-green-500' : 'text-red-500'}`}>
                        {Math.abs(dotProduct) < 0.01 ? '0.00' : dotProduct.toFixed(2)}
                    </div>
                    <div className="mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-widest uppercase">
                        {Math.abs(dotProduct) < 0.1 ? 'Perfect Isolation' : 'Inter-Channel Interference'}
                    </div>
                </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between mb-4">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">Rotation (Loss of Orthogonality)</label>
                    <span className="text-orange-500 font-black">{phaseShift}°</span>
                </div>
                <input type="range" min="0" max="180" value={phaseShift} onChange={e => setPhaseShift(parseInt(e.target.value))} className="w-full accent-orange-500 h-1.5" />
                <p className="mt-6 text-xs text-gray-500 leading-relaxed italic">
                    Orthogonality ensures that multiple signals can occupy the same space/time without interfering. At 90°, the projection of one signal onto the other is zero, allowing a receiver to perfectly separate them. Timing jitter or phase shifts rotate these vectors, causing "leakage" between users.
                </p>
            </div>
        </div>
    );
}
