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
  this.items = 0; // number of items stored in the hash table
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
  // get hashed address
  const hash = hashCode(key, this.SIZE)
  // console.log(hash)
  // store the key, value pair by creating a new pair on the object at the hashed address
  // this will handle collisions, as we are adding new properties to the object
  // if no key has previously been stored, create an object at the hashed address
  if (!this.storage[hash]){
    this.storage[hash] = {}
    this.storage[hash][key] = value
  } else this.storage[hash][key] = value

  // update # of items in the list and return the new #
  return ++this.items

};

hashTable = new HashTable()
console.log(hashTable.set("hello", 1))
console.log(hashTable.set("world", 2))
hashTable.set("kevin", 3)
hashTable.set("hello", 4)
console.log(hashTable)

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
  // get hashed address
  const hash = hashCode(key, this.SIZE)
  // look up key at the hashed address
  return this.storage[hash][key]

};

console.log(hashTable.get("hello"))
console.log(hashTable.get("world"))
console.log(hashTable.get("kevin"))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // get hashed address
  const hash = hashCode(key, this.SIZE)
  // get deleted value to return
  const deletedValue = this.get(key)
  // delete the key/value pair in the hash table and return the value
  delete this.storage[hash][key]
  this.items-- // update # items stored in table
  return deletedValue
};

console.log(hashTable.remove("world"))
console.log(hashTable)
console.log(hashTable.remove('hi')) // returns undefined

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
