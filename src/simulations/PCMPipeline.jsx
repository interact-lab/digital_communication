import React, { useState, useMemo } from 'react';

export default function PCMPipeline() {
    const [bitDepth, setBitDepth] = useState(3);
    const [samplingRate, setSamplingRate] = useState(10);

    const levels = Math.pow(2, bitDepth);

    const data = useMemo(() => {
        const points = 100;
        const analog = [];
        const sampled = [];
        const quantized = [];

        for (let i = 0; i <= points; i++) {
            const t = (i / points) * 2 * Math.PI;
            analog.push(Math.sin(t));
        }

        // Sampling
        for (let i = 0; i <= samplingRate; i++) {
            const t = (i / samplingRate) * 2 * Math.PI;
            const val = Math.sin(t);
            sampled.push({ t, val });

            // Quantization
            const quantizedVal = Math.round(((val + 1) / 2) * (levels - 1)) / (levels - 1) * 2 - 1;
            quantized.push({ t, val: quantizedVal });
        }

        return { analog, sampled, quantized };
    }, [bitDepth, samplingRate, levels]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8">
            <div className="relative h-64 mb-8 bg-black/20 rounded-2xl p-4">
                <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {/* Grid lines for levels */}
                    {Array.from({ length: levels }).map((_, i) => (
                        <line key={i} x1="0" y1={(i / (levels - 1)) * 180 + 10} x2="400" y2={(i / (levels - 1)) * 180 + 10} stroke="rgba(255,255,255,0.05)" />
                    ))}

                    {/* Analog Signal */}
                    <path
                        d={`M ${data.analog.map((v, i) => `${(i / 100) * 400},${100 - v * 80}`).join(' L ')}`}
                        fill="none" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1"
                    />

                    {/* Quantized Path */}
                    <path
                        d={`M ${data.quantized.map((p, i) => {
                            const x = (i / samplingRate) * 400;
                            const y = 100 - p.val * 80;
                            return `${x},${y}`;
                        }).join(' L ')}`}
                        fill="none" stroke="#f97316" strokeWidth="2" strokeLinejoin="round"
                    />

                    {/* Sample Points */}
                    {data.quantized.map((p, i) => (
                        <circle key={i} cx={(i / samplingRate) * 400} cy={100 - p.val * 80} r="3" fill="#ffffff" />
                    ))}
                </svg>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Resolution (Bit Depth)</label>
                            <span className="text-orange-500 font-bold">{bitDepth} Bits</span>
                        </div>
                        <input
                            type="range" min="1" max="8" step="1" value={bitDepth}
                            onChange={(e) => setBitDepth(parseInt(e.target.value))}
                            className="w-full accent-orange-500"
                        />
                        <div className="flex justify-between text-[10px] text-gray-600 font-mono">
                            <span>2 Levels</span>
                            <span>{levels} Levels</span>
                            <span>256 Levels</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sampling Rate</label>
                            <span className="text-orange-500 font-bold">{samplingRate} Hz</span>
                        </div>
                        <input
                            type="range" min="4" max="50" step="1" value={samplingRate}
                            onChange={(e) => setSamplingRate(parseInt(e.target.value))}
                            className="w-full accent-orange-500"
                        />
                    </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center justify-between">
                        Binary Output Stream
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] rounded uppercase font-black">Live</span>
                    </h4>
                    <div className="font-mono text-xs break-all bg-black/40 p-3 rounded-lg text-orange-400 leading-relaxed max-h-24 overflow-y-auto">
                        {data.quantized.map((p, i) => {
                            const val = Math.round(((p.val + 1) / 2) * (levels - 1));
                            return val.toString(2).padStart(bitDepth, '0') + ' ';
                        })}
                    </div>
                    <div className="pt-4 border-t border-white/5 text-[11px] text-gray-500">
                        SNR Processing Gain: <span className="text-white font-bold">~{(bitDepth * 6).toFixed(1)} dB</span> (6dB rule)
                    </div>
                </div>
            </div>
        </div>
    );
}
