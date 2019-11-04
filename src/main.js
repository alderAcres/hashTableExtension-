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


const hash = new HashTable()
console.log(hash)


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
  //to set a property first access whether or not a value exists for the particular index
  //if it goes add on the value into that particular index with your key, if there is a key overrwrite it
  //if there is no key/value pairing at the index you are accessing then you create a new object and add it onto that index
  const index = hashCode(key, this.SIZE)
  if (this.storage[index]) {
    this.storage[index][key] = value
  } else {
    this.storage[index] = { [key] : value}
  }

};

console.log(hash.set("hello", "goodbye"))
hash.set("hello", "byebye")
hash.set("dua", "lipa")
hash.set("feelin", "myself")
console.log(hash)

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
  //check to see if the key exists at the specific index that it was genereated for
  //if it doesn't exist then you should return undefined
  //if it does exist return the VALUE
  const index = hashCode(key, this.SIZE)
  console.log(index)

  if(!this.storage[index]) {
    return 
  } else {
    console.log(this.storage[index][key])
    return this.storage[index][key]
  }
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
  //as always first get the index asssociated with your key
  const index = hashCode(key, this.SIZE) 
  if(!this.storage[index]) {
    return
  } else {
    const removedValue = this.storage[index][key]
    delete this.storage[index][key]
    return removedValue
  }
};

console.log(hash.remove("hello"))
console.log(hash.remove("hello"))
console.log(hash)
console.log(hash.remove("dua"))
console.log(hash)

console.log(hash.remove("dua"))



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
