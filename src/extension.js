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

HashTable.prototype.rehash = function (size) {
  // create new array to store new table in
  let newHashTable = new Array(size);
  let oldHash = this.storage.slice()
  // loop through the existing storage, add add each to the new table
  for (let i = 0; i < oldHash; i += 1) {
    let curBucket = oldHash[i];
    // if an object exists in the bucket
    if (Object.keys(curBucket).length) {
      // loop through the object's keys
      for (let key in curBucket) {
        // get a hash key with the new size
        let hashKey = hashCode(key, size)
        // if the newHashTable doesn't have anything in the bucket, create an object there
        if (newHashTable[hashKey] === undefined) {
          newHashTable[hashKey] = {}
        }
        // add the key value pair
        newHashTable[hashKey][key] = oldHash[i][key]
      }
    }
  }
  console.log('new hash: ', newHashTable)
  this.storage = newHashTable; // set the storage to be the new table
  this.SIZE = size; // set the size to be the new size
}


HashTable.prototype.set = function (key, value) {
  // check to see if  adding one will push to over 75% full
  if (((this.count + 1) / this.SIZE) > (3 / 4)) {
    console.log(this.count / this.SIZE)
    this.rehash(this.SIZE * 2); // if true, rehash & double in size
  }
  // get the appropriate hash code for the key
  let hashKey = hashCode(key, this.SIZE);
  // check to see if anything stored in the bucket corresponding to hash code
  if (!this.storage[hashKey]) {  // if not existing, create a new object
    this.storage[hashKey] = {}
  }
  let bucket = this.storage[hashKey]
  if (!Object.keys(bucket).includes(key)) this.count += 1 // increment the count of key/val pairs stored if not already there
  this.storage[hashKey][key] = value; // update the object stored in the bucket to include key/val pair

};

HashTable.prototype.get = function (key) {
  // get the correct hash code for the key
  let hashKey = hashCode(key, this.SIZE);
  // get the object stored in the corresponding bucket (return false if not existing)
  if (!this.storage[hashKey]) return undefined
  let bucket = this.storage[hashKey]
  // return the value associated with the key stored in bucket
  return bucket[key];
};

HashTable.prototype.remove = function (key) {
  // if size is > 16, check to see if removing one item would reduce usage to < 25%
  if (this.SIZE > 16 && (this.count / this.SIZE) < (1 / 4)) {
    this.rehash(this.SIZE / 2) // if true, rehash to half the size
  }

  // get the correct hash code for the key
  let hashKey = hashCode(key, this.SIZE);
  // get the object stored in the corresponding bucket (return false if not existing)
  if (!this.storage[hashKey]) {
    console.log('1!')
    return undefined
  }
  let bucket = this.storage[hashKey]
  if (!Object.keys(bucket).includes(key)) {
    return undefined
  }
  delete bucket[key] // delete the key / value pair from the object
  // if the object doesn't have any key/val pairs left, set the bucket to undefined
  if (!Object.keys(bucket).length) {
    this.storage[hashKey] = undefined;
  }
  this.count -= 1 // decrement the count of key/val pairs
  return 'removed'

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


let myHash = new HashTable()
myHash.set('blue', 32)
myHash.set('purple', 12)
myHash.set('asdf', 19)
myHash.set('fdsa', 24)
console.log('count: ', myHash.count, ' size: ', myHash.SIZE, ' sto: ', myHash.storage) // expect 4 & 16
myHash.set('dasl', 235);
myHash.set('oweirtu', 1234);
myHash.set('asdfvs3', 984)
myHash.set('asdfjaseor', 29385)
console.log('count: ', myHash.count, ' size: ', myHash.SIZE, ' sto: ', myHash.storage) // expect 8 & 16
myHash.set('dasl1', 235);
myHash.set('oweirtu1', 1234);
myHash.set('as1dfvs3', 984)
console.log('count: ', myHash.count, ' size: ', myHash.SIZE) // expect 11 & 16
myHash.set('asdfja1seor', 29385)
console.log('count: ', myHash.count, ' size: ', myHash.SIZE) // expect 12 & 16
myHash.set('asdfja123seor', 29385)
console.log('count: ', myHash.count, ' size: ', myHash.SIZE, ' sto: ', myHash.storage) // expect 13 & 32
console.log(myHash.remove('asdfja1seor'))
console.log('count: ', myHash.count, ' size: ', myHash.SIZE) // expect 12 & 32

