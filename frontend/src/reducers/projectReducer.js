const initialState = {
    projects:[{projects:'project 1'}],
    displayProjects:[],
    isProjectLoaded:false,
    currentProjectDetail:{
        user_id: 1,
        title: 'Testing',
        desc: 'Default msg for testing',
        user: {
            firstname:'first',
            lastname:'last'
        },
        status: 'Open'
    }
}

const projectsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ALL_PROJECTS':
            return {
                ...state,
                projects:action.projects,
                displayProjects:action.projects,
                isProjectLoaded:true,
                currentProjectDetail:action.projects[0]
            }
        case 'ADD_NEW_PROJECT':
            return {
                ...state,
                projects:[...state.projects, action.newProject],
                displayProjects:[...state.displayProjects, action.newProject],
                currentProjectDetail:state.currentProjectDetail
            }
        case 'CURRENT_PROJECT_DETAIL':
            return {
                ...state,
                currentProjectDetail:action.currentProject
            }
        case 'REMOVE_PROJECT':
            return {
                ...state,
                projects:state.projects.filter(project => project.id !== action.project.id),
                displayProjects:state.displayProjects.filter(project => project.id !== action.project.id)
            }
        case 'EDIT_PROJECT':
            return {
                ...state,
                displayProjects:action.payload.updatedProjects,
                currentProjectDetail:action.payload.updatedProject
            }
        case 'NEW_PROJECT_TICKET':

            let newProjectTicketList = []
            state.displayProjects.forEach(project=>{
                if(project.id === action.projectId){
                    let projectTicketListUpdated = {...project,project_tickets: [...project.project_tickets, action.newTicket]}
                    
                    console.log(projectTicketListUpdated)
                    debugger
                    newProjectTicketList = [...newProjectTicketList, projectTicketListUpdated]
                }else{
                    console.log(project)
                    newProjectTicketList = [...newProjectTicketList, project]
                }
            })
            console.log(newProjectTicketList)
            debugger
            let checking = [...state.currentProjectDetail.project_tickets, action.newTicket]
            console.log(checking)
            debugger
            return {
                ...state,
                displayProjects:newProjectTicketList,
                currentProjectDetail:[...state.currentProjectDetail.project_tickets, action.newTicket]
            }
        default:
            return state
    }
}
export default projectsReducer