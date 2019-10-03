/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/scripts/eventRenderer.ts":
/*!**************************************!*\
  !*** ./app/scripts/eventRenderer.ts ***!
  \**************************************/
/*! exports provided: EventRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventRenderer", function() { return EventRenderer; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./app/scripts/utils.ts");

class EventRenderer {
    constructor(timetable) {
        this.timetable = timetable;
    }
    setHours() {
        this.scopeDurationHours = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDurationHours"])(this.timetable.scope.hourStart, this.timetable.scope.hourEnd);
    }
    renderEvent(event, node) {
        var hasOptions = event.options !== undefined;
        var hasURL, hasAdditionalClass, hasDataAttributes, hasClickHandler = false;
        if (hasOptions) {
            hasURL = event.options.url !== undefined;
            hasAdditionalClass = event.options.class !== undefined;
            hasDataAttributes = event.options.data !== undefined;
            hasClickHandler = event.options.onClick !== undefined;
        }
        var elementType = hasURL ? "a" : "span";
        var eventNode = node.appendChild(document.createElement(elementType));
        var smallNode = eventNode.appendChild(document.createElement("small"));
        eventNode.title = event.name;
        if (hasURL) {
            // @ts-ignore
            eventNode.href = event.options.url;
        }
        if (hasDataAttributes) {
            for (var key in event.options.data) {
                eventNode.setAttribute("data-" + key, String(event.options.data[key]));
            }
        }
        if (hasClickHandler) {
            eventNode.addEventListener("click", e => {
                // @ts-ignore
                event.options.onClick(event, this.timetable, e);
            });
        }
        eventNode.className = hasAdditionalClass
            ? "time-entry " + event.options.class
            : "time-entry";
        eventNode.style.width = this.computeEventBlockWidth(event);
        eventNode.style.left = this.computeEventBlockOffset(event);
        smallNode.textContent = event.name;
    }
    computeEventBlockWidth({ startDate, endDate }) {
        const start = startDate;
        const end = endDate;
        const durationHours = this.computeDurationInHours(start, end);
        return (durationHours / this.scopeDurationHours) * 100 + "%";
    }
    computeDurationInHours(start, end) {
        return (end.getTime() - start.getTime()) / 1000 / 60 / 60;
    }
    computeEventBlockOffset(event) {
        const scopeStartHours = this.timetable.scope.hourStart;
        const eventStartHours = event.startDate.getHours() + event.startDate.getMinutes() / 60;
        const hoursBeforeEvent = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDurationHours"])(scopeStartHours, eventStartHours);
        return (hoursBeforeEvent / this.scopeDurationHours) * 100 + "%";
    }
}


/***/ }),

/***/ "./app/scripts/plugin.js":
/*!*******************************!*\
  !*** ./app/scripts/plugin.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timetable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timetable */ "./app/scripts/timetable.ts");




window.getTimetable = function () {
  return new _timetable__WEBPACK_IMPORTED_MODULE_0__["Timetable"]();
};

/***/ }),

/***/ "./app/scripts/renderer.ts":
/*!*********************************!*\
  !*** ./app/scripts/renderer.ts ***!
  \*********************************/
/*! exports provided: Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });
/* harmony import */ var _syncscroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./syncscroll */ "./app/scripts/syncscroll.js");
/* harmony import */ var _syncscroll__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_syncscroll__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./app/scripts/utils.ts");
/* harmony import */ var _eventRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventRenderer */ "./app/scripts/eventRenderer.ts");



