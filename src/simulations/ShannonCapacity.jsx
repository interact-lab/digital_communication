import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function ShannonCapacity() {
    const [bandwidth, setBandwidth] = useState(20); // MHz
    const [snrDb, setSnrDb] = useState(10); // dB

    const capacity = useMemo(() => {
        const snrLinear = Math.pow(10, snrDb / 10);
        return bandwidth * Math.log2(1 + snrLinear);
    }, [bandwidth, snrDb]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="mb-12 flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Shannon Capacity Limit</h3>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">The Universal Speed Limit ($C = B \log_2(1+S/N)$)</p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-black text-orange-500">{capacity.toFixed(2)}</div>
                    <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Mbps Theoretical Max</div>
                </div>
            </div>

            <div className="flex-1 grid lg:grid-cols-2 gap-12 mb-8">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <label className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            <span>Channel Bandwidth ($B$)</span>
                            <span className="text-white font-black">{bandwidth} MHz</span>
                        </label>
                        <input type="range" min="1" max="100" value={bandwidth} onChange={e => setBandwidth(parseInt(e.target.value))} className="w-full accent-orange-500" />
                    </div>

                    <div className="space-y-4">
                        <label className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            <span>Signal-to-Noise Ratio (SNR)</span>
                            <span className="text-white font-black">{snrDb} dB</span>
                        </label>
                        <input type="range" min="-10" max="40" value={snrDb} onChange={e => setSnrDb(parseInt(e.target.value))} className="w-full accent-orange-500" />
                    </div>
                </div>

                <div className="bg-black/20 rounded-3xl border border-white/5 p-8 relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute inset-0 bg-orange-600/5 blur-[100px] pointer-events-none" />
                    <div className="relative text-center space-y-2">
                        <div className="text-[8px] font-bold text-gray-600 uppercase tracking-[0.3em]">Channel Reliability</div>
                        <div className="text-lg font-black text-gray-400">
                            {snrDb < 0 ? 'Extremely Noisy' : snrDb < 15 ? 'Moderate Noise' : 'Clean Channel'}
                        </div>
                        <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                                animate={{ width: `${Math.min(100, (capacity / 500) * 100)}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <p className="text-xs text-gray-500 leading-relaxed italic">
                    Claude Shannon proved that error-free communication is possible up to rate <span className="text-white font-bold">$C$</span>. Increasing bandwidth linearly increases capacity, but increasing power (SNR) only provides diminishing logarithmic returns. This is why multi-carrier systems (like 5G) prioritize wider spectrum over higher transmit power.
                </p>
            </div>
        </div>
    );
}
