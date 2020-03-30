## Put your mind at ease by running a couple of tests locally

Running tests is easy. During dev, until > v0.9.0, the code executes on the local file tree only.

Simply inspect and modify cn12345678 and/or cn12345679 in this test folder, then run the application using those CIIDs to observe the backup, repo push, and find/replace operation without going anywhere near Asset Archive.

The test folder is set up with two fictional CIIDs: ```12345678``` and ```12345679```

The test scripts are both set up to search and modify your local filetree(the one in this repo directory) and save backup files locally and in the github repo within the Test_Backups folder. 
<!-- CIID 12345678 has an /assets/ folder if you want to test the .js asset functionality. -->