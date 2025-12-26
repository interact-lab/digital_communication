import React, { useState, useMemo } from 'react';

export default function SincRectDuality() {
    const [isRectTime, setIsRectTime] = useState(true);

    const data = useMemo(() => {
        const points = 200;
        const timePts = [];
        const freqPts = [];

        for (let i = 0; i < points; i++) {
            const t = (i / points) * 10 - 5;
            const f = (i / points) * 10 - 5;

            // Time domain
            if (isRectTime) {
                timePts.push({ x: t, y: Math.abs(t) < 1 ? 1 : 0 });
                const x = Math.PI * f;
                freqPts.push({ x: f, y: x === 0 ? 1 : Math.sin(x) / x });
            } else {
                const x = Math.PI * t;
                timePts.push({ x: t, y: x === 0 ? 1 : Math.sin(x) / x });
                freqPts.push({ x: f, y: Math.abs(f) < 1 ? 1 : 0 });
            }
        }
        return { timePts, freqPts };
    }, [isRectTime]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Sinc & Rect Duality</h3>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">The ultimate Fourier pair</p>
                </div>
                <button
                    onClick={() => setIsRectTime(!isRectTime)}
                    className="px-6 py-2.5 bg-orange-600 rounded-xl text-[10px] font-black uppercase text-white shadow-lg shadow-orange-900/40"
                >
                    Swap Time/Freq
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-8 items-center bg-black/20 rounded-3xl p-8 border border-white/5">
                <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] text-center">Time Domain $x(t)$</h4>
                    <div className="h-40 relative">
                        <div className="absolute left-1 top-1/2 -rotate-90 text-[7px] text-gray-700 uppercase font-black">Level</div>
                        <svg width="100%" height="100%" viewBox="-5 -1.2 10 2.4" preserveAspectRatio="none">
                            <line x1="-5" y1="0" x2="5" y2="0" stroke="white" strokeOpacity="0.1" strokeWidth="0.05" />
                            <path d={`M ${data.timePts.map(p => `${p.x},${-p.y}`).join(' L ')}`} stroke="#f97316" fill="none" strokeWidth="0.1" />
                        </svg>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] text-gray-700 uppercase font-black">Time (t)</div>
                    </div>
                    <p className="text-center text-[10px] text-gray-600 font-mono italic">{isRectTime ? "Rectangular Pulse" : "Sinc Function"}</p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] text-center">Frequency Domain $X(f)$</h4>
                    <div className="h-40 relative">
                        <div className="absolute left-1 top-1/2 -rotate-90 text-[7px] text-gray-700 uppercase font-black">Magnitude</div>
                        <svg width="100%" height="100%" viewBox="-5 -1.2 10 2.4" preserveAspectRatio="none">
                            <line x1="-5" y1="0" x2="5" y2="0" stroke="white" strokeOpacity="0.1" strokeWidth="0.05" />
                            <path d={`M ${data.freqPts.map(p => `${p.x},${-p.y}`).join(' L ')}`} stroke="#3b82f6" fill="none" strokeWidth="0.1" />
                        </svg>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] text-gray-700 uppercase font-black">Frequency (f)</div>
                    </div>
                    <p className="text-center text-[10px] text-gray-600 font-mono italic">{isRectTime ? "Sinc Function" : "Rectangular Pulse"}</p>
                </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <p className="text-xs text-gray-500 leading-relaxed italic">
                    There is a symmetry in Fourier Analysis. If $x(t)$ is a rect, its transform is a sinc. Conversely, if $x(t)$ is a sinc, its transform is a rect. This duality is critical in <span className="text-white font-bold">Pulse Shaping</span>: we send pulses with sinc-like shapes in time to stay within a perfect rectangular bandwidth in frequency.
                </p>
            </div>
        </div>
    );
}
