import './style.css';
import construct from './list';


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
  const notes = document.querySelector('#notes');
  const complete = false;
  listname.addItemToList(listname.createItem(title.value, description.value, date.value, priority.value, notes.value, complete));
  title.value = '';
  description.value = '';
  date.value = '';
  notes.value = '';
  display()
})

function display() {
  const content = document.querySelector('#content');
  content.textContent = '';
  for (let project of projects) {
    const projectTable = document.createElement('table');
    projectTable.classList.add('project-table');
    const caption = document.createElement('caption');
    caption.classList.add('project-caption');
    caption.textContent = Object.keys(project)[0];
    projectTable.appendChild(caption);

    const thead = document.createElement('thead');
    const titlehead = document.createElement('th');
    titlehead.textContent = 'Task';
    thead.appendChild(titlehead);

    const descriptionhead = document.createElement('th');
    descriptionhead.textContent = 'Description';
    thead.appendChild(descriptionhead);

    const duehead = document.createElement('th');
    duehead.textContent = 'Due Date';
    thead.appendChild(duehead);

    const priorityhead = document.createElement('th');
    priorityhead.textContent = 'Priority';
    thead.appendChild(priorityhead);

    const noteshead = document.createElement('th');
    noteshead.textContent = 'Notes';
    thead.appendChild(noteshead);

    const completehead = document.createElement('th');
    completehead.textContent = 'Complete';
    thead.appendChild(completehead);

    projectTable.appendChild(thead);
    const body = document.createElement('tbody');

    let projectList = project[Object.keys(project)];
    for (let item of projectList.getList()) {

      const row = document.createElement('tr');
      const itemtitle = document.createElement('td');
      itemtitle.textContent = item.title;
      row.appendChild(itemtitle);
      const itemdescription = document.createElement('td');
      itemdescription.textContent = item.description;
      row.appendChild(itemdescription);
      const itemdue = document.createElement('td');
      itemdue.textContent = item.dueDate;
      row.appendChild(itemdue);
      const itempriority = document.createElement('td');
      itempriority.textContent = item.priority;
      row.appendChild(itempriority);
      const itemnotes = document.createElement('td');
      itemnotes.textContent = item.notes;
      row.appendChild(itemnotes);

      const itemcomplete = document.createElement('button');
      if (item.complete === true) {
        itemcomplete.textContent = '✓';
      } else if (item.complete === false) {
        itemcomplete.textContent = ''
      }
      itemcomplete.addEventListener('click', function() {
        projectList.complete(projectList.getList().indexOf(item));
        display();
      })
      const tdcomplete = document.createElement('td');
      tdcomplete.appendChild(itemcomplete);
      row.appendChild(tdcomplete);
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function() {
        projectList.removeItem(projectList.getList().indexOf(item))
        display();
      })
      row.appendChild(removeButton);
      body.appendChild(row);
    }
    projectTable.appendChild(body);
    content.appendChild(projectTable);
  }
}
const homework = createProject('homework');
homework.addItemToList(homework.createItem('math', 'differentials', 'tomorrow', 'high', 'none', true));
homework.addItemToList(homework.createItem('read', 'red letter', 'friday', 'medium', '3 chapters', false));
todo.addItemToList(todo.createItem('hi', 'ok', 'never', 'low', '', false));
todo.addItemToList(todo.createItem('cook', 'food', 'tonight', 'hgih', 'im hungry', false));

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
  createProject(name);
  display();
  selectDisplay();
})
selectDisplay();
display();