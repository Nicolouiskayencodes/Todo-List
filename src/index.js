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