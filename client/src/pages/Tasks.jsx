import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import { getAllTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import "../App.css";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ username: "User" });
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [toast, setToast] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "pending",
        dueDate: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await getAllTasks();
            setTasks(res.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                setToast({ message: "Failed to load tasks", type: "error" });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTask) {
                await updateTask(editingTask._id, formData);
                setToast({ message: "Task updated successfully!", type: "success" });
            } else {
                await createTask(formData);
                setToast({ message: "Task created successfully!", type: "success" });
            }
            setShowModal(false);
            setEditingTask(null);
            setFormData({ title: "", description: "", status: "pending", dueDate: "" });
            fetchTasks();
        } catch (error) {
            console.error("Error saving task:", error);
            setToast({
                message: error.response?.data?.message || "Failed to save task",
                type: "error"
            });
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setFormData({
            title: task.title,
            description: task.description || "",
            status: task.status,
            dueDate: task.dueDate ? task.dueDate.split("T")[0] : ""
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await deleteTask(id);
                setToast({ message: "Task deleted successfully!", type: "success" });
                fetchTasks();
            } catch (error) {
                console.error("Error deleting task:", error);
                setToast({ message: "Failed to delete task", type: "error" });
            }
        }
    };

    const handleStatusChange = async (task, newStatus) => {
        try {
            await updateTask(task._id, { ...task, status: newStatus });
            fetchTasks();
        } catch (error) {
            console.error("Error updating status:", error);
            setToast({ message: "Failed to update status", type: "error" });
        }
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case "completed": return { color: "#10b981", bg: "rgba(16, 185, 129, 0.1)", label: "Completed" };
            case "in-progress": return { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)", label: "In Progress" };
            default: return { color: "#6366f1", bg: "rgba(99, 102, 241, 0.1)", label: "Pending" };
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    return (
        <div style={{ minHeight: "100vh", position: "relative", paddingLeft: "340px", paddingRight: "2rem" }}>
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

            {/* Top Bar */}
            <div style={{
                padding: "2rem 0",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
            }}>
                <div className="glass-panel animate-fade-in" style={{
                    padding: "0.5rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    borderRadius: "100px"
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


            {/* Content Container */}
            <div style={{ paddingBottom: "2rem", maxWidth: "1600px", margin: "0 auto" }}>

                {/* Header Section */}
                <div className="glass-panel animate-slide-up" style={{
                    padding: "2rem",
                    marginBottom: "2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "linear-gradient(90deg, rgba(99, 102, 241, 0.1), transparent)"
                }}>
                    <div>
                        <h1 className="neon-text" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Task Board</h1>
                        <p style={{ color: "var(--text-muted)" }}>
                            Manage and track your assignments. {tasks.length} total active.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingTask(null);
                            setFormData({ title: "", description: "", status: "pending", dueDate: "" });
                            setShowModal(true);
                        }}
                        className="btn-primary"
                        style={{ width: "auto", padding: "0.85rem 2rem", fontSize: "1.1rem" }}
                    >
                        + Create New Task
                    </button>
                </div>

                {/* Tasks Grid */}
                {loading ? (
                    <div className="glass-panel" style={{ padding: "4rem", textAlign: "center" }}>
                        <div style={{ fontSize: "3rem", animation: "spin 2s linear infinite", display: "inline-block" }}>💫</div>
                        <p style={{ marginTop: "1rem", color: "var(--text-muted)" }}>Initializing data streams...</p>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="glass-panel animate-slide-up" style={{ padding: "4rem", textAlign: "center" }}>
                        <p style={{ fontSize: "4rem", marginBottom: "1rem", filter: "drop-shadow(0 0 20px rgba(255,255,255,0.2))" }}>📝</p>
                        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>No Tasks Found</h2>
                        <p style={{ color: "var(--text-muted)" }}>Your dashboard is clean. Create a task to get started.</p>
                    </div>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                        gap: "1.5rem"
                    }}>
                        {tasks.map((task, index) => {
                            const statusInfo = getStatusInfo(task.status);
                            return (
                                <div
                                    key={task._id}
                                    className="glass-panel animate-slide-up"
                                    style={{
                                        padding: "1.5rem",
                                        animationDelay: `${index * 0.05}s`,
                                        borderTop: `4px solid ${statusInfo.color}`,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%"
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                                        <div className="badge" style={{ background: statusInfo.bg, color: statusInfo.color }}>
                                            {statusInfo.label}
                                        </div>
                                        {task.dueDate && (
                                            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                                📅 {formatDate(task.dueDate)}
                                            </span>
                                        )}
                                    </div>

                                    <h3 style={{
                                        fontSize: "1.25rem",
                                        marginBottom: "0.75rem",
                                        textDecoration: task.status === "completed" ? "line-through" : "none",
                                        opacity: task.status === "completed" ? 0.6 : 1,
                                        fontWeight: "600",
                                        lineHeight: "1.4"
                                    }}>
                                        {task.title}
                                    </h3>

                                    {task.description && (
                                        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem", flex: 1, lineHeight: "1.6" }}>
                                            {task.description}
                                        </p>
                                    )}

                                    <div style={{ marginTop: "auto", borderTop: "1px solid var(--border-glass)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ display: "flex", gap: "0.5rem" }}>
                                            <button
                                                onClick={() => handleStatusChange(task, "pending")}
                                                title="Mark Pending"
                                                style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid #6366f1", background: "transparent", cursor: "pointer", opacity: 0.5 }}
                                            />
                                            <button
                                                onClick={() => handleStatusChange(task, "in-progress")}
                                                title="Mark In Progress"
                                                style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid #f59e0b", background: "transparent", cursor: "pointer", opacity: 0.5 }}
                                            />
                                            <button
                                                onClick={() => handleStatusChange(task, "completed")}
                                                title="Mark Completed"
                                                style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid #10b981", background: "transparent", cursor: "pointer", opacity: 0.5 }}
                                            />
                                        </div>

                                        <div style={{ display: "flex", gap: "0.5rem" }}>
                                            <button
                                                onClick={() => handleEdit(task)}
                                                className="glass-panel"
                                                style={{
                                                    padding: "0.5rem",
                                                    borderRadius: "10px",
                                                    color: "#6366f1",
                                                    cursor: "pointer",
                                                    border: "1px solid rgba(99, 102, 241, 0.2)",
                                                    display: "flex", alignItems: "center", justifyContent: "center"
                                                }}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="glass-panel"
                                                style={{
                                                    padding: "0.5rem",
                                                    borderRadius: "10px",
                                                    color: "#ef4444",
                                                    cursor: "pointer",
                                                    border: "1px solid rgba(239, 68, 68, 0.2)",
                                                    display: "flex", alignItems: "center", justifyContent: "center"
                                                }}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(3, 7, 18, 0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    backdropFilter: "blur(8px)"
                }}>
                    <div className="glass-panel animate-slide-up" style={{ padding: "2.5rem", width: "100%", maxWidth: "550px", margin: "1rem", border: "1px solid rgba(99, 102, 241, 0.3)", boxShadow: "0 0 50px rgba(99, 102, 241, 0.2)" }}>
                        <h2 className="neon-text" style={{ marginBottom: "2rem", fontSize: "1.8rem" }}>
                            {editingTask ? "Edit Mission" : "New Mission Protocol"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder=" "
                                />
                                <label htmlFor="title">Task Title</label>
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder=" "
                                />
                                <label htmlFor="description">Description</label>
                            </div>

                            <div className="input-group">
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <input
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    style={{ colorScheme: "dark" }}
                                />
                            </div>

                            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingTask(null);
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: "1rem",
                                        borderRadius: "16px",
                                        background: "transparent",
                                        border: "1px solid var(--border-glass)",
                                        color: "var(--text-muted)",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                        transition: "all 0.3s"
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.color = "white";
                                        e.currentTarget.style.borderColor = "white";
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.color = "var(--text-muted)";
                                        e.currentTarget.style.borderColor = "var(--border-glass)";
                                    }}
                                >
                                    Abort
                                </button>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                                    {editingTask ? "Update Data" : "Initiate"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tasks;
