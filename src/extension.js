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
  this.occupancy = 0;
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.double = function() {
  this.SIZE = this.SIZE * 2;
  let oldStorage = this.storage;
  this.storage = new Array(this.SIZE);
  this.rehash(oldStorage)
}

HashTable.prototype.half = function() {
  this.SIZE = this.SIZE / 2;
  let oldStorage = this.storage;
  this.storage = new Array(this.SIZE);
  this.rehash(oldStorage)
}

HashTable.prototype.rehash = function(oldStorage) {
  for (let i = 0; i < oldStorage.length; i++) {
    if (!oldStorage[i]) {continue}
    // console.log(oldStorage[i])
    for (let keys in oldStorage[i]) {
      // console.log(keys, oldStorage[i][keys])
      const hashValue = hashCode(keys, this.SIZE);
      if (this.storage[hashValue]) {
        this.storage[hashValue][keys] = oldStorage[i][keys]
      } else {
        this.storage[hashValue] = {};
        this.storage[hashValue][keys] = oldStorage[i][keys]
      }
    }
  }
}

HashTable.prototype.set = function(key, value) {
  const hashValue = hashCode(key, this.SIZE);
  // console.log(hashValue)
  if (this.storage[hashValue]) {
    this.storage[hashValue][key] = value
  } else {
    this.storage[hashValue] = {};
    this.storage[hashValue][key] = value
  }

  this.occupancy++;
  if(this.occupancy > this.SIZE * 0.75) {
    // console.log(this.occupancy, this.SIZE);
    this.double()
  }
};

HashTable.prototype.get = function(key) {
  return this.storage[hashCode(key,this.SIZE)][key]
};

HashTable.prototype.remove = function(key) {
  let hashValue = hashCode(key,this.SIZE)
  if(!this.storage[hashValue] || !this.storage[hashValue][key]) {return undefined};

  let removedValue = this.storage[hashValue][key]
  delete this.storage[hashValue][key]
  // console.log(this.storage[hashValue])

  this.occupancy--
  if (this.SIZE > 16 && this.occupancy < this.SIZE * .25) {this.half()}

  return removedValue;
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

// Do not remove!!
module.exports = HashTable;


// let newHashTable = new HashTable();
// // console.log(newHashTable)
// newHashTable.set('qwer', 'asdf')
// newHashTable.set('ginger', 'bread')
// console.log(newHashTable)
// // console.log(newHashTable.get('ginger'))
// newHashTable.remove('qwer')
// console.log(newHashTable)
// newHashTable.remove('super')
// console.log(newHashTable)


let doubleHashTableTest = new HashTable();
doubleHashTableTest.set('qwer', 'asdf')
doubleHashTableTest.set('abcd', 'efgh')
doubleHashTableTest.set('reqw', 'poiu')
doubleHashTableTest.set('fdas', 'poiu')
doubleHashTableTest.set('vczx', 'poiu')
doubleHashTableTest.set('zxcv', 'poiu')
doubleHashTableTest.set('uiop', 'poiu')
doubleHashTableTest.set('poiu', 'poiu')
doubleHashTableTest.set('lkjh', 'poiu')
doubleHashTableTest.set('hjkl', 'poiu')
doubleHashTableTest.set('mnbv', 'poiu')
doubleHashTableTest.set('vbnm', 'poiu')
doubleHashTableTest.set('bbbb', 'poiu')
doubleHashTableTest.set('zzzz', 'poiu')
doubleHashTableTest.set('aaaa', 'poiu')
console.log(doubleHashTableTest)
doubleHashTableTest.remove('qwer', 'asdf')
doubleHashTableTest.remove('abcd', 'efgh')
doubleHashTableTest.remove('reqw', 'poiu')
doubleHashTableTest.remove('fdas', 'poiu')
doubleHashTableTest.remove('vczx', 'poiu')
doubleHashTableTest.remove('zxcv', 'poiu')
console.log(doubleHashTableTest)
