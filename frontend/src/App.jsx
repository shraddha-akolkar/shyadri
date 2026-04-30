import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./admin/login/Login";
import Dashboard from "./admin/dashboard/Dashboard";
import Doctors from "./admin/doctors/Doctors";
import DoctorAdd from "./admin/DoctorAdd";      
import Home from "./Pages/Home";
import AdminLayout from "./admin/layout/AdminLayout";
import CertainCard from "./components/CertainCard/CertainCard";

function ProtectedAdminRoute() {
  const admin = localStorage.getItem("admin");
  return admin ? <Outlet /> : <Navigate to="/admin" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/certaincard/:id" element={<CertainCard />} />

        <Route element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard"          element={<Dashboard />} />
            <Route path="/doctors"            element={<Doctors />} />      
            <Route path="/doctor/add"         element={<DoctorAdd />} />    
            <Route path="/doctor/edit/:id"    element={<DoctorAdd />} />    
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;