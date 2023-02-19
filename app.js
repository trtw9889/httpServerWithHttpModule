const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 2,
  },
];

const http = require("http");
const server = http.createServer();

const httpRequestListener = function (request, response) {
  const { url, method } = request;
  if (method === "POST") {
    if (url === "/join") {
      let body = " ";
      request.on("data", (data) => {
        body += data;
      });
      request.on("end", () => {
        const user = JSON.parse(body);
        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });
        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "userCreated" }));
      });
    }
  }
  if (method === "POST") {
    if (url === "/write") {
      let postBody = " ";
      request.on("data", (postData) => {
        postBody += postData;
      });
      request.on("end", () => {
        const post = JSON.parse(postBody);
        posts.push({
          id: post.id,
          title: post.title,
          content: post.content,
          userId: post.userId,
        });
        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "postCreated" }));
      });
    }
  }

  if (method === "GET") {
    if (url === "/check") {
      let body = " ";

      request.on("data", (data) => {
        body += data;
      });

      const check = posts.map((post) => {
        //map을 돌릴때는 받아올 데이터가 없어서 쓰면 오타가 나는 듯...(request.on("end")가)
        for (let i = 0; i < users.length; i++) {
          if (post.userId === users[i].id) {
            return {
              userId: post.userId,
              userName: users[i].name,
              postingId: post.id,
              postingTitle: post.title,
              postingContent: post.content,
            };
          }
        }
      });

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ data: check }));
    }
  }
};
server.on("request", httpRequestListener);

server.listen(8000, "127.0.0.1", function () {
  console.log("Success!");
});
