#!/bin/bash

export NODE_ENV=test

cd layer

npx sequelize db:create > /dev/null
npx sequelize db:migrate:undo:all > /dev/null
npx sequelize db:migrate > /dev/null
npx sequelize db:seed:all > /dev/null
