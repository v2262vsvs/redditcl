"use strict";
exports.__esModule = true;
var client_1 = require("@apollo/client");
var react_1 = require("react");
var queries_1 = require("../graphql/queries");
var Post_1 = require("./Post");
function Feed(_a) {
    var topic = _a.topic;
    var _b = !topic ? client_1.useQuery(queries_1.GET_ALL_POSTS) : client_1.useQuery(queries_1.GET_ALL_POSTS_BY_TOPIC, {
        variables: {
            topic: topic
        }
    }), data = _b.data, error = _b.error;
    var posts = !topic ? data === null || data === void 0 ? void 0 : data.getPostList : data === null || data === void 0 ? void 0 : data.getPostListByTopic;
    return (react_1["default"].createElement("div", { className: 'space-y-1 w-full' }, posts === null || posts === void 0 ? void 0 : posts.map(function (post) { return (react_1["default"].createElement(Post_1["default"], { key: post.id, post: post })); })));
}
exports["default"] = Feed;
