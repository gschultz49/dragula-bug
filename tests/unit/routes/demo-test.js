import { module, test } from 'qunit';
import { setupTest } from 'dragula-debug/tests/helpers';

module('Unit | Route | demo', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:demo');
    assert.ok(route);
  });
});
