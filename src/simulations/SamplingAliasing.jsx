import React, { useState, useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function SamplingAliasing() {
    const [fSignal, setFSignal] = useState(1);
    const [fSampling, setFSampling] = useState(2.5);

    const data = useMemo(() => {
        const tMax = 5;
        const points = 200;
        const labels = [];
        const signal = [];

        // Continuous-ish signal
        for (let i = 0; i <= points; i++) {
            const t = (i / points) * tMax;
            labels.push(t.toFixed(2));
            signal.push(Math.sin(2 * Math.PI * fSignal * t));
        }

        // Samples
        const samples = [];
        const sampleIndices = [];
        const sampleInterval = 1 / fSampling;
        for (let t = 0; t <= tMax; t += sampleInterval) {
            const index = Math.round((t / tMax) * points);
            if (index <= points) {
                samples.push({ x: t.toFixed(2), y: Math.sin(2 * Math.PI * fSignal * t) });
            }
        }

        // Aliased signal (if fSampling < 2 * fSignal)
        const aliased = [];
        const fAliased = Math.abs((fSignal + fSampling / 2) % fSampling - fSampling / 2);
        // Actually the perceived frequency is f_perceived = |f_sig - n * f_s|
        // For visualization, let's keep it simple: if f_s < 2 * f_sig
        const isAliased = fSampling < 2 * fSignal;

        if (isAliased) {
            // Simplified perceived frequency for visualization
            const perceivedFreq = Math.abs(fSignal - Math.round(fSignal / fSampling) * fSampling);
            for (let i = 0; i <= points; i++) {
                const t = (i / points) * tMax;
                aliased.push(Math.sin(2 * Math.PI * perceivedFreq * t));
            }
        }

        return {
            labels,
            datasets: [
                {
                    label: 'Original Signal',
                    data: signal,
                    borderColor: '#f97316',
                    borderWidth: 2,
                    pointRadius: 0,
                },
                {
                    label: 'Samples',
                    data: samples,
                    borderColor: '#ffffff',
                    backgroundColor: '#ea580c',
                    pointRadius: 6,
                    showLine: false,
                },
                ...(isAliased ? [{
                    label: 'Perceived Signal (Aliased)',
                    data: aliased,
                    borderColor: '#dc2626',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                }] : [])
            ],
        };
    }, [fSignal, fSampling]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#9ca3af', font: { family: 'Inter' } }
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: '#f97316'
            }
        },
        scales: {
            y: {
                min: -1.5,
                max: 1.5,
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#6b7280' },
                title: {
                    display: true,
                    text: 'AMPLITUDE (V)',
                    color: '#4b5563',
                    font: { size: 10, weight: 'bold', family: 'Inter' }
                }
            },
            x: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#6b7280', maxTicksLimit: 10 },
                title: {
                    display: true,
                    text: 'TIME (S)',
                    color: '#4b5563',
                    font: { size: 10, weight: 'bold', family: 'Inter' }
                }
            },
        },
    };

    return (
        <div className="bg-black/40 rounded-3xl border border-white/10 p-8">
            <div className="h-[400px] mb-8">
                <Line data={data} options={options} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Signal Frequency (Hz)</label>
                        <span className="text-orange-500 font-mono text-xl">{fSignal.toFixed(1)}</span>
                    </div>
                    <input
                        type="range" min="0.5" max="5" step="0.1" value={fSignal}
                        onChange={(e) => setFSignal(parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sampling Rate (Hz)</label>
                        <span className={`${fSampling >= 2 * fSignal ? 'text-green-500' : 'text-red-500'} font-mono text-xl`}>
                            {fSampling.toFixed(1)}
                        </span>
                    </div>
                    <input
                        type="range" min="0.5" max="10" step="0.1" value={fSampling}
                        onChange={(e) => setFSampling(parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${fSampling >= 2 * fSignal ? 'bg-green-500' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`} />
                        <span className="text-xs text-gray-500 font-medium tracking-tight">
                            {fSampling >= 2 * fSignal ? 'Nyquist Criterion Met' : 'Aliasing Occurring! fs < 2fmax'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
