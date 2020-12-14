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

function HashTable() {
  this.SIZE = 16;
  this.count = 0;
  this.storage = new Array(this.SIZE);
}


// method to handle resizing the table and rehashing its contents
// returns a new HashTable; doesn't mutate the existing one.
// TODO: mutate the HashTable instead.
HashTable.prototype.resize = function(newSize) {
  // todo: test if I need to hash this's contents to a hold table, change the size of this, then rehash the hold table's contents back to this
  // const hold = new HashTable();
  
  // RESIZE
  this.SIZE = newSize;

  // REHASH
  // iterate over the this object's storage
  for (let bucket = 0; bucket < this.storage.length; bucket++) {
    // if bucket is not empty
    if (this.storage[bucket] !== undefined && this.storage[bucket] !== {}) {
      console.log("Bucket contents: ", this.storage[bucket])
      // iterate over contents of bucket
      for (let key in this.storage[bucket]) {
        // hash each item to newHash
        this.set(key, this.storage[bucket][value]);
      }
    }
    else console.log("Empty bucket");
  }

  
  // RETURN
  // return newHash;
}


HashTable.prototype.set = function(key, value) {
  // resize if needed
  if (this.count + 1 > 0.75 * this.SIZE) {
    this.resize(this.SIZE * 2);
  }

  const bucket = hashCode(key, this.SIZE);
  // if there are no items at this key in this bucket, increment count
  if(!this.storage[bucket] || !this.storage[bucket][key]) {
    this.count++;
  }

  this.storage[bucket] = { [key]: value };
  return this.count;
};

const myHash = new HashTable();
// console.log(myHash.set("1", "overwrite me")); // 1
console.log(myHash.set("1", "first value")); // 1
console.log(myHash.set("2", "second value")); 
console.log(myHash.set("3", 3)); 
console.log(myHash.set("4", 4)); // 2
console.log(myHash);



HashTable.prototype.get = function(key) {
  const bucket = hashCode(key, this.SIZE);
  return this.storage[bucket] ? this.storage[bucket][key] : undefined;
};

// console.log(myHash.get("3")); // undefined
// console.log(myHash.get("2")); // 'second value'



HashTable.prototype.remove = function(key) {
  const bucket = hashCode(key, this.SIZE);
  if (!this.storage[bucket]) {
    return;
  } 
  this.count--;
  const removed = this.storage[bucket][key] 
  delete this.storage[bucket][key];
  return removed;
};

// console.log(myHash.remove("2")); // 'second value'
// console.log(myHash.count); // 1
// console.log(myHash.remove("3")); // undefined
// console.log(myHash.count); // 1



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
