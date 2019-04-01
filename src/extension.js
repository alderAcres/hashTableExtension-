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
  let storageArrLen = 0
  const hash = hashCode(key, this.SIZE)
  if (!this.storage[hash]) {
    this.storage[hash] = {};
    this.storage[hash][key] = value;
  }
  if (this.storage[hash]) {
    this.storage[hash][key] = value;
  }
  for (let i = 0; i < this.storage.length; i += 1) {
    if (this.storage[i] !== undefined) storageArrLen += 1
  }
  const storagePer = storageArrLen / this.size
  if (storagePer > 0.75) {
    this.SIZE = this.SIZE * 2
    storage2 = new Array(this.SIZE);
    for (let i = 0; i < this.storage.length; i += 1) {
      if (this.storage[i]) {
        for (let key in this.storage[i]) {
          let newHash2 = hashCode(this.storage[i][key], this.SIZE)
          if (!this.storage2[hash]) {
            storage2[newHash2] = {};
            storage2[newHash2][key] = value;
          }
          if (this.storage2[newHash2]) {
            storage2[newHash2][key] = value;
          }
        }
      }
    }
  this.storage = storage2;
  }
};

const newHash = new HashTable();
// newHash.set("mike", 1)
// newHash.set("mike,", 2)
// newHash.set("tim", 1)
// newHash.set("lex,", 2)
// newHash.set("lary,", 2)
// newHash.set("mike,", 2)
// newHash.set("mike,", 2)
// newHash.set("mi4ke", 1)
// newHash.set("mi3ke,", 2)
// newHash.set("mike2", 1)
// newHash.set("mik5e,", 2)
// console.log(newHash.storage)


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
  const hash = hashCode(key, this.SIZE)
  if (!this.storage[hash]) return "Key not in HashTable"
  if (this.storage[hash]) {
    return this.storage[hash][key]
  }
};  for (let key in this.storage[i]) {

}

// console.log(newHash.get("mike"))
// console.log(newHash.get("mike,")

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  const hash = hashCode(key, this.SIZE)
  if (!this.storage[hash]) return "Key not in HashTable"
  if (this.storage[hash]) {
    delete this.storage[hash][key]
    return "Key deleted from hashtable"
  }
};

// console.log(newHash.storage)
// console.log(newHash.remove("mike"));
// console.log(newHash.remove("tim"))
// console.log(newHash.storage)


// Do not remove!!
module.exports = HashTable;



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
