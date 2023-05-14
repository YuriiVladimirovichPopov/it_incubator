import  request from "supertest";
import { app } from "../../src/index1";

describe('/videos', () => {
    beforeAll(async() => {
        await request(app).delete('/__test__/data')
    })

    it('should return 200 and empty array', async () => {
        await request(app).get('/videos').expect(200, [])
    })

    it('should return 404 for not existing video', async () => {
            await request(app).get('/videos/78907').expect(404 )
    })
    it(`should'nt create video with incorrect input data`, async () => {
        await request(app)
        .post('/videos/')
        .send({title: ''})
        .expect(400)

        await request(app)
        .get('/videos')
        .expect(200, [])
    })
    let createdVideo: any = null
    it(`should create video with correct input data`, async () => {
        const createResponse = await request(app)
        .post('/videos/')
        .send({title: "P4320"})
        .expect(201)

        createdVideo = createResponse.body;

       expect(createdVideo).toEqual({
        id: expect.any(Number),
        title: "P4320"
       })
       await request(app)
        .get('/videos')
        .expect(200, [createdVideo])
    })
    let createdVideo2: any = null;
    it(`create one more video `, async () => {
        const createResponse =  await request(app)
        .post(`/videos/`)
        .send({title: "new lalala 2"})
        .expect(201)

        createdVideo2 = createResponse.body;

        expect(createdVideo2).toEqual({
            id: expect.any(Number),
            title: "new lalala 2"
           })

           await request(app)
        .get('/videos')
        .expect(200, [createdVideo, createdVideo2])
    })
    it(`should'nt update video with incorrect input data`, async () => {
        await request(app)
        .put(`/videos/` + createdVideo.id)
        .send({title: ""})
        .expect(400)

       await request(app)
        .get('/videos' + createdVideo.id)
        .expect(200, createdVideo)
    })
    it(`should'nt update video that not exist`, async () => {
        await request(app)
        .put(`/videos/` + -22)
        .send({title: "lalala"})
        .expect(204)

    })
    it(`should update video with correct input data`, async () => {
        await request(app)
        .put(`/videos/` + createdVideo.id)
        .send({title: "new lalala"})
        .expect(204)

        await request(app)
        .get('/videos' + createdVideo.id)
        .expect(200, {
            ...createdVideo,
        title: "new lalala"
        })
       
        await request(app)
        .get('/videos' + createdVideo2.id)
        .expect(200, createdVideo2)
        })
    it(`should delete both video`, async () => {
            await request(app)
            .delete(`/videos/` + createdVideo.id)
            .expect(204)
    
            await request(app)
            .get('/videos' + createdVideo.id)
            .expect(404) 

            await request(app)
            .delete(`/videos/` + createdVideo2.id)
            .expect(204)
    
            await request(app)
            .get('/videos' + createdVideo2.id)
            .expect(404)
           
            await request(app)
            .get('/videos')
            .expect(200, [])
            })
    })  
