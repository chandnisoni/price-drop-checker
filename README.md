# Price Drop Checker

A web tool that helps validating price drops.

## Live Demo

Please view the live running demo here: https://fierce-retreat-18652.herokuapp.com/

Here's a [link to sample CSV](https://raw.githubusercontent.com/chandnisoni/price-drop-checker/master/samples/sample.csv) that can be used with the demo:.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone https://github.com/chandnisoni/price-drop-checker.git # or clone your own fork
$ cd price-drop-checker
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku (Optional)

Make sure you have [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ heroku create
$ git push heroku master
$ heroku open
```

## CSV File Format

Project expects the CSV files to be in following format:

```
merchant,product_id,product_name,product_crawler_url,last_price,current_price,price_drop
```
