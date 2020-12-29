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
* HashTable constructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.count = 0
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
  // generate an index
  let hashIndex = hashCode(key, this.SIZE)

  // check to see if storage array @ index is undefined
  if (!this.storage[hashIndex]) this.storage[hashIndex] = {}

  // add key/value pair to the object @ index
  this.storage[hashIndex][key] = value
  this.count++

  return this.count
};

/**** Tests ****/
// const table = new HashTable
// table.set('first', 'A')
// table.set('firsttt', 123)
// table.set('second', 'B')
// table.set('third', true)
// console.log(`${table.count} //-> should be: 4`)
// console.log(table)


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
  // generate an index
  let hashIndex = hashCode(key, this.SIZE)

  // go to storage array @ index, then get value by its key
  return this.storage[hashIndex][key]
};

/**** Tests ****/
// console.log(`${table.get('first')} //-> should be: "A"`)
// console.log(`${table.get('firsttt')} //-> should be: 123`)


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // generate an index
  let hashIndex = hashCode(key, this.SIZE)

  // create a variable to store the value
  let element = this.storage[hashIndex] ? this.storage[hashIndex][key] : undefined

  // remove the key/value pair if it exists
  if (element) {
    delete this.storage[hashIndex][key]
    this.count--
  }
  
  // return the deleted value
  return element
};

/**** Tests ****/
// console.log(`${table.remove('second')} //-> should be: "B"`)
// console.log(`${table.remove('zzz')} //-> should be: undefined`)
// console.log(`${table.count} //-> should be: 3`)



// Do not remove!!
module.exports = HashTable;
