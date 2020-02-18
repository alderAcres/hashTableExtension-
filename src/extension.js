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
1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  // invoke the helper function on the value and store that into the variable
  let hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) this.storage[hash][key] = value;
  else { 
    this.storage[hash] = {};
    this.storage[hash][key] = value
  }
  
  let count = 0
  for (let i =0; i < this.SIZE; i++){
    while (this.storage[hash])
      count += 1;
    }
  }

  if (count >= (0.75) * this.SIZE){
    let newSize = this.SIZE = 2 * this.SIZE;
    let newStorage = new Array(this.SIZE * 2);
    for (let i = 0; i < this.SIZE; i++){  // inside the array
      while (this.storage[hash] != null) {
        let newHash = hashCode(this.storage[hash],newSize)
      }   // object
      this.storage[hash] == null
    }
      let newHash = 

    }
  


const callFnc = new HashTable()
callFnc.set('hello', 25)
callFnc.set('apple', 100)
callFnc.set('apple', 2)
callFnc.set('coffee', 100)
callFnc.set('tea', 100)
callFnc.set('glasses', 100)
console.log(callFnc)

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
  // invoke the helper function to get which index the value is
  let hash = hashCode(key, this.SIZE);
  return this.storage[hash][key];
};

console.log(callFnc.get('apple'))
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // invoke the helper to get the index where the element 
  let hash = hashCode(key, this.SIZE);
  // check if the key exists, if so return undefined
  if (!this.storage[hash][key]) return undefined;
  else{
    delete this.storage[hash][key];
  }

};
console.log(callFnc)
callFnc.remove('apple')
console.log(callFnc)
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
