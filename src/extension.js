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
  this.count = 0;
  
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
  // create new hash "address" for passed-in key by invoking hashCode func with input key arg
  const newHash = hashCode(key, this.SIZE);
  // console.log(newHash);

  // check if amount of things stored is more than 75%  of hash table's size (1st check at 12; 75% of 16 is 12)
  // if so, double hash table's size; re-hash and re-store everything with new hash table size
  if (this.count > .75*this.SIZE) {
    this.SIZE = 2*this.SIZE;
    // console.log(this.SIZE)

    let reHash;
    let cache = {};
    // iterate through current table, passing each stored key through the hash func again with new size
    // in case of multiple key value pairs stored in any nestedObj (same unique hash address), create a cache to store original key value pairs
    // then store all old key value pairs in new this.storage
    for (const prop in this.storage) {
      reHash = hashCode(prop, this.SIZE);
      cache[prop] = prop;
      console.log(cache);
      // console.log(reHash);
      // console.log(this.storage);
    }

    for (const prop in cache) {
      reHash = hashCode(prop, this.SIZE);
      this.storage[reHash] = prop;
    }
  }

  // if the hash "address" does not yet exist in this.storage, create an obj and then add the key as a key-value pair inside that obj
  if (!this.storage[hashCode]) {
    const nestedObj = {};
    nestedObj[key] = value;
    this.storage[newHash] = nestedObj;
  } 
  // if the hash "address" already exists (collision) - add the key as a new key-value pair inside the existing obj
  else {
    this.storage[newHash][key] = value;
  }
  // increment this.count, keeping track of whenever a new key is added to the hashtable
  this.count++;
  // return # of items stored in hash table
  return this.count;
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
  // run the key through the hashCode func to retrieve the key's unique hashCode "address" 
  // it is the same as when key was first 'set' in hash table
  const newHash = hashCode(key, this.SIZE);
  
  // find and return the value stored at input key arg's unique hash address
  return this.storage[newHash][key];
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
  // run the key through the hashCode func to retrieve the key's unique hashCode "address" 
  // it is the same as when key was first 'set' in hash table
  const newHash = hashCode(key, this.SIZE);
  // console.log(newHash);

  // returns undefined if key does not exist
  if (!this.storage[newHash]) return undefined;

  // console.log(this.storage);
  delete this.storage[newHash][key];
  
  // decrement count to signify that amount of elements in hashtable has reduced
  this.count--;
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

// TESTS
/*
const hash = new HashTable;
hash.set('0', 0);
hash.set('1', 1);
hash.set('2', 2);
hash.set('3', 3);
hash.set('4', 4);
hash.set('5', 5);
hash.set('6', 6);
hash.set('7', 7);
hash.set('8', 8);
hash.set('9', 9);
hash.set('10', 10);
hash.set('11', 11);
hash.set('12', 12);
hash.set('13', 13);
console.log(hash.SIZE);
console.log(hash.storage);
hash.set('14', 14);
*/