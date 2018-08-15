# xdag.io
The website of XDAG, built with [Jekyll](https://jekyllrb.com/docs/home/).

## News Posts guidelines

### Setup
News posts are placed in `_i18n/en/_posts/`. 

The filename must use the following format:
````
YYYY-MM-DD-title.md
````

Where YYYY is the year (4 digits), MM the month (2 digits), DD the day (2 digits), and .md is the file extension representing the format used in the file. The following are examples of valid post filenames:

````
2018-01-31-Our-fresh-new-website.md
2018-02-03-What-tool-to-use-to-make-poll.md
2018-03-07-XDAG-v0.2.0-is-released.md
````

The file must start with the following YAML code:
````
---
layout: post
title: Title of the post
date: "YYYY-MM-DD hh:mm:ss"
---
````
Optional YAML tags:
* `image:` Path to an image file. Displayed with the post link on platforms that support it (Facebook, Twitter, Reddit...). Example format for an internal image: `"/assets/images/posts/community-fund-rewards.jpg"`

### Writing
Markdown is used for rich text formatting, you can find examples [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).