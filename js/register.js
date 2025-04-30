document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const agree = document.getElementById("agree").checked;

    if (!firstName || !lastName) {
        alert("Họ và tên không được để trống");
        return;
    }
    if (!email) {
        alert("Email không được để trống");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Email phải đúng định dạng");
        return;
    }
    if (!password) {
        alert("Mật khẩu không được để trống");
        return;
    }
    if (password.length < 8) {
        alert("Mật khẩu tối thiểu 8 ký tự");
        return;
    }
    if (!agree) {
        alert("Bạn cần đồng ý với điều khoản");
        return;
    }

    const user = {
        fullName: `${firstName} ${lastName}`,
        email: email,
        password: password
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existed = users.find(u => u.email === email);
    if (existed) {
        alert("Email đã được sử dụng. Vui lòng dùng email khác.");
        return;
    }
    const checkpass = users.some(u => u.password === password);
    if(checkpass) {
        alert("Mật khẩu không được trùng")
        return;
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...");
    window.location.href = "login.html";
});
