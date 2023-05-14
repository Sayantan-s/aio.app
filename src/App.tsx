import { withLayout } from '@components/Layout';
import { Home } from '@pages';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default withLayout(App);
