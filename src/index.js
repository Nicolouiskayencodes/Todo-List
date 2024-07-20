import './style.css';
import construct from './list';
import {formatRelative} from 'date-fns';

const projects = [];
function createProject(projectName) {
  let obj ={}
  let newProject = construct();
  obj[projectName] = newProject;
  projects.push(obj);
  return newProject;
}

const todo = createProject('todo');

const button = document.querySelector('#submit');
button.addEventListener('click', function() {
  const project = document.querySelector('#project');
  let listname;
  for (let item of projects) {
    if (Object.keys(item)[0] === project.value) {
      listname = item[Object.keys(item)];
    }
  }
  const title = document.querySelector('#title');
  const description = document.querySelector('#description');
  const date = document.querySelector('#date');
  const priority = document.querySelector('#priority');
  const complete = false;
  listname.addItemToList(listname.createItem(title.value, description.value, date.value, priority.value, '', complete));
  title.value = '';
  description.value = '';
  date.value = '';
  sendStorage()
  display()
})

function display() {
  const content = document.querySelector('#content');
  content.textContent = '';
  for (let project of projects) {
    if (project[Object.keys(project)].getList().length > 0){
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-table');
    const caption = document.createElement('button');
    caption.classList.add('project-caption');
    caption.textContent = Object.keys(project)[0];
    projectContainer.appendChild(caption);
    const projectTable = document.createElement('div');
    showProject();
    caption.addEventListener('click', function() {showProject()})
      function showProject(){
      if (projectContainer.classList.contains('active') === true ){
        projectTable.textContent = '';
        projectContainer.classList.remove('active');
      } else if (projectContainer.classList.contains('active') !== true) {
        projectContainer.classList.add('active');
        let projectList = project[Object.keys(project)];
    for (let item of projectList.getList()) {
      const row = document.createElement('div');
      row.classList.add('task-container');
      const completeContainer = document.createElement('div');
      completeContainer.classList.add('complete-container');
      row.appendChild(completeContainer);
      function completeButton() {
      const itemcomplete = document.createElement('button');
      itemcomplete.classList.add('complete');
        if (item.complete === true) {
          itemcomplete.textContent = '✓';
       } else if (item.complete === false) {
          itemcomplete.textContent = ''
        }
        itemcomplete.addEventListener('click', function() {
          completeContainer.textContent = '';
          projectList.complete(projectList.getList().indexOf(item));
          sendStorage();
          completeButton();
        })
        completeContainer.appendChild(itemcomplete);
      }
      completeButton();

      const itemtitle = document.createElement('button');
      itemtitle.classList.add('item-title')
      itemtitle.textContent = item.title;
      row.appendChild(itemtitle);
      const itemdue = document.createElement('p');
      if (item.dueDate !== '') {itemdue.textContent = formatRelative(item.dueDate, new Date())};
      row.appendChild(itemdue);

      const toggle = document.createElement('div');
      itemtitle.addEventListener('click', function() {
        if (toggle.classList.contains('open') !== true) {
          const itemdescription = document.createElement('p');
          itemdescription.textContent = item.description;
          toggle.appendChild(itemdescription);
          const itempriority = document.createElement('p');
          itempriority.textContent = 'Priority: ' + item.priority;
          toggle.appendChild(itempriority);
          const itemnotes = document.createElement('textarea');
          itemnotes.classList.add('notes');
          itemnotes.setAttribute('placeholder', 'Add notes...');
          itemnotes.addEventListener('change', function() {
            projectList.notes(itemnotes.value);
            item.notes = itemnotes.value;
            sendStorage()
          })
          itemnotes.textContent = item.notes;

          toggle.appendChild(itemnotes);
          const removeButton = document.createElement('button');
          removeButton.textContent = '✕';
          removeButton.addEventListener('click', function() {
            projectList.removeItem(projectList.getList().indexOf(item))
            sendStorage()
            row.remove();
          })
          toggle.appendChild(removeButton);
          toggle.classList.add('open');
          row.classList.add('open-task');
        } else if (toggle.classList.contains('open') === true) {
          toggle.textContent = '';
          toggle.classList.remove('open');
          row.classList.remove('open-task');
        }
      })
      row.appendChild(toggle);
      projectTable.appendChild(row);
      projectContainer.appendChild(projectTable);
  }
      }
    }
    content.appendChild(projectContainer);
  }}
}


function selectDisplay() {
  const projectselect = document.querySelector('#project');
  projectselect.textContent = '';
  for (let project of projects) {
    const selectoption = document.createElement('option');
    selectoption.value = Object.keys(project)[0];
    selectoption.textContent = Object.keys(project)[0]
    if (projects.indexOf(project) === projects.length-1) {
      selectoption.selected = true;
    }
    projectselect.appendChild(selectoption);}
}
const newProject = document.querySelector('#create-project');
newProject.addEventListener('click', function() {
  const name = prompt('Project name:');
  if (name !== null) {
  createProject(name);
  sendStorage();
  display();
  selectDisplay();
  }
})
const storageprojects = {};
function sendStorage(){
  for (let project of projects) {
    const projectname = Object.keys(project)[0];
    const projectcontent = project[Object.keys(project)].getList();
    storageprojects[projectname] = projectcontent;
  }
  const projectstring = JSON.stringify(storageprojects);
  localStorage.setItem('todo', projectstring);
}

function getStorage() {
  const stored = JSON.parse(localStorage.getItem('todo'));
  if (stored !== null){
  for (let key of Object.keys(stored)){
    const project = createProject(key);
    const values = stored[key];
    for (let item of values) {
      project.addItemToList(project.createItem(item.title, item.description, item.dueDate, item.priority, item.notes, item.complete))
    }
  }
}

}
getStorage();
selectDisplay();
display();