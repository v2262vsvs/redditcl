"use strict";
exports.__esModule = true;
var client_1 = require("@apollo/client");
var head_1 = require("next/head");
var Feed_1 = require("../components/Feed");
var PostBox_1 = require("../components/PostBox");
var SubredditRow_1 = require("../components/SubredditRow");
var queries_1 = require("../graphql/queries");
var Home = function () {
    var data = client_1.useQuery(queries_1.GET_SUBREDDITS_WITH_LIMIT, {
        variables: {
            limit: 10
        }
    }).data;
    var subreddits = data === null || data === void 0 ? void 0 : data.getSubredditListLimit;
    return (React.createElement("div", { className: "max-w-5xl mx-auto" },
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "Create Next App"),
            React.createElement("link", { rel: "icon", href: "/favicon.ico" })),
        React.createElement(PostBox_1["default"], null),
        React.createElement("div", { className: 'flex mt-5' },
            React.createElement(Feed_1["default"], null),
            React.createElement("div", { className: 'sticky top-36 mx-5  hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline' },
                React.createElement("p", { className: 'text-md mb-1 p-4 pb-3 font-bold' }, "Top Communities"),
                React.createElement("div", null, subreddits && (subreddits === null || subreddits === void 0 ? void 0 : subreddits.map(function (subreddit, i) { return (React.createElement("div", { key: i },
                    React.createElement(SubredditRow_1["default"], { key: subreddit.id, id: subreddit.id, topic: subreddit.topic, created_at: subreddit.created_at }))); })))))));
};
exports["default"] = Home;
