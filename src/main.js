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
  //hash creates the address/index for they key and value
  const hash = hashCode(key, this.storage.length)

  if(this.storage[hash] === undefined){
    //if there is no values or keys in the hash address then add a key and value there
    this.storage[hash] = [
      [key, value]
    ]
  } else if(this.storage[hash]){
    if(this.storage[hash][0] !== undefined){
      for(let i = 0; i < this.storage[hash].length; i++){
        if(key !== this.storage[hash][i][0]){
          const bucket = [key, value]
          this.storage[hash].push(bucket)
        }
      }
    } else {
      const bucket = [key, value]
      this.storage[hash].push(bucket)
    }
    //handles collision by chaining on a new key/value in the same hash address, but does not allow duplicate key/values
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
  const hash = hashCode(key, this.storage.length)
  let value;

  if(this.storage[hash]) {
    //loops through the storage at the hash address to check for multiple values
    for(let i = 0; i < this.storage[hash].length; i++){
      //makes sure that we are returning the correct value by checking to make sure the keys are equal
      if(key === this.storage[hash][i][0]) {
        value = this.storage[hash][i][1]
        break
      }
    }
    return value
  }
  return 'The value does not exist'
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
  const hash = hashCode(key, this.storage.length)
  
  //checks to see it the hash exists in our storage
  if(this.storage[hash]) {
    //loops through the storage at the hash address to check for multiple values
    for(let i = 0; i < this.storage[hash].length; i++){
      //if the key is found at the hash address, then remove the key and value pair
      if(key === this.storage[hash][i][0]){
        this.storage[hash][i] = undefined
      }
    }
  } else {
    return undefined
  }
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

const table = new HashTable()

console.log(table.set('Mike', 'name'))
console.log(table.set('Mike', 'name'))
console.log(table.storage)
console.log(table.get('Mike'))
console.log(table.remove('Mike'))
console.log(table.storage)
console.log(table.set('Mike', 'name'))
console.log(table.storage)

// Do not remove!!
module.exports = HashTable;

