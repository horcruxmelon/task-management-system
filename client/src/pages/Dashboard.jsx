import { useEffect, useState } from "react";
import { getDashboard } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../App.css";

function Dashboard() {
  const [message, setMessage] = useState("Initializing System...");
  const [user, setUser] = useState({ username: "User" });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    getDashboard()
      .then((res) => setMessage(res.data.message))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div style={{ minHeight: "100vh", position: "relative", paddingLeft: "340px", paddingRight: "2rem" }}>
      <Sidebar />

      {/* Top Bar */}
      <div style={{
        padding: "2rem 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 className="animate-fade-in" style={{ fontSize: "2rem", fontWeight: "700" }}>
            Dashboard
          </h1>
          <p className="animate-fade-in" style={{ color: "var(--text-muted)", animationDelay: "0.1s" }}>
            Welcome back, Agent {user.username}
          </p>
        </div>

        <div className="glass-panel animate-fade-in" style={{
          padding: "0.5rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          animationDelay: "0.2s",
          borderRadius: "100px" // Pill shape
        }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontWeight: "600", fontSize: "0.9rem" }}>{user.username}</p>
            <div style={{ fontSize: "0.75rem", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.25rem" }}>
              <span className="pulse-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }}></span>
              Online
            </div>
          </div>
          <div className="glow-box" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #ec4899)" }}></div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "auto auto",
        gap: "2rem",
        paddingBottom: "2rem"
      }}>

        {/* Welcome Section - Spans full width */}
        <div className="glass-panel animate-slide-up" style={{
          gridColumn: "span 12",
          padding: "3rem",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.05))",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <h2 className="neon-text" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>System Active</h2>
            <p style={{ fontSize: "1.2rem", color: "var(--text-light)", maxWidth: "600px" }}>
              {message}
            </p>
          </div>
          <div style={{ fontSize: "4rem", opacity: 0.8, filter: "drop-shadow(0 0 20px rgba(99, 102, 241, 0.4))" }}>
            🚀
          </div>
        </div>

        {/* Stats Section - 3 Cards */}
        <div className="glass-panel animate-slide-up" style={{
          gridColumn: "span 4",
          padding: "2rem",
          animationDelay: "0.1s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "200px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: "600", letterSpacing: "1px" }}>TOTAL TASKS</p>
              <h3 style={{ fontSize: "2.5rem", fontWeight: "700", marginTop: "0.5rem" }}>12</h3>
            </div>
            <span style={{ padding: "10px", background: "rgba(99, 102, 241, 0.1)", borderRadius: "12px", fontSize: "1.5rem" }}>📊</span>
          </div>
          <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: "70%", height: "100%", background: "var(--primary)", boxShadow: "0 0 10px var(--primary)" }}></div>
          </div>
        </div>

        <div className="glass-panel animate-slide-up" style={{
          gridColumn: "span 4",
          padding: "2rem",
          animationDelay: "0.2s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "200px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: "600", letterSpacing: "1px" }}>PENDING</p>
              <h3 style={{ fontSize: "2.5rem", fontWeight: "700", marginTop: "0.5rem" }}>4</h3>
            </div>
            <span style={{ padding: "10px", background: "rgba(245, 158, 11, 0.1)", borderRadius: "12px", fontSize: "1.5rem" }}>⏳</span>
          </div>
          <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: "40%", height: "100%", background: "#f59e0b", boxShadow: "0 0 10px #f59e0b" }}></div>
          </div>
        </div>

        <div className="glass-panel animate-slide-up" style={{
          gridColumn: "span 4",
          padding: "2rem",
          animationDelay: "0.3s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "200px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: "600", letterSpacing: "1px" }}>COMPLETED</p>
              <h3 style={{ fontSize: "2.5rem", fontWeight: "700", marginTop: "0.5rem" }}>8</h3>
            </div>
            <span style={{ padding: "10px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "12px", fontSize: "1.5rem" }}>✅</span>
          </div>
          <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: "85%", height: "100%", background: "#10b981", boxShadow: "0 0 10px #10b981" }}></div>
          </div>
        </div>

        {/* Recent Activity / Quick Actions - Split */}
        <div className="glass-panel animate-slide-up" style={{
          gridColumn: "span 8",
          padding: "2rem",
          animationDelay: "0.4s",
          minHeight: "300px"
        }}>
          <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--accent)" }}>⚡</span> Recent Activity
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                background: "rgba(255,255,255,0.02)",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.05)"
              }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: i === 1 ? "#10b981" : "#6366f1" }}></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: "500" }}>Task "Update Documentation" {i === 1 ? "completed" : "updated"}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Just now</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel animate-slide-up" style={{
          gridColumn: "span 4",
          padding: "2rem",
          animationDelay: "0.5s",
          background: "linear-gradient(180deg, rgba(99, 102, 241, 0.05), transparent)"
        }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Quick Actions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <button className="btn-primary" onClick={() => navigate("/tasks")}>
              + Create New Task
            </button>
            <button style={{
              width: "100%",
              padding: "1rem",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-glass)",
              borderRadius: "16px",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
              onMouseOver={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
              onMouseOut={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"}
            >
              View Reports
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
