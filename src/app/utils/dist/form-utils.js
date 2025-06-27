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
exports.FormUtils = void 0;
function sleep() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(true);
                    }, 2500);
                })];
        });
    });
}
var FormUtils = /** @class */ (function () {
    function FormUtils() {
    }
    FormUtils.getTextError = function (errors) {
        for (var _i = 0, _a = Object.keys(errors); _i < _a.length; _i++) {
            var key = _a[_i];
            switch (key) {
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return "M\u00EDnimo de " + errors['minlength'].requiredLength + " caracteres.";
                case 'min':
                    return "Valor m\u00EDnimo de " + errors['min'].min;
                case 'email':
                    return "El valor ingresado no es un correo electr\u00F3nico";
                case 'emailTaken':
                    return "El correo electr\u00F3nico ya est\u00E1 siendo usado por otro usuario";
                case 'noStrider':
                    return "No se puede usar el username de strider en la app";
                case 'pattern':
                    if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
                        return 'El valor ingresado no luce como un correo electrónico';
                    }
                    return 'Error de patrón contra expresión regular';
                default:
                    return "Error de validaci\u00F3n no controlado " + key;
            }
        }
        return null;
    };
    FormUtils.isValidField = function (form, fieldName) {
        return (!!form.controls[fieldName].errors && form.controls[fieldName].touched);
    };
    FormUtils.getFieldError = function (form, fieldName) {
        var _a;
        if (!form.controls[fieldName])
            return null;
        var errors = (_a = form.controls[fieldName].errors) !== null && _a !== void 0 ? _a : {};
        return FormUtils.getTextError(errors);
    };
    FormUtils.isValidFieldInArray = function (formArray, index) {
        return (formArray.controls[index].errors && formArray.controls[index].touched);
    };
    FormUtils.getFieldErrorInArray = function (formArray, index) {
        var _a;
        if (formArray.controls.length === 0)
            return null;
        var errors = (_a = formArray.controls[index].errors) !== null && _a !== void 0 ? _a : {};
        return FormUtils.getTextError(errors);
    };
    FormUtils.isFieldOneEqualFieldTwo = function (field1, field2) {
        return function (formGroup) {
            var _a, _b;
            var field1Value = (_a = formGroup.get(field1)) === null || _a === void 0 ? void 0 : _a.value;
            var field2Value = (_b = formGroup.get(field2)) === null || _b === void 0 ? void 0 : _b.value;
            return field1Value === field2Value ? null : { passwordsNotEqual: true };
        };
    };
    FormUtils.checkingServerResponse = function (control) {
        return __awaiter(this, void 0, Promise, function () {
            var formValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Validando contra servidor');
                        return [4 /*yield*/, sleep()];
                    case 1:
                        _a.sent(); // 2 segundos y medio
                        formValue = control.value;
                        if (formValue === 'hola@mundo.com') {
                            return [2 /*return*/, {
                                    emailTaken: true
                                }];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    FormUtils.notStrider = function (control) {
        var value = control.value;
        return value === 'strider' ? { noStrider: true } : null;
    };
    // Expresiones regulares
    FormUtils.namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
    FormUtils.emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    FormUtils.notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
    FormUtils.slugPattern = '^[a-z0-9_]+(?:-[a-z0-9_]+)*$';
    return FormUtils;
}());
exports.FormUtils = FormUtils;
