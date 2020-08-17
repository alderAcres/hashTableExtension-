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

// ONLY set modified in this file
function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
}
// basic structure { size: 16, storage: [{}, {}, {}, {}, ...]  }   

HashTable.prototype.set = function(key, value) {
  // declare constant address and compute address(index of storage) using the hashCode helper function 
  const address = hashCode(key, this.SIZE);

  // MODIFIED code for extension: store key/value pair in the cache object for future rehash if size of table exceeds 75%
  const cache = {};

  // if there is no key/value pair at the address, add it
  if (this.storage[address] === undefined) {
    this.storage[address] = {};
    this.storage[address][key] = value;
  } 
  // else if there is a pre-existing value at the bucket, simply add the key/val pair - this code overwrites as well
  else {
    this.storage[address][key] = value;
  }

  // MODIFIED: store key/val to cache as well
  cache[key] = value;
  
  // return the new number of items stored in the hash table
  let numOfItems = 0;

  // if the bucket is an object, count the number of keys and add to numOfItems
  // else, add 1 to numOfItems
  this.storage.forEach((function(ele) {
    if (typeof ele === "object") {
      numOfItems += Object.keys(ele).length;
    } else {
      numOfItems += 1;
    }
  }));

  // MODIFIED: If adding the new item will push the number of stored items to over 75% of
  // the hash table's SIZE, then double the hash table's SIZE and rehash everything
  if (numOfItems / this.SIZE > 0.75) {
    this.SIZE *= 2;

    // rehash all key/val pair set, which are stored in cache using recursion
    for (let key of cache) {
      this.set(key, cache[key]);
    }
  }

  // output: return number of items in the hash table(this.storage only, excludes prop this.SIZE)
  return numOfItems;
};

HashTable.prototype.get = function(key) {
  // decalre constant address, and compute the address using hashCode function
  const address = hashCode(key, this.SIZE);

  // declare constant bucketVal that is the value of key at the bucket of address
  const bucketVal = this.storage[address][key];

  // output: return the value at the specified key in the bucket
  return bucketVal;
};

HashTable.prototype.remove = function(key) {
  // decalre constant address, and compute the address using hashCode function
  const address = hashCode(key, this.SIZE);

  // declare constant bucketVal and set it to the value of corresponding key at address bucket
  const bucketVal = this.storage[address][key];

   // delete the value from the hash table(this.storage)
   delete this.storage[address][key];

  // if the key/val pair was the only value at the bucket, reassign bucket to undefined
  if (Object.keys(this.storage[address]).length === 0) this.storage[address] = undefined;

  // output: return the value deleted from the hash table
  return bucketVal;
};

// function that returns hash address of bucket that the string key inputted will be assigned to
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
