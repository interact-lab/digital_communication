import React, { useState } from 'react';

export default function LineCoding() {
    const [data] = useState([1, 0, 1, 1, 0, 0, 1]);
    const [scheme, setScheme] = useState('nrz'); // nrz, rz, manchester, ami

    const getPoints = () => {
        let pts = "M 0,20 ";
        const w = 100 / data.length;

        data.forEach((bit, i) => {
            const x = i * w;
            if (scheme === 'nrz') {
                const y = bit === 1 ? 5 : 35;
                pts += `L ${x},${y} L ${x + w},${y} `;
            } else if (scheme === 'rz') {
                const y = bit === 1 ? 5 : 20;
                pts += `L ${x},${y} L ${x + w / 2},${y} L ${x + w / 2},20 L ${x + w},20 `;
            } else if (scheme === 'manchester') {
                const startY = bit === 1 ? 35 : 5;
                const endY = bit === 1 ? 5 : 35;
                pts += `L ${x},${startY} L ${x + w / 2},${startY} L ${x + w / 2},${endY} L ${x + w},${endY} `;
            }
        });
        return pts;
    };

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="flex space-x-2 mb-8 bg-white/5 p-1 rounded-2xl w-fit mx-auto">
                {['nrz', 'rz', 'manchester'].map((s) => (
                    <button
                        key={s} onClick={() => setScheme(s)}
                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${scheme === s ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <div className="flex-1 bg-black/20 rounded-2xl border border-white/5 p-2 px-10 relative overflow-hidden flex flex-col justify-center">
                {/* Bit labels */}
                <div className="flex justify-between mb-4">
                    {data.map((b, i) => <span key={i} className="text-[10px] font-black text-gray-700">{b}</span>)}
                </div>

                <div className="h-40 relative">
                    <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
                        {Array.from({ length: data.length + 1 }).map((_, i) => (
                            <line key={i} x1={(i / data.length) * 100} y1="0" x2={(i / data.length) * 100} y2="40" stroke="white" strokeOpacity="0.05" strokeWidth="0.2" />
                        ))}
                        <path d={getPoints()} stroke="#f97316" fill="none" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Description</h5>
                <p className="text-xs text-gray-400 leading-relaxed italic">
                    {scheme === 'nrz' && "Non-Return-to-Zero: High level for '1', Low for '0'. Simple but lacks clock synchronization during long runs of identical bits."}
                    {scheme === 'rz' && "Return-to-Zero: Signal returns to 0 mid-way through each '1' bit. Consumes more bandwidth but improves timing recovery."}
                    {scheme === 'manchester' && "Manchester Encoding: Transition at mid-bit provides self-clocking. '0' is Low-to-High, '1' is High-to-Low. Used in early Ethernet."}
                </p>
            </div>
        </div>
    );
}
