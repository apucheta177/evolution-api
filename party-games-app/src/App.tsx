import { useEffect } from 'react';
import { GameProvider, useGame } from './state/GameContext';
import { initAds, maybeShowInterstitial } from './ads/AdManager';
import { Home } from './screens/Home';
import { Menu } from './screens/Menu';
import { Impostor } from './games/Impostor';
import { LaFrente } from './games/LaFrente';
import { MasProbable } from './games/MasProbable';
import { VerdadOReto } from './games/VerdadOReto';
import { RondaTragos } from './games/RondaTragos';
import { TriviaExpres } from './games/TriviaExpres';
import { Mimica } from './games/Mimica';
import { NuncaNunca } from './games/NuncaNunca';
import { Encadenados } from './games/Encadenados';
import { EncuestaSecreta } from './games/EncuestaSecreta';
import { DibujarYAdivinar } from './games/DibujarYAdivinar';
import { RankingDelGrupo } from './games/RankingDelGrupo';

function Router() {
  const { screen, isPremium } = useGame();

  // Un solo interstitial al abrir la app (nunca más de uno por sesión acá).
  useEffect(() => {
    initAds().then(() => maybeShowInterstitial(isPremium));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (screen) {
    case 'home':
      return <Home />;
    case 'menu':
      return <Menu />;
    case 'impostor':
      return <Impostor />;
    case 'frente':
      return <LaFrente />;
    case 'masProbable':
      return <MasProbable />;
    case 'verdadOReto':
      return <VerdadOReto />;
    case 'rondaTragos':
      return <RondaTragos />;
    case 'trivia':
      return <TriviaExpres />;
    case 'mimica':
      return <Mimica />;
    case 'nuncaNunca':
      return <NuncaNunca />;
    case 'encadenados':
      return <Encadenados />;
    case 'encuestaSecreta':
      return <EncuestaSecreta />;
    case 'dibujar':
      return <DibujarYAdivinar />;
    case 'ranking':
      return <RankingDelGrupo />;
    default:
      return <Home />;
  }
}

function App() {
  return (
    <GameProvider>
      <Router />
    </GameProvider>
  );
}

export default App;
