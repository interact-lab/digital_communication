import React, { useState, useMemo } from 'react';

export default function FilterWindowing() {
    const [harmonics, setHarmonics] = useState(1);
    const [windowType, setWindowType] = useState('rectangular'); // rectangular, hamming

    const squareWaveData = useMemo(() => {
        const points = [];
        const N = 300;
        for (let i = 0; i < N; i++) {
            const t = (i / N) * 2 * Math.PI;
            let val = 0;
            for (let n = 1; n <= harmonics; n += 2) {
                const weight = windowType === 'hamming'
                    ? (0.54 - 0.46 * Math.cos(2 * Math.PI * n / (harmonics + 1)))
                    : 1;
                val += weight * (4 / (Math.PI * n)) * Math.sin(n * t);
            }
            points.push({ t, val });
        }
        return points;
    }, [harmonics, windowType]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Gibbs Phenomenon</h3>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Truncation & Windowing effects</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-xl">
                    {['rectangular', 'hamming'].map((w) => (
                        <button
                            key={w}
                            onClick={() => setWindowType(w)}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${windowType === w ? 'bg-orange-600 text-white' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {w}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-black/20 rounded-2xl border border-white/5 p-8 h-64 mb-8 relative">
                <svg width="100%" height="100%" viewBox="0 -1.5 6.28 3" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="6.28" y2="0" stroke="white" strokeOpacity="0.1" strokeWidth="0.02" />
                    <path
                        d={`M ${squareWaveData.map(p => `${p.t},${-p.val}`).join(' L ')}`}
                        stroke="#f97316" fill="none" strokeWidth="0.05"
                    />
                    {/* Ideal Square Line */}
                    <path
                        d="M 0,-1 L 3.14,-1 L 3.14,1 L 6.28,1"
                        stroke="white" strokeOpacity="0.2" fill="none" strokeWidth="0.02" strokeDasharray="0.1"
                    />
                </svg>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="space-y-4">
                    <label className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">
                        <span>Frequency Components ($N$)</span>
                        <span className="text-orange-500 font-black">{harmonics}</span>
                    </label>
                    <input type="range" min="1" max="51" step="2" value={harmonics} onChange={e => setHarmonics(parseInt(e.target.value))} className="w-full accent-orange-500" />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed italic">
                    {windowType === 'rectangular'
                        ? "The Rectangular window (sharp truncation) causes ~9% overshoot at discontinuities, regardless of $N$. This is the Gibbs Phenomenon."
                        : "Hamming window smooths the truncation, significantly reducing ripples (ringing) at the cost of slower transition edges (main lobe width)."}
                </p>
            </div>
        </div>
    );
}
