const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
    const userNameElement = document.getElementById('user-name');
    const logoutBtn = document.getElementById('logoutBtn');
    const userProfile = document.getElementById('userProfile');

    if (userNameElement && logoutBtn && userProfile) {
        userProfile.addEventListener('click', function (e) {
            e.preventDefault();
            userNameElement.style.display = 'inline';
            logoutBtn.style.display = 'inline';
            userNameElement.textContent = `Chào, ${currentUser.fullName}`;
        });

        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            }
        });
    }
} else {
    window.location.href = 'login.html';
}
function subject(){
    window.location.href = 'subjectmanagement.html'
}
document.getElementById('userProfile').addEventListener('click', function(event) {
    event.preventDefault();
    var userInfo = document.getElementById('userInfo');
    if (userInfo.style.display === 'none') {
        userInfo.style.display = 'flex';
    } else {
        userInfo.style.display = 'none';
    }
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    alert('Bạn đã đăng xuất!');
    // thêm code xử lý đăng xuất nếu cần
});
