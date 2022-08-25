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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var outline_1 = require("@heroicons/react/outline");
var react_1 = require("react");
var Avatar_1 = require("./Avatar");
var react_timeago_1 = require("react-timeago");
var image_1 = require("next/image");
var outline_2 = require("@heroicons/react/outline");
var link_1 = require("next/link");
var loaders_1 = require("@uiball/loaders");
var react_2 = require("next-auth/react");
var react_toastify_1 = require("react-toastify");
var client_1 = require("@apollo/client");
var mutations_1 = require("../graphql/mutations");
var queries_1 = require("../graphql/queries");
function Post(_a) {
    var _this = this;
    var post = _a.post;
    if (!post) {
        return (react_1["default"].createElement("div", { className: 'w-full items-center flex justify-center p-10 text-xl ' },
            react_1["default"].createElement(loaders_1.Jelly, { size: 35, color: "#231F20" })));
    }
    var session = react_2.useSession().data;
    var _b = react_1.useState(), vote = _b[0], setVote = _b[1];
    var data = client_1.useQuery(queries_1.GET_ALL_VOTES_BY_POST_ID, {
        variables: {
            id: post === null || post === void 0 ? void 0 : post.id
        }
    }).data;
    var addVote = client_1.useMutation(mutations_1.ADD_VOTE, {
        refetchQueries: [queries_1.GET_ALL_VOTES_BY_POST_ID, 'getVoteUsingPost_id']
    })[0];
    var upVote = function (isUpvote) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!session) {
                        react_toastify_1.toast("You will need to sign in yo Vote!");
                        return [2 /*return*/];
                    }
                    //if(vote && isUpvote)return;
                    //if( vote === false && isUpvote) return;
                    //if (vote === false || vote ===true)return;
                    { /* console.log('deleting vote',!isUpvote)
                     await deleteVote({
                     variables:{
                         post_id:post.id,
                     }
                     })
                 */
                    }
                    console.log('voting', isUpvote);
                    return [4 /*yield*/, addVote({
                            variables: {
                                post_id: post.id,
                                username: (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.name,
                                upvote: isUpvote
                            }
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var displayVotes = function (data) {
        var _a;
        var votes = data === null || data === void 0 ? void 0 : data.getVoteUsingPost_id;
        if (votes != undefined) {
            if (votes.length === 0)
                return 0;
            var displayNumber = votes === null || votes === void 0 ? void 0 : votes.reduce(function (total, vote) { return (vote.upvote ? (total += 1) : (total -= 1)); }, 0);
            if (displayNumber === 0) {
                return ((_a = votes[0]) === null || _a === void 0 ? void 0 : _a.upvote) ? 1 : -1;
            }
            return displayNumber;
        }
        else {
            return 0;
        }
    };
    react_1.useEffect(function () {
        var _a;
        var votes = data === null || data === void 0 ? void 0 : data.getVoteUsingPost_id;
        var vote2 = (_a = votes === null || votes === void 0 ? void 0 : votes.find(function (vote) { var _a; return vote.username == ((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.name); })) === null || _a === void 0 ? void 0 : _a.upvote;
        console.log(vote2);
        setVote(vote2);
    }, [data]);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(link_1["default"], { href: "/post/" + post.id },
            react_1["default"].createElement("div", { className: '  flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600 ' },
                react_1["default"].createElement("div", { className: 'flex flex-col items-center justify-start  space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400' },
                    react_1["default"].createElement(outline_1.ArrowUpIcon, { onClick: function () { return upVote(true); }, className: "voteButtons hover:text-blue-400 " + (vote && 'text-blue-400 ') }),
                    react_1["default"].createElement("p", { className: 'text-xs font-bold text-black ' }, displayVotes(data)),
                    react_1["default"].createElement(outline_1.ArrowDownIcon, { onClick: function () { return upVote(false); }, className: "voteButtons hover:text-red-400 " + (vote === false && 'text-red-400 ') })),
                react_1["default"].createElement("div", { className: 'p-3 pb-1 ' },
                    react_1["default"].createElement("div", { className: 'flex items-center space-x-2 ' },
                        react_1["default"].createElement(Avatar_1["default"], { seed: post.subreddit.topic }),
                        react_1["default"].createElement("p", { className: 'text-xs text-gray-400' },
                            react_1["default"].createElement(link_1["default"], { href: "/subreddit/" + post.subreddit.topic },
                                react_1["default"].createElement("span", { className: 'font-bold text-black hover:text-blue-400 hover:underline' },
                                    "r/",
                                    post.subreddit.topic,
                                    " ")),
                            ' ',
                            " * Posted by u/",
                            post.username,
                            " ",
                            react_1["default"].createElement(react_timeago_1["default"], { date: post.created_at }))),
                    react_1["default"].createElement("div", { className: 'py-4 ' },
                        react_1["default"].createElement("h2", { className: 'text-xl font-semibold' }, post.title),
                        react_1["default"].createElement("p", { className: 'mt-2 text-sm font-light ' }, post.body)),
                    post.image && (react_1["default"].createElement("div", { className: '' },
                        react_1["default"].createElement(image_1["default"], { src: post.image, alt: "", layout: "intrinsic", width: 500, height: 400 }))),
                    react_1["default"].createElement("div", { className: 'flex space-x-4 text-gray-400' },
                        react_1["default"].createElement("div", { className: 'postButtons ' },
                            react_1["default"].createElement(outline_1.ChatAltIcon, { className: 'h-6 w-6 ' }),
                            react_1["default"].createElement("p", { className: '' },
                                post.commentList.length,
                                " Comments")),
                        react_1["default"].createElement("div", { className: 'postButtons' },
                            react_1["default"].createElement(outline_1.GiftIcon, { className: 'h-6 w-6' }),
                            react_1["default"].createElement("p", { className: 'hidden md:inline' }, " Award")),
                        react_1["default"].createElement("div", { className: 'postButtons' },
                            react_1["default"].createElement(outline_1.ShareIcon, { className: 'h-6 w-6' }),
                            react_1["default"].createElement("p", { className: 'hidden md:inline' }, " Share")),
                        react_1["default"].createElement("div", { className: 'postButtons' },
                            react_1["default"].createElement(outline_1.BookmarkAltIcon, { className: 'h-6 w-6' }),
                            react_1["default"].createElement("p", { className: 'hidden md:inline' }, " Save")),
                        react_1["default"].createElement("div", { className: 'postButtons' },
                            react_1["default"].createElement(outline_2.DotsHorizontalIcon, { className: 'h-6 w-6' }),
                            react_1["default"].createElement("p", { className: '' }, " ")))),
                react_1["default"].createElement("div", null)))));
}
exports["default"] = Post;
