import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./admin/login/Login";
import Dashboard from "./admin/dashboard/Dashboard";
import Doctors from "./admin/doctors/Doctors";
import Home from "./Pages/Home";
import AdminLayout from "./admin/layout/AdminLayout";
import CertainCard from "./components/CertainCard/CertainCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />

<Route path="/certaincard/:id" element={<CertainCard />} />
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;