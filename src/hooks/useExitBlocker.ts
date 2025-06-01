import { useCallback, useEffect } from 'react';
import { Blocker, useBlocker } from 'react-router';

export function useExitBlocker(
    isDirty: boolean,
    canExit: boolean,
    openExit: () => void,
    closeExit: () => void,
): {
    blocker: Blocker;
    handleExit: () => void;
} {
    const shouldBlock = useCallback(() => !canExit && isDirty, [canExit, isDirty]);
    const blocker = useBlocker(shouldBlock);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            if (canExit) {
                blocker.proceed?.();
            } else {
                openExit();
            }
        }
    }, [blocker.state, openExit, canExit, blocker]);

    const handleExit = () => {
        closeExit();
        blocker.proceed?.();
    };

    return { blocker, handleExit };
}
