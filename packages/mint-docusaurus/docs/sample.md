---
id: sample
title: Sample document
---

export const Highlight = ({children, color}) => (<span style={{
    backgroundColor: color,
    borderRadius: '2px',
    color: '#fff',
    padding: '0.2rem',
}}>{children}</span>);

You can write JSX and use React components within your Markdown thanks to [MDX](https://mdxjs.com/).

<Highlight color="#25c2a0">Docusaurus green</Highlight> and <Highlight color="#1877F2">Facebook blue</Highlight> are my favorite colors.

I can write **Markdown** alongside my _JSX_!

## Links

[I'm an inline-style link with title](https://www.google.com/ "Google's Homepage")

[I'm a reference-style link][arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links. http://www.example.com/ or <http://www.example.com/> and sometimes example.com (but not on GitHub, for example).

[arbitrary case-insensitive reference text]: https://www.mozilla.org/
[1]: http://slashdot.org/
[link text itself]: http://www.reddit.com/

---

## Images

Inline-style: ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1')

Reference-style: ![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 2'

Images from any folder can be used by providing path to file. Path should be relative to markdown file.

![img](../static/img/logo.png)

---

## Code

```javascript
var s = 'JavaScript syntax highlighting';
alert(s);
```

```python
s = "Python syntax highlighting"
print(s)
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

```js {2}
function highlightMe() {
  console.log('This line can be highlighted!');
}
```

---

## Tables

Colons can be used to align columns.

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

There must be at least 3 dashes separating each header cell. The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

---

## Blockquotes

> Blockquotes are very handy in email to emulate reply text. This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.

---

## Inline HTML

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

---

## Line Breaks

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also a separate paragraph, but... This line is only separated by a single newline, so it's a separate line in the _same paragraph_.

---

## Admonitions

:::note

This is a note

:::

:::tip

This is a tip

:::

:::important

This is important

:::

:::caution

This is a caution

:::

:::warning

This is a warning

:::
