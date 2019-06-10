/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.currentSize = 0;
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
  //get hashed index of our key
  let hashedIndex = hashCode(key,this.SIZE);
  //check if theres anything there, if not then make new obj and throw it in there
  if(this.storage[hashedIndex]===undefined){
    let newObj = {};
    newObj[key]=value;
    this.storage[hashedIndex] = newObj;
    this.currentSize+=1
  }
  else{
    //simple overwrite existing,dont have to check cuz assigning automatically overwrites,
    //nah dude we actually gotta check it so we know whether or not to add to current size
    if(this.storage[hashedIndex][key]===undefined){
      this.currentSize+=1;
    }
    this.storage[hashedIndex][key] = value;
  }
  //return number of items added which is one
  //should overwriting it make it zero? but you are kinda adding a new item into it.
  //wait actually it asks for the new number of items in it so we gotta check for current size;
  
  return this.currentSize;
}
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
  //const value = this.storage[hashCode(key,this.SIZE)][key];
  //return value===undefined ? undefined : value;
  return this.storage[hashCode(key,this.SIZE)][key]
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
  //we wanna return value at key
  const popped = this.get(key);
  //check if it exists
  if(popped!==undefined){
    //if yes then delete it then decrease current size
    delete this.storage[hashCode(key,this.SIZE)][key];
    this.currentSize-=1;
  }

  return popped;
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

// let hashTable = new HashTable;
// for(let i =0;i<25;i++){
//   const key = 'key '+i;
//   const value = i;
//   //console.log(hashCode(key,hashTable.SIZE))
//   hashTable.set(key,i);
// }

// console.log(hashTable,hashTable.currentSize)
// hashTable.set('key 0',25);
// console.log(hashTable.currentSize,hashTable)
// console.log(hashTable.get('key 5'));
// console.log(hashTable.get('25'));
// // console.log(hashTable.storage[hashCode('25',hashTable.SIZE)]['25'])
// // console.log(hashCode('key 1',hashTable.SIZE))
// // console.log(hashCode('25',hashTable.SIZE))
// console.log(hashTable.currentSize,hashTable)

// console.log(hashTable.remove('key 3'))
// console.log(hashTable.currentSize,hashTable)

// Do not remove!!
module.exports = HashTable;
