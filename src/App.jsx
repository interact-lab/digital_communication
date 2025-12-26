import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ModulePage from './pages/ModulePage';
import TheoryPage from './pages/TheoryPage';
import Sidebar from './components/Sidebar';
import { useState } from 'react';

function App() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="bg-black min-h-screen text-white selection:bg-orange-500/30 flex">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div className={`flex-1 ${isCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[280px]'}`}>
                <Navbar />
                <main className="min-h-screen">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/module/:moduleId" element={<ModulePage />} />
                        <Route path="/theory/:topicId" element={<TheoryPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
