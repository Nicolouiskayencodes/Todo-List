import './style.css';
import construct from './list';
const todo = construct();

console.log(todo.getList())
todo.addItemToList(todo.createItem('pee', 'in the toilet', 'now', 'high', '', 'no'));
console.log(todo.getList());
todo.addItemToList(todo.createItem('read', 'my book', 'this week', 'low', '', 'no'))
console.log(todo.getList());

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
  title.value = '';
  description.value = '';
  date.value = '';
  notes.value = '';
})

const remove = document.querySelector('#remove');

remove.addEventListener('click', function(){
  todo.removeItem(0);
  console.log(todo.getList())
})