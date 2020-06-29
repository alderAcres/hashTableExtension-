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

// PASTE AND MODIFY YOUR CODE BELOW -------------------------------------------------------------------------
function HashTable(size = 16) {
  this.SIZE = size;
  this.itemsStored = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {
  // Storage is an array and I want to store an object in the appropriate locations in the array
  // This object will contain as many key value pairs as needs

  //The hashcode function tells us where in the storage array we should input our data
  let indexValue = hashCode(key, this.SIZE);
  // Check if something already exists in that location in the storage
  if (this.storage[indexValue]) {
    // If something exists add our inputted key value pair to that object
    this.storage[indexValue].key = value;
  } else {
    // If that index is undefined then create a new object and add our key value pair
    this.storage[indexValue] = { key: value };
  }

  // Incrementing amount of items stored value
  ++this.itemsStored;
  // Check if the amount stored is over 75% of the total size of the storage
  // If over 75% of size then
  if (this.itemsStored > 0.75 * this.SIZE) {
    // 1.) Double the hashtables storage size
    // 2.) rehash everything
    // Create a new hashtab that has a size twice as big as this current storage
    let tempHash = new HashTable(this.SIZE * 2);
    // -- Thought process below --
    // Fill that new hashtable's storage with the values of the current storage value
    // This won't be as simple as slice a subarray in however because the hashcode will now have to adapt.
    // Pretty much, make a new hashtable that works for our needs then set it's member variables to our current hashTable's member variables
    //How do I go about grabbing all of the current key value pairs in the storage without looping through the entirity of the storage
    // If I loop through it has bad time complexity. It's crude but I'll try
    for (let i = 0; i < this.SIZE; ++i) {
      if (this.storage[i]) {
        //If something exits there
        //Take all the key value pairs and rehash then add to temphash
        let currentObj = this.storage[i];
        for (let key in currentObj) {
          tempHash.set(currentObj[key]);
        }
      }
    }
    //Setting this's values to the temphash's values
    this.SIZE = tempHash.SIZE;
    //this.itemsStored = tempHash.itemsStored; Don't need this because I already incremented correctly :)
    this.storage = tempHash.storage;
    console.log('it happened');
  }
  // If not over 75% of size do nothing
  // Return number of items stored
  return this.itemsStored;
};

HashTable.prototype.get = function (key) {
  // put the key in the hashcode function so we can find the index of the storage
  let indexValue = hashCode(key, this.SIZE);
  // Check if something exists at that index
  if (!this.storage[indexValue]) {
    // If nothing exists then return undefined
    return undefined;
  } else {
    // If something does exists (an object is present) then return the value of the key applied to that object
    return this.storage[indexValue].key;
  }
};

HashTable.prototype.remove = function (key) {
  // Input key into cashcode function to get indexValue of storage
  let indexValue = hashCode(key, this.SIZE);
  if (!this.storage[indexValue]) {
    // If something does not exist then return undefined
    return undefined;
  } else {
    // If something exists then delete the appropriate key value pair of the object in that location
    // Store returned value
    let output = this.storage[indexValue].key;
    delete this.storage[indexValue].key;
    --this.itemsStored;
    return output;
  }
};

//Testing
let myHash = new HashTable(5);
// 75% of 5 is about 4
myHash.set('first', 1);
myHash.set('second', 2);
myHash.set('third', 3);
console.log(myHash.SIZE);
console.log(myHash.itemsStored);
myHash.set('fourth', 4);
console.log(myHash.SIZE);
console.log(myHash.itemsStored);

// YOUR CODE ABOVE -------------------------------------------------------------------------

function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
