var hooks = require("hooks");
var stash = {};

// hook to retrieve session on a login
hooks.after(
  "/sign_in > POST > 200 > application/json; charset=utf-8",
  function (transaction) {
    stash["token"] = JSON.parse(transaction.real.body)["token"];
  }
);

// hook to set the session cookie in all following requests
hooks.beforeEach(function (transaction) {
  if (stash["token"] != undefined) {
    if (transaction.expected.statusCode != "401") {
      transaction.request.headers["Authorization"] = "Bearer " + stash["token"];
    }
  }
});
