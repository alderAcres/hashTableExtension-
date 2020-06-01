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
function HashNode(key, value){
  this.value = value; 
  this.key = key; 
  this.next = null; 
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
  // declare a newNode with the given value
  let newHashNode = new HashTable(value);
  // declare a hashKey with the provided key and this.SIZE of this.storage
  let num = hashCode(key, this.SIZE); 
  // for(let key in this.storage){
    for( let key in this.storage){
    // if this.storage[num] !== undefined , this.storage[num] = value
    if(this.storage[num] !== undefined){
      this.storage[num] = value;
      this.SIZE += 1; 
      return this.SIZE; 
    } else {
    // else this.storage[num] = value;
    this.storage[num] = value; 
    this.SIZE += 1;
    return this.SIZE; 
    }
    }
  };
// I'M NOT SURE HOW TO HANDLE COLLISION, WILL LOOK UP AND GET BACK TO THIS ONE
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
 //     declare  a num equal to a new hashCode using the key and this.SIZE
 const num = hashCode(key, this.SIZE);
 // declare an index equal to the num we just created
 const index = num; 
 // declare a current variable and set it equal to this.storage[index] (this is the value we are 
 // looking for )
 let current = this.storage[index];
 // while current is not null, if current.key === key , return current.value
 while(current !== null){
   if(current.key === key){
     return current.value;
   }
// else we move current to equal current.next
    curent = current.next;
 }
 
 // if we get to the end of the bucket, (current === null) we return undefined
 return undefined; 
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
// use the same route as get to find the value
const num = new hashCode(key, this.SIZE); 
const index = num; 
let current = this.storage[index]; 
while(current !== null){
  if(current.key ===key){ // once found, declare a variable temp equal to current's value
    let temp = current.value; 
    this.storage[index] = current.next; // change the index one element forward 
    this.SIZE--; // decrement the size of this.storage
    delete temp;  // delete the found value
    return temp;  // return found value 
  } else {    // I believe I'm wrong here, but we may have to look one index over? 
    while(current !== null){
      if(current.next && current.next.key === key){
        let temp = current.next.value;
        current.next = curren.next.next; 
        this.SIZE--; 
        delete temp;
        return temp; 
      }
    }
  }
  current = current.next; 
}


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
