export const theoryContent = {
    'complex-vector': {
        title: "Complex Vector Representation (Euler's Helix)",
        description: "An interactive 3D visualization of $e^{j\omega t}$ as a helical structure, bridging the gap between trigonometric functions and complex exponentials.",
        requirements: [
            "Render a high-fidelity 3D helix along a temporal axis ($t$), where the radius represents amplitude and the pitch represents frequency.",
            "Provide seamless toggles to project the 3D structure onto 2D orthogonal planes to illustrate the composition of complex signals.",
            "Include a synchronized temporal 'scrubber' slider that maps linear time progress to angular rotation."
        ],
        theory: "Leonhard Euler’s identity, $e^{j\theta} = \cos \theta + j \sin \theta$, is the cornerstone of modern signal analysis. In digital communication, signals are almost universally represented as complex exponentials rather than pure trigonometric functions. This 'complexification' is not merely a mathematical convenience; it allows us to represent a signal as a rotating vector (phasor) in the complex plane, which simplifies complex operations like frequency modulation into simple additive exponents.\n\n### The Helical Visualization\nWhen this rotating complex vector is extended along a linear temporal axis ($t$), it traces out a 3D helical structure. This 'Euler's Helix' perfectly encapsulates the three fundamental parameters of any periodic signal:\n1. **Amplitude**: The radius of the helix, representing the peak power of the carrier.\n2. **Frequency ($\omega$ or $2\pi f$**): The 'pitch' of the helix, or the rate at which the vector rotates as it moves forward in time.\n3. **Phase ($\phi$)**: The starting angle of the vector at $t=0$.\n\n### Geometric Projections\nThe beauty of this 3D model is revealed through its 2D projections. Projecting the helix onto the Real ($Re-t$) plane yields a perfect **Cosine** wave: $x(t) = A \cos(\omega t + \phi)$. Projecting it onto the Imaginary ($Im-t$) plane yields a **Sine** wave: $y(t) = A \sin(\omega t + \phi)$. These two components are known as the In-phase ($I$) and Quadrature ($Q$) parts, and their simultaneous transmission allows for efficient modulation techniques like QAM and OFDM.",
        references: [
            { name: "Euler's Formula and Its Applications - MIT OCW", url: "https://ocw.mit.edu/courses/mathematics/18-03sc-differential-equations-fall-2011/complex-arithmetic-and-exponentials/eulers-formula/" },
            { name: "Visualizing Complex Exponentials - DSPRelated (Richard Lyons)", url: "https://www.dsprelated.com/showarticle/192.php" },
            { name: "A Note on Euler's Formulas - Stanford University (Cameron Devine)", url: "https://camerondevine.me/assets/notes/Euler.pdf" }
        ]
    },
    'dft-vs-fft': {
        title: "Algorithmic Efficiency: DFT vs. FFT",
        description: "A side-by-side performance visualizer comparing Discrete Fourier Transform (DFT) and Fast Fourier Transform (FFT) computational complexity.",
        requirements: [
            "Visualize the $N^2$ complex multiplications for DFT vs recursive $N \log_2 N$ stages of FFT.",
            "Display real-time telemetry counters tracking total floating-point operations (FLOPs)."
        ],
        theory: "The Fourier Transform is the mathematical bridge that allows us to view signals in the frequency domain. However, computers process signals as discrete packets of data, leading to the **Discrete Fourier Transform (DFT)**. While the DFT is mathematically sound, its naive implementation is a massive computational bottleneck.\n\n### The $O(N^2)$ Crisis\nThe standard definition of a DFT requires every output frequency bin to be calculated by summing over every input time sample. For a signal with $N$ points, this requires $N^2$ complex multiplications and additions. If $N=1024$ (a common size), the system must perform over a million operations. This quadratic scaling makes real-time signal processing impossible on low-power devices like smartphones or IoT sensors.\n\n### The FFT Breakthrough\nIn 1965, James Cooley and John Tukey popularized the **Fast Fourier Transform (FFT)**, an algorithm that exploits mathematical symmetries and the 'Divide and Conquer' paradigm. By recursively decomposing an $N$-point transform into smaller transforms (Butterfly operations), and exploiting the periodic nature of the 'twiddle factors' ($e^{-j2\pi nk/N}$), the complexity drops to $O(N \log_2 N)$.\n\n**Performance Impact:**\nFor $N = 1024$:\n- Naive DFT: $\approx 1,048,576$ operations.\n- FFT: $\approx 10,240$ operations.\nThe FFT is roughly **100 times more efficient**, enabling the real-time spectral analysis that powers everything from Wi-Fi and 5G to medical MRI scans and MP3 audio decompression.",
        references: [
            { name: "Cooley-Tukey (1965): Machine Calculation of Complex Fourier Series - JSTOR", url: "https://www.jstor.org/stable/2003354" },
            { name: "FFT: A Retrospective - Cooley (IEEE 2002)", url: "https://ieeexplore.ieee.org/document/1037418" },
            { name: "Fast Fourier Transform - MIT OpenCourseWare (Lecture by Gilbert Strang)", url: "https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/video-lectures/lecture-26-complex-matrices-fast-fourier-transform-fft/" }
        ]
    },
    'sampling-theorem': {
        title: 'Sampling Theorem and Aliasing',
        description: 'Comprehensive visualization of the Nyquist-Shannon sampling theorem and the destructive consequences of spectral folding (aliasing).',
        requirements: [
            "Variable signal frequency and sampling rate controls.",
            "Real-time visualization of Nyquist criterion and aliased ghost signals."
        ],
        theory: "The **Nyquist-Shannon Sampling Theorem** is the fundamental bridge between the continuous analog world and the discrete digital domain. It establishes the minimum required rate at which an analog signal must be sampled to ensure mathematical reconstructibility without loss of information. For a band-limited signal with a maximum frequency component $W$ (in Hertz), the sampling frequency $f_s$ must strictly satisfy the condition: $$f_s > 2W$$\n\n### The Nyquist Rate and Aliasing\nThe value $2W$ is known as the **Nyquist Rate**. If a signal is 'undersampled' ($f_s \leq 2W$), the high-frequency components 'disguise' themselves as lower frequencies, a phenomenon known as **Aliasing**. In the frequency domain, sampling creates periodic copies (images) of the signal's spectrum at intervals of $f_s$. If $f_s$ is too low, these spectral images overlap, causing 'spectral folding'. Once aliasing occurs, the signal is permanently corrupted and cannot be recovered via filtering. This is why every digital system (from smartphones to high-end audio interfaces) must use an analog **Anti-Aliasing Filter** to truncate any signal energy above $f_s/2$ before the sampling stage.",
        references: [
            { name: "Shannon (1949): Communication in the Presence of Noise - Proceedings of the IEEE", url: "https://ieeexplore.ieee.org/document/6773024" },
            { name: "The Sampling Theorem - Stanford CCRMA (Julius O. Smith III)", url: "https://ccrma.stanford.edu/~jos/pasp/Sampling_Theorem.html" },
            { name: "Digital Signal Processing Guide: Chapter 3 (Sampling) - Steven W. Smith", url: "https://www.dspguide.com/ch3.htm" }
        ]
    },
    'convolution': {
        title: 'Convolution and System Response',
        description: 'A step-by-step visual animation of the convolution integral $y(t) = x(t) * h(t)$, moving from abstract calculus to physical intuition.',
        requirements: [
            "Animated overlap of $x(\\tau)$ and $h(t-\\tau)$.",
            "Real-time integration area visualization and output plotting."
        ],
        theory: "Convolution is the mathematical engine of Linear Time-Invariant (LTI) systems. It describes how an input signal $x(t)$ is transformed by a system's impulse response $h(t)$ to produce an output $y(t)$. The relationship is defined by the convolution integral: $$y(t) = \int_{-\infty}^{\infty} x(\tau)h(t-\tau) d\tau$$\n\n### Physical Intuition\nThink of convolution as a weighted mapping where the system 'remembers' previous inputs. The impulse response $h(t)$ tells us how the system reacts to a single spike; convolution tells us how it reacts to a continuous stream of spikes. In communication, this is critical because every physical channel (wire, fiber, air) acts as a convolutional filter. For example, a multipath wireless channel convolves your signal with multiple delayed echoes, causing Inter-Symbol Interference (ISI). To recover the original data, receivers must use 'equalizers' which effectively perform an inverse convolution (deconvolution) to nullify the channel's impact. The operation can be visualized as four steps: **Flip** ($h(\tau) \to h(-\tau)$), **Shift** (by time $t$), **Multiply**, and **Integrate**.",
        references: [
            { name: "Signals and Systems - MIT OCW (Lecture on Convolution)", url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-003-signals-and-systems-fall-2011/lecture-videos/lecture-2-signals-and-systems/" },
            { name: "LTI Systems and the Convolution Integral - Purdue University", url: "https://engineering.purdue.edu/~ee301/Theory/convolution_LTI.pdf" },
            { name: "Convolution Integral - Wolfram MathWorld", url: "https://mathworld.wolfram.com/Convolution.html" }
        ]
    },
    'pcm-pipeline': {
        title: 'Pulse Code Modulation (PCM) Pipeline',
        description: 'A modular simulation of the end-to-end digitization process: Sample, Quantize, Encode.',
        requirements: [
            "Dynamic bit-depth and sampling rate parameters.",
            "Visualization of quantization noise and binary bitstream conversion."
        ],
        theory: "Pulse Code Modulation (PCM) is the universal standard for digital audio and voice communication. It transforms a continuous analog waveform into a robust digital bitstream through a three-stage 'pipeline':\n\n### 1. Sampling\nTaking snapshot measurements of the signal voltage at discrete time intervals. To prevent information loss, the sampling rate must obey the Nyquist criterion ($f_s > 2W$). This discretizes the signal in the temporal domain.\n\n### 2. Quantization\nAnalog values are continuous, but digital systems have finite precision. Quantization rounds each sample to the nearest level in a discrete set. This introduces **Quantization Noise**, a fundamental error that decreases as we increase the 'Bit Depth' ($n$). Each additional bit roughly adds 6 dB to the Signal-to-Quantization-Noise Ratio (SQNR).\n\n### 3. Encoding\nThe quantized levels are converted into binary codewords. Modern variations like G.711 (used in VoIP) use logarithmic quantization (A-law or $\mu$-law) to provide higher resolution for quiet sounds where human hearing is most sensitive, significantly improving voice clarity for a given bandwidth.",
        references: [
            { name: "Principles of Pulse Code Modulation - University of Ottawa", url: "https://site.uottawa.ca/~rhabash/ELG4172CH04.pdf" },
            { name: "ITU-T Recommendation G.711: Pulse Code Modulation (PCM) of Voice Frequencies", url: "https://www.itu.int/rec/T-REC-G.711" },
            { name: "Digital Transmission Engineering - John B. Anderson", url: "https://ieeexplore.ieee.org/book/5237241" }
        ]
    },
    'fdma-tdma-cdma': {
        title: 'Multiple Access Techniques',
        description: 'Visualizing how multiple users share common communication resources via frequency, time, or code separation.',
        requirements: [
            "Compare orthogonal resource allocation strategies.",
            "Visualize spectral blocks vs temporal slots vs spread codes."
        ],
        theory: "The electromagnetic spectrum is a finite and expensive resource. **Multiple Access (MA)** techniques enable hundreds or thousands of users to share the same physical channel (air, cable, or fiber) simultaneously without catastrophic interference. \n\n### FDMA (Frequency Division)\nLike an old radio dial, FDMA assigns each user a non-overlapping frequency band. Users transmit continuously but within their own 'spectral lane'. Guard bands are required between users to prevent bleed-over.\n\n### TDMA (Time Division)\nUsed in GSM/2G, TDMA lets multiple users share the same wideband frequency by taking turns. Each user is assigned a specific 'Time Slot'. This requires extremely precise clock synchronization across the network.\n\n### CDMA (Code Division)\nCDMA allows all users to transmit across the *entire* bandwidth at the *same* time. They are separated by unique, orthogonal spreading codes. Receiver math effectively 'filters' out unwanted users by correlating the incoming data with the specific target code. This technology provided the massive capacity gains seen in 3G networks and is the basis for GPS signal separation.",
        references: [
            { name: "Wireless Communications: Principles and Practice - Theodore Rappaport", url: "https://www.pearson.com/en-us/subject-catalog/p/wireless-communications-principles-and-practice/P200000003260" },
            { name: "Comparison of Multiple Access Techniques - RF Wireless World", url: "https://www.rfwireless-world.com/Terminology/FDMA-vs-TDMA-vs-CDMA.html" },
            { name: "Principles of CDMA - Qualcomm (Historical Archive)", url: "https://www.qualcomm.com/news/onq/2013/11/cdma-history-and-future-mobile-communications" }
        ]
    },
    'ofdm': {
        title: 'OFDM Spectral Orthogonality',
        description: 'Simulating multi-carrier modulation to demonstrate high spectral efficiency without interference.',
        requirements: [
            "Control subcarrier spacing to observe the loss of orthogonality.",
            "Visualize the composite spectrum overlay of multiple subcarriers."
        ],
        theory: "**Orthogonal Frequency Division Multiplexing (OFDM)** is the resilient backbone of 4G LTE, 5G, and modern Wi-Fi. It addresses the fundamental challenge of high-speed transmission: frequency-selective fading and Inter-Symbol Interference (ISI) in multipath environments.\n\n### The Orthogonality Principle\nTraditional Frequency Division Multiplexing requires wide 'guard bands' between subcarriers to prevent cross-talk. OFDM, however, spaces its subcarriers so precisely that at the peak frequency of one subcarrier, all other subcarriers are at their 'null' (zero) point. This mathematical orthogonality allows the spectra of the subcarriers to overlap significantly without interfering, maximizing spectral efficiency.\n\n### Parallelism vs. Speed\nInstead of sending one very fast stream of data (which is easily ruined by a single obstacle), OFDM splits the data into hundreds of slow, parallel 'sub-channels'. Because each sub-carrier is slow, the symbol duration is long, making the system naturally robust against timing errors and reflections. If some subcarriers are blocked, the system uses Forward Error Correction (FEC) to recover the lost bits from the remaining carriers, ensuring a stable connection even in complex urban environments.",
        references: [
            { name: "OFDM for Wireless Multimedia Communications - Richard van Nee (Reference Book)", url: "https://www.artechhouse.com/International/Main/OFDM-for-Wireless-Multimedia-Communications-468.aspx" },
            { name: "Concepts of Orthogonality in OFDM Explained - highfrequencyelectronics.com", url: "https://www.highfrequencyelectronics.com/index.php?option=com_content&view=article&id=324:concepts-of-orthogonality-in-ofdm-explained&catid=83:tutorials&Itemid=125" },
            { name: "OFDM: Principle and Applications - National Instruments", url: "https://www.ni.com/en-in/innovations/white-papers/06/introduction-to-orthogonal-frequency-division-multiplexing.html" }
        ]
    },
    'phase-space': {
        title: 'Phase Space and Constellation Diagrams',
        description: 'Visualizing signal integrity in the I/Q plane under various impairment conditions.',
        requirements: [
            "Adjustable modulation orders (up to 256-QAM).",
            "Simulate AWGN and phase jitter impact on symbol decision boundaries."
        ],
        theory: "Quadrature Amplitude Modulation (QAM) and Phase Shift Keying (PSK) are the building blocks of modern digital modulation. These techniques represent digital bits by modifying the amplitude and phase of a carrier wave. A **Constellation Diagram** is a visualization of the signal in the 'Complex Phase Space' (or I/Q plane).\n\n### The I/Q mapping\nEvery digital symbol corresponds to a specific point $(I, Q)$ in the complex plane, where $I$ (In-phase) is the cosine coefficient and $Q$ (Quadrature) is the sine coefficient. For instance, in 16-QAM, each point represents 4 bits. When we move to 256-QAM (used in 5G), we pack 8 bits into each point, dramatically increasing the data rate.\n\n### Channel Impairments\nThe constellation diagram is an essential diagnostic tool for engineers. In a perfect channel, the points are sharp. However:\n- **AWGN (Noise)**: Causes the points to spread into circular 'clouds'.\n- **Phase Noise**: Rotates the points along an arc around the origin.\n- **Gain Compression**: Squeezes the outer points closer to the center.\nIf the noise is high enough that a point crosses the 'Decision Boundary' into a neighbor's territory, the receiver makes a mistake, resulting in a **Bit Error**.",
        references: [
            { name: "Understanding Digital Modulation and Constellation Diagrams - Keysight", url: "https://www.keysight.com/in/en/assets/7018-05232/white-papers/5992-1641.pdf" },
            { name: "Digital Modulation: PSK and QAM - All About Circuits", url: "https://www.allaboutcircuits.com/textbook/radio-frequency-analysis-design/radio-frequency-modulation/digital-modulation-psk-and-qam/" },
            { name: "Advanced Communication Systems: QAM - University of Illinois (UIUC)", url: "https://courses.engr.illinois.edu/ece459/fa2021/pdf/lecture_notes/Lecture_8_QAM.pdf" }
        ]
    },
    'spatial-frequency': {
        title: '2D Spatial Frequency Processing',
        description: 'Demonstrating image filtering via the 2D-FFT magnitude spectrum.',
        requirements: [
            "Simulate Low-pass and High-pass frequency masks.",
            "Visualize the relationship between spatial patterns and spectral coordinates."
        ],
        theory: "Just as audio signals oscillate over time, digital images oscillate over space. The 2D Fourier Transform is the key to understanding **Spatial Frequency**—the rate at which color or brightness changes as you move across an image. \n\n### Mapping the 2D Spectrum\nIn a 2D-FFT magnitude spectrum, the center of the image represents the low spatial frequencies (large objects, slow gradients, and general lighting). The outer edges represent high spatial frequencies (sharp edges, fine textures, and random noise). Diagonal components represent patterns oriented at specific angles.\n\n### Frequency Domain Processing\nThis decomposition allows for powerful image processing techniques that would be difficult in the spatial domain:\n- **Low-Pass Filtering**: By masking the outer frequencies, we can blur an image or remove noise, which is a fundamental step in compression algorithms like JPEG.\n- **High-Pass Filtering**: By masking the center, we can perform edge detection and sharpening, highlighting the 'high-contrast' details of a scene.\nModern medical imaging (CT/MRI) and satellite reconnaissance rely heavily on these spatial frequency manipulations to enhance subtle features and reconstruct clear images from noisy raw data.",
        references: [
            { name: "Digital Image Processing: The Fourier Transform - Stanford University", url: "https://web.stanford.edu/class/ee368/Handouts/Lectures/2014_Spring/6-Fourier_Transform_Notes.pdf" },
            { name: "2D Fourier Transforms in Image Enhancement - University of Edinburgh", url: "https://homepages.inf.ed.ac.uk/rbf/HIPR2/fourier.htm" },
            { name: "Image Analysis in the Frequency Domain - Olympus Life Science", url: "https://www.olympus-lifescience.com/en/science-library/live-cell-imaging/image-analysis-in-the-frequency-domain/" }
        ]
    },
    'dsss': {
        title: 'Direct Sequence Spread Spectrum (DSSS)',
        description: 'Visualizing processing gain and spectral dilution through high-speed PRN code spreading.',
        requirements: [
            "Time-domain multiplier for data and chip sequence.",
            "Demonstrate signal recovery under high noise through correlation."
        ],
        theory: "**Direct Sequence Spread Spectrum (DSSS)** is a technique where a signal is intentionally spread over a much wider bandwidth than its data rate suggests. This 'spectral dilution' provides extraordinary resistance to interference, jamming, and eavesdropping.\n\n### Spreading and Processing Gain\nTo spread the signal, each binary bit (1 or 0) is multiplied by a high-speed pseudo-random noise (PN) sequence. These high-speed bits are called 'chips'. If one data bit is multiplied by 11 chips, the bandwidth of the signal increases 11-fold. The ratio of the spread bandwidth to the original data bandwidth is called the **Processing Gain**. \n\n### Signal Recovery in Noise\nAt the receiver, the incoming wideband signal (which may be buried deep beneath the noise floor) is once again multiplied by the *exact same* PN sequence. This 'de-spreading' compresses the intended signal back into its narrow original band, while simultaneously spreading any actual environmental noise out into a low-level background. This allows DSSS systems, like GPS and early 802.11 Wi-Fi, to operate reliably even when the signal-to-noise ratio is negative (signal is weaker than noise).",
        references: [
            { name: "Spread Spectrum Communications - University of California, San Diego (UCSD)", url: "https://circuit.ucsd.edu/~yhk/ece158b-win15/lectures/SpreadSpectrum.pdf" },
            { name: "Principles of DSSS and Processing Gain - Analog Devices", url: "https://www.analog.com/en/technical-articles/introduction-to-spread-spectrum-communications.html" },
            { name: "GPS Signal Structure: DSSS and C/A Codes - University of Colorado Boulder", url: "https://ccar.colorado.edu/gps/course_notes/GPS_Signal_Structure.pdf" }
        ]
    },
    'channel-coding': {
        title: 'Channel Coding & Error Correction',
        description: 'Adding intelligent redundancy to fight channel noise.',
        requirements: ["Majority vote logic", "Bit flip interaction"],
        theory: "Wireless channels are inherently hostile environments filled with noise, interference, and fading. **Channel Coding**, also known as Forward Error Correction (FEC), is the technique of adding carefully designed redundancy to the data stream so that the receiver can detect and correct errors without requiring retransmission.\n\n### The Math of Redundancy\nClaude Shannon proved that as long as the information rate is below the channel capacity, there exist codes that can achieve as low an error rate as desired. \n- **Hamming Codes**: The simplest form of block codes that can correct single-bit errors using parity bits.\n- **Reed-Solomon Codes**: Non-binary cyclic codes that are extremely effective at correcting 'burst errors' (e.g., a scratch on a CD or a sudden burst of lightning interference).\n- **LDPC and Polar Codes**: These are the cutting-edge codes used in 5G NR. They approach the theoretical Shannon Limit, allowing us to transmit or stream high-definition video near the edge of what physics allows.\nBy treating data blocks as high-dimensional vectors, channel coding allows the receiver to find the 'nearest valid codeword' even when many bits have been flipped by noise.",
        references: [
            { name: "Error Control Coding - Shu Lin & Daniel Costello (Pearson)", url: "https://www.pearson.com/en-us/subject-catalog/p/error-control-coding/P200000003222" },
            { name: "Reed-Solomon Codes: A Tutorial - Bernard Sklar", url: "https://web.mit.edu/6.111/www/s2008/RESOURCES/reed_solomon.pdf" },
            { name: "Polar Codes in 5G NR - IEEE Communications Society", url: "https://www.comsoc.org/publications/magazines/ieee-communications-magazine/archive/2018/february/polar-codes-5g-new-radio" }
        ]
    },
    'pulse-shaping': {
        title: 'Pulse Shaping & Bandwidth Efficiency',
        description: 'Designing waveforms to eliminate Inter-Symbol Interference (ISI).',
        requirements: ["Raised Cosine filter response", "Roll-off factor control"],
        theory: "In a digital system, we represent bits as pulses. A naive choice would be a rectangular pulse, but rectangular pulses have infinite bandwidth (sinc function in frequency), which would cause massive interference with neighboring channels. **Pulse Shaping** is the process of modifying the pulse to fit within a specific allotted bandwidth while preventing **Inter-Symbol Interference (ISI)**.\n\n### The Nyquist ISI Criterion\nNyquist proved that for zero ISI, the pulse shape $p(t)$ must have 'nulls' at every multiple of the sampling interval $T$. The most common solution is the **Raised Cosine (RC)** filter. \n### Roll-off and Trade-offs\nThe 'Roll-off factor' ($\alpha$) determines the steepness of the filter. \n- $\alpha = 0$: Yields a perfect brick-wall filter (Ideal Sinc), which is spectrally efficient but impossible to build and extremely sensitive to timing errors ('Ringing').\n- $\alpha = 1$: Yields a much smoother pulse that is easy to synchronize but uses twice the bandwidth.\nModern systems typically use a Split-Filter approach where a **Root-Raised Cosine (RRC)** filter is placed at both the transmitter and receiver, resulting in an overall Raised Cosine response that maximizes the Signal-to-Noise Ratio (SNR).",
        references: [
            { name: "Raised Cosine Filters and Pulse Shaping - All About Circuits", url: "https://www.allaboutcircuits.com/textbook/radio-frequency-analysis-design/radio-frequency-modulation/pulse-shaping-raised-cosine-filter/" },
            { name: "Pulse Shaping in Digital Communications - University of Utah", url: "https://www.ece.utah.edu/~ece5520/lectures/lecture_pulseshaping.pdf" },
            { name: "Digital Communication: Pulse Shaping - John Proakis (McGraw-Hill)", url: "https://www.mheducation.com/highered/product/digital-communications-proakis-salehi/M9780072957167.html" }
        ]
    },
    'line-coding': {
        title: 'Line Coding Techniques',
        description: 'Mapping binary bits to physical electrical signals (Voltage levels).',
        requirements: ["NRZ, RZ, and Manchester visualization"],
        theory: "Line coding is the final step in the physical layer where digital bits are mapped to electrical or optical voltage levels for transmission. It isn't as simple as 'High = 1' and 'Low = 0'; a good line code must satisfy several engineering constraints:\n\n1. **DC Balance**: Many channels (like transformers or AC-coupled circuits) cannot pass a constant DC voltage. We need codes that average to 0V over time.\n2. **Self-Clocking**: The receiver needs transitions (edges) to keep its clock perfectly synchronized with the transmitter. Long strings of zeros or ones can cause 'clock drift'.\n3. **Spectral Efficiency**: Some codes use less bandwidth than others for the same bit rate.\n\n### Common Schemes\n- **Non-Return-to-Zero (NRZ)**: Simplest but has poor clocking and DC properties.\n- **Manchester Encoding**: Every bit has a transition in the middle (e.g., Low-to-High for '1'). This ensures perfect synchronization and 0 DC offset, at the cost of doubling the bandwidth. This is why it was chosen for early Ethernet protocol.",
        references: [
            { name: "Line Coding in Telecommunications - Wikipedia", url: "https://en.wikipedia.org/wiki/Line_code" },
            { name: "Manchester Encoding and Line Codes - University of Texas at Austin", url: "https://users.ece.utexas.edu/~bevans/courses/realtime/lectures/11_Data_Communication/index.html" },
            { name: "Data Encoding Techniques - Cisco Networking Academy", url: "https://www.cisco.com/c/en/us/support/docs/optical-networking/synchronous-digital-hierarchy-sdh/11621-encoding-11621.html" }
        ]
    },
    'time-frequency-duality': {
        title: 'Time-Frequency Duality',
        description: 'Exploring the reciprocal relationship between pulse width and spectral bandwidth.',
        requirements: ["Variable pulse width control", "Simultaneous display of Time and Frequency domains"],
        theory: "The relationship between time and frequency is governed by a fundamental symmetry called the **Scaling Theorem** of the Fourier Transform. It states that if you compress a signal in the time domain, its spectrum expands in the frequency domain, and vice-versa. Mathematically, if $x(t) \leftrightarrow X(f)$, then $x(at) \leftrightarrow \frac{1}{|a|}X(\frac{f}{a})$.\n\n### The Bandwidth-Speed Trade-off\nThis duality is the most persistent 'law of nature' in communication engineering. If you want to transmit data at very high speeds, your pulses must be extremely short (compressed in time). This forces the signal to occupy a massive amount of spectrum (expanded in frequency). This is exactly why 5G and 6G technologies, which target Gbps speeds, are forced to use the 'Millimeter Wave' bands; higher frequencies provide the enormous bandwidth (several GHz) required to support such short, rapid pulses. Understanding this duality is crucial for 'Link Budget' analysis, where engineers must balance data rate ($R$) against the available licensed bandwidth ($B$).",
        references: [
            { name: "The Fourier Transform and Its Applications - Ronald Bracewell (Stanford)", url: "https://ee.stanford.edu/~bracewell/" },
            { name: "Time-Frequency Analysis: The Scaling Property - Yale University", url: "http://campuspress.yale.edu/rt73/files/2016/09/Lecture_4_Fourier_Properties-1v6uyn8.pdf" },
            { name: "Bandwidth and Pulse Duration - Wikipedia", url: "https://en.wikipedia.org/wiki/Bandwidth-duration_product" }
        ]
    },
    'optical-fourier': {
        title: 'Optical Fourier Transforms (Diffraction)',
        description: 'Visualizing how physical apertures perform mathematical Fourier Transforms through light diffraction.',
        requirements: ["Variable slit width and wavelength", "Fraunhofer intensity pattern visualization"],
        theory: "Lenses and physical apertures are not just optical components; they are analog computers that calculate 2D Fourier Transforms at the speed of light. When coherent light (like a laser) passes through a small aperture, the pattern it forms on a distant screen—the **Fraunhofer Diffraction** pattern—is the mathematical Fourier Transform of the aperture's shape.\n\n### The Physics of Math\n- A **Rectangular Slit** produces a **Sinc** intensity pattern (the 'duality' we see in digital filters).\n- A **Circular Aperture** produces the famous **Airy Disk** pattern, common in telescope and camera lens analysis.\n\nThis phenomenon is used in **Optical Signal Processing** to perform complex spectral analysis, pattern recognition, and image filtering instantly. For example, by placing a physical 'High-Pass' mask in the Fourier plane (the focal point of a lens), one can perform edge detection on an image without a single electronic processor. This represents the ultimate frontier of 'High-Fidelity' and 'Low-Latency' computation.",
        references: [
            { name: "Introduction to Fourier Optics - Joseph W. Goodman (McGraw-Hill)", url: "https://www.goodman-fourier-optics.com" },
            { name: "Fraunhofer Diffraction and the Fourier Transform - University of Arizona", url: "https://wp.optics.arizona.edu/visual-optics-lab/wp-content/uploads/sites/48/2016/09/L15_Fraunhofer_Diffraction.pdf" },
            { name: "Optical Fourier Transform - Wikipedia", url: "https://en.wikipedia.org/wiki/Optical_Fourier_transform" }
        ]
    },
    'filter-windowing': {
        title: 'Filter Windowing and Gibbs Phenomenon',
        description: 'Analyzing the artifacts generated by truncating infinite Fourier series.',
        requirements: ["Harmonic count control", "Comparison of Rectangular vs. Hamming windows"],
        theory: "In practice, we cannot build systems with infinite time responses, such as the ideal brick-wall filter (which requires an infinite sinc function). We must 'truncate' or stop the signal at a certain point. However, abruptly cutting a signal in the time domain is equivalent to multiplying it by a Rectangular window, which has disastrous effects in the frequency domain.\n\n### The Gibbs Phenomenon\nThis truncation causes **Gibbs Phenomenon**—a series of high-frequency oscillations ('ringing') and periodic overshoots at the points of discontinuity. This artifacts can distort audio (pre-echo) and cause spectral leakage where power 'leaks' into neighboring channels.\n\n### Window Functions to the Rescue\nTo mitigate this, we use tapered **Window Functions** like **Hamming**, **Hanning**, or **Blackman**. These windows gradually taper the signal to zero at the edges, smoothing the transition. This reduces the 'ringing' and side-lobe levels in the spectrum, though it slightly widens the 'main lobe' (reducing frequency resolution). Engineering is the art of choosing the right window to balance side-lobe rejection against spectral sharpess.",
        references: [
            { name: "Window Functions for Signal Processing - MPIfR (Heinzel et al.)", url: "https://pure.mpg.de/rest/items/item_3138851_2/component/file_3138852/content" },
            { name: "Understanding the Gibbs Phenomenon - Wolfram Demonstrations", url: "https://demonstrations.wolfram.com/TheGibbsPhenomenonInFourierSeries/" },
            { name: "On the Use of Windows for Harmonic Analysis - Fredric J. Harris (IEEE Proceedings)", url: "https://ieeexplore.ieee.org/document/1455106" }
        ]
    },
    'matched-filtering': {
        title: 'Signal Detection: Matched Filtering',
        description: 'Demonstrating the optimal filter for maximizing SNR in the presence of AWGN.',
        requirements: ["Adjustable noise level", "Cross-correlation peak visualization"],
        theory: "In the presence of Additive White Gaussian Noise (AWGN), how do we determine if a specific digital pulse was transmitted? The **Matched Filter** is the mathematically optimal linear filter that maximizes the Signal-to-Noise Ratio (SNR) at the sampling instant. It is the fundamental 'detector' in every digital receiver.\n\n### The Symmetry of Detection\nThe Matched Filter's impulse response $h(t)$ is simply a time-reversed and delayed version of the target signal $s(t)$, such that $h(t) = s(T-t)$. Physically, the filter performs a continuous **Cross-Correlation** between the noisy incoming data and a local 'template' of what the expected pulse looks like. When the template aligns perfectly with a pulse in the noise, the correlation output reaches a sharp maximum peak. By checking if this peak exceeds a certain threshold, the receiver can distinguish data from noise even when the signal is visually obscured in a time-domain plot.",
        references: [
            { name: "The Matched Filter: Mathematical Derivation - University of California, Berkeley", url: "https://inst.eecs.berkeley.edu/~ee126/fa17/matched_filter.pdf" },
            { name: "Detection, Estimation, and Modulation Theory - Harry L. Van Trees (Wiley)", url: "https://www.wiley.com/en-us/Detection%2C+Estimation%2C+and+Modulation+Theory%2C+Part+I%3A+Detection%2C+Estimation%2C+and+Linear+Modulation+Theory%2C+2nd+Edition-p-9780470638125" },
            { name: "Matched Filters in Radar and Communications - San Francisco State University", url: "https://online.sfsu.edu/mkovesdy/engr445/Matched_Filters.pdf" }
        ]
    },
    'causality-latency': {
        title: 'Causality and System Latency',
        description: 'Understanding why physical systems must follow the arrow of time.',
        requirements: ["Adjustable system delay", "Causal vs. Non-Causal toggle"],
        theory: "In physics and engineering, a system is **Causal** if its output at any time $t$ depends only on current and past inputs ($x(\tau)$ for $\tau \leq t$). A causal system cannot 'respond to the future'. While many mathematical filters (like the ideal 'brick-wall' low-pass filter) are non-causal and physically impossible to build, they serve as theoretical benchmarks.\n\n### The Cost of Realization: Latency\nTo implement a non-causal filter design in the real world, engineers must introduce **System Latency** (Group Delay). By delaying the input signal, we shift the 'future' samples into the system's 'current' processing buffer. The more precise and sharp a filter's transition band is, the more latency it typically requires. This is why high-quality digital signal processors (DSPs) in pro-audio and video streaming always introduce a perceptible delay—it's the thermodynamic price paid for mathematical precision and spectral purity.",
        references: [
            { name: "Discrete-Time Signal Processing: Causality and Stability - Oppenheim & Schafer", url: "https://www.pearson.com/en-us/subject-catalog/p/discrete-time-signal-processing/P200000003223" },
            { name: "Causality in Digital Systems - MIT OpenCourseWare", url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-003-signals-and-systems-fall-2011/lecture-notes/MIT6_003F11_lec03.pdf" },
            { name: "System Latency and Causal Filters - Stanford CCRMA", url: "https://ccrma.stanford.edu/~jos/filters/Causality.html" }
        ]
    },
    'chromatic-dispersion': {
        title: 'Chromatic Dispersion in Optical Fiber',
        description: 'Simulating pulse broadening over long-distance optical communication links.',
        requirements: ["Fiber length and dispersion coefficient sliders", "Visual smearing of wavelength components"],
        theory: "Optical fiber is the primary medium of the global internet, but it faces a fundamental physical limit known as **Chromatic Dispersion (CD)**. Dispersion causes light pulses to spread out in time as they travel, which eventually causes bits to overlap and become unreadable, a phenomenon called Inter-Symbol Interference (ISI).\n\n### The Speed of Color\nEvery laser pulse has a finite spectral width (multiple wavelengths). In a glass fiber, the refractive index is wavelength-dependent, meaning different 'colors' travel at different velocities. In standard single-mode fiber (SMF), longer wavelengths (reds) typically travel slower than shorter wavelengths (blues). After 1,000 km, a pulse that was originally picoseconds wide can be smeared across nanoseconds. Modern fiber networks combat this using **Dispersion Compensation Fibers (DCF)** or advanced Digital Signal Processing (DSP) that applies an inverse phase shift to 'un-smear' the data, enabling the Tbps speeds we enjoy today.",
        references: [
            { name: "Fiber-Optic Communication Systems: Dispersion Management - Govind P. Agrawal (Wiley)", url: "https://www.wiley.com/en-us/Fiber+Optic+Communication+Systems%2C+5th+Edition-p-9781119737384" },
            { name: "Dispersion in Single-Mode Fibers - Cisco Systems Technical Whitepaper", url: "https://www.cisco.com/c/en/us/support/docs/optical-networking/synchronous-digital-hierarchy-sdh/11621-encoding-11621.html" },
            { name: "Chromatic Dispersion Explained - RP Photonics Encyclopedia", url: "https://www.rp-photonics.com/chromatic_dispersion.html" }
        ]
    },
    'entropy-source-coding': {
        title: 'Entropy and Source Coding',
        description: 'Measuring the average information content and the limits of data compression.',
        requirements: ["Dynamic symbol probability adjustment", "Entropy ($H(X)$) calculation"],
        theory: "Information Theory starts with a deceptively simple question: How do we measure 'information'? Claude Shannon proposed **Entropy ($H$)** as a measure of the average uncertainty or 'surprise' in a data source. If a message is highly predictable (e.g., 'The sun will rise'), its entropy is zero. If it is completely random, its entropy is at a maximum.\n\n### The Fundamental Limit of Compression\nShannon's **Source Coding Theorem** establishes the hard physical limit for data compression. It states that it is impossible to compress a data source into an average number of bits per symbol less than the source's entropy without losing information. This is why files like text and code (low entropy due to grammar/rules) compress well into ZIP files, whereas encrypted data or white noise (maximum entropy) cannot be compressed at all. Modern media codecs like HEVC (video) and OPUS (audio) are sophisticated 'entropy encoders' that remove statistical redundancies to reach near-Shannon limits.",
        references: [
            { name: "A Mathematical Theory of Communication - Claude E. Shannon (Original 1948 Paper)", url: "https://archive.org/details/bstj27-3-379" },
            { name: "Elements of Information Theory - Thomas M. Cover & Joy A. Thomas (Wiley)", url: "https://www.wiley.com/en-us/Elements+of+Information+Theory%2C+2nd+Edition-p-9780471241959" },
            { name: "Entropy and Information Theory - Robert B. Ash (Dover)", url: "https://store.doverpublications.com/0486665216.html" }
        ]
    },
    'shannon-capacity': {
        title: 'Shannon Capacity Limit',
        description: 'Calculating the universal maximum bit rate for noisy channels.',
        requirements: ["Bandwidth and SNR controls", "Theoretical max throughput calculation"],
        theory: "The **Shannon-Hartley Theorem** is the most famous equation in telecommunications. It specifies the maximum rate at which information can be transmitted over a communication channel with a certain bandwidth and noise level. The formula is: $$C = B \log_2(1 + \frac{S}{N})$$\n\n### The Three Pillars of Capacity\n1. **Bandwidth ($B$)**: Higher frequency ranges allow for shorter pulses and more symbols per second.\n2. **Signal Power ($S$)**: Stronger signals are easier to distinguish from the background.\n3. **Noise Power ($N$)**: Thermal noise ($kTB$) is the ultimate enemy of speed.\n\nEverything in modern engineering—from the massive antennas of 5G base stations to the complex error correction in deep-space probes—is a battle to maximize $C$ within the constraints of $B$ and $S/N$. You can never exceed $C$ without changing the physics of the channel.",
        references: [
            { name: "The Shannon-Hartley Theorem Explained - RF Wireless World", url: "https://www.rfwireless-world.com/Terminology/Shannon-Hartley-Theorem.html" },
            { name: "Communication in the Presence of Noise - Claude Shannon (IEEE Archive)", url: "https://ieeexplore.ieee.org/document/6773024" },
            { name: "Foundations of Information Theory - Nokia Bell Labs Journals", url: "https://www.bell-labs.com/about/history/shannon-theory/" }
        ]
    },
    'orthogonality': {
        title: 'Orthogonality in Multi-user Channels',
        description: 'Visualizing how orthogonal signals eliminate inter-user interference.',
        requirements: ["Vector rotation for phase/timing offset", "Dot product/Correlation indicator"],
        theory: "In Euclidean geometry, two vectors are **Orthogonal** if their dot product is zero, meaning they meet at a $90^{\circ}$ angle. In communication theory, we extend this concept to 'Signal Space'. Two signals $s_1(t)$ and $s_2(t)$ are orthogonal over a duration $T$ if: $$\int_{0}^{T} s_1(t)s_2(t)dt = 0$$\n\n### Why it defines Multi-user Capacity\nOrthogonality is the mathematical 'magic' that allows millions of people to use their phones in the same city without their voices merging into chaotic noise. By ensuring signals are orthogonal—whether by using different frequencies (FDMA), different time slots (TDMA), or different codes (CDMA)—we ensure that the receiver can perfectly 'project' the aggregate multi-user signal onto its intended basis vector and extract only the relevant data. Any loss of orthogonality (due to timing jitter, multipath, or Doppler shifts) leads to **Inter-Channel Interference (ICI)**, which is the primary enemy of high-capacity wireless networks like 5G and Wi-Fi 6.",
        references: [
            { name: "Communication Systems Engineering - John Proakis (Pearson)", url: "https://www.pearson.com/en-us/subject-catalog/p/communication-systems-engineering/P200000003233" },
            { name: "Linear Algebra for Signal Processing - Stanford University", url: "https://web.stanford.edu/class/ee263/notes/lin-alg-sig-proc.pdf" },
            { name: "Orthogonal Signal Spaces - MIT OpenCourseWare", url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-02-digital-communication-systems-fall-2012/lecture-notes/MIT6_02F12_chap10.pdf" }
        ]
    },
    'aloha-csma': {
        title: 'Random Access: ALOHA and CSMA',
        description: 'Packet collisions and carrier sensing protocols in shared media.',
        requirements: ["Collision visualization", "Backoff timer interaction"],
        theory: "While FDMA and TDMA work well for continuous traffic, they are inefficient for 'bursty' data like internet browsing. **Random Access Protocols** allow users to transmit whenever they have data, but this comes with the risk of **Collisions**.\n\n### 1. ALOHA (The Beginning)\nDeveloped at the University of Hawaii, ALOHA is the simplest protocol: if you have a packet, send it. If you don't get an ACK, assume a collision occurred, wait a random amount of time, and try again. Pure ALOHA has a maximum theoretical usage (throughput) of only 18.4%.\n\n### 2. CSMA (Carrier Sense Multiple Access)\nCSMA improves on ALOHA with a simple rule: 'Listen before you talk'. If the channel is sensed as busy, the user waits. This is the basis for Ethernet (CSMA/CD) and Wi-Fi (CSMA/CA). Although Carrier Sensing reduces collisions, they still occur due to propagation delay ('Hidden Terminal Problem'). Understanding these probabilistic collisions is essential for designing modern high-density networks like Wi-Fi 7.",
        references: [
            { name: "ALOHA and CSMA Protocols - Kurose & Ross (Computer Networking)", url: "https://raw.githubusercontent.com/Anand-Asundi/Computer-Networking-a-top-down-approach/master/Computer%20Networking%20A%20Top-Down%20Approach%20(7th%20Edition).pdf" },
            { name: "A History of the ALOHA Network - IEEE Consumer Electronics Magazine", url: "https://ieeexplore.ieee.org/document/9254359" },
            { name: "Carrier Sense Multiple Access - Wikipedia", url: "https://en.wikipedia.org/wiki/Carrier-sense_multiple_access" }
        ]
    },
    'fhss': {
        title: 'Frequency Hopping Spread Spectrum (FHSS)',
        description: 'Demonstrating security and interference rejection through carrier hopping.',
        requirements: ["Active hopping visualization", "Spectrogram/Waterfall history"],
        theory: "**Frequency Hopping Spread Spectrum (FHSS)** is a method of transmitting radio signals by rapidly switching a carrier among many frequency channels, using a pseudorandom sequence known to both transmitter and receiver. This technology was famously co-patented by Hollywood actress **Hedy Lamarr** and composer George Antheil in 1942.\n\n### Robustness by Motion\nBy jumping frequencies up to 1,600 times per second (as in Bluetooth), FHSS becomes nearly immune to narrow-band interference (jamming). If one channel is blocked, the system only loses a tiny fraction of data before hopping to a clear channel. This is known as **Frequency Diversity**. Furthermore, because an eavesdropper doesn't know the hopping sequence, the transmission is highly resistant to interception, making it a foundation for both military radios and consumer devices like Bluetooth headphones and Wi-Fi 1.",
        references: [
            { name: "Hedy Lamarr: The Inventress of Spread Spectrum - USPTO", url: "https://www.uspto.gov/learning-and-resources/inventors-policy-and-publications/inventors-eye/hedy-lamarr-spread-spectrum" },
            { name: "Spread Spectrum Systems with Commercial Applications - Robert C. Dixon (Wiley)", url: "https://www.wiley.com/en-us/Spread+Spectrum+Systems+with+Commercial+Applications%2C+3rd+Edition-p-9780471591672" },
            { name: "Bluetooth Frequency Hopping: How it Works - Bluetooth SIG", url: "https://www.bluetooth.com/blog/exploring-bluetooth-5-2-frequency-hopping/" }
        ]
    },
    'pn-sequence': {
        title: 'Pseudo-Noise (PN) Sequence Generation',
        description: 'Building the deterministic "keys" for digital communication security.',
        requirements: ["Interactive LFSR register bits", "Tapped feedback visualization"],
        theory: "In digital communications, we need sequences that appear random but are 100% deterministic (repeatable). These are **Pseudo-Noise (PN) Sequences**. They are typically generated using **Linear Feedback Shift Registers (LFSR)**. An LFSR consists of a chain of flip-flops where the input bit is a linear function (usually XOR) of its previous states.\n\n### M-Sequences and Primitive Polynomials\nIf the feedback taps are chosen correctly according to a **Primitive Polynomial**, the LFSR will cycle through all possible $2^n - 1$ states before repeating. These are called Maximal-Length Sequences (M-Sequences). They possess extraordinary mathematical properties: they have nearly perfect auto-correlation (a single sharp peak) and a balanced number of ones and zeros. These properties are the 'secret sauce' behind spread spectrum systems like GPS, where every satellite transmits a unique PN code that allows your phone to calculate its position with centimeter precision.",
        references: [
            { name: "Linear Feedback Shift Registers: Theory and Applications - Murata", url: "https://www.murata.com/en-us/products/timingdevice/tutorial/lfsr" },
            { name: "Pseudo-Random Sequences and Arrays - F. Jessie MacWilliams & N.J.A. Sloane (IEEE)", url: "https://ieeexplore.ieee.org/document/1454556" },
            { name: "Introduction to LFSRs - Xilinx Whitepaper", url: "https://docs.xilinx.com/v/u/en-US/xapp052" }
        ]
    },
    'sinc-rect-duality': {
        title: 'Sinc and Rectangular Duality',
        description: 'The defining symmetry of Fourier analysis in communications.',
        requirements: ["Instant swapping of time/frequency domains", "Comparison of Rect vs. Sinc shapes"],
        theory: "The **Sinc function** ($ \sin(x)/x $) and the **Rectangular pulse** are dual pairs in the Fourier domain. This symmetry is one of the most aesthetic and practical aspects of signal theory. \n\n### The Shape of Bandwidth\n- If a signal is a sharp 'Rect' in **time**, it becomes a 'Sinc' in **frequency**. This explains why digital signals with fast edges splash energy into neighboring bands (Spectral Leakage).\n- If a mask is a sharp 'Rect' in **frequency** (an ideal brick-wall filter), its impulse response is a 'Sinc' in **time**. \n\nThis duality forces engineers to choose between 'Time Resolution' and 'Frequency Resolution'. Since we must strictly limit our frequency usage to prevent interference, we are forced to use pulses that look like Sinc functions (Pulse Shaping), accepting that they will be smeared out in time.",
        references: [
            { name: "The Sinc Function and the Rectangular Pulse - Wolfram MathWorld", url: "https://mathworld.wolfram.com/SincFunction.html" },
            { name: "Signals and Systems: Fourier Properties - MIT OpenCourseWare", url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-003-signals-and-systems-fall-2011/lecture-notes/MIT6_003F11_lec08.pdf" }
        ]
    },
    'pole-zero-analysis': {
        title: 'Z-Plane: Pole-Zero Analysis',
        description: 'Analyzing system stability and frequency response through complex roots.',
        requirements: ["Interactive pole/zero placement", "Real-time Magnitude/Phase plot update"],
        theory: "The behavior of any digital filter (IIR or FIR) is entirely determined by its **Transfer Function** $H(z)$. By finding the roots of the numerator (**Zeros**) and denominator (**Poles**) of this function, we can visualize the filter's performance on the **Z-plane**.\n\n### Stability and Resonance\n- **Stability**: For a causal digital system to be stable, all its poles must lie strictly *inside* the Unit Circle. A pole on the circle causes oscillation, and outside causes the system to 'blow up' (infinite growth).\n- **Frequency Response**: The frequency response of the system is found by evaluating $H(z)$ as we walk around the Unit Circle. A pole near the circle creates a 'peak' (resonance) in the frequency response, while a zero creates a 'valley' or null. This geometric intuition allows engineers to design complex equalizers and synthesizers simply by dragging poles and zeros across a complex map.",
        references: [
            { name: "Introduction to the Z-Transform and Pole-Zero Plots - Stanford CCRMA", url: "https://ccrma.stanford.edu/~jos/filters/Z_Transform_Transfer_Function.html" },
            { name: "Z-Plane Analysis of Discrete-Time Systems - University of Michigan", url: "https://vru.vnu.edu.vn/wp-content/uploads/2016/06/Discrete-Time-Signal-Processing-3rd-Edition-Oppenheim.pdf" },
            { name: "Pole-Zero Placement and Digital Filter Design - All About Circuits", url: "https://www.allaboutcircuits.com/technical-articles/understanding-poles-and-zeros-in-the-z-plane/" }
        ]
    }
};
