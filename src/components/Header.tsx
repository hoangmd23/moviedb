function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>🎬 My Movie DB</h1>
      <nav>
        <a style={styles.link} href="/">Home</a>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
  },
  link: {
    color: "#fff",
    marginLeft: "1rem",
    textDecoration: "none",
  },
};

export default Header;
