import { useEffect, useState } from "react";
import "../index.css";

const Toast = ({ message, type = "success", onClose, duration = 4000 }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const exitTimer = setTimeout(() => {
            setIsExiting(true);
        }, duration - 300);

        const closeTimer = setTimeout(() => {
            onClose();
        }, duration);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(closeTimer);
        };
    }, [onClose, duration]);

    const getIcon = () => {
        switch (type) {
            case "success":
                return (
                    <div className="toast-icon toast-icon-success">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                );
            case "error":
                return (
                    <div className="toast-icon toast-icon-error">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                );
            case "warning":
                return (
                    <div className="toast-icon toast-icon-warning">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </div>
                );
            case "info":
                return (
                    <div className="toast-icon toast-icon-info">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                    </div>
                );
            default:
                return null;
        }
    };

    const getTitle = () => {
        switch (type) {
            case "success": return "Success!";
            case "error": return "Error";
            case "warning": return "Warning";
            case "info": return "Info";
            default: return "";
        }
    };

    return (
        <div className={`toast-notification ${type} ${isExiting ? 'toast-exit' : ''}`}>
            {getIcon()}
            <div className="toast-content">
                <p className="toast-title">{getTitle()}</p>
                <p className="toast-message">{message}</p>
            </div>
            <button className="toast-close" onClick={() => { setIsExiting(true); setTimeout(onClose, 300); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div className="toast-progress">
                <div className="toast-progress-bar" style={{ animationDuration: `${duration}ms` }}></div>
            </div>
        </div>
    );
};

export default Toast;
