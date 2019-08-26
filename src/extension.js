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
  this.storageCount = 0;
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
  console.log(key, value);
  const hash = hashCode(key, this.SIZE);

  if (this.storage[hash] === undefined) {
    this.storage[hash] = { [key] : value };
    this.storageCount += 1;
  } else if (this.storage[hash][key] === undefined){
    this.storage[hash][key] = value;
    this.storageCount += 1;
  } else {
    // overwrite current value of 'key'
    this.storage[hash][key] = value;
  }

  

  if (this.storageCount > this.SIZE * 0.75) {
    const tempStorage = this.storage.slice();
    console.log('tempStorage: ', tempStorage);
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE);

    tempStorage.forEach( (obj) => {
      
      if (obj !== undefined) {
        for (let [key, value] in obj) {
          this.set(key, value);
        }
      }
    });

  }




  return this.storageCount;

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

  if (this.storage[hash] !== undefined && this.storage[hash][key] !== undefined) {
    return this.storage[hash][key];
  }

  return undefined;
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
  let output = undefined;

  if (this.storage[hash] !== undefined && this.storage[hash][key] !== undefined) {
    output = this.storage[hash][key]
    delete this.storage[hash][key];
    this.storageCount -= 1;
  }

  if (this.SIZE > 16 && this.storageCount < Math.floor(this.SIZE * 0.25)) {
    const tempStorage = this.storage.slice();
    this.SIZE *= 0.5;
    this.storage = new Array(this.SIZE);

    tempStorage.forEach( (obj) => {
      for (let [key, value] in obj) {
        this.set(key, value);
      }
    });
  }






  return output;
};




// Do not remove!!
module.exports = HashTable;


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


const myHashTable = new HashTable();


console.log(myHashTable.set('Patrick', 1));
console.log(myHashTable.set('Mary', 2));
console.log(myHashTable.set('Bill', 3));
console.log(myHashTable.set('Carl', 1));
console.log(myHashTable.set('Jane', 2));
console.log(myHashTable.set('Jull', 3));
console.log(myHashTable.set('emily', 1));
console.log(myHashTable.set('victor', 2));
console.log(myHashTable.set('ellen', 3));
console.log(myHashTable.set('julian', 1));
console.log(myHashTable.set('adina', 2));
console.log(myHashTable.set('rachel', 3));

console.log(myHashTable.set('ken', 3));

console.log(myHashTable.get('Patrick'));

console.log(myHashTable.remove('Mary'));
console.log(myHashTable.set('Sally', 22));

console.log('myHashTable: ', myHashTable);
