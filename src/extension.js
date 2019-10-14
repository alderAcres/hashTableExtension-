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

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function (key, value) {
  // passing the key and the default size into hashCode to find the index (insertion point) 
  let insertionPt = hashCode(key, this.SIZE);
  // console.log(insertionPt);

  // If adding the new item will push the number of stored items to over 75% of the hash table's SIZE, then double the hash table's SIZE and rehash everything

  // if MORE THAN 12 spots / 16 spots in the this.storage array is filled with non undefined -> we need to double this.SIZE and rehash
  let threshhold = this.SIZE * 0.75; // 12 in the first case with this.SIZE = 16
  let counter = 0;

  for (let i = 0; i < this.storage.length; i += 1) {
    if (this.storage[i] !== undefined) counter += 1;
  }
  console.log(counter);

  // doubling this.SIZE when counter (the amount of non undefined elements in this.storage) is > thershhold 
  if (counter > threshhold) {
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE); // create new empty array with undefined with the newly doubled size
    for (let i = 0; i < this.storage.length; i += 1) {
      this.storage[i] = undefined;
    }
  }
  console.log(this.storage);

  // if at the insertion point of the array is undefined -> we put an empty object and then populate with key value pair
  if (this.storage[insertionPt] === undefined) {
    this.storage[insertionPt] = {};
  }
  this.storage[insertionPt][key] = value;
};

/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function (key) {
  // passing the key and the default size into hashCode to find the index (insertion point)
  let insertionPt = hashCode(key, this.SIZE);

  // go to the insertion point (index) in the this.storage array and use key to find value to return 
  return this.storage[insertionPt][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  // passing the key and the default size into hashCode to find the index (insertion point)
  let insertionPt = hashCode(key, this.SIZE);

  // store the item that you want to remove in a variable
  const itemToRemove = this.storage[insertionPt][key];

  // delete the key value pair in the object
  delete this.storage[insertionPt];

  // return the item to remove that you stored
  return itemToRemove;
};


// // Do not modify
// function hashCode(string, size) {
//   'use strict';

//   let hash = 0;
//   if (string.length === 0) return hash;

//   for (let i = 0; i < string.length; i++) {
//     const letter = string.charCodeAt(i);
//     hash = ((hash << 5) - hash) + letter;
//     hash = hash & hash; // Convert to 32bit integer
//   }

//   return Math.abs(hash) % size;
// }

// TEST~
let newHashTable = new HashTable;
newHashTable.set('codesmith', 16);
newHashTable.set('bye', 16);
newHashTable.set('ayyy', 16);
newHashTable.set('fullstack', 16);
newHashTable.set('react', 16);
newHashTable.set('ehhh', 16);
newHashTable.set('express', 16);
newHashTable.set('node', 16);
newHashTable.set('LA', 16);
newHashTable.set('HK', 16);
newHashTable.set('CA', 16);
newHashTable.set('ubc', 16);
newHashTable.set('ucla', 16);
newHashTable.set('riot', 16);
newHashTable.set('ea', 16);
newHashTable.set('nyc', 16);
newHashTable.set('sea', 16);
newHashTable.set('annoyed', 16);
newHashTable.set('fulfilled', 16);
newHashTable.set('hola', 16);
newHashTable.set('timetable', 16);
newHashTable.set('coding', 16);
newHashTable.set('acceptance', 16);
newHashTable.set('vayne', 16);
newHashTable.set('watson', 16);
newHashTable.set('lois', 16);
newHashTable.set('gmat', 16);


// newHashTable.get('codesmith');
// console.log(newHashTable.get('codesmith'));
// newHashTable.remove('codesmith');
console.log(newHashTable);
// console.log(this.SIZE);

// Do not remove!!
module.exports = HashTable;


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
