import { Link } from 'react-router-dom';
import { Radio } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <Radio className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" />
                        <span className="text-xl font-bold tracking-tighter">
                            <span className="text-white">DIGI</span>
                            <span className="text-orange-500">COM</span>
                        </span>
                    </Link>
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-8">
                            <Link to="/" className="text-gray-300 hover:text-orange-500 transition-colors px-3 py-2 text-sm font-medium">Home</Link>
                            <a href="#modules" className="text-gray-300 hover:text-orange-500 transition-colors px-3 py-2 text-sm font-medium">Modules</a>
                            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-orange-900/20 active:scale-95">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
