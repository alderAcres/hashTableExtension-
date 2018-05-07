/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function LinkedList() {
  this.head = null;
};

function Node(val) {
  this.value = val;
  this.next = null;
};

function HashTable() {
  this.SIZE = 16;
  this.totalValues = 0;
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
  var location =  hashCode(key, this.SIZE);
  var node = new Node(key)
  // if hash location is undefined (has never receive a value), create a new linked list
  if(this.storage[location] === undefined) {
    this.storage[location] = new LinkedList();
    this.storage[location] = node;
  } else {
  // if storage location does contain a LL, traverse through and append new node to the end of list
    var curr = this.storage[location];
    while(curr.next) {
       curr = curr.next;
     } 
    curr.next = node;
  }
  // increment total values in list by 1
  return ++this.totalValues;
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
  var location = hashCode(key, this.SIZE);
  // if location is undefined, no values exist => return undefined
  if(location === undefined) {
    return undefined;
  } else {
  // else, check the value of each location until either value is found or return undefined if LL has been exhausted
    var currValue = this.storage[location].value;
    var currPosition = this.storage[location];
    while(currValue !== key) {
      currPosition = currPosition.next
      currValue = currPosition.value;
    }
    return currValue;
  }
  return undefined
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
  var location = hashCode(key, this.SIZE);
  //if location is undefined, no values exist => return undefined
  if(this.storage[location] === undefined) return undefined;
  var curr = this.storage[location];
  // else, traverse through array checking each node value against key 
  while(curr.value !== key) {
    curr = curr.next;
  }
  // if value is a match, delete the value and decrease total values by 1. return val.
  if(curr.value === key) {
    var val = curr.value;
    delete curr.value;
    --this.totalValues;
    return val;
  }
  // no match was found, return undefined.
  return undefined;
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
