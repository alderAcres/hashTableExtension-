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

function Node(key, val) {
  this.value = val;
  this.key = key;
  this.next = null;
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
  const index = hashCode(key, this.size);
  const node = new Node(key, value);
  let isNode = his.storage[index];
  // if there is no node saved in the array, save it in the array
  if (typeof isNode === 'undefined') {
    this.storage[index] = node;
  }
  // Save the new node at the end of my Node list
  let isTrue = true;
  else {
    // Look for the last Node
    while (isNode.next !== null && isTrue) {
      // If the provided key has already been used to store another value, simply overwrite the existing value with the new value.
      if (isNode.key === key) {
        isNode.value = value;
        isTrue = false;
      }
      isNode = isNode.next;
    }
    // Insert in the last Node no other similar key exist
    if (isTrue) isNode.next = node;
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
  const index = hashCode(key, this.size);
  let node = this.storage[index];
  while (node.next !== null){
    if (node.key === key){
      return node.value;
    }
    node = node.next;
  }
  return null;
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
  const index = hashCode(key, this.size);
  let node = this.storage[index];
  let temp = this.storage[index];
  while (node.next !== null){
    if (node.key === key){
      temp.next = node.next;ge
    }
    temp = node;
    node = node.next;
  }
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
