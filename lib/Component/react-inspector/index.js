"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var emotion_theming_1 = require("emotion-theming");
var React = __importStar(require("react"));
var react_inspector_1 = require("react-inspector");
var Error_1 = __importDefault(require("../message-parsers/Error"));
var elements_1 = require("./elements");
var CustomObjectLabel = function (_a) {
    var name = _a.name, data = _a.data, _b = _a.isNonenumerable, isNonenumerable = _b === void 0 ? false : _b;
    return (React.createElement("span", null,
        typeof name === 'string' ? (React.createElement(react_inspector_1.ObjectName, { name: name, dimmed: isNonenumerable })) : (React.createElement(react_inspector_1.ObjectPreview, { data: name })),
        React.createElement("span", null, ": "),
        React.createElement(react_inspector_1.ObjectValue, { object: data })));
};
var CustomInspector = /** @class */ (function (_super) {
    __extends(CustomInspector, _super);
    function CustomInspector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomInspector.prototype.render = function () {
        var _a = this.props, data = _a.data, theme = _a.theme;
        var styles = theme.styles, method = theme.method;
        var dom = data instanceof HTMLElement;
        var table = method === 'table';
        return (React.createElement(elements_1.Root, { "data-type": table ? 'table' : dom ? 'html' : 'object' }, table ? (React.createElement(elements_1.Table, null,
            React.createElement(react_inspector_1.Inspector, __assign({}, this.props, { theme: styles, table: true })),
            React.createElement(react_inspector_1.Inspector, __assign({}, this.props, { theme: styles })))) : dom ? (React.createElement(elements_1.HTML, null,
            React.createElement(react_inspector_1.DOMInspector, __assign({}, this.props, { theme: styles })))) : (React.createElement(react_inspector_1.Inspector, __assign({}, this.props, { theme: styles, nodeRenderer: this.nodeRenderer.bind(this) })))));
    };
    CustomInspector.prototype.getCustomNode = function (data) {
        var _a;
        var styles = this.props.theme.styles;
        var constructor = (_a = data === null || data === void 0 ? void 0 : data.constructor) === null || _a === void 0 ? void 0 : _a.name;
        if (constructor === 'Function')
            return (React.createElement("span", { style: { fontStyle: 'italic' } },
                React.createElement(react_inspector_1.ObjectPreview, { data: data }), " {",
                React.createElement("span", { style: { color: 'rgb(181, 181, 181)' } }, data.body), "}"));
        if (data instanceof Error && typeof data.stack === 'string') {
            return React.createElement(Error_1["default"], { error: data.stack });
        }
        if (constructor === 'Promise')
            return (React.createElement("span", { style: { fontStyle: 'italic' } },
                "Promise ", "{",
                React.createElement("span", { style: { opacity: 0.6 } }, "<pending>"), "}"));
        if (data instanceof HTMLElement)
            return (React.createElement(elements_1.HTML, null,
                React.createElement(react_inspector_1.DOMInspector, { data: data, theme: styles })));
        return null;
    };
    CustomInspector.prototype.nodeRenderer = function (props) {
        var depth = props.depth, name = props.name, data = props.data, isNonenumerable = props.isNonenumerable;
        // Root
        if (depth === 0) {
            var customNode_1 = this.getCustomNode(data);
            return customNode_1 || React.createElement(react_inspector_1.ObjectRootLabel, { name: name, data: data });
        }
        if (name === 'constructor')
            return (React.createElement(elements_1.Constructor, null,
                React.createElement(react_inspector_1.ObjectLabel, { name: "<constructor>", data: data.name, isNonenumerable: isNonenumerable })));
        var customNode = this.getCustomNode(data);
        return customNode ? (React.createElement(elements_1.Root, null,
            React.createElement(react_inspector_1.ObjectName, { name: name }),
            React.createElement("span", null, ": "),
            customNode)) : (React.createElement(CustomObjectLabel, { name: name, data: data, isNonenumerable: isNonenumerable }));
    };
    return CustomInspector;
}(React.PureComponent));
exports["default"] = (0, emotion_theming_1.withTheme)(CustomInspector);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50L3JlYWN0LWluc3BlY3Rvci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTJDO0FBQzNDLDJDQUE4QjtBQUM5QixtREFRd0I7QUFHeEIsbUVBQWlEO0FBQ2pELHVDQUEyRDtBQU8zRCxJQUFNLGlCQUFpQixHQUFHLFVBQUMsRUFBdUM7UUFBckMsSUFBSSxVQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsdUJBQXVCLEVBQXZCLGVBQWUsbUJBQUcsS0FBSyxLQUFBO0lBQU8sT0FBQSxDQUNyRTtRQUNHLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FDMUIsb0JBQUMsNEJBQVUsSUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEdBQUksQ0FDcEQsQ0FBQyxDQUFDLENBQUMsQ0FDRixvQkFBQywrQkFBYSxJQUFDLElBQUksRUFBRSxJQUFJLEdBQUksQ0FDOUI7UUFDRCx1Q0FBZTtRQUNmLG9CQUFDLDZCQUFXLElBQUMsTUFBTSxFQUFFLElBQUksR0FBSSxDQUN4QixDQUNSO0FBVnNFLENBVXRFLENBQUE7QUFFRDtJQUE4QixtQ0FBK0I7SUFBN0Q7O0lBc0dBLENBQUM7SUFyR0MsZ0NBQU0sR0FBTjtRQUNRLElBQUEsS0FBa0IsSUFBSSxDQUFDLEtBQUssRUFBMUIsSUFBSSxVQUFBLEVBQUUsS0FBSyxXQUFlLENBQUE7UUFDMUIsSUFBQSxNQUFNLEdBQWEsS0FBSyxPQUFsQixFQUFFLE1BQU0sR0FBSyxLQUFLLE9BQVYsQ0FBVTtRQUVoQyxJQUFNLEdBQUcsR0FBRyxJQUFJLFlBQVksV0FBVyxDQUFBO1FBQ3ZDLElBQU0sS0FBSyxHQUFHLE1BQU0sS0FBSyxPQUFPLENBQUE7UUFFaEMsT0FBTyxD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