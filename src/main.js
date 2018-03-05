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

function Nodes(value, key) {
  this.key = key;
  this.value = value;
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
  let index = this.hashCode(key);
  if(!this.storage[index]) {
    this.storage[index] = new Nodes(key,value) 
  } else if(this.storage[index].key === key) {
    this.storage[index].value = value
  }else {
    let newNodes = this.storage[index]
    while(newNodes.next) {
      if(newNodes.next.key === key) {
        newNodes.next.value = value
        return
      }
      newNodes = newNodes.next
    }
    newNodes.next = new Nodes(key,value)
  }
};

let ht = new HashTable()
ht.set("hey", "ho")
ht.set("hi", "ho")
ht.set("blah", "dah")
console.log(ht.get("blah"))

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
  let index = this.hashCode(key);
  if(!this.storage[index]) return null
  let newNodes = this.storage[index]
  while (newNodes) {
    if(newNodes.key === key) return newNodes.value
    newNodes = newNodes.next
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
  let index = this.storage(key, this.SIZE);
  let terminated = this.storage[index][key];
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
