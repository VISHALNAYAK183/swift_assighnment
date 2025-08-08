import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Comments from "./pages/Comments";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Comments />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
