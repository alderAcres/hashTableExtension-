/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/

function HashTable() {
  this.SIZE = 16;
  this.length = 0;
  this.storage = new Array(this.SIZE);
}

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}
function LinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}
  
LinkedList.prototype.push = function(key, value) {
  const node = new Node(key, value);
  if (this.tail === null) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    this.tail = node;
  }
  this.length += 1;
  return length;
};

LinkedList.prototype.find = function(key) {
  let current = this.head;
  let prev = null;
  while(current !== null) {
    if (current.key === key) {
      return [prev, current];
    }
    prev = current;
    current = current.next;
  }
  return undefined;
};

LinkedList.prototype.get = function(key) {
  let node = this.find(key)[1];
  return node.value;
};

LinkedList.prototype.remove = function (key) {
  let [prevNode, curNode] = this.find(key);
  const val = curNode.value;
  if (this.head === curNode) this.head = this.head.next
  if (this.tail === curNode) {
    this.tail = prevNode;
    prevNode.next = curNode.next;
  }
  this.length -= 1;
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
  const hash = hashCode(key, this.SIZE);
  const list = this.storage[hash];
  if (!list) this.storage[hash] = new LinkedList();
  this.storage[hash].push(key, value)
  this.length += 1;
  return this.length;
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
  const hash = hashCode(key, this.SIZE);
  const list = this.storage[hash];
  let val;
  if (list) {
    val = list.get(key);
  }
  return val;
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
  let val;
  const hash = hashCode(key, this.SIZE);
  const list = this.storage[hash];
  if (list && list.length === 1) {
    val = list.get(key);
    delete this.storage[hash];
  } else {
    val = list.get(key);
    list.remove(key);
  }
  this.length -= 1;
  return val;
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

// var hash = new HashTable();
// console.log('should increase size by one: ', hash.set('hi', 7)===1);
// console.log('should store passed value: ', hash.get('hi') === 7);
// console.log('should return removed value: ', hash.remove('hi') === 7);
// console.log('should remove value: ', hash.get('hi') === undefined)
// hash.set('test', 5);
// console.log('Should handle collisions set: ', hash.set('tes', 4) === 2);
// console.log('Should handle collisions get: ', hash.get('tes') === 4);
// console.log('Should handle collison remove: ', hash.remove('test') === 5);


// Do not remove!!
module.exports = HashTable;
