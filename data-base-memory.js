import { randomUUID } from "node:crypto";

export class DataBaseMemory {
  #videos = new Map();

  list(search) {
    return Array.from(this.#videos.entries())
      .map((videoMap) => {
        const id = videoMap[0];
        const data = videoMap[1];

        return {
          id,
          ...data
        }
      })
      .filter(video => {

        if (search) {
          return video.title.includes(search)
        }

        return true;

      });
  }

  create(video) {
    const videoId = randomUUID();
    this.#videos.set(videoId, video);
  }

  update(id, video) {
    console.log(id);
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}
