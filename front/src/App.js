import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Switch>
          {/* 기본 경로: 로그인 페이지 */}
          <Route exact path="/" component={Login} />
          
          {/* 영화 목록 페이지: 로그인 여부와 상관없이 접근 가능 */}
          <Route path="/movies" component={MovieList} />

          {/* 회원가입 페이지 */}
          <Route path="/signup" component={Signup} />
          
          {/* 찜한 영화 목록 페이지: 로그인한 사용자만 접근 가능 */}
          <Route path="/favorites" component={FavoriteMovies} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
