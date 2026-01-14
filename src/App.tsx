import React from 'react';
import { Portfolio } from './pages/Portfolio';
import { ScrollReflexGame } from './components/ScrollReflexGame';
import { AnimatePresence } from 'framer-motion';
import { GameProvider, useGame } from './context/GameContext';
import "./app.css";

const AppContent = () => {
  const { state, closeGame } = useGame();

  return (
    <>
      <Portfolio />
      <AnimatePresence>
        {state.isGameOpen && <ScrollReflexGame onClose={closeGame} />}
      </AnimatePresence>
    </>
  );
};

export function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}