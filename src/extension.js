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

//////////////////////////// PASTE AND MODIFY YOUR CODE BELOW

// construct a new hash table
function HashTable() {
  this.SIZE = 10;
  
  this.storage = new Array(this.SIZE);
  for (let i=0; i<this.SIZE; i++){
    this.storage[i] = {}
  }
}
const testHash = new HashTable()
// console.log(testHash)


// adds a value to the hash table
HashTable.prototype.set = function(key, value) {
  const hash = hashCode(key, this.SIZE); // get the hash code

  this.storage[hash][key] = value
};

testHash.set('asdf',3)
testHash.set('sdfa',5)
// console.log(testHash)

// retrieve a value from hash table
HashTable.prototype.get = function(key) {
  const hash = hashCode(key, this.SIZE);

  return this.storage[hash][key]
};

// console.log(testHash.get('sdfa'))


// Delete a key/value pair from the hash table
HashTable.prototype.remove = function(key) {
  let hash = hashCode(key, this.SIZE);

  delete this.storage[hash][key]
};

testHash.remove('asdf')
// console.log(testHash)


// Do not modify
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

//////////////////////////////// YOUR CODE ABOVE

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
