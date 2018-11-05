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
  this.count = 0; // added this.count for increasing hashtable size
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined) {
    this.storage[index] = {};
  }
  this.storage[index][key] = value;
//rest of function to check and increase array size
  this.count += 1
  if (this.count === this.SIZE * 0.75) {
    this.SIZE = this.SIZE * 2;
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i]) {
        let newArr = Object.keys(this.storage[i])
        for (let objKey in newArr) {
          let newVal = newArr[objKey]
          let newIndex = hashCode(objKey, this.SIZE)
          delete this.storage[index][objKey]
          if (this.storage[newIndex] === undefined) {
            this.storage[newIndex] = {};
          }
          this.storage[newIndex][objKey] = newVal
        }
      }
    }
  }

};

HashTable.prototype.get = function(key) {
  const index = hashCode(key, this.SIZE);
  if (!this.storage[index].hasOwnProperty(key)) {return undefined}
  return this.storage[index][key]
};

HashTable.prototype.remove = function(key) {
  const index = hashCode(this.SIZE);
  if (this.storage[index] === undefined) {return undefined};
  let deletedVal = this.storage[index][key];
  delete this.storage[index][key];
  this.count -= 1;
  console.log(this.count)
  //check for size and reduce
  if (this.SIZE > 16 && this.count < this.SIZE * 0.25) {
    this.SIZE = this.SIZE * 0.5
    for (let i = 0; i < this.storage.length; i++) {  //copied rehashing from set
      if (this.storage[i]) {
        let newArr = Object.keys(this.storage[i])
        for (let objKey in newArr) {
          let newVal = newArr[objKey]
          let newIndex = hashCode(objKey, this.SIZE)
          delete this.storage[index][objKey]
          if (this.storage[newIndex] === undefined) {
            this.storage[newIndex] = {};
          }
          this.storage[newIndex][objKey] = newVal
        }
      }
    }
  }
  return deletedVal;
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

let newArr = new HashTable()
newArr.set(2, 1)
newArr.set(1, 5)
newArr.set(4, 6)
newArr.set(8, 1);
newArr.set(7, 2)
newArr.set(16,2)
newArr.set(15,2)
newArr.set(14,2)
newArr.set(13,2)
newArr.set(3,5)
newArr.set(5,3)
newArr.set(12,5)
newArr.set(6,3)
newArr.set(9,2)
newArr.set(10,2)
newArr.set(11,5)
newArr.set(22,5)
newArr.remove(2)
newArr.remove(1)
console.log(newArr)
  //did not complete; needed to debug rehashing 