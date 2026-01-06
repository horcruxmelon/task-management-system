import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const menuItems = [
        { label: "Dashboard", path: "/dashboard", icon: "📊" },
        { label: "Tasks", path: "/tasks", icon: "📋" },
        { label: "Settings", path: "/settings", icon: "⚙️" },
    ];

    return (
        <div className="glass-panel" style={{
            width: "280px",
            height: "calc(100vh - 4rem)",
            margin: "2rem",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            left: 0,
            top: 0
        }}>
            <div style={{ marginBottom: "3rem" }}>
                <h2 className="text-gradient" style={{
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    marginBottom: "0.5rem"
                }}>
                    Task Flow
                </h2>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    Digital Garden
                </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                padding: "1rem",
                                borderRadius: "var(--radius-md)",
                                textDecoration: "none",
                                color: isActive ? "var(--primary)" : "var(--text-muted)",
                                background: isActive ? "rgba(101, 163, 13, 0.1)" : "transparent",
                                fontWeight: isActive ? "600" : "500",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                            }}
                        >
                            <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                            <span style={{ letterSpacing: "0.2px" }}>{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            <button
                onClick={handleLogout}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    borderRadius: "var(--radius-md)",
                    color: "var(--danger)",
                    background: "transparent",
                    border: "1px solid transparent",
                    cursor: "pointer",
                    width: "100%",
                    marginTop: "auto",
                    transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(220, 38, 38, 0.05)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                }}
            >
                <span>🚪</span>
                <span style={{ fontWeight: "600" }}>Logout</span>
            </button>
        </div>
    );
}

export default Sidebar;
