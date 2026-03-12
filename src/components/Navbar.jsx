import { useState, useEffect } from "react";

export default function Navbar({ user, onLogout, navigate, path }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isHome = path === "/";
  const navBg = scrolled || !isHome ? "#fff" : "transparent";
  const navBorder = scrolled || !isHome ? "1px solid #e8ecf4" : "1px solid transparent";
  const textColor = !scrolled && isHome ? "#fff" : "#1a1a2e";
  const logoColor = !scrolled && isHome ? "#fff" : "#1a1a2e";

  const go = (p) => { navigate(p); setDropOpen(false); };

  const roleRoute = user?.role === "INSTRUCTOR" ? "/instructor/dashboard"
    : user?.role === "ADMIN" ? "/admin/courses"
    : "/my-courses";

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, background: navBg, borderBottom: navBorder, backdropFilter: scrolled || !isHome ? "blur(12px)" : "none", transition: "all 0.3s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", height: 68, display: "flex", alignItems: "center" }}>
        {/* Logo */}
        <button onClick={() => go("/")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6C63FF,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 16L10 4L16 16H4Z" fill="white" opacity="0.9" />
              <circle cx="10" cy="11" r="3" fill="#FFD166" />
            </svg>
          </div>
          <span style={{ fontSize: 19, fontWeight: 800, color: logoColor, letterSpacing: "-0.5px", transition: "color 0.3s" }}>LearnHub</span>
        </button>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 40, flex: 1 }}>
          {[["Courses", "/courses"], ["About", "/about"], ["Pricing", "/pricing"]].map(([label, href]) => (
            <button key={label} onClick={() => go(href)} className="nav-link"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: path === href ? "#6C63FF" : textColor, transition: "color 0.2s" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Auth buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!user ? (
            <>
              <button onClick={() => go("/login")} className="btn-outline"
                style={{ padding: "9px 20px", borderRadius: 9, border: `1.5px solid ${!scrolled && isHome ? "rgba(255,255,255,0.4)" : "#e2e8f0"}`, background: "transparent", color: textColor, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                Sign In
              </button>
              <button onClick={() => go("/register")} className="btn-primary"
                style={{ padding: "9px 20px", borderRadius: 9, background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(108,99,255,0.3)" }}>
                Get Started
              </button>
            </>
          ) : (
            <div style={{ position: "relative" }}>
              <button onClick={() => setDropOpen(o => !o)}
                style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: `1.5px solid ${!scrolled && isHome ? "rgba(255,255,255,0.3)" : "#e2e8f0"}`, borderRadius: 40, padding: "6px 14px 6px 6px", cursor: "pointer" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>
                  {user.name[0].toUpperCase()}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: textColor }}>{user.name}</span>
                <span style={{ color: textColor, fontSize: 11 }}>▾</span>
              </button>
              {dropOpen && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#fff", border: "1px solid #e8ecf4", borderRadius: 14, padding: "8px", minWidth: 200, boxShadow: "0 16px 40px rgba(0,0,0,0.12)", zIndex: 100 }}>
                  <div style={{ padding: "10px 14px 12px", borderBottom: "1px solid #f0f4f8", marginBottom: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{user.name}</div>
                    <div style={{ fontSize: 12, color: "#a0aec0" }}>{user.role}</div>
                  </div>
                  {[["📊 Dashboard", roleRoute], ["📚 My Courses", "/my-courses"], ["⚙️ Settings", "#"]].map(([label, href]) => (
                    <button key={label} onClick={() => go(href)}
                      style={{ display: "block", width: "100%", padding: "10px 14px", background: "none", border: "none", textAlign: "left", fontSize: 14, color: "#4a5568", cursor: "pointer", borderRadius: 8, fontWeight: 500 }}
                      onMouseEnter={e => e.target.style.background = "#f7f8fc"}
                      onMouseLeave={e => e.target.style.background = "none"}>
                      {label}
                    </button>
                  ))}
                  <div style={{ borderTop: "1px solid #f0f4f8", marginTop: 4, paddingTop: 4 }}>
                    <button onClick={() => { onLogout(); setDropOpen(false); }}
                      style={{ display: "block", width: "100%", padding: "10px 14px", background: "none", border: "none", textAlign: "left", fontSize: 14, color: "#e53e3e", cursor: "pointer", borderRadius: 8, fontWeight: 600 }}
                      onMouseEnter={e => e.target.style.background = "#fff5f5"}
                      onMouseLeave={e => e.target.style.background = "none"}>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
