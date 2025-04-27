const loginForm = document.querySelector('.login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        if (!email) {
            alert('Email không được để trống');
            return;
        }
        if (!password) {
            alert('Mật khẩu không được để trống');
            return;
        }
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert('Email hoặc mật khẩu không đúng');
            return;
        }
        alert('Đăng nhập thành công!');
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'manager.html';
    });
}
