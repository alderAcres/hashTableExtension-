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
  this.storedVals = 0;
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
  'use strict';
  let hshCode = hashCode(key, this.SIZE);
  let head = this.storage[hshCode];
  // if key has already been used to store another value, overwrite
  let hasKey = false;
  for(let code in this.storage) {
    if(this.storage[code].hasOwnProperty(key)) {
      this.storage[code][key] = value;
      hasKey = true;
    } 
  }
  if(!hasKey) {
    this.storage[hshCode] = {key: value};
  }

  // collisions
  if(head.hasOwnProperty(key)) {
    head[key].next = {key, value};
    head = head[key][next];
  } else {
    head = {key, value};
  }
  let storedVals = 0;
  // stored Vals count
  for(let code in this.storage) {
    let head = this.storage[code];
    if(this.storage.hasOwnProperty(next)) {
      storedVals++;
      while(head[next]) {
        storedVals++;
        head = head.next;
      }
    } else {
      storedVals++;
    }
  }
  return storedVals;
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
  let head = this.storage;
  // search through storage and retrieve first occurence of key in HashTable  
  for(let code in head) {
    //  storage[hashCode] has the property of key, return key value
    if(head[code].hasOwnProperty(key)) {
      return head[code][key];
    }
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
HashTable.prototype.remove = function(key) {
  let deleted = undefined;
  for(let code in this.storage) {
    if(this.storage[code].hasOwnProperty(key)) {
      // assign deleted property to deleted variable
      deleted = this.storage[code][key];
      delete this.storage[code][key];
    }
  }
  //return undefined if not reassigned and key does not exist in HashTable
  return deleted;
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

// Do not remove!!
module.exports = HashTable;
