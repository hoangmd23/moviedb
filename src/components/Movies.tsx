import { useState } from "react";
import { useNavigate } from "react-router-dom"
import {
    fetch_favourite_movies,
    fetch_movies_by_title,
    fetch_trending_movies,
    fetch_watch_later_movies
} from "../api/movies";
import MovieCard, {type MovieOverview} from "./MovieCard.tsx";
import * as React from "react";

export default function Movies() {
    const [movies, setMovies] = useState<MovieOverview[]>([]);
    const [searchMoviesTitle, setSearchMoviesTitle] = useState("");
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            {/* Left column */}
            <div style={styles.sidebar}>
                <button onClick={async () => {
                    const res = await fetch_trending_movies();
                    setMovies(res);
                }}>
                    Trending
                </button>
                <button onClick={async () => {
                    const res = await fetch_watch_later_movies();
                    setMovies(res);
                }}>
                    Watch later
                </button>

                <button onClick={async () => {
                    const res = await fetch_favourite_movies();
                    setMovies(res);
                }}>
                    Favourites
                </button>

                <div
                    style={{
                        marginTop: "1rem",
                        display: "flex",
                        justifyContent: "center", // center horizontally
                        alignItems: "center",     // vertically align input & button
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchMoviesTitle}
                        style={{
                            marginRight: "0.5rem",
                            height: "2.5rem",
                            fontSize: "1rem",
                        }}
                        onChange={(e) => setSearchMoviesTitle(e.target.value)}
                    />
                    <button
                        onClick={async () => {
                            if (searchMoviesTitle !== "") {
                                const res = await fetch_movies_by_title(searchMoviesTitle);
                                setMovies(res);
                            }
                        }}
                    >
                        Search
                    </button>
                </div>

                <button
                    style={{ width: "100%" }}
                    onClick={() => navigate("credits")}
                >
                    Credits
                </button>

            </div>

            {/* Right column */}
            <div style={styles.content}>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        poster_path={movie.poster_path}
                        overview={movie.overview}
                        popularity={movie.popularity}
                        release_date={movie.release_date}
                    />
                ))}
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
    },
    sidebar: {
        flex: "0 0 15%", // fixed to 30%
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "#2d2d2d",
        borderRadius: "8px",
    },
    content: {
        flex: "0 0 80%", // fixed to 70%
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
        marginLeft: "2rem",
    },

};
