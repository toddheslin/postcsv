# What is it
This is a CLI tool for reading a CSV file and making a POST request for each row to the URL you provide.

# Why?
I'm using this to take Facebook Lead Ads data and piping it into a [Stitch](https://stitchdata.com) webhook. This is solving my problem of getting historical leads into our data warehouse using the same schema as our real-time webhooks, which also use Stitch.

# Installation
`$ npm install -g postcsv`

# Usage
`postcsv --csv <path to file> --url <full url to POST to>`

You can optionally add the `--rps` flag if you need to limit the number of requests per second. i.e. if you only want to send 1 request (row of your CSV) to the URL each second, provide `--rps 1`. You can also use floats, e.g. `--rps 0.2` will send one request every 5 seconds.

You could also use the short args as follows:
`postcsv -i <path to file> -o <full url to POST to> -r <rps>`

# Todo

- [ ] handle non 200 responses by trying again
- [ ] allow for further customisation of the base request (e.g. other HTTP methods, headers, auth) by accepting args and passing them into the axios request factory
- [ ] JSON keys mapping input - by default the first row of the CSV are headers, such headers could be replaced using a JSON mapping file
- [ ] handle all the types of CSVs needed