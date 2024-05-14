# get-users

This script returns the users in a tenant.

## Install dependencies

`yarn`

## Set up env vars

You must set the `API_KEY` environment variable (or in `.env`). This is the read-only directory API key, or can be a root key.

You may optionally set the `TENANT_ID` environment variable to specify the tenant ID.

## Usage

`yarn start` -- list the users in the tenant specified by the `TENANT_ID` variable.

`yarn start <tenant-id>` -- list the users in the tenant ID passed in as the first argument.

The command lists the pages of data it retrieves, and writes a file called `users.json`.

## Getting users

`cat users.json | jq '.[].id'` -- get only the IDs of the users

`cat users.json | jq '.[].id' | uniq | wc -l` -- get the number of unique users
