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
  this.storageAmount = 0;
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
  const index = hashCode(key, this.SIZE);
  console.log(`${index}, ${key}`)
  //if there is nothing at the hashed index, add key value pair
  if (!this.storage[index]) {
    this.storage[index] = {[key]: value, next: null};
    this.storageAmount += 1;
  }
  //if the key passed in already exists in the hash table, replace value with given value
  else if (this.storage[index].hasOwnProperty(key)) {
    this.storage[index][key] = value;
  }
  //else, create a linked list to store multiple values at the same key
  else {
    this.storage[index].next = {[key]: value, next: null};
    this.storageAmount += 1;
  }
  // return storage counter that incrememnts whenever a key value pair is stored
 return this.storageAmount;
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
  //find hashed index
  const index = hashCode(key, this.SIZE);
  let current = this.storage[index]
  //check current node on linked list
  while (current !== null) {
    //if the key exists, return the value
    if (current.hasOwnProperty(key)) {
      return current[key];
    }
    // else look down the linked list
    curent = current.next;
  }
  //if it's never found, return undefined;
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

  const index = hashCode(key, this.SIZE);
  let current = this.storage[index];
// helper function to recursively call down linked list
  function findKey(key, node) {
    // base case to end recursion 
    if (!current.hasOwnProperty(key) && current.next === null) {
      return undefined;
    }
    if (current.hasOwnProperty(key)) {
      const output = current[key]
      //if there is no linked node, set the index to an empty string
      if (current.next === null) {
        current = '';
      }
      // if there is a linked node, set index to linked node
      if (current.next !== null) {
        current = current.next;
      }
      // return stored value
      this.storageAmount -= 1;
      return output;
      
    }
    return findKey(key, current.next);
}
  // if it isn't in the first node, check the next
  const result = findKey(key, current)
  return result;
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
