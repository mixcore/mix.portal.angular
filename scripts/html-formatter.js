// @type-check
const posthtml = require('posthtml');
const sorter = require('posthtml-attrs-sorter');
const beautify = require('js-beautify');
const fs = require('fs');
const argv = require('yargs-parser')(process.argv.slice(2));
const glob = require('glob');
const colors = require('colors');

const attrSortOptions = [
  '\\#\\w+',
  '\\*ngIf',
  '\\*\\w+',
  'class',
  'id',
  'name',
  'data-.+',
  'src',
  'for',
  'type',
  'href',
  'values',
  'title',
  'alt',
  'role',
  'aria-.+',
  '\\[ngClass]',
  '\\[class.[\\w\\-]+\\]',
  '\\[ngStyle]',
  '\\[style.[\\w\\-]+\\]',
  '\\[\\(\\w+\\)\\]',
  '\\[\\w+\\]',
  '\\(\\w+\\)',
  'let-.+',
  '$unknown$'
];
const jsBeautyOptions = {
  indent_size: 2,
  eol: '\r\n',
  wrap_attributes: 'force-aligned',
  end_with_newline: false,
  wrap_line_length: 140
};

function formatHtmlFiles(files) {
  var promises = files.map(file =>
    Promise.resolve().then(() => {
      const text = fs.readFileSync(file, 'utf8');
      let result = posthtml().use(sorter(attrSortOptions)).process(text, { sync: true }).html;
      result = beautify.html(result, jsBeautyOptions);
      result = result.replace(/\=\"\"/gi, '');
      fs.writeFileSync(file, result + '\r\n', 'utf8');
      console.log(colors.gray(`Formatted ${file}`));
    })
  );

  Promise.all(promises).then(() => console.log(colors.green('SUCCESS')));
}

const files = [];

if (argv.staged) {
  files.push(...process.argv.slice(3));
} else {
  // TODO: update the common component postfix.
  files.push(...glob.sync('**/*{component,fragment,layout}.html', { ignore: ['**/node_modules/**'] }));
}

formatHtmlFiles(files);
