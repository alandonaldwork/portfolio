import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface PlayerProps {
    y: MotionValue<number>;
}

const Player: React.FC<PlayerProps> = ({ y }) => {
    // Map numerical 0-100 input to 0%-100% string for CSS top
    const top = useTransform(y, (v) => `${v}%`);

    return (
        <motion.div
            className="player-orb"
            style={{
                top,
                left: '10%',
                width: '60px',
                height: '40px',
                // Center the transform origin for rotation if we add it later
                transformOrigin: 'center center'
            }}
        >
            <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 10px #00f0ff)' }}>
                {/* Engine Flame */}
                <path d="M10 30 L0 25 L0 35 Z" fill="#ff0055">
                    <animate attributeName="d" values="M10 30 L0 25 L0 35 Z; M10 30 L-5 22 L-5 38 Z; M10 30 L0 25 L0 35 Z" dur="0.2s" repeatCount="indefinite" />
                </path>
                {/* Main Body */}
                <path d="M10 20 L40 10 L80 25 L100 30 L80 35 L40 50 L10 40 Z" fill="#1a1a1a" stroke="#00f0ff" strokeWidth="2" />
                {/* Cockpit */}
                <path d="M50 15 L70 20 L75 30 L50 25 Z" fill="#00f0ff" fillOpacity="0.5" />
                {/* Wing Details */}
                <path d="M20 20 L5 5 L30 15" fill="#1a1a1a" stroke="#00f0ff" strokeWidth="1" />
                <path d="M20 40 L5 55 L30 45" fill="#1a1a1a" stroke="#00f0ff" strokeWidth="1" />
            </svg>
        </motion.div>
    );
};

export default Player;
