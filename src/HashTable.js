function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
}

/**
* set - Adds given value to the hash table with specified key
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {

};

/**
* get - Retrieves a value stored in the hash table with a specified key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function(key) {

};

/**
* remove - Remove the key/value pair at the specified key in the hash table
*
* @param {string} key - key to be found and deleted in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.remove = function(key) {

};


// Do not modify
function hashCode(string, size){
  var hash = 0;
  if (string.length === 0) return hash;
  
  for (var i = 0; i < string.length; i++) {
    var letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