class Renderer {
    constructor(timetable) {
        this.timetable = timetable;
        this.eventRenderer = new _eventRenderer__WEBPACK_IMPORTED_MODULE_2__["EventRenderer"](timetable);
    }
    draw(selector) {
        this.eventRenderer.setHours();
        let container = document.querySelector(selector);
        this.checkContainerPrecondition(container);
        container = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["emptyNode"])(container);
        this.appendTimetableAside(container);
        this.appendTimetableSection(container);
        _syncscroll__WEBPACK_IMPORTED_MODULE_0__["reset"]();
    }
    checkContainerPrecondition(container) {
        if (!container) {
            throw new Error("Timetable container not found");
        }
    }
    appendTimetableAside(container) {
        const asideNode = container.appendChild(document.createElement("aside"));
        const asideULNode = asideNode.appendChild(document.createElement("ul"));
        this.appendRowHeaders(asideULNode);
    }
    appendRowHeaders(ulNode) {
        this.timetable.locations.forEach(location => {
            const liNode = ulNode.appendChild(document.createElement("li"));
            const spanNode = liNode.appendChild(document.createElement("span"));
            spanNode.className = "row-heading";
            spanNode.textContent = location;
        });
    }
    appendTimetableSection(container) {
        const sectionNode = container.appendChild(document.createElement("section"));
        const headerNode = this.appendColumnHeaders(sectionNode);
        const timeNode = sectionNode.appendChild(document.createElement("time"));
        timeNode.className = "syncscroll";
        timeNode.setAttribute("name", "scrollheader");
        const width = headerNode.scrollWidth + "px";
        this.appendTimeRows(timeNode, width);
    }
    appendColumnHeaders(node) {
        const headerNode = node.appendChild(document.createElement("header"));
        headerNode.className = "syncscroll";
        headerNode.setAttribute("name", "scrollheader");
        const headerULNode = headerNode.appendChild(document.createElement("ul"));
        let completed = false;
        let looped = false;
        for (let hour = this.timetable.scope.hourStart; !completed;) {
            const liNode = headerULNode.appendChild(document.createElement("li"));
            const spanNode = liNode.appendChild(document.createElement("span"));
            spanNode.className = "time-label";
            spanNode.textContent = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["prettyFormatHour"])(hour, this.timetable.usingTwelveHour);
            if (hour === this.timetable.scope.hourEnd &&
                (this.timetable.scope.hourStart !== this.timetable.scope.hourEnd ||
                    looped)) {
                completed = true;
            }
            if (++hour === 24) {
                hour = 0;
                looped = true;
            }
        }
        return headerNode;
    }
    appendTimeRows(node, width) {
        const ulNode = node.appendChild(document.createElement("ul"));
        ulNode.style.width = width;
        ulNode.className = "room-timeline";
        this.timetable.locations.forEach(location => {
            const liNode = ulNode.appendChild(document.createElement("li"));
            this.appendLocationEvents(location, liNode);
        });
    }
    appendLocationEvents(location, node) {
        this.timetable.events
            .filter(event => event.location === location)
            .forEach(event => this.appendEvent(event, node));
    }
    appendEvent(event, node) {
        this.eventRenderer.renderEvent(event, node);
    }
}


/***/ }),

/***/ "./app/scripts/syncscroll.js":
/*!***********************************!*\
  !*** ./app/scripts/syncscroll.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @fileoverview syncscroll - scroll several areas simultaniously
 * @version 0.0.3
 *
 * @license MIT, see http://github.com/asvd/intence
 * @copyright 2015 asvd <heliosframework@gmail.com>
 */
(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (exports) {
  var Width = 'Width';
  var Height = 'Height';
  var Top = 'Top';
  var Left = 'Left';
  var scroll = 'scroll';
  var client = 'client';
  var EventListener = 'EventListener';
  var addEventListener = 'add' + EventListener;
  var length = 'length';
  var Math_round = Math.round;
  var names = {};

  var reset = function reset() {
    var elems = document.getElementsByClassName('sync' + scroll); // clearing existing listeners

    var i, j, el, found, name;

    for (name in names) {
      if (names.hasOwnProperty(name)) {
        for (i = 0; i < names[name][length]; i++) {
          names[name][i]['remove' + EventListener](scroll, names[name][i].syn, 0);
        }
      }
    } // setting-up the new listeners


    for (i = 0; i < elems[length];) {
      found = j = 0;
      el = elems[i++];

      if (!(name = el.getAttribute('name'))) {
        // name attribute is not set
        continue;
      }

      el = el[scroll + 'er'] || el; // needed for intence
      // searching for existing entry in array of names;
      // searching for the element in that entry

      for (; j < (names[name] = names[name] || [])[length];) {
        found |= names[name][j++] == el;
      }

      if (!found) {
        names[name].push(el);
      }

      el.eX = el.eY = 0;

      (function (el, name) {
        el[addEventListener](scroll, el.syn = function () {
          var elems = names[name];
          var scrollX = el[scroll + Left];
          var scrollY = el[scroll + Top];
          var xRate = scrollX / (el[scroll + Width] - el[client + Width]);
          var yRate = scrollY / (el[scroll + Height] - el[client + Height]);
          var updateX = scrollX != el.eX;
          var updateY = scrollY != el.eY;
          var otherEl,
              i = 0;
          el.eX = scrollX;
          el.eY = scrollY;

          for (; i < elems[length];) {
            otherEl = elems[i++];

            if (otherEl != el) {
              if (updateX && Math_round(otherEl[scroll + Left] - (scrollX = otherEl.eX = Math_round(xRate * (otherEl[scroll + Width] - otherEl[client + Width]))))) {
                otherEl[scroll + Left] = scrollX;
              }

              if (updateY && Math_round(otherEl[scroll + Top] - (scrollY = otherEl.eY = Math_round(yRate * (otherEl[scroll + Height] - otherEl[client + Height]))))) {
                otherEl[scroll + Top] = scrollY;
              }
            }
          }
        }, 0);
      })(el, name);
    }
  };

  if (document.readyState == "complete") {
    reset();
  } else {
    window[addEventListener]("load", reset, 0);
  }

  exports.reset = reset;
});

