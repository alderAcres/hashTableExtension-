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
  let filledBuckets = this.storage.filter(ele => ele !== undefined);
  // Rehash every key/value if storage exceeds 75%
  if (Math.floor(this.SIZE * 0.75) <= filledBuckets.length) {
    this.SIZE *= 2;
    reSize(filledBuckets, this.SIZE)
    // let newArr = new Array(this.SIZE);
    // filledBuckets.forEach(currentObj => reHash(currentObj, newArr))
    // this.storage = newArr;
  }

  let bucketIndex = hashCode(key, this.SIZE)
  if (!this.storage[bucketIndex]) this.storage[bucketIndex] = {};
  this.storage[bucketIndex][key] = value;
  return this.storage.length
};

/* Helper function to rehash all key/value pairs inside storage */ 
function reSize(buckets, size) {
  let arr = new Array(size);
  buckets.forEach(currentObj => {
    for (let key in obj) {
      let newIndex = hashCode(key, size);
      if (!arr[newIndex]) arr[newIndex] = {};
      arr[newIndex][key] = ele[key]
    }
  })

}

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
  let bucketIndex = hashCode(key, this.SIZE)
  return this.storage[bucketIndex] ? this.storage[bucketIndex][key] : undefined
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
  let filledBuckets = this.storage.filter(ele => ele !== undefined);
  if (this.SIZE > 16 && Math.floor(this.SIZE * 0.25) > filledBuckets.length) {
    this.SIZE /= 2
    reSize(filledBuckets, this.SIZE)
  }
  let bucketIndex = hashCode(key, this.SIZE)
  if (this.storage[bucketIndex]) {
    let value = this.storage[bucketIndex][key];
    delete this.storage[bucketIndex][key]
    return value;
  } else {
    return undefined;
  }
};

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

const hash = new HashTable;
for (let i = 0; i < 30; i++) {
  hash.set(i, i + 1);
}

console.log(hash.storage, "SIZE: ", hash.storage.length);


// Do not remove!!
module.exports = HashTable;
