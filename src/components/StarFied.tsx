import React, { useEffect, useRef } from "react";

const starCount = 100;

const Starfield: React.FC<{ NUM_STARS?: number }> = ({ NUM_STARS = starCount }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const stars = containerRef.current?.querySelectorAll(".star");
        if (!stars) return;

        stars.forEach((star) => {
            const animateStar = () => {
                if (!containerRef.current) return;

                // Random position inside container bounds
                const maxX = containerRef.current.clientWidth;
                const maxY = containerRef.current.clientHeight;

                // Animate star to random new position with random duration
                const newX = Math.random() * maxX;
                const newY = Math.random() * maxY;
                const duration = 3 + Math.random() * 4; // 3-7 seconds

                (star as HTMLElement).animate(
                    [
                        { transform: (star as HTMLElement).style.transform || `translate(0px, 0px)` },
                        { transform: `translate(${newX}px, ${newY}px)` },
                    ],
                    {
                        duration: duration * 1000,
                        fill: "forwards",
                        easing: "ease-in-out",
                    }
                ).onfinish = animateStar;
            };

            animateStar();
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className="starfield absolute inset-0 pointer-events-none z-0"
            style={{ overflow: "hidden" }}
        >
            {Array.from({ length: NUM_STARS }).map((_, i) => (
                <div
                    key={i}
                    className="star"
                    style={{
                        position: "absolute",
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: "3px",
                        height: "3px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.9)",
                        filter: "drop-shadow(0 0 6px white)",
                        opacity: 0.8,
                        transform: "translate(0, 0)",
                    }}
                />
            ))}
        </div>
    );
};

export default Starfield;
