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
  this.count = 0;
}


HashTable.prototype.set = function (key, value) {

  const index = hashCode(key, this.SIZE);
  // how to handle collsions is to store them in an object s
  if (typeof this.storage[index] === 'object') this.storage[index][key] = value;
  else {
    const elmentToStore = {};
    elmentToStore[key] = value;
    this.storage[index] = elmentToStore;
  }
  // need to keep track of the number of elements place in the hashtable
  this.count += 1;
  // if the size of hash is over 75 %
  if ((this.count * .75) > (this.SIZE * .75)) {
    // call the expandHashTable function (newSize)
    this.expandHashTable(this.SIZE * 2)
  }

};

HashTable.prototype.get = function (key) {
  // grab the the index for the assosicated key;
  const index = hashCode(key, this.SIZE);
  //@@TODO IF TIME PERMITS WILL ERROR CHECK IF THE KEY EXIST OR NOT AND RETURN AN ERROR CODE.
  return this.storage[index][key];
};

HashTable.prototype.remove = function (key) {
  // Grab the index of the key 
  const index = hashCode(key, this.SIZE);

  let elmToRemove;
  if (typeof this.storage[index] === 'object') {
    elmToRemove = this.storage[index][key];
    delete this.storage[index][key]
    this.count -= 1;
  } else {
    return undefined;
  }

  if ( this.SIZE > 16 && (this.count * .25) < (this.SIZE * .25)) {
    // call the expandHashTable function (newSize) to decrease the size of the elements
    this.expandHashTable(this.SIZE / 2)
   
  }
  return elmToRemove;

};

// Expandin the hash function based on percentange 
HashTable.prototype.expandHashTable = function (size) {
  // will need to double the size of current 
  console.log(size)
  // then re-index all the elements in the current hash table

  this.storage.map((elm) => {
    console.log(elm)
    // seperating the key value to rehash the table
     for(key in elm){
       console.log(key)
       /// will reshash in there 
       const index = hashCode(key, this.SIZE);
     }

  });
}

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
