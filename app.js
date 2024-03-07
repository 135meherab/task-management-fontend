const user_id = localStorage.getItem("user_id");
const token = localStorage.getItem("token");

const logout = () => {
  fetch('https://task-management-api-7vv5.onrender.com/account/logout/',{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    }
  })
  .then((res) =>{ 
    if (res.ok){
      
      return res.json();
    }
    else{
      console.error(res.statusText)
    }
    })
  .then((data) =>{
    console.log(data);
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    window.location.reload();
  })
}



const navbarButton = document.getElementById("nav-buttons");

const homebody = document.getElementById("home-body");

if (user_id && token) {
  navbarButton.innerHTML = ` <a id="logoutBtn" class="btn btn-danger" >Logout</a>`;
  
  document.getElementById('logoutBtn').addEventListener('click', logout);
} else {
  navbarButton.innerHTML = `
    <a class="btn btn-success" href="login.html">Login</a>
    <a class="btn btn-success" href="register.html">Register</a>`;
}

const usertask = () => {
  fetch(`https://task-management-api-7vv5.onrender.com/task/list/?user=${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,}
  })
    .then((res) => res.json())
    .then((data) => loadTaks(data));
};

const loadTaks = (data) => {
  console.log(data);
  data.forEach((task) => {
    const tablebody = document.getElementById("tbody");
    const tr = document.createElement("tr");
    tr.classList.add("fw-normal")

    let priorityClass = ""
    if (task.priority==='High'){
      priorityClass = "bg-danger"
    }
    else if (task.priority==='Medium')
    {
      priorityClass = "bg-warning"
    }
    else{
      priorityClass = "bg-success"
    }
    tr.innerHTML = `
      <td class="align-middle">
        <span>${task.title}</span>
      </td>
      <td class="align-middle">
        <h6 class="mb-0"><span class="badge ${priorityClass}">${task.priority}</span></h6>
      </td>
      <td class="align-middle">
        <h6 class="mb-0"><span">${task.due_date}</span></h6>
      </td>
      <td class="align-middle">
        ${task.is_complete ? `<button class="btn btn-success" disabled>Completed</button>`:`<a href="#" onclick='updatedata(${task.id})' data-mdb-toggle="tooltip" title="Done"><i class="fas fa-check fa-lg text-success me-3"></i></a>
        <a href="#" onclick='deletetask(${task.id})'  data-mdb-toggle="tooltip" title="Remove"><i class="fas fa-trash-alt fa-lg text-danger"></i></a>`}
      </td>
    `;
    tablebody.appendChild(tr);
  });
};

const updatedata = (id) =>{
fetch(`https://task-management-api-7vv5.onrender.com/task/complete/${id}`,{
  method :"PUT",
  headers : {
    "Content-Type": "application/json",
    "Authorization": `Token ${token}`,},
  body : JSON.stringify({"is_complete" :true})
})
.then(res => res.json)
.then(data => {
  console.log("updated successfully");
  window.location.reload();
  console.log(data);
})
};

const deletetask = (id) =>{
fetch(`https://task-management-api-7vv5.onrender.com/task/delete/${id}`,{
  method :"DELETE",
  headers : {
    "Content-Type": "application/json",
    "Authorization": `Token ${token}`,},
})
.then(res => res.json)
.then(data => {
  console.log("Deleted successfully");
  window.location.reload();
  console.log(data);
})
};
usertask();
