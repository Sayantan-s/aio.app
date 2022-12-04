import { StockQuote, Stocks } from "@pages";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Stocks />} />
      <Route path="/:stockname" element={<StockQuote />} />
    </Routes>
  );
}

export default App;
