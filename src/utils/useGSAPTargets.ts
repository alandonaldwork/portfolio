import { useMemo } from "react";

export function useGSAPTargets(ref: React.RefObject<HTMLElement>) {
    return useMemo(() => {
        if (!ref.current) return [] as HTMLElement[];
        return Array.from(ref.current.children) as HTMLElement[];
    }, [ref.current]);
}
