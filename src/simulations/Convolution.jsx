import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function ConvolutionSimulation() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [offset, setOffset] = useState(-5);
    const canvasRef = useRef(null);

    const signal_x = (t) => (t >= 0 && t <= 2 ? 1 : 0);
    const signal_h = (t) => (t >= 0 && t <= 1 ? 1 : 0);

    useEffect(() => {
        let animationFrame;
        if (isPlaying) {
            const animate = () => {
                setOffset((prev) => {
                    if (prev >= 8) return -5;
                    return prev + 0.02;
                });
                animationFrame = requestAnimationFrame(animate);
            };
            animationFrame = requestAnimationFrame(animate);
        }
        return () => cancelAnimationFrame(animationFrame);
    }, [isPlaying]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear
        ctx.clearRect(0, 0, width, height);

        const scale = 50;
        const originX = width / 2;
        const originY = height / 1.5;

        // Draw axes
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.moveTo(0, originY); ctx.lineTo(width, originY);
        ctx.moveTo(originX, 0); ctx.lineTo(originX, height);
        ctx.stroke();

        // Draw x(tau) - Stationary
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = -10; x <= 10; x += 0.1) {
            const val = signal_x(x);
            const px = originX + x * scale;
            const py = originY - val * scale;
            if (x === -10) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.fillStyle = 'rgba(249, 115, 22, 0.1)';
        ctx.fill();

        // Draw h(t-tau) - Moving
        // h(t-tau) = h(-(tau-t)) -> flipped and shifted by t (offset)
        ctx.strokeStyle = '#3b82f6';
        ctx.beginPath();
        for (let tau = -10; tau <= 10; tau += 0.1) {
            const val = signal_h(offset - tau);
            const px = originX + tau * scale;
            const py = originY - val * scale;
            if (tau === -10) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.fill();

        // Draw product and convolution result
        const result = [];
        const tValues = [];
        for (let t = -5; t <= offset; t += 0.1) {
            // Compute integral of x(tau) * h(t-tau)
            let integral = 0;
            const step = 0.05;
            for (let tau = -5; tau <= 10; tau += step) {
                integral += signal_x(tau) * signal_h(t - tau) * step;
            }
            result.push(integral);
            tValues.push(t);
        }

        // Draw Convolution Output y(t)
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        result.forEach((val, i) => {
            const px = originX + tValues[i] * scale;
            const py = originY - val * scale - 120; // Offset up to show separately
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        });
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#9ca3af';
        ctx.font = '12px Inter';
        ctx.fillText('x(τ)', originX + 2.2 * scale, originY - 10);
        ctx.fillStyle = '#3b82f6';
        ctx.fillText(`h(${offset.toFixed(1)}-τ)`, originX + (offset - 1.2) * scale, originY - 60);
        ctx.fillStyle = '#10b981';
        ctx.fillText('y(t) = x * h', originX - 3 * scale, originY - 150);

    }, [offset]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8">
            <div className="relative mb-8 bg-black/20 rounded-2xl overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={400}
                    className="w-full h-auto"
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/40"
                    >
                        {isPlaying ? <Pause className="text-white" /> : <Play className="text-white ml-1" />}
                    </button>
                    <button
                        onClick={() => { setIsPlaying(false); setOffset(-5); }}
                        className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <RotateCcw className="text-gray-400 w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 max-w-md mx-8">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Manual Shift (t)</label>
                    <input
                        type="range" min="-5" max="8" step="0.01" value={offset}
                        onChange={(e) => setOffset(parseFloat(e.target.value))}
                        className="w-full accent-orange-500"
                    />
                </div>

                <div className="text-right">
                    <div className="text-3xl font-black text-white">{offset.toFixed(2)}</div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Current Time</div>
                </div>
            </div>
        </div>
    );
}
