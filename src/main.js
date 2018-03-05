function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
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
  this.number = 0;
  this.storage = new Array(this.SIZE);
  for (let i = 0; i < this.SIZE; i++) {
    this.storage[i] = new LinkedList();
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
HashTable.prototype.set = function(key, value) {
  let index = hashCode(key, this.SIZE);
  
  if (this.storage[index].head === null && this.storage[index].tail=== null) {
    let newNode = new Node(key, value);
    this.number++;
    this.storage[index].head = newNode;
    this.storage[index].tail = newNode;
    return this.number;
  }
  
  let curNode = this.storage[index].head;
  if (curNode.key === key) {
    curNode.value = value;
    return this.number;
  }
  
  while (curNode.next !== null) {
    if (curNode.key === key) {
      curNode.value = value;
      return this.number;
    }
    curNode = curNode.next;
  }
  
  if (curNode.key === key) {
      curNode.value = value;
      return this.number;
    }
  
  if (curNode.next === null) {
    let newNode = new Node(key, value);
    this.number++;
    curNode.next = newNode;
    this.storage[index].tail = newNode;
    return this.number;
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
  let index = hashCode(key, this.SIZE);
  let curNode = this.storage[index].head;
  
  if (this.storage[index].head === null && this.storage[index].tail=== null) {
    return 'this key does not exist in the hash table'
  }
  
  while (curNode.next !== null) {
    if (curNode.key === key) {
      return curNode.value;
    }
    curNode = curNode.next;
  }
  
  if (curNode.key === key) {
      return curNode.value;
    }
  
  return 'this key does not exist in the hash table'
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
  let index = hashCode(key, this.SIZE); 
  if (this.storage[index].head === null && this.storage[index].tail=== null) {
    return undefined;
  }
  
  let curNode = this.storage[index].head;
  if (this.storage[index].head === curNode && this.storage[index].tail === curNode) {
    this.storage[index].head = null;
    this.storage[index].tail = null;
    this.number--;
    return curNode.value;
  }
  
  if (curNode.key === key) {
    this.storage[index].head = curNode.next;
    this.number--;
    return curNode.value;
  }
  
  while (curNode.next !== null && curNode.next.key !== key) {
    curNode = curNode.next;
  }
  
  if (curNode.next.key === key) {
      let removedNode = curNode.next;
      if (this.storage[index].tail === removedNode) {
        curNode.next = null;
        this.storage[index].tail === curNode;
        this.number--;
        return removedNode.value;
      }
      curNode.next = curNode.next.next;
      this.number--;
      return removedNode.value;
    }
  
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
