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
  // find where to put the obj = index
  let index = hashCode(key, this.SIZE)
  console.log(index)
  // if obj alrdy exist, make another property
  if (this.storage[index]) {
    this.storage[index][key] = value
  } else {
    // if not, make a new obj and put that in the array
    let obj = {}
    obj[key] = value
    this.storage[index] = obj
  }


};

let test = new HashTable()
console.log(test)
test.set('hi000', 'value')
test.set('key', 'hello')
test.set('a', 'yi')
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
  // get index
  let index = hashCode(key, this.SIZE)
  console.log(index)
  // loop the obj in the index
  for (let eachKey in this.storage[index]) {
    console.log(eachKey)
    if (eachKey === key) {
      console.log('key found')
      console.log(this.storage[index][eachKey])
      return this.storage[index][eachKey]
    } else {
      return undefined
    }
  }
};

console.log(test)
console.log(test.get('hi000'))
console.log(test.get('a'))



/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE)
  console.log(index)
  console.log(this.storage[index])
  if (!this.storage[index][key]) {
    return undefined
  } else {
    let result = this.storage[index][key]
    delete this.storage[index][key]
    return result
  }
};

console.log(test)
console.log(test.remove('a'))

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

console.log(hashCode('name', 16))

// Do not remove!!
module.exports = HashTable;
