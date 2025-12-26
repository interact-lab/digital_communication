import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MultipleAccess() {
    const [mode, setMode] = useState('fdma'); // fdma, tdma, cdma
    const users = [
        { id: 1, color: '#f97316', label: 'User A' },
        { id: 2, color: '#3b82f6', label: 'User B' },
        { id: 3, color: '#10b981', label: 'User C' },
        { id: 4, color: '#a855f7', label: 'User D' },
    ];

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="flex space-x-2 mb-8 bg-white/5 p-1 rounded-2xl w-fit mx-auto">
                {['fdma', 'tdma', 'cdma'].map((m) => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        {m}
                    </button>
                ))}
            </div>

            <div className="flex-1 min-h-[400px] relative bg-black/20 rounded-2xl overflow-hidden border border-white/5 p-8">
                <div className="grid grid-cols-[auto_1fr] h-full gap-4">
                    <div className="flex flex-col justify-between py-10 relative">
                        <span className="text-[10px] font-black text-gray-700 uppercase vertical-text absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap">Frequency Band (Hz)</span>
                    </div>
                    <div className="flex flex-col h-full border-l border-b border-white/10">
                        <div className="flex-1 relative">
                            {/* ... existing modes ... */}
                            {mode === 'fdma' && (
                                <div className="absolute inset-0 grid grid-rows-4 gap-2">
                                    {users.map((user, i) => (
                                        <motion.div
                                            key={user.id}
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            className="rounded-lg flex items-center justify-center text-[10px] font-black tracking-tighter text-white/80"
                                            style={{ backgroundColor: `${user.color}20`, border: `1px solid ${user.color}40` }}
                                        >
                                            {user.label} (BAND {i + 1})
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {mode === 'tdma' && (
                                <div className="absolute inset-0 grid grid-cols-4 gap-2 py-4">
                                    {users.map((user, i) => (
                                        <motion.div
                                            key={user.id}
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            className="rounded-lg flex items-center justify-center text-[10px] font-black tracking-tighter text-white/80"
                                            style={{ backgroundColor: `${user.color}20`, border: `1px solid ${user.color}40` }}
                                        >
                                            <div className="rotate-90 whitespace-nowrap">{user.label} SLOT {i + 1}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {mode === 'cdma' && (
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    <div className="relative w-full h-full">
                                        {users.map((user, i) => (
                                            <motion.div
                                                key={user.id}
                                                className="absolute inset-0 border-2 rounded-2xl flex items-center justify-center mix-blend-screen"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 0.6, scale: 1 - i * 0.05 }}
                                                style={{ borderColor: user.color, backgroundColor: `${user.color}05` }}
                                            >
                                                <div className="text-[8px] font-mono text-white/40 break-all p-8 text-center opacity-20">
                                                    {Array(200).fill(i % 2 === 0 ? '10' : '01').join('')}
                                                </div>
                                            </motion.div>
                                        ))}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-black/80 px-4 py-2 rounded-xl border border-white/10 text-[10px] font-black tracking-widest text-orange-500 uppercase">
                                                Coded Channel (Spread Spectrum)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="h-8 flex justify-center items-center mt-2">
                            <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em]">Temporal Slots (t)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Efficiency</h4>
                    <div className="text-sm font-medium text-white">
                        {mode === 'fdma' ? 'Low (Guard bands required)' : mode === 'tdma' ? 'Medium (Sync overhead)' : 'High (No strict slots)'}
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Primary Constraint</h4>
                    <div className="text-sm font-medium text-white">
                        {mode === 'fdma' ? 'Subcarrier filtering' : mode === 'tdma' ? 'Timing Synchronization' : 'Code Orthogonality'}
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Real World Example</h4>
                    <div className="text-sm font-medium text-white italic">
                        {mode === 'fdma' ? 'Analogue Radio' : mode === 'tdma' ? 'GSM / 2G' : '3G / CDMA2000'}
                    </div>
                </div>
            </div>
        </div>
    );
}
