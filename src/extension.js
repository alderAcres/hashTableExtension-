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

HashTable.prototype.set = function (key, value) {
  let idx = hashCode(key, this.SIZE);
  if (!this.storage[idx]) this.storage[idx] = {};
  this.storage[idx][key] = value;

  let count = 0;
  for (let i = 0; i < this.storage.length; i++) {
    if (!this.storage[i]) {
      count++;
    }
  }
  if (count / this.SIZE <= 0.25) {
    //need to rehash or won't be able to retrieve data sinze this.SIZE affects hashCode
    //create an array of all the key-value pairs
    //loop though this.storage array
    //each element is a bucket object, loop through the keys of the bucket object
    //can try using reduce? or map?
    let data = this.storage.reduce((acc, bucket) => {
      //each bucket is an object, we want to push it's key-value pairs into acc
      Object.keys(bucket).forEach((key) => {
        //the key value pairs are [key, [bucket[key]]], need to add to acc
        // acc.push([key][bucket[key]]);
        acc[key] = bucket[key];
      });
      return acc;
    }, {});

    //now that we have the original data stored in data object, we can clear the old this.storage and restart with double the size
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE);
    //now we go through the data object, setting in each key value pair.
    Object.keys(data).forEach((key) => {
      // this.set(key, data[value]);
      let idx = hashCode(key, this.SIZE);
      if (!this.storage[idx]) this.storage[idx] = {};
      this.storage[idx][key] = data[key];
    });
  }
};

HashTable.prototype.get = function (key) {
  let idx = hashCode(key, this.SIZE);
  return this.storage[idx][key];
};

HashTable.prototype.remove = function (key) {
  let idx = hashCode(key, this.SIZE);
  let output;
  if (this.storage[idx][key]) {
    output = this.storage[idx][key];
    delete this.storage[idx][key];
  } else output = undefined;

  if (Object.keys(this.storage[idx]).length === 0) this.storage[idx] = 0;

  if (this.SIZE > 16) {
    console.log(key);
    //check how many buckets are empty;
    let count = 0;
    console.log(this.storage.length);
    for (let i = 0; i < this.storage.length; i++) {
      if (!this.storage[i]) {
        count++;
      }
    }
    console.log(count);
    console.log(count / this.SIZE);
    if (count / this.SIZE >= 0.75) {
      let data = this.storage.reduce((acc, bucket) => {
        Object.keys(bucket).forEach((key) => {
          acc[key] = bucket[key];
        });
        return acc;
      }, {});

      this.SIZE /= 2;
      this.storage = new Array(this.SIZE);
      Object.keys(data).forEach((key) => {
        let idx = hashCode(key, this.SIZE);
        if (!this.storage[idx]) this.storage[idx] = {};
        this.storage[idx][key] = data[key];
      });
    }
  }
  return output;
};

// YOUR CODE ABOVE

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

// let myTable = new HashTable();
// for (let i = 0; i < 25; i++) {
//   myTable.set('key-' + i, 'value-' + i);
// }
// console.log(myTable);
// console.log(myTable.storage.length);

// // console.log(myTable.get('key-10'));

// for (let i = 0; i < 24; i++) {
//   myTable.remove('key-' + i);
// }

// console.log(myTable);
// console.log(myTable.storage.length);
