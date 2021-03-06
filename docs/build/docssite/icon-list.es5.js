/*! Built with http://stenciljs.com */
DocsSite.loadBundle('icon-list', ['exports'], function (exports) {
    var h = window.DocsSite.h;
    var LandingPage = /** @class */ (function () {
        function LandingPage() {
            this.selectedIcon = '';
            this.selectedIconType = 'md';
            this.isHeaderSearchVisible = false;
            this.query = '';
        }
        LandingPage.prototype.escListener = function (ev) {
            if (ev.code === 'Escape' && this.selectedIcon.length)
                this.selectedIcon = '';
        };
        LandingPage.prototype.handleBodyClicked = function () {
            if (this.selectedIcon.length)
                this.selectedIcon = '';
        };
        LandingPage.prototype.handleClearToast = function () {
            this.selectedIcon = '';
        };
        LandingPage.prototype.handleScroll = function () {
            requestAnimationFrame(this.checkScroll.bind(this));
        };
        LandingPage.prototype.checkScroll = function () {
            var headerBars = this.el.querySelectorAll('.icon-list__header-bar');
            for (var i = 0; i < headerBars.length; i++) {
                var bar = headerBars[i];
                if (bar.getBoundingClientRect().top < 67) {
                    bar.classList.add('sticky');
                }
                else {
                    bar.classList.remove('sticky');
                }
            }
        };
        LandingPage.prototype.filterIcons = function () {
            var search = this.query.trim().toLowerCase();
            var results = {
                icon: [],
                logo: []
            };
            this.data.icons.forEach(function (iconData) {
                if (search === '' || iconData.tags.some(function (t) { return t.indexOf(search) > -1; })) {
                    iconData.icons.forEach(function (iconName) {
                        var iconType = iconName.substr(0, iconName.indexOf('-'));
                        switch (iconType) {
                            case 'ios':
                                results['icon'].push({ name: iconData.name });
                                break;
                            case 'logo':
                                results['logo'].push({ name: iconData.name, icon: iconName });
                                break;
                            default:
                                return;
                        }
                    });
                }
            });
            return results;
        };
        LandingPage.prototype.handleIconMouseEnter = function (ev) {
            ev.target.classList.remove('mouseOff');
            ev.target.classList.add('mouseOver');
        };
        LandingPage.prototype.handleIconMouseLeave = function (ev) {
            ev.target.classList.remove('mouseOver');
            ev.target.classList.add('mouseOff');
        };
        LandingPage.prototype.handleIconClick = function (ev, name) {
            ev.stopPropagation();
            this.selectedIcon = name;
        };
        LandingPage.prototype.handleToggleClick = function (ev) {
            ev.stopPropagation();
            if (this.selectedIconType === 'md') {
                this.selectedIconType = 'ios';
            }
            else {
                this.selectedIconType = 'md';
            }
        };
        LandingPage.prototype.render = function () {
            var _this = this;
            var results = this.filterIcons();
            var selectedIcon = this.data.icons.find(function (o) { return o.name === _this.selectedIcon; });
            if (!results.icon.length && !results.logo.length && this.isHeaderSearchVisible)
                document.documentElement.scrollTop = 0;
            return (h("div", { class: "icon-list" }, h("div", { class: "icon-list__search container--small" }, h("icon-search", { query: this.query, size: "large", autofocus: "autofocus" })), results.icon.length ?
                h("div", { class: "icon-list__wrapper" }, h("div", { class: "icon-list__header-bar" }, h("div", { class: "container--small" }, h("h4", null, "App icons"), h("ul", { class: "toggle" }, h("li", { class: "toggle__item " + ((this.selectedIconType === 'md') ? 'active' : ''), onClick: function (ev) { return _this.handleToggleClick(ev); } }, "Material style"), h("li", { class: "toggle__item " + ((this.selectedIconType === 'ios') ? 'active' : ''), onClick: function (ev) { return _this.handleToggleClick(ev); } }, "iOS style")))), h("div", { class: "container--small" }, h("div", { class: "icon-results" }, results.icon.map(function (icon) {
                    return h("span", { class: "icon-results__cell " + ((_this.selectedIcon === icon.name) ? 'active' : ''), onClick: function (ev) { return _this.handleIconClick(ev, icon.name); }, onMouseEnter: function (ev) { return _this.handleIconMouseEnter(ev); }, onMouseLeave: function (ev) { return _this.handleIconMouseLeave(ev); } }, h("i", { class: "ion ion-" + _this.selectedIconType + "-" + icon.name }));
                }))))
                : '', results.logo.length ?
                h("div", { class: "icon-list__wrapper" }, h("div", { class: "icon-list__header-bar" }, h("div", { class: "container--small" }, h("h4", null, "Logos"))), h("div", { class: "container--small" }, h("div", { class: "icon-results" }, results.logo.map(function (icon) {
                    return h("span", { class: "icon-results__cell " + ((_this.selectedIcon === icon.name) ? 'active' : ''), onClick: function (ev) { return _this.handleIconClick(ev, icon.name); }, onMouseEnter: function (ev) { return _this.handleIconMouseEnter(ev); }, onMouseLeave: function (ev) { return _this.handleIconMouseLeave(ev); } }, h("i", { class: 'ion ion-' + icon.icon }));
                }))))
                : '', (!results.icon.length && !results.logo.length) ?
                h("div", { class: "icon-results--empty container--small" }, h("h2", null, "No results for \"", this.query, "\""), h("p", null, "Not finding an icon that you want? ", h("a", { href: "https://github.com/ionic-team/ionicons/issues" }, "File an issue"), " and suggest a new icon."))
                : '', h("toast-bar", { selectedIcon: selectedIcon, selectedIconType: this.selectedIconType })));
        };
        Object.defineProperty(LandingPage, "is", {
            get: function () { return "icon-list"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LandingPage, "properties", {
            get: function () {
                return {
                    "data": {
                        "type": "Any",
                        "attr": "data"
                    },
                    "el": {
                        "elementRef": true
                    },
                    "isHeaderSearchVisible": {
                        "state": true
                    },
                    "query": {
                        "type": String,
                        "attr": "query"
                    },
                    "selectedIcon": {
                        "state": true
                    },
                    "selectedIconType": {
                        "state": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LandingPage, "listeners", {
            get: function () {
                return [{
                        "name": "body:keyup",
                        "method": "escListener"
                    }, {
                        "name": "body:click",
                        "method": "handleBodyClicked"
                    }, {
                        "name": "clearToast",
                        "method": "handleClearToast"
                    }, {
                        "name": "window:scroll",
                        "method": "handleScroll",
                        "passive": true
                    }];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LandingPage, "style", {
            get: function () { return "icon-list .icon-list {\n  margin-bottom: 100px; }\n\nicon-list .icon-list__search + .icon-list__wrapper {\n  padding-top: 90px; }\n\nicon-list .icon-list__header-bar {\n  -webkit-transition: -webkit-box-shadow 0.6s;\n  transition: -webkit-box-shadow 0.6s;\n  transition: box-shadow 0.6s;\n  transition: box-shadow 0.6s, -webkit-box-shadow 0.6s;\n  margin-bottom: 14px;\n  height: 52px;\n  background-color: #fff;\n  -webkit-box-shadow: 0;\n  box-shadow: 0;\n  z-index: 99; }\n\nicon-list .icon-list__header-bar.sticky {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 58px;\n  -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);\n  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06); }\n\nicon-list .icon-list__header-bar .container--small {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between; }\n\nicon-list .icon-list__header-bar h4 {\n  margin-top: 21px;\n  margin-bottom: 0; }\n\nicon-list .icon-results {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));\n  grid-auto-rows: minmax(70px, auto);\n  grid-gap: 0.5em;\n  padding-bottom: 60px;\n  margin-left: -20px;\n  margin-right: -20px; }\n\nicon-list .icon-results__cell,\nicon-list .icon-results .ion {\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\nicon-list .icon-results__cell {\n  -webkit-transition: background-color 0.4s;\n  transition: background-color 0.4s;\n  cursor: pointer;\n  border-radius: 8px;\n  border: 2px solid transparent;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: rgba(236, 240, 246, 0.4); }\n\nicon-list .icon-results__cell .ion {\n  width: 42px;\n  height: 42px;\n  font-size: 32px;\n  color: #373737; }\n\nicon-list .icon-results__cell:not(.active).mouseOver {\n  -webkit-animation-name: shadowIn;\n  animation-name: shadowIn;\n  -webkit-animation-duration: 0.3s;\n  animation-duration: 0.3s;\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n\n\@-webkit-keyframes shadowIn {\n  from {\n    -webkit-box-shadow: 0;\n    box-shadow: 0; }\n  to {\n    -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.08); } }\n\n\@keyframes shadowIn {\n  from {\n    -webkit-box-shadow: 0;\n    box-shadow: 0; }\n  to {\n    -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.08); } }\n\nicon-list .icon-results__cell:not(.active).mouseOff,\nicon-list .icon-results__cell.active {\n  -webkit-animation-name: shadowOut;\n  animation-name: shadowOut;\n  -webkit-animation-duration: 0.6s;\n  animation-duration: 0.6s;\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n\nicon-list .icon-results__cell.active {\n  -webkit-animation-duration: 0.3s;\n  animation-duration: 0.3s; }\n\n\@-webkit-keyframes shadowOut {\n  from {\n    -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.08); }\n  to {\n    -webkit-box-shadow: 0;\n    box-shadow: 0; } }\n\n\@keyframes shadowOut {\n  from {\n    -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.08); }\n  to {\n    -webkit-box-shadow: 0;\n    box-shadow: 0; } }\n\nicon-list .icon-results__cell.active {\n  background-color: var(--color-catskill-white);\n  cursor: default; }\n\nicon-list .icon-results--empty {\n  text-align: center;\n  padding-top: 70px; }\n  icon-list .icon-results--empty h2 {\n    margin-top: 0; }\n\nicon-list .toggle {\n  list-style-type: none;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: -4px;\n  position: relative;\n  bottom: -3px;\n  margin-top: 18px; }\n\nicon-list .toggle__item {\n  -webkit-transition: opacity 0.3s, padding-bottom 0.1s;\n  transition: opacity 0.3s, padding-bottom 0.1s;\n  opacity: 0.5;\n  text-decoration: none;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-dodger-blue);\n  border-bottom: 2px solid transparent; }\n\nicon-list .toggle__item:not(.active) {\n  cursor: pointer; }\n\nicon-list .toggle__item:hover,\nicon-list .toggle__item.active {\n  opacity: 1; }\n\nicon-list .toggle__item.active {\n  border-bottom: 2px solid var(--color-dodger-blue);\n  padding-bottom: 2px; }\n\nicon-list .toggle__item + .toggle__item {\n  margin-left: 20px; }\n\nicon-list .icon-list__header-bar.sticky .toggle__item {\n  padding-bottom: 11px; }\n\n\@media screen and (max-width: 768px) {\n  icon-list .icon-results {\n    margin-left: 0;\n    margin-right: 0; }\n  icon-list .icon-list__search + .icon-list__wrapper {\n    padding-top: 40px; } }\n\n\@media screen and (max-width: 560px) {\n  icon-list .icon-results__cell:not(.active).mouseOver,\n  icon-list .icon-results__cell:not(.active).mouseOff,\n  icon-list .icon-results__cell.active {\n    -webkit-animation-name: none;\n    animation-name: none;\n    -webkit-box-shadow: 0;\n    box-shadow: 0; } }"; },
            enumerable: true,
            configurable: true
        });
        return LandingPage;
    }());
    var LandingPage$1 = /** @class */ (function () {
        function LandingPage$1() {
            this.query = '';
        }
        LandingPage$1.prototype.render = function () {
            return (h("main", null, h("div", { class: "wrapper" }, h("div", { class: "container" }, h("div", { class: "content" }, h("h1", null, "Beautifully crafted open source icons"), h("p", { class: "lead" }, "Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed."))), h("icon-list", { query: this.query, data: this.data })), h("footer-bar", null)));
        };
        Object.defineProperty(LandingPage$1, "is", {
            get: function () { return "landing-page"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LandingPage$1, "properties", {
            get: function () {
                return {
                    "data": {
                        "type": "Any",
                        "attr": "data"
                    },
                    "el": {
                        "elementRef": true
                    },
                    "query": {
                        "type": String,
                        "attr": "query"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LandingPage$1, "style", {
            get: function () { return "landing-page {\n  height: 100%; }\n  landing-page h1,\n  landing-page .lead {\n    text-align: center; }\n  landing-page .lead {\n    margin-bottom: 40px; }"; },
            enumerable: true,
            configurable: true
        });
        return LandingPage$1;
    }());
    var ToastBar = /** @class */ (function () {
        function ToastBar() {
            this.hadIconOnce = false;
        }
        ToastBar.prototype.handleCodeClick = function (ev) {
            var _this = this;
            var codeElParent = this.el.querySelector('.toast-bar__section:first-child');
            var el = document.createElement('textarea');
            el.value = "<ion-icon name=\"" + this.selectedIcon.name + "\"></ion-icon>";
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            if (this.showCopiedConfirm) {
                window.clearTimeout(this.showCopiedConfirm);
                this.showCopiedConfirm = 0;
            }
            codeElParent.classList.add('copied');
            this.showCopiedConfirm = window.setTimeout(function () {
                codeElParent.classList.remove('copied');
                _this.showCopiedConfirm = 0;
            }, 1500);
        };
        ToastBar.prototype.componentDidLoad = function () {
            this.el.addEventListener("touchstart", this.handleTouchStart.bind(this), false);
            this.el.addEventListener("touchend", this.handleTouchEnd.bind(this), false);
        };
        ToastBar.prototype.handleTouchStart = function (ev) {
            if (ev.target.classList.contains('toast-bar--inner')) {
                ev.preventDefault();
                this.touchStartY = ev.changedTouches[0].screenY;
            }
        };
        ToastBar.prototype.handleTouchEnd = function (ev) {
            if (ev.target.classList.contains('toast-bar--inner')) {
                ev.preventDefault();
                this.touchEndY = ev.changedTouches[0].screenY;
                if (this.touchEndY > this.touchStartY) { //swiped down
                    this.clearToast.emit();
                }
            }
        };
        ToastBar.prototype.render = function () {
            var _this = this;
            var snippetLength;
            var iconType;
            var activeDownloadLinks = null;
            if (this.selectedIcon) {
                if (!this.hadIconOnce)
                    this.hadIconOnce = true;
                iconType = this.selectedIcon.icons[0].startsWith('logo-') ? 'logo' : this.selectedIconType;
                snippetLength = (("<ion-icon name=\"" + this.selectedIcon.name + "\"></ion-icon>").length * 8) + 32;
                activeDownloadLinks = this.selectedIcon.icons.map(function (name) {
                    var type = name.substr(0, name.indexOf('-'));
                    var heading;
                    switch (type) {
                        case 'ios':
                            heading = 'iOS STYLE';
                            break;
                        case 'md':
                            heading = 'MATERIAL STYLE';
                            break;
                        case 'logo':
                            heading = 'LOGO';
                            break;
                    }
                    return (h("div", { class: "toast-bar__section" }, h("div", { class: "toast-bar__section-header" }, h("h6", null, heading)), h("div", { class: "btn-group" }, h("div", { class: "btn btn--gray btn--small btn--icon" }, h("i", { class: 'ion ion-' + name })), h("a", { class: "btn btn--gray btn--small", download: "/svg/" + name + ".svg", href: "/svg/" + name + ".svg" }, h("i", { class: 'ion ion-md-download' }), "SVG"))));
                });
            }
            return (h("div", { class: "toast-bar " + (this.selectedIcon ? 'isVisible' : '') + " " + (!this.selectedIcon && this.hadIconOnce ? 'isHidden' : '') + " " + (!this.hadIconOnce ? 'preload' : ''), onClick: function (ev) { return ev.stopPropagation(); } }, h("div", { class: "container" }, h("div", { class: "toast-bar--inner" }, this.selectedIcon && h("h4", null, this.selectedIcon.name), this.selectedIcon &&
                h("div", { class: "toast-bar__details" }, h("div", { class: "toast-bar__section", style: { maxWidth: snippetLength + 'px' } }, h("div", { class: "toast-bar__section-header" }, h("div", null, h("h6", null, "Web component code"), h("span", { class: "confirmation" }, h("i", { class: "ion ion-md-checkmark" }), "Copied")), h("stencil-route-link", { url: "/usage#" + iconType + "-" + this.selectedIcon.name, onClick: function () { return _this.toggleHeaderSearch.emit('hide'); } }, "Usage", h("i", { class: "ion ion-ios-arrow-forward" }))), h("code", null, h("span", { class: "hover-highlight", onClick: function (ev) { return _this.handleCodeClick(ev); } }, '<', h("span", { class: "yellow" }, "ion-icon"), "\u00A0", h("span", { class: "orange" }, "name"), '=', h("span", { class: "green" }, "\"" + this.selectedIcon.name + "\""), '>', '</', h("span", { class: "yellow" }, "ion-icon"), '>'))), activeDownloadLinks)))));
        };
        Object.defineProperty(ToastBar, "is", {
            get: function () { return "toast-bar"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ToastBar, "properties", {
            get: function () {
                return {
                    "el": {
                        "elementRef": true
                    },
                    "hadIconOnce": {
                        "state": true
                    },
                    "selectedIcon": {
                        "type": "Any",
                        "attr": "selected-icon"
                    },
                    "selectedIconType": {
                        "type": String,
                        "attr": "selected-icon-type"
                    },
                    "showCopiedConfirm": {
                        "state": true
                    },
                    "touchEndY": {
                        "state": true
                    },
                    "touchStartY": {
                        "state": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ToastBar, "events", {
            get: function () {
                return [{
                        "name": "clearToast",
                        "method": "clearToast",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }, {
                        "name": "toggleHeaderSearch",
                        "method": "toggleHeaderSearch",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ToastBar, "style", {
            get: function () { return "toast-bar .toast-bar {\n  position: fixed;\n  padding: 12px 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  -webkit-transform: translateY(100%);\n  transform: translateY(100%); }\n\ntoast-bar .toast-bar.isVisible {\n  -webkit-animation-name: slideIn;\n  animation-name: slideIn;\n  -webkit-animation-duration: 0.6s;\n  animation-duration: 0.6s;\n  -webkit-animation-timing-function: var(--easeOutExpo);\n  animation-timing-function: var(--easeOutExpo);\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards;\n  opacity: 1; }\n\n\@-webkit-keyframes slideIn {\n  from {\n    -webkit-transform: translateY(100%);\n    transform: translateY(100%); }\n  to {\n    -webkit-transform: translateY(0%);\n    transform: translateY(0%); } }\n\n\@keyframes slideIn {\n  from {\n    -webkit-transform: translateY(100%);\n    transform: translateY(100%); }\n  to {\n    -webkit-transform: translateY(0%);\n    transform: translateY(0%); } }\n\ntoast-bar .toast-bar.isHidden {\n  -webkit-animation-name: slideOut;\n  animation-name: slideOut;\n  -webkit-animation-duration: 0.4s;\n  animation-duration: 0.4s;\n  -webkit-animation-timing-function: var(--easeOutExpo);\n  animation-timing-function: var(--easeOutExpo);\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n\n\@-webkit-keyframes slideOut {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0%);\n    transform: translateY(0%); }\n  99% {\n    opacity: 1; }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(100%);\n    transform: translateY(100%); } }\n\n\@keyframes slideOut {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0%);\n    transform: translateY(0%); }\n  99% {\n    opacity: 1; }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(100%);\n    transform: translateY(100%); } }\n\ntoast-bar .toast-bar.preload {\n  opacity: 0; }\n\ntoast-bar .toast-bar--inner {\n  background-color: var(--color-shark);\n  height: 80px;\n  border-radius: 15px;\n  padding: 0 20px 0 30px;\n  color: #fff;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.1), 0px 8px 16px 0px rgba(0, 0, 0, 0.08);\n  box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.1), 0px 8px 16px 0px rgba(0, 0, 0, 0.08); }\n  toast-bar .toast-bar--inner h4 {\n    color: #fff;\n    margin: 0;\n    white-space: nowrap;\n    margin-right: 30px; }\n\ntoast-bar .toast-bar__details {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 0 auto;\n  -ms-flex: 1 0 auto;\n  flex: 1 0 auto;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n  -ms-flex-pack: end;\n  justify-content: flex-end; }\n\ntoast-bar .toast-bar__section-header,\ntoast-bar .toast-bar__section-header > div {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center; }\n\ntoast-bar .toast-bar__section-header {\n  height: 10px;\n  margin-bottom: 7px; }\n  toast-bar .toast-bar__section-header h6 {\n    display: inline-block; }\n  toast-bar .toast-bar__section-header a {\n    -webkit-transition: border 0.3s;\n    transition: border 0.3s;\n    color: var(--color-melrose);\n    font-size: 9px;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    text-decoration: none;\n    border-bottom: 1px solid transparent; }\n  toast-bar .toast-bar__section-header a:hover {\n    border-bottom-color: var(--color-melrose-dark); }\n  toast-bar .toast-bar__section-header i {\n    margin-left: 3px; }\n\ntoast-bar .toast-bar__section:not(:first-child) {\n  margin-left: 20px; }\n\ntoast-bar .toast-bar__section:first-child {\n  position: relative;\n  max-width: none; }\n\ntoast-bar .toast-bar__details code {\n  position: relative;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  font-size: 14px;\n  line-height: 14px;\n  height: 32px;\n  padding: 0 12px;\n  cursor: text;\n  overflow: hidden; }\n\n\@supports (display: grid) {\n  toast-bar .toast-bar__section:not(:first-child) {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0;\n    -ms-flex: 0;\n    flex: 0; }\n  toast-bar .toast-bar__section:first-child {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1; }\n  toast-bar .toast-bar__details code {\n    overflow-x: auto; } }\n\ntoast-bar .toast-bar__details code > span {\n  position: absolute;\n  white-space: nowrap; }\n\ntoast-bar .toast-bar__section .confirmation {\n  font-size: 11px;\n  font-family: 'Eina';\n  font-weight: 600;\n  color: #aec6ff;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  opacity: 0;\n  -webkit-transform: translateY(5px);\n  transform: translateY(5px);\n  margin-left: 12px; }\n\ntoast-bar .toast-bar__section .confirmation .ion {\n  color: #aec6ff;\n  font-size: 14px;\n  margin-right: 4px; }\n\ntoast-bar .toast-bar__section.copied .confirmation {\n  -webkit-animation-name: slideInOut;\n  animation-name: slideInOut;\n  -webkit-animation-duration: 1.5s;\n  animation-duration: 1.5s;\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n\n\@-webkit-keyframes slideInOut {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(5px);\n    transform: translateY(5px); }\n  10% {\n    opacity: 0.9;\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  90% {\n    opacity: 0.9;\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-5px);\n    transform: translateY(-5px); } }\n\n\@keyframes slideInOut {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(5px);\n    transform: translateY(5px); }\n  10% {\n    opacity: 0.9;\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  90% {\n    opacity: 0.9;\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-5px);\n    transform: translateY(-5px); } }\n\ntoast-bar .toast-bar__details code:hover .hover-highlight {\n  background-color: #5882b2; }\n\n\@media screen and (max-width: 768px) {\n  toast-bar .toast-bar__section:not(:first-child) {\n    display: none; } }\n\n\@media screen and (max-width: 540px) {\n  toast-bar .toast-bar--inner {\n    padding: 16px;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    height: auto; }\n  toast-bar .toast-bar--inner h4 {\n    margin: 0 0 16px; }\n  toast-bar .toast-bar__section {\n    max-width: 100% !important; }\n  toast-bar .toast-bar__details {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: 100%; } }"; },
            enumerable: true,
            configurable: true
        });
        return ToastBar;
    }());
    exports.IconList = LandingPage;
    exports.LandingPage = LandingPage$1;
    exports.ToastBar = ToastBar;
    Object.defineProperty(exports, '__esModule', { value: true });
});
