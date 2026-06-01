import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Loading from "./components/Loading";

const Analytics = lazy(() => import("./pages/Analytics"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const GithubPage = lazy(() => import("./pages/GithubPage"));
const Goals = lazy(() => import("./pages/Goals"));
const Resume = lazy(() => import("./pages/Resume"));
const Tracker = lazy(() => import("./pages/Tracker"));

function ProtectedLayout() {
  const user = useSelector((state) => state.auth.user);
  return user ? <Layout /> : <Navigate to="/login" replace />;
}
export default function App() {
  const user = useSelector((state) => state.auth.user);
  return <Suspense fallback={<Loading />}><Routes>
    <Route path="/login" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
    <Route path="/register" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
    <Route element={<ProtectedLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/tracker" element={<Tracker />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/github" element={<GithubPage />} />
      <Route path="/resume" element={<Resume />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></Suspense>;
}
