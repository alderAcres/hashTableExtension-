/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.used = 0
  
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
  const index = hashCode(key, this.SIZE);
  if (!this.storage[index]) this.storage[index] = new Queue; 
  if (!this.storage[index].head) this.used += 1;
  this.storage[index].enquee(key, value);
  return this.used;
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
  let cell = this.storage[index];
  return cell ? cell.get(key) : undefined;
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
  let cell = this.storage[index];
  if (cell) {
    const removed = cell.dequeue(key);
    if (!cell.head) this.used -= 1;
    return removed;
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

function Queue() {
  this.head = null;
  this.tail = null;
}

function SetQueueNode(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}

Queue.prototype.enquee = function (key, value) {
  node = new SetQueueNode(key, value);
  if (!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    let curr = this.head;
    while (curr) {
      if (curr.key === key) {
        curr.value = value;
        return this;
      } 
      curr = curr.next;
    }
    this.tail.next = node;
    this.tail = node;
  }
  
  return this;
} 

Queue.prototype.dequeue = function (key) {
  if (!this.head) return;

  let curr = this.head;
  let previous;

  while(curr) {
    if (curr.key === key) {
      const foundVal = curr.value;
      if (curr === this.head) {
        this.head = null;
      }
      if (curr === this.tail) {
        this.tail = null;
      }
      if (previous) {
        previous.next = curr.next;
      }
      delete curr;
      return foundVal;
    } 
  }
  previous = curr;
  curr = curr.next;
}

Queue.prototype.get = function (key) {
  let curr = this.head;
  while (curr) {
    if (curr.key === key) return curr.value;
  }
}

// Do not remove!!
module.exports = HashTable;
