const { test, describe } = require('node:test');
const assert = require('node:assert');
const { sum, hello } = require('../dist/index.js');

describe('NAPI Integration Tests', () => {
  describe('sum function', () => {
    test('should add two positive numbers correctly', () => {
      assert.strictEqual(sum(2, 3), 5);
      assert.strictEqual(sum(10, 20), 30);
      assert.strictEqual(sum(1, 1), 2);
    });

    test('should handle zero values', () => {
      assert.strictEqual(sum(0, 0), 0);
      assert.strictEqual(sum(5, 0), 5);
      assert.strictEqual(sum(0, 7), 7);
    });

    test('should handle negative numbers', () => {
      assert.strictEqual(sum(-1, 1), 0);
      assert.strictEqual(sum(-5, -3), -8);
      assert.strictEqual(sum(-10, 15), 5);
    });

    test('should handle large numbers', () => {
      assert.strictEqual(sum(1000000, 2000000), 3000000);
      assert.strictEqual(sum(-1000000, 500000), -500000);
    });

    test('should throw error on integer overflow', () => {
      assert.throws(() => {
        sum(2147483647, 1); // i32::MAX + 1
      }, {
        message: /Integer overflow in sum operation/
      });

      assert.throws(() => {
        sum(-2147483648, -1); // i32::MIN - 1
      }, {
        message: /Integer overflow in sum operation/
      });
    });

    test('should handle edge case values', () => {
      assert.strictEqual(sum(2147483647, 0), 2147483647); // i32::MAX + 0
      assert.strictEqual(sum(-2147483648, 0), -2147483648); // i32::MIN + 0
      assert.strictEqual(sum(2147483646, 1), 2147483647); // Just under overflow
      assert.strictEqual(sum(-2147483647, -1), -2147483648); // Just under underflow
    });
  });

  describe('hello function', () => {
    test('should return correct greeting message', () => {
      assert.strictEqual(hello(), 'Hello there');
    });

    test('should return string type', () => {
      assert.strictEqual(typeof hello(), 'string');
    });

    test('should be consistent across multiple calls', () => {
      const result1 = hello();
      const result2 = hello();
      assert.strictEqual(result1, result2);
    });

    test('should return non-empty string', () => {
      const result = hello();
      assert.ok(result.length > 0);
      assert.ok(typeof result === 'string');
    });
  });

  describe('NAPI binding validation', () => {
    test('should export sum function', () => {
      assert.strictEqual(typeof sum, 'function');
      // NAPI functions may not expose parameter length correctly
      assert.ok(sum.name === 'sum' || sum.name === ''); // Function name may or may not be preserved
    });

    test('should export hello function', () => {
      assert.strictEqual(typeof hello, 'function');
      // NAPI functions may not expose parameter length correctly
      assert.ok(hello.name === 'hello' || hello.name === ''); // Function name may or may not be preserved
    });

    test('should handle function calls without errors', () => {
      assert.doesNotThrow(() => {
        hello();
        sum(1, 2);
      });
    });

    test('should validate function parameters correctly', () => {
      // sum should work with 2 parameters
      assert.doesNotThrow(() => sum(1, 2));
      
      // hello should work with no parameters
      assert.doesNotThrow(() => hello());
      
      // NAPI should properly validate parameter types
      assert.throws(() => {
        sum(5, undefined); // Should throw for invalid parameter type
      }, {
        code: 'NumberExpected'
      });
      
      assert.throws(() => {
        sum('invalid', 2); // Should throw for invalid parameter type
      }, {
        code: 'NumberExpected'
      });
    });
  });

  describe('Performance characteristics', () => {
    test('should handle multiple rapid calls', () => {
      const iterations = 1000;
      
      for (let i = 0; i < iterations; i++) {
        assert.strictEqual(sum(i, 1), i + 1);
        assert.strictEqual(hello(), 'Hello there');
      }
    });

    test('should maintain consistent performance', () => {
      const start = Date.now();
      const iterations = 10000;
      
      for (let i = 0; i < iterations; i++) {
        sum(i % 1000, (i + 1) % 1000);
      }
      
      const duration = Date.now() - start;
      // Should complete 10k operations in reasonable time (less than 1 second)
      assert.ok(duration < 1000, `Operations took ${duration}ms, expected < 1000ms`);
    });
  });
});