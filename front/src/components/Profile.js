import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in');
      return;
    }

    axios
      .get('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUserInfo(response.data))
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div>
      <h1>{userInfo.name}</h1>
      <p>Email: {userInfo.email}</p>
      <p>Age: {userInfo.age}</p>
      <p>Favorites: {userInfo.favorites.join(', ')}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

const logout = () => {
  localStorage.removeItem('token');  // 로그아웃 시 토큰 삭제
  window.location.href = '/login';   // 로그인 페이지로 리디렉션
};

export default Profile;
