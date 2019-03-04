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

// function LinkedList(){
//   this.head = null;
//   this.tail = null;
// }

// function Node(value){
//   this.value = value;
//   this.next = null;
// }

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
    // this.storage[hash] = new LinkedList;
    this.storage[hash][key] = value;
  }
  else this.storage[hash][key] = value;
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
    let deleted = this.storage[hashIndex][key];
    delete this.storage[hashIndex][key];
    return deleted;
  }
  return undefined;
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

let hashTable = new HashTable();
hashTable.set('key 1', 'value 1');
hashTable.set('key 2', 'value 2');
hashTable.set('key 3', 'value 3');
console.log('expect: "value 1"', hashTable.get('key 1'))
hashTable.set('key 1', 'value 4');
console.log('expect: "value 4"', hashTable.get('key 1'))
console.log('expect: "value 3"', hashTable.get('key 3'))
console.log('expect: ',hashTable.remove('key 2'), 'to be value 2')
console.log('expect',hashTable.get('key 2'), 'to be undefinded')

// Do not remove!!
module.exports = HashTable;
