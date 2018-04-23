/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.count = 0;

  
  this.storage = new Array(this.SIZE);
  console.log(this.storage);
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
  let index = hashCode(key, this.SIZE);
  console.log(index);

  let bucket = this.storage[index];
  console.log(bucket);

  if (!bucket) {
   console.log('bucket undefined, adding now');
   bucket = [key, value];
   console.log(bucket);
   this.storage[index] = bucket;
   this.count++;

   if (this.count > this.SIZE * 0.75) {
     this.SIZE = this.SIZE * 2;
   }
  }
  
  let collision = false;
  for (let i = 0; i < bucket.length; i++) {
    let tuple = bucket[i];
    if ( tuple[0] === key ) {
      tuple[i] = value;
      collision = true;
    }
  }

  return this;
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
  let index = hashCode(key, this.SIZE);
  console.log(index);
  let bucket = this.storage[index];
  console.log('get method, on bucket: ' + bucket);
  
  if ( !bucket ) {
    return null;
  }
  
  for (let i = 0; i < bucket.length; i++) {
    let tuple = bucket[i];
    console.log(tuple);
    if (tuple[0] === key) {
      return key;
    }
    let value = tuple[1];  //RIGHT HERE, current, 10:10AM
  }

  return value;
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
  let index = this.hashCode(key, this.SIZE);
  let bucket = this.storage[index];
  if ( !bucket ) {
    return null;
  }

  for (let i = 0; i < bucket.length; i++) {
    let tuple = bucket[i];

    if ( tuple[0] === key ) {
      bucket.splice(i, 1);
      this.count--;
      if (this.count < this.SIZE * 0.25) {
        this.SIZE = this.SIZE / 2;
      }
      return tuple[1];
     }
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

// var hashT = new HashTable(); TEST CASES!!! 
// hashT.set('Alex Hawkins', '510-599-1930');
// console.log(hashT.get('Alex Hawkins'));

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
