import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MovieList from './components/MovieList';
import Login from './components/Login';
import Signup from './components/Signup';  
import FavoriteMovies from './components/FavoriteMovies';
import Slider from './components/Slider';  
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로그인 상태 확인 (토큰 만료 시간도 포함)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('token_expiration');

    if (token && expirationTime && new Date().getTime() < expirationTime) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem('token');  // 만료된 토큰 삭제
      localStorage.removeItem('token_expiration');
    }
  }, []);

  return (
    <Router>
      <div className={`App ${!isAuthenticated ? 'background' : ''}`}>
        {/* 로그인한 사용자만 상단 배너와 슬라이더를 표시 */}
        {isAuthenticated ? (
          <>
            <header>
              <h1>OTT Movie Service</h1>
              <Slider />
            </header>
          </>
        ) : null}

        <Routes>
          {/* 로그인한 사용자만 접근 가능한 메인 페이지 */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <MovieList />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 회원가입 페이지 */}
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <div className="signup-background">
                  <Signup />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* 찜한 영화 목록 페이지: 로그인한 사용자만 접근 가능 */}
          <Route
            path="/favorites"
            element={isAuthenticated ? <FavoriteMovies /> : <Navigate to="/login" />}
          />

          {/* 로그인 페이지 */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <div className="login-background">
                  <Login setIsAuthenticated={setIsAuthenticated} />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
