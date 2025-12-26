import React, { useState, useMemo } from 'react';

export default function PulseShaping() {
    const [rollOff, setRollOff] = useState(0.5); // alpha
    const [samplesPerSymbol, setSamplesPerSymbol] = useState(8);

    // Raised Cosine Filter
    const filter = useMemo(() => {
        const T = 1;
        const size = 32;
        const response = [];
        for (let i = -size; i < size; i++) {
            const t = (i / samplesPerSymbol);
            if (t === 0) response.push(1);
            else {
                const sinc = Math.sin(Math.PI * t) / (Math.PI * t);
                const cosPart = Math.cos(Math.PI * rollOff * t) / (1 - Math.pow(2 * rollOff * t, 2));
                response.push(sinc * cosPart);
            }
        }
        return response;
    }, [rollOff, samplesPerSymbol]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time Domain Impulse Response $p(t)$</h4>
                    <div className="h-48 bg-black/20 rounded-2xl border border-white/5 p-4 relative">
                        <div className="absolute left-1 top-1/2 -rotate-90 text-[7px] text-gray-700 uppercase font-black">Amplitude</div>
                        <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <line x1="0" y1="35" x2="100" y2="35" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
                            <line x1="50" y1="0" x2="50" y2="40" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
                            <path
                                d={`M ${filter.map((v, i) => `${(i / filter.length) * 100},${35 - v * 30}`).join(' L ')}`}
                                stroke="#f97316" fill="none" strokeWidth="1"
                            />
                        </svg>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] text-gray-700 uppercase font-black">Time (t/T)</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Spectral Occupancy $P(f)$</h4>
                    <div className="h-48 bg-black/20 rounded-2xl border border-white/5 p-4 relative">
                        <div className="absolute left-1 top-1/2 -rotate-90 text-[7px] text-gray-700 uppercase font-black">Magnitude</div>
                        <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <line x1="0" y1="35" x2="100" y2="35" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
                            {/* Rough spectral shape of Raised Cosine */}
                            <path
                                d={`M 0,5 L 40,5 C 50,5 50,35 60,35 L 100,35`}
                                stroke="#3b82f6" fill="none" strokeWidth="2"
                                style={{ strokeDasharray: 200, strokeDashoffset: -rollOff * 50 }}
                            />
                        </svg>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] text-gray-700 uppercase font-black">Frequency (f)</div>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <div className="flex justify-between mb-4">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Roll-off Factor ($\alpha$)</label>
                    <span className="text-orange-500 font-black">{rollOff.toFixed(2)}</span>
                </div>
                <input
                    type="range" min="0" max="1" step="0.01" value={rollOff}
                    onChange={(e) => setRollOff(parseFloat(e.target.value))}
                    className="w-full accent-orange-500 h-1.5"
                />
                <div className="flex justify-between text-[8px] text-gray-600 font-bold mt-2 uppercase tracking-tighter">
                    <span>Ideal Brickwall (Hard ISI)</span>
                    <span>Raised Cosine (Smooth)</span>
                </div>

                <p className="mt-8 text-xs text-gray-400 leading-relaxed italic border-t border-white/5 pt-4">
                    Pulses must have zero-crossings at every symbol interval $T$ to avoid <span className="text-white font-bold">Inter-Symbol Interference (ISI)</span>. A higher roll-off factor makes the pulse decay faster in time (easier sync) but consumes more bandwidth in frequency.
                </p>
            </div>
        </div>
    );
}
