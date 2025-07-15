import "./App.css";
import BitcrusherExample from "./components/Bitcrusher/BitcrusherExample";
import { ThemeProvider } from "@whoisryosuke/oat-milk-design";
import MoogExample from "./components/Moog/MoogExample";

function App() {
  return (
    <ThemeProvider>
      <div>
        {/* <BitcrusherExample /> */}
        <MoogExample />
      </div>
    </ThemeProvider>
  );
}

export default App;
