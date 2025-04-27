const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'login.html';
}
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
});

