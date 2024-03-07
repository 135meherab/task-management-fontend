user = localStorage.getItem('user_id');
const addtask = (event) => {
    event.preventDefault();
    const title = getValue('title')
    const description = getValue('description')
    const due_date = getValue('due_date')
    const priority = getValue('priority')
    const data = ({
        user,
        title,
        description,
        due_date,
        priority,
    })
    fetch(`https://task-management-api-7vv5.onrender.com/task/list/`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = 'index.html';
      console.log(data);})
  } 
  