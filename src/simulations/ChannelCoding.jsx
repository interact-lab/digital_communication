import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChannelCoding() {
    const [data, setData] = useState([1, 0, 1]);
    const [errorIndex, setErrorIndex] = useState(-1);

    // Hamming(7,4) is bit complex for a simple visual, let's do a simple Parity/Repetition logic
    // or a small (7,4) Hamming simulation

    // Simple Repetition Code (3x)
    const encoded = data.flatMap(bit => [bit, bit, bit]);
    const received = [...encoded];
    if (errorIndex !== -1) {
        received[errorIndex] = received[errorIndex] === 1 ? 0 : 1;
    }

    // Majority logic decoding
    const decoded = [];
    for (let i = 0; i < received.length; i += 3) {
        const sum = received[i] + received[i + 1] + received[i + 2];
        decoded.push(sum >= 2 ? 1 : 0);
    }

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
            <div className="grid grid-rows-3 gap-8">

                {/* Stage 1: Data */}
                <div>
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Step 1: Source Data</h4>
                    <div className="flex space-x-2">
                        {data.map((bit, i) => (
                            <button
                                key={i} onClick={() => {
                                    const newData = [...data];
                                    newData[i] = bit === 1 ? 0 : 1;
                                    setData(newData);
                                }}
                                className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl border transition-all ${bit === 1 ? 'bg-orange-600 border-orange-500' : 'bg-white/5 border-white/10 text-gray-400'}`}
                            >
                                {bit}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stage 2: Channel with Noise */}
                <div>
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Step 2: Transmission (Repetition Code 3x)</h4>
                    <div className="flex flex-wrap gap-1">
                        {received.map((bit, i) => (
                            <motion.button
                                key={i}
                                onClick={() => setErrorIndex(errorIndex === i ? -1 : i)}
                                className={`w-8 h-10 rounded-md flex items-center justify-center text-[10px] font-black border transition-all ${errorIndex === i ? 'bg-red-600 border-red-500 text-white animate-pulse' :
                                        bit === 1 ? 'bg-blue-600/20 border-blue-500/40 text-blue-400' : 'bg-white/5 border-white/10 text-gray-600'
                                    }`}
                                whileHover={{ scale: 1.1 }}
                            >
                                {bit}
                            </motion.button>
                        ))}
                    </div>
                    <p className="mt-2 text-[10px] text-gray-500 italic">Click any bit to flip it (Simulate Cosmic Ray / Noise)</p>
                </div>

                {/* Stage 3: Decoding */}
                <div>
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Step 3: Majority Logic Decoding</h4>
                    <div className="flex space-x-2">
                        {decoded.map((bit, i) => {
                            const isFixed = data[i] === decoded[i] && errorIndex >= i * 3 && errorIndex < (i + 1) * 3;
                            return (
                                <div key={i} className="relative">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl border transition-all ${bit === 1 ? 'bg-green-600 border-green-500' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                                        {bit}
                                    </div>
                                    {isFixed && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="absolute -top-2 -right-2 bg-green-500 text-black text-[8px] font-black px-1 rounded border border-white"
                                        >
                                            FIXED
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

            <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs text-gray-400 leading-relaxed">
                    CHANNEL CODING adds intelligent redundancy. In this 3x repetition code, the receiver takes a <span className="text-white font-bold">Majority Vote</span>.
                    If one bit out of three is flipped by noise, the original value is still recovered correctly. This is the simplest form of Error Correction (FEC).
                </p>
            </div>
        </div>
    );
}
