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

function Node (val, key) {
  this.val = val;
  this.key = key;
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
HashTable.prototype.set = function set(key, value) {
  let newKey = hashCode(key, this.SIZE);

  // check if undefined...
  if (this.storage[newKey] === undefined) {
    this.storage[newKey] = new Node(value, key);
    return;
  }
  let linkedNode = this.storage[newKey];
  while (linkedNode.next) {
    linkedNode = linkedNode.next;
  }
  linkedNode.next = new Node(value, key);
  return;

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
HashTable.prototype.get = function get(key) {
  let newKey = hashCode(key, this.SIZE);
  if (typeof this.storage[newKey] !== 'object') {
    return this.storage[newKey];
  }
  let linkedNode = this.storage[newKey];
  while (linkedNode) {
    if (linkedNode.key === key) {
      return linkedNode.val;
    }
    linkedNode = linkedNode.next;
  }
  return undefined;
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function remove(key) {
  let newKey = hashCode(key, this.SIZE);
  if (this.storage[newKey] === undefined) {
    return undefined;
  }
  let linkedNode = this.storage[newKey];
  if (!linkedNode.next) {
    this.storage[newKey] = undefined;
  }
  while (linkedNode) {
    if (linkedNode.key === key) {
      linkedNode.key = undefined;
    }
    linkedNode = linkedNode.next;
  }
  return undefined;
};

// let myHash = new HashTable();
// for (let i = 0; i < 30; i++) {
//   myHash.set(`${i}`,`string${i}`)
// }
// myHash.set('lance',7)
// console.log(myHash.get('lance'))
// console.log(myHash.get('8'))
// console.log(myHash.remove('8'))
// console.log(myHash.get('8'))
// myHash.remove('lance');
// console.log(myHash.get('lance'))
// console.log(myHash.set('lance', 5))
// console.log(myHash.get('lance'))
// console.log(myHash);

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
