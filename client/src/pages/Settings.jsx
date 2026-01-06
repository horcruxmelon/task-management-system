import { useState, useEffect } from "react";
import { changePassword, updateProfile } from "../api/auth";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import "../App.css";

function Settings() {
    const [user, setUser] = useState({ username: "", email: "" });
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            setToast({ message: "New passwords do not match", type: "warning" });
            return;
        }

        setLoading(true);
        try {
            await changePassword({
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });
            setToast({ message: "Password updated successfully!", type: "success" });
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            console.error(err);
            setToast({
                message: err.response?.data?.message || "Failed to update password",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setProfileLoading(true);
        try {
            const res = await updateProfile({ username: user.username });
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
            setToast({ message: "Profile updated successfully!", type: "success" });
            // Reload after short delay to update sidebar/topbar
            setTimeout(() => window.location.reload(), 1500);
        } catch (err) {
            console.error(err);
            setToast({
                message: err.response?.data?.message || "Failed to update profile",
                type: "error"
            });
            setProfileLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", paddingLeft: "300px" }}>
            <Sidebar />

            {toast && (
                <div className="toast-container">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div style={{ padding: "2rem", maxWidth: "800px" }}>

                {/* Header */}
                <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>Settings</h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ textAlign: "right" }}>
                            <p style={{ fontWeight: "600", color: "white" }}>{user.username}</p>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{user.email}</p>
                        </div>
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(45deg, #6366f1, #ec4899)" }}></div>
                    </div>
                </div>

                {/* User Profile Section */}
                <div className="glass-panel animate-slide-up" style={{ padding: "2rem", marginBottom: "2rem" }}>
                    <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem" }}>
                        Profile Information
                    </h2>
                    <form onSubmit={handleProfileUpdate}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                            <div className="input-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input type="email" value={user.email} disabled style={{ opacity: 0.7, cursor: "not-allowed" }} />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={profileLoading}
                            style={{ marginTop: "1rem", width: "auto", padding: "0.75rem 2rem" }}
                        >
                            {profileLoading ? "Saving..." : "Save Profile"}
                        </button>
                    </form>
                </div>

                {/* Change Password Section */}
                <div className="glass-panel animate-slide-up" style={{ padding: "2rem", animationDelay: "0.1s" }}>
                    <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem" }}>
                        Change Password
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Current Password</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwords.currentPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                            <div className="input-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwords.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwords.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                            style={{ marginTop: "1rem", width: "auto", padding: "0.75rem 2rem" }}
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Settings;
