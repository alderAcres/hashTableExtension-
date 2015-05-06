var hashTable;
describe('HashTable', function() {
  beforeEach(function() {
    hashTable = new HashTable();
  });

  it('should have a set and get function', function() {
    expect(hashTable.set).to.be.a('function');
    expect(hashTable.get).to.be.a('function');
  });

  it('should set and get', function() {
    hashTable.set('key','value');
    expect(hashTable.get('key')).to.be('value');
  });

  it('should set and get multiple values', function() {
    hashTable.set('first key', 'first value');
    hashTable.set('second key', 'second value');
    expect(hashTable.get('first key')).to.be('first value');
    expect(hashTable.get('second key')).to.be('second value');
  });

  it('should handle collisions (http://en.wikipedia.org/wiki/Hash_table#Collision_resolution)', function() {
    for (var i = 0; i < 20; i++) {
      var key = 'key ' + i;
      var value = 'value ' + i;
      hashTable.set(key, value);
      expect(hashTable.get(key)).to.be.(value);
    }
  });

});