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

/////////////////////////////////////
function HashTable() {
  this.SIZE = 16;

  this.storage = new Array(this.SIZE);
  this.items = 0;
}

function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;

}
//////////////////////////////////////


HashTable.prototype.set = function(key, value) {
  const newNode = new Node(key, value);
  const v = hashCode(key, this.SIZE);
  this.items++

  if (this.items >= (this.SIZE * 0.75)) {
    this.SIZE = this.SIZE * 2;
    return this.SIZE
    //incomplete
  }

  //check if storage has hashcode
  if (this.storage[v]) {
    this.storage[v].tail.next = newNode;
    this.storage[v].tail = newNode;
    return this.items
  } else {
    this.storage[v] = new LinkedList();
    if (this.storage[v].head === null && this.storage[v].tail === null) {
      this.storage[v].head = newNode;
      this.storage[v].tail = newNode;
      return this.items
    }
  }
};






HashTable.prototype.get = function(key) {
  const v = hashCode(key, this.SIZE);
  let current = this.storage[v].head;
  while (current.key !== key) {
    if (current.next === null) {
      return undefined;
    }
    current = current.next;
  }
  if (current.value !== null) {
    return current.value;
  } else {
    return undefined;
  }
};

HashTable.prototype.remove = function(key) {
  const v = hashCode(key, this.SIZE);



  if (this.storage[v]) {
    if (this.storage[v].head === this.storage[v].tail) {
      let deleted = this.storage[v].head.value;
      this.storage[v].head = null;
      this.storage[v].tail = null;
      return deleted;
    }
    let current = this.storage[v].head;
    while (current.next.key !== key) {
      if (current.next === null) {
        return undefined;
      }
      current = current.next;
    }

    let deleted = current.next.value;
    current.next = current.next.next;
    return deleted;

  } else {
    return undefined;
  }
};


// Do not remove!!
module.exports = HashTable;