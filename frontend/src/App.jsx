import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LandingPage from "./pages/LandingPage";
import GiveKudosPage from "./pages/GiveKudosPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={WelcomePage} />} />
        <Route path="*" element={<Navigate to={"/"} replace />} />
        <Route
          path="/landing"
          element={<ProtectedRoute Component={LandingPage} />}
        />
        <Route
          path="/give-kudos"
          element={<ProtectedRoute Component={GiveKudosPage} />}
        />
        <Route
          path="/analytics"
          element={<ProtectedRoute Component={AnalyticsPage} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
