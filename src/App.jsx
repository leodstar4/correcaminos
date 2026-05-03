import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import DashboardProductor from "./pages/DashboardProductor";
import DashboardComprador from "./pages/DashboardComprador";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/productor" element={<DashboardProductor />} />
        <Route path="/comprador" element={<DashboardComprador />} />
      </Routes>
    </BrowserRouter>
  );
}
