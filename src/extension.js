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
  this.items = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {
  const node = {
    [key]: value,
    next: null,
  };

  const bucket = hashCode(key, this.SIZE);
  // console.log(bucket);
  if (!this.storage[bucket]) {
    this.storage[bucket] = node;
    this.items++;
  } else {
    let current = this.storage[bucket];
    while (current) {
      if (current[key]) {
        current[key] = value;
        return this.items;
      }
      if (!current.next) {
        current.next = node;
        this.items++;
      }
      current = current.next;
    }
  }

  if (this.items > 3/4*this.SIZE) {
    let oldSize = this.SIZE;
    let oldStorage = this.storage;
    this.items = 0;
    this.SIZE *=2;
    this.storage = new Array(this.SIZE);
    
    for (let i = 0; i < oldSize; i++) {
      if (oldStorage[i]) {
        let current = oldStorage[i];
        while (current) {
          this.set(Object.keys(current)[0],current[value])
          current = current.next;
        }
      }
    }
  } 
  return this.items;
};


HashTable.prototype.get = function (key) {
  const bucket = hashCode(key, this.SIZE);
  let current = this.storage[bucket];
  while (current) {
    if (current[key]) {
      return current[key];
    }
    current = current.next;
  }
};


HashTable.prototype.remove = function (key) {
  const bucket = hashCode(key, this.SIZE);
  let current = this.storage[bucket];
  let removed;
  //if it's at head
  if (current[key]) {
    removed = current[key];
    this.items--;
    this.storage[bucket] = current.next;
  } else {
    while (current.next) {
      if (current.next[key]) {
        removed = current.next[key];
        this.items--;
        return removed;
      }
      current.next = current.next.next;
    }
  }
  return removed;
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
