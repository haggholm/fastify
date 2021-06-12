import tap from "tap";
const test = tap.test;
import { mergeDeepObjectParam } from "../lib/paramUtil.js";


test("deepObject parameters are correctly extracted", (t) => {
  t.plan(1);
  const ob = {
    "foo[1][2]": 1,
    "bar[baz][3]": 2,
  };
  mergeDeepObjectParam(ob, "foo");
  t.same(
    ob,
    { "foo": { "1": { "2": 1 } }, "bar[baz][3]": 2 },
    "deepObject parameters are extracted"
  );
});
