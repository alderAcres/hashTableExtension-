function HashTable() {
  this.SIZE = 16;
  
  // the array will be instantiated as [undefined, undefined....]
  // the array length should not change in this problem
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {

};

HashTable.prototype.get = function(key) {

};

HashTable.prototype.remove = function(key) {

};


// Do not modify
function hashCode(string, size){
  var hash = 0;
  if (string.length === 0) return hash;
  
  for (i = 0; i < string.length; i++) {
    var letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
