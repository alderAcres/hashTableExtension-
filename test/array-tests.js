var array;
describe('Arrays', function() {
  beforeEach(function() {
    array = new ArrayClone();
  });

  describe('push', function() {
    it('should add one element to the end', function() {
      array.push(0);
      array.push(1);
      array.push(2);
      array.push(3);
      expect(array._storage).to.eql([0,1,2,3]);
    });
    it('should be able to accept multiple paramaters and add them the array', function() {
      array.push(0,1,2);
      expect(array._storage[0]).to.eql(0);
      expect(array._storage[1]).to.eql(1);
      expect(array._storage[2]).to.eql(2);
    });
    it('should return the new length of the array', function() {
      expect(array.push(0)).to.eql(1);
      expect(array.push(0)).to.eql(2);
      expect(array.push(0,0,0)).to.eql(5);
    });
  });

  describe('pop', function() {
    it('should remove the last element of the array and return the value', function() {
      array._storage.push(0,1);
      array._index = 2;
      expect(array.pop()).to.eql(1);
      expect(array.pop()).to.eql(0);
    });
  });

  describe('shift', function() {
    it('should remove the first element and shift the array over one index', function() {
      array._storage.push(0,1,2,3,4);
      array._index = 5;
      expect(array.shift()).to.eql(0);
      expect(array.shift()).to.eql(1);
      expect(array.shift()).to.eql(2);
      expect(array.shift()).to.eql(3);
      expect(array.shift()).to.eql(4);
    });

  });

  describe('unshift', function() {
    it('should add one element to the beginning of the array and shift the array over one index', function() {
      array.unshift(2);
      array.unshift(1);
      array.unshift(0);
      expect(array._storage).to.eql([0,1,2]);
    });

    it('should be able to add multiple paramaters, add them to the array, and shift the array over that many indexes', function() {
      array.unshift(0,1,2,3);
      expect(array._storage).to.eql([0,1,2,3]);
    });

    it('should return the new length of the array', function() {
      expect(array.unshift(0)).to.eql(1);
      expect(array.unshift(0)).to.eql(2);
      expect(array.unshift(0)).to.eql(3);
      expect(array.unshift(0,0,0)).to.eql(6);
    })

  });

});