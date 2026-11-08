import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_BASE, normalizeBase, slugify, normalizeStandard,
  buildSiteUrl, isSafePath, extractTitle, decodeEntities,
} from '../lib/core.js'

test('normalizeBase', () => {
  assert.equal(normalizeBase(), DEFAULT_BASE)
  assert.equal(normalizeBase('https://www.mfgabc.com/'), 'https://www.mfgabc.com')
  assert.throws(() => normalizeBase('file:///x'))
})

test('slugify 城市/工艺', () => {
  assert.equal(slugify('Dongguan'), 'dongguan')
  assert.equal(slugify('stamping die'), 'stamping-die')
  assert.equal(slugify('Stamping-Die_2'), 'stamping-die-2')
})

test('normalizeStandard 标准号 → slug', () => {
  assert.equal(normalizeStandard('ISO 4703-1977'), 'ISO-4703-1977')
  assert.equal(normalizeStandard('GB/T 9114-2010'), 'GB-T-9114-2010')
  assert.equal(normalizeStandard(' iso  4703-1977 '), 'ISO-4703-1977')
})

test('isSafePath 拒绝越权路径', () => {
  assert.equal(isSafePath('/standards/'), true)
  assert.equal(isSafePath('/cities/dongguan/'), true)
  for (const bad of ['standards', '/../etc/passwd', '/a//b', '/a b', 'https://evil.com', '']) {
    assert.equal(isSafePath(bad), false, bad)
  }
})

test('buildSiteUrl 拼接并校验', () => {
  assert.equal(buildSiteUrl(DEFAULT_BASE, '/standards/s/ISO-4703-1977/'),
    'https://www.mfgabc.com/standards/s/ISO-4703-1977/')
  assert.throws(() => buildSiteUrl(DEFAULT_BASE, '/../x'))
})

test('extractTitle 与实体解码', () => {
  const html = '<html><head><title> ISO 4703 &amp; 机床夹具 </title></head></html>'
  assert.equal(extractTitle(html), 'ISO 4703 & 机床夹具')
  assert.equal(extractTitle('<html></html>'), '')
  assert.equal(decodeEntities('&lt;a&gt;&quot;x&quot;&nbsp;'), '<a>"x" ')
})
