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
  this.numOfElements = 0;
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
  
  console.log(this.SIZE, this.numOfElements)
  const hashKey = hashCode(key, this.SIZE);
  console.log(this.storage, this.numOfElements)
  if (typeof this.storage[hashKey] === 'object') {
    // if we find that the storage already has an object then we know it was visited already
    // store the new key/val pair in the object at hashKey
    if (this.storage[hashKey][key] === undefined) {
      // if the key in the obj doesn't exist then we're going to store a new value
      // in this case we want to increment numOfElements b/c we're storing a new val
      this.numOfElements++
    }
    // whether we're storing a new val or overwriting an existing one we want to store key/val pair
    this.storage[hashKey][key] = value;
  }
  else {
    // if an object doesn't already exist store a new object with the key/val pair
    this.storage[hashKey] = {[key]: value};
    this.numOfElements++;
  }
  if (this.numOfElements >= Math.floor(this.SIZE * .75)) {
    this.SIZE += this.SIZE;
    for (let i in this.storage) {
      console.log(i);
      for (j in this.storage[i]) {
        console.log(j);

        if (this.storage[i][j] !== undefined) {
          const oldStorage = this.storage[i][j];
          delete this.storage[i][j];
          this.set(j, oldStorage);
        }
      }
      // this.set(this.storage[i], value);
    }
    console.log(this.storage)
  }
  return this.numOfElements;
 
};
const hash = new HashTable;
hash.set('abcdef', 20);
hash.set('1234', 10);
hash.set('20', 10);
hash.set('30', 2);
hash.set('40', 2)
hash.set('50', 2)
hash.set('60', 2)
hash.set('70', 2)
hash.set('80', 2)
hash.set('00', 2)
hash.set('290', 2)
hash.set('2011', 2)
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
  const hashKey = hashCode(key, this.SIZE);
  console.log(this.storage[hashKey][key]);
  return this.storage[hashKey][key];
};

// hash.get('abcdef');
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  console.log(this.SIZE);
  const hashKey = hashCode(key, this.SIZE);
  console.log(this.storage, hashKey, this.storage[hashKey]);
  if (this.storage[hashKey][key] !== undefined) {
    // if hashKey at key does exist then we want to store the value, then delete it
    const temp = this.storage[hashKey][key];
    delete this.storage[hashKey][key];
    // decrement the numOfElements
    this.numOfElements--;
    
    console.log(temp, this.numOfElements);
    return temp;
  }
  return undefined;
};
hash.remove('20');
hash.remove('30');
hash.remove('40')
hash.remove('50')
hash.remove('60')
hash.remove('70')
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
