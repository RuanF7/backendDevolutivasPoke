import app from "./app";

const PORT = parseInt(process.env.APP_PORT || "3000", 10);
const HOST = process.env.APP_HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`🚀 HTTP server running at http://${HOST}:${PORT}`);
});
