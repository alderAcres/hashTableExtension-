/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.presentSize = 0;
  this.storage = new Array(this.SIZE);
}
function Node(key, value){
  this.key = key; 
  this.value = value;
  this.next =null; 
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
  const key2 = hashCode(key, this.SIZE);
  
  if(!this.storage[key2]){
    this.storage[key2] = new Node(key, value);
    this.presentSize += 1; 

    if(this.presentSize >= this.SIZE * (3/4))
      newSize();
    } else {
      let current = this.storage[key2];
        while(current.next){
        current = current.next
        }
      current.next = new Node(key, value);
      return this.presentSize; 
    }

  function newSize(){
    const temp = this.storage;
    this.SIZE = this.SIZE*2;
    this.storage = new Array(this.SIZE);

    for(let i = 0; i < temp.length; i++){
      let currentNode = this.temp[i];
      if(currentNode){
        while(currentNode.next){
          this.set(currentNode.key, currentNode.value);
          currentNode = currentNode.next;
        }
      }
    }
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
  const newKey = hashCode(key, this.SIZE)
  let current = this.storage[newKey];
  while(current.key !== key){
    current = current.next
  }
  return current.value; 
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
