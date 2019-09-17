/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
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
  if (!conflicting) {
    bucket.push([key, value]);
    this.numElements += 1;
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
    const tuple = bucket[i];
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
  const hashed = hashCode(key.toString(), this.SIZE);
  const bucket = this.storage[hashed];

  if (!bucket) {
    return "No value exists at this key. Nothing removed.";
  }
  // iterate over the bucket
  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    // check to see if key is inside bucket
    if (tuple[0] === key) {
      // if it is, get rid of this tuple
      bucket.splice(i, 1);
      this.numElements -= 1;
      return tuple[1];
    }
  }
  return "No value exists at this key. Nothing removed.";
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

// const hashy = new HashTable();
// hashy.set(0, "hello");
// hashy.set(5, "world");
// hashy.set(2, "so excited");
// let x = hashy.set(7, "!");
// let y = hashy.remove(7);
// console.log(hashy)

// console.log(x);
// console.log(y);