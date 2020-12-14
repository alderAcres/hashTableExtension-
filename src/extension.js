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
function HashTable(size=16) {
  this.SIZE = size;
  this.numStored = 0;
  this.storage = new Array(this.SIZE);
}
function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(val) {
  this.value = val;
  this.next = null;
}
LinkedList.prototype.push = function(value) {
  const newNode = new Node(value);
  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }

};
LinkedList.prototype.contains = function(value, currentNode = this.head) {
  if (currentNode.value === value) {
    return true;
  } else if (currentNode.next === null) {
    return false;
  } else {
    return this.contains(value, currentNode.next)
  }
};

HashTable.prototype.set = function(key, value) {
  let hashedKey = hashCode(key,this.SIZE);
  if (this.numStored/this.SIZE >= 0.75) {
    this.SIZE =this.SIZE*2;
    const newHash = new HashTable(this.SIZE);
    for (let i = 0; i < this.storage.length; i++ ) {  //still working out the redefining of a new storage array. 
      console.log(this.storage[i]);
      if(this.storage[i]){
        Object.keys(this.storage[i]).forEach( key => {
          console.log(key);
          newHash.set(key, this.storage[hashedKey][key])
        });
      }
    }
    this.storage = newHash.storage;
  }
  hashedKey = hashCode(key,this.SIZE);
  if (this.storage[hashedKey] === undefined) this.storage[hashedKey] = { };
  if (this.storage[hashedKey][key] === undefined) this.numStored++;
    this.storage[hashedKey][key] = value; 
    return this.numStored;
  
};

HashTable.prototype.get = function(key) {
  const hashedKey = hashCode(key, this.SIZE);
  return this.storage[hashedKey][key];
};

HashTable.prototype.remove = function(key) {
  const hashedKey = hashCode(key, this.SIZE) 
  const deletedVal = this.storage[hashedKey][key];
  delete this.storage[hashedKey][key];
  this.numStored--;
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

const testTable = new HashTable;
console.log(testTable.set(1,15));
console.log(testTable.set("helper",15));
console.log(testTable.set(2,15));
console.log(testTable.set('yes', 15));
console.log(testTable.set('help', 12));
console.log(testTable.set('why', 15));
console.log(testTable.set('help2', 12));
console.log(testTable.set('help3', 12));
console.log(testTable.set('help4', 12));
console.log(testTable.set('why1', 15));
console.log(testTable.set('no', 15));
console.log(testTable.SIZE);
console.log(testTable);
console.log(testTable.set('helped', 12));
console.log(testTable.set('qq', 12));
console.log(testTable.get(2));
console.log(testTable);
console.log(testTable.SIZE);