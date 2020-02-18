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
  this.items = 0;
}


HashTable.prototype.set = function(key, value) {
  let hashAddress = hashCode(key, this.SIZE);
  const capacity = 0.75 * this.SIZE;
  if(this.items + 1 > capacity) {
    this.SIZE *= 2;
    // need to reset whole hash table
    for(var key in this.storage) {
      let newHash = hashCode (key, this.SIZE); // might not be iterating through every key-value pair, maybe just on every index of array
      let newStorageObj = {};
      newStorageObj[key] = this.storage[key];
      this.storage[newHash] = newStorageObj;
    }
  }
  else if (this.storage[hashAddress] === undefined) {
    let storageObj = {};
    storageObj[key] = value;
    this.storage[hashAddress] = storageObj;
    this.items += 1;
    return this.items;
  }
  this.storage[hashAddress][key] = value;
  return this.items;
};

HashTable.prototype.get = function(key) {
  let hashAddress = hashCode(key, this.SIZE);
  return this.storage[hashAddress][key];
};

HashTable.prototype.remove = function(key) {
  let hashAddress = hashCode(key, this.SIZE);
  const capacity = Math.floor(0.5 * this.SIZE);
  if (this.SIZE > 16 && this.items - 1 < capacity) {
    this.SIZE *= 0.5;
    hashAddress = hashCode(key, this.SIZE);
  }
  if (this.storage[hashAddress][key] !== undefined) {
    let storedReturn = this.storage[hashAddress][key];
    delete this.storage[hashAddress][key];
    this.items -= 1;
    return storedReturn;
  }
  return undefined;
};

module.exports = HashTable;

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

// Tests

const testHash = new HashTable();
console.log(testHash.SIZE);
console.log(testHash.set("Bob", 'Cat'));
console.log(testHash.set("Sam", 'Smith'));
console.log(testHash.set("Aac", 'Random'));
console.log(testHash.set("Bab", 'Random2'));
console.log(testHash.set("Bib", 'dfjkl'));
console.log(testHash.set("sfs", 'jkgds'));
console.log(testHash.set("nlx", 'Rsfs'));
console.log(testHash.set("old", 'Random2'));
console.log(testHash.set("moiu", 'Cat'));
console.log(testHash.set("lmue", 'Smith'));
console.log(testHash.set("slaq", 'Random'));
console.log(testHash.set("qlm", 'Random2'));
console.log(testHash.set("dj", 'Cat'));
console.log(testHash.set("huy", 'Cat'));
console.log(testHash.set("nve", 'Smith'));
console.log(testHash.set("slqq", 'Random'));
console.log(testHash.set("qdm", 'Random2'));
console.log(testHash.set("oj", 'Cat'));
console.log(testHash.SIZE);

console.log(testHash.items);

console.log(hashCode('Sam', 16));
console.log(hashCode('Bob', 16)); 
console.log(hashCode('Bab', 16)); 
console.log(hashCode('Aac', 16)); 

console.log(testHash.get('Aac'));
console.log(testHash.remove("nve"));
console.log(testHash.SIZE);
console.log(testHash.get("slqq"));
console.log(hashCode("slqq", testHash.SIZE));
console.log(testHash.items);
console.log(testHash.SIZE);
console.log(Math.floor(0.5 * testHash.SIZE));
console.log(testHash.SIZE *= 0.5);
console.log(testHash.SIZE);
console.log(hashCode("slqq", testHash.SIZE));


console.log(testHash.remove("slqq"));
console.log(testHash.remove("qdm"));
console.log(testHash.remove("oj"));

console.log(testHash.SIZE);
