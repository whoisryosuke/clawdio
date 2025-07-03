import "./App.css";
import BitcrusherExample from "./components/Bitcrusher/BitcrusherExample";
import { ThemeProvider } from "@whoisryosuke/oat-milk-design";

function App() {
  return (
    <ThemeProvider>
      <div>
        <BitcrusherExample />
      </div>
    </ThemeProvider>
  );
}

export default App;
