// 슬라이드 쇼 기능
let slideIndex = 0;
const slides = document.querySelectorAll(".slides");

// 첫 번째 슬라이드 활성화
slides[0].classList.add("active");

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slideIndex++;
    if (slideIndex >= slides.length) { slideIndex = 0; }
    slides[slideIndex].classList.add("active");
    setTimeout(showSlides, 3000); // 3초마다 슬라이드 전환
}

showSlides();

// 휠 스크롤로 페이지 이동
window.addEventListener("wheel", function(event) {
    document.documentElement.scrollTop += event.deltaY;
});

// 모달 관련 코드
document.addEventListener('DOMContentLoaded', () => {
    // 모달 요소 가져오기
    const modal = document.getElementById('movie-modal');
    
    // 페이지 로드 시 모달이 보이지 않도록 설정
    modal.style.display = 'none';

    // 영화 데이터를 가져와서 페이지에 표시하는 함수
    fetchMovies();

    // 모달 닫기 버튼에 이벤트 리스너 추가
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeModal);
});

function closeModal() {
    const modal = document.getElementById('movie-modal');
    modal.style.display = 'none';
    document.getElementById('movie-trailer').src = ''; // 모달을 닫을 때 유튜브 영상도 중지
}

function openModal(movie) {
    const modal = document.getElementById('movie-modal');
    const trailer = document.getElementById('movie-trailer');
    const title = document.getElementById('movie-title');
    const description = document.getElementById('movie-description');

    // 모달에 영화 정보 추가
    trailer.src = movie.trailer_url;  // 유튜브 영상 URL 설정
    title.textContent = movie.title;
    description.textContent = movie.description;

    modal.style.display = 'block';  // 모달을 열기
}

// ====== 로그인/회원가입 및 프로필 기능 추가 ======

document.addEventListener('DOMContentLoaded', () => {
    // 로그인 상태 확인 후 닉네임 출력
    const token = localStorage.getItem('token');
    if (token) {
        fetch('http://3.34.49.62:5000/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(user => {
            document.getElementById('username').textContent = user.name;
            document.getElementById('user-email').textContent = user.email;
            document.getElementById('user-name').textContent = user.name;
        });
    }

    // 프로필 모달 열기
    const profileTab = document.getElementById('profile-tab');
    profileTab.addEventListener('click', () => {
        if (token) {
            document.getElementById('profile-modal').style.display = 'block';
        } else {
            document.getElementById('login-modal').style.display = 'block';
        }
    });

    // 내 정보 클릭 시 정보 표시
    document.getElementById('user-info').addEventListener('click', () => {
        document.getElementById('user-info-section').style.display = 'block';
        document.getElementById('favorites-section').style.display = 'none';
    });

    // 찜한 목록 클릭 시 찜한 영화 표시
    document.getElementById('favorites-btn').addEventListener('click', () => {
        fetch('http://3.34.49.62:5000/api/movies/favorites', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(movies => {
            const favoritesGrid = document.getElementById('favorites-grid');
            favoritesGrid.innerHTML = '';
            movies.forEach(movie => {
                const movieItem = document.createElement('div');
                movieItem.classList.add('movie-item');
                const img = document.createElement('img');
                img.src = movie.poster_url;
                img.alt = movie.title;
                const title = document.createElement('p');
                title.textContent = movie.title;
                movieItem.appendChild(img);
                movieItem.appendChild(title);
                favoritesGrid.appendChild(movieItem);
            });
        });
        document.getElementById('user-info-section').style.display = 'none';
        document.getElementById('favorites-section').style.display = 'block';
    });

    // 로그아웃 처리
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('token');
        alert('로그아웃되었습니다.');
        location.reload();
    });

    // 로그인 처리
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        fetch('http://3.34.49.62:5000/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                location.reload(); // 로그인 후 새로고침
            } else {
                alert('로그인 실패');
            }
        });
    });

    // 회원가입 처리
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const name = document.getElementById('signup-name').value;

        fetch('http://3.34.49.62:5000/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'User signed up successfully') {
                alert('회원가입이 완료되었습니다.');
                document.getElementById('signup-modal').style.display = 'none';
            } else {
                alert('회원가입 실패');
            }
        });
    });

    // 모달 닫기 버튼
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.modal').style.display = 'none';
        });
    });
});
