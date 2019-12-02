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
  this.counter = 0; //creating counter for total elements within storage

  this.collided = new Array(); //storage for collided elements
  this.collidedcounter = 0; //counter for collided elements
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
  //if key does not exist, then create new key value pair within storage
  if (!this.storage[key]) {
    this.storage[key] = value;
    this.counter++; 
    return this.counter;
  }

  //if key exists, overwrite the existing key with a new value
  //account for collisions properly by creating a new link within speciifc key
  //increment counter to illustrate that collision has happened, push collided element into collided storage
  if (this.storage[key]) {
   this.collided.push([key,this.storage[key]]);
   this.storage[key] = value;
   this.collidedcounter++;
   return this.counter;
  }

};

const test = new HashTable();
console.log(test.set(1, 18));
console.log(test.set(2, 24));
console.log(test.set(1, 13));
// console.log(test);

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
  if (this.collided) {
    for (let i = 0; i < this.collided.length; i++) {
      if (this.collided[i][0] === key) {
        return this.collided[i][1];
      } else {
        return this.storage[key];
      }
    }
  } else {
    return this.storage[key];
    }
}

// console.log(test.get(2));
// console.log(test.storage[2]);

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  if (this.storage[key]) {
    let deleted = this.storage[key];
    delete this.storage[key];
    return deleted;
  } else {
    return undefined;
  }
};

console.log(test.remove(1));

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
