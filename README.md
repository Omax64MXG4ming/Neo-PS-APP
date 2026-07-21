# Open Source GDPS BOT

## Installation 

for bot hosting is Necessary a GitHub Account for this script files
and [FORK HERE MY REPO](https://github.com/Omax64MXG4ming/Neo-PS-APP/fork),
or nothave two options, Discord or GitHub 
## How Host (Safe Token)

web here: https://bot-hosting.net/login

1
<img width="1080" height="1536" alt="53293" src="https://github.com/user-attachments/assets/62e54c30-8609-4954-98b9-55a17ec9c75b" />
2
<img width="1080" height="1468" alt="53295" src="https://github.com/user-attachments/assets/a51d1776-5020-4ab8-a224-dedbd0fd7024" />
3
<img width="1080" height="2400" alt="53297" src="https://github.com/user-attachments/assets/de085b44-04bd-4427-b2a7-6aa4975c46cf" />

and Click on Launch Development 
Note: Don't Run the Bot Yet , Wait, and Read Slowy.

4 : Go to Files and Open the 3 Lines, is A Copy of Files From the Repo, Files in Cloud for Safety reasons.
<img width="1080" height="1236" alt="53300" src="https://github.com/user-attachments/assets/ea7ec186-8cc7-4bef-af62-4cb33051cc7e" />
5: enter in `.env` and Configure it the
```
BOT_TOKEN=
```

Afther Save Is Automatically, enter in ``setup.json``
and configure it :

you have this

``

    "prefix": "/",
      
      "host": "https://mygdps",
      
      "owner": "discordIDuser",
      
      "moderator": "aCustomroleID for Mod",
      
      "statusbot": "online",
      
      "actionbot": "Playing Neo PS",
      
      "gdpsup": {
      
            "gdps": true,
            
            "directory": "gdpsup",
            
            "turn": "Off"
            
      },
      
      "channel": {
      
      "gdpsstatus": "1516253429402697758",
      
      "ratestatus": "disabled/leave blank this or put 0"
      
      }

``
Perfix "/" Is For Slash Response | Don't Change it.

host: your https://fhgdps.com/ (directly | other host)
, is dbpath /database/ or
/db/ put it when : https://mygdps.com/db/ mygdps.com/database/
etc

IS NECESSARY https:// 

## Startup

1: Follow IMG
<img width="1080" height="2046" alt="53302" src="https://github.com/user-attachments/assets/e5f07aaa-5f00-4a5e-90dd-62686d21b3ca" />



Version: 24 (L)

Entry File : 
```
index.js
```


and Start Command : 
```
npm install && node . ide-mode
```

## Env Section 

Add With the Name an Environment Variables
```
BOT_TOKEN
```
AND THE TOKEN


### Note 

If the bot is running, turn it off, but don't click "kill" because it will interrupt the .npm install process and delete necessary files. Click "stop," or do nothing else, although the bot might still freeze. On Discord, but since the command always runs `npm install`, use them, but with caution; it's more advisable to use `stop` or `restart`.


## Packages 

In Packages section
go in Add package writing the name of the next Dependencies,
and Select the Version Writed here
<img width="1080" height="1116" alt="53304" src="https://github.com/user-attachments/assets/9a444441-025f-4ca0-92f3-aee72294e847" />

Although the host already provides what needs to be installed, that's why the `npm install` command is there for that purpose; otherwise, what could the bot use? It wouldn't work.



Dependencies

```
discord.js
```

`^14.27.0`


```
dotenv
```

`^16.6.1`


```
express
```

`^4.22.2`

## SFTP

Less important here, but it's up to you if you want to work on this more quickly and how, using your FTP file manager. 

<img width="1080" height="1328" alt="53306" src="https://github.com/user-attachments/assets/b9d14c08-93cb-4cf8-9192-3be916db7c28" />

## Informative Note

If you're going to save everything in the repo, I recommend downloading the .zip file from this repo and modifying it right away, or if you're going to make it private, then you'll have to upload the files there.
