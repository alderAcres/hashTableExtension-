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
  this.stored = 0;
  
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
HashTable.prototype.set = function(key, value) {
  // hash the key
  const hash = hashCode(key, this.SIZE);
  // console.log('key',key, 'hash', hash);
  // look for hashed pos. if key didn't exist before, create it
  if (!this.storage[hash]) {
    this.storage[hash] = {};
    this.stored += 1;
  }
  else {
    // if key didn't existed add one to this.stored
    if (!this.storage[hash].hasOwnProperty(key)) this.stored += 1;
  }
  if (this.SIZE * 0.75 < this.stored) {
    this.resize(2);
    this.set(key, value)
  } 
  else {
    // add the value at specified key
    this.storage[hash][key] = value;
  }
  // output: undefined
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
  // hash
  const hash = hashCode(key, this.SIZE);
  // look for object, if not return undefined
  if (!this.storage[hash]) return;
  // if object, look for key. If not, return undefined
  if (!this.storage[hash].hasOwnProperty(key)) return;
  return this.storage[hash][key]
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
  // check if obj in hash. if not -> undefined
  // check if key in hash. if not -> undefined
  if (!this.storage[hash] || !this.storage[hash].hasOwnProperty(key)) return;
  // if key, delete entry and store value in temp variable
  const value = this.storage[hash][key];
  delete this.storage[hash][key];
  // if obj now empty, reset position to null
  if (Object.keys(this.storage[hash]).length === 0) this.storage[hash] = null;
  // return value in temp
  this.stored -= 1;
  if (this.SIZE * 0.25 > this.stored) this.resize(0.5);
  return value;
};


HashTable.prototype.resize = function(newSizeFactor) {
  const entries = this.getAllEntries();
  this.stored = 0;
  this.SIZE *= newSizeFactor;
  this.storage = new Array(this.SIZE);
  for (let o = 0; o < this.SIZE; o++) {
    this.storage[o] = null;
  }
  entries.forEach(([key, value]) => {
    this.set(key, value);
  });
}

HashTable.prototype.getAllEntries = function() {
  return this.storage.filter(obj => obj !== null)
    .reduce((acc, obj) => {
      return acc.concat(Object.entries(obj));
    }, []);
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



// TESTING
const ht = new HashTable();
ht.set('y', 5)
ht.set('y', 8);
ht.set('i', 4);
// ht.set('aj', 10);
ht.set('n', 7);
console.log('all entries:', ht.getAllEntries());
ht.resize(2);
console.log(ht);
console.log(ht.get('n'), 'this.stored:', ht.stored); // 7, // 3
console.log(ht.get('y') === 8); // 8
console.log(ht.get('i') === 4); // 4
console.log(ht.get('aj') === undefined); // undefined
console.log(ht.get('a') === undefined); // undefined
console.log(JSON.stringify(ht.storage));
console.log(ht.remove('y') === 8) // 8
console.log(JSON.stringify(ht)); // storage still contains obj with 'i' key at hash 10. this.stored === 2
console.log(ht.remove('y') === undefined) // undefined
console.log(JSON.stringify(ht.storage)); //storage still contains obj with 'i' key at hash 10
console.log(ht.remove('i') === 4) // 4
console.log(JSON.stringify(ht)); // storage now has null at hash 10      this.stored === 1
