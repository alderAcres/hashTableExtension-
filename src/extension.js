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

// *****APPROACH****
// add bucketCount to HashTable constructor function
// increment bucktCount everytime obj is created
  // if bucketCount is greater than (this.SIZE * 3 / 4 ) - then this.SIZE doubles
  // iterate Hashtable passing each key value into hashCode

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
  // declare hash and store the result of hash passing in key
  let hash = hash(key, this.SIZE);
  // if the key at hash of this storage exists
  if (this.storage[hash]){
    // overwrite with new key value pair
    this.storage[hash][key] = value;
  } else {
    // else create new object and add key value pair 
    this.storage[hash] = {};
    this.storage[hash][key] = value;
  }
};

// testcases

const test = new HashTable();
test.set('firstName', 'jason')
test.set('middleName', 'alexander')
test.set('lastName', 'victor')
test.set('favColor', 'red')

console.log(test)


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
  // declare variable and store result of hashCode passing in key
  const hash = hashCode(key, this.SIZE);
  // return value stored at key of hash in this.storage
  return this.storage[hash][key]
};

console.log(test.get('favColor'))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // declare variable and store result of hashCode passing in key
  const hash = hashCode(key, this.SIZE);
  // if key/value pair exists - then delete key/value pair
  if (this.storage[hash]) {
    delete this.storage[hash][key];
    // if stored obj has no key/value pairs, delete stored obj
    if (this.storage[hash].keys[0] === null){
      delete this.storage[hash]
    }
  }
  // else key/value pair does not exists - return undefined
  else {
    return undefined
  }
};

console.log(test.remove('something'))
console.log(test.remove('favColor'))
console.log(test)

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
