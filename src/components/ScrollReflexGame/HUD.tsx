import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface HUDProps {
    gameState: 'IDLE' | 'PLAYING' | 'GAME_OVER';
    score: number;
    onStart: () => void;
    onRestart: () => void;
    onClose: () => void;
}

export const HUD: React.FC<HUDProps> = ({ gameState, score, onStart, onRestart, onClose }) => {
    return (
        <div className="hud-overlay">
            <div className="flex justify-between items-start w-full">
                <div className="score-display">
                    {gameState !== 'IDLE' && <span>TIME: {score.toFixed(2)}s</span>}
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors pointer-events-auto">
                    <X size={32} color="white" />
                </button>
            </div>

            {gameState === 'IDLE' && (
                <div className="start-screen">
                    <h1 className="text-6xl font-bold mb-4 font-syne">SCROLL REFLEX</h1>
                    <p className="text-xl mb-8 opacity-80">Use SCROLL to control the orb. Avoid obstacles.</p>
                    <button
                        onClick={onStart}
                        className="px-8 py-3 bg-accent-primary text-white text-xl font-bold rounded-lg hover:scale-105 transition-transform"
                    >
                        START GAME
                    </button>
                </div>
            )}

            {gameState === 'GAME_OVER' && (
                <div className="game-over-screen">
                    <h2 className="text-5xl font-bold mb-2 text-red-500">GAME OVER</h2>
                    <p className="text-2xl mb-8">You survived: {score.toFixed(2)}s</p>
                    <button
                        onClick={onRestart}
                        className="px-8 py-3 bg-white text-black text-xl font-bold rounded-lg hover:scale-105 transition-transform"
                    >
                        TRY AGAIN
                    </button>
                </div>
            )}
        </div>
    );
};
