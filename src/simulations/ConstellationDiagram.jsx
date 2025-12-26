import React, { useState, useMemo } from 'react';

export default function ConstellationDiagram() {
    const [qamLevel, setQamLevel] = useState(16);
    const [noise, setNoise] = useState(0.05);
    const [phaseJitter, setPhaseJitter] = useState(0);

    const points = useMemo(() => {
        const side = Math.sqrt(qamLevel);
        const pts = [];
        for (let i = 0; i < side; i++) {
            for (let j = 0; j < side; j++) {
                const iVal = (i - (side - 1) / 2) / ((side - 1) / 2);
                const qVal = (j - (side - 1) / 2) / ((side - 1) / 2);
                pts.push({ i: iVal, q: qVal });
            }
        }
        return pts;
    }, [qamLevel]);

    const noisyPoints = useMemo(() => {
        const totalSamples = 1000;
        const samples = [];
        for (let i = 0; i < totalSamples; i++) {
            const base = points[Math.floor(Math.random() * points.length)];

            // Add AWGN
            let noiseI = (Math.random() - 0.5) * noise * 2;
            let noiseQ = (Math.random() - 0.5) * noise * 2;

            let iVal = base.i + noiseI;
            let qVal = base.q + noiseQ;

            // Add Phase Jitter
            if (phaseJitter > 0) {
                const angle = (Math.random() - 0.5) * phaseJitter * Math.PI;
                const r = Math.sqrt(iVal * iVal + qVal * qVal);
                const theta = Math.atan2(qVal, iVal) + angle;
                iVal = r * Math.cos(theta);
                qVal = r * Math.sin(theta);
            }

            samples.push({ i: iVal, q: qVal });
        }
        return samples;
    }, [points, noise, phaseJitter]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 grid md:grid-cols-2 gap-12">
            <div className="bg-black/20 rounded-2xl aspect-square relative border border-white/5 overflow-hidden">
                <svg width="100%" height="100%" viewBox="-1.5 -1.5 3 3">
                    {/* Grid */}
                    <line x1="-1.5" y1="0" x2="1.5" y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="0.01" />
                    <line x1="0" y1="-1.5" x2="0" y2="1.5" stroke="rgba(255,255,255,0.05)" strokeWidth="0.01" />

                    {/* Noisy Samples */}
                    {noisyPoints.map((p, i) => (
                        <circle key={i} cx={p.i} cy={p.q} r="0.01" fill="#f97316" opacity="0.4" />
                    ))}

                    {/* Ideal Points */}
                    {points.map((p, i) => (
                        <circle key={i} cx={p.i} cy={p.q} r="0.05" fill="none" stroke="#ffffff" strokeWidth="0.01" opacity="0.3" />
                    ))}

                    {/* Labels */}
                    <text x="0.8" y="0.1" fontSize="0.08" fill="#4b5563" fontWeight="bold">In-Phase (I)</text>
                    <text x="0.1" y="-1.3" fontSize="0.08" fill="#4b5563" fontWeight="bold" transform="rotate(90, 0.1, -1.3)">Quadrature (Q)</text>
                </svg>
            </div>

            <div className="space-y-8 flex flex-col justify-center">
                <div className="space-y-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">Modulation Scheme</label>
                    <div className="flex flex-wrap gap-2">
                        {[4, 16, 64, 256].map(level => (
                            <button
                                key={level}
                                onClick={() => setQamLevel(level)}
                                className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all border ${qamLevel === level ? 'bg-orange-600 border-orange-500 shadow-lg shadow-orange-900/20' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            >
                                {level}-QAM
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Additive Noise (AWGN)</label>
                        <span className="text-orange-500 font-mono">{(noise * 10).toFixed(1)}</span>
                    </div>
                    <input
                        type="range" min="0" max="0.5" step="0.01" value={noise}
                        onChange={(e) => setNoise(parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phase Jitter</label>
                        <span className="text-orange-500 font-mono">{(phaseJitter * 100).toFixed(0)}°</span>
                    </div>
                    <input
                        type="range" min="0" max="0.5" step="0.01" value={phaseJitter}
                        onChange={(e) => setPhaseJitter(parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                </div>

                <div className="p-6 rounded-2xl bg-orange-600/5 border border-orange-500/10">
                    <h5 className="text-xs font-bold text-orange-500 uppercase mb-2">Observation</h5>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        As noise increases, symbol "clouds" begin to overlap, leading to Bit Error Rate (BER) degradation. Phase jitter causes the clouds to rotate around the origin.
                    </p>
                </div>
            </div>
        </div>
    );
}
