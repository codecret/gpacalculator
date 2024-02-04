import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LearnMore from "./pages/LearnMore";
import ReactGA from "react-ga4";
import ErrorPage from "./pages/ErrorPage";

ReactGA.initialize("G-VQV1X10QKE");

function App() {
  return (
    <Routes>
      <Route path="/gpacalculator" element={<HomePage />} />
      <Route path="/gpacalculator/learnMore" element={<LearnMore />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
