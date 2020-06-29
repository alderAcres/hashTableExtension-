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

function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.count = 0;
  this.keys = [];
  this.newStorage = [];
  this.newSIZE = 0;
}
// PASTE AND MODIFY YOUR CODE BELOW
HashTable.prototype.set = function (key, value) {
  // Increment count
  this.count++;
  // Save the key in keys array
  this.keys.push(key);
  const hashcode = hashCode(key, this.SIZE);
  if (this.storage[hashcode]) {
    this.storage[hashcode][key] = value;
  } else {
    this.storage[hashcode] = {};
    this.storage[hashcode][key] = value;
  }

  // check if you need to resize
  const needToResize = Math.floor(this.count/this.SIZE) > 0.75;

  // if need to resize, double the size, run through all the keys
  // and input in the same process as before for all the key 
  if (needToResize) {

    // double the size
    this.newSIZE = this.SIZE*2;
    // create a new storage
    this.newStorage = new Array(this.SIZE);
    // go through all the keys and insert them into the table
    for (let key of this.keys){
      const hashcode = hashCode(key, this.newSIZE);
      if (this.newStorage[hashcode]) {
        this.newStorage[hashcode][key] = this.get(key);
      } else {
        this.newStorage[hashcode] = {};
        this.newStorage[hashcode][key] = this.get(key);
      }
    } 
    this.SIZE = this.newSIZE;
    this.storage = this.newStorage;
  }

  // insert key into the table
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
  const hashcode = hashCode(key, this.SIZE);
  if (this.storage[hashcode]) {
    if (this.storage[hashcode][key]) {
      return this.storage[hashcode][key];
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};


HashTable.prototype.remove = function (key) {
  const hashcode = hashCode(key, this.SIZE);
  const temp = this.storage[hashcode][key];
  delete this.storage[hashcode][key];

  this.count--;
  //index of key in this.keys
  const indexOfKey = this.keys.indexOf(key);
  console.log(indexOfKey);
  //delete that key in the table key array
  delete this.keys[indexOfKey];

  // check if the load factor is less than 25%, if it is then need to resize
  const needToResize = Math.floor(this.count / this.SIZE) < 0.25;

  // resizing process
  if (needToResize) {

    // double the size
    this.newSIZE = Math.floor(this.SIZE / 2);
    // create a new storage
    this.newStorage = new Array(this.newSIZE);
    // go through all the keys and insert them into the table
    console.log(this.keys)
    for (let key of this.keys) {
      if (key === undefined) continue;
      const hashcode = hashCode(key, this.newSIZE);
      if (this.newStorage[hashcode]) {
        this.newStorage[hashcode][key] = this.get(key);
      } else {
        this.newStorage[hashcode] = {};
        this.newStorage[hashcode][key] = this.get(key);
      }
    }
    this.SIZE = this.newSIZE;
    this.storage = this.newStorage;
  }

  return temp;
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


// Normal test: testing functionality of set, and remove
const hT = new HashTable();
hT.set('key', 'value');
hT.set('Hien', 'Nguyen');
hT.set('Codesmith', 'isawesome');
console.log(hT);

console.log('vale' === hT.get('key'))
console.log('Nguyen' === hT.get('Hien'))
console.log('isawesome' === hT.get('Codesmith'))
hT.remove('Hien');
console.log(hT.get('key'));

