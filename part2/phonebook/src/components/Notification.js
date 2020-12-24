import React from "react";

const Notification = ({ success, message}) => {
    const display = message ? "block" : "none"

    if(success) {
        return (
            <div className="success" style={{display: display}}>
                {message}
            </div>
        )
    }
    return (
        <div className="error" style={{display: display}}>
            {message}
        </div>
    )
}

export default Notification;