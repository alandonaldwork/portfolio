import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameCanvas } from './GameCanvas';
import { HUD } from './HUD';
import './Game.css';

export const ScrollReflexGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAME_OVER'>('IDLE');
    const [score, setScore] = useState(0);

    const startGame = () => {
        setGameState('PLAYING');
        setScore(0);
        // Lock body scroll? 
        // Can be handled by parent or useEffect here
    };

    const endGame = (finalScore: number) => {
        setGameState('GAME_OVER');
        setScore(finalScore);
    };

    return (
        <motion.div
            className="scroll-reflex-game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <GameCanvas gameState={gameState} onGameOver={endGame} onScoreUpdate={setScore} />
            <HUD gameState={gameState} score={score} onStart={startGame} onRestart={startGame} onClose={onClose} />
        </motion.div>
    );
};
