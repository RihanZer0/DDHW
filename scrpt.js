console.log('hi')

const url = 'http://45.12.239.156:8081/api';
let token; let headers; let PRjCTid; let TASKidXML; let TASKidFetch; let TASKidAxios;
const user = {
	login: 'abelkhanov.r',
	password: 'jc63fk',
};

const xhr = new XMLHttpRequest();

xhr.open('POST', url+'/login');
xhr.responseType = 'json'
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.onload = () => {
    if (xhr.status >= 400) {
        console.log('ERROR: ', xhr.response)
    } else {
        token = (xhr.response)["token"];
        headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
    }
}
xhr.send(JSON.stringify(user));

function createPrjctXML ({name, code}) {
    xhr.open("POST", url+'/projects');
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.onload = () => {
        if (xhr.status >= 400) {
            console.log('ERROR: ', xhr.response)
        } else {
            console.log(xhr.response);
            PRjCTid = xhr.response._id;
            console.log('id нового проекта сохранён');
        }
    };
    xhr.send(JSON.stringify({name, code}));
}
const btnCreatePrjctXML = document.getElementById('createPrjctXML');
btnCreatePrjctXML.onclick = () => createPrjctXML({
    name: 'Проекта Имя',
    code: 'его код',
});

function getPrjctXML (id) {
    xhr.open("GET", url+'/projects/'+id);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log('Наш проект: ');
            console.log(xhr.response);
        } else if (xhr.status === 404) {
            console.log('Проект не найден');
        } else {
            console.log('ERROR: ', xhr.response);
        }
    };
    xhr.send();
}
const btnGetPrjctXML = document.getElementById('getPrjctXML');
btnGetPrjctXML.onclick = () => getPrjctXML(PRjCTid);

function editPrjctXML ({id, name}) {
    xhr.open("PUT", url+'/projects/');
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.onload = () => {
        if (xhr.status >= 400) {
            console.log('ERROR: ', xhr.response)
        } else {
            console.log('Проект изменён: ');
            console.log(xhr.response);
        }
    };
    xhr.send(JSON.stringify({_id: id, name}));
}
const btnEditPrjctXML = document.getElementById('editPrjctXML');
btnEditPrjctXML.onclick = () => editPrjctXML({
    id: PRjCTid,
    name: 'NEW проекта ИМЯ'
});

function deletePrjctXML (id) {
    xhr.open("DELETE", url+'/projects/'+id);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.onload = () => {
        if (xhr.status >= 400) {
            console.log('ERROR: ', xhr.response)
        } else {
            console.log(xhr.response);
            console.log(`Проект ${PRjCTid} удалён.`);
        }
    }       
    xhr.send();
}
const btnDeletePrjctXML = document.getElementById('deletePrjctXML');
btnDeletePrjctXML.onclick = () => deletePrjctXML(PRjCTid);


