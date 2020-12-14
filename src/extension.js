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

/******************** SET METHOD ********************/


/*
  create a const variable that will hold the evaluated result of hashCode with the key and size passed in <==== this assigns the buckets
  check if it doesn't exist within the hash table, if it doesn't
    within the this.storage object, pass key parameter as a key within storage and assign it the value of user input value
  otherwise 
    otherwise, enter the bucket where key exists and assign it the value
  return the evaluated result of key and size (bucket)

  ***** double check why line 42 => why does key have to be within brackets?  *****
*/



HashTable.prototype.set = function (key, value) {
  const hashCodeEval = hashCode(key, this.SIZE)
  if (!this.storage[hashCodeEval]) {
    this.storage[hashCodeEval] = {
      [key]: value
    }
  } else {
    this.storage[hashCodeEval][key] = value
  }
  return hash
};

/******************** GET METHOD ********************/

/*
  enters the hash table at a certain key to retrieve the specified key
  create a constant that will be the evaluated result of hashCode with key parameter passed in and this.size
  create a bucket variable that will be used to enter the bucket
  enter the if conditional and see if the bucket exists of if the key we're looking for exists within the bucket (the bucket can exist but the key may not)
    if all these statements are true, return undefined because what we're looking for doesn't exist
  return the bucket withe the key parameter passed in as the bucket's key
*/


HashTable.prototype.get = function (key) {
  const hashCodeEval = hashCode(key, this.SIZE)
  const bucket = this.storage[hashCodeEval]
  if (bucket === undefined || bucket[key] === undefined) return undefined
  return bucket[key]
};

/******************** REMOVE METHOD ********************/


/*
  create a constant variable that will be the evaluated value of hashCode with userinput key passed in => spits out a value between 0 and this.size 
  create a bucket variable that will be the actual bucket
  check if bucket exists or if within the bucket, there's is something there 
  create a variable deleted that we will eventually use to return 
  delete the value we want
  return deleted

  notes: even though we created a storage with a length of 16, all of those 16 positions are undefined since there are no values.

  console.log(const storage = new Array(16)) => undefined
  console.log(storage) => (16) [empty x 16]
  console.log(storage[5]) => undefined

  if conditional checks if bucket[key] is undefined or if bucket is falsey 
*/

HashTable.prototype.remove = function (key) {
  const hashCodeEval = hashCode(key, this.SIZE)
  const bucket = this.storage[hashCodeEval]
  // check if the bucket exists
  if (bucket === undefined || bucket[key] === undefined) return undefined
  // variable needs to be created to hold on to the value that needs to be returned. after deletion, there will be no references to that value so we create it before deletion and return it afterwards
  const current = bucket[key]
  delete bucket[key]
  return current
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