# Northcoders News API

To run this project, the following enviromental variables needs to be created -
1. create a file .env.development and add PGDATABASE=nc_news to the file.
2. create a file .env.test and add PGDATABASE=nc_news_test to the file. 
3. run npm install

Here is the link to the hosted version of the project https://nc-news-bp.onrender.com.

The project consists of data with four table - articles, comments, topics and users. The Api's can be used to get data from the tables. 

To replicate this project please follow the steps below - 

1. clone the github repository. 
2. create an empty repository on github and change the url of this repository to the cloned repository from step 1. 
git remote set-url origin YOUR_NEW_REPO_URL_HERE
git branch -M main
git push -u origin main
3. create two .env files for the project and name it .env.test and .env.development. In each file add PGDATABASE=, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.
4. Run npm install at this point.
5. to seed the local database run npm seed and run tests (using npm t)
6. The minimum version required for this project to run is Node.js 18 and Postgres 13.