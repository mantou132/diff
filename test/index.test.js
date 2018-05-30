var isInclude = require('../index').isInclude;
var diff = require('../index').diff;
var expect = require('chai').expect;
var text_1 = '\n\
1\n\
abc\n\
abcd\n\
0\n\
';
var text_2 = '\n\
2\n\
abc\n\
abcd\n\
8\n\
';

describe('查找最大子串', function() {
  it(`${text_1} AND ${text_2}的最大子串应该是\nabc\nabcd\n`, function() {
    expect(isInclude(text_1, text_2, '\n').same.join('\n')).to.be.equal('abc\nabcd');
  });
  it('查找单行相同子串', function() {
    expect(isInclude('abc', 'abv').same.join('')).to.be.equal('ab');
  });
});
describe('查看修改', function() {
  it(`${text_1} AND ${text_2}的差异应该是\n---1\n+++2\nabc\nabcd\n---0\n+++8`, function() {
    expect(diff(text_1, text_2).join('\n')).to.be.equal('---1\n+++2\nabc\nabcd\n---0\n+++8');
  });
});
