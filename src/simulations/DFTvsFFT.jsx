import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function DFTvsFFT() {
    const [N, setN] = useState(8);

    const dftMults = N * N;
    const fftMults = (N / 2) * Math.log2(N);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
                {/* DFT Visualization */}
                <div className="space-y-4">
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest text-center">DFT Complexity (O(N²))</h4>
                    <div className="aspect-square bg-black/20 rounded-2xl relative overflow-hidden border border-white/5 flex items-center justify-center p-4">
                        <svg width="100%" height="100%" viewBox="0 0 100 100">
                            {/* Dense Mesh */}
                            {Array.from({ length: N }).map((_, i) => (
                                Array.from({ length: N }).map((_, j) => (
                                    <line
                                        key={`${i}-${j}`}
                                        x1={(i / (N - 1)) * 100} y1="0"
                                        x2={(j / (N - 1)) * 100} y2="100"
                                        stroke="#f97316" strokeWidth="0.1" opacity="0.2"
                                    />
                                ))
                            ))}
                            <rect x="0" y="0" width="100" height="2" fill="#ea580c" />
                            <rect x="0" y="98" width="100" height="2" fill="#ea580c" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-4xl font-black text-white/10 italic">N²</div>
                        </div>
                    </div>
                    <div className="text-center p-4 bg-orange-500/5 rounded-xl border border-orange-500/10">
                        <div className="text-2xl font-mono font-black text-white">{dftMults}</div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Complex Multiplications</div>
                    </div>
                </div>

                {/* FFT Visualization */}
                <div className="space-y-4">
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest text-center">FFT Complexity (O(N log N))</h4>
                    <div className="aspect-square bg-black/20 rounded-2xl relative overflow-hidden border border-white/5 flex items-center justify-center p-4">
                        <svg width="100%" height="100%" viewBox="0 0 100 100">
                            {/* Butterfly Stages */}
                            {Array.from({ length: Math.log2(N) }).map((_, stage) => {
                                const stageWidth = 100 / Math.log2(N);
                                const xStart = stage * stageWidth;
                                const xEnd = (stage + 1) * stageWidth;
                                return Array.from({ length: N }).map((_, i) => (
                                    <line
                                        key={`${stage}-${i}`}
                                        x1={xStart} y1={(i / (N - 1)) * 100}
                                        x2={xEnd} y2={((i ^ (1 << stage)) / (N - 1)) * 100}
                                        stroke="#3b82f6" strokeWidth="0.5" opacity="0.6"
                                    />
                                ))
                            })}
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-4xl font-black text-white/10 italic">N log N</div>
                        </div>
                    </div>
                    <div className="text-center p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                        <div className="text-2xl font-mono font-black text-white">{fftMults.toFixed(0)}</div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Complex Multiplications</div>
                    </div>
                </div>
            </div>

            <div className="max-w-md mx-auto space-y-4">
                <div className="flex justify-between items-center px-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Number of Points (N)</label>
                    <span className="text-orange-500 font-black text-2xl">{N}</span>
                </div>
                <div className="flex gap-2">
                    {[4, 8, 16, 32, 64].map(val => (
                        <button
                            key={val}
                            onClick={() => setN(val)}
                            className={`flex-1 py-3 rounded-xl font-bold transition-all border ${N === val ? 'bg-orange-600 border-orange-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                        >
                            {val}
                        </button>
                    ))}
                </div>
                <p className="text-center text-[10px] text-gray-500 mt-4 leading-relaxed font-medium">
                    Efficiency Gain: <span className="text-green-500 font-bold">{(dftMults / fftMults).toFixed(1)}x Faster</span> processing with FFT at N={N}.
                </p>
            </div>
        </div>
    );
}
