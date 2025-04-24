const deletemodal = document.getElementById("deleteModal");
const cancelBtn = document.getElementById("cancelBtn");
const deleteIcons = document.querySelectorAll(".delete-icon");

deleteIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        deletemodal.classList.remove("hidden");
    });
});

cancelBtn.addEventListener("click", () => {
    deletemodal.classList.add("hidden");
});
function openaddModal() {
    document.getElementById("modaladd").classList.remove("hidden");
    document.getElementById("namesubject").value = "";
    document.getElementById("error").innerText = "";
}

function closeaddModal() {
    document.getElementById("modaladd").classList.add("hidden");
}
function openupdate() {
    document.getElementById("modalupdate").classList.remove("hidden");
    document.getElementById("namesubject").value = "";
    document.getElementById("error").innerText = "";
}
function closeupdate() {
    document.getElementById("modalupdate").classList.add("hidden");
}
// function add() {
//     const tenMon = document.getElementById("namesubject").value.trim();
//     const errorDiv = document.getElementById("error");
//     if (tenMon === "") {
//         errorDiv.innerText = "Vui lòng nhập tên môn học.";
//         return;
//     }
//     alert("✅ Đã thêm môn học: " + tenMon);
//     dongModal();
// }