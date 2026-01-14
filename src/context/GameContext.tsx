import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// State Definition
interface GameState {
    isGameOpen: boolean;
}

// Initial State
const initialState: GameState = {
    isGameOpen: false,
};

// Actions
type GameAction =
    | { type: 'OPEN_GAME' }
    | { type: 'CLOSE_GAME' }
    | { type: 'TOGGLE_GAME' };

// Reducer
const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'OPEN_GAME':
            return { ...state, isGameOpen: true };
        case 'CLOSE_GAME':
            return { ...state, isGameOpen: false };
        case 'TOGGLE_GAME':
            return { ...state, isGameOpen: !state.isGameOpen };
        default:
            return state;
    }
};

// Context Definition
interface GameContextType {
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
    openGame: () => void;
    closeGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider Component
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const openGame = () => dispatch({ type: 'OPEN_GAME' });
    const closeGame = () => dispatch({ type: 'CLOSE_GAME' });

    return (
        <GameContext.Provider value={{ state, dispatch, openGame, closeGame }}>
            {children}
        </GameContext.Provider>
    );
};

// Custom Hook
export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
