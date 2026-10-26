import { AppProvider, useApp } from './state/AppContext';
import { Home } from './screens/Home';
import { Meowdoku } from './games/Meowdoku';
import { SopaDeLetras } from './games/SopaDeLetras';
import { Crucigrama } from './games/Crucigrama';
import { FraseOculta } from './games/FraseOculta';
import { Banderas } from './games/Banderas';

function Router() {
  const { screen } = useApp();

  switch (screen) {
    case 'home':
      return <Home />;
    case 'meowdoku':
      return <Meowdoku />;
    case 'sopaDeLetras':
      return <SopaDeLetras />;
    case 'crucigrama':
      return <Crucigrama />;
    case 'fraseOculta':
      return <FraseOculta />;
    case 'banderas':
      return <Banderas />;
    default:
      return <Home />;
  }
}

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
