import { Layout } from "@components/helpers";
import { StockQuote, Stocks } from "@pages";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Layout className="relative max-w-7xl">
      <Routes>
        <Route path="/" element={<Stocks />} />
        <Route path="/:stockname" element={<StockQuote />} />
      </Routes>
    </Layout>
  );
}

export default App;
