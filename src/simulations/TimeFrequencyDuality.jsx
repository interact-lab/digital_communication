import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function TimeFrequencyDuality() {
    const [activeDomain, setActiveDomain] = useState('time'); // time or frequency
    const [pulseWidth, setPulseWidth] = useState(0.2);

    const calculatePoints = (domain, width) => {
        const points = [];
        const N = 100;
        if (domain === 'time') {
            // Rectangular pulse in time
            for (let i = 0; i < N; i++) {
                const t = (i / N) * 2 - 1;
                const val = Math.abs(t) < width ? 1 : 0;
                points.push({ x: t, y: val });
            }
        } else {
            // Sinc in frequency
            for (let i = 0; i < N; i++) {
                const f = (i / N) * 20 - 10;
                const x = Math.PI * f * width;
                const val = x === 0 ? 1 : Math.sin(x) / x;
                points.push({ x: f, y: val });
            }
        }
        return points;
    };

    const timeData = useMemo(() => calculatePoints('time', pulseWidth), [pulseWidth]);
    const freqData = useMemo(() => calculatePoints('frequency', pulseWidth), [pulseWidth]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">IFFT Duality</h3>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Time ↔ Frequency reciprocity</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-xl">
                    {['time', 'frequency'].map((d) => (
                        <button
                            key={d}
                            onClick={() => setActiveDomain(d)}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${activeDomain === d ? 'bg-orange-600 text-white' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {d === 'time' ? 'Time Domain' : 'Freq Domain'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                    <div className="h-48 bg-black/20 rounded-2xl border border-white/5 p-4 relative overflow-hidden">
                        <h4 className="absolute top-2 left-4 text-[9px] font-bold text-gray-600 uppercase">Rectangular Pulse</h4>
                        <svg width="100%" height="80%" viewBox="-1 -0.2 2 1.4" preserveAspectRatio="none">
                            <path
                                d={`M ${timeData.map((p) => `${p.x},${1 - p.y}`).join(' L ')}`}
                                stroke="#f97316" fill="none" strokeWidth="0.05"
                            />
                            <line x1="-1" y1="1" x2="1" y2="1" stroke="white" strokeOpacity="0.1" strokeWidth="0.01" />
                        </svg>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="h-48 bg-black/20 rounded-2xl border border-white/5 p-4 relative overflow-hidden">
                        <h4 className="absolute top-2 left-4 text-[9px] font-bold text-gray-600 uppercase">Sinc Spectrum</h4>
                        <svg width="100%" height="80%" viewBox="-10 -0.5 20 2" preserveAspectRatio="none">
                            <path
                                d={`M ${freqData.map((p) => `${p.x},${1 - p.y}`).join(' L ')}`}
                                stroke="#3b82f6" fill="none" strokeWidth="0.1"
                            />
                            <line x1="-10" y1="1" x2="10" y2="1" stroke="white" strokeOpacity="0.1" strokeWidth="0.05" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between mb-4">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pulse Width ($T$)</label>
                    <span className="text-orange-500 font-black">{pulseWidth.toFixed(2)}</span>
                </div>
                <input
                    type="range" min="0.05" max="0.5" step="0.01" value={pulseWidth}
                    onChange={(e) => setPulseWidth(parseFloat(e.target.value))}
                    className="w-full accent-orange-500 mb-6"
                />
                <p className="text-xs text-gray-400 leading-relaxed italic">
                    Scaling Theorem: A narrow pulse in time ($T \downarrow$) results in a broad spectrum in frequency ($BW \uparrow$).
                    This is the fundamental principle behind high-speed communication: faster bits require more bandwidth.
                </p>
            </div>
        </div>
    );
}
