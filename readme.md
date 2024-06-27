# Three.js Journey

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```
# to go live manually
npm run build
upload all files from dist folder

# to go live with vercel
add vercel to our project
for first time npm i -g vercel 
vercel --version
>> npm install vercel
add to package in scripts => "deploy": "vercel --prod"
>> 
>> choose to connect with github then email
>> tell in which directory in your code located

modify setting to make dist folder 
we will change the output directory [move up and down with arrows and space for select and enter for finish]

then write file dist which have code and done building