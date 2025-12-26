import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AlohaCSMA() {
    const [protocol, setProtocol] = useState('aloha'); // 'aloha' or 'csma'
    const [isRunning, setIsRunning] = useState(false);
    const [trafficLoad, setTrafficLoad] = useState(0.5);
    const [timeline, setTimeline] = useState([]);
    const [stats, setStats] = useState({ sent: 0, collisions: 0, success: 0 });

    const containerRef = useRef(null);
    const timerRef = useRef(null);

    const runStep = () => {
        setTimeline(prev => {
            const newTimeline = [...prev];
            if (newTimeline.length > 50) newTimeline.shift();

            // Randomly decide if a node wants to send
            const nodesSending = [];
            for (let i = 0; i < 5; i++) {
                if (Math.random() < trafficLoad * 0.2) {
                    nodesSending.push(i);
                }
            }

            let status = 'idle';
            let activeNodes = [];

            if (nodesSending.length === 1) {
                // Potential success
                if (protocol === 'csma') {
                    // Check if channel was busy last step (simplified CSMA)
                    const lastStep = prev[prev.length - 1];
                    if (lastStep?.status !== 'collision' && lastStep?.status !== 'success') {
                        status = 'success';
                        activeNodes = nodesSending;
                    } else {
                        status = 'backoff';
                    }
                } else {
                    status = 'success';
                    activeNodes = nodesSending;
                }
            } else if (nodesSending.length > 1) {
                status = 'collision';
                activeNodes = nodesSending;
            }

            const stepData = {
                id: Date.now(),
                status,
                activeNodes
            };

            // Update stats
            if (status === 'success') setStats(s => ({ ...s, success: s.success + 1, sent: s.sent + 1 }));
            if (status === 'collision') setStats(s => ({ ...s, collisions: s.collisions + 1, sent: s.sent + nodesSending.length }));

            return [...newTimeline, stepData];
        });
    };

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(runStep, 200);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isRunning, trafficLoad, protocol]);

    const reset = () => {
        setTimeline([]);
        setStats({ sent: 0, collisions: 0, success: 0 });
        setIsRunning(false);
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-6 font-mono overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-orange-500">Random Access Simulator</h3>
                    <p className="text-xs text-slate-400">ALOHA vs CSMA (Carrier Sense) Dynamics</p>
                </div>
                <div className="flex bg-slate-900 rounded-lg p-1 border border-white/5">
                    <button
                        onClick={() => setProtocol('aloha')}
                        className={`px-3 py-1 rounded-md text-xs transition-all ${protocol === 'aloha' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Pure ALOHA
                    </button>
                    <button
                        onClick={() => setProtocol('csma')}
                        className={`px-3 py-1 rounded-md text-xs transition-all ${protocol === 'csma' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        CSMA/CD
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 text-center">
                    <div className="text-[10px] uppercase text-slate-500 mb-1">Total Attempted</div>
                    <div className="text-xl font-bold text-white">{stats.sent}</div>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 text-center">
                    <div className="text-[10px] uppercase text-slate-500 mb-1">Successful</div>
                    <div className="text-xl font-bold text-green-500">{stats.success}</div>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 text-center">
                    <div className="text-[10px] uppercase text-slate-500 mb-1">Collisions</div>
                    <div className="text-xl font-bold text-red-500">{stats.collisions}</div>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 text-center">
                    <div className="text-[10px] uppercase text-slate-500 mb-1">Efficiency</div>
                    <div className="text-xl font-bold text-orange-500">
                        {stats.sent > 0 ? Math.round((stats.success / stats.sent) * 100) : 0}%
                    </div>
                </div>
            </div>

            <div className="flex-1 relative bg-black/40 rounded-2xl border border-white/5 p-4 flex flex-col justify-end mb-6 overflow-hidden">
                <div className="absolute top-4 left-4 flex space-x-2">
                    <div className="flex items-center space-x-1.5 px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-[10px] text-green-500">
                        <CheckCircle2 size={12} />
                        <span>Success</span>
                    </div>
                    <div className="flex items-center space-x-1.5 px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-[10px] text-red-500">
                        <AlertTriangle size={12} />
                        <span>Collision</span>
                    </div>
                </div>

                {/* Timeline Visualization */}
                <div className="flex items-end space-x-1 h-32 w-full overflow-hidden">
                    {timeline.map((step) => (
                        <motion.div
                            key={step.id}
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            className={`flex-1 min-w-[12px] rounded-t-sm ${step.status === 'success' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                                    step.status === 'collision' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                                        'bg-slate-800/30'
                                }`}
                            style={{ height: step.status === 'idle' ? '4px' : '100%' }}
                        />
                    ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-600 mt-2 px-1">
                    <span>-10s</span>
                    <span>T-axis (Temporal Slots)</span>
                    <span>Now</span>
                </div>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-6 border border-white/10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 space-y-4 w-full">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Traffic Intensity ($\lambda$)</span>
                            <span className="text-orange-500 font-bold">{Math.round(trafficLoad * 100)}%</span>
                        </div>
                        <input
                            type="range" min="0" max="1" step="0.01"
                            value={trafficLoad}
                            onChange={(e) => setTrafficLoad(parseFloat(e.target.value))}
                            className="w-full accent-orange-600 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-600">
                            <span>Low (Idle)</span>
                            <span>High (Saturation)</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setIsRunning(!isRunning)}
                            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isRunning ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-orange-600 hover:bg-orange-500 text-white'
                                }`}
                        >
                            {isRunning ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" className="ml-1" />}
                        </button>
                        <button
                            onClick={reset}
                            className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center transition-all"
                        >
                            <RotateCcw size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
