import React, { useState, useEffect, useRef } from 'react';

export default function SpatialFrequency() {
    const [filterType, setFilterType] = useState('none'); // none, lowpass, highpass
    const canvasRef = useRef(null);
    const fftRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Generate a test pattern (Grid + Noise)
        const drawPattern = () => {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, width, height);

            // Horizontal lines
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            for (let i = 0; i < height; i += 10) {
                ctx.beginPath();
                ctx.moveTo(0, i); ctx.lineTo(width, i);
                ctx.stroke();
            }

            // Diagonal lines
            for (let i = -width; i < width; i += 15) {
                ctx.beginPath();
                ctx.moveTo(i, 0); ctx.lineTo(i + height, height);
                ctx.stroke();
            }

            // Add some "detail" (Circles)
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, 40, 0, Math.PI * 2);
            ctx.stroke();
        };

        drawPattern();

        // FFT Visualization Simulation
        // Since real 2D-FFT is expensive in vanilla JS without libs, we visualize the CONCEPT
        const fftCanvas = fftRef.current;
        const fftCtx = fftCanvas.getContext('2d');

        const drawFFT = () => {
            fftCtx.fillStyle = 'black';
            fftCtx.fillRect(0, 0, width, height);

            // Central DC peak
            const center = width / 2;
            const grad = fftCtx.createRadialGradient(center, center, 0, center, center, 100);
            grad.addColorStop(0, '#f97316');
            grad.addColorStop(0.2, 'rgba(249, 115, 22, 0.4)');
            grad.addColorStop(1, 'transparent');

            fftCtx.fillStyle = grad;
            fftCtx.fillRect(0, 0, width, height);

            // Peaks for the grid
            fftCtx.fillStyle = '#ffffff';
            // Horizontal lines peaks
            fftCtx.beginPath();
            fftCtx.arc(center, center - 40, 3, 0, Math.PI * 2);
            fftCtx.arc(center, center + 40, 3, 0, Math.PI * 2);
            // Diagonal peaks
            fftCtx.arc(center - 30, center - 30, 2, 0, Math.PI * 2);
            fftCtx.arc(center + 30, center + 30, 2, 0, Math.PI * 2);
            fftCtx.fill();

            // Overlay filter mask
            if (filterType !== 'none') {
                fftCtx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
                fftCtx.lineWidth = 2;
                if (filterType === 'lowpass') {
                    fftCtx.beginPath();
                    fftCtx.arc(center, center, 45, 0, Math.PI * 2);
                    fftCtx.stroke();
                    fftCtx.fillStyle = 'rgba(0,0,0,0.7)';
                    // Mask outside circle
                    fftCtx.beginPath();
                    fftCtx.rect(0, 0, width, height);
                    fftCtx.arc(center, center, 45, 0, Math.PI * 2, true);
                    fftCtx.fill();
                } else if (filterType === 'highpass') {
                    fftCtx.beginPath();
                    fftCtx.arc(center, center, 20, 0, Math.PI * 2);
                    fftCtx.stroke();
                    fftCtx.fillStyle = 'rgba(0,0,0,0.7)';
                    // Mask inside circle
                    fftCtx.beginPath();
                    fftCtx.arc(center, center, 20, 0, Math.PI * 2);
                    fftCtx.fill();
                }
            }
        };

        drawFFT();

        // Update main image based on filter (Simulated)
        if (filterType === 'lowpass') {
            ctx.filter = 'blur(4px)';
            drawPattern();
        } else if (filterType === 'highpass') {
            ctx.filter = 'contrast(2) brightness(0.5) invert(1) opacity(0.5)'; // Fake edge enhancement look
            drawPattern();
        } else {
            ctx.filter = 'none';
            drawPattern();
        }

    }, [filterType]);

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8 h-full">
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Spatial Domain ($x, y$)</h4>
                    <div className="aspect-square bg-black rounded-2xl overflow-hidden border border-white/10">
                        <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
                    </div>
                    <p className="text-[10px] text-center text-gray-500 italic">Reconstructed image after domain filtering</p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Frequency Domain ($u, v$)</h4>
                    <div className="aspect-square bg-black rounded-2xl overflow-hidden border border-white/10 relative">
                        <canvas ref={fftRef} width={400} height={400} className="w-full h-full" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
                            {['none', 'lowpass', 'highpass'].map(t => (
                                <button
                                    key={t} onClick={() => setFilterType(t)}
                                    className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase border transition-all ${filterType === t ? 'bg-orange-600 border-orange-500 text-white' : 'bg-black/40 border-white/10 text-gray-400'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="text-[10px] text-center text-gray-500 italic">2D Magnitude Spectrum (Log scale visualized)</p>
                </div>
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/5">
                <h5 className="text-xs font-bold text-white mb-3 flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2" />
                    Observation
                </h5>
                <p className="text-xs text-gray-400 leading-relaxed">
                    Every pattern in the image corresponds to a point in the FFT spectrum. The further a point is from the center, the higher the spatial frequency (fine detail).
                    <span className="text-orange-500 font-bold"> Low-pass filtering</span> (blurring) removes the outer points, while
                    <span className="text-orange-500 font-bold"> High-pass filtering</span> (edge detection) removes the central DC component.
                </p>
            </div>
        </div>
    );
}
