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
  this.SIZE = 3;
  
  this.storage = new Array(this.SIZE);
  this.count = 0;
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
  let index = hashCode(key, this.SIZE);
  // console.log('The index is: ', index);
  
  if (this.storage[index] === undefined){
    this.storage[index] = {[key]: value}
    this.count++;
    // console.log('The storage is now: ', this.storage);
    // console.log('The number of items in hash table is now: ', this.count);
  }

  if (this.storage[index][key]){
    this.storage[index][key] = value;
    // console.log('The storage is now: ', this.storage);
    // console.log('The number of items in hash table is now: ', this.count);
  } else {
    this.storage[index][key] = value;
    this.count++
    // console.log('The storage is now: ', this.storage);
    // console.log('The number of items in hash table is now: ', this.count);
  }

  if (this.count / this.SIZE >= 0.75){
    let oldStorage = this.storage;
    this.SIZE *= 2;
    // console.log('The size is now: ', this.SIZE);
    this.storage = [];
  
    for (let i = 0; i < oldStorage.length; i++){
      if (oldStorage[i]){
        for (let key in oldStorage[i]){
          let index = hashCode(key, this.SIZE);
  
          if (this.storage[index] === undefined){
            this.storage[index] = {key: oldStorage[i][key]}
          } else {
            this.storage[index][key] = oldStorage[i][key];
          }
        }
      }
    }

    // console.log('The storage is now: ', this.storage);
  }

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
  let index = hashCode(key, this.SIZE);
  // console.log('The index is: ', index);

  if (this.storage[index] === undefined){
    return 'This key does not exist in the hash table'
  } else {
    return this.storage[index][key];
  }
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
  let index = hashCode(key, this.SIZE);

  if (this.storage[index] === undefined){
    return undefined;
  } else {
    let deleted = this.storage[index][key];
    // console.log('This key has been deleted: ', deleted);

    delete this.storage[index][key];
    this.count--;
    // console.log('The number of items in hash table is now: ', this.count);
    // console.log('The storage is now: ', this.storage);
    
    
    return deleted;
  }
  
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


const hashTable = new HashTable();

// console.log(hashTable.set('name0', 2));
// console.log(hashTable.set('job', 'engineer'))
// console.log(hashTable.set('name0', 21))
// console.log(hashTable.set('name000', 6));
// console.log(hashTable.get('last'));
// console.log(hashTable.get('name0'));
// console.log(hashTable.get('job'));
// console.log(hashTable.remove('name000'))
// console.log(hashTable.remove('name0'))
// console.log(hashTable.remove('name0'))


