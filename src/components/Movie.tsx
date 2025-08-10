import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {fetch_movie} from "../api/movies.ts";
import type {MovieOverview} from "./MovieCard.tsx";

export interface Movie extends MovieOverview
{
    original_title: string;
    poster_path: string;
}

export default function Movie() {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const img_base_path = "https://image.tmdb.org/t/p/w200";

    useEffect(() => {
        fetch_movie(Number(id)).then(result => setMovie(result));
    }, [id]);

    return (
        <div
            style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "1rem",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {movie ? (
                <>
                    <h1 style={{ marginBottom: "0.5rem" }}>{movie.original_title}</h1>
                    <img
                        src={img_base_path + movie.poster_path}
                        alt={movie.original_title}
                        style={{
                            width: "100%",
                            maxWidth: "300px",
                            borderRadius: "8px",
                            display: "block",
                            marginBottom: "1rem",
                        }}
                    />
                    <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{movie.overview}</p>
                </>
            ) : (
                <>
                    <h1>Loading...</h1>
                </>
            )}
        </div>
    );
}