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
*/
HashTable.prototype.set = function(key, value) {

  const encrypt = hashCode(key, this.SIZE);
  let tracker = 0;

  if(this.storage[encrypt]){
    this.storage[encrypt][key] = value;
  } else{
    this.storage[encrypt] = {};
    this.storage[encrypt][key] = value;
  }

  tracker += 1
  console.log(tracker)

  //after pushing the new hash check if the size exceeds 75%
  //have a tracker to keep track
  //if it does then we will set the table size to x2 and then rehash
  for(let i = tracker; i < this.SIZE; i++){
    console.log(i)
  }
  // if(this.storage.SIZE >= 1) this.storage = this.SIZE = this.SIZE * 2
  
};

const newHash = new HashTable();
newHash.set("hey", "there")
newHash.set("hello", "world")
newHash.set("idk", "anymore")
console.log(newHash.storage)
console.log(newHash)

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
  const encrypt = hashCode(key, this.SIZE);

  return this.storage[encrypt][key];
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
  const encrypt = hashCode(key, this.SIZE);

  const valuedReturn = this.storage[encrypt][key];
  delete this.storage[encrypt][key];
  return valuedReturn;
  
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
