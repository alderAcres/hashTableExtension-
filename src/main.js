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
// basic structure { size: 16, storage: [{}, {}, {}, {}, ...]  }  

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply OVERWRITE
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  // declare constant address and compute address(index of storage) using the hashCode helper function 
  const address = hashCode(key, this.SIZE);

  // if there is no key/value pair at the address, add it
  if (this.storage[address] === undefined) {
    this.storage[address] = {};
    this.storage[address][key] = value;
  } 
  // else if there is a pre-existing value at the bucket, simply add the key/val pair - this code overwrites as well
  else {
    this.storage[address][key] = value;
  }
  
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

  // output: return number of items in the hash table(this.storage only, excludes prop this.SIZE)
  return numOfItems;
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
  // decalre constant address, and compute the address using hashCode function
  const address = hashCode(key, this.SIZE);

  // declare constant bucketVal that is the value of key at the bucket of address
  const bucketVal = this.storage[address][key];

  // output: return the value at the specified key in the bucket
  return bucketVal;
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

// Test Case - pass
// const hashTable = new HashTable();
// console.log(hashTable.set('first', 1));
// console.log(hashTable);
// console.log(hashTable.set('second', 2));
// console.log(hashTable);
// console.log(hashTable.get('second'));
// console.log(hashTable);
// console.log(hashTable.remove('first'));
// console.log(hashTable);

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
