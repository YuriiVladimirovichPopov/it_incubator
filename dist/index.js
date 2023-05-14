"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
const corsMiddleware = (0, cors_1.default)();
exports.app.use(corsMiddleware);
const jsonBodyMiddleware = body_parser_1.default.json();
exports.app.use(jsonBodyMiddleware);
const port = process.env.PORT || 3003;
const today = new Date();
today.setDate(today.getDate() + 1);
const db = {
    videos: [
        {
            "id": 0,
            "title": "string",
            "author": "string",
            "canBeDownloaded": false,
            "minAgeRestriction": null,
            "createdAt": new Date().toISOString(),
            "publicationDate": new Date().toISOString(),
            "availableResolutions": []
        },
        {
            "id": 1,
            "title": "string1",
            "author": "string1",
            "canBeDownloaded": false,
            "minAgeRestriction": null,
            "createdAt": new Date().toISOString(),
            "publicationDate": new Date().toISOString(),
            "availableResolutions": []
        },
    ]
};
exports.app.delete('/testing/all-data', (req, res) => {
    db.videos = [];
    res.sendStatus(204);
});
exports.app.get('/videos', (req, res) => {
    res.status(200).send(db.videos);
});
exports.app.get('/videos/:id', (req, res) => {
    const videoId = +req.params.id;
    const video = db.videos.find(video => video.id === videoId);
    //if (!videoId) { return res.sendStatus(404)}
    return res.status(200).send({ videoId });
});
exports.app.post('/videos', (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    const errors = [];
    if (!title || typeof title !== 'string' && title.trim() || title.length > 40) {
        errors.push({ message: 'error at title', filed: 'title' });
    }
    if (!author || typeof author !== 'string' && author.trim() || author.length > 20) {
        errors.push({ message: 'error at author', filed: 'author' });
    }
    if (Array.isArray(availableResolutions)) {
        const length = availableResolutions.length;
        let resVal = availableResolutions.filter((value) => {
            return availableResolutions.includes(value);
        });
        if (resVal.length < length) {
            errors.push({ message: 'error at resolutions', filed: 'resolutions' });
        }
    }
    if (errors.length > 0)
        return res.status(400).send({ errorsMessages: errors });
    const newVideo = {
        id: +(new Date()),
        title: title,
        author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: today.toISOString(),
        availableResolutions
    };
    db.videos.push(newVideo);
    res.status(201).send(newVideo);
});
exports.app.put('/videos/id', (req, res) => {
    const videoId = +req.params.id;
    const video = db.videos.find(video => video.id === videoId);
    if (!video)
        return res.sendStatus(404);
    video.author = req.body.author;
    video.title = req.body.title;
    video.canBeDownloaded = req.body.canBeDownloaded;
    video.minAgeRestriction = req.body.minAgeRestriction;
    video.publicationDate = req.body.publicationDate;
    video.availableResolutions = req.body.availableResolutions;
    let availableResolutions = video.availableResolutions;
    const errors2 = [];
    if (!video || typeof video.title !== 'string' || video.title.trim() || video.title.length > 40) {
        errors2.push({ message: 'error at title', filed: 'title' });
    }
    if (!video.author || typeof video.author !== 'string' || video.author.length > 20) {
        errors2.push({ message: 'error at author', filed: 'author' });
    }
    if (Array.isArray(video.availableResolutions)) {
        const length = video.availableResolutions.length;
        let resVal = video.availableResolutions.filter((value) => {
            return availableResolutions.includes(value);
        });
        if (resVal.length < length) {
            errors2.push({ message: 'error at resolutions', filed: 'resolutions' });
        }
        if (video.minAgeRestriction !== null && typeof video.minAgeRestriction !== "number") {
            errors2.push({ message: 'error ', filed: 'filed' });
        }
        else if (typeof video.minAgeRestriction === "number") {
            if (+video.minAgeRestriction < 1 || +video.minAgeRestriction > 18) {
                errors2.push({ message: 'error ', filed: 'filed' });
            }
            if (video.publicationDate !== "string") {
                errors2.push({ message: 'error ', filed: 'filed' });
            }
        }
        res.sendStatus(204);
    }
});
exports.app.delete('/videos/id', (req, res) => {
    const videoId = +req.params.id;
    const video = db.videos.find(video => video.id === videoId);
    if (!video)
        return res.sendStatus(404);
    db.videos = db.videos.filter(v => v.id !== videoId);
    return res.sendStatus(204);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map