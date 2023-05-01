import { withLayout } from "@components/Layout";
import { Instruments } from "@pages";
import { Route, Routes } from "react-router";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Instruments />} />
        </Routes>
    );
}

export default withLayout(App);
