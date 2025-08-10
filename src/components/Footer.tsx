function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} My Movie Site. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "1rem",
    textAlign: "center" as const,
    marginTop: "2rem",
  },
};

export default Footer;
