/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.numOfItems = 0;
  this.storage = new Array(this.SIZE);
}

function hashNode(key, value) {
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
  var address = hashCode(key, this.SIZE); //create address for value to be stored
  if (this.storage[address] === undefined) { //if nothing at address, put new node in address
    this.storage[address] = new hashNode(key, value);
    this.numOfItems += 1; //increase num of items stored
  } else {
    while (this.storage[address] !== undefined) { //while there is something already at the address
      if (this.storage[address] === undefined) { //if there is nothing at the address, create a new node
        this.storage[address] = new hashNode(key, value); //create a new node at address
        this.numOfItems += 1; //increase num of items stored
      }

      this.storage[address] = this.storage[address].next; //otherwise, create a linked list and add node there
      this.numOfItems += 1; //increase num of items stored
    }
  }

  return this.numOfItems;
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
  var address = hashCode(key, this.SIZE); //get address to look for by passing in key to hashCode
  while(this.storage[address]) { //while it's at the address
    if (this.storage[address].key) { //check for the passed in key in the ndoe
      return this.storage[address].value; //if found, return the value
    } else {
      this.storage[address] = this.storage[address].next; //if not in the immediate node, search through the linked list
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
  var address = hashCode(key, this.SIZE); //get address to look for by passing in key to hashCode
  var removed = this.get(key); //use the get function to find the value and store it in a var removed
  if (removed === undefined) {
    return undefined;
  }

  delete this.storage[address]; //remove key/value pair

  this.numOfItems =- 1; //decrease the number of items stored
  return removed; //return the removed stored value
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
