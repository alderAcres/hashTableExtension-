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
  this.occupancy = 0;
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
  const hash = hashCode(key, this.SIZE);
  if (!this.storage[hash]) {
    this.storage[hash] = {};
    this.storage[hash][key] = value;
  }
  else this.storage[hash][key] = value;

  this.occupancy++;
  if (this.occupancy >= this.SIZE * (3/4)) {
    this.rehash(this.SIZE * 2);
  }
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
  const hashIndex = hashCode(key, this.SIZE);
  if (this.storage[hashIndex]) return this.storage[hashIndex][key];
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
  const hashIndex = hashCode(key, this.SIZE);
  if (this.storage[hashIndex]){
    const deleted = this.storage[hashIndex][key];
    delete this.storage[hashIndex][key];
    this.occupancy--;
    
    if (this.occupancy <= this.SIZE * (1/4) && this.SIZE > 16){
      this.rehash(this.SIZE / 2);
    }
    return deleted;
  }
  return undefined;
};

HashTable.prototype.rehash = function(size){
  const elements = [];
  for (let element of this.storage){
    if (element !== undefined) elements.push(element)
  }
  this.SIZE = size;
  this.occupancy = 0;
  this.storage = new Array(this.SIZE);
  for (let i = 0; i < elements.length; i += 1){
    for (let element in elements[i]){
      this.set(element, elements[i][element])
    }
  }
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

let hashTable = new HashTable();
for(let i = 0; i < 13; i++) {
  const key = 'key ' + i;
  const value = 'value ' + i;
  hashTable.set(key, value);
}
console.log('expect',hashTable.SIZE, 'to be 32')
for(let i = 0; i < 5; i++) {
  const key = 'key ' + i;
  hashTable.remove(key);
}
console.log('expect',hashTable.SIZE, 'to be 16')


// hashTable.set('key 1', 'value 1');
// hashTable.set('key 2', 'value 2');
// hashTable.set('key 3', 'value 3');
// console.log('expect: "value 1"', hashTable.get('key 1'))
// hashTable.set('key 1', 'value 4');
// console.log('expect: "value 4"', hashTable.get('key 1'))
// console.log('expect: "value 3"', hashTable.get('key 3'))
// console.log('expect: ',hashTable.remove('key 2'), 'to be value 2')
// console.log('expect',hashTable.SIZE, 'to be 32')
// Do not remove!!
module.exports = HashTable;
