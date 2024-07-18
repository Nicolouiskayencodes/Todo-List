import './style.css';
import construct from './list';

const todo = construct();
const pee = todo.createItem('pee', 'in the toilet', 'now', 'high', '', 'no');
console.log(pee);
todo.addItemToList(pee);
console.log(todo.getList());