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
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  // increment storage counter
  this.count++;
  // test if the current storage is over 75%
  if(this.count / this.SIZE <= 0.75) {
    let hashIndex = hashCode(key, this.SIZE);
    if(this.storage[hashIndex] === undefined) this.storage[hashIndex] = {};
    this.storage[hashIndex][key] = value;
  } else {
    let doubleSize = this.SIZE * 2;
    const tempHashStore = new Array(doubleSize);

    for(let i = 0; i < this.SIZE; i++) {
      // check if current hash table is defined with an object value
      if(this.storage[i]) {
        // iterate through hashed object
        for(let curKey in this.storage) {
          // ensure the current key is from the storage object and is not from the prototype
          if(this.storage.hasOwnProperty(curKey)) {
            // find new location of stored key value pair and reassign to temp hash table
            let newAddress = hashCode(curKey, doubleSize);
            tempHashStore[newAddress] = this.storage[curKey];
          }
        }
      }
    }

    // reassign storage property to new hashTable
    this.storage = tempHashStore;
    // double SIZE property value
    this.SIZE *= 2;
    let hashIndex = hashCode(key, this.SIZE);
    if(this.storage[hashIndex] === undefined) this.storage[hashIndex] = {};
    this.storage[hashIndex][key] = value;
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
  this.count--;
  let percentFull = Math.floor(this.count / this.SIZE);
  if(this.SIZE > 16 && percentFull < 0.25) {
    let halfSie = this.SIZE / 2;
    const tempHashStore = new Array(halfSie);

    // iterate through the current hash table
      // check if current hash index has stored values
        // iterate through hash storage to find key value pairs
          // ensure current key from loop is within this.storage object and not from prototype
          // find new storage index
          // assign current key value pair to new temp hash table

    // assign new temp storage object to current storage property
    // remove called key value from storage object
  } else {
    let hashIndex = hashCode(key, this.SIZE);
    if(this.storage[hashIndex][key]) {
      let storedVal = this.storage[hashIndex][key];
      delete this.storage[hashIndex][key];
      return storedVal;
    } else { return undefined }
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

const testTable = new HashTable;
console.log(testTable)

testTable.set('one', 1);
testTable.set('one', 3);
testTable.set('two', 3);
testTable.set('four', 'testString');
testTable.set('five', []);
testTable.set('six', 6);
testTable.set('seven', 7);
testTable.set('eight', 8)
testTable.set('nine', 9);
testTable.set('ten', 10);
testTable.set('eleven', 11);
testTable.set('twelve', 12);
console.log(testTable)
testTable.set('thirteen', 13);
console.log(testTable)


