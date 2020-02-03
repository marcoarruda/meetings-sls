#!/bin/bash

export HOSTNAME=db-serverless.cluster-chai0zoj30bj.us-east-1.rds.amazonaws.com
export DATABASE=meetings
export USERNAME=admin
export PASSWORD=db.12345
export LAYERPTH='/opt/nodejs/'

sls deploy --aws-profile $1 --stage $2
