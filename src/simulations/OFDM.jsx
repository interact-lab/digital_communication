import React, { useState, useMemo } from 'react';

export default function OFDMSimulation() {
    const [subcarriers, setSubcarriers] = useState(8);
    const [spacing, setSpacing] = useState(1); // 1 = Orthogonal

    const plotData = useMemo(() => {
        const points = 500;
        const xRange = 10;
        const data = [];

        for (let i = 0; i < points; i++) {
            const f = (i / points) * xRange - (xRange / 2);
            let total = 0;
            const spectra = [];

            for (let k = 0; k < subcarriers; k++) {
                const fc = k - (subcarriers - 1) / 2;
                // Sinc function for spectrum of rectangular pulse
                const x = Math.PI * (f - fc * spacing);
                const val = x === 0 ? 1 : Math.sin(x) / x;
                const power = val * val;
                spectra.push(power);
                total += power;
            }
            data.push({ f, total, spectra });
        }
        return data;
    }, [subcarriers, spacing]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Spectral Orthogonality</h3>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Multi-Carrier frequency response</p>
                </div>
                <div className="flex space-x-8">
                    <div className="text-right">
                        <div className={`text-2xl font-black ${spacing === 1 ? 'text-green-500' : 'text-red-500'}`}>
                            {spacing === 1 ? 'ORTHOGONAL' : 'INTERFERING'}
                        </div>
                        <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Channel State</div>
                    </div>
                </div>
            </div>

            <div className="h-64 bg-black/20 rounded-2xl relative border border-white/5 p-4 mb-8">
                <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
                    {/* Guidelines */}
                    <line x1="0" y1="180" x2="500" y2="180" stroke="white" strokeOpacity="0.1" />

                    {/* Individual Subcarriers */}
                    {Array.from({ length: subcarriers }).map((_, k) => (
                        <path
                            key={k}
                            d={`M ${plotData.map((d, i) => `${(i / 500) * 500},${180 - d.spectra[k] * 120}`).join(' L ')}`}
                            fill="none"
                            stroke={spacing === 1 ? "rgba(249, 115, 22, 0.3)" : "rgba(239, 68, 68, 0.3)"}
                            strokeWidth="1.5"
                        />
                    ))}

                    {/* Total Envelop */}
                    <path
                        d={`M ${plotData.map((d, i) => `${(i / 500) * 500},${180 - d.total * 60}`).join(' L ')}`}
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="3"
                    />
                </svg>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 font-mono">
                    Frequency (Hz) →
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex justify-between">
                            <span>Subcarrier Spacing ($\Delta f$)</span>
                            <span className={spacing === 1 ? 'text-green-500' : 'text-orange-500'}>{spacing.toFixed(2)} Hz</span>
                        </label>
                        <input
                            type="range" min="0.5" max="2" step="0.01" value={spacing}
                            onChange={(e) => setSpacing(parseFloat(e.target.value))}
                            className="w-full accent-orange-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex justify-between">
                            <span>Number of carriers ($N$)</span>
                            <span className="text-white">{subcarriers}</span>
                        </label>
                        <input
                            type="range" min="4" max="16" step="2" value={subcarriers}
                            onChange={(e) => setSubcarriers(parseInt(e.target.value))}
                            className="w-full accent-orange-500"
                        />
                    </div>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
                    <p className="text-sm text-gray-400 leading-relaxed italic">
                        {spacing === 1
                            ? "At Δf = 1/T, the peak of each subcarrier aligns with the zeros of all other subcarriers. This is the definition of orthogonality."
                            : "Mismatch in spacing causes Inter-Carrier Interference (ICI), where energy from one wave leaks into its neighbors, leading to data corruption."}
                    </p>
                </div>
            </div>
        </div>
    );
}
