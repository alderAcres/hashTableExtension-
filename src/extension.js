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

function HashTable() {
  this.SIZE = 16;
  this.numElements = 0;

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
  // hash a string of the key
  const hashed = hashCode(key.toString(), this.SIZE)

  // use hash to save an object of the k/v pair
  var bucket = this.storage[hashed];

  // if this.storage @ hash key is undefined, create a new bucket
  if (bucket === undefined) {
    var bucket = [];
    this.storage[hashed] = bucket;
  }

  let conflicting = false;
  // iterate through our bucket to see if there are any conflicting
  // k/v pairs within our bucket. If there are any, override them.
  for (let i = 0; i < bucket.length; i++) {
    let tuple = bucket[i];
    // if the bucket[i] contains the same key, over write the saved value
    // associated with that key, otherwise, push new array in
    if (tuple[0] === key) {
      tuple[1] = value;
      conflicting = true;
    }
  }

  // if no conflicting k/v pairs, push array of k/v into the bucket
  // if the push makes this.Size more than 75% full, double size
  if (!conflicting) {
    bucket.push([key, value]);
    this.numElements += 1;
    if (this.numElements > this.SIZE * 0.75) {
      this.resize(this.SIZE * 2);
    }
  }
  return this.numElements;
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
  const hashed = hashCode(key.toString(), this.SIZE);
  const bucket = this.storage[hashed];

  // if there is no bucket at the hashed key, return nothing stored at key
  if (bucket === undefined) {
    return "Nothing stored at this key.";
  }

  // otherwise, loop through the buckets and return the value when the
  // key provided as an argument is found
  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    if (tuple[0] === key) {
      return tuple[1];
    }
  }

  // if the key doesn't match anything in hashed bucket, return error msg
  return "Nothing stored at this key.";
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
  let hashed = hashCode(key.toString(), this.SIZE);
  var bucket = this.storage[hashed];

  if (!bucket) {
    return null;
  }
  // iterate over the bucket
  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    // check to see if key is inside bucket
    if (tuple[0] === key) {
      // if it is, get rid of this tuple
      bucket.splice(i, 1);
      this.numElements -= 1;
      // if this removal opens up more than 75% FREE space,
      // reduce size of the hash table by half
      if (this.numElements < this.SIZE * 0.25) {
        // don't reduce table size if size is less than 16
        if (this.SIZE >= 16) {
          this.resize(this.SIZE / 2);
        }
      }
      return tuple[1];
    }
  }
};

HashTable.prototype.resize = function(newLimit) {
  // create a copy of data stored
  let oldStorage = this.storage;

  // reset data in hash table
  this.SIZE = newLimit;
  this.numElements = 0;
  this.storage = [];

  // iterate through saved hashtable and 
  // reassign new hash keys to each saved k/v pair
  oldStorage.forEach(function(bucket) {
    if (!bucket) {
      return;
    }
    else {
      this.numElements += 1;
    }
    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i];
      this.set(tuple[0], tuple[1]);
    }
  }.bind(this));
};

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
