/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.length = 0;
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
    if(key!== null){
      this.storage[key] = value;
      this.length+=1;
    } 
    else{
      
      const newElementIndex = hashCode(value,this.SIZE)
      this.storage[newElementIndex] = value;
      this.length+=1;

    }
    return this.length;
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
  return this.storage[key];
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
  if( key > this.SIZE) return undefined;
  this.storage.splice(key,1);
  if(this.length > 0) this.length -=1
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

console.log(hashCode('apple',16))
// hello index = 2

const newHashTable = new HashTable;
console.log(newHashTable.set(0,'hello')) // returns length of array after using the set method to get with provided index
console.log(newHashTable.set(3,'orange')) 
console.log(newHashTable.set(null,'apple')) // null is place holder for keys without specified index. ran out of time to make it more robust
console.log(newHashTable.get(0))// returns hello
console.log(newHashTable.get(10))//returns apple
console.log(newHashTable.length)
console.log(newHashTable.remove(3))
console.log(newHashTable.length)
console.log(newHashTable.remove(20))
console.log(newHashTable.set(0,'hello')) // returns undefined for index that doesnt exist.
console.log(newHashTable.storage[1])

console.log(newHashTable)
