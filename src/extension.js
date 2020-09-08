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
*   the collision appropriately.
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  // declare a variable to establish an address by using our hashCode function
  let address = hashCode(key, this.SIZE);
  // if the address in storage is equal to undefined set currentBucket to an empty array
  if (!this.storage[address]) {
    this.storage[address] = [];
  } else if (this.storage[address].length > (0.75*this.SIZE)) {
      // this.SIZE = this.SIZE * 2;
      // address = hashCode(key, this.SIZE);
      // for (let i = 0; i < this.storage[address].length; i++) {

      // }
  }
  // push our key/value pair to our array
  this.storage[address].push([key, value]);
  return this.storage;
};

HashTable.prototype.rehash = function(size) {
  // double the size of of the Array whin our storage object
  this.SIZE *= 2;
  let storage = this.storage;
  this.storage = new Array(this.SIZE);
  for (let key of this.storage) {
    
  }

}


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // declare a variable to establish an address by using our hashCode function
  const address = hashCode(key, this.SIZE);
  // declare a variable for the bucket the address leads us to
  const currentBucket = this.storage[address];
  // initialize a loop that will find the key we are looking for within the bucket
  for (let i = 0; i < currentBucket.length; i++) {
    // if found assign the value we will ultimately delete to a variable
    if (currentBucket[i][0] === key) {
      let returnVal = currentBucket[i][1];
      // delete key/value pair
      delete currentBucket[i];
      // return variable
      return returnVal;
    }
  }
  return undefined;
};

const testHash = new HashTable();
testHash.set('blue', 1000);
testHash.set('green', 10000);
console.log(testHash);
testHash.remove('blue');
console.log(testHash);


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
