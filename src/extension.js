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
  this.SIZE = 4;
  this.count = 0; // total count of items stored in the hash table
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const tempArr = {};
  // check if, after incrementing count, count will be over 75% of hash table's size
  if ((this.count+1)/this.SIZE > 0.75) {
    // if so, remove from Hashtable then store all key-value pairs currently in the hash table
    // loop through each bucket in hashtable
    for (let i=0; i < this.SIZE; i+=1) {
      // if undefined, leave be
      if (!this.storage[i]) {}
      else {
        for (existingKey in this.storage[i]) {
          tempArr[existingKey] = this.removeInternal(existingKey);
        } 
      }
    }
  // double the hashtable's size
  this.SIZE = this.SIZE*2;
  } 
  // push the provided key value pair to tempArr
  tempArr[key] = value;
  // set all those in tempArr;
  Object.keys(tempArr).forEach( a => {
    // determine hash to use
    let bucket = hashCode(a,this.SIZE);
    // save into the hash table
      // if nothing currently in bucket
    if (!this.storage[bucket]) {
      this.storage[bucket] = {[a] : tempArr[a]};
      this.count += 1;
    }
      // if the key is already in bucket
    else if (this.storage[bucket][a]) { this.storage[bucket][a] = tempArr[a] }
      // if the key is not already in bucket
    else {
      this.storage[bucket][a] = tempArr[a];
      this.count += 1;
    }
  }
  )
  // return count
  return this.count;
};

HashTable.prototype.get = function(key) {
  // identify bucket where key would be located
  let bucket = hashCode(key,this.SIZE);
  // if unable to access, then return undefined
  if (!this.storage[bucket] || !this.storage[bucket][key]) return undefined;
  else return this.storage[bucket][key];
};

HashTable.prototype.remove = function(key){
  const tempArr = {};
  // check if, after decrementing count, count will be less than 25% of hash table's size
  if ((this.count-1)/this.SIZE >= 0.25) { return this.removeInternal(key) }
  else {
    // if so, remove from Hashtable then store all key-value pairs currently in the hash table
    // loop through each bucket in hashtable
    for (let i=0; i < this.SIZE; i+=1) {
      // if undefined, leave be
      if (!this.storage[i]) {}
      else {
        for (existingKey in this.storage[i]) {
          tempArr[existingKey] = this.removeInternal(existingKey);
        } 
      }
    }
    // delete key to be removed
    const result = tempArr[key];
    delete tempArr[key];
    // halve the hashtable's size
    this.SIZE = this.SIZE/2;
    // for each tempArr, set the value
    Object.keys(tempArr).forEach(a => this.set(a, tempArr[a]));
    return result;
  }
  // identify bucket where key would be located
}

HashTable.prototype.removeInternal = function(key) {
  let bucket = hashCode(key,this.SIZE);
  // check if the key exists in the bucket
  if (!this.storage[bucket] || !this.storage[bucket][key]) return undefined;
  // if key exists, remove
  // store the removed value, to be returned later
  const result = this.storage[bucket][key];
  delete this.storage[bucket][key];
  // upon deletion, decrement count
  this.count -= 1;
  // if object is empty after removing, reset to "undefined"
  if (Object.keys(this.storage[bucket]).length === 0) {this.storage[bucket] = undefined;}
  return result;
};


// var test = new HashTable;
// console.log(test.set('soobin',1));
// console.log(test.set('jason',2));
// console.log(test.set('james',1));
// console.log(test.SIZE);
// console.log(test.set('haebin',1));
// console.log(test.set('emo',1));
// console.log(test.SIZE);
// console.log(test.get('jason'));
// console.log(test.remove('jason'));
// console.log(test.remove('soobin'));
// console.log(test.remove('haebin'));
// console.log(test.remove('james'));
// console.log(test.SIZE);

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
