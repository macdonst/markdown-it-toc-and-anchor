import test from "ava";

import mdIt from "./utils/md-it";

test("markdown-it-toc-and-anchor anchor", t => {
  t.is(
    mdIt(
      `@[toc]
# Heading`,
      {
        anchorLink: true,
        anchorClassName: "anchor",
        anchorLinkSymbol: "",
        anchorLinkSymbolClassName: "octicon octicon-link",
        anchorLinkSpace: false
      }
    ),
    `<p></p>
<h1 id="heading"><a class="anchor" href="#heading">` +
      '<span class="octicon octicon-link"></span></a>Heading</h1>\n',
    "should support GitHub style anchor link"
  );

  t.is(
    mdIt(
      `@[toc]
# `,
      {}
    ),
    `<p></p>
<h1 id=""></h1>
`,
    "should support empty heading"
  );

  t.is(
    mdIt(
      `@[toc]
  # Heading
  `,
      {
        anchorLink: true,
        anchorClassName: null
      }
    ),
    `<p></p>
<h1 id="heading"><a href="#heading">#</a> Heading</h1>
`,
    "should handle not including default class" +
      " in anchors when setting anchorClassName to null"
  );

  t.is(
    mdIt(
      `@[toc]
# test me i'm famous`,
      {
        slugify: string => `/some/prefix/${string.replace(/(\/| |')/g, "_")}`
      }
    ),
    `<p></p>
<h1 id="/some/prefix/test_me_i_m_famous">test me i'm famous</h1>
`,
    "should support custom slugify function from readme"
  );

  t.is(
    mdIt(
      `@[toc]

# Heading`,
      {
        anchorLink: true,
        wrapHeadingTextInAnchor: true
      }
    ),
    /* eslint-disable max-len */
    `<p></p>
<h1 id="heading"><a class="markdownIt-Anchor" href="#heading">Heading</a></h1>\n`,
    /* eslint-enable max-len */
    "should support wrapping heading text in the anchor link"
  );

  t.is(
    mdIt(
      `
# Hello World
`,
      {
        anchorLink: true,
        anchorLinkPrefix: "section-"
      }
    ),
    /* eslint-disable max-len */
    `<h1 id="section-hello-world"><a class="markdownIt-Anchor" href="#section-hello-world">#</a> Hello World</h1>\n`,
    /* eslint-enable max-len */
    "should use prefix"
  );
});
