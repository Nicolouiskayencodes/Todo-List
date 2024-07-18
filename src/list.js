export default function todo(){

  const list = []
  function createItem(title, description, dueDate, priority, notes, complete){
    return {title, description, dueDate, priority, notes, complete}

  }
  function addItemToList(item) {
    list.push(item);
  }
  const getList = () => list;
  function removeItem(num) {
    list.splice(num, 1);
  }
  return {getList, createItem, addItemToList, removeItem};
}