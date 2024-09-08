import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 'Switch' 대신 'Routes' 사용
import MovieList from './components/MovieList';
import Login from './components/Login';
import Signup from './components/Signup';  // Signup 컴포넌트 추가
import FavoriteMovies from './components/FavoriteMovies';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>OTT Movie Service</h1>
        <Routes> {/* 'Switch' 대신 'Routes'로 변경 */}
          {/* 기본 경로: 로그인 페이지 */}
          <Route path="/" element={<Login />} />
          
          {/* 영화 목록 페이지: 로그인 여부와 상관없이 접근 가능 */}
          <Route path="/movies" element={<MovieList />} />

          {/* 회원가입 페이지 */}
          <Route path="/signup" element={<Signup />} />
          
          {/* 찜한 영화 목록 페이지: 로그인한 사용자만 접근 가능 */}
          <Route path="/favorites" element={<FavoriteMovies />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
