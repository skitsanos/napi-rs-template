import test from 'node:test';
import assert from 'node:assert';

import {sum} from '../index.js';

test('sum from native', () =>
{
    assert.strictEqual(sum(1, 2), 3, 'Must be 3');
});
