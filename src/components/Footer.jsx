import { Radio } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <Radio className="w-5 h-5 text-orange-600" />
                        <span className="text-lg font-bold tracking-tighter">
                            <span className="text-white">DIGI</span>
                            <span className="text-orange-500">COM</span>
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Digital Communication Suite. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Documentation</a>
                        <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
