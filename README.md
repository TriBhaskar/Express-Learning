Changes to do for creating ts express server

PS D:\Techincal Study Notes\Learn node express\Express backend learning> npm init -y
Wrote to D:\Techincal Study Notes\Learn node express\Express backend learning\package.json:

{
"name": "express-backend-learning",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [],
"author": "",
"license": "ISC"
}

PS D:\Techincal Study Notes\Learn node express\Express backend learning> npm i express

added 64 packages, and audited 65 packages in 6s

12 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
PS D:\Techincal Study Notes\Learn node express\Express backend learning> npm i -D typescript

added 1 package, and audited 66 packages in 1s

12 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
PS D:\Techincal Study Notes\Learn node express\Express backend learning> npm i -D @types/express

added 12 packages, and audited 78 packages in 6s

12 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
PS D:\Techincal Study Notes\Learn node express\Express backend learning> npx tsc --init

Created a new tsconfig.json with:  
 TS
target: es2016
module: commonjs
strict: true
esModuleInterop: true
skipLibCheck: true
forceConsistentCasingInFileNames: true

You can learn more at https://aka.ms/tsconfig

DO changes in tsconfig.json file for your setup

PS D:\Techincal Study Notes\Learn node express\Express backend learning> npx tsc --build
PS D:\Techincal Study Notes\Learn node express\Express backend learning> npm i -D nodemon

added 29 packages, and audited 107 packages in 4s

16 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
PS D:\Techincal Study Notes\Learn node express\Express backend learning> npm i -D ts-node

added 17 packages, and audited 124 packages in 7s

16 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
PS D:\Techincal Study Notes\Learn node express\Express backend learning> npm run dev

> express-backend-learning@1.0.0 dev
> nodemon ./src/index.ts

[nodemon] 3.1.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): _._
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node ./src/index.ts`
[nodemon] clean exit - waiting for changes before restart
