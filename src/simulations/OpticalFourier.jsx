import React, { useState, useMemo } from 'react';

export default function OpticalFourier() {
    const [slitWidth, setSlitWidth] = useState(0.1);
    const [wavelength, setWavelength] = useState(0.5); // 0.5 = Greenish

    const intensityData = useMemo(() => {
        const points = [];
        const N = 200;
        for (let i = 0; i < N; i++) {
            const theta = (i / N) * 0.4 - 0.2; // Small angle approximation
            const x = (Math.PI * slitWidth * Math.sin(theta)) / (wavelength * 0.001);
            const val = x === 0 ? 1 : Math.pow(Math.sin(x) / x, 2);
            points.push({ theta, val });
        }
        return points;
    }, [slitWidth, wavelength]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Optical Fourier Transform</h3>
                <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Fraunhofer Diffraction Patterns</p>
            </div>

            <div className="flex-1 min-h-[300px] grid lg:grid-cols-2 gap-8 mb-8">
                {/* Experimental Setup */}
                <div className="bg-black/20 rounded-2xl border border-white/5 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-orange-500 to-transparent blur-sm" />
                    <div className="w-1 h-40 bg-gray-800 rounded-full relative">
                        <div
                            className="absolute left-1/2 -translate-x-1/2 bg-black border border-gray-600 transition-all"
                            style={{ height: slitWidth * 200, width: 4, top: `calc(50% - ${slitWidth * 100}px)` }}
                        />
                    </div>
                    <div className="mt-8 text-[10px] text-gray-600 font-black uppercase tracking-widest">Single Slit Aperture</div>
                </div>

                {/* Intensity Pattern */}
                <div className="bg-black/20 rounded-2xl border border-white/5 p-6 flex flex-col">
                    <div className="flex-1 relative">
                        <svg width="100%" height="100%" viewBox="-0.2 0 0.4 1.1" preserveAspectRatio="none">
                            <path
                                d={`M ${intensityData.map(p => `${p.theta},${1 - p.val}`).join(' L ')}`}
                                stroke={wavelength > 0.6 ? '#ef4444' : wavelength > 0.5 ? '#10b981' : '#3b82f6'}
                                fill="none" strokeWidth="0.005"
                            />
                        </svg>
                        {/* Visual Glow */}
                        <div
                            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 blur-2xl opacity-50"
                            style={{ backgroundColor: wavelength > 0.6 ? '#ef4444' : wavelength > 0.5 ? '#10b981' : '#3b82f6' }}
                        />
                    </div>
                    <div className="h-8 bg-gradient-to-r from-transparent via-white/5 to-transparent flex items-center justify-center">
                        <div className="flex space-x-1">
                            {intensityData.filter((_, i) => i % 5 === 0).map((p, i) => (
                                <div
                                    key={i}
                                    className="w-1 h-4 rounded-full"
                                    style={{
                                        backgroundColor: wavelength > 0.6 ? '#ef4444' : wavelength > 0.5 ? '#10b981' : '#3b82f6',
                                        opacity: p.val
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="space-y-4">
                    <label className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <span>Slit Width ($a$)</span>
                        <span className="text-orange-500 font-black">{slitWidth.toFixed(2)} mm</span>
                    </label>
                    <input type="range" min="0.02" max="0.2" step="0.01" value={slitWidth} onChange={e => setSlitWidth(parseFloat(e.target.value))} className="w-full accent-orange-500" />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed italic">
                    Physics is a computer for Math. Far-field diffraction is physically calculating the <span className="text-white font-bold">Fourier Transform</span> of the aperture. A smaller slit creates a wider diffraction pattern—exactly matching the Fourier scaling property.
                </p>
            </div>
        </div>
    );
}
