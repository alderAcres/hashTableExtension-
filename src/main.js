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
  this.storage1 = new Array(this.SIZE);
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
  let new_key = hashCode(key,this.size);
  if(!this.storage.new_key){
    this.storage.new_key = {key:value};
    let keys1 = Object.keys(this.storage);
    let num_ele1 = 0;
    for(keys1 in this.storage){
      if(this.storage.keys != undefined){
      num_ele1++;
      }
    }
  return num_ele1;
  }
  //implemented round robin fulfilled in placing elements if the table is not filled
  let start_key = new_key;
  if(this.storage.new_key){
    let notEmpty = true;
    do{
      new_key = (new_key+1)%this.SIZE;
      if(!this.storage[new_key]){
        this.storage.new_key = {key:value};
        notEmpty = false;
      }

    }while(notEmpty && start_key != new_key);
  //   while(notEmpty && start_key != new_key){
  //     new_key = (new_key+1)%this.SIZE;
  //     if(!this.storage.new_key){
  //       this.storage.new_key = value;
  //       notEmpty = false;
  //     }
  // }
  }

  let keys = Object.keys(this.storage);
  let num_ele = 0;
  for(keys in this.storage){
    if(this.storage.keys!= undefined){
      num_ele++;
    }
  }
  if(num_ele == this.SIZE){
    console.log("all available slots are filled please expand or use another hash table :)")
  }
  
  return num_ele;
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
  let new_key = hashCode(key,this.size);
  if(this.storage.new_key.key!= undefined){
    return this.storage.new_key.key;
  }
  if(this.storage.new_key.key == undefined){
    let start = new_key;
    do{
      new_key = (new_key+1)%16;
      if(this.storage.new_key.key != undefined){
        return this.storage.new_key.key;
      }
    }while(this.storage.new_key.key == undefined && start != new_key)
  
  }
  return undefined;
}

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let new_key = hashCode(key, this.size);
  if(this.storage[new_key]){
    let removed = this.storage[new_key];
    delete this.storage[new_key];
    return removed;
  }
  if(this.storage.new_key.key == undefined){
    let start = new_key;
    do{
      new_key = (new_key+1)%16;
      if(this.storage.new_key.key != undefined){
        let removed =  this.storage.new_key.key;
        delete this.storage.new_key.key;
        return removed;
      }
    }while(this.storage.new_key.key == undefined && start != new_key)
  
  }
  return undefined;
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
let test_hash = new HashTable();
test_hash.set("test", 12);

// function hashCode2(string, size) {
//   'use strict';
  
//   let hash = 0;
//   if (string.length === 0) return hash;
  
//   for (let i = 0; i < string.length; i++) {
//     const letter = string.charCodeAt(i);
//     hash = ((hash << 5) - hash) + letter +letter;
//     hash = hash & hash; // Convert to 32bit integer
//   }
  
//   return Math.abs(hash) % size;
// }
// Do not remove!!
module.exports = HashTable;
