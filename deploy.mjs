#!/usr/bin/env zx

import 'zx/globals';

fs.existsSync('dist/index.js') || (await $`yarn build`);

const data = {
  branch: 'default',
  modules: {
    main: fs.readFileSync(`${__dirname}/dist/index.js`, 'utf-8'),
  },
};

fetch(`http://${process.env.HOST}:${process.env.PORT}/api/user/code`, {
  method: 'POST',
  headers: {
    Authorization: `Basic ${Buffer.from(`${process.env.EMAIL}:${process.env.PASSWD}`).toString('base64')}`,
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(data),
})
  .then((res) => res.text())
  .then((text) => console.log(text))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
