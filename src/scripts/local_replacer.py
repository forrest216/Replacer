# take in a brand & list of ciids from user and replace one string with another - all files open as text file
from datetime import datetime
from git import Repo
import json
import time
import sys
import re

# -------- auto-install GitPython if not detected ---------
# try:
#     from git import Repo
# except ModuleNotFoundError:
#     import subprocess
#     import pkg_resources
#     print('GitPython not installed, installing now')
#     
#     from git import Repo
# ------------------------------------------------------

# stdout colors
class bcolors:
    BLUE = 'BL: '
    GREEN = 'GR: '
    CYAN = 'CY: '
    WARNING = 'WR: '
    END = 'WH: '


# data from electron
args = sys.argv[1]
payload = json.loads(args)

print(f'{bcolors.END}In local_replacer.py')
print(f'{bcolors.END}Incoming data: {payload}')

# get username from json input
sysuser = payload['username']
print(f'{bcolors.END}SYSUSER: {sysuser}')

# get brand from json input
brand = payload['brandId']

# get ciid list from json input
ciid_list = payload['ciidArray']

# text to be replaced
replace_this = payload['replaceThis']

# text to put in its place
with_this = payload['withThis']

# replace first instance only (True/False)?
replace_one = payload['firstOnly']


# verify validity of replace_one
assert replace_one == True or replace_one == False

# count files operated on
file_count = 0
# count total replacements made during script execution
replacement_count = 0
# list of relative refs to backup files
file_list = []

# setup for git access and user branching
repo_dir = 'Test_Backups'
repo = Repo(repo_dir, search_parent_directories=True)
git = repo.git

# checkout to branch named same as sysuser, creating if not present
if repo.active_branch.name != sysuser:
    print(f'{bcolors.WARNING}Not in user branch, attempting switch')
    try:
        git.checkout(sysuser)
        print(f'{bcolors.END}Switched to branch {sysuser}')
    except:
        print(f'{bcolors.END}Checkout to branch {sysuser} failed, attempting new branch')
        git.branch(sysuser)
        print(f'{bcolors.END}Created branch {sysuser}')
        git.checkout(sysuser)
        print(f'{bcolors.END}Switched to branch {sysuser}')

print(f'{bcolors.BLUE}Commencing backup of CIIDs {ciid_list}')
# create backup files locally and then push them to this github repo before modifying them
for ciid in ciid_list:

    padded_ciid = ciid.zfill(10)
    # build path to local test file
    data_path = f'./src/testFiles/{brand}Web/content/{padded_ciid[:4]}/{padded_ciid[4:7]}/{padded_ciid[7:]}/cn{ciid}.html'
    print(f"{bcolors.END}data_path: {data_path}")
    # build path at which to backup current file
    backup_path = f'Test_Backups/{sysuser}:{datetime.today().strftime("%m-%d-%y-%H:%M:%S")}--{brand}-cn{ciid}.html'
    print(f"{bcolors.END}backup_path: {backup_path}")
    # add file path to list
    file_list.append(backup_path)
    print(f'{bcolors.END}backup path appended to git file list')

    print(f'{bcolors.END}creating backup file')
    # create backup file from original before find&replace
    with open(data_path, 'r') as f:
        backup_data = f.read()
    print(f'{bcolors.END}read from file complete')
    with open(backup_path, 'w') as f:
        f.write(backup_data)
    print(f'{bcolors.END}write to backup complete')

print(f'{bcolors.END}building commit')
# commit and push to repo - you will have file backed up locally and in the repo
commit_message = f'Add backup files - replacing "{replace_this}" with "{with_this}" by {sysuser} at {datetime.today().strftime("%m-%d-%H:%M")}'
print(f'{bcolors.END}commit_message: {commit_message}')
repo.index.add(file_list)
print(f'{bcolors.END}file list added to git index')
repo.index.commit(commit_message)
print(f'{bcolors.END}commit message added')
origin = repo.remote('origin')
print(f'{bcolors.WARNING}pushing to repo')
# push to user specific branch using git refspec
origin.push(f'refs/heads/{sysuser}:refs/heads/{sysuser}')

print(f'{bcolors.WARNING}Backup complete for all files')
print('')
print('')


# ###### Begin find and replace #######


print(f'{bcolors.WARNING}Replacing instances of "{replace_this}" with "{with_this}"')
# for each ciid user inputs, parse file to find text stored in 'replace_this' and replace with text stored in 'with_this'
for ciid in ciid_list:
    # front-pad ciid with zeros to match 10-digit AssetArchive format
    padded_ciid = ciid.zfill(10)

    # build path to file out of brand and padded ciid
    path = f'./src/testFiles/{brand}Web/content/{padded_ciid[:4]}/{padded_ciid[4:7]}/{padded_ciid[7:]}/cn{ciid}.html'
    
    # what's going on in here?
    if replace_one == True:
        print(f'{bcolors.END}Replacing first instance of {replace_this} for CIID {ciid}')
    else:
        print(f'{bcolors.END}Replacing all instances of {replace_this} for CIID {ciid}')
    
    # counter for instances of 'replace_this'
    instances = 0

    with open(path, 'r') as f:
        filedata = f.read()
        print(f'{bcolors.END}filedata read in')

    instance_count = filedata.count(replace_this)
    instances += instance_count

    if instance_count == 0:
        # notify if no instances found in file
        print(f'{bcolors.WARNING}No instances of {replace_this} found in file {ciid}')
    
    # replace first/all occurences of replace_this
    if replace_one == True:
        filedata = filedata.replace(replace_this, with_this, 1)
        instances = 1
    else:
        filedata = filedata.replace(replace_this, with_this)

    with open(path, 'w') as f:
        f.write(filedata)

    # add replace_this instances for current CIID to execution total
    replacement_count += instances
    file_count += 1
    # print total number of instances found in ciid file and linked js files
    print(f'{bcolors.GREEN}Instances replaced for this file: **{instances}**')
    print('')

    #### END CIID "for" loop ####


# print total replacements across all CIIDs input
print(f'{bcolors.GREEN}Total instances replaced across *{file_count}* files: -{replacement_count}-')