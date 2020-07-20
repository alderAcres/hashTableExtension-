/**
* HashTable costructor
*/

// construct a new hash table
function HashTable() {
  this.SIZE = 10;
  
  this.storage = new Array(this.SIZE);
  for (let i=0; i<this.SIZE; i++){
    this.storage[i] = {}
  }
}
const testHash = new HashTable()
console.log(testHash)


// adds a value to the hash table
HashTable.prototype.set = function(key, value) {
  const hash = hashCode(key, this.SIZE); // get the hash code

  this.storage[hash][key] = value
};

testHash.set('asdf',3)
testHash.set('sdfa',5)
console.log(testHash)

// retrieve a value from hash table
HashTable.prototype.get = function(key) {
  const hash = hashCode(key, this.SIZE);

  return this.storage[hash][key]
};

console.log(testHash.get('sdfa'))


// Delete a key/value pair from the hash table
HashTable.prototype.remove = function(key) {
  let hash = hashCode(key, this.SIZE);

  delete this.storage[hash][key]
};

testHash.remove('asdf')
console.log(testHash)


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
