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
  
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const hashedKey = hashCode(key, this.SIZE);
  //loop through hash table and check how many are undefined; 75% of 16 = 12;
  counter = 0;
  for (let stored in this.storage) {
    if (this.storage[stored] !== undefined) {
      counter++;
    }
  }
  //console.log(counter);
  //if counter = 12 (aka adding new item will push size to over 75%), double table size and reshas;
  if (counter === 12) {
    this.SIZE = this.SIZE * 2;
    const innerObj = {};
    for (let stored in this.storage) {
      let pair = this.storage[stored];
      for (let prop in pair) {
        const newHashedKey = hashCode(prop, this.SIZE);
        innerObj[prop] = pair[prop];
        this.storage[newHashedKey] = innerObj
        //need to fix bug: storing entire previous hashtable within new one;
      }
    }
    return;
  }
  
  if (this.storage[hashedKey] !== undefined) {
    this.storage[hashedKey][key] = value;
    
  } else {
    const hashObj = {};
    hashObj[key] = value;
    this.storage[hashedKey] = hashObj;
  }
};

const hash = new HashTable;

hash.set('clara', 'hi');
hash.set('clar1', 'bye');
hash.set('kim', '5');
hash.set('a', 1);
hash.set('b', 2);
hash.set('c', 3);
hash.set('d',4);
hash.set('e', 5);
hash.set('f', 6);
//hash.set('g', 7);
hash.set('h', 8);
hash.set('i', 9);
hash.set('j', 10);
hash.set('k', 11);
hash.set('l', 12)
console.log(hash);


HashTable.prototype.get = function(key) {
  const hashedKey = hashCode(key, this.SIZE);
  //declare a const to represent the value at the specified key;
  const hashObj= this.storage[hashedKey];
  //return value;
  return hashObj[key];
};

console.log(hash.get('clar1'));
console.log(hash.get('kim'));


HashTable.prototype.remove = function(key) {
  const hashedKey = hashCode(key, this.SIZE);
  const hashObj = this.storage[hashedKey];
  const value = hashObj[key];
  delete this.storage[hashedKey][key];
  return value;
};

console.log(hash.remove('clara'))


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

// console.log(hashCode('clara', 16))
// console.log(hashCode('clar1', 16))

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
