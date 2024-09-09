웹 구현 방법

1. 프론트엔드 서버에 nginx, git, mysql8.0 설치

nginx설치 방법
sudo amazon-linux-extras install -y nginx1

nginx -v

sudo service nginx start


git설치 방법
yum install -y git


mysql8.0 설치 방법
sudo amazon-linux-extras install epel -y

sudo yum install https://dev.mysql.com/get/mysql80-community-release-el7-5.noarch.rpm -y

vim /etc/yum.repos.d/mysql-community.repo = gpg키 0으로 변경

sudo yum install mysql-community-server-8.0.23-1.el7.x86_64 -y

sudo systemctl start mysqld



2. 백엔드 서버 git설치

git설치 방법
yum install -y git


3. Nodejs18 설치 방법
wget -nv https://d3rnber7ry90et.cloudfront.net/linux-x86_64/node-v18.17.1.tar.gz

mkdir /usr/local/lib/node

tar -xf node-v18.17.1.tar.gz

mv node-v18.17.1 /usr/local/lib/node/nodejs

echo "export NVM_DIR=''" >> /home/ec2-user/.bashrc

echo "export NODEJS_HOME=/usr/local/lib/node/nodejs" >> /home/ec2-user/.bashrc

echo "export PATH=\$NODEJS_HOME/bin:\$PATH" >> /home/ec2-user/.bashrc
. /home/ec2-user/.bashrc

node -e "console.log('Running Node.js ' + process.version)"



4. 프론트,백엔드 모드 깃 클론
git clone https://github.com/kmh0831/3-tier-web.git



5. 프론트엔드 서버 웹 구동
cd 3-tier-web/front

npm install

npm install react-router-dom

npm run build

sudo cp -r build/* /usr/share/nginx/html/

sudo systemctl restart nginx



6. 백엔드 서버 웹 구동
cd 3-tier-web/back

npm install express mysql2 dotenv aws-sdk

npm start

----------------------

RDS DB 미리 생성
RDS 
database-1 = DB 식별자
admin
kmhyuk8832!

DB이름 = test


------------------------------

CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- 고유 ID (자동 증가)
    title VARCHAR(255) NOT NULL,         -- 영화 제목
    description TEXT NOT NULL,           -- 영화 설명
    poster_url VARCHAR(255) NOT NULL,    -- 포스터 이미지 URL
    trailer_url VARCHAR(255) NOT NULL    -- 유튜브 예고편 URL
);





INSERT INTO movies (title, description, poster_url, trailer_url)
VALUES ('너의 이름은', '영화 1의 설명', 'https://web-images-kmhyuk1018.s3.ap-northeast-2.amazonaws.com/111.jpg', 'https://www.youtube.com/embed/0GtEGZv1_Os'),
       ('반지의 제왕-왕의 귀환', '영화 2의 설명', 'https://web-images-kmhyuk1018.s3.ap-northeast-2.amazonaws.com/222.jpg', 'https://www.youtube.com/embed/zckJCxYxn1g'),
       ('어벤져스 엔드 게임', '영화 3의 설명', 'https://web-images-kmhyuk1018.s3.ap-northeast-2.amazonaws.com/333.jpg', 'https://www.youtube.com/embed/Ko2NWhXI9e8'),
       ('인터스텔라', '영화 4의 설명', 'https://web-images-kmhyuk1018.s3.ap-northeast-2.amazonaws.com/444.jpg', 'https://www.youtube.com/embed/d2VN6NNa9BE');




---------------------------------------------

- 코드 기준 -
웹 APP 코드에서 바꿀부분이 3군대 있습니다.
1. 프론트엔드

pubilc/scripts.js
58행 fetch('http://3.34.190.91:5000/api/user/login', {
82행 fetch('http://3.34.190.91:5000/api/user/signup', {
107행 fetch('http://3.34.190.91:5000/api/user/profile', {
136행 fetch('http://3.34.190.91:5000/api/movies/favorites', {
아이피 주소 백엔드 EC2주소로 변경

src/components/FavoriteMovies.js
16행 fetch('http://3.34.190.91:5000/api/movies/favorites', {
아이피 주소 백엔드 EC2주소로 변경
