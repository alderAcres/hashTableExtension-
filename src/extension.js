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
  this.SIZE = 4;

  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {
  //hashCode(key) will throw error of key is an object
  //key should only be primitive data type
  if (typeof key !== 'string' && typeof key !== 'number' && typeof key !== 'boolean'
    || value === undefined) {
    return;
  }

  const currSize = this.storage.reduce((acc, obj) => {
    if (obj) return acc + Object.keys(obj).length;
    else return acc;
  }, 0);

  if (currSize / this.SIZE > 0.75) {
    this.SIZE = this.SIZE * 2;
    this.storage.forEach(obj => {
      if(obj) {
        Object.keys(obj).forEach(key => {
          this.set(key, obj[key]);
        })
      }
    })
  }

  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) this.storage[hash][key] = value;
  else this.storage[hash] = { [key]: value }

  return newSize = this.storage.reduce((acc, obj) => {
    if (obj) return acc + Object.keys(obj).length;
    else return acc;
  }, 0);
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

const hashTable = new HashTable();
console.log('test this.set()')
console.log(hashTable.set(0, 'test0'));
console.log(hashTable.set('a', 'testA'));
console.log(hashTable.set('b', 'testB'));
console.log(hashTable.set('3', 'test3'));
console.log(hashTable.set('4', 'test4'));
console.log(hashTable.set('5', 'test5'));
console.log(hashTable.set('6', 'test6'));



console.log(hashTable.set([1], 'array'))
console.log(hashTable.set([1], 'array'))
console.log(hashTable.set(3))
console.log(hashTable.set(undefined, 'testUndefined'))

console.log(hashTable.storage);

//console.log('test this.get()')
//console.log(hashTable.get('a'));
//console.log(hashTable.get('1'));
//console.log(hashTable.get('na'));