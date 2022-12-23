#!/usr/bin/env zx

import "zx/globals";
import swc from "@swc/core";

$`source .env`;

const main = (
  await swc.transform(fs.readFileSync("src/index.ts", "utf-8"), {
    filename: "index.ts",
    sourceMaps: false,
    minify: true,
  })
).code;

const data = {
  branch: "default",
  modules: {
    main,
  },
};

fetch(`http://${process.env.HOST}:${process.env.PORT}/api/user/code`, {
  method: "POST",
  headers: {
    Authorization: `Basic ${Buffer.from(`${process.env.EMAIL}:${process.env.PASSWORD}`).toString("base64")}`,
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(data),
})
  .then((res) => res.text())
  .then((text) => console.log(text))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
