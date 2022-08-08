"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Methods_1 = __importDefault(require("../definitions/Methods"));
var parse_1 = __importDefault(require("./parse"));
var Transform_1 = require("../Transform");
var optionsDefault = { encode: true, async: true };
function runImmediately(f) {
    f();
}
/**
 * Hook a console constructor and forward messages to a callback
 * @argument console The Console constructor to Hook
 * @argument callback The callback to be called once a message is logged
 */
function Hook(console, callback, optionsIn) {
    if (optionsIn === void 0) { optionsIn = true; }
    var options = (function () {
        // Support old call style, where third argument is just `encode`
        if (typeof optionsIn === 'boolean') {
            optionsIn = { encode: optionsIn };
        }
        // Set defaults
        optionsIn = Object.assign({}, optionsDefault, optionsIn);
        return optionsIn;
    })();
    var TargetConsole = console;
    var Storage = {
        pointers: {},
        src: {
            npm: 'https://npmjs.com/package/console-feed',
            github: 'https://github.com/samdenty99/console-feed'
        }
    };
    var _loop_1 = function (method) {
        var NativeMethod = TargetConsole[method];
        // Override
        TargetConsole[method] = function () {
            // Pass back to native method
            NativeMethod.apply(this, arguments);
            // Parse arguments and send to transport
            var args = [].slice.call(arguments);
            // setTimeout to prevent lag, unless disabled
            var maybeSetTimeout = options.async ? setTimeout : runImmediately;
            maybeSetTimeout(function () {
                var parsed = (0, parse_1["default"])(method, args);
                if (parsed) {
                    var encoded = parsed;
                    if (options.encode) {
                        encoded = (0, Transform_1.Encode)(parsed);
                    }
                    callback(encoded, parsed);
                }
            });
        };
        // Store native methods
        Storage.pointers[method] = NativeMethod;
    };
    // Override console methods
    for (var _i = 0, Methods_2 = Methods_1["default"]; _i < Methods_2.length; _i++) {
        var method = Methods_2[_i];
        _loop_1(method);
    }
    TargetConsole.feed = Storage;
    return TargetConsole;
}
exports["default"] = Hook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvSG9vay9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQU9BLG1FQUE0QztBQUU1QyxrREFBMkI7QUFFM0IsMENBQXFDO0FBUXJDLElBQU0sY0FBYyxHQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFBO0FBRWpFLFNBQVMsY0FBYyxDQUFDLENBQWE7SUFDbkMsQ0FBQyxFQUFFLENBQUE7QUFDTCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQXdCLElBQUksQ0FDMUIsT0FBZ0IsRUFDaEIsUUFBa0IsRUFDbEIsU0FBdUM7SUFBdkMsMEJBQUEsRUFBQSxnQkFBdUM7SUFFdkMsSUFBTSxPQUFPLEdBQWdCLENBQUM7UUFDNUIsZ0VBQWdFO1FBQ2hFLElBQUksT0FBTyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ2xDLFNBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQTtTQUNsQztRQUNELGVBQWU7UUFDZixTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQ3hELE9BQU8sU0FBUyxDQUFBO0lBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFFSixJQUFNLGFBQWEsR0FBRyxPQUF3QixDQUFBO0lBQzlDLElBQU0sT0FBTyxHQUFZO1FBQ3ZCLFFBQVEsRUFBRSxFQUFFO1FBQ1osR0FBRyxFQUFFO1lBQ0gsR0FBRyxFQUFFLHdDQUF3QztZQUM3QyxNQUFNLEVBQUUsNENBQTRDO1NBQ3JEO0tBQ0YsQ0FBQTs0QkFHUSxNQUFNO1FBQ2IsSUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRTFDLFdBQVc7UUFDWCxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDdEIsNkJBQTZCO1lBQzdCLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBRW5DLHdDQUF3QztZQUN4QyxJQUFNLElBQUksR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUVyQyw2Q0FBNkM7WUFDN0MsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUE7WUFDbkUsZUFBZSxDQUFDO2dCQUNkLElBQU0sTUFBTSxHQUFHLElBQUEsa0JBQUssRUFBQyxNQUF3QixFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUNwRCxJQUFJLE1BQU0sRUFBRTtvQkFDVixJQUFJLE9BQU8sR0FBWSxNQUFpQixDQUFBO29CQUN4QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7d0JBQ2xCLE9BQU8sR0FBRyxJQUFBLGtCQUFNLEVBQUMsTUFBTSxDQUFZLENBQUE7cUJBQ3BDO29CQUNELFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7aUJBQzFCO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUE7UUFFRCx1QkFBdUI7UUFDdkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZLENBQUE7O0lBM0J6QywyQkFBMkI7SUFDM0IsS0FBbUIsVUFBTyxFQUFQLFlBQUEsb0JBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87UUFBckIsSUFBSSxNQUFNLGdCQUFBO2dCQUFOLE1BQU07S0EyQmQ7SUFFRCxhQUFhLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtJQUU1QixPQUFPLGFBQWEsQ0FBQTtBQUN0QixDQUFDO0FBekRELDBCQXlEQyJ9