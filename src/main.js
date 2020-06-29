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
  // create hash with hash function
  const hash = hashCode(key, this.SIZE);

  // see if hash table has the key, overwrite existing value with new value and if it has another key/value pair, add to object with passed in key/value pair
  if (this.storage[hash]) this.storage[hash][key] = value;

  // if there is no hash, create a new object to store passed in key/value pair
  else {
    this.storage[hash] = {};
    this.storage[hash][key] = value;
  }

  // return number of items stored in hash table
  let i = 0;
  let counter = 0;
  while (i < this.storage.length) {
    if (this.storage[i] !== undefined) {
      counter += Object.keys(this.storage[i]).length;
    }
    i += 1;
  }
  return counter;
};

let test = new HashTable();
test.set('John', 1);
console.log(test);
test.set('John', 5)
console.log(test)
test.set('Tim', 3)
console.log(test)
console.log(test.set('Grace', 2))
console.log(test)

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
  // get hash from passed in key
  const hash = hashCode(key, this.SIZE);

  // return value from passed in key
  return this.storage[hash][key];
};

console.log(test.get('Tim'))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // if key exists, delete the key value pair
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) {
    const deletedValue = this.storage[hash][key];
    delete this.storage[hash][key];  
    return deletedValue;
  }
  // if key does not exist, return undefined
  return undefined;
};

console.log(test.remove('Link'))
console.log(test.remove('Grace'))
console.log(test)
console.log(test.get('Tim'))

// Do not remove!!
module.exports = HashTable;
