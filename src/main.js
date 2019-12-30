/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  // assign a counter to 0, keeps track of number of items in hash table
  this.COUNTER = 0;
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
  
  // get the index using provided hashCode function, params: input key, storage size
  const index = hashCode(key, this.SIZE)

  // check if the above index bucket of storage is empty
    // if yes, create empty object with key: value...
    //...push this object to the index bucket
    // increment counter
  if (!this.storage[index]) {
    const obj = {};
    obj[key] = value;
    this.storage[index] = obj;
    this.COUNTER += 1;
  } else {
    // if no (an object already exist in the bucket)
    // assign key: value to the object
    // also increment counter only if it's a new key (not overwriting existing)
    if (!this.storage[index].hasOwnProperty(key)) {
      this.COUNTER += 1;
    }
    this.storage[index][key] = value;
   
  }

  
  return this.COUNTER;

};

const hashTable = new HashTable();
console.log(hashTable);
hashTable.set('a', 10);
console.log(hashTable.set('al', 12));
console.log(hashTable.set('k', 11));

console.log(hashTable);

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

  // iterate through this.storage array
    // check if the bucket is an object, and if the bucket has key property
      // true --> return the key's value
  for (const bucket of this.storage) {
    if (typeof bucket === 'object' && bucket.hasOwnProperty(key)) {
      return bucket[key];
    }
  }
  // if we did not return key's value
  // this function ends, and will return undefined
};

console.log(hashTable);
console.log(hashTable.get('b'));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {

  // declare a removedItemValue, to be return later
  let removedItemValue;

  // iterate through this.storage array
    // check if bucket is an object, and if the bucket has key property
      // true --> store value to removedItemValue
      // delete this [key, value] from bucket
      // decrement this.COUNTER
      // check if bucket is empty out
        // true --> delete this bucket object
      // return removedItemValue
  for (let i = 0; i < this.storage.length; i += 1) {
    if (typeof this.storage[i] === 'object' && this.storage[i].hasOwnProperty(key)) {
      removedItemValue = this.storage[i][key];
      delete this.storage[i][key];
      this.COUNTER -= 1;
      if (JSON.stringify(this.storage[i]) === '{}') {
        delete this.storage[i];
      }
      return removedItemValue;
    }
  }
};

console.log(hashTable);
console.log(hashTable.remove('a'))
console.log(hashTable.remove('al'))
console.log(hashTable.remove('k'))


console.log(hashTable);


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
