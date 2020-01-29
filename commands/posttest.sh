#!/bin/bash

export NODE_ENV=test

cd layer

npx sequelize db:migrate:undo:all > /dev/null