function createPrjctFetch ({name, code}) {
    fetch(url+'/projects', {
        method: "POST",
        headers: headers,
        body: JSON.stringify({name, code}),
    })
        .then((response) => {
            if (!response.ok) {
                throw response.json()
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            PRjCTid = data._id;
            console.log('id нового проекта сохранён');
        })
        .catch((error) => error.then(res => console.log('ERROR: ', res)));
}
const btnCreatePrjctFetch = document.getElementById('createPrjctFetch');
btnCreatePrjctFetch.onclick = () => createPrjctFetch ({
    name: 'Проекта Имя',
    code: 'его код',
});

function getPrjctFetch (id) {
    fetch(url+'/projects/'+id, {
        method: "GET",
        headers,
    })
        .then((response) => {
            if (!response.ok) {
                throw response.json()
            }
            return response.json()})
        .then((data) => {
            console.log('Наш проект: ');
            console.log(data);
        })
        .catch((error) => error.then(res => console.log('ERROR: ', res)));
}
const btnGetPrjctFetch = document.getElementById('getPrjctFetch');
btnGetPrjctFetch.onclick = () => getPrjctFetch(PRjCTid);

function editPrjctFetch ({id, name}) {
    fetch(url+'/projects', {
        method: "PUT",
        headers,
        body: JSON.stringify({_id: id, name}),
    })
        .then((response) => {
            if (!response.ok) {
                throw response.json()
            }
            return response.json()})
        .then((data) => {
            console.log('Проект изменён: ');
            console.log(data);
        })
        .catch((error) => error.then(res => console.log('ERROR: ', res)));
}
const btnEditPrjctFetch = document.getElementById('editPrjctFetch');
btnEditPrjctFetch.onclick = () => editPrjctFetch({
    id: PRjCTid,
    name: 'NEW проекта ИМЯ'
});

function deletePrjctFetch (id) {
    fetch(url+'/projects/'+id, {
        method: "DELETE",
        headers,
    })
        .then((response) => {
            if (!response.ok) {
                throw response.json()
            }
            return response.json()})
        .then((data) => {
            console.log(data);
            console.log(`Проект ${PRjCTid} удалён.`)
        })
        .catch((error) => error.then(res => console.log('ERROR: ', res)));
}
const btnDeletePrjctFetch = document.getElementById('deletePrjctFetch');
btnDeletePrjctFetch.onclick = () => deletePrjctFetch(PRjCTid);


function createPrjctAxios ({name, code}) {
    axios
        .post(
            url+'/projects',
            {name, code},
            {headers: {Authorization: `Bearer ${token}`}}
        )
        .then((data) => {
            console.log(data.data);
            PRjCTid = data.data._id;
            console.log('id нового проекта сохранён');
        })
        .catch((error) => console.log('ERROR: ', error.response.data));
}
const btnCreatePrjctAxios = document.getElementById('createPrjctAxios');
btnCreatePrjctAxios.onclick = () => createPrjctAxios ({
    name: 'Проекта Имя',
    code: 'его код',
});

function getPrjctAxios (id) {
    axios
        .get(
            url+'/projects/'+id,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        .then((data) => {
            console.log('Наш проект: ');
            console.log(data.data);
        })
        .catch((error) => console.log('ERROR: ', error.response.data));
}
const btnGetPrjctAxios = document.getElementById('getPrjctAxios');
btnGetPrjctAxios.onclick = () => getPrjctAxios(PRjCTid);

function editPrjctAxios ({id, name}) {
    axios
        .put(
            url+'/projects/',
            { _id: id, name },
            {headers: {Authorization: `Bearer ${token}`}}
        )
        .then((data) => {
            console.log('Проект изменён: ');
            console.log(data.data);
        })
        .catch((error) => console.log('ERROR: ', error.response.data));
}
const btnEditPrjctAxios = document.getElementById('editPrjctAxios');
btnEditPrjctAxios.onclick = () => editPrjctAxios({
    id: PRjCTid,
    name: 'NEW проекта ИМЯ'
});

function deletePrjctAxios (id) {
    axios
        .delete(url+'/projects/'+id,
        {headers: {Authorization: `Bearer ${token}`}}
        )
        .then((data) => {
            console.log(data.data);
            console.log(`Проект ${PRjCTid} удалён.`)
        })
        .catch((error) => console.log('ERROR: ', error.response.data));
}
const btnDeletePrjctAxios = document.getElementById('deletePrjctAxios');
btnDeletePrjctAxios.onclick = () => deletePrjctAxios(PRjCTid);



function createTaskXML ({name, description, projectId}) {
    xhr.open("POST", url+'/tasks');
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.onload = () => {
        if (xhr.status >= 400) {
            console.log('ERROR: ', xhr.response)
        } else {
            console.log(xhr.response);
            TASKidXML = xhr.response._id;
            console.log('id новой задачи сохранён(XML)');
        }
    };
    xhr.send(JSON.stringify({name, description, projectId}));
}
const btnCreateTaskXML = document.getElementById('createTaskXML');
btnCreateTaskXML.onclick = () => createTaskXML({
    name: "XML Задачи Имя", 
    description: "описание", 
    projectId: PRjCTid,
});

function getTaskXML (id) {
    xhr.open("GET", url+'/tasks/'+id);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log('Наша задача(XML): ');
            console.log(xhr.response);
        } else if (xhr.status === 404) {
            console.log('Задача не найдена');
        } else {
            console.log('ERROR: ', xhr.response);
        }
    };
    xhr.send();
}
const btnGetTaskXML = document.getElementById('getTaskXML');
btnGetTaskXML.onclick = () => getTaskXML(TASKidXML);

function editTaskXML ({id, name, description}) {
    xhr.open("PUT", url+'/tasks/');
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.onload = () => {
        if (xhr.status >= 400) {
            console.log('ERROR: ', xhr.response)
        } else {
            console.log('Задача обновлена(XML): ');
            console.log(xhr.response);
        }
    };
    xhr.send(JSON.stringify({_id: id, name, description}));
}
const btnEditTaskXML = document.getElementById('editTaskXML');
btnEditTaskXML.onclick = () => editTaskXML({
    id: TASKidXML,
    name: "NEW задачи ИМЯ", 
    description: "XML описание"
});

function deleteTaskXML (id) {
    xhr.open("DELETE", url+'/tasks/'+id);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.onload = () => {
        if (xhr.status >= 400) {
            console.log('ERROR: ', xhr.response)
        } else {
            console.log(xhr.response);
            console.log(`Задача ${TASKidXML} удалена(XML).`)
        }
    }       
    xhr.send();
}
const btnDeleteTaskXML = document.getElementById('deleteTaskXML');
btnDeleteTaskXML.onclick = () => deleteTaskXML(TASKidXML);


