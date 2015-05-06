function HashTable() {
  this._SIZE = 16;
  this.storage = new HashTableStorage(this._SIZE);
}


// the storage contains a get and set method
// storage is similar to an object (key, value), but has a fixed number of properties that it can contains
HashTable.prototype.set = function(key, value) {

}

HashTable.prototype.get = function(key) {

}