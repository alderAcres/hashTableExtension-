/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW
function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
}
HashTable.prototype.set = function(key, value) {
  //create var hash to store hashcode in
  const hash = hashCode(key,this.SIZE);
  //create count to store item count;
  let count = 0;
  //if size is over 75% of the tables size, double size and rehash everything
  if(count > this.SIZE * 0.75){
    //create new hash table
    let newTable = new HashTable();
    //double the size
    newTable.SIZE = this.SIZE * 2;
    //somehow rehash the old hash table;
    for(let element of this.storage){
      //store the old elements into the new table
        newTable.storage[element];
      }
      return newTable;
    }
  //if hash index is undefined
  if(this.storage[hash] === undefined){
    count += 1;
    //set that index to an empty object
    this.storage[hash] = {};
    //store item in object
    this.storage[hash][key] = value;
  } else{
    count += 1;
    console.log(count)
    this.storage[hash][key] = value;
  }
}
HashTable.prototype.get = function(key) {
  const hash = hashCode(key,this.SIZE);
  return this.storage[hash][key];
};

HashTable.prototype.remove = function(key) {
  const hash = hashCode(key,this.SIZE);
  //return undefined if key does not exist in table
  if(!this.storage[hash]) return undefined;
  //delete item from the hash table
  delete this.storage[hash];
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';
  
  let hash = 0;
  if (string.length === 0) return hash;
  
  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;


let table = new HashTable();
table.set('Aaron', 1)
table.set('Aon', 2)
table.set('Aarn', 3)
table.set('Aaro', 4)
table.set('Aa', 5)
table.set('aron', 6)
table.set('ron', 7)
table.set('on', 8)
table.set('n', 9)
table.set('sdaf', 10)
table.set('Adsads', 11)
console.log(table);