async function createTaskFetch ({name, description, projectId}) {
    try{
        const response = await fetch(url+'/tasks', {
            method: "POST",
            headers,
            body: JSON.stringify({name, description, projectId}),
        })
        const data = await response.json();
        if (!response.ok) {
            throw data
        }
        console.log(data);
        TASKidFetch = data._id;
        console.log('id новой задачи сохранён(Fetch)');
    } catch (error) {console.log('ERROR: ', error)}
}
const btnCreateTaskFetch = document.getElementById('createTaskFetch');
btnCreateTaskFetch.onclick = () => createTaskFetch({
    name: "Fetch Задачи Имя", 
    description: "описание", 
    projectId: PRjCTid,
});

async function getTaskFetch (id) {
    try{
        const response = await fetch(url+'/tasks/'+id, {
        method: "GET",
        headers,
        })
        const data = await response.json();
        if (!response.ok) {
            throw data
        }
        console.log('Наша задача(Fetch): ');
        console.log(data)
    } catch (error) {console.log('ERROR: ', error)}
}
const btnGetTaskFetch = document.getElementById('getTaskFetch');
btnGetTaskFetch.onclick = () => getTaskFetch(TASKidFetch);

async function editTaskFetch ({id, name, description}) {
    try{
        const response = await fetch(url+'/tasks', {
            method: "PUT",
            headers,
            body: JSON.stringify({
                _id: id,
                name, 
                description
            }),
        })
        const data = await response.json();
        if (!response.ok) {
            throw data
        }
        console.log('Задача обновлена(Fetch): ');
        console.log(data);
    } catch (error) {console.log('ERROR: ', error)}
}
const btnEditTaskFetch = document.getElementById('editTaskFetch');
btnEditTaskFetch.onclick = () => editTaskFetch({
    id: TASKidFetch,
    name: "NEW задачи ИМЯ", 
    description: "Fetch описание",
});

async function deleteTaskFetch (id) {
    try{
        const response = await fetch(url+'/tasks/'+id, {
            method: "DELETE",
            headers,
        })
        const data = await response.json();
        if (!response.ok) {
            throw data
        }
        console.log(data);
        console.log(`Задача ${TASKidFetch} удалена(Fetch).`);
    } catch (error) {console.log('ERROR: ', error)}
}
const btnDeleteTaskFetch = document.getElementById('deleteTaskFetch');
btnDeleteTaskFetch.onclick = () => deleteTaskFetch(TASKidFetch);


async function createTaskAxios ({name, description, projectId}) {
    try {
        const data = await axios.post(url+'/tasks',
            {name, description, projectId},
            {headers: {Authorization: `Bearer ${token}`}}
        )
        console.log(data.data);
        TASKidAxios = data.data._id;
        console.log('id новой задачи сохранён(Axios)');
    } catch (error) {console.log('ERROR: ', error.response.data)}
}
const btnCreateTaskAxios = document.getElementById('createTaskAxios');
btnCreateTaskAxios.onclick = () => createTaskAxios({
    name: "Axios Задачи Имя", 
    description: "описание", 
    projectId: PRjCTid,
});

async function getTaskAxios (id) {
    try {
        const data = await axios.get(url+'/tasks/'+id,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        console.log('Наша задача(Axios): ');
        console.log(data.data)
    } catch (error) {console.log('ERROR: ', error.response.data)}
}
const btnGetTaskAxios = document.getElementById('getTaskAxios');
btnGetTaskAxios.onclick = () => getTaskAxios(TASKidAxios);

async function editTaskAxios ({id, name, description}) {
    try {
        const data = await axios.put(url+'/tasks',
            {_id: id, name, description},
            {headers: {Authorization: `Bearer ${token}`}}
        )
        console.log('Задача обновлена(Axios): ');
        console.log(data.data);
    } catch (error) {console.log('ERROR: ', error.response.data)}
}
const btnEditTaskAxios = document.getElementById('editTaskAxios');
btnEditTaskAxios.onclick = () => editTaskAxios({
    id: TASKidAxios,
    name: "NEW задачи ИМЯ", 
    description: "Axios описание",
});

async function deleteTaskAxios (id) {
    try {
        const data = await axios.delete(url+'/tasks/'+id,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        console.log(data.data)
        console.log(`Задача ${TASKidAxios} удалена(Axios).`);
    } catch (error) {console.log('ERROR: ', error.response.data)}
}
const btnDeleteTaskAxios = document.getElementById('deleteTaskAxios');
btnDeleteTaskAxios.onclick = () => deleteTaskAxios(TASKidAxios);