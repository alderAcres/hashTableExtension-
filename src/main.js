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

//*is there a better place to define this so as to not pollute the global environment?
const myHash = new HashTable();

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
  //*get our index from the hashCode function
  let index = hashCode(key);
  //*if we try adding another key-value pair at an index which already has an element, we have a collision. we use subarrays at each index to handle collisions that may occur.
  //*check and see if the index is NOT an element on the hash table
  if (!this.storage[index]) {
    //*if not, create a storage array at that index
    this.storage[index] = []
  }
  //*either way, we then then add an array containing the key and value to the subArray, 
  this.storage[index].push([key, value]);
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
  //*get the index from the hashCode function
  let index = hashCode(key);
  //*check if the index is an element on our object
  if (this.storage[index]) {
    //*if so, the index will be a sub-array. Loop over the subarray, and check if the first element of each sub-array matches with the key we're searching for. 
    for (let i = 0; i < this.storage[index].length; i++) {
      let subArray = this.storage[index][i]
      //*if our key in the subArray matches the key we're searching for, return the value
      if (subArray[0] === key) {
        return subArray[1]
      }
    }
  }
  //*if we don't ever find a matching key, return undefined
  return undefined;
};

// console.log(myHash.set('code', 'smith'))
// console.log(myHash.get('code'))//*smith

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  //*grab our index from hashCode function
  let index = hashCode(key);
  let cache;
  //*check and see if our object contains the element we want to remove
  if (this.storage[index]) {
    //*loop over our storage object
    for (let i = 0; i < this.storage[index].length; i++) {
      let subArray = this.storage[index][i];
      //*if we find a sub-array that matches the key we are searching for...
      if (subArray[0] === key) {
        //*store the matching value of that key in our cache variable
        cache = subArray[1];
        //*delete the key-value pair from the hash table
        delete this.storage[index];
        //*return the cached value
        return cache;
      }
    }
  }
};

console.log(myHash.set('code', 'smith')) //* undefined, as not returning here
console.log(myHash.get('code')) //*smith
console.log(myHash.remove('code')) //*smith
console.log(myHash.storage) //*empty array


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
