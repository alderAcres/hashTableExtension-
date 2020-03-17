/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.items = 0;
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
  //address contains key/val pair?
  const address = hashCode(key, this.SIZE)
  let element = this.storage[address]
  let current;

  if (element) {
    //key === key? override,
    if (element[key]) {element[key] = value}

      //add a 'next' key/val pair, pointing to next value in same address
    else {
      while (element.next) {
        //find last element with .next
        current = current.next
      }
      element.next = {key:value}
    }

  } else { //!element?
    this.storage[address] = {}
    this.storage[address][key] = value;
  }
  this.items++;
  return this.items;
};

let testTable = new HashTable()
console.log(testTable)

testTable.set('First', '1st')
console.log(testTable);

testTable.set('First', 'NEW') //same key, new Value should be reassigned
console.log(testTable)
//Why are my keys always set to 'key' and not 'First'???//Improperly created an Object. - Hour lost.
testTable.set('Firstt', '1st')
console.log(testTable);
testTable.set('Firsttt', '1st')
console.log(testTable);

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
  let current;
  const address = hashCode(key, this.SIZE)
  if (this.storage[address][key]) {
    return this.storage[address][key];
  } //check if address has .next
  else if (this.storage[address][next]) {
    current = this.storage[address][next];
    while (current[next]) { //check if we have a next, or if key is found
      current = current[next]
      if (current[key]) {return current[key]}
    }
    return 'key does not exist'
  }
}

console.log(testTable.get('Firstt'))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {

};


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
