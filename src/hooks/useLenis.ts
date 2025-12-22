import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export const useLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1, // smoothness amount
            easing: t => t, // custom ease-out
            lerp: 0.05, // low = smoother
            wheelMultiplier: 2,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);
};
