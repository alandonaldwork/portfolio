import React, { useEffect, useRef } from 'react';
import Player from './Player';
import { usePlayerPhysics } from './hooks/usePlayerPhysics';
import { useObstacleSystem } from './hooks/useObstacleSystem';
import { useGameLoop } from './hooks/useGameLoop';

interface GameCanvasProps {
    gameState: 'IDLE' | 'PLAYING' | 'GAME_OVER';
    onGameOver: (score: number) => void;
    onScoreUpdate: (score: number) => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ gameState, onGameOver, onScoreUpdate }) => {
    const { y: playerY, rawY } = usePlayerPhysics(gameState);
    const { containerRef, obstaclesRef, updateObstacles, resetObstacles } = useObstacleSystem(gameState);

    // Score ref for internal tracking relative to deltaTime
    const scoreRef = useRef(0);

    // Reset on start via Effect
    useEffect(() => {
        if (gameState === 'PLAYING') {
            scoreRef.current = 0;
            resetObstacles();
        }
    }, [gameState, resetObstacles]);

    // Single Game Loop
    useGameLoop(gameState, (deltaTime) => {
        if (gameState !== 'PLAYING') return;

        // 1. Update Score
        // deltaTime is in ms. Score is seconds.
        scoreRef.current += deltaTime / 1000;
        onScoreUpdate(scoreRef.current);

        // 2. Update Obstacles
        updateObstacles(deltaTime);

        // 3. Collision Detection

        // Player Position (approximate)
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        // Player is at 10% from left
        const playerX = winW * 0.1;
        const playerYPx = (rawY.current / 100) * winH;
        const playerRadius = 20; // 40px width/height

        // Iterate active OBSTACLES
        obstaclesRef.current.forEach(obs => {
            if (!obs.active) return;

            // Obstacle Position
            // Hook sets `left: ${obs.x}vw`. 
            // So pixel x = (obs.x / 100) * winW
            // obs.y is %. Pixel y = (obs.y / 100) * winH

            // Check if obstacle is roughly near player horizontally to save checks
            // Player is at 0.1 * Width. Obs moves from Right (1.0) to Left (<0).
            // Check if obs.x is between e.g. 5% and 15% (in vw)
            if (obs.x > 5 && obs.x < 15) {
                // Potential Hit

                const obsX = (obs.x / 100) * winW;
                const obsY = (obs.y / 100) * winH;
                const obsW = obs.width;
                const obsH = obs.height;

                // Circle vs Rect Collision
                // Find closest point on Rect to Circle Center
                const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(val, max));

                const closestX = clamp(playerX, obsX, obsX + obsW);
                const closestY = clamp(playerYPx, obsY, obsY + obsH);

                const distanceX = playerX - closestX;
                const distanceY = playerYPx - closestY;

                const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);

                if (distanceSquared < (playerRadius * playerRadius)) {
                    // Collision!
                    onGameOver(scoreRef.current);
                }
            }
        });
    });

    return (
        <div className="game-canvas">
            <Player y={playerY} />
            <div ref={containerRef} className="obstacles-layer absolute inset-0 pointer-events-none" />
        </div>
    );
};
