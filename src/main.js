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
  // get the hash from the hashCode function
  const hash = hashCode(key, this.SIZE);
  // check to see what is already inside the storage using hash code
  // check to see if it is an object
  if (typeof this.storage[hash] !== 'object') {
    // if it isnt, create a new object there
    this.storage[hash] = {};
  }
  // then put the value inside an object with key value pair
  this.storage[hash][key] = value;
  // return the number of keys
  return this.storage.keys.length;
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
  // get the hash from the hashCode function
  const hash = hashCode(key, this.SIZE);
  // check to see if an object exists at that hash
  if (typeof this.storage[hash] === 'object') {
    // check to see if the key exists
    if (this.storage[hash][key]) {
      // if it does, return the value at the key provided in arguments
      return this.storage[hash][key];
    }
    // otherwise, return 'nothing found'
    return 'Nothing was found at this key!';
  }
  // otherwise, return 'nothing found'
  return 'Nothing was found at this key!';
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
  // get the hash from the hashCode function
  const hash = hashCode(key, this.SIZE);
  // check to see if there is an object at the hash
  if (typeof this.storage[hash] === 'object') {
    // check to see if the key exists
    if (this.storage[hash][key]) {
      // delete if found
      // first store the value to delete
      let temp = this.storage[hash][key];
      // delete the key value pair;
      delete this.storage[hash][key];
      // return the deleted value
      return temp;
    }
  }
  // if nothing was found at hash, return 'nothing found'
  return 'Nothing was found at this key';
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

// tests
const hashTest = new HashTable();
// hashTest.set('jim', 'yoon');
// console.log('getting jim', hashTest.get('jim'));
// hashTest.set('hydro', 'flask');
// hashTest.get('hydro');
// console.log('getting hydro', hashTest.get('hydro'));
// hashTest.remove('hydro');
// console.log('removed hydro', hashTest.get('hydro'));
// hashTest.get('hydro');
// console.log('getting hydro again after deleting', hashTest.get('hydro'));
// console.log('the hash table now', hashTest);

hashTest.set('jim', 'yoon');
console.log('getting jim', hashTest.get('jim'));
hashTest.set('james', 'yoon');
console.log('getting james', hashTest.get('james'));
console.log('the hashtable now', hashTest);



// Do not remove!!
module.exports = HashTable;
