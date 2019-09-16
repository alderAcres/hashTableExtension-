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
  // pass key into hashCode function to determine index in hashtable
  const hashIndex = hashCode(key, this.SIZE);
  console.log(hashIndex)
  // if nothing exists at that index 
  if (this.storage[hashIndex] === undefined) {
    // create new object with key value pair === key, value
    this.storage[hashIndex] = {[key]: value};
    // increment items
    this.items += 1;
  }
  // otherwise, add key value pair === key value
  else this.storage[hashIndex][key] = value;
  // return items
  return this.items;
};

const hashTable = new HashTable;
hashTable.set('a', true)
// console.log(hashTable)
hashTable.set('b', 2)
hashTable.set('c', '3')
hashTable.set('d', 'dangling participle')
// console.log(hashTable)
// hashTable.set('a', 3)
// console.log(hashTable)

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
  // pass key into hashCode to get hash table index
  const hashIndex = hashCode(key, this.SIZE);
  // if nothing stored at that index, return 'no value associated with provided key'
  if (!this.storage[hashIndex]) return 'no value associated with provided key';
  // otherwise return value of property key within object at hashIndex
  return this.storage[hashIndex][key];
};

// console.log(hashTable.get('a'));
// console.log(hashTable.get('c'));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // pass key into hashCode to get index of key value pair to remove
  const hashIndex = hashCode(key, this.SIZE);
  // if key doesn't exist, return undefined
  if (!this.storage[hashIndex][key]) return undefined;
  // store key's value at hashIndex as deletedVal
  const deletedVal = this.storage[hashIndex][key];
  // delete val associated with key
  delete this.storage[hashIndex][key];
  // if object at hashIndex is empty, decrement this.items
  if (Object.keys(this.storage[hashIndex]).length === 0) this.items -= 1;
  return deletedVal;
};

// console.log(hashTable)
console.log(hashTable.remove('c'));
console.log(hashTable.items)
// console.log(hashTable.remove('c'));


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
