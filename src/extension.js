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
  this.SIZE = 4;
  this.storage = new Array(this.SIZE);
  this.currentSize = 0;
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
  this.currentSize += 1;
  if ((this.currentSize / this.SIZE) > 0.75) {
    const newStorage = [];
    for (let i = 0; i < this.SIZE; i += 1) {
      if (this.storage[i]) {
        const keys = Object.keys(this.storage[i]) 
        console.log(keys)
        for (let t = 0; t < keys.length; t += 1) {
          const hashKey = hashCode(keys[t], (this.SIZE * 2));
          if (!newStorage[hashKey]) {
            newStorage[hashKey] = {};
            newStorage[hashKey][keys[t]] = this.storage[i][keys[t]];
          }
          else{
            newStorage[hashKey][keys[t]] = this.storage[i][keys[t]];
          }
        }
      }
    }
    this.storage = newStorage;
    this.SIZE *= 2;
  }
  const hashKey = hashCode(key, this.SIZE)
  if (!this.storage[hashKey]) {
    this.storage[hashKey] = {};
    this.storage[hashKey][key] = value;
  }
  else {
    this.storage[hashKey][key] = value;
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
  const hashKey = hashCode(key, this.SIZE);
  return this.storage[hashKey][key];
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
  const hashKey = hashCode(key, this.SIZE);
  if (!this.storage[hashKey][key]) return undefined;
  const value = this.storage[hashKey][key];
  delete this.storage[hashKey][key];
  
  return value;
};


// Do not modify
function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;
  
  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash) % size;
}
const hash = new HashTable();
hash.set('abc', 'five');
hash.set('def', 'six');
hash.set('cba', 'seven');
console.log(hash)
hash.set('a','a')
console.log(hash);
hash.set('b','b')

// Do not remove!!

module.exports = HashTable;
