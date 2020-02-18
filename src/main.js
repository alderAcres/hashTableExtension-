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
  //set an index with hash code
    const index = hashCode(key, this.SIZE)
    //if an obj at the index already exists, add new key/value pair
    if(this.storage[index]) {
      this.storage[index][key] = value
    //if not, create a new object and set its key value pair
    } else {
      let newObj = {}
      newObj[key] = value
      this.storage[index] = newObj
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
  //get index from provided key
  const index = hashCode(key, this.SIZE)
  //set new varable to retrived object 
  let retrievedObj = this.storage[index]
  //get value of object
  let value = retrievedObj[key]
  //return value
  return value
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
  //get index from provided key
  const index = hashCode(key, this.SIZE)
  //check if theres an object
  if(this.storage[index] === undefined) return undefined
  //if there is delete the object
  delete this.storage[index]
};

let newHash = new HashTable()
newHash.set('password', 'My name is Taylor')
newHash.set('newpass', 'More dataaaa')
console.log(newHash.storage)
newHash.set('newpassfrgsd', "this is a collision")
console.log(newHash.storage)
console.log(newHash.get('newpassfrgsd'))
console.log(newHash.get('password'))
newHash.remove('password')
console.log(newHash.storage)


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
