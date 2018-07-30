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
  const hash = hashCode(key, this.SIZE)
  //The storage has 16 keys, and will inevitably will have collision.
  //Each of the 16 keys stores an object that has the key argument as the key, and value argument as the value
  //the if checks if there is an object already at the key, if so, adds onto the object
  //if not, the else will add an object at this key
  if (this.storage[hash]) this.storage[hash][key] = value
  else {
    const hashObj = {};
    hashObj[key] = value
    this.storage[hash] = hashObj;
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
  //HashTable.add stores an object at each key. If there was already an object at the key,
  //then a key and value were added to the existing obj. To retrieve the value, just search for 
  //the key of this.storage[hash]
  const hash = hashCode(key, this.SIZE)
  return this.storage[hash][key]
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
  const hash = hashCode(key, this.SIZE)
  if (this.storage[hash][key]) delete this.storage[hash][key]
  else return undefined
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

//test cases
let test = new HashTable()
test.set('test', 1);
test.set('alice', 2);
test.set('test2', 3)
console.log(test.set('hi', 4))
console.log(test)
test.remove('test2')
test.remove('alice')
console.log(test.remove('test2'))
console.log(test)
console.log('length: ', Object.keys(test.storage).length)