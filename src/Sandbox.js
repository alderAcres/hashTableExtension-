const {HashTable} = require('./main');
const {LinkedList} = require('./main');
const {Node} = require('./main');

console.log( HashTable, LinkedList, Node);

let table = new HashTable();

table.set("Aaron@gmail.com", "password123");

table.set("Aaron1@gmail.com", "123456");
table.set("Aaron1@gmail.com", "123456");
table.set("Aaron2@gmail.com", "123456");
table.set("Aaron3@gmail.com", "123456");


console.log(table);
console.log(table.ITEMS);
debugger;