let subjects = JSON.parse(localStorage.getItem("subjects")) || [
    { id: 1, name: "Lập trình C", status: "active", createdAt: "2024-01-01" },
    { id: 2, name: "Lập trình Frontend với ReactJS", status: "inactive", createdAt: "2024-01-15" },
    { id: 3, name: "Lập trình Backend với Spring boot", status: "active", createdAt: "2024-02-01" },
    { id: 4, name: "Lập trình Frontend với VueJS", status: "inactive", createdAt: "2024-02-20" },
    { id: 5, name: "Cấu trúc dữ liệu và giải thuật", status: "inactive", createdAt: "2024-03-01" },
    { id: 6, name: "Phân tích và thiết kế hệ thống", status: "inactive", createdAt: "2024-03-10" },
    { id: 7, name: "Toán cao cấp", status: "active", createdAt: "2024-04-01" },
    { id: 8, name: "Tiếng Anh chuyên ngành", status: "inactive", createdAt: "2024-04-10" },
    { id: 9, name: "A", status: "active", createdAt: "2024-03-01" },
    { id: 10, name: "B", status: "active", createdAt: "2024-02-01" },
    { id: 11, name: "C", status: "active", createdAt: "2024-01-01" },

];

const deletemodal = document.getElementById("deleteModal");
const cancelBtn = document.getElementById("cancelBtn");
const deleteIcons = document.querySelectorAll(".delete-icon");
let subjectToDelete = null;
let subjectToUpdate = null;
let currentSubjects = subjects;



//ham xoa mon hoc
function deleteSubject(id) {
    subjectToDelete = subjects.find(subject => subject.id === id);
    if (subjectToDelete) {
        const confirmationMessage = `Bạn có chắc chắn muốn xóa môn học "${subjectToDelete.name}" khỏi hệ thống không?`;
        document.querySelector("#deleteModal p").textContent = confirmationMessage;
        deletemodal.classList.remove("hidden");
    }
}
cancelBtn.addEventListener("click", () => {
    deletemodal.classList.add("hidden");
});
document.querySelector("#deleteModal .modal-actions .btn.danger").addEventListener("click", () => {
    if (subjectToDelete) {
        subjects = subjects.filter(subject => subject.id !== subjectToDelete.id);
        localStorage.setItem("subjects", JSON.stringify(subjects));
        renderSubjects(subjects);
        deletemodal.classList.add("hidden");
    }
});




//ham cap nhat mon hoc
function openUpdate(id) {
    subjectToUpdate = subjects.find(subject => subject.id === id);
    if (subjectToUpdate) {
        document.getElementById("update-namesubject").value = subjectToUpdate.name;
        const statusRadios = document.querySelectorAll('input[name="update-status"]');
        statusRadios.forEach(radio => {
            radio.checked = radio.value === subjectToUpdate.status;
        });
        document.getElementById("update-error").textContent = "";
        document.getElementById("modalupdate").classList.remove("hidden");
    }
}
function closeupdate() {
    document.getElementById("modalupdate").classList.add("hidden");
}
function update() {
    if (!subjectToUpdate) return;
    const name = document.getElementById("update-namesubject").value.trim();
    const status = document.querySelector('input[name="update-status"]:checked')?.value;
    const errorElement = document.getElementById("update-error");
    if (!name) {
        errorElement.textContent = "Tên môn học không được để trống!";
        return;
    }
    const nameExists = subjects.some(
        subject => subject.name.toLowerCase() === name.toLowerCase() && subject.id !== subjectToUpdate.id
    );
    if (nameExists) {
        errorElement.textContent = "Tên môn học đã tồn tại!";
        return;
    }
    subjectToUpdate.name = name;
    subjectToUpdate.status = status;
    localStorage.setItem("subjects", JSON.stringify(subjects));
    renderSubjects(subjects);
    closeupdate();
    alert("Cập nhật môn học thành công!");
}








// ham them mon hoc

function openaddModal() {
    document.getElementById("modaladd").classList.remove("hidden");
    document.getElementById("namesubject").value = "";
    document.getElementById("error").innerText = "";
}
function closeaddModal() {
    document.getElementById("modaladd").classList.add("hidden");
}
function add() {
    const nameInput = document.querySelector('#modaladd #namesubject');
    const name = nameInput.value.trim();
    const errorElement = document.querySelector('#modaladd #error');
    const status = document.querySelector('#modaladd input[name="status"]:checked').value;

    if (!name) {
        errorElement.textContent = "Tên môn học không được để trống!";
        return;
    }

    const nameExists = subjects.some(subject => subject.name.toLowerCase() === name.toLowerCase());
    if (nameExists) {
        errorElement.textContent = "Tên môn học đã tồn tại!";
        return;
    }

    const newSubject = {
        id: Date.now(),
        name: name,
        status: status,
        createdAt: new Date().toISOString().split('T')[0]
    };

    subjects.push(newSubject);
    localStorage.setItem("subjects", JSON.stringify(subjects));
    currentPage = Math.ceil(subjects.length / subjectsPerPage);
    renderSubjects(subjects);
    closeaddModal();
    alert("Thêm môn học thành công!");
}







let currentPage = 1;
const subjectsPerPage = 6;


// Hàm hiển thị các môn học
function renderSubjects(data) {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";
    const paginatedData = getPaginatedSubjects(data, currentPage);
    paginatedData.forEach(subject => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${subject.name}</td>
            <td>
                <span class="badge ${subject.status === 'active' ? 'active' : 'inactive'}">
                    <span class="dot"></span> ${subject.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                </span>
            </td>
            <td class="actions">
                <i class="delete-icon" onclick="deleteSubject(${subject.id})">
                    <img src="../icons/Button.png" alt="Xóa">
                </i>
                <i onclick="openUpdate(${subject.id})">
                    <img src="../icons/_Button base.png" alt="Sửa">
                </i>
            </td>
        `;
        tbody.appendChild(tr);
    });
    renderPagination(data);
}





// Hàm phân trang
function renderPagination(data) {
    const totalPages = Math.ceil(data.length / subjectsPerPage);
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
    const totalPages = Math.ceil(currentSubjects.length / subjectsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderSubjects(currentSubjects);
    }
}






//ham loc theo trang thai
renderSubjects(subjects);
function filterByStatus(value) {
    if (value === "Tất cả trạng thái") {
        currentSubjects = subjects;
    } else {
        currentSubjects = subjects.filter(subject =>
            value === "Đang hoạt động" ? subject.status === "active" : subject.status === "inactive"
        );
    }
    currentPage = 1;
    renderSubjects(currentSubjects);
}




//ham tim kiem theo ten
function searchSubjects(inputElement) {
    const keyword = inputElement.value.trim().toLowerCase();
    currentSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(keyword)
    );
    currentPage = 1;
    renderSubjects(currentSubjects);
}





function getPaginatedSubjects(data, page) {
    const startIndex = (page - 1) * subjectsPerPage;
    const endIndex = startIndex + subjectsPerPage;
    return data.slice(startIndex, endIndex);
}




//ham sap xep
renderSubjects(getPaginatedSubjects(currentPage));
function sortSubjects(criteria) {
    if (criteria === "default") {
        currentSubjects = [...subjects];
    } else if (criteria === "name") {
        currentSubjects = [...subjects].sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "createdAt") {
        currentSubjects = [...subjects].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    currentPage = 1;
    renderSubjects(currentSubjects);
}





function lessonmanagement() {
    window.location.href = 'lessonmanagement.html'
}





