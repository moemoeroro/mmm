import "../styles/Navbar.css";
import { Sparkles } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-area">
        <Sparkles className="logo-icon" />
        <h1>MoodToon</h1>
      </div>

      <div className="menu">
        <span>탐색</span>
        <span>추천</span>
        <span>감정캡슐</span>
      </div>
    </nav>
  );
}

export default Navbar;