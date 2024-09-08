import React, { useEffect, useState } from 'react';

function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // 백엔드 API로부터 영화 목록 가져오기 (JWT 토큰 없이)
        fetch('http://3.34.49.62:5000/api/movies')
        .then(response => response.json())
        .then(data => setMovies(data))
        .catch(error => console.error('영화 데이터를 가져오는 중 오류 발생:', error));
    }, []);

    return (
        <section className="movie-section">
            <h2>Originals</h2>
            <div className="movie-grid">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-item">
                        <img src={movie.poster_url} alt={movie.title} />
                        <p>{movie.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MovieList;
