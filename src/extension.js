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
/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.numItems = 0; // to keep track number of populated items to determine resizing
}


// RESIZING EXTENSION: should double and halve
HashTable.prototype.resize = function(factor) {
  this.SIZE *= factor;
  const oldStorage = this.storage; // Copy the old storage
  this.storage = new Array(this.SIZE);
  this.numItems = 0;
  // Copy old storage into our new storage and rehash all the previous keys based on current size of the array
  for (let storageObj of oldStorage) {
    for (let key in storageObj) {
      const value = storageObj[key];
      this.set(key, value);
    }
  }
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
  if (this.numItems >= 0.75 * this.SIZE) this.resize(2);
  this.numItems += 1;
  const index = hashCode(key, this.SIZE);
  // Hash table will be array of objects to handle collisions
  // Initialize the object with key-value pair if object hasn't been initialized yet
  if (typeof this.storage[index] !== 'object') {
    this.storage[index] = {};
  }
  // Add / overwrite the key-value pair to the object
  this.storage[index][key] = value;
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
  const index = hashCode(key, this.SIZE);
  // If no object has been initialized at this index or this object does not contain the key...
  if (typeof this.storage[index] !== 'object' || !this.storage[index].hasOwnProperty(key)) { 
    throw new Error('Key does not exist'); 
  } else {
    return this.storage[index][key];
  }
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

/*
  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/
HashTable.prototype.remove = function(key) {
  if (this.numItems <= Math.floor(0.25 * this.SIZE) && this.SIZE > 16) {
    resize(0.5);
    // console.log('hi');
  }
  const index = hashCode(key, this.SIZE);
  // If no object has been initialized at this index or this object does not contain the key...
  if (typeof this.storage[index] !== 'object' || !this.storage[index].hasOwnProperty(key)) {
    return undefined; 
  }
  this.numItems--;
  const removed = this.storage[index][key];
  delete this.storage[index][key];
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


// TEST CASES:
const hashTable = new HashTable();

// Testing the DOUBLE SIZE
for (let i = 0; i <= 12; i++) {
  hashTable.set(i + '', i);
}
console.log(hashTable.SIZE); // Make sure size doubles to 32

for (let i = 0; i <= 12; i++) {
  // Make sure key-value pairs are preserved after resizing
  console.log(hashTable.get(i + '', i)); 
}

// 13 elements / 32 max size

// Testing the HALVE SIZE (still debugging through this)
console.log(hashTable.remove('11'));
console.log(hashTable.remove('10'));
console.log(hashTable.remove('9'));
console.log(hashTable.remove('8'));
console.log(hashTable.remove('7'));
// console.log(hashTable.remove('6'));
console.log(hashTable.numItems);
console.log(hashTable.SIZE); // Should be halved to 16
