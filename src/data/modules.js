export const modules = [
    {
        id: 'fourier-analysis',
        title: 'Fourier Analysis and Transforms',
        description: 'Deep dive into the mathematical foundations of signal analysis.',
        topics: [
            {
                id: 'complex-vector',
                title: "Complex Vector Representation (Euler's Helix)",
                description: '3D visualization of complex exponentials and helical structures.'
            },
            {
                id: 'dft-vs-fft',
                title: 'Algorithmic Efficiency: DFT vs. FFT',
                description: 'Comparing computational complexity and divide-and-conquer myths.'
            },
            {
                id: 'spatial-frequency',
                title: '2D Spatial Frequency Processing',
                description: 'Image processing via FFTMagnitude spectrum and filtering.'
            },
            {
                id: 'time-frequency-duality',
                title: 'Time-Frequency Duality (Inverse FFT)',
                description: 'Interpreting spectrograms and frequency-to-time synthesis.'
            },
            {
                id: 'sampling-theorem',
                title: 'Sampling Theorem and Aliasing',
                description: 'Nyquist-Shannon criteria and the consequences of spectral folding.'
            },
            {
                id: 'optical-fourier',
                title: 'Optical Fourier Transforms (Diffraction)',
                description: 'Physical property of lenses and Fraunhofer Diffraction.'
            }
        ]
    },
    {
        id: 'digital-filters',
        title: 'Digital Filters and Impulse Response',
        description: 'Understanding how systems transform signals across time and frequency.',
        topics: [
            {
                id: 'sinc-rect-duality',
                title: 'Time-Frequency Duality: Sinc and Rectangular',
                description: 'The relationship between ideal filters and their impulse responses.'
            },
            {
                id: 'convolution',
                title: 'Convolution and System Response',
                description: 'Visual step-by-step animation of the convolution integral.'
            },
            {
                id: 'filter-windowing',
                title: 'Filter Windowing and Gibbs Phenomenon',
                description: 'Spectral leakage, ringing artifacts, and windowing functions.'
            },
            {
                id: 'matched-filtering',
                title: 'Signal Detection: Matched Filtering',
                description: 'Maximizing SNR for optimal signal detection in noise.'
            },
            {
                id: 'causality-latency',
                title: 'Causality and System Latency',
                description: 'Physical constraints of real-world signal processing.'
            },
            {
                id: 'pole-zero-analysis',
                title: 'Pole-Zero Analysis (Z-Plane)',
                description: 'Designing IIR and FIR filters via complex-plane geometry.'
            }
        ]
    },
    {
        id: 'signal-transmission',
        title: 'Signal Transmission and Digitization',
        description: 'From analog waves to digital communication pipelines.',
        topics: [
            {
                id: 'pcm-pipeline',
                title: 'Pulse Code Modulation (PCM) Pipeline',
                description: 'Sampling, quantization, and gray encoding visualization.'
            },
            {
                id: 'ofdm',
                title: 'Orthogonal Frequency Division Multiplexing (OFDM)',
                description: 'Simulating multi-carrier modulation for high efficiency.'
            },
            {
                id: 'pulse-shaping',
                title: 'Pulse Shaping and Inter-Symbol Interference (ISI)',
                description: 'Analyzing spectral occupancy vs temporal bit-smearing.'
            },
            {
                id: 'chromatic-dispersion',
                title: 'Chromatic Dispersion in Optical Fiber',
                description: 'Wavelength-dependent velocity and pulse broadening.'
            },
            {
                id: 'line-coding',
                title: 'Line Coding and Synchronization',
                description: 'Voltage-level encoding strategies and clock recovery.'
            }
        ]
    },
    {
        id: 'information-theory',
        title: 'Information Theory and Coding',
        description: 'The mathematical limits of communication and data protection.',
        topics: [
            {
                id: 'entropy-source-coding',
                title: 'Entropy and Source Coding',
                description: 'Limits of data compression and probability-information density.'
            },
            {
                id: 'channel-coding',
                title: 'Channel Coding and Error Correction',
                description: 'Using intelligent redundancy to protect data from noise.'
            },
            {
                id: 'shannon-capacity',
                title: 'Shannon Capacity Limit',
                description: 'Universal speed limit for communication based on SNR.'
            },
            {
                id: 'phase-space',
                title: 'Phase Space and Constellation Diagrams',
                description: 'Visualizing M-ary modulation and layer impairments.'
            }
        ]
    },
    {
        id: 'multiple-access',
        title: 'Multiple Access Techniques',
        description: 'Resource sharing strategies for multi-user environments.',
        topics: [
            {
                id: 'fdma-tdma-cdma',
                title: 'FDMA, TDMA, and CDMA',
                description: 'Comparative visualization of orthogonal resource sharing.'
            },
            {
                id: 'orthogonality',
                title: 'Orthogonality in Multi-user Channels',
                description: 'Mathematical proof of signal separation via vectors.'
            }
        ]
    },
    {
        id: 'spread-spectrum',
        title: 'Spread Spectrum Communications',
        description: 'Security and interference avoidance through bandwidth expansion.',
        topics: [
            {
                id: 'dsss',
                title: 'Direct Sequence Spread Spectrum (DSSS)',
                description: 'Processing gain and spectral dilution effects.'
            },
            {
                id: 'fhss',
                title: 'Frequency Hopping Spread Spectrum (FHSS)',
                description: 'Carrier agility for security and collision avoidance.'
            },
            {
                id: 'pn-sequence',
                title: 'Pseudo-Noise (PN) Sequence Generation',
                description: 'Deterministic random-looking sequences and security.'
            }
        ]
    }
];