/***/ }),

/***/ "./app/scripts/timetable.ts":
/*!**********************************!*\
  !*** ./app/scripts/timetable.ts ***!
  \**********************************/
/*! exports provided: Timetable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timetable", function() { return Timetable; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./app/scripts/utils.ts");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer */ "./app/scripts/renderer.ts");


class Timetable {
    constructor() {
        this.scope = {
            hourStart: 9,
            hourEnd: 17,
        };
        this.usingTwelveHour = false;
        this.locations = [];
        this.events = [];
        this.renderer = new _renderer__WEBPACK_IMPORTED_MODULE_1__["Renderer"](this);
    }
    setScope(start, end) {
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isValidHourRange"])(start, end)) {
            this.scope.hourStart = start;
            this.scope.hourEnd = end;
        }
        else {
            throw new RangeError('Timetable scope should consist of (start, end) in whole hours from 0 to 23');
        }
        return this;
    }
    useTwelveHour() {
        this.usingTwelveHour = true;
    }
    addLocations(newLocations) {
        newLocations.forEach((location) => {
            if (!this.locations.includes(location)) {
                this.locations.push(location);
            }
            else {
                throw new Error('Location already exists');
            }
        });
        return this;
    }
    addEvent(event) {
        if (!this.locations.includes(event.location)) {
            throw new Error('Unknown location');
        }
        if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isValidTimeRange"])(event.startDate, event.endDate)) {
            throw new Error('Invalid time range: ' + JSON.stringify([event.startDate, event.endDate]));
        }
        this.events.push(event);
        return this;
    }
}
;


/***/ }),

/***/ "./app/scripts/utils.ts":
/*!******************************!*\
  !*** ./app/scripts/utils.ts ***!
  \******************************/
/*! exports provided: isInHourRange, isValidHourRange, locationExistsIn, isValidTimeRange, getDurationHours, prettyFormatHour, emptyNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInHourRange", function() { return isInHourRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidHourRange", function() { return isValidHourRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locationExistsIn", function() { return locationExistsIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidTimeRange", function() { return isValidTimeRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDurationHours", function() { return getDurationHours; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prettyFormatHour", function() { return prettyFormatHour; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyNode", function() { return emptyNode; });
const isInHourRange = (number) => {
    return number >= 0 && number < 24;
};
const isValidHourRange = (start, end) => {
    return isInHourRange(start) && isInHourRange(end);
};
const locationExistsIn = (loc, locs) => {
    return locs.indexOf(loc) !== -1;
};
const isValidTimeRange = (start, end) => {
    return start < end;
};
const getDurationHours = (startHour, endHour) => {
    return endHour >= startHour ? endHour - startHour : 24 + endHour - startHour;
};
const prettyFormatHour = (hour, usingTwelveHour) => {
    var prettyHour;
    if (usingTwelveHour) {
        var period = hour >= 12 ? 'PM' : 'AM';
        prettyHour = ((hour + 11) % 12 + 1) + ':00' + period;
    }
    else {
        var prefix = hour < 10 ? '0' : '';
        prettyHour = prefix + hour + ':00';
    }
    return prettyHour;
};
const emptyNode = (node) => {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    return node;
};


/***/ }),

/***/ "./app/styles/plugin.scss":
/*!********************************!*\
  !*** ./app/styles/plugin.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!**************************************************************!*\
  !*** multi ./app/scripts/plugin.js ./app/styles/plugin.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/mykolasm/Documents/personal/sites/timetablejs/app/scripts/plugin.js */"./app/scripts/plugin.js");
module.exports = __webpack_require__(/*! /Users/mykolasm/Documents/personal/sites/timetablejs/app/styles/plugin.scss */"./app/styles/plugin.scss");


/***/ })

/******/ });