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
  let index = hashCode(key, 16);

  if(!this.storage[index]) {
    this.storage[index] = [[key, value]];
    return 1;
  }

  for (let i = 0; i < this.storage[index].length; i++) {
    if(this.storage[index][i][0] === key) {
      this.storage[index][i][1] = value;
      return 0;
    }
  }

  this.storage[index][this.storage[index].length] = [key, value];
  return 1;
};

// //testing
// let hash = new HashTable()

// console.log(hash.set("xiao", '2'), "=> 1")
// console.log(hash.set("yu", '3'), "=> 1")
// console.log(hash.set("xiao", '3'), "=> 0")
// console.log(hash.set("yu", '4'), "=> 0")
// console.log(hash.set("omeara", '5'), "=> 1")




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
  let index = hashCode(key, 16);

  if (this.storage[index]) {
    for (let i = 0; i < this.storage[index].length; i++) {
      if (this.storage[index][i][0] === key) {
        return this.storage[index][i][1];
      }
    }
  }

  return undefined;
};

// //testing
// console.log(hash.get("xiao", '2'), "=> 3") 
// console.log(hash.get("yu", '3'), "=> 4")
// console.log(hash.get("xiao", '3'), "=> 3")
// console.log(hash.get("yu", '4'), "=> 4")
// console.log(hash.get("omeara", '5'), "=> 5")
// console.log(hash.get("colin", '5'), "=> undefined")


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let index = hashCode(key, 16);
  let value;

  if (this.storage[index]) {
    for (let i = 0; i < this.storage[index].length; i++) {
      if (this.storage[index][i][0] === key) {
        value = this.storage[index][i][1]
        this.storage[index].splice(i, 1);
      }
    }

    return value;
  }

  return undefined;
};

// //testing
// console.log(hash.remove("xiao"), "=> 3")
// console.log(hash.remove("yu"), "=> 4")
// console.log(hash.remove("omeara"), "=> 5")
// console.log(hash.remove("colin"), "=> undefined")






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
