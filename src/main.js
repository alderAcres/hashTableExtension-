/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.items = 0;
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
  const node = {
    [key]:value,
    next: null
  }
  const bucket = hashCode(key,this.SIZE);
    // console.log(bucket);
  if (!this.storage[bucket]) {
    this.storage[bucket] = node;
    this.items++;
  } else {
    let current = this.storage[bucket];
    while (current) {
      if (current[key]) {
        current[key] = value;
        return this.items
      }
      if (!current.next){
        current.next = node;
        this.items++;
      }
      current = current.next;
    }

  }
  return this.items;
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
  const bucket = hashCode(key,this.SIZE);
  let current = this.storage[bucket];
  while (current) {
    if (current[key]) {
      return current[key];
    }
    current = current.next;
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
  const bucket = hashCode(key,this.SIZE);
  let current = this.storage[bucket];
  let removed;
  //if it's at head
  if (current[key]) {
    removed = current[key];
    this.items--;
    this.storage[bucket] = current.next;
  } else {
    while (current.next) {
      if (current.next[key]) {
        removed = current.next[key];
        this.items--;
        return removed;
      }
      current.next = current.next.next;
    }
  }
  return removed;
};


let hashTable = new HashTable();
console.log(hashTable.set('hi', 'value'));
console.log(hashTable.set('hi', 'whatever'));
console.log(hashTable.set('hh', 'something else'));
console.log(hashTable.set('hj', 'something else'));
console.log(hashTable.set('hk', 'hks'));
console.log(hashTable.set('hp', 'hps'));
console.log(hashTable.set('diff', 'whatev'));

console.log(hashTable.get('doesnt'));
console.log(hashTable.remove('hp'));
console.log(hashTable.remove('hk'));

console.log(hashTable.set('hk', 'hks'));



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
