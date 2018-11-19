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
  console.log(this.storage[0])
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
  //create a hash function to find the proper index in 'this' for key.
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.getCharCode(key[i]) + hash;
  }
  let index = Math.floor(hash % this.SIZE);
  //if key/value already exists at that index, make a linked list to handle the collision.
  function NewList() {
    this.head = null;
    
  }
  function NewNode (){
    this.value = null;
    this.next = null;

  }
    let NewList.prototype.addNode = function (value) {
      let currNode = this.head;
      if (currNode.next = null) {
        currNode.next = new NewNode();
        currNode.next.value = value;
      } else {
        currNode = currNode.next;
        currNode.addNode(value);
    }
  }
  
  if (this.storage[index] === undefined) {
    let list = new NewList();
    this.storage[index] = list;
    list.head = new NewNode();
    list.head.value = value;
  } else {
    this.storage[index].addNode(value);
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
