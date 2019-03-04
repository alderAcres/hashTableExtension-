/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.occupied = 0;
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
  if (typeof this.storage[index] === 'undefined') {
    this.storage[index] = new Node(key, value)
    this.occupied++;
  } else {
    let currentNode = this.storage[index];

    while(currentNode.next && currentNode.key !== key) currentNode = currentNode.next;

    if (currentNode.key === key) currentNode.value = value
    else currentNode.next = new Node(key, value)
  }
  return this.occupied;
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
  let currentNode = this.storage[index];

  if (typeof currentNode === 'undefined') return undefined;

  while(currentNode.next && currentNode.key !== key) currentNode = currentNode.next

  if(currentNode.key === key) return currentNode.value
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
HashTable.prototype.remove = function(key) {
  const index = hashCode(key, this.SIZE);
  let previousNode = null;
  let currentNode = this.storage[index]

  if (typeof currentNode === 'undefined') return undefined;

  while(currentNode.next && currentNode.key !== key) {
    previousNode = currentNode;
    currentNode = currentNode.next;
  }
  if (currentNode.key === key) {
    const removedVal = currentNode.value;

    if (previousNode === null) {
      this.storage[index] = currentNode.next === null ? undefined : currentNode.next;
      if (this.storage[index] === undefined) this.occupied--;
    }
    else previousNode.next = currentNode.next;
    return removedVal
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

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}

const table = new HashTable;
console.log(table.set('apples', 0.99));
console.log(table.set('apples', 0.29));
console.log(table.set('bananas', 0.29));
console.log(table.set('b', 0.59));
console.log(table.get('apples'));
console.log(table.get('b'));
console.log(table.get('bananas'));
console.log(table.get('pizza'));
console.log(table.remove('b'))
console.log(table.get('b'))
console.log(table.set('b', 200))
console.log(table.storage)
console.log(table.remove('bananas'))
console.log(table.storage)
console.log(table.get('bananas'))
console.log(table.remove('bananas'))
console.log(table.remove('b'))
console.log(table.remove('b'))
console.log(table.occupied, table.storage)
// Do not remove!!
module.exports = HashTable;
