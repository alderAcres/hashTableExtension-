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

  let counter = 0; 
  let idx = hashCode(key, this.SIZE);

  //console.log("index is %i", idx);

  // if returned index
  if(idx) {
    // create a new node for LList
    let node = {};
    node[key] = value;
    node.next = null;

    //console.log("new node is: ", node);

    // check for node at index
    let oldNode = this.storage[idx];

    //console.log("current node: ", oldNode);

    if (oldNode) {
      // check whether same value as [value]

      //console.log("there's an old node, it's next value is: %i", oldNode.next);

      if (oldNode[key]) {
        oldNode[key] = value;
        return 0;
      }
      // while the next pointers are non-null, traverse LList
      else while (oldNode.next){
        oldNode = oldNode.next;
      }
      // set new node to end of LList
      oldNode.next = node;
        counter++;
    }
    // if no node is present at index
    else {
      this.storage[idx] = node;
    }
    counter++;
  } 
  return counter;
};



let table9 = new HashTable;

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

  let idx = hashCode(key, this.SIZE);

  let currentNode = this.storage[idx];

  while(currentNode) {
    if (currentNode[key] === key) {
      return currentNode[key];
    }
    else {
      currentNode = this.storage[idx].next;
    }
  }

  return 'not found';

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
