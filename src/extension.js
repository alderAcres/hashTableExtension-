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
  this.SIZE = 4;
  this.length = 0;
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
  // get hashed key
  const hashedKey = hashCode(key, this.SIZE);

  if (this.storage[hashedKey]) {
    // collision detected. object exists. update object
    if (!this.storage[hashedKey][key]) this.length++; // only update length if key doesn't exist
    this.storage[hashedKey][key] = value;
  } else {
    // nothing here. Create new obj
    const temp = {};
    temp[key] = value;
    this.storage[hashedKey] = temp;
    this.length++;
  }
  
  // check to see if length is over 75% of size. then we need to resize hash table
  if (this.length > .75 * this.SIZE) {
    // hash table is too big. 
    // 1. Need to double the size
    this.SIZE = this.SIZE * 2;

    // put deep clone of storage in temp
    let temp = JSON.parse(JSON.stringify(this.storage));

    // make new array with new size
    this.storage = new Array(this.SIZE);

    let tempLength = this.length;

    // loop through temp and rehash all. 
    temp.forEach((obj) => {
      if (obj) {
        // object exists. add each key/value in object to new storage
        Object.keys(obj).forEach((key) => {
          this.set(key, obj[key]);
          this.length = tempLength;
        }) 
      }
    })

  }

  return this.length;
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
  // get hashed key
  const hashedKey = hashCode(key, this.SIZE);

  if (this.storage[hashedKey])
    // hash exists. check key
    if (this.storage[hashedKey][key])
      return this.storage[hashedKey][key]
  return undefined;
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
  // get hashed key
  const hashedKey = hashCode(key, this.SIZE);
  let output;

  if (this.storage[hashedKey]) {
    // hash exists. check key
    if (this.storage[hashedKey][key]) {
      // key exists. store it, delete it, decrement length
      output = this.storage[hashedKey][key];
      delete this.storage[hashedKey][key];
      this.length -= 1;
    }
  }

  return output;
};

const hash = new HashTable();
hash.set('quoc', 30)
console.log('quoc', hash.length, hash.SIZE, hash.get('quoc'))
hash.set('quoc', 36)
console.log('quoc', hash.length, hash.SIZE, hash.get('quoc'))
hash.set('christina', 25)
console.log('christina', hash.length, hash.SIZE, hash.get('christina'))
hash.set('turbo', 7)
console.log('turbo', hash.length, hash.SIZE, hash.get('turbo'))
hash.set('charlie', 2)
console.log('charlie', hash.length, hash.SIZE, hash.get('charlie'))
hash.set('quoc-1', 30)
hash.set('quoc-2', 30)
hash.set('quoc-3', 30)

console.log('hashTable', hash.length, hash.SIZE, hash.storage)

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
