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

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);

  this.count = 0;
}

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
//pass key through hashCode
//access index returned by hashCode
//if index is empty, add an object containing key:value pair, incriment count
//if index is not empty
  //check if obect at key is empty
    //if yes overwrite
    //if no, add and incriment count

HashTable.prototype.set = function(key, value) {

  const index = hashCode(key, this.SIZE);

  //if there is no 'bucket' at desired index
  if(!this.storage[index]){
    this.storage[index] = {};
    this.storage[index][key] = value;
    this.count++
    if(this.count >= Math.ceil(this.SIZE * 0.75)){
      const fixed = this.rehash(this.SIZE * 2);
      this.storage = fixed.storage;
      this.SIZE = fixed.SIZE;
      this.count = fixed.count;
    }
    return this.count;
  }

  //if there is a 'bucket at our desired index

  //and our key hasn't been used yet, increment count
  if(!this.storage[index][key]){
    this.storage[index][key] = value;
    return this.count++;
  }

  //and our key has been used, dont increment count
  this.storage[index][key] = value;
  return this.count;

};

/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function(key) {
  //if index is undefined, or key at index is undefined, function returns undefined
  return this.storage[hashCode(key, this.SIZE)][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

//use hashCode to determine index
//if key at index exists, set to holder, delete key:value pair, decrement index, return holder
//if not, return undefined.

//I am unsure of whether the object should be delete if removing this key makes it empty.
//On one hand it seems logical to delete the empty object, and minimize the memory used by our hashtable
//On the other hand, it could just be extra time spent creating and deleting objects.
//Ultimately it seems like better practice to remove the empty object, so I will impliment. 
//After research it is still unclear how this is handled. I am going to leave it to remove the empty object.
HashTable.prototype.remove = function(key) {
  //determine index
  const index = hashCode(key, this.SIZE);

  //if hashTable does contain this key:value pair
  if(this.storage[index][key]){
    //value is passed by value, we don't need to worry about loss of data on deletion.
    const outVal = this.storage[index][key];
    //deteremine if key:value pair is only object to be removed
    //this step is the largest inefficiency in the function, but it seem important to keeping the hashtable minimally full.
    if(Object.keys(this.storage[index]).length === 1) delete this.storage[index];
    else delete this.storage[index][key];
    this.count--;
    if(this.count <= Math.floor(this.SIZE * 0.25) && this.count > 16){
      const fixed = this.rehash(this.SIZE / 2);
      this.storage = fixed.storage;
      this.SIZE = fixed.SIZE;
      this.count = fixed.count;
    }
    return outVal;
  }
  //if hashtable doesn't contain this key:value pair
  return undefined;

};

function rehash(size){
  const outHash = new HashTable();
  outHash.SIZE = size;
  //iterate over indexes of old hash
  for(let i = 0; i < this.storage.length; i++){
    //if there is a bucket at this index
    if(this.storage[i]){
      //iterate over key:value pairs in bucket, adding each to new hash
      for(let key in this.storage[i]){
        outHash.set(key, this.storage[i][key]);
      }
    }
  }

  return outHash;
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

const laMesa = new HashTable();
laMesa.SIZE = 2
console.log(laMesa.set('first', 1));
laMesa.set('second', 2);
laMesa.set('third', 3);
console.log(laMesa)

//RAN OUT OF TIME

// Do not remove!!
module.exports = HashTable;
