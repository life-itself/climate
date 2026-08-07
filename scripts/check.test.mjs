import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { check } from './check.mjs';

const fixture = (name) => path.join(import.meta.dirname, 'fixtures', name);

test('clean tree has no errors', async () => {
  const { errors } = await check(fixture('clean'));
  assert.deepEqual(errors, []);
});

test('unresolvable wikilink is an error', async () => {
  const { errors } = await check(fixture('broken-wikilink'));
  assert.match(errors.join('\n'), /nope/);
});

test('resolvable wikilink with alias and anchor is fine', async () => {
  const { errors } = await check(fixture('clean'));
  assert.deepEqual(errors, []);
});

test('missing image is an error', async () => {
  const { errors } = await check(fixture('missing-image'));
  assert.match(errors.join('\n'), /ghost\.png/);
});

test('missing chart csv referenced from JSX is an error', async () => {
  const { errors } = await check(fixture('missing-chart-data'));
  assert.match(errors.join('\n'), /nowhere\.csv/);
});

test('unparseable frontmatter is an error', async () => {
  const { errors } = await check(fixture('bad-frontmatter'));
  assert.equal(errors.length, 1);
  assert.match(errors[0], /frontmatter does not parse/);
});

test('missing index.md is an error', async () => {
  const { errors } = await check(fixture('no-index'));
  assert.match(errors.join('\n'), /index\.md/);
});

test('invalid config.json is an error', async () => {
  const { errors } = await check(fixture('bad-config'));
  assert.match(errors.join('\n'), /config\.json/);
});

test('LFS pointer is an error', async () => {
  const { errors } = await check(fixture('lfs-pointer'));
  assert.match(errors.join('\n'), /LFS/);
});

test('obsidian embed resolving by bare filename is not an error', async () => {
  const { errors } = await check(fixture('embeds'));
  assert.doesNotMatch(errors.join('\n'), /Pasted image 001/);
});

test('obsidian embed pointing at nothing is an error', async () => {
  const { errors } = await check(fixture('embeds'));
  assert.match(errors.join('\n'), /missing thing\.png/);
});

test('an embedded asset does not count as orphaned', async () => {
  const { warnings } = await check(fixture('embeds'));
  assert.doesNotMatch(warnings.join('\n'), /Pasted image 001/);
});

test('repo-facing docs are not link-checked', async () => {
  // CLAUDE.md is excluded from the published site, so [[slug]] in its prose is
  // an illustration, not a broken link.
  const { errors } = await check(fixture('skip-files'));
  assert.deepEqual(errors, []);
});

test('a redirect landing on a page that does not exist is an error', async () => {
  // fixtures/without-hot-air has chap01 and chap02; the config redirects chap01
  // (fine) and "gone" (which is not there) - a promise of a page that 404s.
  const { errors } = await check(fixture('redirect-site'));
  assert.match(errors.join('\n'), /redirect \/without-hot-air\/gone points at \/gone/);
  assert.doesNotMatch(errors.join('\n'), /chap01/);
});

test('a sibling page with no redirect only warns', async () => {
  // chap02 has no redirect. That is how a page added after the split looks, so
  // it must not fail the build.
  const { errors, warnings } = await check(fixture('redirect-site'));
  assert.doesNotMatch(errors.join('\n'), /chap02/);
  assert.match(warnings.join('\n'), /no redirect for \/without-hot-air\/chap02/);
});

test('the sibling repo index page needs no redirect', async () => {
  const { errors, warnings } = await check(fixture('redirect-site'));
  assert.doesNotMatch(errors.concat(warnings).join('\n'), /without-hot-air\/index/);
});

test('orphaned asset is a warning, not an error', async () => {
  const { errors, warnings } = await check(fixture('orphan-asset'));
  assert.deepEqual(errors, []);
  assert.match(warnings.join('\n'), /unused\.png/);
});

test('external links are not checked', async () => {
  const { errors } = await check(fixture('clean'));
  assert.deepEqual(errors, []);
});
