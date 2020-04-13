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
  this.count = 0


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
HashTable.prototype.set = function (key, value) {
  this.count++
  console.log(this.count)
  let placeholder
  console.log(placeholder)
  if (this.count > 16) {
    placeholder = this.SIZE * 2
    console.log(placeholder)
    // we get 32 here if its bigger than 
  }
  else {
    placeholder = this.SIZE
    console.log(placeholder)
  }
  //why is 32 not being captured
  console.log(placeholder)

  console.log(this.count)
  const hash = hashCode(key, this.SIZE)
  //this will give us where key and value will be stored
  if (this.storage[hash]) {
    //if this point exists we will store info within it
    this.storage[hash][key] = value
  }
  else {
    //if not we will first create an object within that bucket
    // using empty objects to avoid collision
    this.storage[hash] = {}
    //we will then store that info within this bucket
    this.storage[hash][key] = value
  }
};

let test = new HashTable
test.set('a', 1)
test.set('b', 3)
test.set('c', 3)
test.set('d', 3)
test.set('e', 3)
test.set('f', 3)
test.set('g', 3)
test.set('h', 3)
test.set('i', 3)
test.set('j', 3)
test.set('k', 3)
test.set('j', 3)
test.set('l', 3)

//should push both items into array of 16
test.set('one', 2)
//should replace existing one:1 with one:2
//need to test collisions... do I make 17 sets?
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
HashTable.prototype.get = function (key) {
  const hash2 = hashCode(key, this.SIZE)
  return this.storage[hash2][key]
};

let test2 = new HashTable
test2.set('one', 1)
test2.set('three', 3)
test2.get('one')
console.log(test2.get('one'))
//the above returns 1.. Does work
console.log(test2)

//the above removes the key value pair but doesnt remove the object store at that bucket... should object be removed?
// look into this
console.log(test2)

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  const hash3 = hashCode(key, this.SIZE)
  if (!this.storage[hash3][key]) {
    return undefined
  }
  else {
    delete this.storage[hash3][key]
  }
};

let test3 = new HashTable
test3.set('one', 1)
test3.set('three', 3)
test3.remove('one')
//below returns undefined when key is not found
console.log(test3.remove('four'))

//the above removes the key value pair but doesnt remove the object store at that bucket... should object be removed?
// look into this
console.log(test3)

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
