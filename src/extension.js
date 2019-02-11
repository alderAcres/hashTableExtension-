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
  let hash = hashCode(key, this.SIZE);
  // if there is collision
  if (this.storage[hash]) {
    this.storage[hash][key] = value;
  // no collision, create new object and add
  } else {
    this.storage[hash] = {};
    this.storage[hash][key] = value;
  }

  this.count++;

  // if count gets larger than 75% expand
  if (this.count > this.SIZE*0.75) {
    let newSize = this.SIZE * 2;
    let newStorage = new Array(newSize);

    // loop through former table
    for (let index in this.storage) {
      // if table cell is occupied
      if (this.storage[index]) {
        // loop thorugh object storing key value
        for (let key in this.storage[index]) {
          // rehash and add it to new storage
          let hash = hashCode(key, newSize);
          if (newStorage[hash]) {
            newStorage[hash][key] = this.storage[index][key];
          } else {
            newStorage[hash] = {};
            newStorage[hash][key] = this.storage[index][key];
          }
          
        }
      }
    }
    this.SIZE = newSize;
    this.storage = newStorage;
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
  let hash = hashCode(key, this.SIZE);
  if (this.storage[hash] === undefined) return undefined;
  else return this.storage[hash][key];
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
  let hash = hashCode(key, this.SIZE);
  let value = this.get(key);
  if (value === undefined) {
    return value;
  } else {
    delete this.storage[hash][key];
    this.count--;

    // if size greater than 16 and count is less than 25% shrink table
    if (this.SIZE > 16 && this.count < this.SIZE*0.25) {
      let newSize = this.SIZE / 2;
      let newStorage = new Array(newSize);

      // loop through former table
      for (let index in this.storage) {
        // if table cell is occupied
        if (this.storage[index]) {
          // loop thorugh object storing key value
          for (let key in this.storage[index]) {
            // rehash and add it to new storage
            let hash = hashCode(key, newSize);
            if (newStorage[hash]) {
              newStorage[hash][key] = this.storage[index][key];
            } else {
              newStorage[hash] = {};
              newStorage[hash][key] = this.storage[index][key];
            }
            
          }
        }
      }
      this.SIZE = newSize;
      this.storage = newStorage;
    }

    return value;
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


// Tests

// console.log(hashCode('z', 32));
// console.log(hashCode('y', 32));

// let hashtable = new HashTable;
// hashtable.set('y', 1);
// hashtable.set('z', 2);
// hashtable.set('c', 3);
// hashtable.set('d', 4);
// hashtable.set('e', 5);
// hashtable.set('f', 6);
// hashtable.set('g', 7);
// hashtable.set('h', 8);
// hashtable.set('i', 9);
// hashtable.set('j', 10);
// hashtable.set('k', 11);
// hashtable.set('l', 12);
// // console.log(hashtable.get('y'));
// // console.log(hashtable.get('z'));
// console.log('added 12, count: ', hashtable.count, 'table size: ', hashtable.SIZE);
// hashtable.set('m', 13);
// console.log('added 13, count: ', hashtable.count, 'table size: ', hashtable.SIZE);
// // console.log(hashtable.get('y'));
// // console.log(hashtable.get('z'));
// hashtable.remove('m');
// hashtable.remove('l');
// hashtable.remove('k');
// hashtable.remove('j');
// hashtable.remove('i');
// console.log('removed 5, count: ', hashtable.count, 'table size: ', hashtable.SIZE);
// hashtable.remove('h');
// console.log('removed one more, count: ', hashtable.count, 'table size: ', hashtable.SIZE);
// console.log(hashtable.get('z'));
