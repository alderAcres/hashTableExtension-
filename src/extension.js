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
  this.SIZE = 16; //change back to 16
  
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
  const newObj = {};
  newObj[key] = value;
  let countValues = 0;

  for (item of this.storage) {
    if (item) countValues +=1
  }

  if (((countValues + 1)/this.SIZE) > .75) {
    this.SIZE *= 2;
    newStorage = new Array(this.SIZE);

    //rehash everything
    for (item of this.storage) {
      if (item) {
        const keysArray = Object.keys(item);
        const valuesArray = Object.values(item);

        for (let i = 0; i < keysArray.length; i++) {
          const newObj2 = {};
          newObj2[keysArray[i]] = valuesArray[i];
          newStorage[hashCode(keysArray[i], this.SIZE)] = newObj2;
          //if collision
            //add another key value pair to the object at the hash position (skipped for time)
        }
      }
      this.storage = newStorage;
    }
  }
  
  
  //add new item
  this.storage[hashCode(key, this.SIZE)] = newObj;
  //if collision
    //add another key value pair to the object at the hash position (skipped for time)

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
  //get position to check through has function
  let position = hashCode(key, this.SIZE);
  console.log(position)
  //lookup in hashTable
  return this.storage[position][key]

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
  let position = hashCode(key, this.SIZE);
  let countValues = 0;

  for (item of this.storage) {
    if (item) countValues +=1
  }

  if (((countValues - 1)/this.SIZE) < .25 && this.SIZE > 16) {
    this.SIZE %= 2;
    newStorage = new Array(this.SIZE);

    //rehash everything
    for (item of this.storage) {
      if (item) {
        const keysArray = Object.keys(item);
        const valuesArray = Object.values(item);

        for (let i = 0; i < keysArray.length; i++) {
          const newObj2 = {};
          newObj2[keysArray[i]] = valuesArray[i];
          newStorage[hashCode(keysArray[i], this.SIZE)] = newObj2;
        }
      }
      this.storage = newStorage;
    }
  }

  //remove item and return it
  const removedValue = this.storage[position][key];
  delete this.storage[position][key];

  return removedValue;
};

//TESTS
const testTable = new HashTable;
testTable.set('a', 5);
console.log(testTable.SIZE)
console.log(testTable)
testTable.set('b', 6);
console.log(testTable.SIZE)
console.log(testTable)
testTable.set('c', 7);
console.log(testTable.SIZE)
console.log(testTable)

console.log(testTable)
console.log(testTable.get('a'))
console.log(testTable.remove('a'));
console.log(testTable)


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
