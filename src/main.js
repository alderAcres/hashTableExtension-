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

function Node(value, key) {
  this.key = key
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
  //use the hash function to get the location in the array
  let location = hashCode(key, this.SIZE);
  //create a new node with the key and value given
  let newNode = new Node(value, key);
  //if the location is currently empty just set the value of that location to the newly created node
  if(!this.storage[location]) {
    this.storage[location] = newNode;
  }else {
    //create a value to keep track of where you are in the list
    let currentNode = this.storage[location];
    //find the end point of the linked list and insert a new node
      //while the next property is not null move on to the next node to move through the list by reassigning current to the next node
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    //now you are at the end of the list
    //set the next property of the last node to your new node
    currentNode.next = newNode;
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
  let location = hashCode(key, this.SIZE);
  //first check if there is a value in that location. if not then just return
  if (!this.storage[location]) {
    return;
  }
  //if there is a value there, then start looking through the list until the next property is null
  let currentNode = this.storage[location];
  //at each step compare the value of the key to the key given
  while (currentNode.next !== null) {
    //when the key matches, return the value of that node.
    if (currentNode.key === key) {
      return currentNode.value;
    }
    //otherwise move on
    currentNode = currentNode.next;
  }
  //if nothing matches then return undefined
  return;
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
