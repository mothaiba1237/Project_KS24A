let lessons = JSON.parse(localStorage.getItem("lesson")) || [
    { id: 1, name: "Session 01 - Tổng quan về HTML", type: "HTML", time: 45, status: "Đã hoàn thành" },
    { id: 2, name: "Session 02 - Thẻ Inline và Block", type: "HTML", time: 60, status: "Chưa hoàn thành" },
    { id: 3, name: "Session 03 - Form và Table", type: "HTML", time: 40, status: "Đã hoàn thành" },
    { id: 4, name: "Session 04 - CSS cơ bản", type: "CSS", time: 45, status: "Chưa hoàn thành" },
    { id: 5, name: "Session 05 - CSS layout", type: "CSS", time: 60, status: "Chưa hoàn thành" },
    { id: 6, name: "Session 06 - CSS Flex box", type: "CSS", time: 45, status: "Chưa hoàn thành" },
    { id: 7, name: "Session 12 - Con trỏ trong C", type: "C", time: 45, status: "Đã hoàn thành" },
    { id: 8, name: "Session 15 - Đọc và ghi file", type: "C", time: 60, status: "Chưa hoàn thành" },
];


const deleteLessonModal = document.getElementById("deleteModal");
const cancelDeleteBtn = document.getElementById("cancelBtn");
let lessonToDelete = null;
let lessonToUpdate = null;
let currentLessons = lessons;






function deleteLesson(id) {
    lessonToDelete = lessons.find(lesson => lesson.id === id);
    if (lessonToDelete) {
        const confirmationMessage = `Bạn có chắc chắn muốn xóa bài học "${lessonToDelete.name}" khỏi hệ thống không?`;
        document.querySelector("#deleteModal p").textContent = confirmationMessage;
        deleteLessonModal.classList.remove("hidden");
    }
}

document.querySelector("#deleteModal .modal-actions .btn.danger").addEventListener("click", () => {
    if (lessonToDelete) {
        lessons = lessons.filter(lesson => lesson.id !== lessonToDelete.id);
        localStorage.setItem("lesson", JSON.stringify(lessons));
        const totalPages = Math.ceil(lessons.length / lessonsPerPage);
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        renderLessons(lessons);
        renderPagination(lessons);
        deleteLessonModal.classList.add("hidden");
        alert("Xóa bài học thành công!");
    }
});











function openUpdateLessonModal(id) {
    lessonToUpdate = lessons.find(lesson => lesson.id === id);
    if (lessonToUpdate) {
        document.getElementById("updateName").value = lessonToUpdate.name;
        document.getElementById("updateType").value = lessonToUpdate.type;
        document.getElementById("updateTime").value = lessonToUpdate.time;
        const statusRadio = document.querySelector(`input[name="status"][value="${lessonToUpdate.status}"]`);
        if (statusRadio) {
            statusRadio.checked = true;
        }
        document.getElementById("modalupdate").classList.remove("hidden");
    }
}
function closeUpdateLessonModal() {
    document.getElementById("modalupdate").classList.add("hidden");
}
function updateLesson() {
    const nameInput = document.querySelector('#modalupdate #updateName');
    const name = nameInput.value.trim();
    const typeInput = document.querySelector('#modalupdate #updateType');
    const type = typeInput ? typeInput.value.trim() : '';
    const timeInput = document.querySelector('#modalupdate #updateTime');
    const time = parseInt(timeInput.value);
    const errorElement = document.querySelector('#modalupdate #updateError');
    const typeErrorElement = document.querySelector('#modalupdate #typeUpdateError');
    const selectedStatus = document.querySelector('#modalupdate input[name="status"]:checked');
    errorElement.textContent = "";
    typeErrorElement.textContent = "";
    const statusErrorElement = document.querySelector('#modalupdate #statusUpdateError');
    if (!name) {
        errorElement.textContent = "Tên bài học không được để trống!";
        return;
    }
    if (!type) {
        typeErrorElement.textContent = "Loại môn học không được để trống!";
        return;
    }
    const timeErrorElement = document.querySelector('#modalupdate #updateTimeError');
    timeErrorElement.textContent = "";
    if (isNaN(time) || time <= 0) {
        timeErrorElement.textContent = "Thời gian học phải là một số lớn hơn 0!";
        return;
    }
    statusErrorElement.textContent = "";
    if (!selectedStatus) {
        statusErrorElement.textContent = "Vui lòng chọn trạng thái của bài học!";
        return;
    }
    const nameExists = lessons.some(lesson =>
        lesson.name.toLowerCase() === name.toLowerCase() && lesson.id !== lessonToUpdate.id
    );
    if (nameExists) {
        errorElement.textContent = "Tên bài học đã tồn tại!";
        return;
    }
    lessonToUpdate.name = name;
    lessonToUpdate.type = type;
    lessonToUpdate.time = time;
    lessonToUpdate.status = selectedStatus.value;
    localStorage.setItem("lesson", JSON.stringify(lessons));
    renderLessons(lessons);
    closeUpdateLessonModal();
    alert("Cập nhật bài học thành công!");
}









