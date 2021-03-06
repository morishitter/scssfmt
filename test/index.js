import fs from 'fs'
import test from 'ava'
import postcss from 'postcss'
import scss from 'postcss-scss'
import scssfmt from '../'

const fixture = name => fs.readFileSync(`test/fixtures/${name}.scss`, 'utf-8')
const output = name => fs.readFileSync(`test/fixtures/${name}.out.scss`, 'utf-8')

const compare = name => {
  test(name, t => {
    const res = scssfmt(fixture(name))
    t.is(res, output(name))
  })
}

test('test as a postcss plugin', t => {
  const res = postcss().use(scssfmt.plugin()).process(fixture('rule'), {syntax: scss}).css
  t.is(res, output('rule'))
})

compare('selector')
compare('semicolon')
compare('rule')
compare('atrule')
compare('comments')

compare('nested')
compare('if-else')
compare('for')
compare('variables')
compare('import')
compare('mixins')
compare('extend')
compare('function')
compare('operators')
compare('one-linear-rule')
compare('important')
