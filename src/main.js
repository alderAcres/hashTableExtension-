/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  // a count of the number of unique key-value pairs in the hashtable
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
HashTable.prototype.set = function (key, value) {
  // compute the hash of the passed in key
  const hashedKey = hashCode(key, this.SIZE);
  // this hashedKey is the "bucket" that the key-value pair will be placed in
  // each bucket will be an object
  if (!this.storage[hashedKey]) {
    // if that bucket object does not yet exist, create an new one, insert
    // the key-value pair into the bucket. then put that bucket in the correct
    // location in the hashtable
    const newBucket = {};
    newBucket[key] = value;
    this.storage[hashedKey] = newBucket;
  } else {
    // if it does exist, there might be a collision!
    // if the key already exists in the bucket, then we are overwriting and we
    // should not increment count. we return the current count
    if (this.storage[hashedKey][key]) {
      this.storage[hashedKey][key] = value;
      return this.count;
    }
    // otherwise, it is definitely a collision;
    this.storage[hashedKey][key] = value;
  }
  // increment the count of unique pairs in the hashtable
  this.count += 1;
  // return the new number of items stored in the hashtable
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
HashTable.prototype.get = function (key) {
  // compute the hash of the passed in key to determine which bucket to look at
  const hashedKey = hashCode(key, this.SIZE);
  // access the object in the bucket and use the unhashed key to retrieve its
  // associated value
  const value = this.storage[hashedKey][key];
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
HashTable.prototype.remove = function (key) {
  // compute the hash of the passed in key to determine which bucket to look at
  const hashedKey = hashCode(key, this.SIZE);
  // if there is no object in the bucket then it does not exist in the hashtable
  if (!this.storage[hashedKey]) return;
  // access the object in the bucket and delete the key-value pair
  const removedValue = this.storage[hashedKey][key];
  // delete the entry from the hashtable
  delete this.storage[hashedKey][key];
  // return the value
  // decrement the count of unique pairs in the hashtable
  this.count -= 1;
  // eslint-disable-next-line consistent-return
  return removedValue;
};

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

// TESTS
// const ht = new HashTable();
// console.log(ht.set('apple', 1)); // new insertion 1
// console.log(ht.set('apple', 2)); // overwrite 1
// console.log(ht.set('apple', 3)); // overwrite 1
// console.log(ht.set('apple', 4)); // overwrite 1
// // not collisions because they are the same key each time
// console.log(ht); // HT [...,{'apple': 4},...]
// console.log(ht.get('apple')); // 4
// console.log(ht.remove('apple')); //
// console.log(ht.remove('orange')); // undefined
// ht.set('pear', 99);
// console.log(ht);

// Do not remove!!
module.exports = HashTable;
