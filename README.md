# xdag.io
The website of XDAG

## News Directory structure -- '_posts'
As explained on the directory structure page, the _posts folder is where your blog posts will live. These files are generally Markdown or HTML, but can be other formats with the proper converter installed. All posts must have YAML Front Matter, and they will be converted from their source format into an HTML page that is part of your static site.

### Creating Post FilesPermalink
To create a new post, all you need to do is create a file in the _posts directory. How you name files in this folder is important. Jekyll requires blog post files to be named according to the following format:
````
YEAR-MONTH-DAY-title.MARKUP
````

Where YEAR is a four-digit number, MONTH and DAY are both two-digit numbers, and MARKUP is the file extension representing the format used in the file. For example, the following are examples of valid post filenames:

````
├── _posts
|   ├── 2018-01-31-Our-fresh-new-website.md
|   └── 2018-02-03-What-tool-to-use-to-make-poll.md
|   └── 2018-03-07-XDag-v0.2.0-is-released.md

````


### Including images and resourcesPermalink

Including an image asset in a post:
````
![My helpful screenshot]({{ "/assets/screenshot.jpg" | absolute_url }})
````

Linking to a PDF for readers to download:
````
... you can [get the PDF]({{ "/assets/mydoc.pdf" | absolute_url }}) directly.
````