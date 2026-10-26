import { AppProvider, useApp } from './state/AppContext';
import { Home } from './screens/Home';
import { Meowdoku } from './games/Meowdoku';
import { Criptograma } from './games/Criptograma';
import { SopaDeLetras } from './games/SopaDeLetras';
import { Crucigrama } from './games/Crucigrama';
import { FraseOculta } from './games/FraseOculta';

function Router() {
  const { screen } = useApp();

  switch (screen) {
    case 'home':
      return <Home />;
    case 'meowdoku':
      return <Meowdoku />;
    case 'criptograma':
      return <Criptograma />;
    case 'sopaDeLetras':
      return <SopaDeLetras />;
    case 'crucigrama':
      return <Crucigrama />;
    case 'fraseOculta':
      return <FraseOculta />;
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
