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
  this.SIZE = 2;

  this.storage = new Array(this.SIZE);
}


HashTable.prototype.set = function (key, value) {
  const capacity = this.storage.filter((values) => values).length
  const percentage = (capacity + 1) / this.SIZE
  //if adding a new item will make storage at 75% capacity
  if (percentage > 0.75) {
    //must save all the key-value pairs in the hash index
    //iterate through storage array
    let entries = []
    for (let i = 0; i < this.storage.length; i++) {
      //save the key value pairs in each object
      if (this.storage[i]) {
        if (entries.length = 0) {
          entries = [...Object.entries(this.storage[i])]
        } else {
          entries = [...entries, ...Object.entries(this.storage[i])]
        }

      }
    }

    //double the size of table and hash those back into new table - can probably call set again (recursive)
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE)

    //iterate through the entries array, invoke set with those key value pairs
    for (let [key, value] of entries) {
      this.set(key, value)
    }
  }
  //get the hash using the provided hash function
  const hash = hashCode(key, this.SIZE)

  //access the storage hash
  //if it is empty, create an object empty
  if (!this.storage[hash]) {
    this.storage[hash] = {};
  }
  //store the key-value pair in the provided object
  this.storage[hash][key] = value;
}


HashTable.prototype.remove = function (key) {
  //if capacity removing 1 dips the capacity below 25%
  const capacity = this.storage.filter((values) => values).length
  const percentage = (capacity - 1) / this.SIZE
  console.log(percentage)
  if (percentage < 0.25) {
    //save the key value pairs in each object
    let entries = []
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i]) {
        if (entries.length = 0) {
          entries = [...Object.entries(this.storage[i])]
        } else {
          entries = [...entries, ...Object.entries(this.storage[i])]
        }

      }
    }

    //decrease the size of hash table by half and create a new array based on new size
    this.SIZE = this.SIZE / 2
    console.log(this.SIZE)
    this.storage = new Array(this.SIZE)

    // then set each entry back to new Hash table
    for (let [key, value] of entries) {
      console.log(entries)
      this.set(key, value)
    }

  }

  //use hashcode to retrieve the hash index
  const hash = hashCode(key, this.SIZE)

  //access the storage with the hash index
  //if theres an object and the key is there, save the value and delete the key
  //else return key not round
  if (!this.storage[hash] || !this.storage[hash][key]) return 'key not found'

  const removed = this.storage[hash][key]
  delete this.storage[hash][key]

  //if object is empty after deleting the key, delete the object
  if (Object.keys(this.storage[hash]).length === 0) delete this.storage[hash]

  //return the saved value 
  return removed
};


const test = new HashTable();
test.set("apple", 1)
// console.log(test.storage)
test.set("banana", 2)
// console.log(test.storage)
test.set("orange", 1)
// console.log(test.storage)
test.set("pear", 1)
// console.log(test.get("apple"))
console.log(test.remove("banana"))
console.log(test.storage)

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
