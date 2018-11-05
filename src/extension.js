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
  // Declare a variable to store the percentage that should trigger a re-hash.
  let percentThreshhold = .75;

  // Declare a variable to track the number of hash table indexes that are filled
  let slotsFilled = 0;

  // Iterate through the hash table and count the number of index that are filled
  this.storage.forEach(element => { if (typeof element === 'object') slotsFilled += 1; })

  // Calacuate the percentage of the hash table that is filled.
  let percentFilled = slotsFilled / this.SIZE;

  console.log(percentFilled);

  // If greater than 75%, double this.SIZE and re-hash everything
  if (percentFilled > percentThreshhold) {
    // Double the size of this.storage
    this.SIZE *= 2;
    console.log(this.SIZE);

    // Create a temporary hash table array with the length of this.storage
    this.resize = new Array(this.SIZE);

    // Iterate through this.storage array
    this.storage.forEach((obj, i) => {
      // If the index is empty, skip it
      // If the index contains an object, iterate throught the object
      if (typeof obj === 'object') {
        // Re-hash each key and add the key and value to the temporary array 
        for (let prop in obj) {
          const tempHash = hashCode(prop, this.SIZE);
          if(this.storage[tempHash] === undefined) {
            this.storage[tempHash] = {};
          }
          this.storage[tempHash][prop] = value;
        }
      }
    });

    // Once finished iterating through the current hash table array, replace it with the temporary array
  }

  const hash = hashCode(key, this.SIZE);
  if(this.storage[hash] === undefined) {
    this.storage[hash] = {};
  }
  this.storage[hash][key] = value;
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
  const hash = hashCode(key, this.SIZE);
  return this.storage[hash][key];
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
  const hash = hashCode(key, this.SIZE);
  const temp = this.storage[hash][key];
  this.storage[hash][key];
  delete this.storage[hash][key];
  return temp;
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

const myHashTable = new HashTable();
myHashTable.set('numA', 1);
myHashTable.set('numB', 2);
myHashTable.set('numC', 3);
myHashTable.set('numD', 4);
myHashTable.set('numE', 5);
myHashTable.set('numF', 6);
myHashTable.set('numG', 7);
myHashTable.set('numH', 8);
myHashTable.set('numI', 9);
myHashTable.set('numJ', 10);
myHashTable.set('numK', 11);
myHashTable.set('numL', 12);
myHashTable.set('numM', 13);
myHashTable.set('numN', 14);
// console.log(myHashTable.get('numB'));
// console.log(myHashTable.remove('numA'))
console.log(JSON.stringify(myHashTable.storage));

// Do not remove!!
module.exports = HashTable;
