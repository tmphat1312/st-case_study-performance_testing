import http from "k6/http";
import { sleep, check } from "k6";

const user = JSON.parse(open("./user.json"));

export function setup() {
  const res = http.post("http://sharebug.com/login", JSON.stringify(user), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  check(res, {
    "Logged In": (r) => r.status === 200,
  });

  const cookiesForURL = http.cookieJar().cookiesForURL(res.url);

  return {
    cookie: cookiesForURL["connect.sid"][0],
  };
}

export default function (data) {
  const res = http.get(`http://sharebug.com/administration/export`, {
    headers: {
      Cookie: `connect.sid=${data.cookie}`,
    },
  });

  check(res, {
    "Export users: response status was 200": (r) => r.status == 200,
  });

  // Sleep for 1 second to simulate real-world usage
  sleep(1);
}
