import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ToastNotificationSystem from "./components/ToastNotificationSystem";
import ProtectedRoute from "./components/ProtectedRoute";

const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const DashboardProductor = lazy(() => import("./pages/DashboardProductor"));
const DashboardComprador = lazy(() => import("./pages/DashboardComprador"));
const ProductorProfile = lazy(() => import("./pages/ProductorProfile"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-green-primary/20"/>
          <div className="absolute inset-0 rounded-full border-2 border-green-primary border-t-transparent animate-spin"/>
        </div>
        <span className="font-body text-earth-tan text-sm tracking-wide">Cargando...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productor" element={
            <ProtectedRoute requiredRole="productor"><DashboardProductor /></ProtectedRoute>
          } />
          <Route path="/comprador" element={
            <ProtectedRoute requiredRole="comprador"><DashboardComprador /></ProtectedRoute>
          } />
          <Route path="/productor-profile/:id" element={<ProductorProfile />} />
        </Routes>
      </Suspense>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 5000,
          style: { fontFamily: "'Inter', sans-serif", borderRadius: '16px', padding: 0, background: 'transparent', boxShadow: 'none' },
        }}
      />
      <ToastNotificationSystem />
    </BrowserRouter>
  );
}
