import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const Helix = ({ time, frequency, amplitude, showReal, showImag, show3D }) => {
    const points = useMemo(() => {
        const pts = [];
        const segments = 200;
        const length = 10;
        for (let i = 0; i <= segments; i++) {
            const t = (i / segments) * length;
            const angle = frequency * t;
            const x = amplitude * Math.cos(angle);
            const y = amplitude * Math.sin(angle);
            const z = t - length / 2;
            pts.push(new THREE.Vector3(x, y, z));
        }
        return pts;
    }, [frequency, amplitude]);

    const realPoints = useMemo(() => {
        return points.map(p => new THREE.Vector3(p.x, -2, p.z));
    }, [points]);

    const imagPoints = useMemo(() => {
        return points.map(p => new THREE.Vector3(2, p.y, p.z));
    }, [points]);

    return (
        <>
            {show3D && (
                <Line
                    points={points}
                    color="#f97316"
                    lineWidth={2}
                />
            )}

            {showReal && (
                <Line
                    points={realPoints}
                    color="#4b5563"
                    lineWidth={1}
                    dashed
                />
            )}

            {showImag && (
                <Line
                    points={imagPoints}
                    color="#4b5563"
                    lineWidth={1}
                    dashed
                />
            )}

            {/* Current Vector */}
            {(() => {
                const curAngle = frequency * time;
                const x = amplitude * Math.cos(curAngle);
                const y = amplitude * Math.sin(curAngle);
                const z = time - 5;
                return (
                    <mesh position={[x, y, z]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshStandardMaterial color="#fb923c" emissive="#fb923c" emissiveIntensity={2} />
                    </mesh>
                );
            })()}
        </>
    );
};

export default function EulersHelix() {
    const [time, setTime] = useState(5);
    const [frequency, setFrequency] = useState(2);
    const [amplitude, setAmplitude] = useState(1);
    const [showReal, setShowReal] = useState(true);
    const [showImag, setShowImag] = useState(true);
    const [show3D, setShow3D] = useState(true);

    return (
        <div className="flex flex-col h-[600px] w-full bg-black/40 rounded-3xl border border-white/10 overflow-hidden">
            <div className="flex-1 relative">
                <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <gridHelper args={[20, 20, 0x333333, 0x111111]} rotation={[Math.PI / 2, 0, 0]} />

                    <Helix
                        time={time}
                        frequency={frequency}
                        amplitude={amplitude}
                        showReal={showReal}
                        showImag={showImag}
                        show3D={show3D}
                    />

                    <OrbitControls makeDefault />
                </Canvas>

                {/* Legend */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2 pointer-events-none">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full" />
                        <span className="text-xs text-gray-300 font-medium whitespace-nowrap">Helix: e^(jωt)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-600 rounded-full border border-dashed border-gray-400" />
                        <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Projections (cos/sin)</span>
                    </div>
                </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-black/60 backdrop-blur-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Time Scrubber (t)</label>
                    <input
                        type="range" min="0" max="10" step="0.1" value={time}
                        onChange={(e) => setTime(parseFloat(e.target.value))}
                        className="w-full accent-orange-500"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Frequency (ω)</label>
                    <input
                        type="range" min="0.5" max="5" step="0.1" value={frequency}
                        onChange={(e) => setFrequency(parseFloat(e.target.value))}
                        className="w-full accent-orange-500"
                    />
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setShow3D(!show3D)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${show3D ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' : 'bg-white/5 text-gray-400'}`}
                    >
                        3D HELIX
                    </button>
                    <button
                        onClick={() => setShowReal(!showReal)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${showReal ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' : 'bg-white/5 text-gray-400'}`}
                    >
                        REAL (COS)
                    </button>
                    <button
                        onClick={() => setShowImag(!showImag)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${showImag ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' : 'bg-white/5 text-gray-400'}`}
                    >
                        IMAG (SIN)
                    </button>
                </div>
            </div>
        </div>
    );
}
