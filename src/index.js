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
  const complete = false;
  listname.addItemToList(listname.createItem(title.value, description.value, date.value, priority.value, '', complete));
  title.value = '';
  description.value = '';
  date.value = '';
  display()
})

function display() {
  const content = document.querySelector('#content');
  content.textContent = '';
  for (let project of projects) {
    if (project[Object.keys(project)].getList().length > 0){
    const projectTable = document.createElement('div');
    projectTable.classList.add('project-table');
    const caption = document.createElement('h1');
    caption.classList.add('project-caption');
    caption.textContent = Object.keys(project)[0];
    projectTable.appendChild(caption);

    let projectList = project[Object.keys(project)];
    for (let item of projectList.getList()) {
      const row = document.createElement('div');
      const completeContainer = document.createElement('div');
      row.appendChild(completeContainer);
      function completeButton() {
      const itemcomplete = document.createElement('button');
        if (item.complete === true) {
          itemcomplete.textContent = '✓';
       } else if (item.complete === false) {
          itemcomplete.textContent = ''
        }
        itemcomplete.addEventListener('click', function() {
          completeContainer.textContent = '';
          projectList.complete(projectList.getList().indexOf(item));
          completeButton()
        })
        completeContainer.appendChild(itemcomplete);
      }
      completeButton();

      const itemtitle = document.createElement('button');
      itemtitle.textContent = item.title;
      row.appendChild(itemtitle);
      const itemdue = document.createElement('p');
      itemdue.textContent = item.dueDate;
      row.appendChild(itemdue);

      const toggle = document.createElement('div');
      itemtitle.addEventListener('click', function() {
        if (toggle.classList.contains('open') !== true) {
          const itempriority = document.createElement('p');
          itempriority.textContent = item.priority;
          toggle.appendChild(itempriority);
          const itemdescription = document.createElement('p');
          itemdescription.textContent = item.description;
          toggle.appendChild(itemdescription);
          const itemnotes = document.createElement('textarea');
          itemnotes.classList.add('notes');
          itemnotes.setAttribute('placeholder', '...');
          itemnotes.addEventListener('change', function() {
            projectList.notes(itemnotes.value);
            item.notes = itemnotes.value;
          })
          itemnotes.textContent = item.notes;

          toggle.appendChild(itemnotes);
          const removeButton = document.createElement('button');
          removeButton.textContent = 'Remove';
          removeButton.addEventListener('click', function() {
            projectList.removeItem(projectList.getList().indexOf(item))
            row.remove();
          })
          toggle.appendChild(removeButton);
          toggle.classList.add('open');
        } else if (toggle.classList.contains('open') === true) {
          toggle.textContent = '';
          toggle.classList.remove('open');
        }
      })
      row.appendChild(toggle);
      projectTable.appendChild(row);
    content.appendChild(projectTable);
  }
  }}
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