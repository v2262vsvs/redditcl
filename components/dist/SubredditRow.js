"use strict";
exports.__esModule = true;
var solid_1 = require("@heroicons/react/solid");
var link_1 = require("next/link");
var react_1 = require("react");
var Avatar_1 = require("./Avatar");
function SubredditRow(_a) {
    var id = _a.id, topic = _a.topic, created_at = _a.created_at;
    return (react_1["default"].createElement("div", { className: 'flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b-md' },
        react_1["default"].createElement(solid_1.ChevronUpIcon, { className: 'h-4 w-4 flex-shrink-0 text-gray-400' }),
        react_1["default"].createElement(Avatar_1["default"], { seed: "/subreddit/" + topic }),
        react_1["default"].createElement("p", { className: 'flex-1 truncate' },
            "r/$",
            topic),
        react_1["default"].createElement(link_1["default"], { href: "/subreddit/" + topic },
            react_1["default"].createElement("div", { className: 'cursor-pointer rounded-full bg-blue-500 px-3 text-white' }, " View"))));
}
exports["default"] = SubredditRow;
