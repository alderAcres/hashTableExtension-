/* eslint-ignore */

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
HashTable.prototype.set = function (key, value) {
  // create a var to represent a bucket on our hashtable
  const bucket = hashCode(key, this.SIZE);
  // check to see if the bucket exists on our storage arr
  if (!this.storage[bucket]) {
    // if it doesn't, set the value of the bucket on our storage arr to an empty arr
    this.storage[bucket] = [];
  }
  // otherwise, push the key and value pair as an array into the bucket
  this.storage[bucket].push([key, value]);
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
HashTable.prototype.get = function (key) {
  // create a var to represent a bucket on our hashtable
  const bucket = hashCode(key, this.SIZE);
  // create a var to represent the current bucket we are on
  const currBucket = this.storage[bucket];
  // check to see if the currBucket exists
  if (currBucket) {
    // if it does, iterate over it's length
    for (let i = 0; i < currBucket.length; i++) {
      // check to see if the first el of the sub-array of our currBucket is equal to the passed in key
      // if it is,return the second el of the currBucket sub-array
      if (currBucket[i][0] === key) return currBucket[i][1];
    }
  }
  // otherwise return undefined because it doesn't exist4
  return undefined;
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  // create a var to represent a bucket on our hashtable
  const bucket = hashCode(key, this.SIZE);
  // create a var to represent the current bucket
  const currBucket = this.storage[bucket];
  // check to see if currBucket exists
  if (currBucket) {
    // iterate over currBucket's length
    for (let i = 0; i < currBucket.length; i++) {
      // check to see if the first el in the sub-array of our currBucket is equal to the passed in key and remove that entry
      if (currBucket[i][0] === key) currBucket.splice(i, 1);
    }
  }
};

// test
const testHash = new HashTable();
testHash.set('ay', 50);
testHash.set('yo', 43);
testHash.set('ye', 12)
console.log(testHash);
testHash.remove('ye');
console.log(testHash);
// test

// Do not modify
function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
