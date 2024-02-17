import { fastify } from "fastify";
import { DataBasePostgres } from "./data-base-postgres.js";

const server = fastify();
const db = new DataBasePostgres();

server.get("/videos", async (req, res) => {

  const search = req.query.search


  const videos = await db.list(search);
  return videos;

});

server.post("/videos", async (req, res) => {

  const { title, description, duration } = req.body;

  await db.create({
    title,
    description,
    duration
  });


  return res.status(201).send();


});

server.put("/videos/:id", async (req, res) => {

  const videoId = req.params.id;


  const { title, description, duration } = req.body;

  await db.update(videoId, {
    title,
    description,
    duration
  });

  return res.status(204).send();

});

server.delete("/videos/:id", async (req, res) => {

  const videoId = req.params.id;

  await db.delete(videoId);

  return res.status(203).send();
});

server.listen(
  {
    host: '0.0.0.0',
    port: process.env.PORT ?? 3033
  });
