import React, { createContext, useState, useCallback } from 'react';
import PlantingAnimationOverlay from '../components/PlantingAnimationOverlay';

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const triggerPlantAnimation = useCallback(() => {
        setIsAnimating(true);
    }, []);

    return (
        <AnimationContext.Provider value={{ triggerPlantAnimation }}>
            {children}
            {isAnimating && <PlantingAnimationOverlay onAnimationComplete={() => setIsAnimating(false)} />}
        </AnimationContext.Provider>
    );
};