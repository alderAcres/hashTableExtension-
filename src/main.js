/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function Node(value, key) {
  this.value = value;
  this.next = null;
  this.key = null;
}

function LinkedList(node) {
  this.head = node;
}

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
  let idx = hashCode(key, this.SIZE);
  let node = new Node(value, key); // tack node onto list

  if (!this.storage[idx]) {
    let list = new LinkedList(node);
    this.storage[idx] = list;
  } else {
    let currentNode = list.head;

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = node;
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
  let idx = hashCode(key, this.SIZE);
  // return this.storage[idx];

  if (!this.storage[idx]) {
    'Invalid';
  } else {
    // if node key equals provided key, return node value;

    let currentNode = this.storage[idx].head;

    if (currentNode.key === key) {
      return currentNode.value;
    }


    while (currentNode.next) {
      if (currentNode.key === key) {
        return currentNode.value;
      }

      currentNode = currentNode.next;
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
  let idx = this.storage[hashCode(key, this.SIZE)];
  // this.storage[hashCode(key, this.SIZE)] = undefined;

  let currentNode = this.storage[idx].head;

  while (currentNode.next) {
    if (currentNode.key === key) {
      
    }
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
