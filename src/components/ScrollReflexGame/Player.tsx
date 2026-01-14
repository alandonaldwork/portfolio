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
            style={{ top, left: '10%' }}
        />
    );
};

export default Player;
