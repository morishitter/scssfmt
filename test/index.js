import fs from 'fs'
import test from 'ava'
import postcss from 'postcss'
import scss from 'postcss-scss'
import tidify from '../'

const fixture = name => fs.readFileSync(`test/fixtures/${name}.css`, 'utf-8')
const output = name => fs.readFileSync(`test/fixtures/${name}.out.css`, 'utf-8')

const compare = name => {
  test(name, t => {
    const res = postcss().use(tidify()).process(fixture(name), {syntax: scss}).css
    t.is(res, output(name))
  })
}

compare('selector')
compare('semicolon')
compare('rule')
compare('atrule')
compare('comments')

compare('scss-nested')
compare('scss-if-else')
compare('scss-for')
compare('scss-variables')
compare('scss-import')
