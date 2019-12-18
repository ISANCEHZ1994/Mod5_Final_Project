const usersURL = 'http://localhost:3000/api/v1/users/'
const projectsURL = 'http://localhost:3000/api/v1/projects/'
const ticketsURL = 'http://localhost:3000/api/v1/project_tickets/'

//sends type back to call the right reducer
export const handleUsersAsnc = (userData) => {
    return { type: 'ALL_USERS', users: userData}
}
//fetching all users in the DB and send t the handleUserAsnc fn to find the right reducer
export const handleUsers = dispatch => {
    console.log('attempting fetch user')
    fetch(usersURL, {
        method:"GET",
        headers:{
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    .then(res => res.json())
    .then(userData =>{
        console.log('fetching user')
        console.log(userData)
        dispatch(handleUsersAsnc(userData))
    })  
}

export const handleProjectsAsnc = (allProjectData) => {
    return { type: 'ALL_PROJECTS', projects: allProjectData}
}

export const handleProjects = dispatch => {
    fetch(projectsURL , {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    .then(res => res.json())
    .then(allProjectData =>{
        dispatch(handleProjectsAsnc(allProjectData))
    })
}

export const handleTicketsAsnc = (ticketsData) => {
    return { type: 'ALL_TICKETS', tickets: ticketsData}
}

export const handleTickets = dispatch => {
    console.log('attempting fetch ticket')
    fetch(ticketsURL, {
        method:"GET",
        headers:{
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    .then(res => res.json())
    .then(ticketData =>{
        console.log('fetching ticket')
        console.log(ticketData)
        dispatch(handleUsersAsnc(ticketData))
    })  
}

export const handleNewUser = (e) => {
    e.preventDefault()
    fetch(usersURL, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": {
                username:e.target[2].value,
                email:e.target[3].value,
                password:e.target[4].value,
                role:'N/A',
                firstname:e.target[0].value,
                lastname:e.target[1].value,
            }
        })
    })
}

export const handleNewProjectAsnc = (newProject) => {
    return {type:'ADD_NEW_PROJECT', newProject}
}

export const handleNewProject = (e) => {
    return dispatch => {
        e.preventDefault()
        
        fetch(projectsURL, {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "project": {
                    user_id:localStorage.id,
                    title:e.target[0].value,
                    desc:e.target[1].value,
                    status:'Open'
                }
            })
        })
        .then(res=>res.json())
        .then(newProject => {
            dispatch(handleNewProjectAsnc(newProject))
        })
    }
}

export const handleShowProject = (currentProject) => {
    return {type:'CURRENT_PROJECT_DETAIL', currentProject}
}

export const removeProject = dispatch => {
    console.log('removing')
}

export const login = (obj,history) => {
    fetch("http://localhost:3000/api/v1/login", {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                username: obj[0].value,
                password: obj[1].value
      })
    })
    .then(res=>res.json())
    .then(userInfo=> {
        localStorage.username = userInfo.username
        localStorage.id=userInfo.id
        localStorage.firstname=userInfo.firstname
        localStorage.lastname=userInfo.lastname
        localStorage.email=userInfo.email
        localStorage.role = userInfo.role
        localStorage.token = userInfo.token
        if(userInfo.token){
            history.push('/home')
        }
    })
}

// login = (e) => {
//     e.preventDefault()
//     fetch("http://localhost:3000/api/v1/login",{
//         method: 'POST',
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//                 username: this.state.username,
//                 password: this.state.password
//       })
//     })
//     .then(res=> res.json())
//     .then(userInfo => {
//         localStorage.username = userInfo.username
//         localStorage.point= userInfo.point
//         localStorage.id=userInfo.id
//         localStorage.token = userInfo.token
//         if(userInfo.token){
//             this.props.history.push('/flatironrental/cars')
//         }
//     })
// }


// export const handleProjectsAsnc = (data) => {
//     return { type: 'ALL_PROJECTS', projects: data}
// }

// export const handleProjects = () =>{
//     return dispatch => {
//         fetch(usersURL, {
//             method:"GET"
//         })
//         .then(res => res.json())
//         .then(projectData =>{
//             dispatch(handleProjectsAsnc(projectData))
//         })
//     }
// }

// export const testing = () => {
//     // return dispatch(console.log('testing'))
//     return {type: 'TESTING'}
// }