import EulersHelix from './EulersHelix';
import SamplingAliasing from './SamplingAliasing';
import Convolution from './Convolution';
import PoleZeroAnalysis from './PoleZeroAnalysis';
import PCMPipeline from './PCMPipeline';
import ConstellationDiagram from './ConstellationDiagram';
import DFTvsFFT from './DFTvsFFT';
import MultipleAccess from './MultipleAccess';
import OFDMSimulation from './OFDM';
import DSSSSimulation from './DSSS';
import SpatialFrequency from './SpatialFrequency';
import ChannelCoding from './ChannelCoding';
import PulseShaping from './PulseShaping';
import LineCoding from './LineCoding';
import TimeFrequencyDuality from './TimeFrequencyDuality';
import OpticalFourier from './OpticalFourier';
import FilterWindowing from './FilterWindowing';
import MatchedFiltering from './MatchedFiltering';
import CausalityLatency from './CausalityLatency';
import ChromaticDispersion from './ChromaticDispersion';
import EntropySourceCoding from './EntropySourceCoding';
import ShannonCapacity from './ShannonCapacity';
import Orthogonality from './Orthogonality';
import FHSSSimulation from './FHSS';
import PNSequence from './PNSequence';
import SincRectDuality from './SincRectDuality';
import AlohaCSMA from './AlohaCSMA';

export const simulations = {
    'complex-vector': EulersHelix,
    'sampling-theorem': SamplingAliasing,
    'convolution': Convolution,
    'pole-zero-analysis': PoleZeroAnalysis,
    'pcm-pipeline': PCMPipeline,
    'phase-space': ConstellationDiagram,
    'dft-vs-fft': DFTvsFFT,
    'fdma-tdma-cdma': MultipleAccess,
    'ofdm': OFDMSimulation,
    'dsss': DSSSSimulation,
    'spatial-frequency': SpatialFrequency,
    'channel-coding': ChannelCoding,
    'pulse-shaping': PulseShaping,
    'line-coding': LineCoding,
    'time-frequency-duality': TimeFrequencyDuality,
    'optical-fourier': OpticalFourier,
    'filter-windowing': FilterWindowing,
    'matched-filtering': MatchedFiltering,
    'causality-latency': CausalityLatency,
    'chromatic-dispersion': ChromaticDispersion,
    'entropy-source-coding': EntropySourceCoding,
    'shannon-capacity': ShannonCapacity,
    'orthogonality': Orthogonality,
    'fhss': FHSSSimulation,
    'pn-sequence': PNSequence,
    'sinc-rect-duality': SincRectDuality,
    'aloha-csma': AlohaCSMA,
};
