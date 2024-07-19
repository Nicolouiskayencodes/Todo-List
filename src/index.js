import './style.css';
import construct from './list';


const projects = [];
function createProject(projectName) {
  let obj ={}
  let newProject = construct();
  obj[projectName] = newProject.getList();
  projects.push(obj);
  return newProject;
}

const todo = createProject('todo');

const button = document.querySelector('#submit');
button.addEventListener('click', function() {
  const title = document.querySelector('#title');
  const description = document.querySelector('#description');
  const date = document.querySelector('#date');
  const priority = document.querySelector('#priority');
  const notes = document.querySelector('#notes');
  const complete = false;
  todo.addItemToList(todo.createItem(title.value, description.value, date.value, priority.value, notes.value, complete));
  console.log(todo.getList());
  console.log(projects)
  title.value = '';
  description.value = '';
  date.value = '';
  notes.value = '';
})

const remove = document.querySelector('#remove');
remove.addEventListener('click', function(){
  todo.removeItem(0);
  console.log(todo.getList());
})

const complete = document.querySelector('#complete');
complete.addEventListener('click', function() {
  todo.complete(0);
  console.log(todo.getList()[0]);
})

function display() {
  const content = document.querySelector('#content');
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
    for (let item of projectList) {

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
      const itemcomplete = document.createElement('td');
      itemcomplete.textContent = item.complete;
      row.appendChild(itemcomplete);
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

display();