function openAddLessonModal() {
    document.getElementById("modaladd").classList.remove("hidden");
    document.getElementById("addName").value = "";
    document.getElementById("lessonTime").value = "45";
    document.getElementById("addError").innerText = "";
}
function closeAddLessonModal() {
    document.getElementById("modaladd").classList.add("hidden");
}
// Thêm bài học
function addLesson() {
    const nameInput = document.querySelector('#modaladd #addName');
    const name = nameInput.value.trim();
    const typeInput = document.querySelector('#modaladd #addType');
    const type = typeInput.value.trim();
    const timeInput = document.querySelector('#modaladd #lessonTime');
    const time = parseInt(timeInput.value);
    const statusInput = document.querySelector('#modaladd input[name="status"]:checked');
    const errorElement = document.querySelector('#modaladd #addError');
    const typeError = document.querySelector('#modaladd #typeError');
    errorElement.textContent = "";
    typeError.textContent = "";
    const statusError = document.querySelector('#modaladd #statusAddError');

    if (!name) {
        errorElement.textContent = "Tên bài học không được để trống!";
        return;
    }
    const nameExists = lessons.some(lesson => lesson.name.toLowerCase() === name.toLowerCase());
    if (nameExists) {
        errorElement.textContent = "Tên bài học đã tồn tại!";
        return;
    }
    if (!type) {
        typeError.textContent = "Loại môn học không được để trống!";
        return;
    }
    const timeError = document.querySelector('#modaladd #timeError');
    timeError.textContent = "";

    if (isNaN(time) || time <= 0) {
        timeError.textContent = "Thời gian học phải là một số lớn hơn 0!";
        return;
    }

    statusError.textContent = "";

    if (!statusInput) {
        statusError.textContent = "Vui lòng chọn trạng thái!";
        return;
    }
    const newLesson = {
        id: Date.now(),
        name: name,
        type: type,
        time: time,
        status: statusInput.value
    };
    lessons.push(newLesson);
    localStorage.setItem("lesson", JSON.stringify(lessons));
    const totalPages = Math.ceil(lessons.length / lessonsPerPage);
    currentPage = totalPages;
    renderLessons(lessons);
    closeAddLessonModal();
    alert("Thêm bài học thành công!");
}







let currentPage = 1;
const lessonsPerPage = 6;

function renderLessons(data) {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";
    const paginatedData = getPaginatedLessons(data, currentPage);
    paginatedData.forEach(lesson => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><input type="checkbox" onclick="toggleStatus(${lesson.id}, this)" ${lesson.status === "Đã hoàn thành" ? "checked" : ""}></td>
            <td>${lesson.name}</td>
            <td style="text-align: center;">${lesson.time}</td>
            <td>
            <span class="badge ${lesson.status === 'Đã hoàn thành' ? 'active' : 'inactive'}">
            <span class="dot"></span> ${lesson.status === 'Đã hoàn thành' ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
            </span>
            </td>
            <td class="actions">
                <i class="delete-icon" onclick="deleteLesson(${lesson.id})">
                    <img src="../icons/Button.png" alt="Xóa">
                </i>
                <i class="edit-icon" onclick="openUpdateLessonModal(${lesson.id})">
                    <img src="../icons/_Button base.png" alt="Sửa">
                </i>
            </td>
        `;
        tbody.appendChild(tr);
    });
    renderPagination(data);
}
function toggleStatus(id, checkbox) {
    const lesson = lessons.find(lesson => lesson.id === id);
    if (lesson) {
        lesson.status = checkbox.checked ? "Đã hoàn thành" : "Chưa hoàn thành";
        localStorage.setItem("lesson", JSON.stringify(lessons));
        renderLessons(lessons);
    }
}







function renderPagination(data) {
    const totalPages = Math.ceil(data.length / lessonsPerPage);
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = '';
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&lt;';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => changePage(currentPage - 1));
    pagination.appendChild(prevButton);
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerHTML = i;
        pageButton.classList.toggle('active', i === currentPage);
        pageButton.addEventListener('click', () => changePage(i));
        pagination.appendChild(pageButton);
    }
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&gt;';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => changePage(currentPage + 1));
    pagination.appendChild(nextButton);
}






function changePage(page) {
    const totalPages = Math.ceil(currentLessons.length / lessonsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderLessons(currentLessons);
    }
}






function sortlesson(value) {
    if (value === "default") {
        currentLessons = lessons;
    } else if (value === "name") {
        currentLessons = [...lessons].sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "createdAt") {
        currentLessons = [...lessons].sort((a, b) => b.createdAt - a.createdAt);
    }
    currentPage = 1;
    renderLessons(currentLessons);
}







function searchSubjects(inputElement) {
    const keyword = inputElement.value.trim().toLowerCase();
    currentLessons = lessons.filter(lesson =>
        lesson.name.toLowerCase().includes(keyword)
    );
    currentPage = 1;
    renderLessons(currentLessons);
}






function getPaginatedLessons(data, page) {
    const startIndex = (page - 1) * lessonsPerPage;
    const endIndex = startIndex + lessonsPerPage;
    return data.slice(startIndex, endIndex);
}





function subjectmanagement() {
    window.location.href = 'subjectmanagement.html';
}






renderLessons(lessons);






const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
    const userNameElement = document.getElementById('user-name');
    const logoutBtn = document.getElementById('logoutBtn');
    const userProfile = document.getElementById('userProfile');
    const userInfo = document.getElementById('userInfo');

    if (userNameElement && logoutBtn && userProfile && userInfo) {
        userNameElement.textContent = `👋 Chào, ${currentUser.fullName}`;

        userProfile.addEventListener('click', function (e) {
            e.preventDefault();
            userInfo.style.display = userInfo.style.display === 'none' ? 'block' : 'none';
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
