function HashTableStrorage(size) {
  this.storage = {};
}

HashTableStrorage.prototype.set = function(key, value) {
  var hash = hashCode(key, this.size);
  storage[hash] = value;
}

HashTableStrorage.prototype.get = function(key) {
  var hash = hashCode(key, this.size);
  return storage[hash];
}

function hashCode = function(string, size){
  var hash = 0;
  if (string.length == 0) return hash;
  for (i = 0; i < string.length; i++) {
    var letter = string.charCodeAt(i);
    hash = ((hash<<5)-hash)+letter;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash % size ;
}
