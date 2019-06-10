/* eslint-disable linebreak-style */
/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW

/* eslint-disable func-names */
/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.count = 0;
  this.SIZE = 16;

  this.storage = new Array(this.SIZE);
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
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
HashTable.prototype.set = function (key, value) {
  const index = hashCode(key, this.SIZE);

  // table entry is undefined or null
  if (!this.storage[index]) {
    this.storage[index] = new Node(key, value);
  } else {
  // table entry is linked list
    let current = this.storage[index];
    // move down list until reached key
    while (current.next !== null) {
      if (current.key === key) current.value = value;
      current = current.next;
    }
    current.next = new Node(key, value);
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
  const index = hashCode(key, this.SIZE);

  // table entry is undefined or null
  if (!this.storage[index]) {
    return undefined;
  }
  // table entry is linked list
  let current = this.storage[index];
  // move down list until reach desired key
  while (current !== null) {
    if (current.key === key) {
      return current.value;
    }
    current = current.next;
  }
  current.next = new Node(key);
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

  // table entry is undefined or null
  if (!this.storage[index]) {
    return undefined;
  }
  // table entry is linked list
  let prev = null;
  let current = this.storage[index];
  // move down list until reach desired key
  while (current !== null) {
    if (current.key === key) {
      const res = current.value;
      // check if the previous node exists
      if (prev) prev.next = current.next;
      // if not, then at head
      else {
        this.storage[index] = current.next;
      }
      return res;
    }
    prev = current;
    current = current.next;
  }
  current.next = new Node(key);
};

// YOUR CODE ABOVE

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
