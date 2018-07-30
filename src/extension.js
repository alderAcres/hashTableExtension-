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

/*
  1. set:
        - If adding the new item will push the number of stored items to over 75% of
          the hash table's SIZE, then double the hash table's SIZE and rehash everything
*/
HashTable.prototype.set = function(key, value) {
  // check if the obj stored in the appropriate element is >= 75% of this.size
  // if it is, resize this.size and rehash everything
  // (have this in the else statement)
    // const length = Object.keys(this.storage[hashedKey])
    // if(length >= (.75 * this.SIZE))
      // resize it and rehash everything
      // this.SIZE *= 3
      // maybe use reduce? to go through the array?
      // loop through each key/value and rehash

  // hash the key using the hashCode function
  const hashedKey = hashCode(key, this.SIZE);
    
  const length = Object.keys(this.storage[hashedKey]);
  
  if(length >= (.75 * this.SIZE)){
    this.SIZE *= 3;

    this.storage = this.storage.reduce((acc, currIndex) => {
      for(oldKey in oldObj){
        // get new hashkey
        let newHashedKey = hashCode(oldKey, this.SIZE);
        // reassign the key/value pair to the newHashedKey
        (acc[newHashedKey])[oldKey] = acc[oldKey];
        // removes the old key/value pair
        delete acc[oldKey];
      }
      return acc;
    }, this.storage);
  }
  else if(!this.storage[hashedKey]){
    // if it is initially 'undefined', store a newObj into the approrpriate index position
    // and store the key and value to that object
    const newObj = {};
    newObj[key] = value;
    this.storage[hashedKey] = newObj;
  }else{
    // if a key already exists in the storage, update the value
    // or simply add the key/value pairs
    (this.storage[hashedKey])[key] = value;
  }
};

HashTable.prototype.get = function(key) {
  const hashedKey = hashCode(key, this.SIZE);
  // check if the hashedKey exists
  if(this.storage[hashedKey]){
    const keyValue = (this.storage[hashedKey])[key];
    // if there are multiple key/value pairs are stored, return the correct value
    return keyValue;
  }
  // if it doesn't exist
  return;
};

/**
  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/
HashTable.prototype.remove = function(key) {
  const hashedKey = hashCode(key, this.SIZE);
  const theKey = (this.storage[hashedKey])[key];

  if(this.storage[hashedKey] && theKey){
    const returnValue = (this.storage[hashedKey])[key];
    delete (this.storage[hashedKey])[key];

    return returnValue;
  }
  // if it doesn't exist, return undefined
  return;
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


const ht = new HashTable();
ht.set('bob', 111);
ht.set('alice', 222);
ht.set('test2', 333);
console.log(ht);

console.log(hashCode('bob'));

// Do not remove!!
module.exports = HashTable;
