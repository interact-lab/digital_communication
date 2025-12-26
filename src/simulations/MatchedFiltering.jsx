import React, { useState, useMemo } from 'react';

export default function MatchedFiltering() {
    const [noiseLevel, setNoiseLevel] = useState(0.5);

    const pulse = [0, 0, 1, 1, 1, 1, 1, 0, 0];
    const signal = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];

    const noisySignal = useMemo(() => {
        return signal.map(s => s + (Math.random() - 0.5) * noiseLevel * 4);
    }, [noiseLevel]);

    const output = useMemo(() => {
        const res = [];
        const h = [...pulse].reverse();
        for (let i = 0; i <= noisySignal.length - h.length; i++) {
            let sum = 0;
            for (let j = 0; j < h.length; j++) {
                sum += noisySignal[i + j] * h[j];
            }
            res.push(sum);
        }
        return res;
    }, [noisySignal]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Matched Filter Detection</h3>
                <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">SNR Maximization at $t = T$</p>
            </div>

            <div className="grid grid-rows-2 gap-8 mb-8">
                <div className="bg-black/20 rounded-2xl border border-white/5 p-4 relative">
                    <h4 className="text-[9px] font-bold text-gray-600 uppercase mb-4">Input Signal (Corrupted by Noise)</h4>
                    <div className="absolute left-1 top-1/2 -rotate-90 text-[7px] text-gray-700 uppercase font-black">Level</div>
                    <div className="h-24">
                        <svg width="100%" height="100%" viewBox="0 -3 15 6" preserveAspectRatio="none">
                            <path d={`M ${noisySignal.map((v, i) => `${i},${-v}`).join(' L ')}`} stroke="white" opacity="0.4" fill="none" strokeWidth="0.1" />
                            <path d={`M ${signal.map((v, i) => `${i},${-v}`).join(' L ')}`} stroke="#3b82f6" fill="none" strokeWidth="0.1" strokeDasharray="0.2" />
                        </svg>
                    </div>
                </div>

                <div className="bg-black/20 rounded-2xl border border-white/5 p-4 relative">
                    <h4 className="text-[9px] font-bold text-orange-500 uppercase mb-4">Filter Output (Cross-Correlation)</h4>
                    <div className="absolute left-1 top-1/2 -rotate-90 text-[7px] text-gray-700 uppercase font-black">Score</div>
                    <div className="h-24">
                        <svg width="100%" height="100%" viewBox="0 -1 7 7" preserveAspectRatio="none">
                            <path d={`M ${output.map((v, i) => `${i},${6 - v}`).join(' L ')}`} stroke="#f97316" fill="none" strokeWidth="0.2" />
                            {/* Detection Threshold */}
                            <line x1="0" y1="3" x2="7" y2="3" stroke="#ef4444" strokeWidth="0.1" strokeDasharray="0.1" />
                        </svg>
                    </div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] text-gray-700 uppercase font-black">Correlation Lag (τ)</div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-right">
                        <div className="text-xl font-black text-white">{(Math.max(...output)).toFixed(1)}</div>
                        <div className="text-[8px] text-gray-600 font-bold uppercase">Peak Correlation</div>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <span>Channel Noise Level</span>
                        <span className="text-orange-500 font-black">{(noiseLevel * 10).toFixed(1)} dB</span>
                    </div>
                    <input type="range" min="0" max="2" step="0.1" value={noiseLevel} onChange={e => setNoiseLevel(parseFloat(e.target.value))} className="w-full accent-orange-500" />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed italic border-t border-white/5 pt-4">
                    The Matched Filter has an impulse response $h(t) = s(T-t)$. It acts as a template matcher. Even when the signal is buried in noise (top), the filter "integrates" the energy to produce a strong peak at the exact moment the template matches the incoming pulse.
                </p>
            </div>
        </div>
    );
}
