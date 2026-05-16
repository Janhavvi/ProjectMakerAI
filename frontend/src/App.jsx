import { Routes, Route } from 'react-router-dom';
import PageTransition from './components/common/PageTransition';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import GeneratorPage from './pages/GeneratorPage';
import PricingPage from './pages/PricingPage';
import TemplatesPage from './pages/TemplatesPage';
import AIProjectGeneratorPage from './pages/AIProjectGeneratorPage';
import ProjectAnalyzerPage from './pages/ProjectAnalyzerPage';
import ProjectEditorPage from './pages/ProjectEditorPage';
import SavedProjectsPage from './pages/SavedProjectsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <PageTransition>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/generate" element={<ProtectedRoute><GeneratorPage /></ProtectedRoute>} />
      <Route path="/pricing" element={<ProtectedRoute><PricingPage /></ProtectedRoute>} />
      <Route path="/templates" element={<ProtectedRoute><TemplatesPage /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><DashboardPage initialView="projects" /></ProtectedRoute>} />
      <Route path="/saved-projects" element={<ProtectedRoute><SavedProjectsPage /></ProtectedRoute>} />
      <Route path="/favorites" element={<ProtectedRoute><SavedProjectsPage favoritesOnly /></ProtectedRoute>} />
      <Route path="/ai-project-generator" element={<ProtectedRoute><AIProjectGeneratorPage /></ProtectedRoute>} />
      <Route path="/project-analyzer" element={<ProtectedRoute><ProjectAnalyzerPage /></ProtectedRoute>} />
      <Route path="/projects/:id/editor" element={<ProtectedRoute><ProjectEditorPage /></ProtectedRoute>} />
      <Route path="/projects/:id/preview" element={<ProtectedRoute><ProjectEditorPage previewOnly /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><DashboardPage initialView="analytics" /></ProtectedRoute>} />
      <Route path="/billing" element={<ProtectedRoute><DashboardPage initialView="billing" /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><DashboardPage initialView="chat" /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </PageTransition>
  );
}

export default App;
