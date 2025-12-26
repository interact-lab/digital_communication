export const theoryContent = {
    'complex-vector': {
        title: "Complex Vector Representation (Euler's Helix)",
        description: "An interactive 3D visualization of $e^{j\omega t}$ as a helical structure, bridging the gap between trigonometric functions and complex exponentials.",
        requirements: [
            "Render a high-fidelity 3D helix along a temporal axis ($t$), where the radius represents amplitude and the pitch represents frequency.",
            "Provide seamless toggles to project the 3D structure onto 2D orthogonal planes: the Vertical plane (Real/Cosine component) and the Horizontal plane (Imaginary/Sine component) to illustrate the composition of complex signals.",
            "Include a synchronized temporal 'scrubber' slider that maps linear time progress to angular rotation on a 2D unit circle vector."
        ],
        theory: "Leonhard Euler’s formula, $e^{j\theta} = \cos \theta + j \sin \theta$, is the cornerstone of complex signal analysis. In digital communication, signals are often represented as complex exponentials to simplify operations like modulation and frequency shifting. The helical structure emerges when this complex vector is extended over time, where the Z-axis represents time, the X-axis represents the Real component, and the Y-axis represents the Imaginary component.",
        references: [
            { name: "Euler's Formula and Its Applications - MIT OpenCourseWare", url: "https://ocw.mit.edu" },
            { name: "Visualizing Complex Exponentials - DSPRelated", url: "https://www.dsprelated.com" }
        ]
    },
    'dft-vs-fft': {
        title: "Algorithmic Efficiency: DFT vs. FFT",
        description: "A side-by-side performance visualizer comparing Discrete Fourier Transform (DFT) and Fast Fourier Transform (FFT) computational complexity.",
        requirements: [
            "Visualize the $N^2$ complex multiplications for DFT vs recursive $N \log_2 N$ stages of FFT.",
            "Display real-time telemetry counters tracking total floating-point operations (FLOPs)."
        ],
        theory: "The Discrete Fourier Transform (DFT) is computationally expensive, requiring $O(N^2)$ operations. The Fast Fourier Transform (FFT) reduces this to $O(N \log N)$ by exploiting symmetry. Developed by Cooley and Tukey in 1965, the FFT made modern DSP possible.",
        references: [
            { name: "The Fast Fourier Transform - Cooley & Tukey (1965)", url: "https://ieee.org" },
            { name: "Algorithm Design - Kleinberg & Tardos", url: "https://www.pearson.com" }
        ]
    },
    'sampling-theorem': {
        title: 'Sampling Theorem and Aliasing',
        description: 'Comprehensive visualization of the Nyquist-Shannon sampling theorem and the destructive consequences of spectral folding (aliasing).',
        requirements: [
            "Variable signal frequency and sampling rate controls.",
            "Real-time visualization of Nyquist criterion and aliased ghost signals."
        ],
        theory: "The Nyquist-Shannon sampling theorem states that a band-limited signal can be perfectly reconstructed if sampled at a rate greater than twice its maximum frequency. Failure to meet this leads to aliasing, where high frequencies wrap into the baseband.",
        references: [
            { name: "Digital Communications: Fundamentals and Applications - Bernard Sklar", url: "https://www.pearson.com" },
            { name: "Communication Systems - Simon Haykin", url: "https://www.wiley.com" }
        ]
    },
    'convolution': {
        title: 'Convolution and System Response',
        description: 'A step-by-step visual animation of the convolution integral $y(t) = x(t) * h(t)$, moving from abstract calculus to physical intuition.',
        requirements: [
            "Animated overlap of $x(\\tau)$ and $h(t-\\tau)$.",
            "Real-time integration area visualization and output plotting."
        ],
        theory: "Convolution describes how an input signal is modified by a system's impulse response. It involves flipping, shifting, and integrating. In the frequency domain, this corresponds to simple multiplication of spectra.",
        references: [
            { name: "Linear Systems and Signals - B.P. Lathi", url: "https://global.oup.com" },
            { name: "Signals and Systems - Alan V. Oppenheim", url: "https://www.pearson.com" }
        ]
    },
    'pcm-pipeline': {
        title: 'Pulse Code Modulation (PCM) Pipeline',
        description: 'A modular simulation of the end-to-end digitization process.',
        requirements: [
            "Dynamic bit-depth and sampling rate parameters.",
            "Visualization of quantization noise and binary bitstream conversion."
        ],
        theory: "PCM involves Sampling, Quantization, and Encoding. Each bit added to the resolution improves the Signal-to-Quantization Noise Ratio (SQNR) by roughly 6dB.",
        references: [
            { name: "Digital Transmission Engineering - John B. Anderson", url: "https://ieee.org" }
        ]
    },
    'fdma-tdma-cdma': {
        title: 'FDMA, TDMA, and CDMA',
        description: 'Visualizing how multiple users share common communication resources via frequency, time, or code separation.',
        requirements: [
            "Compare orthogonal resource allocation strategies.",
            "Visualize spectral blocks vs temporal slots vs spread codes."
        ],
        theory: "Multiple access techniques allow shared medium usage. FDMA uses frequency slots, TDMA uses time slots, and CDMA uses unique orthogonal spreading codes to separate users in both time and frequency.",
        references: [
            { name: "Wireless Communications: Principles and Practice - Theodore Rappaport", url: "https://www.pearson.com" }
        ]
    },
    'ofdm': {
        title: 'OFDM Spectral Orthogonality',
        description: 'Simulating multi-carrier modulation to demonstrate high spectral efficiency without interference.',
        requirements: [
            "Control subcarrier spacing to observe the loss of orthogonality.",
            "Visualize the composite spectrum overlay of multiple subcarriers."
        ],
        theory: "OFDM uses multiple subcarriers spaced at exactly 1/T, ensuring their peaks align with the nulls of others. This prevents Inter-Carrier Interference (ICI) while allowing dense spectral packing.",
        references: [
            { name: "OFDM for Wireless Multimedia Communications - Richard van Nee", url: "https://www.artechhouse.com" }
        ]
    },
    'phase-space': {
        title: 'Phase Space and Constellation Diagrams',
        description: 'Visualizing signal integrity in the I/Q plane under various impairment conditions.',
        requirements: [
            "Adjustable modulation orders (up to 256-QAM).",
            "Simulate AWGN and phase jitter impact on symbol decision boundaries."
        ],
        theory: "Constellation diagrams map bits to complex amplitudes. Noise expands symbol points into clouds, while phase jitter rotates them. If a symbol crosses a decision boundary, a bit error occurs.",
        references: [
            { name: "Digital Communications - John Proakis", url: "https://www.mheducation.com" }
        ]
    },
    'spatial-frequency': {
        title: '2D Spatial Frequency Processing',
        description: 'Demonstrating image filtering via the 2D-FFT magnitude spectrum.',
        requirements: [
            "Simulate Low-pass and High-pass frequency masks.",
            "Visualize the relationship between spatial patterns and spectral coordinates."
        ],
        theory: "An image's details are high spatial frequencies located far from the spectrum center. DC components representing average brightness are at the origin. Filtering the spectrum modifies features in the spatial domain.",
        references: [
            { name: "Digital Image Processing - Rafael Gonzalez", url: "https://www.pearson.com" }
        ]
    },
    'dsss': {
        title: 'Direct Sequence Spread Spectrum (DSSS)',
        description: 'Visualizing processing gain and spectral dilution through high-speed PRN code spreading.',
        requirements: [
            "Time-domain multiplier for data and chip sequence.",
            "Demonstrate signal recovery under high noise through correlation."
        ],
        theory: "DSSS spreads signal power over a wide bandwidth, lowering the power spectral density below the noise floor. Correlating with the known PN code at the receiver 'despreads' the signal while spreading the noise.",
        references: [
            { name: "Spread Spectrum Communications Handbook - Marvin Simon", url: "https://ieee.org" }
        ]
    },
    'channel-coding': {
        title: 'Channel Coding & Error Correction',
        description: 'Adding intelligent redundancy to fight channel noise.',
        requirements: ["Majority vote logic", "Bit flip interaction"],
        theory: "Forward Error Correction (FEC) adds parities or repetitions. A simple repetition code allows the receiver to correct single bit errors by taking a majority vote.",
        references: [{ name: "Theory and Practice of Error Control Codes - Richard Blahut", url: "https://www.pearson.com" }]
    },
    'pulse-shaping': {
        title: 'Pulse Shaping & Bandwidth Efficiency',
        description: 'Designing waveforms to eliminate Inter-Symbol Interference (ISI).',
        requirements: ["Raised Cosine filter response", "Roll-off factor control"],
        theory: "Nyquist's first criterion states that pulses must cross zero at sampling instants. The Raised Cosine filter is a practical approximation that balances bandwidth occupancy with timing robustness.",
        references: [{ name: "Digital Communications - Proakis", url: "https://www.mheducation.com" }]
    },
    'line-coding': {
        title: 'Line Coding Techniques',
        description: 'Mapping binary bits to physical electrical signals.',
        requirements: ["NRZ, RZ, and Manchester visualization"],
        theory: "Line coding selected based on spectral density, timing recovery, and DC balance. Manchester coding ensures frequent transitions for self-clocking.",
        references: [{ name: "Modern Digital and Analog Communication Systems - Lathi", url: "https://global.oup.com" }]
    },
    'time-frequency-duality': {
        title: 'Time-Frequency Duality (Inverse FFT)',
        description: 'Exploring the reciprocal relationship between pulse width and spectral bandwidth.',
        requirements: ["Variable pulse width control", "Simultaneous display of Time and Frequency domains"],
        theory: "The Scaling Theorem of the Fourier Transform states that compressing a signal in time ($t \\to at$) results in an expansion and amplitude scaling in frequency. This defines the fundamental bandwidth requirements for high-speed digital transmission.",
        references: [{ name: "The Fourier Transform - Ron Bracewell", url: "https://www.stanford.edu" }]
    },
    'optical-fourier': {
        title: 'Optical Fourier Transforms (Diffraction)',
        description: 'Visualizing how physical apertures perform mathematical Fourier Transforms through light diffraction.',
        requirements: ["Variable slit width and wavelength", "Fraunhofer intensity pattern visualization"],
        theory: "Fraunhofer diffraction describes how light passing through an aperture creates a pattern in the far-field that is the 2D Fourier Transform of the aperture's shape. This is the basis of optical signal processing.",
        references: [{ name: "Introduction to Fourier Optics - Joseph W. Goodman", url: "https://www.mcgraw-hill.com" }]
    },
    'filter-windowing': {
        title: 'Filter Windowing and Gibbs Phenomenon',
        description: 'Analyzing the artifacts generated by truncating infinite Fourier series.',
        requirements: ["Harmonic count control", "Comparison of Rectangular vs. Hamming windows"],
        theory: "Truncating a Fourier series is equivalent to multiplying by a rectangular window. This convolution in frequency causes 'ringing' and overshoot (Gibbs Phenomenon). Window functions like Hamming smooth these transitions.",
        references: [{ name: "Discrete-Time Signal Processing - Oppenheim", url: "https://www.pearson.com" }]
    },
    'matched-filtering': {
        title: 'Signal Detection: Matched Filtering',
        description: 'Demonstrating the optimal filter for maximizing SNR in the presence of AWGN.',
        requirements: ["Adjustable noise level", "Cross-correlation peak visualization"],
        theory: "A Matched Filter has an impulse response that is a time-reversed and shifted version of the known signal template. At the sampling instant, it perfectly aligns with the signal, maximizing the output Signal-to-Noise Ratio (SNR).",
        references: [{ name: "Detection, Estimation, and Modulation Theory - Van Trees", url: "https://www.wiley.com" }]
    },
    'causality-latency': {
        title: 'Causality and System Latency',
        description: 'Understanding why physical systems must follow the arrow of time.',
        requirements: ["Adjustable system delay", "Causal vs. Non-Causal toggle"],
        theory: "A system is causal if its output at any time depends only on present and past inputs. In the impulse response domain, this means $h(t) = 0$ for $t < 0$. Real-time filters always introduce a group delay to satisfy this condition.",
        references: [{ name: "Signals and Systems - Haykin", url: "https://www.wiley.com" }]
    },
    'chromatic-dispersion': {
        title: 'Chromatic Dispersion in Optical Fiber',
        description: 'Simulating pulse broadening over long-distance optical communication links.',
        requirements: ["Fiber length and dispersion coefficient sliders", "Visual smearing of wavelength components"],
        theory: "Chromatic dispersion occurs because different wavelengths of light travel at different group velocities within a fiber. This causes a pulse to spread out as it propagates, eventually leading to Inter-Symbol Interference (ISI).",
        references: [{ name: "Fiber-Optic Communication Systems - Govind P. Agrawal", url: "https://www.wiley.com" }]
    },
    'entropy-source-coding': {
        title: 'Entropy and Source Coding',
        description: 'Measuring the average information content and the limits of data compression.',
        requirements: ["Dynamic symbol probability adjustment", "Entropy ($H(X)$) calculation"],
        theory: "Entropy is the mathematical measure of uncertainty or surprise. Shannons Source Coding Theorem states that the average number of bits required to represent a source cannot be less than its entropy.",
        references: [{ name: "Elements of Information Theory - Thomas Cover", url: "https://www.wiley.com" }]
    },
    'shannon-capacity': {
        title: 'Shannon Capacity Limit',
        description: 'Calculating the universal maximum bit rate for noisy channels.',
        requirements: ["Bandwidth and SNR controls", "Theoretical max throughput calculation"],
        theory: "The Shannon-Hartley theorem defines the maximum rate $C$ at which information can be transmitted over a channel of bandwidth $B$ and signal-to-noise ratio $S/N$. It is the ultimate boundary for all communication systems.",
        references: [{ name: "A Mathematical Theory of Communication - Claude Shannon (1948)", url: "https://bell-labs.com" }]
    },
    'orthogonality': {
        title: 'Orthogonality in Multi-user Channels',
        description: 'Visualizing how orthogonal signals eliminate inter-user interference.',
        requirements: ["Vector rotation for phase/timing offset", "Dot product/Correlation indicator"],
        theory: "Two signals are orthogonal if their inner product is zero. This property is exploited in CDMA, OFDM, and Polarized Antenna systems to send multiple independent streams over the same physical medium.",
        references: [{ name: "Communication Systems Engineering - Proakis", url: "https://www.pearson.com" }]
    },
    'fhss': {
        title: 'Frequency Hopping Spread Spectrum (FHSS)',
        description: 'Demonstrating security and interference rejection through carrier hopping.',
        requirements: ["Active hopping visualization", "Spectrogram/Waterfall history"],
        theory: "FHSS switches the carrier frequency rapidly across a wide band. Since the 'eavesdropper' or 'jammer' doesn't know the pseudo-random hopping sequence, the signal remains secure and robust against narrowband interference.",
        references: [{ name: "Spread Spectrum Systems - Robert Dixon", url: "https://www.wiley.com" }]
    },
    'pn-sequence': {
        title: 'Pseudo-Noise (PN) Sequence Generation',
        description: 'Building the deterministic "keys" for digital communication security.',
        requirements: ["Interactive LFSR register bits", "Tapped feedback visualization"],
        theory: "A Pseudo-Noise sequence is generated using a Linear Feedback Shift Register (LFSR). While it statistically looks like noise, it is perfectly repeatable, serving as the basis for spreading and encryption.",
        references: [{ name: "Digital Communications - Bernard Sklar", url: "https://www.pearson.com" }]
    },
    'sinc-rect-duality': {
        title: 'Sinc and Rectangular Duality',
        description: 'The defining symmetry of Fourier analysis in communications.',
        requirements: ["Instant swapping of time/frequency domains", "Comparison of Rect vs. Sinc shapes"],
        theory: "The Rectangular pulse and the Sinc function are a Fourier Transform pair. A rectangle in time yields a sinc in frequency, and vice versa. This duality allows us to design filters and pulses with desired spectral properties.",
        references: [{ name: "Signals and Systems - Oppenheim", url: "https://www.pearson.com" }]
    }
};
