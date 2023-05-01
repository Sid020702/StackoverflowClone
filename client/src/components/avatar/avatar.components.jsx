import React from 'react'

const Avatar = ({ children, fontSize, backgroundColor, py, px, color, borderRadius, cursor }) => {
    const style = {
        children,
        backgroundColor,
        padding: `${py} ${px}`,
        color: color || 'black',
        fontSize,
        borderRadius,
        textAlign: "center",
        cursor: cursor || null,

    }
    return (
        <div style={style}>
            {children}
        </div>
    )
}

export default Avatar