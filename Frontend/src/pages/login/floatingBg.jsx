import { memo } from "react";
import "./login.css";
const FloatingBackground = memo(() => {
  return (
    <section>
      <div className="floating-bg"></div>
    </section>
  );
});

export default FloatingBackground;
