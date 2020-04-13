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
  //create a prop to determine how many times a key was added to the table
  this.length = 0;
  this.storage = new Array(this.SIZE);
}


HashTable.prototype.set = function(key, value) {
  const index = hashCode(key, this.SIZE);
  // increase the length everytime the set method is invoked
  this.length += 1;
  if (this.storage[index] === undefined) {
    const bucket = {};
    bucket[key] = value;
    this.storage[index] = bucket;
  } else {
    this.storage[index][key] = value;
  }

  if (this.length >= (this.SIZE * 0.75)) {
    // create a copy of the current hashTable
    const storageCopy = this.storage;
    // double the SIZE
    this.SIZE = this.SIZE * 2;
    // create a new storage with the correct size and assign it to storage
      // now the storage has the appropriate number of undefined indeces
    this.storage = new Array(this.SIZE);
    // reset the length of this.storage
    this.length = 0;
    // Because hashTables are arrays, we can iterate over the storagecopy to access their keys/values
    for (const bucket of storageCopy) {
      // if there is something in the bucket
      if (bucket !== undefined) {
        // get all the key/value pairs
        for (let key in bucket) {
          // rehash them into the new table with the bigger size
          this.set(key, bucket[key])
        }
      }
    }
  }
};



HashTable.prototype.get = function(key) {
  const index = hashCode(key, this.SIZE);
  const current = this.storage[index];
  return current[key]
};

// DOESN'T WORK - remove still works in main.js
HashTable.prototype.remove = function(key) {
  // decrement the value of length every time a key is removed
  this.length -= 1;
  const index = hashCode(key, this.SIZE);
  const current = this.storage[index];
  if (!current) {
    return undefined;
  }
  const deletedKey = current[key];
  delete current[key];


  // check if the size is greater than 16 AND the length is less/equal to 25% of the hashtable
  // console.log(32 * 0.25)
  if (this.SIZE > 16 && this.length <= (this.SIZE * 0.25)) {
    // create another copy of the storage
    const storageCopy = this.storage;
    // reduce the size by half
    this.SIZE = this.SIZE / 2;
    // make a new storage set to an empty array of new size
    this.storage = new Array(this.SIZE);
    // reset the length to 0
    this.length = 0;
    // loop through the storage copy to get the key/value pairs
    for (const bucket of storageCopy) {
      // if there is something in the bucket
      if (bucket !== undefined) {
        // loop through it and rehash the key/value pairs
        for (const key in bucket) {
          this.set(key, bucket[key])
        }
      }
    }
  }
  // return the deleted key(s)
  return deletedKey;
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




let test = new HashTable();

const doubleResize = () => {
  for (let i = 0; i < 15; i++) {
    test.set(i, i*10)
  }
}
doubleResize();
// console.log(test)


const halfResize = () => {
  for (let i = 0; i < 13; i++) {
    test.remove(i)
  }
}

halfResize();
console.log(test)