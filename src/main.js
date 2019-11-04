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
  //first we grab a hashcode from the hash function to be used in the bucket
  let code = hashCode(key, this.SIZE);
  
  //check to see if the bucket at the specified hashcode index exists
  if (this.storage[code] === undefined) {
    this.storage[code] = [key,value];
  } else {
    let insert = false;
    //if a key value pair already exists at the specified index, then loop through the 
    //bucket at that index and reassign values;
    for (let i = 0; i < this.storage[code].length; i++) {

        let currBucket = this.storage[code][i];
        //console.log(currBucket)
        if (currBucket[0] === key) {
          currBucket[1] = value;
          insert = true;
        }
     }
     //if 
     if (insert === false) {
       this.storage[code].push([key, value]);
     }
  } 
};
let table = new HashTable();
table.set(0, 'Tim');
table.set(1, 'Dan');
table.set(2, 'Chris');
table.set(5, 'Paul');

console.log(table);

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
  let code = hashCode(key, this.SIZE);
  if (this.storage[code].length === 1) {
    return this.storage[code];
  } else {
    for (let i = 0; i < this.storage[code].length; i++) {
      if (this.storage[code][i] === key) {
        return this.storage[code][i];
      }
    }
  }
};

console.log(table.get(5))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let code = hashCode(key, this.SIZE);
  let removed;
  //check to see if there are multiple values stored at the specified code
  if (this.storage[code].length === 1 && this.storage[code][0][0] === key) {
    removed = this.storage[code];
    delete this.storage[code];
    return removed;

  }
  //if there are multiple values at the specified code, loop through values and find the right key
  else {
    for (let i = 0; i < this.storage[code].length; i++) {
      if (this.storage[code][i] === key) {
        removed = this.storage[code][i];
        return removed;
      }
    }
  }
  return undefined;
};
console.log(table.remove())



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
