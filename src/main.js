function LinkedList() {
  this.head = null;
  this.tail = null;
}
function Node(value) {
  this.value = value;
  this.next = null;
}

LinkedList.prototype.push = function (node) {
  if (this.head) {
    this.tail.next = node;
    this.tail = node;
  } else {
    this.head = node;
    this.tail = node;
  }
}
LinkedList.prototype.contains = function (key) {
  if (this.head) {
    let currentNode = this.head;
    while (currentNode.next) {
      if (currentNode.value[0] === key) {
        return currentNode.value[0][1];
      }
      currentNode = currentNode.next;
    }
  }
  return false;
}
LinkedList.prototype.delete = function (key) {
  if (this.head) {
    if (this.head.value[0] === key) {
      this.head = this.head.next;
    } else {
      let currentNode = this.head.next;
      let previousNode = this.head;
      while (currentNode.next) {
        if (currentNode.value[0] === key) {
          previousNode.next = currentNode.next;
        }
        currentNode = currentNode.next;
        previousNode = previousNode.next;
      }
    }
  }
  return false;
}

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
  const index = hashCode(key);
  const hashNode = new Node([key,value]);
  let bucketLinkedList;
  if (this.storage[index] !== undefined) {
    bucketLinkedList = new LinkedList();
  } else {
    bucketLinkedList = this.storage[index];
  }
  bucketLinkedList.push(hashNode);
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
  const index = hashCode(key);
  if (this.storage[index] !== undefined) {
    return this.storage.contains(key);
  }
  return false;
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
  const index = hashCode(key);
  if (this.storage[index] !== undefined) {
    this.storage[index].delete(key);
  } else {
    return false;
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
