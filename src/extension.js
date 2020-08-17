/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW
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

// If adding the new item will push the number of stored items to over 75% of
// the hash table's SIZE, then double the hash table's SIZE and rehash everything

HashTable.prototype.set = function(key, value) {
  //create bucket, assign it to hashCode(string, this.size)
  const bucket = hashCode(key, this.SIZE);
  //create an object with passed in key and value pair
  const pair = {};
  pair[key] = value;
  //check if bucket is empty
  if (this.storage[bucket] === undefined) {
    //if yes, assign storage to the pair passed in
    this.storage[bucket] = pair;
  } else {
    //else, create the bucket in storage, then add in the key/value pair
    this.storage[bucket][key] = value;
  }
  //find the number of keys in buckets
  let totalValues = 0;
  //iterate over the values in this.storage (an array of bukect objects)
  for (let i = 0; i < this.storage.length; i += 1) {
    //if the bucket exists/contains items
    if (this.storage[i]) {
     //increment totalValues by the number of keys that exist in the bucket
      totalValues += Object.keys(this.storage[i]).length;
    }
  }
  //check if the number of stored items in buckets is over 75% of this.SIZE
  if ((totalValues / this.SIZE) > .75) {
    //double the size
      this.SIZE *= 2;
    //iterate through the buckets
    for (let i = 0; i < this.storage.length; i+= 1) {
      //if the bucket has values
      if (this.storage[i]) {
        //create a new hash code with the first key in the bucket
        let newHash = hashCode(this.storage[i][0], this.SIZE);
        //reassign the value of the bucket to the new bucket
        this.storage[newHash] = this.storage[i];
        //delete the old bucket
        delete this.storage[i];
      } else {
        //if the bucket exists but is empty?
        //delete the bucket
        delete this.storage[i];
      }
    }
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
  //use the hashCode function to find which bucket the key is in
  const bucket = hashCode(key, this.SIZE);
  //return the value from the key from inside the bucket
  return this.storage[bucket][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

// If the hash table's SIZE is greater than 16 and the result of removing the
// item drops the number of stored items to be less than 25% of the hash table's SIZE
// (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.

HashTable.prototype.remove = function(key) {
  //use hashCode function to locate the bucket
  const bucket = hashCode(key, this.SIZE);
  //check if undefined-if so, return undefined
  if (!(this.storage[bucket])) return undefined;
  //else, save the key/value pair
  else {
    const removed = this.storage[bucket][key];
    //delete from bucket
     delete this.storage[bucket][key];
     //find the new total number of values in storage
     let totalValues = 0;
     //iterate over the values in this.storage (an array of bukect objects)
     for (let i = 0; i < this.storage.length; i += 1) {
       //if the bucket exists/contains items
       if (this.storage[i]) {
        //increment totalValues by the number of keys that exist in the bucket
         totalValues += Object.keys(this.storage[i]).length;
       }
     }
     //check if less than 25% of size, and if size is greater than 16
     if (this.SIZE > 16 && (Math.floor(totalValues / this.SIZE)) < 0.25) {
       //reset this.SIZE
       this.SIZE /= 2;
       //reassign all hash values
       for (let i = 0; i < this.storage.length; i+= 1) {
        //if the bucket has values
        if (this.storage[i]) {
          //create a new hash code with the first key in the bucket
          let newHash = hashCode(this.storage[i][0], this.SIZE);
          //reassign the value of the bucket to the new bucket
          this.storage[newHash] = this.storage[i];
          //delete the old bucket
          delete this.storage[i];
        } else {
          //if the bucket exists but is empty?
          //delete the bucket
          delete this.storage[i];
        }
      }
    }
     //return removed key/value pair
     return removed;
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

// Do not remove!!
module.exports = HashTable;



// YOUR CODE ABOVE

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
