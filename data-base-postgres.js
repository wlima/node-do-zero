import sql from "./db.js";

export class DataBasePostgres {

  async list(search) {
    return await sql`select * from videos ${search ? sql`where title ilike ${'%' + search + '%'}` : sql``}`;
  }


  // async list(search) {
  //   let videos;


  //   if (search) {
  //     videos = await sql`select * from videos where title ilike %${search}%`;

  //   } else {
  //     videos = await sql`select * from videos`;
  //   }

  //   return videos

  // }

  async create(video) {
    let { title, description, duration } = video

    await sql`insert into videos (title, description, duration)
    VALUES(${title}, ${description}, ${duration})`;

  }

  async update(id, video) {
    let { title, description, duration } = video
    await sql`UPDATE videos
          SET 
            title = ${title},
            description = ${description},
            duration =${duration}
          WHERE
            id=${id};`;

  }

  async delete(id) {
    await sql`DELETE FROM videos          
          WHERE
            id=${id};`;

  }
}
