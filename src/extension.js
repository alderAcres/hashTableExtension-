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
  this.entries = 0;

  this.storage = new Array(this.SIZE);

  // not sure how to do this without a for loop, without causing pass-by-reference issues
  for(let i = 0; i < this.SIZE; i++){
    this.storage[i] = {};
  }
  
}

// clever method of randomly converting keys to #s between 0 and size goes here:
function convert(size, key){
  return key.length % size
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

// - If adding the new item will push the number of stored items to over 75% of
// the hash table's SIZE, then double the hash table's SIZE and rehash everything

HashTable.prototype.set = function(key, value) {
  // check if the key exists already. if it does it gets overwritten, so it doesn't add to total # of entries
    // add the key value pair

  // if entries++/SIZE >= .75
    // double hash table size (will this overwrite all the previously stored pairs?)
      // maybe: store previous storage = temp array
      // reinitialize storage with new empty array
    // for each storage index 
      // get the properties from the object stored therein
      // put each one back in storage as per previous rules (avoiding collisions)

  let address = convert(this.SIZE, key);

  // if the key doesn't already exist at the hashed address, add to total entries
    // i.e. if the key exists, it will get overwritten, so total entries remains the same
  if(!this.storage[address].hasOwnProperty(key)) { 
    this.entries++;
  } 
  // add or overwrite the key value pair
  this.storage[address][key] = value;

  return this.entries;
};

let ht = new HashTable()
ht.set("hello", "what's up")
ht.set("hello", "world")
ht.set("My name is Penny", "I'm a fat kitty")
ht.set("Bread", "butter")
console.log(ht)

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
  let address = convert(this.SIZE, key);
  return this.storage[address][key]
};

console.log(ht.get("hello"))
console.log(ht.get("Bread"))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let address = convert(this.SIZE, key);

  if(this.storage[address][key] === undefined) return;
  
  let removed = this.storage[address][key];
  delete this.storage[address][key];
  this.entries--;

  return removed;
};

console.log(ht.remove('hello'))
console.log(ht)

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
