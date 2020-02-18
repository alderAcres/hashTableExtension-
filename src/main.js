/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/

// For cleaner, less obsessively commented version, see the extension.js file.

function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.used = 0; // this is for the extension, but does not affect functionality here, I put it in here
    //because that was what the extension was on the unit 2 assignment, and it seems logical because you
    //don't want your hash bin sizes getting insanely out of control. -- this keeps track of how much
    //of the hashTable you have "used", i.e. how many values you have put in, so you can know to resize.
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
HashTable.prototype.set = function(key, value) {
    //resize up when setting -- not necessary to have resize down code here because you are only adding more stuff
    //so if you have used up 75% of the size, this following conditional will run:
  if((this.used) / this.SIZE >= 0.75) {
    this.SIZE *= 2; // size doubles
    for(const index in this.storage){
        for(const key in this.storage[index]){ // loop through to see where everything is currently hashed;
          let x = hashCode(key, this.SIZE); 
          if(x != index) {              //because the hash code is a modulus based on size, we only need to check
            if(!this.storage[x]) {        //if the new hash code is sending something to its original bin or
              this.storage[x] = {};         // to a bin where the index is (old index + new size / 2)
            }
            this.storage[x][key] = this.storage[index][key]; // put the item in the new bin
            delete this.storage[index][key]; // remove the item from the old bin
          }
        }
        if(this.storage[index] === {}) delete this.storage[index]; // clean empty bins
    }
  }
 
  let bin = hashCode(key, this.SIZE); // find the right bin
  if(!this.storage[bin]) {   // if there is nothing currently there,
    this.storage[bin] = {};     // make a place for storage
  }
  this.storage[bin][key] = value;     //put the value in the bin
  this.used++; // increment the "used" property, because you have added another value, keeping track of total use for resizing.
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
  let bin = hashCode(key, this.SIZE);   //find where your key would go
  if(!this.storage[bin]) return null; // if it is not there, return null;
  return this.storage[bin][key]; // if it is there, return the value;
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let bin = hashCode(key, this.SIZE); // find the bin where the key would go
  if(!this.storage[bin]) return undefined; //  if the bin isn't there, return undefined
  if(!Object.keys(this.storage[bin]).includes(key)) return undefined; // if the bin is there, but key isn't, return undefined
  let cache = this.storage[bin][key]; // cache value for return
  delete this.storage[bin][key]; // delete value
  this.used--;
  if(this.used / this.SIZE <= 0.25 && this.SIZE > 16) { //resize down when removing, not necessary to have a resize up here.
    this.SIZE /= 2;     //reduce size by half
    for(const index in this.storage) {
      if(index >= this.SIZE) {
        this.storage[index - this.SIZE] = {...this.storage[index - this.SIZE], ...this.storage[index]} // similarly to resizing up
            // because the hashcode has a modulus, everything is either in the right bin, or the right bin minus half the old size (i.e. the new size)
        delete this.storage[index]; // delete hash bins that are now outside of the size parameter.
      }
    }
  }
  return cache; // return removed value;
};


// Do not modify
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
