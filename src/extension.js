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

HashTable.prototype.doubleSize = function() {
  // Double this.size.
  this.SIZE *= 2;

  // Re-hashing all contents:
    // Create a new storage.
    // Iterate thru old storage's indices (addresses).
      // If something is stored at an addr., grab the keys in object.
      // and put thru hashCode with new size. Obtain new addresses.
      // Invoke HashTable.set with each of the new addresses.
  this.newStorage = new Array(this.SIZE);
  for (let i in this.storage) {
    // console.log("i =", i);
    if (this.storage[i]) {
      // Iterate thru key(s) at the address. This way we retrieve all contents stored via collision-handling.
      for (let key in this.storage[i]) {
        let value = this.storage[i][key];
        this.set(key, value); 
      }
    }
  }
}


// Check length of this.storage. 
// If length >= 75%, call this.doubleSize() before setting new key/value pairs.
HashTable.prototype.set = function(key, value) {
  let address = hashCode(key, this.SIZE);
  // console.log('address:', address);
  // console.log('this.storage[addr]:', this.storage[address]);
  if (this.storage[address] === undefined) {
    this.storage[address] = {};
    this.storage[address][key] = value;
  } else {
    // console.log('handling collision!')
    this.storage[address][key] = value;
  }
}

HashTable.prototype.get = function(key) {
  let address = hashCode(key, this.SIZE);
  // console.log('getting address:', address);
  if (this.storage[address]) {
    console.log("address found!")
    return this.storage[address][key];
  }
}

HashTable.prototype.remove = function(key) {
  let address = hashCode(key, this.SIZE);

  if (this.storage[address]) {
    delete this.storage[address][key];
  }
}


/////TESTS//////////////
const myTable = new HashTable();

myTable.set('one', 1);
myTable.set('two', 2);
myTable.set('two', 222);
myTable.set('tw', 333);
myTable.set('twoo', 412); //<=== collision! Check that this pair is properly set.
console.log(myTable);
// console.log(myTable.get('two'), "<== 222 ");

myTable.doubleSize();


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
