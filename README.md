# Replacer

## Summary:
This application will run a simple find and replace for a given brand/list of CIIDs.<br> It can take in an unlimited number of CIIDs as either a space-separated list or as a cut-and-paste from a spreadsheet<br>
***All files are backed up to this repo before any of them are modified.***<br>

-FS

<img src="https://i.imgur.com/WvIQI1Dl.png" width="435"></img>
<img src="https://i.imgur.com/Xm77xVIl.png" width="435"></img>

***

## Use Cases:
You have identified an issue in your code that exists across dozens or even hundreds of pages within Asset Archive and needs updating. It will take you hours to go through all of those pages! It would be a lot easier to edit all of that code if you could do it all at once in a few minutes, wouldn't it? Here are some real world use cases:
***
### Update asset references / urls:
replace this:
```
/assets/common/clear.gif
```
with this:
```
/Asset_Archive/AllBrands/assets/clear.gif
```
***
### Update element ids:
replace this:
```
id="wcd-lcb-customerserv"
```

with this:
```
id="wcd-mfe-customerserv"
```
***
### Adding style rules to the end of the first tag using multiline string formatting with the "first instance only" option selected:
Replace this:
```
</style>
```

With this:
```
    .mktSticker, .promoDrawer__bottomContainer {display: none;}
</style>
```
***
### Adding script/style references:
Replace this:
```
<link rel="stylesheet" type="text/css" href="/Asset_Archive/ONWeb/content/0018/361/000/assets/sizeChart.css">
```

With this:
```
<link rel="stylesheet" type="text/css" href="/Asset_Archive/ONWeb/content/0018/361/000/assets/sizeChart.css">
<link rel="stylesheet" type="text/css" href="/Asset_Archive/ONWeb/content/0018/361/000/assets/anotherSizeChart.css">
```
***
### Or even just deleting problem code:
Replace this:
```
<code.that=you/are % absolutely ^ sure & isn't\needed*anymore-in_these$files & it+has=got/to\go_now ^ because >> it | is << marshing & my ! mallow>
```

With this:
```
''
```
***
### ,etc. <br>
### Basically any find and replace. Use discretion and test it first. You are a programmer.

***

# Usage:
## Setup:
### Open a terminal and check that you are using [Python 3.x +](https://realpython.com/installing-python/#macos-mac-os-x) (required):
```
$ python3
```

### Clone this repo to your machine:
``` 
$ git clone https://github.gapinc.com/wcd/Asset_Archive-Find-and-Replace.git
```

### cd into the repo folder:
```
$ cd Asset_Archive-Find-and-Replace
```

### Install the GitPython package:
```
$ pip install gitpython
```


### Install the program:
```
$ npm i
```

### Run the program:
```
$ npm start
```

Included is a set of test files/folders if you care to test and tinker. They are located in a folder named "testFiles".<br>
More about testing [here](https://github.gapinc.com/wcd/Asset_Archive-Find-and-Replace/tree/master/src/testFiles)

## Using the program:

First and most importantly, please run a live test on a single CIID to make sure you are set up properly and that your intended replace operation doesn't break anything. Enter the CIID that has the code you wish to replace and observe the changes made to the Asset_Archive file to be sure the script:
1. Backs up the file to your Repo branch(this is handled automatically)
2. Replaces something
3. That thing is what you had intended
4. It does not replace anything that you **don't** want replaced.
5. Consider [diffing](https://www.diffchecker.com/) the file against the [backup]() to see *all* of the changes that are made.

If you run into problems with #3 & 4 here, consider being more specific or including whitespace. These are strings we are dealing with here.

## **Important note about your system username:**
If for some reason the username on your machine is "master", you should just stop now and forget about all of this.

## Let's run the script already!

Hit the button.

Here is what will happen:
 
1. Replacer checks out to/creates a new branch with your system's username

2. For each CIID entered, the script finds the file in Asset Archive, then:
  * Creates a backup of the file to be modified in a local /Backups folder
  * Pushes all of the username and time stamped CIID files to this github repo under your branch, as a second, public backup
  * Parses file and replaces what you have entered in the "Replace this:" field with the characters in the "With this:" field if found.
  * Counts instances replaced in each file, and in total during script execution across all CIIDs
3. Prints these figures to the app's home screen and in greater detail in the log.


### That's it! Congratulations, you probably just did hours worth of find-and-replace work in minutes!

### A note about searching previously changed files in the repo:
To find a backup file for a CIID that has been changed at any point using this tool, search all branches using git's log command with globbing:
```
git log --all '**cn12345678.html'
```
From the most recent result you should be able to view the branch on which changes were last made. Search the repo for that branch on the repo's web page to see more details.

### A note about page dependencies:
(Coming in 1.0)
This script was originally written to search for ancillary .js files and find/replace in those as well. This was included while updating CS pages, which load subtopic content from an /assets/ folder in the same directory as the CIID file. It only does this if it finds a JS variable named "var jsAssetPath" in the file. If this is functionality that is useful to you, a script with this functionality included is at find_replace_with_assets.py. Read about testing it [here](https://github.gapinc.com/wcd/Asset_Archive-Find-and-Replace/tree/master/testFolder). WILL GO LIVE SOON PENDING UPDATE - FS

### Planned updates:
* Rewrite replacement script in node
* Append/Prepend to file
* .dmg
* Regex matching (Is this a terrible idea? Maybe.)
* Append log from every run to a log file
* Count only (no modification or backup)

### 