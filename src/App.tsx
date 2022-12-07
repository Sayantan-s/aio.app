import { Layout } from "@components/helpers";
import { Instruments, Quotes } from "@pages";
import { Route, Routes } from "react-router";

const gradient = `radial-gradient(at 88% 11%, rgba(129, 40, 197, 0.108) 0, transparent 100%), radial-gradient(at 28% 28%, rgba(38, 82, 226, 0.153) 0, transparent 69%), radial-gradient(at 50% 57%, rgba(157, 23, 77, 0.16) 0, transparent 100%)`;

function App() {
  return (
    <Layout
      className="relative w-full dark:bg-slate-900 bg-white"
      style={{ backgroundImage: gradient }}
    >
      <Routes>
        <Route path="/" element={<Instruments />} />
        <Route path="/:instrument" element={<Quotes />} />
      </Routes>
    </Layout>
  );
}

export default App;
