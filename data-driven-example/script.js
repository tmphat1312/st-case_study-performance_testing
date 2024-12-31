import { SharedArray } from "k6/data";
import { sleep } from "k6";

// Load data from JSON file
const data = new SharedArray("users", () => {
  const f = JSON.parse(open("./users.json"));
  return f;
});

// Perform a simple operation on the data
export default () => {
  const randomUser = data[Math.floor(Math.random() * data.length)];
  console.log(`${randomUser.username}, ${randomUser.password}`);
  sleep(3);
};
