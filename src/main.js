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
HashTable.prototype.set = function(key, value) {
  // create a variabe to hold the index of the bucket ,the evaluated reslt 
  // of invoking hashcode function below 
  const idx  = hashCode(key,this.size)
// if the current key exists in the hashtable  bucket overwirte the existing value 
  if(this.storage[idx] === key){
    this.storage[idx] = value; 
  }else if (this.storage[idx].value){ 
    // else if the hastable objects storage array at the current index already has 
    // an object then access the current object using bracket and dot notation 
    //and add a new key value pair to exisiting obj
    this.storage[idx].key = {[key]: value}
  }
//iterate over the storage array usuin reduce 
const itemCount = this.storage.reduce((acc,curr)=>{
  if(typeof curr === null){
    // if the storage array at curr idx doesnt contain an object 
    // acc stays the same 
    acc += 0 ; 
  } else if (typeof curr === 'object'){ // if the curr el contains an object 
    // use Obj,keys/length to find how many key value pairs are in the object.
  let keyVal = Object.keys(curr); 
  acc += keyVal.length; // add to result variable 
  }
  return acc
}, 0) // acc =  starts at 0 to add all items in each current elemt object 
return itemCount
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
  // iterate through the storage array on the hastable obj 
  this.storage.forEach((el)=>{
    if(typeof el === 'object'){ // if the curr el contains an object 
      // nested if conditional to check if the value we are looking for is there 
      if(el.key){
        // if its there return the value 
        return el.key; 
      }
    }
    return "the requested item is not in the hashtable" // if we iterate through the whole storage 
    // array and do see the value then return an error message 
  })
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
  // iterate through the storage array on the hastable obj 
  this.storage.forEach((el)=>{
    if(typeof el === 'object'){ // if the curr el contains an object 
      // nested if conditional to check if the value we are looking for is there 
      if(el.key){// if ithe key is located in our element Obj 
        // save the value in a variable 
        const retKey = el.key; 
        // delete that key value pair 
        delete el.key; 
        // rturn the deleted item 
        return retKey

      }
    }
    return "the requested item is not in the hashtable" // if we iterate through the whole storage 
    // array and do see the value then return an error message 
  })

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

// testing it out 
// dec variable to equal new instance of hastable constructor 
const testington  = new HashTable(); 
testington.set('name','Juan');// should return curr count 1
testington.set('age','34'); // should return curr count 2 
testington.set('job','accountant'); // should return curr count 3 
console.log(testington) // should show array of objects
testington.get('age') // should return 34 
testington.remove('job') // should return accountant 
testington.remove('height') // should return "the requested item is not in the hashtable"
