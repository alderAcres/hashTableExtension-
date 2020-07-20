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
  this.count = 0;
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
HashTable.prototype.set = function(key, value) {

  const hash = hashCode(key, this.SIZE); // send it through the hashCode
  if (!this.storage[hash]) { // check if the bucket is defined
    this.storage[hash] = {}; // if not, make it empty object
  }

  if (this.storage[hash][key] !== undefined) return 'key already exists';
  this.storage[hash][key] = value; // insert it
  this.count++; 

  if (this.count/this.SIZE >= .75) { // if 75% full, double size and rehash
    this.SIZE *= 2;
    const newStorage = new Array(this.SIZE); // create copy
    for (let i = 0; i < this.SIZE/2; i++) {
      if (this.storage[i]) {
        Object.entries(this.storage[i]).forEach((pair) => { // rehash each key-value pair
          const newHash = hashCode(pair[0], this.SIZE);
          if (!newStorage[newHash]) newStorage[newHash] = {};
          newStorage[newHash][pair[0]] = pair[1];
        })
      }
    }
    this.storage = newStorage; // replace with new copy
    return hashCode(key, this.SIZE); // returns where new item is held
  }

  // mdn says returns a pointer to where it's stored...
  return hash;
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
HashTable.prototype.get = function(key) {
  const hash = hashCode(key, this.SIZE); 
  return this.storage[hash][key]; // retrieves value with hash
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  const hash = hashCode(key, this.SIZE);
  if (!this.storage[hash][key]) return undefined;
  
  const removed = this.storage[hash][key];
  // this.storage[hash][key] = undefined;
  delete this.storage[hash][key]; // I remember this didn't work how a previous test wanted, but it felt odd to leave the key in the object floating around even if it has an undefined value. I'll look up later which of these two options is better.
  this.count--;

  if (this.SIZE > 16 && this.count/this.SIZE < .25) { // if < 25% full, half storage and rehash
    this.SIZE /= 2;
    const newStorage = new Array(this.SIZE);
    for (let i = 0; i < this.SIZE*2; i++) {
      if (this.storage[i]) {
        Object.entries(this.storage[i]).forEach((pair) => { // rehash each key-value pair
          const newHash = hashCode(pair[0], this.SIZE);
          if (!newStorage[newHash]) newStorage[newHash] = {};
          newStorage[newHash][pair[0]] = pair[1];
        })
      }
    }
    this.storage = newStorage; // replace with new copy
  }

  return removed;
};


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


// TESTING 

let table = new HashTable();
console.log(table.set('hi', true));
console.log(table.set('matt', 30));
console.log(table.set('denis', 'fellow'));
table.set('jen', 'facemask');

for (let i = 0; i < 8; i++) {
  table.set('entry'+i, i+'test');
}
console.log(table);

console.log(table.get('hi'));
console.log(table.get('jen'));

console.log(table)
console.log(table.set('matt', 'alabama'));

console.log(table.remove('hi'));
console.log(table.remove('matt'));
console.log(table);

console.log(table.remove('entry0'));
console.log(table.remove('entry1'));
console.log(table.remove('entry2'));
console.log(table);


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
