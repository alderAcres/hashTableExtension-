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
  this.currentSize = 0; 
  
  this.storage = new Array(this.SIZE);

  Object.defineProperty(this, 'loadFactor', {
    get() {
      return (this.currentSize/this.SIZE)*100;
    }
  })
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
  const hashIndex = hashCode(key, this.SIZE);
  
  // empty storage.
  if(this.storage[hashIndex]){
    this.storage[hashIndex][key] = value; 
  } else {
    // hashIndex is presented, create new object and add key/values.
    this.storage[hashIndex] = {};
    this.storage[hashIndex][key] = value;
    this.currentSize++;
  }
 console.log(this.storage)
  // rehash if current size > 75%
  if(this.loadFactor >= 75) {
    this.rehash();
  }
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
    // validate inputs.
    if(!key) return;

    const hashIndex = hashCode(key, this.SIZE);

    if(this.storage[hashIndex]) return this.storage[hashIndex][key];
    else return;
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
  // validate inputs.
  if(!key) return;

  const hashIndex = hashCode(key, this.SIZE);

  if(this.storage[hashIndex]) {
    
    const removed = this.storage[hashIndex][key];
    delete this.storage[hashIndex][key];
    this.currentSize--;

    // occupied storage less than the original storage.
    if(this.SIZE > 16 && this.loadFactor <= 25) {
      this.rehash();
    }

    return removed;

  } else return;
};

/**
 * 
 * Resize the hash table
 */
HashTable.prototype.rehash = function() {
  if(this.loadFactor >= 75) {
    this.SIZE *= 2;
  } else if(this.SIZE > 16 && this.loadFactor <= 25) {
    this.SIZE = Math.abs(this.SIZE/2);
  }
 
  // reset current size.
  this.currentSize = 0;
  // rehash the storage.
  for(let i = 0; i < this.storage.length; i++) {

    if(!this.storage[i]) {
      for(const key of this.storage[i]) {
        // get new hash index.
        const newHashIndex =  hashCode(key, this.SIZE);
        // restore in the new hash index.
        this.storage[newHashIndex][key] = this.storage[i][key];
        this.currentSize++;
      }
    }
  }
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

const htable = new HashTable();

htable.set('firsName', 'John');
htable.set('lastName', 'Barney');
htable.set('age', 23);
htable.set('score', 2);
console.log(htable.get('firsName'));
console.log(htable.remove('lastName'));
console.log(htable.SIZE);
console.log(htable.storage)