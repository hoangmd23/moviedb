import * as React from "react";

export default function Credits() {
    return (
        <div style={styles.container}>
            <p style={styles.text}>
                This product uses the TMDb API but is not endorsed or certified by TMDb.
            </p>
            <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
            >
            </a>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        marginTop: "2rem",
        textAlign: "center",
        color: "#ccc",
    },
    text: {
        fontSize: "0.9rem",
        marginBottom: "0.5rem",
    },
    logo: {
        height: "40px",
    },
};
