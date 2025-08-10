import * as React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import {
    add_to_favourites,
    add_to_watch_later,
    in_favourites,
    in_watch_later,
    remove_from_favourites,
    remove_from_watch_later
} from "../utils/utils.ts";

export interface MovieOverview
{
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    popularity: number;
    release_date: string;
}

export default function MovieCard({ id, title, poster_path, overview, popularity, release_date }: MovieOverview ) {
    const [watchLater, setWatchLater] = useState(in_watch_later(id));
    const [favourite, setFavourite] = useState(in_favourites(id));
    const img_base_path = "https://image.tmdb.org/t/p/w200";
    const overview_max_length = 200;

    if (overview.length > overview_max_length)
    {
        overview = overview.substring(0, overview_max_length) + '...';
    }

    return (
        <div style={styles.card}>
            <Link to={`movie/${id}`}>
                <img src={img_base_path + poster_path} alt={title} style={styles.poster} />
            </Link>
            <div style={styles.info}>
                <div style={styles.meta}>
                    <span style={{ color: "yellow" }}>
                        Popularity {popularity.toFixed(2)}
                    </span>
                    <span style={{ color: "lightblue", marginLeft: '40px' }}>
                        Release date {release_date}
                    </span>
                </div>
                <h3 style={styles.title}>{title}</h3>
                <p style={styles.overview}>{overview}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    { watchLater ? (
                        <button onClick={() => {
                            remove_from_watch_later(id);
                            setWatchLater(false);
                        }}>In watch later</button>
                        ) : (
                        <button onClick={() => {
                            add_to_watch_later(id);
                            setWatchLater(true);
                        }}>Watch later</button>
                    ) }
                    { favourite ? (
                        <button onClick={() => {
                            remove_from_favourites(id);
                            setFavourite(false);
                        }}>In favourites</button>
                    ) : (
                        <button onClick={() => {
                            add_to_favourites(id);
                            setFavourite(true);
                        }}>Add to favourites</button>
                    ) }
                </div>
            </div>
        </div>
    );

}

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        display: "flex",
        backgroundColor: "#2d2d2d",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
        padding: "8px",
        transition: "box-shadow 0.2s ease",
    },
    cardHover: {
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    },
    meta: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: '0.9rem',
        color: '#666',
        marginBottom: '4px',
    },
    poster: {
        width: "128px",
        height: "192px",
        objectFit: "cover",
        flexShrink: 0,
    },
    info: {
        marginLeft: "16px",
        display: "flex",
        flexDirection: "column",
    },
    title: {
        color: "white",
        fontSize: "1.125rem",
        fontWeight: 600,
        marginBottom: "8px",
    },
    overview: {
        color: "#ccc",
        fontSize: "0.875rem",
    }
};
