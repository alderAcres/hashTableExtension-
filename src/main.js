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

//Not very performative, was attempting to implement an Object or Linked List as bucket
//Can past test cases by indexing as an array
//var item = [key, value]; 
//this.storage[index] = item;
HashTable.prototype.set = function(key, value) {
  var index = new hashCode(key, this.SIZE); //index to store key value at
  var item = [key, value]; //key value pair to be pushed to bucket
  var bucket = this.storage[index]; //bucket with possibile index of key value pair

  //var bucket = {}; 
  //bucket[key] = value;

  if (bucket) { 
    for (let i = 0; i < bucket.length; i++) { 
      if (bucket[i][0] === key) { 
        bucket[i][1] = value; //if the key exists, set value with corresponding key
      } else { 
        bucket[key] = value; //otherwise set key value pair in bucket
      }//end if
    }//end for 
  } else { 
    bucket = item; //add item to new bucket
    this.storage[index] = bucket; //store bucket at specificed index
  }//end if else
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
  var index = new hashCode(key, this.SIZE); //index with possible key
  var bucket = this.storage[index]; //possible bucket that contains key

  if (bucket) { 
    for (let i = 0; i < bucket.length; i++) { 
      if (bucket[i][0] === key) { 
        return bucket[i][1]; //loops through the indexes of the bucket if key matches return that value
      }//end if
    }//end for
  }//end if
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
  var index = new hashCode(key, this.SIZE); //index with possible key
  var bucket = this.storage[index]; //possible bucket that contains key

  if (bucket) { 
    for (let i = 0; i < bucket.length; i++) { 
      if (bucket[i][0] === key) {
        while (bucket[i] !== bucket.length) { //loop through from key index to end of bucket length
          bucket[i][0] = bucket[i-1][0]; //shift should override current key
          bucket[i][1] = bucket[i-1][0]; //shift should overrid current value
          i+=1;//increment till bucket length
        }//end while
        delete bucket[arr.length][0]; //delete last key which would be duplicate of previous from shift
        delete bucket[arr.length][1]; //delete last value which would be duplicate of previous from shift
        break; //no need to loop through rest
      }//end if 
    }//end for
  } else { 
    return undefined; //if not found
  }//end if else
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
