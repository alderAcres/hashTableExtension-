/* Linked List to handle collisions
  
*/
function LinkedList() {
  this.head = null;
  this.tail = null;
}
function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
  this.prev = null;
}
LinkedList.prototype.add = function (key, value) {
  let newNode = new Node(key, value);
  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
  }
  else {
    let currNode = this.head;
    while (currNode !== null) {
      if (currNode.key === key){
        currNode.value = value;
        return;
      }
      currNode = currNode.next;
    }
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
  }
}
LinkedList.prototype.get = function (key) {
  let currNode = this.head;
  while (currNode !== null) {
    if (currNode.key === key) return currNode;
    currNode = currNode.next;
  }
  return undefined;
}
LinkedList.prototype.remove = function (key) {
  let node = this.get(key);
  if (node === undefined) return undefined;
  let value = node.value;
  if (node === this.head && node === this.tail) {
    this.head = null;
    this.tail = null;
  }
  else if (node === this.head) {
    this.head = node.next;
  }
  else if (node === this.tail) {
    this.tail = node.prev;
    this.tail.next = null;
  }
  else {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  return value;
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
  let addr = hashCode(key);
  let list = this.storage[addr];
  if (list === undefined){
    list = new LinkedList();
    this.storage[addr] = list;
  }
  list.add(key, value);
  this.size++;
  return this.size;
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
  let addr = hashCode(key);
  let list = this.storage[addr];
  if (list === undefined) return undefined;
  return list.get(key) ? list.get(key).value : undefined;
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
  let addr = hashCode(key);
  let list = this.storage[addr];
  if (list === undefined) return undefined;
  return list.remove(key);
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
