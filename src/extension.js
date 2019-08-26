/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the hashTable of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW
function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.items = 0;
}
    function resizeTable(newSize) {
      console.log(newSize)
      console.log(this.SIZE)
      if (newSize > this.SIZE) {
        this.SIZE = newSize;
        console.log(this.SIZE) 
      } else {
        this.SIZE = newSize;
      }
      for (let key in this.storage) {
        let value = hashTable.get(key);
        hashTable.set(key, value);
      }
    }
    HashTable.prototype.set = function(key, value) {
      const hashKey = hashCode(key, this.SIZE);
      if (this.storage[hashKey]) {
        this.storage[hashKey] = value;
        this.items++; console.log(this.items)
      } else {
        this.storage[hashKey] = {};
        this.storage[hashKey] = value;
        this.items++;
        console.log(this.items)
      }
      console.log(this.items)
      if (this.items >= this.SIZE * 0.75) {
        resizeTable(this.SIZE * 2);
      }
    };
    
    HashTable.prototype.get = function(key) {
      let hashKey = hashCode(key, 16);
      return this.storage[hashKey][key];
    };
    HashTable.prototype.remove = function(key) {
      let hashKey = hashCode(key, 16);
      let temp = this.storage[hashKey][key];
      delete this.storage[hashKey][key];
      this.items--; 
      if (this.items <= this.SIZE * 0.25) {
        resizeTable(this.SIZE / 2);
      }
      return temp;
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

let hashTable = new HashTable()
hashTable.set("thirteen", 13)
hashTable.set("twelve", 12) 
hashTable.set("eleven", 11)
hashTable.set("ten", 10)
hashTable.set("nine", 9)
hashTable.set("eight", 8)
hashTable.set("seven", 7)
hashTable.set("six", 6)
hashTable.set("five", 5)
hashTable.set("four", 4)
hashTable.set("three", 3)
hashTable.set("two", 2)
hashTable.set("one", 1)
console.log(hashTable.items)
console.log(hashTable)

// Do not remove!!
module.exports = HashTable;
