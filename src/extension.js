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
class HashTable {
  constructor() {
    this.SIZE = 16;
    this.storage = new Array(this.SIZE);
    //add storage limit propertyu
    this.limit = Math.floor(this.SIZE * .75);
  }
  //add methods
  set = (key, value) => {
    // - If adding the new item will push the number of stored items to over 75% of
    //     the hash table's SIZE, then double the hash table's SIZE and rehash everything
    //declare const new object to store differet key value pairs to empty obj to handle collisions
    const valObj = {};
    // run the hashCode on key and assign it to a cache pass in string and size
    // bucket = output
    let bucket = hashCode(key, this.SIZE); // result will be number: 0 1 2 .. 15

    // if this bucket already has an obj,
    // add a new key with new val to that obj
    if(this.storage[bucket]) { // if there is an obj
      this.storage[bucket][key] = value;
      this.limit++;
    } else {
      //else, assign the key this new obj
      this.storage[bucket] = valObj;
      //add value to new key
      valObj[key] = value;
    }
    if(this.limit) {
      this.storage );
    }
  }

  get = function(key) {
    // run hashCode passing in key
    //store output into drawer
    let drawer = hashCode(key, this.SIZE);
    //search this.storage[drawer] for key
    // return key;
    return this.storage[drawer][key];
  }

  remove = function(key) {
    // - If the hash table's SIZE is greater than 16 and the result of removing the
    // item drops the number of stored items to be less than 25% of the hash table's SIZE
    // (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
    // pass key to hashcode to get drawer and assign to variable
    let drawer = hashCode(key, this.SIZE);
    // assing the old value to a temp variable to return later after deletion
    let value = this.storage[drawer][key];
    // delete this.storage drawer(the value)
    delete this.storage[drawer][key];
    //resize
    if(this.SIZE / this.limit < 0.25) {
      this.storage);
    }
    // return key
    return value;
  }

}

let newHash = new HashTable();
newHash.set('apple', 3)
newHash.set('pears', 4);
console.log(newHash.SIZE)

// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if(string.length === 0) return hash;

  for(let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
