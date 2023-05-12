"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../../src");
describe('/videos', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).delete('/__test__/data');
    }));
    it('should return 200 and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/videos')
            .expect(src_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should return 404 for not existing video', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).
            get('/videos/78907').
            expect(src_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it(`should'nt create video with incorrect input data`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/videos/')
            .send({ title: '' })
            .expect(src_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(src_1.app)
            .get('/videos')
            .expect(src_1.HTTP_STATUSES.OK_200, []);
    }));
    let createdVideo1 = null;
    it(`should create video with correct input data`, () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .post('/videos/')
            .send({ title: "P4320" })
            .expect(src_1.HTTP_STATUSES.CREATED_201);
        createdVideo1 = createResponse.body;
        expect(createdVideo1).toEqual({
            id: expect.any(Number),
            title: "P4320"
        });
        yield (0, supertest_1.default)(src_1.app)
            .get('/videos')
            .expect(src_1.HTTP_STATUSES.OK_200, [createdVideo1]);
    }));
    let createdVideo2 = null;
    it(`create one more video `, () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .post(`/videos/`)
            .send({ title: "new lalala 2" })
            .expect(src_1.HTTP_STATUSES.CREATED_201);
        createdVideo2 = createResponse.body;
        expect(createdVideo2).toEqual({
            id: expect.any(Number),
            title: "new lalala 2"
        });
        yield (0, supertest_1.default)(src_1.app)
            .get('/videos')
            .expect(src_1.HTTP_STATUSES.OK_200, [createdVideo1, createdVideo2]);
    }));
    it(`should'nt update video with incorrect input data`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put(`/videos/` + createdVideo1.id)
            .send({ title: "" })
            .expect(src_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(src_1.app)
            .get('/videos' + createdVideo1.id)
            .expect(src_1.HTTP_STATUSES.OK_200, createdVideo1);
    }));
    it(`should'nt update video that not exist`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put(`/videos/` + -22)
            .send({ title: "lalala" })
            .expect(src_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it(`should update video with correct input data`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put(`/videos/` + createdVideo1.id)
            .send({ title: "new lalala" })
            .expect(src_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(src_1.app)
            .get('/videos' + createdVideo1.id)
            .expect(src_1.HTTP_STATUSES.OK_200, Object.assign(Object.assign({}, createdVideo1), { title: "new lalala" }));
        yield (0, supertest_1.default)(src_1.app)
            .get('/videos' + createdVideo2.id)
            .expect(src_1.HTTP_STATUSES.OK_200, createdVideo2);
    }));
    it(`should delete both video`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete(`/videos/` + createdVideo1.id)
            .expect(src_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(src_1.app)
            .get('/videos' + createdVideo1.id)
            .expect(src_1.HTTP_STATUSES.NOT_FOUND_404);
        yield (0, supertest_1.default)(src_1.app)
            .delete(`/videos/` + createdVideo2.id)
            .expect(src_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(src_1.app)
            .get('/videos' + createdVideo2.id)
            .expect(src_1.HTTP_STATUSES.NOT_FOUND_404);
        yield (0, supertest_1.default)(src_1.app)
            .get('/videos')
            .expect(src_1.HTTP_STATUSES.OK_200, []);
    }));
});
//# sourceMappingURL=course.api.test.js.map