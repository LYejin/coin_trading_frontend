import React from "react";
import "../../assets/scss/modal.scss";

export default function Modal({
    open,
    message = "",
    type = "error",
    onClose = () => { }
}) {
    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-box"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 아이콘 */}
                <div className={`modal-icon ${type}`}>
                    {type === "success" ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    )}
                </div>

                {/* 메시지 */}
                <p className="modal-message">{message}</p>

                {/* 버튼 */}
                <button className="modal-btn" onClick={onClose}>
                    확인
                </button>
            </div>
        </div>
    );
}
