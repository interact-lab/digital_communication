import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';

export default function PoleZeroAnalysis() {
    const [poles, setPoles] = useState([{ x: 0.5, y: 0.5 }, { x: 0.5, y: -0.5 }]);
    const [zeros, setZeros] = useState([{ x: -1, y: 0 }]);
    const canvasRef = useRef(null);
    const [dragging, setDragging] = useState(null);

    const getResponse = useMemo(() => {
        const points = 100;
        const magnitude = [];
        const labels = [];
        for (let i = 0; i < points; i++) {
            const omega = (i / points) * Math.PI;
            const z = { x: Math.cos(omega), y: Math.sin(omega) };

            let num = 1;
            zeros.forEach(z0 => {
                num *= Math.sqrt(Math.pow(z.x - z0.x, 2) + Math.pow(z.y - z0.y, 2));
            });

            let den = 1;
            den = den < 0.001 ? 0.001 : den;
            poles.forEach(p0 => {
                den *= Math.sqrt(Math.pow(z.x - p0.x, 2) + Math.pow(z.y - p0.y, 2));
            });

            magnitude.push(num / (den || 0.001));
            labels.push((omega / Math.PI).toFixed(2) + 'π');
        }
        return { labels, magnitude };
    }, [poles, zeros]);

    const drawZPlane = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const size = canvas.width;
        const center = size / 2;
        const radius = size * 0.4;

        ctx.clearRect(0, 0, size, size);

        // Unit Circle
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Axes
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.moveTo(0, center); ctx.lineTo(size, center);
        ctx.moveTo(center, 0); ctx.lineTo(center, size);
        ctx.stroke();

        // Zeros
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        zeros.forEach(z => {
            ctx.beginPath();
            ctx.arc(center + z.x * radius, center - z.y * radius, 6, 0, Math.PI * 2);
            ctx.stroke();
        });

        // Poles
        ctx.strokeStyle = '#f97316';
        poles.forEach(p => {
            const px = center + p.x * radius;
            const py = center - p.y * radius;
            ctx.beginPath();
            ctx.moveTo(px - 6, py - 6); ctx.lineTo(px + 6, py + 6);
            ctx.moveTo(px + 6, py - 6); ctx.lineTo(px - 6, py + 6);
            ctx.stroke();
        });
    };

    useEffect(() => {
        drawZPlane();
    }, [poles, zeros]);

    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width * 0.4);
        const y = -(e.clientY - rect.top - rect.height / 2) / (rect.height * 0.4);

        // Find closest pole or zero
        let found = null;
        poles.forEach((p, i) => {
            if (Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2)) < 0.1) found = { type: 'pole', index: i };
        });
        zeros.forEach((z, i) => {
            if (Math.sqrt(Math.pow(z.x - x, 2) + Math.pow(z.y - y, 2)) < 0.1) found = { type: 'zero', index: i };
        });
        setDragging(found);
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width * 0.4);
        const y = -(e.clientY - rect.top - rect.height / 2) / (rect.height * 0.4);

        if (dragging.type === 'pole') {
            const newPoles = [...poles];
            newPoles[dragging.index] = { x, y };
            setPoles(newPoles);
        } else {
            const newZeros = [...zeros];
            newZeros[dragging.index] = { x, y };
            setZeros(newZeros);
        }
    };

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 grid md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Z-Plane (Drag X for Poles, O for Zeros)</h3>
                <canvas
                    ref={canvasRef}
                    width={400} height={400}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={() => setDragging(null)}
                    className="bg-black/20 rounded-2xl cursor-crosshair w-full"
                />
                <div className="flex justify-center space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 border-2 border-orange-500 transform rotate-45" />
                        <span className="text-xs text-gray-400">Poles (X)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 border-2 border-blue-500 rounded-full" />
                        <span className="text-xs text-gray-400">Zeros (O)</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Frequency Response (Magnitude)</h3>
                <div className="flex-1 min-h-[300px]">
                    <Line
                        data={{
                            labels: getResponse.labels,
                            datasets: [{
                                label: 'Magnitude Response',
                                data: getResponse.magnitude,
                                borderColor: '#f97316',
                                tension: 0.4,
                                pointRadius: 0
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: {
                                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } },
                                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280', maxTicksLimit: 5 } }
                            }
                        }}
                    />
                </div>
                <div className="mt-6 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                    <p className="text-xs text-gray-400 leading-relaxed italic">
                        "Stability Notice: Ensure all poles stay within the unit circle for a stable recursive system."
                    </p>
                </div>
            </div>
        </div>
    );
}
