const handelRegistration = (event) => {
    event.preventDefault();
    const username = getValue('username')
    const first_name = getValue('first_name')
    const last_name = getValue('last_name')
    const email = getValue('email')
    const password = getValue('password')
    const confirm_password = getValue('password1')

    const info = ({
        username,
        first_name, 
        last_name, 
        email, 
        password, 
        confirm_password
    })

    if (password === confirm_password){
        console.log(info)
        fetch('https://task-management-api-7vv5.onrender.com/account/sign_up/',
        {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(info),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            window.location.href = 'index.html';
        })
    }
    else{
        alert("password and confirm password do not match")
    }
}


const getValue = (id) => {
    return document.getElementById(id).value
}

const handelLgoin = (event) => {
    event.preventDefault()
    const username = getValue('username')
    const password = getValue('password')
    fetch('https://task-management-api-7vv5.onrender.com/account/login/',
        {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({username, password}),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem('token', data.token)
            localStorage.setItem('user_id', data.user_id)
            // window.location.reload();
            window.location.href = 'index.html';
    })
}


