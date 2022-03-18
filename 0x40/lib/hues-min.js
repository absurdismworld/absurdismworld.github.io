(() => {
    var e = {
            17: () => {
                ! function(e, t) {
                    "use strict";
                    e.HuesCanvas = class {
                        constructor(i, n) {
                            n.addEventListener("settingsupdated", this.settingsUpdated.bind(this)), this.core = n, this.baseWidth = 1280, this.baseHeight = 720, this.blurIterations = null, this.blurDelta = null, this.blurAlpha = null, this.trippyRadius = 0, this.setBlurQuality("high"), this.canvas = t.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.canvas.width = this.baseWidth, this.canvas.height = this.baseHeight, this.canvas.className = "hues-canvas", i.appendChild(this.canvas), this.offCanvas = t.createElement("canvas"), this.offContext = this.offCanvas.getContext("2d"), e.addEventListener("resize", this.resize.bind(this)), this.resize()
                        }
                        settingsUpdated() {
                            this.setBlurQuality(this.core.settings.blurQuality)
                        }
                        setBlurQuality(e) {
                            this.blurIterations = {
                                low: -1,
                                medium: 11,
                                high: 19,
                                extreme: 35
                            } [e], this.blurDelta = 1 / (this.blurIterations / 2), this.blurAlpha = 1 / (this.blurIterations / 2)
                        }
                        resize() {
                            let e = this.core.root.clientHeight,
                                t = this.core.root.clientWidth / e;
                            this.canvas.height = Math.min(e, this.baseHeight), this.canvas.width = Math.ceil(this.canvas.height * t), this.offCanvas.height = this.canvas.height, this.offCanvas.width = this.canvas.width, this.trippyRadius = Math.max(this.canvas.width, this.canvas.height) / 2
                        }
                        draw(e) {
                            let t, i = this.canvas.width,
                                n = this.canvas.height;
                            if (this.context.globalAlpha = 1, this.context.globalCompositeOperation = "source-over", e.overlayPercent >= 1) return this.context.fillStyle = this.intToHex(e.overlayColour), this.context.fillRect(0, 0, i, n), void(e.invert && this.drawInvert());
                            if (this.context.fillStyle = "#FFF", this.context.fillRect(0, 0, i, n), e.bitmap) {
                                let s = e.bitmap.height * (n / e.bitmap.height),
                                    a = e.bitmap.width / e.bitmap.height * s;
                                switch (e.bitmapAlign) {
                                    case "left":
                                        t = 0;
                                        break;
                                    case "right":
                                        t = i - a;
                                        break;
                                    default:
                                        t = i / 2 - a / 2
                                }
                                e.slices && (e.bitmap = this.drawSlice(e.slices, e.bitmap, a, s, i, n), a = i, s = n), e.xBlur || e.yBlur ? this.drawBlur(e.bitmap, t, a, s, e.xBlur, e.yBlur) : (this.context.globalAlpha = 1, this.context.drawImage(e.bitmap, t, 0, a, s))
                            }
                            e.outTrippy || e.inTrippy ? this.drawTrippy(e.outTrippy, e.inTrippy, e.colour, i, n) : (this.offContext.fillStyle = this.intToHex(e.colour), this.offContext.fillRect(0, 0, i, n)), this.context.globalAlpha = .7, this.context.globalCompositeOperation = e.blendMode, this.context.drawImage(this.offCanvas, 0, 0), e.overlayPercent > 0 && (this.context.globalAlpha = e.overlayPercent, this.context.fillStyle = this.intToHex(e.overlayColour), this.context.fillRect(0, 0, i, n)), e.invert && this.drawInvert()
                        }
                        drawInvert() {
                            this.context.globalAlpha = 1, this.context.globalCompositeOperation = "difference", this.context.fillStyle = "#FFF", this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
                        }
                        drawSlice(e, t, i, n, s, a) {
                            this.offContext.clearRect(0, 0, s, a);
                            let r = 0,
                                o = 0;
                            for (let s = 0; s < e.x.count; s++) {
                                let a = e.x.segments[s],
                                    l = e.x.distances[s] * e.x.percent * this.canvas.width,
                                    h = Math.ceil(a * t.width),
                                    d = Math.ceil(a * i),
                                    c = 0,
                                    u = 0;
                                for (let i = 0; i < e.y.count; i++) {
                                    let s = e.y.segments[i],
                                        a = e.y.distances[i] * e.y.percent * this.canvas.width,
                                        p = Math.ceil(s * t.height),
                                        m = Math.ceil(s * n);
                                    this.offContext.drawImage(t, r, c, h, p, o + a, u + l, d, m), c += p, u += m
                                }
                                r += h, o += d
                            }
                            return this.offCanvas
                        }
                        drawBlur(e, t, i, n, s, a) {
                            let r;
                            if (this.context.globalAlpha = this.blurAlpha, s)
                                if (r = 720 * s, this.blurIterations < 0) this.context.globalAlpha = 1, this.context.drawImage(e, Math.floor(t - r / 2), 0, i + r, n);
                                else
                                    for (let s = -1; s <= 1; s += this.blurDelta) this.context.drawImage(e, Math.floor(r * s) + t, 0, i, n);
                            else if (a)
                                if (r = 720 * a, this.blurIterations < 0) this.context.globalAlpha = 1, this.context.drawImage(e, t, Math.floor(-r / 2), i, n + this.blurDistance);
                                else
                                    for (let s = -1; s <= 1; s += this.blurDelta) this.context.drawImage(e, t, Math.floor(r * s), i, n)
                        }
                        drawTrippy(e, t, i, n, s) {
                            let a, r;
                            (e *= this.trippyRadius) > (t *= this.trippyRadius) ? (r = !0, a = [e, t]) : (r = !1, a = [t, e]);
                            let o = this.intToHex(16777215 ^ i),
                                l = this.intToHex(i);
                            this.offContext.fillStyle = r ? o : l, this.offContext.fillRect(0, 0, n, s);
                            let h = !r;
                            for (let e = 0; e < 2; e++) 0 !== a[e] && (this.offContext.beginPath(), this.offContext.fillStyle = this.intToHex(h ? o : l), this.offContext.arc(n / 2, s / 2, Math.floor(a[e]), 0, 2 * Math.PI, !1), this.offContext.fill(), this.offContext.closePath(), h = !h)
                        }
                        intToHex(e) {
                            return "#" + ("00000" + e.toString(16)).slice(-6)
                        }
                    }
                }(window, document)
            },
            307: () => {
                ! function(e, t) {
                    "use strict";
                    const i = ["x Vertical blur (snare)", "o Horizontal blur (bass)", "- No blur", "+ Blackout", "¤ Whiteout", "| Short blackout", ": Color only", "* Image only", "X Vertical blur only", "O Horizontal blur only", ") Trippy cirle in", "( Trippy circle out", "~ Fade color", "= Fade and change image", "i Invert all colours", "I Invert & change image", "s Horizontal slice", "S Horizontal slice and change image", "v Vertical slice", "V Vertical slice and change image", "# Double slice", "@ Double slice and change image"],
                        n = ["↑↓  Change song", "←→  Change image", "[N] Random song", "-+  Change volume", "[M] Toggle mute", "[B] Restart song from build", "[F] Toggle automode", "[H] Toggle UI hide", "[C] Character list", "[S] Song list", "[W] Toggle window", "[O] Options", "[I] Information", "[1-6] Change UI"];
                    let s = function(e, i, n) {
                        let s = t.createElement("div");
                        s.className = "hues-ref__info", e.appendChild(s);
                        let a = t.createElement("h3");
                        a.textContent = i, s.appendChild(a);
                        let r = t.createElement("ul");
                        n.forEach((function(e) {
                            let i = t.createElement("li");
                            i.textContent = e, r.appendChild(i)
                        })), s.appendChild(r)
                    };
                    e.populateHuesInfo = function(e, a, r) {
                        if (!r.enableWindow) return;
                        (parseInt(e) / 10).toFixed(1);
                        let o = t.createElement("div");
                        o.className = "hues-ref";
                        let l = r.huesName.replace("%VERSION%", e),
                            h = t.createElement("div");
                        h.className = "hues-about", h.innerHTML = "<h1>" + l + '</h1><h2>Adapted from the <a target="_blank" href="http://0x40hues.blogspot.com">0x40 Flash</a></h2><h2>Web-ified by <a target="_blank" href="https://github.com/mon">mon</a></h2><h3>With help from <a target="_blank" href="https://github.com/kepstin/0x40hues-html5">Kepstin</a></h3><br>Editor/Resource manager functions have been disabled here. <br>For Editor/Resource manager functionality visit the creators mirror here: <a target="_blank" href="https://0x40.mon.im">0x40.mon.im</a>. <br>Have fun and enjoy the tunes!', o.appendChild(h), s(o, "Beat glossary", i), s(o, "Keyboard shortcuts", n), a.addTab("INFO", o)
                    }
                }(window, document)
            },
            744: () => {
                ! function(e, t) {
                    "use strict";
                    e.HuesWindow = class {
                        constructor(e, i) {
                            if (this.eventListeners = {
                                    windowshown: [],
                                    tabselected: []
                                }, this.hasUI = i.enableWindow, !this.hasUI) return;
                            this.window = t.createElement("div"), this.window.className = "hues-win-helper", e.appendChild(this.window);
                            let n = t.createElement("div");
                            n.className = "hues-win", this.window.appendChild(n);
                            let s = t.createElement("div");
                            s.className = "hues-win__closebtn", s.onclick = this.hide.bind(this), n.appendChild(s), this.tabContainer = t.createElement("div"), this.tabContainer.className = "hues-win__tabs", n.appendChild(this.tabContainer), this.contentContainer = t.createElement("div"), this.contentContainer.className = "hues-win__content", n.appendChild(this.contentContainer), this.contents = [], this.tabs = [], this.tabNames = [], i.showWindow ? this.show() : this.hide()
                        }
                        addTab(e, i) {
                            if (!this.hasUI) return;
                            let n = t.createElement("div");
                            n.textContent = e, n.className = "tab-label", n.onclick = this.selectTab.bind(this, e), this.tabContainer.appendChild(n), this.tabs.push(n), this.tabNames.push(e);
                            let s = t.createElement("div");
                            s.className = "tab-content", s.appendChild(i), this.contentContainer.appendChild(s), this.contents.push(s)
                        }
                        selectTab(e, t) {
                            if (this.hasUI) {
                                t || this.show();
                                for (let t = 0; t < this.tabNames.length; t++) {
                                    let i = this.tabNames[t];
                                    e.toLowerCase() == i.toLowerCase() ? (this.contents[t].classList.add("tab-content--active"), this.tabs[t].classList.add("tab-label--active"), this.callEventListeners("tabselected", i)) : (this.contents[t].classList.remove("tab-content--active"), this.tabs[t].classList.remove("tab-label--active"))
                                }
                            }
                        }
                        hide() {
                            this.hasUI && (this.window.classList.add("hidden"), this.callEventListeners("windowshown", !1))
                        }
                        show() {
                            this.hasUI && (this.window.classList.remove("hidden"), this.callEventListeners("windowshown", !0))
                        }
                        toggle() {
                            this.hasUI && (this.window.classList.contains("hidden") ? this.show() : this.hide())
                        }
                        callEventListeners(e) {
                            let t = Array.prototype.slice.call(arguments, 1);
                            this.eventListeners[e].forEach((function(e) {
                                e.apply(null, t)
                            }))
                        }
                        addEventListener(e, t) {
                            if (e = e.toLowerCase(), void 0 === this.eventListeners[e]) throw Error("Unknown event: " + e);
                            this.eventListeners[e].push(t)
                        }
                        removeEventListener(e, t) {
                            if (e = e.toLowerCase(), void 0 === this.eventListeners[e]) throw Error("Unknown event: " + e);
                            this.eventListeners[e] = this.eventListeners[e].filter((function(e) {
                                return e !== t
                            }))
                        }
                    }
                }(window, document)
            },
            358: () => {
                ! function(e, t) {
                    "use strict";
                    let i = atob("T2dnUwACAAAAAAAAAADFYgAAAAAAAMLKRdwBHgF2b3JiaXMAAAAAAUSsAAAAAAAAgLsAAAAAAAC4AU9nZ1MAAAAAAAAAAAAAxWIAAAEAAACcKCV2Dzv/////////////////MgN2b3JiaXMrAAAAWGlwaC5PcmcgbGliVm9yYmlzIEkgMjAxMjAyMDMgKE9tbmlwcmVzZW50KQAAAAABBXZvcmJpcx9CQ1YBAAABABhjVClGmVLSSokZc5QxRplikkqJpYQWQkidcxRTqTnXnGusubUghBAaU1ApBZlSjlJpGWOQKQWZUhBLSSV0EjonnWMQW0nB1phri0G2HIQNmlJMKcSUUopCCBlTjCnFlFJKQgcldA465hxTjkooQbicc6u1lpZji6l0kkrnJGRMQkgphZJKB6VTTkJINZbWUikdc1JSakHoIIQQQrYghA2C0JBVAAABAMBAEBqyCgBQAAAQiqEYigKEhqwCADIAAASgKI7iKI4jOZJjSRYQGrIKAAACABAAAMBwFEmRFMmxJEvSLEvTRFFVfdU2VVX2dV3XdV3XdSA0ZBUAAAEAQEinmaUaIMIMZBgIDVkFACAAAABGKMIQA0JDVgEAAAEAAGIoOYgmtOZ8c46DZjloKsXmdHAi1eZJbirm5pxzzjknm3PGOOecc4pyZjFoJrTmnHMSg2YpaCa05pxznsTmQWuqtOacc8Y5p4NxRhjnnHOatOZBajbW5pxzFrSmOWouxeaccyLl5kltLtXmnHPOOeecc84555xzqhenc3BOOOecc6L25lpuQhfnnHM+Gad7c0I455xzzjnnnHPOOeecc4LQkFUAABAAAEEYNoZxpyBIn6OBGEWIacikB92jwyRoDHIKqUejo5FS6iCUVMZJKZ0gNGQVAAAIAAAhhBRSSCGFFFJIIYUUUoghhhhiyCmnnIIKKqmkoooyyiyzzDLLLLPMMuuws8467DDEEEMMrbQSS0211VhjrbnnnGsO0lpprbXWSimllFJKKQgNWQUAgAAAEAgZZJBBRiGFFFKIIaaccsopqKACQkNWAQCAAAACAAAAPMlzREd0REd0REd0REd0RMdzPEeUREmUREm0TMvUTE8VVdWVXVvWZd32bWEXdt33dd/3dePXhWFZlmVZlmVZlmVZlmVZlmVZgtCQVQAACAAAgBBCCCGFFFJIIaUYY8wx56CTUEIgNGQVAAAIACAAAADAURzFcSRHciTJkixJkzRLszzN0zxN9ERRFE3TVEVXdEXdtEXZlE3XdE3ZdFVZtV1Ztm3Z1m1flm3f933f933f933f933f93UdCA1ZBQBIAADoSI6kSIqkSI7jOJIkAaEhqwAAGQAAAQAoiqM4juNIkiRJlqRJnuVZomZqpmd6qqgCoSGrAABAAAABAAAAAAAomuIppuIpouI5oiNKomVaoqZqriibsuu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6LhAasgoAkAAA0JEcyZEcSZEUSZEcyQFCQ1YBADIAAAIAcAzHkBTJsSxL0zzN0zxN9ERP9ExPFV3RBUJDVgEAgAAAAgAAAAAAMCTDUixHczRJlFRLtVRNtVRLFVVPVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVNU3TNE0gNGQlAAAEAMBijcHlICElJeXeEMIQk54xJiG1XiEEkZLeMQYVg54yogxy3kLjEIMeCA1ZEQBEAQAAxiDHEHPIOUepkxI556h0lBrnHKWOUmcpxZhizSiV2FKsjXOOUketo5RiLC12lFKNqcYCAAACHAAAAiyEQkNWBABRAACEMUgppBRijDmnnEOMKeeYc4Yx5hxzjjnnoHRSKuecdE5KxBhzjjmnnHNSOieVc05KJ6EAAIAABwCAAAuh0JAVAUCcAIBBkjxP8jRRlDRPFEVTdF1RNF3X8jzV9ExTVT3RVFVTVW3ZVFVZljzPND3TVFXPNFXVVFVZNlVVlkVV1W3TdXXbdFXdlm3b911bFnZRVW3dVF3bN1XX9l3Z9n1Z1nVj8jxV9UzTdT3TdGXVdW1bdV1d90xTlk3XlWXTdW3blWVdd2XZ9zXTdF3TVWXZdF3ZdmVXt11Z9n3TdYXflWVfV2VZGHZd94Vb15XldF3dV2VXN1ZZ9n1b14Xh1nVhmTxPVT3TdF3PNF1XdV1fV13X1jXTlGXTdW3ZVF1ZdmXZ911X1nXPNGXZdF3bNl1Xll1Z9n1XlnXddF1fV2VZ+FVX9nVZ15Xh1m3hN13X91VZ9oVXlnXh1nVhuXVdGD5V9X1TdoXhdGXf14XfWW5dOJbRdX1hlW3hWGVZOX7hWJbd95VldF1fWG3ZGFZZFoZf+J3l9n3jeHVdGW7d58y67wzH76T7ytPVbWOZfd1ZZl93juEYOr/w46mqr5uuKwynLAu/7evGs/u+soyu6/uqLAu/KtvCseu+8/y+sCyj7PrCasvCsNq2Mdy+biy/cBzLa+vKMeu+UbZ1fF94CsPzdHVdeWZdx/Z1dONHOH7KAACAAQcAgAATykChISsCgDgBAI8kiaJkWaIoWZYoiqbouqJouq6kaaapaZ5pWppnmqZpqrIpmq4saZppWp5mmpqnmaZomq5rmqasiqYpy6ZqyrJpmrLsurJtu65s26JpyrJpmrJsmqYsu7Kr267s6rqkWaapeZ5pap5nmqZqyrJpmq6reZ5qep5oqp4oqqpqqqqtqqosW55nmproqaYniqpqqqatmqoqy6aq2rJpqrZsqqptu6rs+rJt67ppqrJtqqYtm6pq267s6rIs27ovaZppap5nmprnmaZpmrJsmqorW56nmp4oqqrmiaZqqqosm6aqypbnmaoniqrqiZ5rmqoqy6Zq2qppmrZsqqotm6Yqy65t+77ryrJuqqpsm6pq66ZqyrJsy77vyqruiqYpy6aq2rJpqrIt27Lvy7Ks+6JpyrJpqrJtqqouy7JtG7Ns+7pomrJtqqYtm6oq27It+7os27rvyq5vq6qs67It+7ru+q5w67owvLJs+6qs+ror27pv6zLb9n1E05RlUzVt21RVWXZl2fZl2/Z90TRtW1VVWzZN1bZlWfZ9WbZtYTRN2TZVVdZN1bRtWZZtYbZl4XZl2bdlW/Z115V1X9d949dl3ea6su3Lsq37qqv6tu77wnDrrvAKAAAYcAAACDChDBQashIAiAIAAIxhjDEIjVLOOQehUco55yBkzkEIIZXMOQghlJI5B6GUlDLnIJSSUgihlJRaCyGUlFJrBQAAFDgAAATYoCmxOEChISsBgFQAAIPjWJbnmaJq2rJjSZ4niqqpqrbtSJbniaJpqqptW54niqapqq7r65rniaJpqqrr6rpomqapqq7ruroumqKpqqrrurKum6aqqq4ru7Ls66aqqqrryq4s+8Kquq4ry7Jt68Kwqq7ryrJs27Zv3Lqu677v+8KRreu6LvzCMQxHAQDgCQ4AQAU2rI5wUjQWWGjISgAgAwCAMAYhgxBCBiGEkFJKIaWUEgAAMOAAABBgQhkoNGRFABAnAAAYQymklFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSCmllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSqmklFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimVUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFIKAJCKcACQejChDBQashIASAUAAIxRSinGnIMQMeYYY9BJKClizDnGHJSSUuUchBBSaS23yjkIIaTUUm2Zc1JaizHmGDPnpKQUW805h1JSi7HmmmvupLRWa64151paqzXXnHPNubQWa64515xzyzHXnHPOOecYc84555xzzgUA4DQ4AIAe2LA6wknRWGChISsBgFQAAAIZpRhzzjnoEFKMOecchBAihRhzzjkIIVSMOeccdBBCqBhzzDkIIYSQOecchBBCCCFzDjroIIQQQgcdhBBCCKGUzkEIIYQQSighhBBCCCGEEDoIIYQQQgghhBBCCCGEUkoIIYQQQgmhlFAAAGCBAwBAgA2rI5wUjQUWGrISAAACAIAclqBSzoRBjkGPDUHKUTMNQkw50ZliTmozFVOQORCddBIZakHZXjILAACAIAAgwAQQGCAo+EIIiDEAAEGIzBAJhVWwwKAMGhzmAcADRIREAJCYoEi7uIAuA1zQxV0HQghCEIJYHEABCTg44YYn3vCEG5ygU1TqIAAAAAAADADgAQDgoAAiIpqrsLjAyNDY4OjwCAAAAAAAFgD4AAA4PoCIiOYqLC4wMjQ2ODo8AgAAAAAAAAAAgICAAAAAAABAAAAAgIBPZ2dTAAQBAAAAAAAAAMViAAACAAAA22A/JwIBAQAK"),
                        n = new ArrayBuffer(i.length),
                        s = new Uint8Array(n);
                    for (let e = 0; e < i.length; e++) s[e] = i.charCodeAt(e);
                    let a = atob("//tQxAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAACcQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//////////////////////////////////////////////////////////////////8AAAA5TEFNRTMuMTAwAaUAAAAAAAAAABRAJAa/QgAAQAAAAnFDELIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7UMQAA8AAAaQAAAAgAAA0gAAABExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1LEXYPAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ=="),
                        r = new ArrayBuffer(a.length),
                        o = new Uint8Array(r);
                    for (let e = 0; e < a.length; e++) o[e] = a.charCodeAt(e);
                    e.SoundManager = class {
                        constructor(e, t = 1) {
                            this.eventListeners = {
                                seek: []
                            }, this.core = e, this.playing = !1, this.playbackRate = 1, this.song = null, this.initPromise = null, this.lockedPromise = null, this.locked = !0, this.context = null, this.oggSupport = !1, this.mp3IsSane = !1, this.buildSource = null, this.loopSource = null, this.buildup = null, this.loop = null, this.startTime = 0, this.buildLength = 0, this.loopLength = 0, this.gainNode = null, this.replayGainNode = null, this.mute = !1, this.lastVol = t, this.vReady = !1, this.vBars = 0, this.vTotalBars = 0, this.splitter = null, this.analysers = [], this.analyserArrays = [], this.logArrays = [], this.binCutoffs = [], this.linBins = 0, this.logBins = 0, this.maxBinLin = 0
                        }
                        callEventListeners(e) {
                            let t = Array.prototype.slice.call(arguments, 1);
                            this.eventListeners[e].forEach((function(e) {
                                e.apply(null, t)
                            }))
                        }
                        addEventListener(e, t) {
                            if (e = e.toLowerCase(), void 0 === this.eventListeners[e]) throw Error("Unknown event: " + e);
                            this.eventListeners[e].push(t)
                        }
                        removeEventListener(e, t) {
                            if (e = e.toLowerCase(), void 0 === this.eventListeners[e]) throw Error("Unknown event: " + e);
                            this.eventListeners[e] = this.eventListeners[e].filter((function(e) {
                                return e !== t
                            }))
                        }
                        init() {
                            return this.initPromise || (this.initPromise = new Promise(((t, i) => {
                                try {
                                    e.AudioContext = e.AudioContext || e.webkitAudioContext, AudioContext.prototype.suspend = AudioContext.prototype.suspend || (() => Promise.resolve()), AudioContext.prototype.resume = AudioContext.prototype.resume || (() => Promise.resolve()), this.context = new e.AudioContext, this.gainNode = this.context.createGain(), this.replayGainNode = this.context.createGain(), this.gainNode.connect(this.context.destination), this.replayGainNode.connect(this.gainNode)
                                } catch (e) {
                                    return void i(Error("Web Audio API not supported in this browser."))
                                }
                                t()
                            })).then((() => new Promise(((e, t) => {
                                this.context.decodeAudioData(n, (t => {
                                    this.oggSupport = !0, e()
                                }), (t => {
                                    this.oggSupport = !1, e()
                                }))
                            })))).then((() => new Promise(((e, t) => {
                                this.context.decodeAudioData(r, (t => {
                                    this.mp3IsSane = t.length < 10, e()
                                }), (t => {
                                    this.mp3IsSane = !1, e()
                                }))
                            })))).then((() => !(!this.oggSupport || !this.mp3IsSane) || new Promise(((e, t) => {
                                let i;
                                try {
                                    i = this.createWorker()
                                } catch (e) {
                                    return console.log(e), void t(Error("Audio Worker cannot be started - correct path set in defaults?"))
                                }
                                i.addEventListener("message", (t => {
                                    i.terminate(), e()
                                }), !1), i.addEventListener("error", (() => {
                                    t(Error("Audio Worker cannot be started - correct path set in defaults?"))
                                }), !1), i.postMessage({
                                    ping: !0,
                                    ogg: this.oggSupport,
                                    mp3: this.mp3IsSane
                                })
                            })))).then((() => {
                                this.locked = "running" != this.context.state
                            }))), this.initPromise
                        }
                        unlock() {
                            return this.lockedPromise || (this.lockedPromise = new Promise(((t, i) => {
                                let n = () => {
                                    let i = this.context.createBuffer(1, 1, 22050),
                                        s = this.context.createBufferSource();
                                    s.buffer = i, s.connect(this.context.destination), s.start(0), e.removeEventListener("touchend", n), e.removeEventListener("click", n), this.core.clearMessage(), t()
                                };
                                e.addEventListener("touchend", n, !1), e.addEventListener("click", n, !1)
                            }))), this.lockedPromise
                        }
                        playSong(e, t, i) {
                            let n = Promise.resolve();
                            return this.song != e || i ? (this.stop(), this.song = e, e && e.sound ? (this.gainNode.gain.cancelScheduledValues(0), this.setVolume(this.lastVol), this.mute && this.setMute(!0), n = n.then((() => this.loadSong(e))).then((t => e != this.song ? Promise.reject("Song changed between load and play - this message can be ignored") : (this.buildup = t.buildup, this.buildLength = this.buildup ? this.buildup.duration : 0, this.loop = t.loop, this.loopLength = this.loop.duration, this.context.suspend()))).then((() => (t ? this.seek(-this.buildLength, !0) : this.seek(0, !0), this.context.resume()))).then((() => {
                                this.playing = !0
                            })), n) : n) : n
                        }
                        stop(e) {
                            this.playing && (this.buildSource && (this.buildSource.stop(0), this.buildSource.disconnect(), this.buildSource = null, e || (this.buildup = null)), this.loopSource.stop(0), this.loopSource.disconnect(), this.loopSource = null, e || (this.loop = null), this.vReady = !1, this.playing = !1, this.startTime = 0)
                        }
                        setRate(e) {
                            e = Math.max(Math.min(e, 2), .25);
                            let t = this.clampedTime;
                            this.playbackRate = e, this.seek(t)
                        }
                        seek(e, t) {
                            if (!this.song) return;
                            if (this.callEventListeners("seek"), e = Math.min(Math.max(e, -this.buildLength), this.loopLength), this.stop(!0), !this.loop) return;
                            this.loopSource = this.context.createBufferSource(), this.loopSource.buffer = this.loop, this.loopSource.playbackRate.value = this.playbackRate, this.loopSource.loop = !0, this.loopSource.loopStart = 0, this.loopSource.loopEnd = this.loopLength, this.loopSource.connect(this.replayGainNode), e < 0 && this.buildup ? (this.buildSource = this.context.createBufferSource(), this.buildSource.buffer = this.buildup, this.buildSource.playbackRate.value = this.playbackRate, this.buildSource.connect(this.replayGainNode), this.buildSource.start(0, this.buildLength + e), this.loopSource.start(this.context.currentTime - e / this.playbackRate)) : this.loopSource.start(0, e);
                            let i = this.loop.replayGain;
                            this.buildup && (i = Math.min(i, this.buildup.replayGain)), this.replayGainNode.gain.setValueAtTime(i, this.context.currentTime), this.startTime = this.context.currentTime - e / this.playbackRate, t || (this.playing = !0), this.initVisualiser(), this.core.recalcBeatIndex()
                        }
                        get currentTime() {
                            return this.playing ? (this.context.currentTime - this.startTime) * this.playbackRate : 0
                        }
                        get clampedTime() {
                            let e = this.currentTime;
                            return e > 0 && (e %= this.loopLength), e
                        }
                        loadSong(e) {
                            if (e._loadPromise) return Promise.reject("Song changed between load and play - this message can be ignored");
                            let t = {
                                    loop: null,
                                    buildup: null
                                },
                                i = [this.loadBuffer(e, "sound").then((e => {
                                    t.loop = e
                                }))];
                            return e.buildup ? i.push(this.loadBuffer(e, "buildup").then((e => {
                                t.buildup = e
                            }))) : this.buildLength = 0, e._loadPromise = Promise.all(i).then((() => (e._loadPromise = null, t))), e._loadPromise
                        }
                        loadBuffer(e, t) {
                            let i = e[t],
                                n = new Uint8Array(i);
                            if (this.oggSupport && 79 == n[0] && 103 == n[1] && 103 == n[2] && 83 == n[3] || this.mp3IsSane && 255 == n[0] && (251 == n[1] || 250 == n[1] || 242 == n[1] || 243 == n[1]) || 73 == n[0] && 68 == n[1] && 51 == n[2]) {
                                let n = i.slice(0);
                                return new Promise(((e, t) => {
                                    this.context.decodeAudioData(i, (t => {
                                        e(t)
                                    }), (e => {
                                        t(Error("decodeAudioData failed to load track"))
                                    }))
                                })).then((i => (e[t] = n, this.applyGain(i), i)))
                            }
                            return new Promise(((n, s) => {
                                let a = this.createWorker();
                                a.addEventListener("error", (() => {
                                    s(Error("Audio Worker failed to convert track"))
                                }), !1), a.addEventListener("message", (i => {
                                    let r = i.data;
                                    if (a.terminate(), e[t] = r.arrayBuffer, r.error) return void s(new Error(r.error));
                                    let o = this.audioBufFromRaw(r.rawAudio);
                                    this.applyGain(o), n(o)
                                }), !1), a.postMessage({
                                    buffer: i,
                                    ogg: this.oggSupport,
                                    mp3: this.mp3IsSane
                                }, [i])
                            }))
                        }
                        audioBufFromRaw(e) {
                            let t = e.array,
                                i = e.channels,
                                n = t.length / i,
                                s = this.context.createBuffer(i, n, e.sampleRate);
                            for (let e = 0; e < i; e++) {
                                let i = new Float32Array(t.buffer, e * n * 4, n);
                                "function" == typeof s.copyToChannel ? s.copyToChannel(i, e, 0) : s.getChannelData(e).set(i)
                            }
                            return s
                        }
                        applyGain(e) {
                            let t = e.getChannelData(0);
                            console.log(e);
                            for (var i = Math.floor(.05 * e.sampleRate), n = [], s = 0, a = 0; a < t.length; a++) s += Math.pow(t[a], 2), a % i == 0 && (s = Math.sqrt(s / i), n.push(s), s = 0);
                            n.sort((function(e, t) {
                                return e - t
                            }));
                            var r = 1 / n[Math.floor(.95 * n.length)];
                            r = Math.max(r, .02), r = Math.min(r, 100), e.replayGain = r / 8
                        }
                        createWorker() {
                            return new Worker(this.core.settings.workersPath + "audio-worker.js")
                        }
                        initVisualiser(e) {
                            e || (e = this.vTotalBars), this.vReady = !1, this.vTotalBars = e;
                            for (let e = 0; e < this.analysers.length; e++) this.analysers[e].disconnect();
                            this.splitter && (this.splitter.disconnect(), this.splitter = null), this.analysers = [], this.analyserArrays = [], this.logArrays = [], this.binCutoffs = [], this.linBins = 0, this.logBins = 0, this.maxBinLin = 0, this.attachVisualiser()
                        }
                        attachVisualiser() {
                            if (!this.playing || this.vReady) return;
                            let e = this.loopSource.channelCount;
                            this.splitter = this.context.createChannelSplitter(e), this.loopSource.connect(this.splitter), this.buildSource && this.buildSource.connect(this.splitter), this.vBars = Math.floor(this.vTotalBars / e);
                            for (let t = 0; t < e; t++) {
                                let e = this.context.createAnalyser();
                                try {
                                    e.fftSize = 8192
                                } catch (t) {
                                    e.fftSize = 2048
                                }
                                e.smoothingTimeConstant = .6, e.minDecibels = -70, e.maxDecibels = -25, this.analyserArrays.push(new Uint8Array(e.frequencyBinCount)), e.getByteTimeDomainData(this.analyserArrays[t]), this.splitter.connect(e, t), this.analysers.push(e), this.logArrays.push(new Uint8Array(this.vBars))
                            }
                            let t = this.analysers[0].frequencyBinCount,
                                i = this.loopSource.buffer.sampleRate / t;
                            this.maxBinLin = Math.floor(2e3 / i), this.linBins = Math.min(this.maxBinLin, Math.floor(this.vBars / 2)), Math.floor(22e3 / i);
                            let n = this.vBars - this.linBins,
                                s = Math.log2(2e3),
                                a = Math.log2(22e3) - s;
                            for (let e = 0; e < n; e++) {
                                let t = e * (a / n) + s,
                                    r = Math.pow(2, t),
                                    o = Math.floor(r / i);
                                this.binCutoffs.push(o)
                            }
                            this.vReady = !0
                        }
                        sumArray(e, t, i) {
                            let n = 0;
                            for (let s = t; s <= i; s++) n += e[s];
                            return n / (i - t + 1)
                        }
                        getVisualiserData() {
                            if (!this.vReady) return null;
                            for (let e = 0; e < this.analyserArrays.length; e++) {
                                let t = this.analyserArrays[e],
                                    i = this.logArrays[e];
                                this.analysers[e].getByteFrequencyData(t);
                                for (let e = 0; e < this.linBins; e++) {
                                    let n = Math.round(e * this.maxBinLin / this.linBins);
                                    i[e] = t[n]
                                }
                                i[this.linBins] = t[this.binCutoffs[0]];
                                for (let e = this.linBins + 1; e < this.vBars; e++) {
                                    let n = e - this.linBins;
                                    i[e] = this.sumArray(t, this.binCutoffs[n - 1], this.binCutoffs[n])
                                }
                            }
                            return this.logArrays
                        }
                        setMute(e) {
                            let t;
                            return !this.mute && e && (this.lastVol = this.gainNode.gain.value), t = e ? 0 : this.lastVol, this.gainNode.gain.setValueAtTime(t, this.context.currentTime), this.core.userInterface.updateVolume(t), this.mute = e, e
                        }
                        toggleMute() {
                            return this.setMute(!this.mute)
                        }
                        decreaseVolume() {
                            this.setMute(!1);
                            let e = Math.max(this.gainNode.gain.value - .1, 0);
                            this.setVolume(e)
                        }
                        increaseVolume() {
                            this.setMute(!1);
                            let e = Math.min(this.gainNode.gain.value + .1, 1);
                            this.setVolume(e)
                        }
                        setVolume(e) {
                            this.gainNode.gain.setValueAtTime(e, this.context.currentTime), this.lastVol = e, this.core.userInterface.updateVolume(e)
                        }
                        fadeOut(e) {
                            this.mute || (this.gainNode.gain.setValueAtTime(this.lastVol, this.context.currentTime), this.gainNode.gain.exponentialRampToValueAtTime(.01, this.context.currentTime + 2)), setTimeout(e, 2e3)
                        }
                    }
                }(window, document)
            },
            187: () => {
                String.prototype.score = function(e, t) {
                    if (this === e) return 1;
                    if ("" === e) return 0;
                    var i, n, s = 0,
                        a = this.toLowerCase(),
                        r = this.length,
                        o = e.toLowerCase(),
                        l = e.length;
                    i = 0;
                    var h, d, c = 1;
                    if (t && (h = 1 - t), t)
                        for (d = 0; d < l; d += 1) - 1 === (n = a.indexOf(o[d], i)) ? c += h : (i === n ? i = .7 : (i = .1, " " === this[n - 1] && (i += .8)), this[n] === e[d] && (i += .1), s += i, i = n + 1);
                    else
                        for (d = 0; d < l; d += 1) {
                            if (-1 === (n = a.indexOf(o[d], i))) return 0;
                            i === n ? i = .7 : (i = .1, " " === this[n - 1] && (i += .8)), this[n] === e[d] && (i += .1), s += i, i = n + 1
                        }
                    return s = .5 * (s / r + s / l) / c, o[0] === a[0] && .85 > s && (s += .15), s
                }
            },
            131: (e, t, i) => {
                "use strict";
                e.exports = i.p + "favicon.ico"
            },
            427: (e, t, i) => {
                "use strict";
                e.exports = i.p + "index.html"
            }
        },
        t = {};

    function i(n) {
        var s = t[n];
        if (void 0 !== s) return s.exports;
        var a = t[n] = {
            exports: {}
        };
        return e[n](a, a.exports, i), a.exports
    }
    i.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), (() => {
        var e;
        i.g.importScripts && (e = i.g.location + "");
        var t = i.g.document;
        if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
            var n = t.getElementsByTagName("script");
            n.length && (e = n[n.length - 1].src)
        }
        if (!e) throw new Error("Automatic publicPath is not supported in this browser");
        e = e.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), i.p = e + "../"
    })(), (() => {
        "use strict";
        i(17),
            function(e, t) {
                e.HuesRender = class {
                    constructor(t, i, n) {
                        this.render = new HuesCanvas(t, n), this.audio = i, i.addEventListener("seek", this.resetEffects.bind(this)), n.addEventListener("newsong", this.resetEffects.bind(this)), n.addEventListener("newimage", this.setImage.bind(this)), n.addEventListener("newcolour", this.setColour.bind(this)), n.addEventListener("beat", this.beat.bind(this)), n.addEventListener("invert", this.setInvert.bind(this)), n.addEventListener("settingsupdated", this.settingsUpdated.bind(this)), n.addEventListener("frame", this.animationLoop.bind(this)), n.addEventListener("songstarted", this.resetAnimation.bind(this)), this.core = n, this.needsRedraw = !1, this.colour = 16777215, this.image = null, this.smartAlign = !0, this.animTimeout = null, this.animFrame = null, this.lastBeat = 0, this.blurDecay = null, this.blurAmount = null, this.blurStart = 0, this.blurDistance = 0, this.xBlur = !1, this.yBlur = !1, this.sliceDistance = 0, this.sliceStart = 0, this.slices = {
                            x: this.makeSliceObj(25),
                            y: this.makeSliceObj(15)
                        }, this.trippyStart = [0, 0], this.trippyRadii = [0, 0], this.trippyOn = !1, this.blackout = !1, this.blackoutColour = 0, this.blackoutTimeout = null, this.bOpacity = 0, this.lastBlackout = 0, this.currentBlackout = -1, this.lastFrameBlack = !1, this.invert = !1, this.colourFade = !1, this.colourFadeStart = 0, this.colourFadeLength = 0, this.oldColour = 16777215, this.newColour = 16777215, this.blendMode = "hard-light", this.setBlurAmount("medium"), this.setBlurDecay("fast"), e.addEventListener("resize", this.resize.bind(this)), this.resize()
                    }
                    makeSliceObj(e) {
                        return {
                            count: 0,
                            percent: 0,
                            avgSegments: e,
                            segments: [],
                            distances: []
                        }
                    }
                    setInvert(e) {
                        this.invert = e, this.needsRedraw = !0
                    }
                    settingsUpdated() {
                        this.setSmartAlign(this.core.settings.smartAlign), this.setBlurAmount(this.core.settings.blurAmount), this.setBlurDecay(this.core.settings.blurDecay), this.trippyOn = "on" == this.core.settings.trippyMode
                    }
                    resetEffects() {
                        this.colourFadeStart = 0, this.colourFade = !1, this.trippyStart = [0, 0], this.sliceStart = 0, this.blurStart = 0, this.blurDistance = 0, this.xBlur = !1, this.yBlur = !1
                    }
                    resetAnimation() {
                        this.animTimeout = this.audio.currentTime
                    }
                    resize() {
                        this.needsRedraw = !0
                    }
                    redraw() {
                        let e = null,
                            t = null;
                        this.image && (this.image.bitmap || this.image.bitmaps) && (e = this.image.animated ? this.image.bitmaps[this.animFrame] : this.image.bitmap, t = this.smartAlign ? this.image.align : null);
                        let i = {
                            colour: this.colour,
                            blendMode: this.blendMode,
                            overlayColour: this.blackoutColour,
                            overlayPercent: this.bOpacity,
                            invert: this.invert,
                            bitmap: e,
                            bitmapAlign: t,
                            xBlur: this.xBlur ? this.blurDistance : 0,
                            yBlur: this.yBlur ? this.blurDistance : 0,
                            outTrippy: this.trippyRadii[1],
                            inTrippy: this.trippyRadii[0],
                            slices: this.sliceStart ? this.slices : null
                        };
                        this.render.draw(i)
                    }
                    animationLoop() {
                        if (this.colourFade) {
                            let e = (this.audio.currentTime - this.colourFadeStart) / this.colourFadeLength;
                            e >= 1 ? (this.stopFade(), this.colour = this.newColour) : this.mixColours(e), this.needsRedraw = !0
                        }
                        if (this.blackoutTimeout && this.audio.currentTime > this.blackoutTimeout && this.clearBlackout(), this.blackout ? (this.bOpacity = 10 * (this.audio.currentTime - this.blackoutStart), this.bOpacity >= 1 && (this.lastBlackout == this.currentBlackout || !this.lastFrameBlack) ? (this.lastFrameBlack = !0, this.lastBlackout = this.currentBlackout) : this.lastFrameBlack = !1) : this.bOpacity = 0, this.image && this.image.animated)
                            if (this.image.beatsPerAnim && this.core.currentSong && this.core.currentSong.charsPerBeat) {
                                let e = this.animFrame;
                                this.syncAnim(), this.animFrame != e && (this.needsRedraw = !0, this.animTimeout = this.audio.currentTime)
                            } else if (this.animTimeout < this.audio.currentTime)
                            for (; this.animTimeout < this.audio.currentTime;) this.animFrame++, this.animFrame %= this.image.frameDurations.length, this.animTimeout += this.image.frameDurations[this.animFrame] / 1e3, this.needsRedraw = !0;
                        if (this.blurStart) {
                            let e = this.audio.currentTime - this.blurStart + 1 / 30;
                            this.blurDistance = this.blurAmount * Math.exp(-this.blurDecay * e);
                            let t = this.blurDistance / this.blurAmount;
                            this.xBlur ? this.core.blurUpdated(t, 0) : this.core.blurUpdated(0, t)
                        }
                        if (this.sliceStart) {
                            let e, t = .8,
                                i = this.audio.currentTime;
                            if (i < this.sliceRampUp) e = this.sliceRampUp - i, this.sliceDistance = (1 - e / this.sliceTransitionTime) * t;
                            else if (i < this.sliceRampDown) {
                                e = this.sliceRampDown - i;
                                let n = this.sliceRampDown - this.sliceRampUp;
                                this.sliceDistance = t + (1 - e / n) * (1 - t)
                            } else {
                                let t = this.sliceRampDown + this.sliceTransitionTime;
                                i > t ? (this.sliceStart = 0, this.sliceDistance = 0) : (e = t - i, this.sliceDistance = e / this.sliceTransitionTime)
                            }
                            this.slices.x.percent = this.sliceDistance, this.slices.y.percent = this.sliceDistance, this.needsRedraw = !0
                        }
                        for (let e = 0; e < 2; e++)
                            if (this.trippyStart[e] || this.trippyRadii[e]) {
                                if (this.needsRedraw = !0, this.trippyRadii[e] = 2 * (this.audio.currentTime - this.trippyStart[e]), this.trippyRadii[e] > 1) {
                                    this.trippyStart[e] = 0, this.trippyRadii[e] = 0;
                                    continue
                                }
                                e % 2 == 0 && (this.trippyRadii[e] = 1 - this.trippyRadii[e])
                            } this.blurStart && this.blurDistance < 1e-4 ? (this.core.blurUpdated(0, 0), this.blurDistance = 0, this.blurStart = 0, this.xBlur = this.yBlur = !1, this.redraw()) : (this.blurStart || this.needsRedraw) && this.redraw()
                    }
                    setImage(e) {
                        this.image != e && (this.needsRedraw = !0, this.image = e, e && (e.bitmap || e.bitmaps) && e.animated && (this.animBeat = null, this.animFrame = 0, this.animTimeout = this.audio.currentTime + e.frameDurations[0] / 1e3, e.beatsPerAnim && this.core.currentSong && this.core.currentSong.charsPerBeat && this.syncAnim()))
                    }
                    beat() {
                        this.lastBeat = this.audio.currentTime
                    }
                    syncAnim() {
                        let e = this.core.currentSong;
                        if (!e) return;
                        let t = this.core.beatIndex;
                        if (this.lastBeat && this.core.getBeatLength()) {
                            let e = (this.audio.currentTime - this.lastBeat) / this.core.getBeatLength();
                            t += Math.min(e, 1)
                        }
                        let i = t / e.charsPerBeat % this.image.beatsPerAnim,
                            n = this.image.bitmaps.length;
                        this.animFrame = Math.floor(n * (i / this.image.beatsPerAnim)), this.image.syncOffset && (this.animFrame += this.image.syncOffset), this.animFrame = (this.animFrame % n + n) % n
                    }
                    setColour(e, t) {
                        e.c != this.colour && (t ? this.newColour = e.c : (this.stopFade(), this.colour = e.c), this.needsRedraw = !0)
                    }
                    doBlackout(e) {
                        void 0 === e && (e = !1), this.blackoutColour = e ? 16777215 : 0, this.blackoutTimeout = 0, this.blackout || (this.blackoutStart = this.audio.currentTime), this.blackout = !0, this.needsRedraw = !0, "on" == this.core.settings.blackoutUI && this.core.userInterface.hide()
                    }
                    clearBlackout() {
                        this.blackout = !1, this.blackoutTimeout = 0, this.needsRedraw = !0, "on" == this.core.settings.blackoutUI && this.core.userInterface.show()
                    }
                    doShortBlackout(e) {
                        this.doInstantBlackout(), this.blackoutTimeout = this.audio.currentTime + e / 1.7, this.currentBlackout++
                    }
                    doInstantBlackout() {
                        this.doBlackout(), this.blackoutStart = -Math.pow(2, 32)
                    }
                    doColourFade(e) {
                        this.colourFade = !0, this.colourFadeLength = e, this.colourFadeStart = this.audio.currentTime, this.oldColour = this.colour
                    }
                    stopFade() {
                        this.colourFade = !1, this.colourFadeStart = 0, this.colourFadeLength = 0
                    }
                    mixColours(e) {
                        e = Math.min(1, e);
                        let t = this.oldColour >> 16 & 255,
                            i = this.oldColour >> 8 & 255,
                            n = 255 & this.oldColour,
                            s = t * (1 - e) + (this.newColour >> 16 & 255) * e,
                            a = i * (1 - e) + (this.newColour >> 8 & 255) * e,
                            r = n * (1 - e) + (255 & this.newColour) * e;
                        this.colour = s << 16 | a << 8 | r
                    }
                    doXBlur() {
                        this.blurStart = this.audio.currentTime, this.trippyOn && (this.trippyStart[0] = this.blurStart), this.blurDistance = this.blurAmount, this.xBlur = !0, this.yBlur = !1, this.needsRedraw = !0
                    }
                    doYBlur() {
                        this.blurStart = this.audio.currentTime, this.trippyOn && (this.trippyStart[1] = this.blurStart), this.blurDistance = this.blurAmount, this.xBlur = !1, this.yBlur = !0, this.needsRedraw = !0
                    }
                    doTrippyX() {
                        let e = this.trippyOn;
                        this.trippyOn = !0, this.doXBlur(), this.trippyOn = e
                    }
                    doTrippyY() {
                        let e = this.trippyOn;
                        this.trippyOn = !0, this.doYBlur(), this.trippyOn = e
                    }
                    doSlice(e, t, i, n) {
                        let s = Math.min(.06, e);
                        this.sliceStart = this.audio.currentTime, this.sliceRampUp = this.sliceStart + s, this.sliceRampDown = this.sliceStart + e * t - s, this.sliceTransitionTime = s, i ? this.generateSliceSegments("x") : this.resetSliceSegments("x"), n ? this.generateSliceSegments("y") : this.resetSliceSegments("y"), this.needsRedraw = !0
                    }
                    generateSliceSegments(e) {
                        let t, i = 1 / this.slices[e].avgSegments,
                            n = i / 2,
                            s = 0;
                        for (t = 0;; t++) {
                            let a = i + Math.random() * n * 2 - n;
                            if (this.slices[e].segments[t] = a, s += a, this.slices[e].distances[t] = Math.random() * this.blurAmount - this.blurAmount / 2, s > 1) {
                                this.slices[e].segments[t] -= s - 1;
                                break
                            }
                        }
                        this.slices[e].count = t + 1
                    }
                    resetSliceSegments(e) {
                        this.slices[e].count = 1, this.slices[e].segments[0] = 1, this.slices[e].distances[0] = 0
                    }
                    setBlurDecay(e) {
                        this.blurDecay = {
                            slow: 7.8,
                            medium: 14.1,
                            fast: 20.8,
                            "faster!": 28.7
                        } [e]
                    }
                    setBlurAmount(e) {
                        this.blurAmount = {
                            low: .0375,
                            medium: .075,
                            high: .3
                        } [e]
                    }
                    setSmartAlign(e) {
                        this.smartAlign = "on" == e
                    }
                }
            }(window, document), i(307);
        const e = -2;

        function t(e) {
            return n(e.map((([e, t]) => new Array(e).fill(t, 0, e))))
        }

        function n(e) {
            return e.reduce(((e, t) => e.concat(Array.isArray(t) ? n(t) : t)), [])
        }
        const s = [0, 1, 2, 3].concat(...t([
            [2, 4],
            [2, 5],
            [4, 6],
            [4, 7],
            [8, 8],
            [8, 9],
            [16, 10],
            [16, 11],
            [32, 12],
            [32, 13],
            [64, 14],
            [64, 15],
            [2, 0],
            [1, 16],
            [1, 17],
            [2, 18],
            [2, 19],
            [4, 20],
            [4, 21],
            [8, 22],
            [8, 23],
            [16, 24],
            [16, 25],
            [32, 26],
            [32, 27],
            [64, 28],
            [64, 29]
        ]));

        function a() {
            const e = this;

            function t(e, t) {
                let i = 0;
                do {
                    i |= 1 & e, e >>>= 1, i <<= 1
                } while (--t > 0);
                return i >>> 1
            }
            e.build_tree = function(i) {
                const n = e.dyn_tree,
                    s = e.stat_desc.static_tree,
                    a = e.stat_desc.elems;
                let r, o, l, h = -1;
                for (i.heap_len = 0, i.heap_max = 573, r = 0; r < a; r++) 0 !== n[2 * r] ? (i.heap[++i.heap_len] = h = r, i.depth[r] = 0) : n[2 * r + 1] = 0;
                for (; i.heap_len < 2;) l = i.heap[++i.heap_len] = h < 2 ? ++h : 0, n[2 * l] = 1, i.depth[l] = 0, i.opt_len--, s && (i.static_len -= s[2 * l + 1]);
                for (e.max_code = h, r = Math.floor(i.heap_len / 2); r >= 1; r--) i.pqdownheap(n, r);
                l = a;
                do {
                    r = i.heap[1], i.heap[1] = i.heap[i.heap_len--], i.pqdownheap(n, 1), o = i.heap[1], i.heap[--i.heap_max] = r, i.heap[--i.heap_max] = o, n[2 * l] = n[2 * r] + n[2 * o], i.depth[l] = Math.max(i.depth[r], i.depth[o]) + 1, n[2 * r + 1] = n[2 * o + 1] = l, i.heap[1] = l++, i.pqdownheap(n, 1)
                } while (i.heap_len >= 2);
                i.heap[--i.heap_max] = i.heap[1],
                    function(t) {
                        const i = e.dyn_tree,
                            n = e.stat_desc.static_tree,
                            s = e.stat_desc.extra_bits,
                            a = e.stat_desc.extra_base,
                            r = e.stat_desc.max_length;
                        let o, l, h, d, c, u, p = 0;
                        for (d = 0; d <= 15; d++) t.bl_count[d] = 0;
                        for (i[2 * t.heap[t.heap_max] + 1] = 0, o = t.heap_max + 1; o < 573; o++) l = t.heap[o], d = i[2 * i[2 * l + 1] + 1] + 1, d > r && (d = r, p++), i[2 * l + 1] = d, l > e.max_code || (t.bl_count[d]++, c = 0, l >= a && (c = s[l - a]), u = i[2 * l], t.opt_len += u * (d + c), n && (t.static_len += u * (n[2 * l + 1] + c)));
                        if (0 !== p) {
                            do {
                                for (d = r - 1; 0 === t.bl_count[d];) d--;
                                t.bl_count[d]--, t.bl_count[d + 1] += 2, t.bl_count[r]--, p -= 2
                            } while (p > 0);
                            for (d = r; 0 !== d; d--)
                                for (l = t.bl_count[d]; 0 !== l;) h = t.heap[--o], h > e.max_code || (i[2 * h + 1] != d && (t.opt_len += (d - i[2 * h + 1]) * i[2 * h], i[2 * h + 1] = d), l--)
                        }
                    }(i),
                    function(e, i, n) {
                        const s = [];
                        let a, r, o, l = 0;
                        for (a = 1; a <= 15; a++) s[a] = l = l + n[a - 1] << 1;
                        for (r = 0; r <= i; r++) o = e[2 * r + 1], 0 !== o && (e[2 * r] = t(s[o]++, o))
                    }(n, e.max_code, i.bl_count)
            }
        }

        function r(e, t, i, n, s) {
            const a = this;
            a.static_tree = e, a.extra_bits = t, a.extra_base = i, a.elems = n, a.max_length = s
        }

        function o(e, t, i, n, s) {
            const a = this;
            a.good_length = e, a.max_lazy = t, a.nice_length = i, a.max_chain = n, a.func = s
        }
        a._length_code = [0, 1, 2, 3, 4, 5, 6, 7].concat(...t([
            [2, 8],
            [2, 9],
            [2, 10],
            [2, 11],
            [4, 12],
            [4, 13],
            [4, 14],
            [4, 15],
            [8, 16],
            [8, 17],
            [8, 18],
            [8, 19],
            [16, 20],
            [16, 21],
            [16, 22],
            [16, 23],
            [32, 24],
            [32, 25],
            [32, 26],
            [31, 27],
            [1, 28]
        ])), a.base_length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0], a.base_dist = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384, 24576], a.d_code = function(e) {
            return e < 256 ? s[e] : s[256 + (e >>> 7)]
        }, a.extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], a.extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], a.extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], a.bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], r.static_ltree = [12, 8, 140, 8, 76, 8, 204, 8, 44, 8, 172, 8, 108, 8, 236, 8, 28, 8, 156, 8, 92, 8, 220, 8, 60, 8, 188, 8, 124, 8, 252, 8, 2, 8, 130, 8, 66, 8, 194, 8, 34, 8, 162, 8, 98, 8, 226, 8, 18, 8, 146, 8, 82, 8, 210, 8, 50, 8, 178, 8, 114, 8, 242, 8, 10, 8, 138, 8, 74, 8, 202, 8, 42, 8, 170, 8, 106, 8, 234, 8, 26, 8, 154, 8, 90, 8, 218, 8, 58, 8, 186, 8, 122, 8, 250, 8, 6, 8, 134, 8, 70, 8, 198, 8, 38, 8, 166, 8, 102, 8, 230, 8, 22, 8, 150, 8, 86, 8, 214, 8, 54, 8, 182, 8, 118, 8, 246, 8, 14, 8, 142, 8, 78, 8, 206, 8, 46, 8, 174, 8, 110, 8, 238, 8, 30, 8, 158, 8, 94, 8, 222, 8, 62, 8, 190, 8, 126, 8, 254, 8, 1, 8, 129, 8, 65, 8, 193, 8, 33, 8, 161, 8, 97, 8, 225, 8, 17, 8, 145, 8, 81, 8, 209, 8, 49, 8, 177, 8, 113, 8, 241, 8, 9, 8, 137, 8, 73, 8, 201, 8, 41, 8, 169, 8, 105, 8, 233, 8, 25, 8, 153, 8, 89, 8, 217, 8, 57, 8, 185, 8, 121, 8, 249, 8, 5, 8, 133, 8, 69, 8, 197, 8, 37, 8, 165, 8, 101, 8, 229, 8, 21, 8, 149, 8, 85, 8, 213, 8, 53, 8, 181, 8, 117, 8, 245, 8, 13, 8, 141, 8, 77, 8, 205, 8, 45, 8, 173, 8, 109, 8, 237, 8, 29, 8, 157, 8, 93, 8, 221, 8, 61, 8, 189, 8, 125, 8, 253, 8, 19, 9, 275, 9, 147, 9, 403, 9, 83, 9, 339, 9, 211, 9, 467, 9, 51, 9, 307, 9, 179, 9, 435, 9, 115, 9, 371, 9, 243, 9, 499, 9, 11, 9, 267, 9, 139, 9, 395, 9, 75, 9, 331, 9, 203, 9, 459, 9, 43, 9, 299, 9, 171, 9, 427, 9, 107, 9, 363, 9, 235, 9, 491, 9, 27, 9, 283, 9, 155, 9, 411, 9, 91, 9, 347, 9, 219, 9, 475, 9, 59, 9, 315, 9, 187, 9, 443, 9, 123, 9, 379, 9, 251, 9, 507, 9, 7, 9, 263, 9, 135, 9, 391, 9, 71, 9, 327, 9, 199, 9, 455, 9, 39, 9, 295, 9, 167, 9, 423, 9, 103, 9, 359, 9, 231, 9, 487, 9, 23, 9, 279, 9, 151, 9, 407, 9, 87, 9, 343, 9, 215, 9, 471, 9, 55, 9, 311, 9, 183, 9, 439, 9, 119, 9, 375, 9, 247, 9, 503, 9, 15, 9, 271, 9, 143, 9, 399, 9, 79, 9, 335, 9, 207, 9, 463, 9, 47, 9, 303, 9, 175, 9, 431, 9, 111, 9, 367, 9, 239, 9, 495, 9, 31, 9, 287, 9, 159, 9, 415, 9, 95, 9, 351, 9, 223, 9, 479, 9, 63, 9, 319, 9, 191, 9, 447, 9, 127, 9, 383, 9, 255, 9, 511, 9, 0, 7, 64, 7, 32, 7, 96, 7, 16, 7, 80, 7, 48, 7, 112, 7, 8, 7, 72, 7, 40, 7, 104, 7, 24, 7, 88, 7, 56, 7, 120, 7, 4, 7, 68, 7, 36, 7, 100, 7, 20, 7, 84, 7, 52, 7, 116, 7, 3, 8, 131, 8, 67, 8, 195, 8, 35, 8, 163, 8, 99, 8, 227, 8], r.static_dtree = [0, 5, 16, 5, 8, 5, 24, 5, 4, 5, 20, 5, 12, 5, 28, 5, 2, 5, 18, 5, 10, 5, 26, 5, 6, 5, 22, 5, 14, 5, 30, 5, 1, 5, 17, 5, 9, 5, 25, 5, 5, 5, 21, 5, 13, 5, 29, 5, 3, 5, 19, 5, 11, 5, 27, 5, 7, 5, 23, 5], r.static_l_desc = new r(r.static_ltree, a.extra_lbits, 257, 286, 15), r.static_d_desc = new r(r.static_dtree, a.extra_dbits, 0, 30, 15), r.static_bl_desc = new r(null, a.extra_blbits, 0, 19, 7);
        const l = [new o(0, 0, 0, 0, 0), new o(4, 4, 8, 4, 1), new o(4, 5, 16, 8, 1), new o(4, 6, 32, 32, 1), new o(4, 4, 16, 16, 2), new o(8, 16, 32, 32, 2), new o(8, 16, 128, 128, 2), new o(8, 32, 128, 256, 2), new o(32, 128, 258, 1024, 2), new o(32, 258, 258, 4096, 2)],
            h = ["need dictionary", "stream end", "", "", "stream error", "data error", "", "buffer error", "", ""],
            d = 113,
            c = 666,
            u = 262;

        function p(e, t, i, n) {
            const s = e[2 * t],
                a = e[2 * i];
            return s < a || s == a && n[t] <= n[i]
        }

        function m() {
            const t = this;
            let i, n, s, o, m, g, f, b, x, w, v, _, y, k, A, C, V, S, E, I, B, L, U, M, z, T, N, R, F, D, W, P, q;
            const H = new a,
                O = new a,
                j = new a;
            let Z, K, Q, X, G, J, Y, $;

            function ee() {
                let e;
                for (e = 0; e < 286; e++) W[2 * e] = 0;
                for (e = 0; e < 30; e++) P[2 * e] = 0;
                for (e = 0; e < 19; e++) q[2 * e] = 0;
                W[512] = 1, t.opt_len = t.static_len = 0, Q = G = 0
            }

            function te(e, t) {
                let i, n = -1,
                    s = e[1],
                    a = 0,
                    r = 7,
                    o = 4;
                0 === s && (r = 138, o = 3), e[2 * (t + 1) + 1] = 65535;
                for (let l = 0; l <= t; l++) i = s, s = e[2 * (l + 1) + 1], ++a < r && i == s || (a < o ? q[2 * i] += a : 0 !== i ? (i != n && q[2 * i]++, q[32]++) : a <= 10 ? q[34]++ : q[36]++, a = 0, n = i, 0 === s ? (r = 138, o = 3) : i == s ? (r = 6, o = 3) : (r = 7, o = 4))
            }

            function ie(e) {
                t.pending_buf[t.pending++] = e
            }

            function ne(e) {
                ie(255 & e), ie(e >>> 8 & 255)
            }

            function se(e, t) {
                let i;
                const n = t;
                $ > 16 - n ? (i = e, Y |= i << $ & 65535, ne(Y), Y = i >>> 16 - $, $ += n - 16) : (Y |= e << $ & 65535, $ += n)
            }

            function ae(e, t) {
                const i = 2 * e;
                se(65535 & t[i], 65535 & t[i + 1])
            }

            function re(e, t) {
                let i, n, s = -1,
                    a = e[1],
                    r = 0,
                    o = 7,
                    l = 4;
                for (0 === a && (o = 138, l = 3), i = 0; i <= t; i++)
                    if (n = a, a = e[2 * (i + 1) + 1], !(++r < o && n == a)) {
                        if (r < l)
                            do {
                                ae(n, q)
                            } while (0 != --r);
                        else 0 !== n ? (n != s && (ae(n, q), r--), ae(16, q), se(r - 3, 2)) : r <= 10 ? (ae(17, q), se(r - 3, 3)) : (ae(18, q), se(r - 11, 7));
                        r = 0, s = n, 0 === a ? (o = 138, l = 3) : n == a ? (o = 6, l = 3) : (o = 7, l = 4)
                    }
            }

            function oe() {
                16 == $ ? (ne(Y), Y = 0, $ = 0) : $ >= 8 && (ie(255 & Y), Y >>>= 8, $ -= 8)
            }

            function le(e, i) {
                let n, s, r;
                if (t.pending_buf[X + 2 * Q] = e >>> 8 & 255, t.pending_buf[X + 2 * Q + 1] = 255 & e, t.pending_buf[Z + Q] = 255 & i, Q++, 0 === e ? W[2 * i]++ : (G++, e--, W[2 * (a._length_code[i] + 256 + 1)]++, P[2 * a.d_code(e)]++), 0 == (8191 & Q) && N > 2) {
                    for (n = 8 * Q, s = B - V, r = 0; r < 30; r++) n += P[2 * r] * (5 + a.extra_dbits[r]);
                    if (n >>>= 3, G < Math.floor(Q / 2) && n < Math.floor(s / 2)) return !0
                }
                return Q == K - 1
            }

            function he(e, i) {
                let n, s, r, o, l = 0;
                if (0 !== Q)
                    do {
                        n = t.pending_buf[X + 2 * l] << 8 & 65280 | 255 & t.pending_buf[X + 2 * l + 1], s = 255 & t.pending_buf[Z + l], l++, 0 === n ? ae(s, e) : (r = a._length_code[s], ae(r + 256 + 1, e), o = a.extra_lbits[r], 0 !== o && (s -= a.base_length[r], se(s, o)), n--, r = a.d_code(n), ae(r, i), o = a.extra_dbits[r], 0 !== o && (n -= a.base_dist[r], se(n, o)))
                    } while (l < Q);
                ae(256, e), J = e[513]
            }

            function de() {
                $ > 8 ? ne(Y) : $ > 0 && ie(255 & Y), Y = 0, $ = 0
            }

            function ce(e, i, n) {
                se(0 + (n ? 1 : 0), 3),
                    function(e, i, n) {
                        de(), J = 8, ne(i), ne(~i), t.pending_buf.set(b.subarray(e, e + i), t.pending), t.pending += i
                    }(e, i)
            }

            function ue(e) {
                (function(e, i, n) {
                    let s, o, l = 0;
                    N > 0 ? (H.build_tree(t), O.build_tree(t), l = function() {
                        let e;
                        for (te(W, H.max_code), te(P, O.max_code), j.build_tree(t), e = 18; e >= 3 && 0 === q[2 * a.bl_order[e] + 1]; e--);
                        return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e
                    }(), s = t.opt_len + 3 + 7 >>> 3, o = t.static_len + 3 + 7 >>> 3, o <= s && (s = o)) : s = o = i + 5, i + 4 <= s && -1 != e ? ce(e, i, n) : o == s ? (se(2 + (n ? 1 : 0), 3), he(r.static_ltree, r.static_dtree)) : (se(4 + (n ? 1 : 0), 3), function(e, t, i) {
                        let n;
                        for (se(e - 257, 5), se(t - 1, 5), se(i - 4, 4), n = 0; n < i; n++) se(q[2 * a.bl_order[n] + 1], 3);
                        re(W, e - 1), re(P, t - 1)
                    }(H.max_code + 1, O.max_code + 1, l + 1), he(W, P)), ee(), n && de()
                })(V >= 0 ? V : -1, B - V, e), V = B, i.flush_pending()
            }

            function pe() {
                let e, t, n, s;
                do {
                    if (s = x - U - B, 0 === s && 0 === B && 0 === U) s = m;
                    else if (-1 == s) s--;
                    else if (B >= m + m - u) {
                        b.set(b.subarray(m, m + m), 0), L -= m, B -= m, V -= m, e = y, n = e;
                        do {
                            t = 65535 & v[--n], v[n] = t >= m ? t - m : 0
                        } while (0 != --e);
                        e = m, n = e;
                        do {
                            t = 65535 & w[--n], w[n] = t >= m ? t - m : 0
                        } while (0 != --e);
                        s += m
                    }
                    if (0 === i.avail_in) return;
                    e = i.read_buf(b, B + U, s), U += e, U >= 3 && (_ = 255 & b[B], _ = (_ << C ^ 255 & b[B + 1]) & A)
                } while (U < u && 0 !== i.avail_in)
            }

            function me(e) {
                let t, i, n = z,
                    s = B,
                    a = M;
                const r = B > m - u ? B - (m - u) : 0;
                let o = D;
                const l = f,
                    h = B + 258;
                let d = b[s + a - 1],
                    c = b[s + a];
                M >= F && (n >>= 2), o > U && (o = U);
                do {
                    if (t = e, b[t + a] == c && b[t + a - 1] == d && b[t] == b[s] && b[++t] == b[s + 1]) {
                        s += 2, t++;
                        do {} while (b[++s] == b[++t] && b[++s] == b[++t] && b[++s] == b[++t] && b[++s] == b[++t] && b[++s] == b[++t] && b[++s] == b[++t] && b[++s] == b[++t] && b[++s] == b[++t] && s < h);
                        if (i = 258 - (h - s), s = h - 258, i > a) {
                            if (L = e, a = i, i >= o) break;
                            d = b[s + a - 1], c = b[s + a]
                        }
                    }
                } while ((e = 65535 & w[e & l]) > r && 0 != --n);
                return a <= U ? a : U
            }
            t.depth = [], t.bl_count = [], t.heap = [], W = [], P = [], q = [], t.pqdownheap = function(e, i) {
                const n = t.heap,
                    s = n[i];
                let a = i << 1;
                for (; a <= t.heap_len && (a < t.heap_len && p(e, n[a + 1], n[a], t.depth) && a++, !p(e, s, n[a], t.depth));) n[i] = n[a], i = a, a <<= 1;
                n[i] = s
            }, t.deflateInit = function(i, a, h, c, u, p) {
                return c || (c = 8), u || (u = 8), p || (p = 0), i.msg = null, -1 == a && (a = 6), u < 1 || u > 9 || 8 != c || h < 9 || h > 15 || a < 0 || a > 9 || p < 0 || p > 2 ? e : (i.dstate = t, g = h, m = 1 << g, f = m - 1, k = u + 7, y = 1 << k, A = y - 1, C = Math.floor((k + 3 - 1) / 3), b = new Uint8Array(2 * m), w = [], v = [], K = 1 << u + 6, t.pending_buf = new Uint8Array(4 * K), s = 4 * K, X = Math.floor(K / 2), Z = 3 * K, N = a, R = p, function(e) {
                    return e.total_in = e.total_out = 0, e.msg = null, t.pending = 0, t.pending_out = 0, n = d, o = 0, H.dyn_tree = W, H.stat_desc = r.static_l_desc, O.dyn_tree = P, O.stat_desc = r.static_d_desc, j.dyn_tree = q, j.stat_desc = r.static_bl_desc, Y = 0, $ = 0, J = 8, ee(),
                        function() {
                            x = 2 * m, v[y - 1] = 0;
                            for (let e = 0; e < y - 1; e++) v[e] = 0;
                            T = l[N].max_lazy, F = l[N].good_length, D = l[N].nice_length, z = l[N].max_chain, B = 0, V = 0, U = 0, S = M = 2, I = 0, _ = 0
                        }(), 0
                }(i))
            }, t.deflateEnd = function() {
                return 42 != n && n != d && n != c ? e : (t.pending_buf = null, v = null, w = null, b = null, t.dstate = null, n == d ? -3 : 0)
            }, t.deflateParams = function(t, i, n) {
                let s = 0;
                return -1 == i && (i = 6), i < 0 || i > 9 || n < 0 || n > 2 ? e : (l[N].func != l[i].func && 0 !== t.total_in && (s = t.deflate(1)), N != i && (N = i, T = l[N].max_lazy, F = l[N].good_length, D = l[N].nice_length, z = l[N].max_chain), R = n, s)
            }, t.deflateSetDictionary = function(t, i, s) {
                let a, r = s,
                    o = 0;
                if (!i || 42 != n) return e;
                if (r < 3) return 0;
                for (r > m - u && (r = m - u, o = s - r), b.set(i.subarray(o, o + r), 0), B = r, V = r, _ = 255 & b[0], _ = (_ << C ^ 255 & b[1]) & A, a = 0; a <= r - 3; a++) _ = (_ << C ^ 255 & b[a + 2]) & A, w[a & f] = v[_], v[_] = a;
                return 0
            }, t.deflate = function(a, p) {
                let x, k, z, F, D;
                if (p > 4 || p < 0) return e;
                if (!a.next_out || !a.next_in && 0 !== a.avail_in || n == c && 4 != p) return a.msg = h[4], e;
                if (0 === a.avail_out) return a.msg = h[7], -5;
                var W;
                if (i = a, F = o, o = p, 42 == n && (k = 8 + (g - 8 << 4) << 8, z = (N - 1 & 255) >> 1, z > 3 && (z = 3), k |= z << 6, 0 !== B && (k |= 32), k += 31 - k % 31, n = d, ie((W = k) >> 8 & 255), ie(255 & W)), 0 !== t.pending) {
                    if (i.flush_pending(), 0 === i.avail_out) return o = -1, 0
                } else if (0 === i.avail_in && p <= F && 4 != p) return i.msg = h[7], -5;
                if (n == c && 0 !== i.avail_in) return a.msg = h[7], -5;
                if (0 !== i.avail_in || 0 !== U || 0 != p && n != c) {
                    switch (D = -1, l[N].func) {
                        case 0:
                            D = function(e) {
                                let t, n = 65535;
                                for (n > s - 5 && (n = s - 5);;) {
                                    if (U <= 1) {
                                        if (pe(), 0 === U && 0 == e) return 0;
                                        if (0 === U) break
                                    }
                                    if (B += U, U = 0, t = V + n, (0 === B || B >= t) && (U = B - t, B = t, ue(!1), 0 === i.avail_out)) return 0;
                                    if (B - V >= m - u && (ue(!1), 0 === i.avail_out)) return 0
                                }
                                return ue(4 == e), 0 === i.avail_out ? 4 == e ? 2 : 0 : 4 == e ? 3 : 1
                            }(p);
                            break;
                        case 1:
                            D = function(e) {
                                let t, n = 0;
                                for (;;) {
                                    if (U < u) {
                                        if (pe(), U < u && 0 == e) return 0;
                                        if (0 === U) break
                                    }
                                    if (U >= 3 && (_ = (_ << C ^ 255 & b[B + 2]) & A, n = 65535 & v[_], w[B & f] = v[_], v[_] = B), 0 !== n && (B - n & 65535) <= m - u && 2 != R && (S = me(n)), S >= 3)
                                        if (t = le(B - L, S - 3), U -= S, S <= T && U >= 3) {
                                            S--;
                                            do {
                                                B++, _ = (_ << C ^ 255 & b[B + 2]) & A, n = 65535 & v[_], w[B & f] = v[_], v[_] = B
                                            } while (0 != --S);
                                            B++
                                        } else B += S, S = 0, _ = 255 & b[B], _ = (_ << C ^ 255 & b[B + 1]) & A;
                                    else t = le(0, 255 & b[B]), U--, B++;
                                    if (t && (ue(!1), 0 === i.avail_out)) return 0
                                }
                                return ue(4 == e), 0 === i.avail_out ? 4 == e ? 2 : 0 : 4 == e ? 3 : 1
                            }(p);
                            break;
                        case 2:
                            D = function(e) {
                                let t, n, s = 0;
                                for (;;) {
                                    if (U < u) {
                                        if (pe(), U < u && 0 == e) return 0;
                                        if (0 === U) break
                                    }
                                    if (U >= 3 && (_ = (_ << C ^ 255 & b[B + 2]) & A, s = 65535 & v[_], w[B & f] = v[_], v[_] = B), M = S, E = L, S = 2, 0 !== s && M < T && (B - s & 65535) <= m - u && (2 != R && (S = me(s)), S <= 5 && (1 == R || 3 == S && B - L > 4096) && (S = 2)), M >= 3 && S <= M) {
                                        n = B + U - 3, t = le(B - 1 - E, M - 3), U -= M - 1, M -= 2;
                                        do {
                                            ++B <= n && (_ = (_ << C ^ 255 & b[B + 2]) & A, s = 65535 & v[_], w[B & f] = v[_], v[_] = B)
                                        } while (0 != --M);
                                        if (I = 0, S = 2, B++, t && (ue(!1), 0 === i.avail_out)) return 0
                                    } else if (0 !== I) {
                                        if (t = le(0, 255 & b[B - 1]), t && ue(!1), B++, U--, 0 === i.avail_out) return 0
                                    } else I = 1, B++, U--
                                }
                                return 0 !== I && (t = le(0, 255 & b[B - 1]), I = 0), ue(4 == e), 0 === i.avail_out ? 4 == e ? 2 : 0 : 4 == e ? 3 : 1
                            }(p)
                    }
                    if (2 != D && 3 != D || (n = c), 0 == D || 2 == D) return 0 === i.avail_out && (o = -1), 0;
                    if (1 == D) {
                        if (1 == p) se(2, 3), ae(256, r.static_ltree), oe(), 1 + J + 10 - $ < 9 && (se(2, 3), ae(256, r.static_ltree), oe()), J = 7;
                        else if (ce(0, 0, !1), 3 == p)
                            for (x = 0; x < y; x++) v[x] = 0;
                        if (i.flush_pending(), 0 === i.avail_out) return o = -1, 0
                    }
                }
                return 4 != p ? 0 : 1
            }
        }

        function g() {
            const e = this;
            e.next_in_index = 0, e.next_out_index = 0, e.avail_in = 0, e.total_in = 0, e.avail_out = 0, e.total_out = 0
        }
        g.prototype = {
            deflateInit: function(e, t) {
                const i = this;
                return i.dstate = new m, t || (t = 15), i.dstate.deflateInit(i, e, t)
            },
            deflate: function(t) {
                const i = this;
                return i.dstate ? i.dstate.deflate(i, t) : e
            },
            deflateEnd: function() {
                const t = this;
                if (!t.dstate) return e;
                const i = t.dstate.deflateEnd();
                return t.dstate = null, i
            },
            deflateParams: function(t, i) {
                const n = this;
                return n.dstate ? n.dstate.deflateParams(n, t, i) : e
            },
            deflateSetDictionary: function(t, i) {
                const n = this;
                return n.dstate ? n.dstate.deflateSetDictionary(n, t, i) : e
            },
            read_buf: function(e, t, i) {
                const n = this;
                let s = n.avail_in;
                return s > i && (s = i), 0 === s ? 0 : (n.avail_in -= s, e.set(n.next_in.subarray(n.next_in_index, n.next_in_index + s), t), n.next_in_index += s, n.total_in += s, s)
            },
            flush_pending: function() {
                const e = this;
                let t = e.dstate.pending;
                t > e.avail_out && (t = e.avail_out), 0 !== t && (e.next_out.set(e.dstate.pending_buf.subarray(e.dstate.pending_out, e.dstate.pending_out + t), e.next_out_index), e.next_out_index += t, e.dstate.pending_out += t, e.total_out += t, e.avail_out -= t, e.dstate.pending -= t, 0 === e.dstate.pending && (e.dstate.pending_out = 0))
            }
        };
        const f = -2,
            b = -3,
            x = -5,
            w = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535],
            v = [96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 248, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 164, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 244, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 188, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 162, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 210, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 218, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 230, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 214, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 174, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 193, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 249, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 213, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 221, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 147, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 235, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 167, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255],
            _ = [80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5, 65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5, 8193, 82, 5, 9, 90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25, 91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5, 24577, 80, 5, 4, 88, 5, 769, 84, 5, 49, 92, 5, 12289, 82, 5, 13, 90, 5, 3073, 86, 5, 193, 192, 5, 24577],
            y = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
            k = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 112, 112],
            A = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577],
            C = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];

        function V() {
            let e, t, i, n, s, a;

            function r(e, t, r, o, l, h, d, c, u, p, m) {
                let g, f, w, v, _, y, k, A, C, V, S, E, I, B, L;
                V = 0, _ = r;
                do {
                    i[e[t + V]]++, V++, _--
                } while (0 !== _);
                if (i[0] == r) return d[0] = -1, c[0] = 0, 0;
                for (A = c[0], y = 1; y <= 15 && 0 === i[y]; y++);
                for (k = y, A < y && (A = y), _ = 15; 0 !== _ && 0 === i[_]; _--);
                for (w = _, A > _ && (A = _), c[0] = A, B = 1 << y; y < _; y++, B <<= 1)
                    if ((B -= i[y]) < 0) return b;
                if ((B -= i[_]) < 0) return b;
                for (i[_] += B, a[1] = y = 0, V = 1, I = 2; 0 != --_;) a[I] = y += i[V], I++, V++;
                _ = 0, V = 0;
                do {
                    0 !== (y = e[t + V]) && (m[a[y]++] = _), V++
                } while (++_ < r);
                for (r = a[w], a[0] = _ = 0, V = 0, v = -1, E = -A, s[0] = 0, S = 0, L = 0; k <= w; k++)
                    for (g = i[k]; 0 != g--;) {
                        for (; k > E + A;) {
                            if (v++, E += A, L = w - E, L = L > A ? A : L, (f = 1 << (y = k - E)) > g + 1 && (f -= g + 1, I = k, y < L))
                                for (; ++y < L && !((f <<= 1) <= i[++I]);) f -= i[I];
                            if (L = 1 << y, p[0] + L > 1440) return b;
                            s[v] = S = p[0], p[0] += L, 0 !== v ? (a[v] = _, n[0] = y, n[1] = A, y = _ >>> E - A, n[2] = S - s[v - 1] - y, u.set(n, 3 * (s[v - 1] + y))) : d[0] = S
                        }
                        for (n[1] = k - E, V >= r ? n[0] = 192 : m[V] < o ? (n[0] = m[V] < 256 ? 0 : 96, n[2] = m[V++]) : (n[0] = h[m[V] - o] + 16 + 64, n[2] = l[m[V++] - o]), f = 1 << k - E, y = _ >>> E; y < L; y += f) u.set(n, 3 * (S + y));
                        for (y = 1 << k - 1; 0 != (_ & y); y >>>= 1) _ ^= y;
                        for (_ ^= y, C = (1 << E) - 1;
                            (_ & C) != a[v];) v--, E -= A, C = (1 << E) - 1
                    }
                return 0 !== B && 1 != w ? x : 0
            }

            function o(r) {
                let o;
                for (e || (e = [], t = [], i = new Int32Array(16), n = [], s = new Int32Array(15), a = new Int32Array(16)), t.length < r && (t = []), o = 0; o < r; o++) t[o] = 0;
                for (o = 0; o < 16; o++) i[o] = 0;
                for (o = 0; o < 3; o++) n[o] = 0;
                s.set(i.subarray(0, 15), 0), a.set(i.subarray(0, 16), 0)
            }
            this.inflate_trees_bits = function(i, n, s, a, l) {
                let h;
                return o(19), e[0] = 0, h = r(i, 0, 19, 19, null, null, s, n, a, e, t), h == b ? l.msg = "oversubscribed dynamic bit lengths tree" : h != x && 0 !== n[0] || (l.msg = "incomplete dynamic bit lengths tree", h = b), h
            }, this.inflate_trees_dynamic = function(i, n, s, a, l, h, d, c, u) {
                let p;
                return o(288), e[0] = 0, p = r(s, 0, i, 257, y, k, h, a, c, e, t), 0 != p || 0 === a[0] ? (p == b ? u.msg = "oversubscribed literal/length tree" : -4 != p && (u.msg = "incomplete literal/length tree", p = b), p) : (o(288), p = r(s, i, n, 0, A, C, d, l, c, e, t), 0 != p || 0 === l[0] && i > 257 ? (p == b ? u.msg = "oversubscribed distance tree" : p == x ? (u.msg = "incomplete distance tree", p = b) : -4 != p && (u.msg = "empty distance tree with lengths", p = b), p) : 0)
            }
        }

        function S() {
            const e = this;
            let t, i, n, s, a = 0,
                r = 0,
                o = 0,
                l = 0,
                h = 0,
                d = 0,
                c = 0,
                u = 0,
                p = 0,
                m = 0;

            function g(e, t, i, n, s, a, r, o) {
                let l, h, d, c, u, p, m, g, f, x, v, _, y, k, A, C;
                m = o.next_in_index, g = o.avail_in, u = r.bitb, p = r.bitk, f = r.write, x = f < r.read ? r.read - f - 1 : r.end - f, v = w[e], _ = w[t];
                do {
                    for (; p < 20;) g--, u |= (255 & o.read_byte(m++)) << p, p += 8;
                    if (l = u & v, h = i, d = n, C = 3 * (d + l), 0 !== (c = h[C]))
                        for (;;) {
                            if (u >>= h[C + 1], p -= h[C + 1], 0 != (16 & c)) {
                                for (c &= 15, y = h[C + 2] + (u & w[c]), u >>= c, p -= c; p < 15;) g--, u |= (255 & o.read_byte(m++)) << p, p += 8;
                                for (l = u & _, h = s, d = a, C = 3 * (d + l), c = h[C];;) {
                                    if (u >>= h[C + 1], p -= h[C + 1], 0 != (16 & c)) {
                                        for (c &= 15; p < c;) g--, u |= (255 & o.read_byte(m++)) << p, p += 8;
                                        if (k = h[C + 2] + (u & w[c]), u >>= c, p -= c, x -= y, f >= k) A = f - k, f - A > 0 && 2 > f - A ? (r.window[f++] = r.window[A++], r.window[f++] = r.window[A++], y -= 2) : (r.window.set(r.window.subarray(A, A + 2), f), f += 2, A += 2, y -= 2);
                                        else {
                                            A = f - k;
                                            do {
                                                A += r.end
                                            } while (A < 0);
                                            if (c = r.end - A, y > c) {
                                                if (y -= c, f - A > 0 && c > f - A)
                                                    do {
                                                        r.window[f++] = r.window[A++]
                                                    } while (0 != --c);
                                                else r.window.set(r.window.subarray(A, A + c), f), f += c, A += c, c = 0;
                                                A = 0
                                            }
                                        }
                                        if (f - A > 0 && y > f - A)
                                            do {
                                                r.window[f++] = r.window[A++]
                                            } while (0 != --y);
                                        else r.window.set(r.window.subarray(A, A + y), f), f += y, A += y, y = 0;
                                        break
                                    }
                                    if (0 != (64 & c)) return o.msg = "invalid distance code", y = o.avail_in - g, y = p >> 3 < y ? p >> 3 : y, g += y, m -= y, p -= y << 3, r.bitb = u, r.bitk = p, o.avail_in = g, o.total_in += m - o.next_in_index, o.next_in_index = m, r.write = f, b;
                                    l += h[C + 2], l += u & w[c], C = 3 * (d + l), c = h[C]
                                }
                                break
                            }
                            if (0 != (64 & c)) return 0 != (32 & c) ? (y = o.avail_in - g, y = p >> 3 < y ? p >> 3 : y, g += y, m -= y, p -= y << 3, r.bitb = u, r.bitk = p, o.avail_in = g, o.total_in += m - o.next_in_index, o.next_in_index = m, r.write = f, 1) : (o.msg = "invalid literal/length code", y = o.avail_in - g, y = p >> 3 < y ? p >> 3 : y, g += y, m -= y, p -= y << 3, r.bitb = u, r.bitk = p, o.avail_in = g, o.total_in += m - o.next_in_index, o.next_in_index = m, r.write = f, b);
                            if (l += h[C + 2], l += u & w[c], C = 3 * (d + l), 0 === (c = h[C])) {
                                u >>= h[C + 1], p -= h[C + 1], r.window[f++] = h[C + 2], x--;
                                break
                            }
                        } else u >>= h[C + 1], p -= h[C + 1], r.window[f++] = h[C + 2], x--
                } while (x >= 258 && g >= 10);
                return y = o.avail_in - g, y = p >> 3 < y ? p >> 3 : y, g += y, m -= y, p -= y << 3, r.bitb = u, r.bitk = p, o.avail_in = g, o.total_in += m - o.next_in_index, o.next_in_index = m, r.write = f, 0
            }
            e.init = function(e, a, r, o, l, h) {
                t = 0, c = e, u = a, n = r, p = o, s = l, m = h, i = null
            }, e.proc = function(e, x, v) {
                let _, y, k, A, C, V, S, E = 0,
                    I = 0,
                    B = 0;
                for (B = x.next_in_index, A = x.avail_in, E = e.bitb, I = e.bitk, C = e.write, V = C < e.read ? e.read - C - 1 : e.end - C;;) switch (t) {
                    case 0:
                        if (V >= 258 && A >= 10 && (e.bitb = E, e.bitk = I, x.avail_in = A, x.total_in += B - x.next_in_index, x.next_in_index = B, e.write = C, v = g(c, u, n, p, s, m, e, x), B = x.next_in_index, A = x.avail_in, E = e.bitb, I = e.bitk, C = e.write, V = C < e.read ? e.read - C - 1 : e.end - C, 0 != v)) {
                            t = 1 == v ? 7 : 9;
                            break
                        }
                        o = c, i = n, r = p, t = 1;
                    case 1:
                        for (_ = o; I < _;) {
                            if (0 === A) return e.bitb = E, e.bitk = I, x.avail_in = A, x.total_in += B - x.next_in_index, x.next_in_index = B, e.write = C, e.inflate_flush(x, v);
                            v = 0, A--, E |= (255 & x.read_byte(B++)) << I, I += 8
                        }
                        if (y = 3 * (r + (E & w[_])), E >>>= i[y + 1], I -= i[y + 1], k = i[y], 0 === k) {
                            l = i[y + 2], t = 6;
                            break
                        }
                        if (0 != (16 & k)) {
                            h = 15 & k, a = i[y + 2], t = 2;
                            break
                        }
                        if (0 == (64 & k)) {
                            o = k, r = y / 3 + i[y + 2];
                            break
                        }
                        if (0 != (32 & k)) {
                            t = 7;
                            break
                        }
                        return t = 9, x.msg = "invalid literal/length code", v = b, e.bitb = E, e.bitk = I, x.avail_in = A, x.total_in += B - x.next_in_index, x.next_in_index = B, e.write = C, e.inflate_flush(x, v);
                    case 2:
                        for (_ = h; I < _;) {
                            if (0 === A) return e.bitb = E, e.bitk = I, x.avail_in = A, x.total_in += B - x.next_in_index, x.next_in_index = B, e.write = C, e.inflate_flush(x, v);
                            v = 0, A--, E |= (255 & x.read_byte(B++)) << I, I += 8
                        }
                        a += E & w[_], E >>= _, I -= _, o = u, i = s, r = m, t = 3;
                    case 3:
                        for (_ = o; I < _;) {
                            if (0 === A) return e.bitb = E, e.bitk = I, x.avail_in = A, x.total_in += B - x.next_in_index, x.next_in_index = B, e.write = C, e.inflate_flush(x, v);
                            v = 0, A--, E |= (255 & x.read_byte(B++)) << I, I += 8
                        }
                        if (y = 3 * (r + (E & w[_])), E >>= i[y + 1], I -= i[y + 1], k = i[y], 0 != (16 & k)) {
                            h = 15 & k, d = i[y + 2], t = 4;
                            break
                        }
                        if (0 == (64 & k)) {
                            o = k, r = y / 3 + i[y + 2];
                            break
                        }
                        return t = 9, x.msg = "invalid distance code", v = b, e.bitb = E, e.bitk = I, x.avail_in = A, x.total_in += B - x.next_in_index, x.next_in_index = B, e.write = C, e.inflate_flush(x, v);
                    case 4:
                        for (_ = h; I < _;) {
                            if (0 === A) return e.bitb = E, e.bitk = I, x.avail_in = A, x.total_in += B - x.next_in_index, x.next_in_index = B, e.write = C, e.inflate_flush(x, v);
                            v = 0, A--, E |= (255 & x.read_byte(B++)) << I, I += 8
                        }
                        d += E & w[_], E >>= _, I -= _, t = 5;
                    case 5:
                        for (S = C - d; S < 0;) S += e.end;
                        for (; 0 !== a;) {
                            if (0 === V && (C == e.end && 0 !== e.read && (C = 0, V = C < e.read ? e.read - C - 1 : e.end - C), 0 === V && (e.write = C, v = e.inflate_flush(x, v), C = e.write, V = C < e.read ? e.read - C - 1 : e.end - C, C == e.end && 0 !== e.read && (C = 0, V = C < e.read ? e.read - C - 1 : e.end - C), 0 === V))) return e.bitb = E, e.bitk = I, x.avail_in = A, x.total_in += B - x.next_in_index, x.next_in_index = B, e.write = C, e.inflate_flush(x, v);
                            e.window[C++] = e.window[S++], V--, S == e.end && (S = 0), a--
                        }
                        t = 0;
                        break;
                    case 6:
                        if (0 === V && (C == e.end && 0 !== e.read && (C = 0, V = C < e.read ? e.read - C - 1 : e.end - C), 0 === V && (e.write = C, v = e.inflate_flush(x, v), C = e.write, V = C < e.read ? e.read - C - 1 : e.end - C, C == e.end && 0 !== e.read && (C = 0, V = C < e.read ? e.read - C - 1 : e.end - C), 0 === V))) return e.bitb = E, e.bitk = I, x.avail_in = A, x.total_in += B - x.next_in_index, x.next_in_index = B, e.write = C, e.inflate_flush(x, v);
                        v = 0, e.window[C++] = l, V--, t = 0;
                        break;
                    case 7:
                        if (I > 7 && (I -= 8, A++, B--), e.write = C, v = e.inflate_flush(x, v), C = e.write, V = C < e.read ? e.read - C - 1 : e.end - C, e.read != e.write) return e.bitb = E, e.bitk = I, x.avail_in = A, x.total_in += B - x.next_in_index, x.next_in_index = B, e.write = C, e.inflate_flush(x, v);
                        t = 8;
                    case 8:
                        return v = 1, e.bitb = E, e.bitk = I, x.avail_in = A, x.total_in += B - x.next_in_index, x.next_in_index = B, e.write = C, e.inflate_flush(x, v);
                    case 9:
                        return v = b, e.bitb = E, e.bitk = I, x.avail_in = A, x.total_in += B - x.next_in_index, x.next_in_index = B, e.write = C, e.inflate_flush(x, v);
                    default:
                        return v = f, e.bitb = E, e.bitk = I, x.avail_in = A, x.total_in += B - x.next_in_index, x.next_in_index = B, e.write = C, e.inflate_flush(x, v)
                }
            }, e.free = function() {}
        }
        V.inflate_trees_fixed = function(e, t, i, n) {
            return e[0] = 9, t[0] = 5, i[0] = v, n[0] = _, 0
        };
        const E = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

        function I(e, t) {
            const i = this;
            let n, s = 0,
                a = 0,
                r = 0,
                o = 0;
            const l = [0],
                h = [0],
                d = new S;
            let c = 0,
                u = new Int32Array(4320);
            const p = new V;
            i.bitk = 0, i.bitb = 0, i.window = new Uint8Array(t), i.end = t, i.read = 0, i.write = 0, i.reset = function(e, t) {
                t && (t[0] = 0), 6 == s && d.free(e), s = 0, i.bitk = 0, i.bitb = 0, i.read = i.write = 0
            }, i.reset(e, null), i.inflate_flush = function(e, t) {
                let n, s, a;
                return s = e.next_out_index, a = i.read, n = (a <= i.write ? i.write : i.end) - a, n > e.avail_out && (n = e.avail_out), 0 !== n && t == x && (t = 0), e.avail_out -= n, e.total_out += n, e.next_out.set(i.window.subarray(a, a + n), s), s += n, a += n, a == i.end && (a = 0, i.write == i.end && (i.write = 0), n = i.write - a, n > e.avail_out && (n = e.avail_out), 0 !== n && t == x && (t = 0), e.avail_out -= n, e.total_out += n, e.next_out.set(i.window.subarray(a, a + n), s), s += n, a += n), e.next_out_index = s, i.read = a, t
            }, i.proc = function(e, t) {
                let m, g, x, v, _, y, k, A;
                for (v = e.next_in_index, _ = e.avail_in, g = i.bitb, x = i.bitk, y = i.write, k = y < i.read ? i.read - y - 1 : i.end - y;;) {
                    let C, S, I, B, L, U, M, z;
                    switch (s) {
                        case 0:
                            for (; x < 3;) {
                                if (0 === _) return i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                                t = 0, _--, g |= (255 & e.read_byte(v++)) << x, x += 8
                            }
                            switch (m = 7 & g, c = 1 & m, m >>> 1) {
                                case 0:
                                    g >>>= 3, x -= 3, m = 7 & x, g >>>= m, x -= m, s = 1;
                                    break;
                                case 1:
                                    C = [], S = [], I = [
                                        []
                                    ], B = [
                                        []
                                    ], V.inflate_trees_fixed(C, S, I, B), d.init(C[0], S[0], I[0], 0, B[0], 0), g >>>= 3, x -= 3, s = 6;
                                    break;
                                case 2:
                                    g >>>= 3, x -= 3, s = 3;
                                    break;
                                case 3:
                                    return g >>>= 3, x -= 3, s = 9, e.msg = "invalid block type", t = b, i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t)
                            }
                            break;
                        case 1:
                            for (; x < 32;) {
                                if (0 === _) return i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                                t = 0, _--, g |= (255 & e.read_byte(v++)) << x, x += 8
                            }
                            if ((~g >>> 16 & 65535) != (65535 & g)) return s = 9, e.msg = "invalid stored block lengths", t = b, i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                            a = 65535 & g, g = x = 0, s = 0 !== a ? 2 : 0 !== c ? 7 : 0;
                            break;
                        case 2:
                            if (0 === _) return i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                            if (0 === k && (y == i.end && 0 !== i.read && (y = 0, k = y < i.read ? i.read - y - 1 : i.end - y), 0 === k && (i.write = y, t = i.inflate_flush(e, t), y = i.write, k = y < i.read ? i.read - y - 1 : i.end - y, y == i.end && 0 !== i.read && (y = 0, k = y < i.read ? i.read - y - 1 : i.end - y), 0 === k))) return i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                            if (t = 0, m = a, m > _ && (m = _), m > k && (m = k), i.window.set(e.read_buf(v, m), y), v += m, _ -= m, y += m, k -= m, 0 != (a -= m)) break;
                            s = 0 !== c ? 7 : 0;
                            break;
                        case 3:
                            for (; x < 14;) {
                                if (0 === _) return i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                                t = 0, _--, g |= (255 & e.read_byte(v++)) << x, x += 8
                            }
                            if (r = m = 16383 & g, (31 & m) > 29 || (m >> 5 & 31) > 29) return s = 9, e.msg = "too many length or distance symbols", t = b, i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                            if (m = 258 + (31 & m) + (m >> 5 & 31), !n || n.length < m) n = [];
                            else
                                for (A = 0; A < m; A++) n[A] = 0;
                            g >>>= 14, x -= 14, o = 0, s = 4;
                        case 4:
                            for (; o < 4 + (r >>> 10);) {
                                for (; x < 3;) {
                                    if (0 === _) return i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                                    t = 0, _--, g |= (255 & e.read_byte(v++)) << x, x += 8
                                }
                                n[E[o++]] = 7 & g, g >>>= 3, x -= 3
                            }
                            for (; o < 19;) n[E[o++]] = 0;
                            if (l[0] = 7, m = p.inflate_trees_bits(n, l, h, u, e), 0 != m) return (t = m) == b && (n = null, s = 9), i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                            o = 0, s = 5;
                        case 5:
                            for (; m = r, !(o >= 258 + (31 & m) + (m >> 5 & 31));) {
                                let a, d;
                                for (m = l[0]; x < m;) {
                                    if (0 === _) return i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                                    t = 0, _--, g |= (255 & e.read_byte(v++)) << x, x += 8
                                }
                                if (m = u[3 * (h[0] + (g & w[m])) + 1], d = u[3 * (h[0] + (g & w[m])) + 2], d < 16) g >>>= m, x -= m, n[o++] = d;
                                else {
                                    for (A = 18 == d ? 7 : d - 14, a = 18 == d ? 11 : 3; x < m + A;) {
                                        if (0 === _) return i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                                        t = 0, _--, g |= (255 & e.read_byte(v++)) << x, x += 8
                                    }
                                    if (g >>>= m, x -= m, a += g & w[A], g >>>= A, x -= A, A = o, m = r, A + a > 258 + (31 & m) + (m >> 5 & 31) || 16 == d && A < 1) return n = null, s = 9, e.msg = "invalid bit length repeat", t = b, i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                                    d = 16 == d ? n[A - 1] : 0;
                                    do {
                                        n[A++] = d
                                    } while (0 != --a);
                                    o = A
                                }
                            }
                            if (h[0] = -1, L = [], U = [], M = [], z = [], L[0] = 9, U[0] = 6, m = r, m = p.inflate_trees_dynamic(257 + (31 & m), 1 + (m >> 5 & 31), n, L, U, M, z, u, e), 0 != m) return m == b && (n = null, s = 9), t = m, i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                            d.init(L[0], U[0], u, M[0], u, z[0]), s = 6;
                        case 6:
                            if (i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, 1 != (t = d.proc(i, e, t))) return i.inflate_flush(e, t);
                            if (t = 0, d.free(e), v = e.next_in_index, _ = e.avail_in, g = i.bitb, x = i.bitk, y = i.write, k = y < i.read ? i.read - y - 1 : i.end - y, 0 === c) {
                                s = 0;
                                break
                            }
                            s = 7;
                        case 7:
                            if (i.write = y, t = i.inflate_flush(e, t), y = i.write, k = y < i.read ? i.read - y - 1 : i.end - y, i.read != i.write) return i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                            s = 8;
                        case 8:
                            return t = 1, i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                        case 9:
                            return t = b, i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t);
                        default:
                            return t = f, i.bitb = g, i.bitk = x, e.avail_in = _, e.total_in += v - e.next_in_index, e.next_in_index = v, i.write = y, i.inflate_flush(e, t)
                    }
                }
            }, i.free = function(e) {
                i.reset(e, null), i.window = null, u = null
            }, i.set_dictionary = function(e, t, n) {
                i.window.set(e.subarray(t, t + n), 0), i.read = i.write = n
            }, i.sync_point = function() {
                return 1 == s ? 1 : 0
            }
        }
        const B = 13,
            L = [0, 0, 255, 255];

        function U() {
            const e = this;

            function t(e) {
                return e && e.istate ? (e.total_in = e.total_out = 0, e.msg = null, e.istate.mode = 7, e.istate.blocks.reset(e, null), 0) : f
            }
            e.mode = 0, e.method = 0, e.was = [0], e.need = 0, e.marker = 0, e.wbits = 0, e.inflateEnd = function(t) {
                return e.blocks && e.blocks.free(t), e.blocks = null, 0
            }, e.inflateInit = function(i, n) {
                return i.msg = null, e.blocks = null, n < 8 || n > 15 ? (e.inflateEnd(i), f) : (e.wbits = n, i.istate.blocks = new I(i, 1 << n), t(i), 0)
            }, e.inflate = function(e, t) {
                let i, n;
                if (!e || !e.istate || !e.next_in) return f;
                const s = e.istate;
                for (t = 4 == t ? x : 0, i = x;;) switch (s.mode) {
                    case 0:
                        if (0 === e.avail_in) return i;
                        if (i = t, e.avail_in--, e.total_in++, 8 != (15 & (s.method = e.read_byte(e.next_in_index++)))) {
                            s.mode = B, e.msg = "unknown compression method", s.marker = 5;
                            break
                        }
                        if (8 + (s.method >> 4) > s.wbits) {
                            s.mode = B, e.msg = "invalid window size", s.marker = 5;
                            break
                        }
                        s.mode = 1;
                    case 1:
                        if (0 === e.avail_in) return i;
                        if (i = t, e.avail_in--, e.total_in++, n = 255 & e.read_byte(e.next_in_index++), ((s.method << 8) + n) % 31 != 0) {
                            s.mode = B, e.msg = "incorrect header check", s.marker = 5;
                            break
                        }
                        if (0 == (32 & n)) {
                            s.mode = 7;
                            break
                        }
                        s.mode = 2;
                    case 2:
                        if (0 === e.avail_in) return i;
                        i = t, e.avail_in--, e.total_in++, s.need = (255 & e.read_byte(e.next_in_index++)) << 24 & 4278190080, s.mode = 3;
                    case 3:
                        if (0 === e.avail_in) return i;
                        i = t, e.avail_in--, e.total_in++, s.need += (255 & e.read_byte(e.next_in_index++)) << 16 & 16711680, s.mode = 4;
                    case 4:
                        if (0 === e.avail_in) return i;
                        i = t, e.avail_in--, e.total_in++, s.need += (255 & e.read_byte(e.next_in_index++)) << 8 & 65280, s.mode = 5;
                    case 5:
                        return 0 === e.avail_in ? i : (i = t, e.avail_in--, e.total_in++, s.need += 255 & e.read_byte(e.next_in_index++), s.mode = 6, 2);
                    case 6:
                        return s.mode = B, e.msg = "need dictionary", s.marker = 0, f;
                    case 7:
                        if (i = s.blocks.proc(e, i), i == b) {
                            s.mode = B, s.marker = 0;
                            break
                        }
                        if (0 == i && (i = t), 1 != i) return i;
                        i = t, s.blocks.reset(e, s.was), s.mode = 12;
                    case 12:
                        return 1;
                    case B:
                        return b;
                    default:
                        return f
                }
            }, e.inflateSetDictionary = function(e, t, i) {
                let n = 0,
                    s = i;
                if (!e || !e.istate || 6 != e.istate.mode) return f;
                const a = e.istate;
                return s >= 1 << a.wbits && (s = (1 << a.wbits) - 1, n = i - s), a.blocks.set_dictionary(t, n, s), a.mode = 7, 0
            }, e.inflateSync = function(e) {
                let i, n, s, a, r;
                if (!e || !e.istate) return f;
                const o = e.istate;
                if (o.mode != B && (o.mode = B, o.marker = 0), 0 === (i = e.avail_in)) return x;
                for (n = e.next_in_index, s = o.marker; 0 !== i && s < 4;) e.read_byte(n) == L[s] ? s++ : s = 0 !== e.read_byte(n) ? 0 : 4 - s, n++, i--;
                return e.total_in += n - e.next_in_index, e.next_in_index = n, e.avail_in = i, o.marker = s, 4 != s ? b : (a = e.total_in, r = e.total_out, t(e), e.total_in = a, e.total_out = r, o.mode = 7, 0)
            }, e.inflateSyncPoint = function(e) {
                return e && e.istate && e.istate.blocks ? e.istate.blocks.sync_point() : f
            }
        }

        function M() {}
        M.prototype = {
            inflateInit: function(e) {
                const t = this;
                return t.istate = new U, e || (e = 15), t.istate.inflateInit(t, e)
            },
            inflate: function(e) {
                const t = this;
                return t.istate ? t.istate.inflate(t, e) : f
            },
            inflateEnd: function() {
                const e = this;
                if (!e.istate) return f;
                const t = e.istate.inflateEnd(e);
                return e.istate = null, t
            },
            inflateSync: function() {
                const e = this;
                return e.istate ? e.istate.inflateSync(e) : f
            },
            inflateSetDictionary: function(e, t) {
                const i = this;
                return i.istate ? i.istate.inflateSetDictionary(i, e, t) : f
            },
            read_byte: function(e) {
                return this.next_in[e]
            },
            read_buf: function(e, t) {
                return this.next_in.subarray(e, e + t)
            }
        };
        const z = {
                chunkSize: 524288,
                maxWorkers: "undefined" != typeof navigator && navigator.hardwareConcurrency || 2,
                terminateWorkerTimeout: 5e3,
                useWebWorkers: !0,
                workerScripts: void 0
            },
            T = Object.assign({}, z);

        function N() {
            return T
        }

        function R(e) {
            if (void 0 !== e.chunkSize && (T.chunkSize = e.chunkSize), void 0 !== e.maxWorkers && (T.maxWorkers = e.maxWorkers), void 0 !== e.terminateWorkerTimeout && (T.terminateWorkerTimeout = e.terminateWorkerTimeout), void 0 !== e.useWebWorkers && (T.useWebWorkers = e.useWebWorkers), void 0 !== e.Deflate && (T.Deflate = e.Deflate), void 0 !== e.Inflate && (T.Inflate = e.Inflate), void 0 !== e.workerScripts) {
                if (e.workerScripts.deflate) {
                    if (!Array.isArray(e.workerScripts.deflate)) throw new Error("workerScripts.deflate must be an array");
                    T.workerScripts || (T.workerScripts = {}), T.workerScripts.deflate = e.workerScripts.deflate
                }
                if (e.workerScripts.inflate) {
                    if (!Array.isArray(e.workerScripts.inflate)) throw new Error("workerScripts.inflate must be an array");
                    T.workerScripts || (T.workerScripts = {}), T.workerScripts.inflate = e.workerScripts.inflate
                }
            }
        }
        const F = {
            application: {
                "andrew-inset": "ez",
                annodex: "anx",
                "atom+xml": "atom",
                "atomcat+xml": "atomcat",
                "atomserv+xml": "atomsrv",
                bbolin: "lin",
                cap: ["cap", "pcap"],
                "cu-seeme": "cu",
                "davmount+xml": "davmount",
                dsptype: "tsp",
                ecmascript: ["es", "ecma"],
                futuresplash: "spl",
                hta: "hta",
                "java-archive": "jar",
                "java-serialized-object": "ser",
                "java-vm": "class",
                javascript: "js",
                m3g: "m3g",
                "mac-binhex40": "hqx",
                mathematica: ["nb", "ma", "mb"],
                msaccess: "mdb",
                msword: ["doc", "dot"],
                mxf: "mxf",
                oda: "oda",
                ogg: "ogx",
                pdf: "pdf",
                "pgp-keys": "key",
                "pgp-signature": ["asc", "sig"],
                "pics-rules": "prf",
                postscript: ["ps", "ai", "eps", "epsi", "epsf", "eps2", "eps3"],
                rar: "rar",
                "rdf+xml": "rdf",
                "rss+xml": "rss",
                rtf: "rtf",
                smil: ["smi", "smil"],
                "xhtml+xml": ["xhtml", "xht"],
                xml: ["xml", "xsl", "xsd"],
                "xspf+xml": "xspf",
                zip: "zip",
                "vnd.android.package-archive": "apk",
                "vnd.cinderella": "cdy",
                "vnd.google-earth.kml+xml": "kml",
                "vnd.google-earth.kmz": "kmz",
                "vnd.mozilla.xul+xml": "xul",
                "vnd.ms-excel": ["xls", "xlb", "xlt", "xlm", "xla", "xlc", "xlw"],
                "vnd.ms-pki.seccat": "cat",
                "vnd.ms-pki.stl": "stl",
                "vnd.ms-powerpoint": ["ppt", "pps", "pot"],
                "vnd.oasis.opendocument.chart": "odc",
                "vnd.oasis.opendocument.database": "odb",
                "vnd.oasis.opendocument.formula": "odf",
                "vnd.oasis.opendocument.graphics": "odg",
                "vnd.oasis.opendocument.graphics-template": "otg",
                "vnd.oasis.opendocument.image": "odi",
                "vnd.oasis.opendocument.presentation": "odp",
                "vnd.oasis.opendocument.presentation-template": "otp",
                "vnd.oasis.opendocument.spreadsheet": "ods",
                "vnd.oasis.opendocument.spreadsheet-template": "ots",
                "vnd.oasis.opendocument.text": "odt",
                "vnd.oasis.opendocument.text-master": "odm",
                "vnd.oasis.opendocument.text-template": "ott",
                "vnd.oasis.opendocument.text-web": "oth",
                "vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
                "vnd.openxmlformats-officedocument.spreadsheetml.template": "xltx",
                "vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
                "vnd.openxmlformats-officedocument.presentationml.slideshow": "ppsx",
                "vnd.openxmlformats-officedocument.presentationml.template": "potx",
                "vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
                "vnd.openxmlformats-officedocument.wordprocessingml.template": "dotx",
                "vnd.smaf": "mmf",
                "vnd.stardivision.calc": "sdc",
                "vnd.stardivision.chart": "sds",
                "vnd.stardivision.draw": "sda",
                "vnd.stardivision.impress": "sdd",
                "vnd.stardivision.math": ["sdf", "smf"],
                "vnd.stardivision.writer": ["sdw", "vor"],
                "vnd.stardivision.writer-global": "sgl",
                "vnd.sun.xml.calc": "sxc",
                "vnd.sun.xml.calc.template": "stc",
                "vnd.sun.xml.draw": "sxd",
                "vnd.sun.xml.draw.template": "std",
                "vnd.sun.xml.impress": "sxi",
                "vnd.sun.xml.impress.template": "sti",
                "vnd.sun.xml.math": "sxm",
                "vnd.sun.xml.writer": "sxw",
                "vnd.sun.xml.writer.global": "sxg",
                "vnd.sun.xml.writer.template": "stw",
                "vnd.symbian.install": ["sis", "sisx"],
                "vnd.visio": ["vsd", "vst", "vss", "vsw"],
                "vnd.wap.wbxml": "wbxml",
                "vnd.wap.wmlc": "wmlc",
                "vnd.wap.wmlscriptc": "wmlsc",
                "vnd.wordperfect": "wpd",
                "vnd.wordperfect5.1": "wp5",
                "x-123": "wk",
                "x-7z-compressed": "7z",
                "x-abiword": "abw",
                "x-apple-diskimage": "dmg",
                "x-bcpio": "bcpio",
                "x-bittorrent": "torrent",
                "x-cbr": ["cbr", "cba", "cbt", "cb7"],
                "x-cbz": "cbz",
                "x-cdf": ["cdf", "cda"],
                "x-cdlink": "vcd",
                "x-chess-pgn": "pgn",
                "x-cpio": "cpio",
                "x-csh": "csh",
                "x-debian-package": ["deb", "udeb"],
                "x-director": ["dcr", "dir", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"],
                "x-dms": "dms",
                "x-doom": "wad",
                "x-dvi": "dvi",
                "x-httpd-eruby": "rhtml",
                "x-font": "pcf.Z",
                "x-freemind": "mm",
                "x-gnumeric": "gnumeric",
                "x-go-sgf": "sgf",
                "x-graphing-calculator": "gcf",
                "x-gtar": ["gtar", "taz"],
                "x-hdf": "hdf",
                "x-httpd-php": ["phtml", "pht", "php"],
                "x-httpd-php-source": "phps",
                "x-httpd-php3": "php3",
                "x-httpd-php3-preprocessed": "php3p",
                "x-httpd-php4": "php4",
                "x-httpd-php5": "php5",
                "x-ica": "ica",
                "x-info": "info",
                "x-internet-signup": ["ins", "isp"],
                "x-iphone": "iii",
                "x-iso9660-image": "iso",
                "x-java-jnlp-file": "jnlp",
                "x-jmol": "jmz",
                "x-killustrator": "kil",
                "x-koan": ["skp", "skd", "skt", "skm"],
                "x-kpresenter": ["kpr", "kpt"],
                "x-kword": ["kwd", "kwt"],
                "x-latex": "latex",
                "x-lha": "lha",
                "x-lyx": "lyx",
                "x-lzh": "lzh",
                "x-lzx": "lzx",
                "x-maker": ["frm", "maker", "frame", "fm", "fb", "book", "fbdoc"],
                "x-ms-wmd": "wmd",
                "x-ms-wmz": "wmz",
                "x-msdos-program": ["com", "exe", "bat", "dll"],
                "x-msi": "msi",
                "x-netcdf": ["nc", "cdf"],
                "x-ns-proxy-autoconfig": ["pac", "dat"],
                "x-nwc": "nwc",
                "x-object": "o",
                "x-oz-application": "oza",
                "x-pkcs7-certreqresp": "p7r",
                "x-python-code": ["pyc", "pyo"],
                "x-qgis": ["qgs", "shp", "shx"],
                "x-quicktimeplayer": "qtl",
                "x-redhat-package-manager": "rpm",
                "x-ruby": "rb",
                "x-sh": "sh",
                "x-shar": "shar",
                "x-shockwave-flash": ["swf", "swfl"],
                "x-silverlight": "scr",
                "x-stuffit": "sit",
                "x-sv4cpio": "sv4cpio",
                "x-sv4crc": "sv4crc",
                "x-tar": "tar",
                "x-tcl": "tcl",
                "x-tex-gf": "gf",
                "x-tex-pk": "pk",
                "x-texinfo": ["texinfo", "texi"],
                "x-trash": ["~", "%", "bak", "old", "sik"],
                "x-troff": ["t", "tr", "roff"],
                "x-troff-man": "man",
                "x-troff-me": "me",
                "x-troff-ms": "ms",
                "x-ustar": "ustar",
                "x-wais-source": "src",
                "x-wingz": "wz",
                "x-x509-ca-cert": ["crt", "der", "cer"],
                "x-xcf": "xcf",
                "x-xfig": "fig",
                "x-xpinstall": "xpi",
                applixware: "aw",
                "atomsvc+xml": "atomsvc",
                "ccxml+xml": "ccxml",
                "cdmi-capability": "cdmia",
                "cdmi-container": "cdmic",
                "cdmi-domain": "cdmid",
                "cdmi-object": "cdmio",
                "cdmi-queue": "cdmiq",
                "docbook+xml": "dbk",
                "dssc+der": "dssc",
                "dssc+xml": "xdssc",
                "emma+xml": "emma",
                "epub+zip": "epub",
                exi: "exi",
                "font-tdpfr": "pfr",
                "gml+xml": "gml",
                "gpx+xml": "gpx",
                gxf: "gxf",
                hyperstudio: "stk",
                "inkml+xml": ["ink", "inkml"],
                ipfix: "ipfix",
                json: "json",
                "jsonml+json": "jsonml",
                "lost+xml": "lostxml",
                "mads+xml": "mads",
                marc: "mrc",
                "marcxml+xml": "mrcx",
                "mathml+xml": "mathml",
                mbox: "mbox",
                "mediaservercontrol+xml": "mscml",
                "metalink+xml": "metalink",
                "metalink4+xml": "meta4",
                "mets+xml": "mets",
                "mods+xml": "mods",
                mp21: ["m21", "mp21"],
                mp4: "mp4s",
                "oebps-package+xml": "opf",
                "omdoc+xml": "omdoc",
                onenote: ["onetoc", "onetoc2", "onetmp", "onepkg"],
                oxps: "oxps",
                "patch-ops-error+xml": "xer",
                "pgp-encrypted": "pgp",
                pkcs10: "p10",
                "pkcs7-mime": ["p7m", "p7c"],
                "pkcs7-signature": "p7s",
                pkcs8: "p8",
                "pkix-attr-cert": "ac",
                "pkix-crl": "crl",
                "pkix-pkipath": "pkipath",
                pkixcmp: "pki",
                "pls+xml": "pls",
                "prs.cww": "cww",
                "pskc+xml": "pskcxml",
                "reginfo+xml": "rif",
                "relax-ng-compact-syntax": "rnc",
                "resource-lists+xml": "rl",
                "resource-lists-diff+xml": "rld",
                "rls-services+xml": "rs",
                "rpki-ghostbusters": "gbr",
                "rpki-manifest": "mft",
                "rpki-roa": "roa",
                "rsd+xml": "rsd",
                "sbml+xml": "sbml",
                "scvp-cv-request": "scq",
                "scvp-cv-response": "scs",
                "scvp-vp-request": "spq",
                "scvp-vp-response": "spp",
                sdp: "sdp",
                "set-payment-initiation": "setpay",
                "set-registration-initiation": "setreg",
                "shf+xml": "shf",
                "sparql-query": "rq",
                "sparql-results+xml": "srx",
                srgs: "gram",
                "srgs+xml": "grxml",
                "sru+xml": "sru",
                "ssdl+xml": "ssdl",
                "ssml+xml": "ssml",
                "tei+xml": ["tei", "teicorpus"],
                "thraud+xml": "tfi",
                "timestamped-data": "tsd",
                "vnd.3gpp.pic-bw-large": "plb",
                "vnd.3gpp.pic-bw-small": "psb",
                "vnd.3gpp.pic-bw-var": "pvb",
                "vnd.3gpp2.tcap": "tcap",
                "vnd.3m.post-it-notes": "pwn",
                "vnd.accpac.simply.aso": "aso",
                "vnd.accpac.simply.imp": "imp",
                "vnd.acucobol": "acu",
                "vnd.acucorp": ["atc", "acutc"],
                "vnd.adobe.air-application-installer-package+zip": "air",
                "vnd.adobe.formscentral.fcdt": "fcdt",
                "vnd.adobe.fxp": ["fxp", "fxpl"],
                "vnd.adobe.xdp+xml": "xdp",
                "vnd.adobe.xfdf": "xfdf",
                "vnd.ahead.space": "ahead",
                "vnd.airzip.filesecure.azf": "azf",
                "vnd.airzip.filesecure.azs": "azs",
                "vnd.amazon.ebook": "azw",
                "vnd.americandynamics.acc": "acc",
                "vnd.amiga.ami": "ami",
                "vnd.anser-web-certificate-issue-initiation": "cii",
                "vnd.anser-web-funds-transfer-initiation": "fti",
                "vnd.antix.game-component": "atx",
                "vnd.apple.installer+xml": "mpkg",
                "vnd.apple.mpegurl": "m3u8",
                "vnd.aristanetworks.swi": "swi",
                "vnd.astraea-software.iota": "iota",
                "vnd.audiograph": "aep",
                "vnd.blueice.multipass": "mpm",
                "vnd.bmi": "bmi",
                "vnd.businessobjects": "rep",
                "vnd.chemdraw+xml": "cdxml",
                "vnd.chipnuts.karaoke-mmd": "mmd",
                "vnd.claymore": "cla",
                "vnd.cloanto.rp9": "rp9",
                "vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
                "vnd.cluetrust.cartomobile-config": "c11amc",
                "vnd.cluetrust.cartomobile-config-pkg": "c11amz",
                "vnd.commonspace": "csp",
                "vnd.contact.cmsg": "cdbcmsg",
                "vnd.cosmocaller": "cmc",
                "vnd.crick.clicker": "clkx",
                "vnd.crick.clicker.keyboard": "clkk",
                "vnd.crick.clicker.palette": "clkp",
                "vnd.crick.clicker.template": "clkt",
                "vnd.crick.clicker.wordbank": "clkw",
                "vnd.criticaltools.wbs+xml": "wbs",
                "vnd.ctc-posml": "pml",
                "vnd.cups-ppd": "ppd",
                "vnd.curl.car": "car",
                "vnd.curl.pcurl": "pcurl",
                "vnd.dart": "dart",
                "vnd.data-vision.rdz": "rdz",
                "vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
                "vnd.dece.ttml+xml": ["uvt", "uvvt"],
                "vnd.dece.unspecified": ["uvx", "uvvx"],
                "vnd.dece.zip": ["uvz", "uvvz"],
                "vnd.denovo.fcselayout-link": "fe_launch",
                "vnd.dna": "dna",
                "vnd.dolby.mlp": "mlp",
                "vnd.dpgraph": "dpg",
                "vnd.dreamfactory": "dfac",
                "vnd.ds-keypoint": "kpxx",
                "vnd.dvb.ait": "ait",
                "vnd.dvb.service": "svc",
                "vnd.dynageo": "geo",
                "vnd.ecowin.chart": "mag",
                "vnd.enliven": "nml",
                "vnd.epson.esf": "esf",
                "vnd.epson.msf": "msf",
                "vnd.epson.quickanime": "qam",
                "vnd.epson.salt": "slt",
                "vnd.epson.ssf": "ssf",
                "vnd.eszigno3+xml": ["es3", "et3"],
                "vnd.ezpix-album": "ez2",
                "vnd.ezpix-package": "ez3",
                "vnd.fdf": "fdf",
                "vnd.fdsn.mseed": "mseed",
                "vnd.fdsn.seed": ["seed", "dataless"],
                "vnd.flographit": "gph",
                "vnd.fluxtime.clip": "ftc",
                "vnd.framemaker": ["fm", "frame", "maker", "book"],
                "vnd.frogans.fnc": "fnc",
                "vnd.frogans.ltf": "ltf",
                "vnd.fsc.weblaunch": "fsc",
                "vnd.fujitsu.oasys": "oas",
                "vnd.fujitsu.oasys2": "oa2",
                "vnd.fujitsu.oasys3": "oa3",
                "vnd.fujitsu.oasysgp": "fg5",
                "vnd.fujitsu.oasysprs": "bh2",
                "vnd.fujixerox.ddd": "ddd",
                "vnd.fujixerox.docuworks": "xdw",
                "vnd.fujixerox.docuworks.binder": "xbd",
                "vnd.fuzzysheet": "fzs",
                "vnd.genomatix.tuxedo": "txd",
                "vnd.geogebra.file": "ggb",
                "vnd.geogebra.tool": "ggt",
                "vnd.geometry-explorer": ["gex", "gre"],
                "vnd.geonext": "gxt",
                "vnd.geoplan": "g2w",
                "vnd.geospace": "g3w",
                "vnd.gmx": "gmx",
                "vnd.grafeq": ["gqf", "gqs"],
                "vnd.groove-account": "gac",
                "vnd.groove-help": "ghf",
                "vnd.groove-identity-message": "gim",
                "vnd.groove-injector": "grv",
                "vnd.groove-tool-message": "gtm",
                "vnd.groove-tool-template": "tpl",
                "vnd.groove-vcard": "vcg",
                "vnd.hal+xml": "hal",
                "vnd.handheld-entertainment+xml": "zmm",
                "vnd.hbci": "hbci",
                "vnd.hhe.lesson-player": "les",
                "vnd.hp-hpgl": "hpgl",
                "vnd.hp-hpid": "hpid",
                "vnd.hp-hps": "hps",
                "vnd.hp-jlyt": "jlt",
                "vnd.hp-pcl": "pcl",
                "vnd.hp-pclxl": "pclxl",
                "vnd.hydrostatix.sof-data": "sfd-hdstx",
                "vnd.ibm.minipay": "mpy",
                "vnd.ibm.modcap": ["afp", "listafp", "list3820"],
                "vnd.ibm.rights-management": "irm",
                "vnd.ibm.secure-container": "sc",
                "vnd.iccprofile": ["icc", "icm"],
                "vnd.igloader": "igl",
                "vnd.immervision-ivp": "ivp",
                "vnd.immervision-ivu": "ivu",
                "vnd.insors.igm": "igm",
                "vnd.intercon.formnet": ["xpw", "xpx"],
                "vnd.intergeo": "i2g",
                "vnd.intu.qbo": "qbo",
                "vnd.intu.qfx": "qfx",
                "vnd.ipunplugged.rcprofile": "rcprofile",
                "vnd.irepository.package+xml": "irp",
                "vnd.is-xpr": "xpr",
                "vnd.isac.fcs": "fcs",
                "vnd.jam": "jam",
                "vnd.jcp.javame.midlet-rms": "rms",
                "vnd.jisp": "jisp",
                "vnd.joost.joda-archive": "joda",
                "vnd.kahootz": ["ktz", "ktr"],
                "vnd.kde.karbon": "karbon",
                "vnd.kde.kchart": "chrt",
                "vnd.kde.kformula": "kfo",
                "vnd.kde.kivio": "flw",
                "vnd.kde.kontour": "kon",
                "vnd.kde.kpresenter": ["kpr", "kpt"],
                "vnd.kde.kspread": "ksp",
                "vnd.kde.kword": ["kwd", "kwt"],
                "vnd.kenameaapp": "htke",
                "vnd.kidspiration": "kia",
                "vnd.kinar": ["kne", "knp"],
                "vnd.koan": ["skp", "skd", "skt", "skm"],
                "vnd.kodak-descriptor": "sse",
                "vnd.las.las+xml": "lasxml",
                "vnd.llamagraphics.life-balance.desktop": "lbd",
                "vnd.llamagraphics.life-balance.exchange+xml": "lbe",
                "vnd.lotus-1-2-3": "123",
                "vnd.lotus-approach": "apr",
                "vnd.lotus-freelance": "pre",
                "vnd.lotus-notes": "nsf",
                "vnd.lotus-organizer": "org",
                "vnd.lotus-screencam": "scm",
                "vnd.lotus-wordpro": "lwp",
                "vnd.macports.portpkg": "portpkg",
                "vnd.mcd": "mcd",
                "vnd.medcalcdata": "mc1",
                "vnd.mediastation.cdkey": "cdkey",
                "vnd.mfer": "mwf",
                "vnd.mfmp": "mfm",
                "vnd.micrografx.flo": "flo",
                "vnd.micrografx.igx": "igx",
                "vnd.mif": "mif",
                "vnd.mobius.daf": "daf",
                "vnd.mobius.dis": "dis",
                "vnd.mobius.mbk": "mbk",
                "vnd.mobius.mqy": "mqy",
                "vnd.mobius.msl": "msl",
                "vnd.mobius.plc": "plc",
                "vnd.mobius.txf": "txf",
                "vnd.mophun.application": "mpn",
                "vnd.mophun.certificate": "mpc",
                "vnd.ms-artgalry": "cil",
                "vnd.ms-cab-compressed": "cab",
                "vnd.ms-excel.addin.macroenabled.12": "xlam",
                "vnd.ms-excel.sheet.binary.macroenabled.12": "xlsb",
                "vnd.ms-excel.sheet.macroenabled.12": "xlsm",
                "vnd.ms-excel.template.macroenabled.12": "xltm",
                "vnd.ms-fontobject": "eot",
                "vnd.ms-htmlhelp": "chm",
                "vnd.ms-ims": "ims",
                "vnd.ms-lrm": "lrm",
                "vnd.ms-officetheme": "thmx",
                "vnd.ms-powerpoint.addin.macroenabled.12": "ppam",
                "vnd.ms-powerpoint.presentation.macroenabled.12": "pptm",
                "vnd.ms-powerpoint.slide.macroenabled.12": "sldm",
                "vnd.ms-powerpoint.slideshow.macroenabled.12": "ppsm",
                "vnd.ms-powerpoint.template.macroenabled.12": "potm",
                "vnd.ms-project": ["mpp", "mpt"],
                "vnd.ms-word.document.macroenabled.12": "docm",
                "vnd.ms-word.template.macroenabled.12": "dotm",
                "vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
                "vnd.ms-wpl": "wpl",
                "vnd.ms-xpsdocument": "xps",
                "vnd.mseq": "mseq",
                "vnd.musician": "mus",
                "vnd.muvee.style": "msty",
                "vnd.mynfc": "taglet",
                "vnd.neurolanguage.nlu": "nlu",
                "vnd.nitf": ["ntf", "nitf"],
                "vnd.noblenet-directory": "nnd",
                "vnd.noblenet-sealer": "nns",
                "vnd.noblenet-web": "nnw",
                "vnd.nokia.n-gage.data": "ngdat",
                "vnd.nokia.n-gage.symbian.install": "n-gage",
                "vnd.nokia.radio-preset": "rpst",
                "vnd.nokia.radio-presets": "rpss",
                "vnd.novadigm.edm": "edm",
                "vnd.novadigm.edx": "edx",
                "vnd.novadigm.ext": "ext",
                "vnd.oasis.opendocument.chart-template": "otc",
                "vnd.oasis.opendocument.formula-template": "odft",
                "vnd.oasis.opendocument.image-template": "oti",
                "vnd.olpc-sugar": "xo",
                "vnd.oma.dd2+xml": "dd2",
                "vnd.openofficeorg.extension": "oxt",
                "vnd.openxmlformats-officedocument.presentationml.slide": "sldx",
                "vnd.osgeo.mapguide.package": "mgp",
                "vnd.osgi.dp": "dp",
                "vnd.osgi.subsystem": "esa",
                "vnd.palm": ["pdb", "pqa", "oprc"],
                "vnd.pawaafile": "paw",
                "vnd.pg.format": "str",
                "vnd.pg.osasli": "ei6",
                "vnd.picsel": "efif",
                "vnd.pmi.widget": "wg",
                "vnd.pocketlearn": "plf",
                "vnd.powerbuilder6": "pbd",
                "vnd.previewsystems.box": "box",
                "vnd.proteus.magazine": "mgz",
                "vnd.publishare-delta-tree": "qps",
                "vnd.pvi.ptid1": "ptid",
                "vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"],
                "vnd.realvnc.bed": "bed",
                "vnd.recordare.musicxml": "mxl",
                "vnd.recordare.musicxml+xml": "musicxml",
                "vnd.rig.cryptonote": "cryptonote",
                "vnd.rn-realmedia": "rm",
                "vnd.rn-realmedia-vbr": "rmvb",
                "vnd.route66.link66+xml": "link66",
                "vnd.sailingtracker.track": "st",
                "vnd.seemail": "see",
                "vnd.sema": "sema",
                "vnd.semd": "semd",
                "vnd.semf": "semf",
                "vnd.shana.informed.formdata": "ifm",
                "vnd.shana.informed.formtemplate": "itp",
                "vnd.shana.informed.interchange": "iif",
                "vnd.shana.informed.package": "ipk",
                "vnd.simtech-mindmapper": ["twd", "twds"],
                "vnd.smart.teacher": "teacher",
                "vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
                "vnd.spotfire.dxp": "dxp",
                "vnd.spotfire.sfs": "sfs",
                "vnd.stepmania.package": "smzip",
                "vnd.stepmania.stepchart": "sm",
                "vnd.sus-calendar": ["sus", "susp"],
                "vnd.svd": "svd",
                "vnd.syncml+xml": "xsm",
                "vnd.syncml.dm+wbxml": "bdm",
                "vnd.syncml.dm+xml": "xdm",
                "vnd.tao.intent-module-archive": "tao",
                "vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
                "vnd.tmobile-livetv": "tmo",
                "vnd.trid.tpt": "tpt",
                "vnd.triscape.mxs": "mxs",
                "vnd.trueapp": "tra",
                "vnd.ufdl": ["ufd", "ufdl"],
                "vnd.uiq.theme": "utz",
                "vnd.umajin": "umj",
                "vnd.unity": "unityweb",
                "vnd.uoml+xml": "uoml",
                "vnd.vcx": "vcx",
                "vnd.visionary": "vis",
                "vnd.vsf": "vsf",
                "vnd.webturbo": "wtb",
                "vnd.wolfram.player": "nbp",
                "vnd.wqd": "wqd",
                "vnd.wt.stf": "stf",
                "vnd.xara": "xar",
                "vnd.xfdl": "xfdl",
                "vnd.yamaha.hv-dic": "hvd",
                "vnd.yamaha.hv-script": "hvs",
                "vnd.yamaha.hv-voice": "hvp",
                "vnd.yamaha.openscoreformat": "osf",
                "vnd.yamaha.openscoreformat.osfpvg+xml": "osfpvg",
                "vnd.yamaha.smaf-audio": "saf",
                "vnd.yamaha.smaf-phrase": "spf",
                "vnd.yellowriver-custom-menu": "cmp",
                "vnd.zul": ["zir", "zirz"],
                "vnd.zzazz.deck+xml": "zaz",
                "voicexml+xml": "vxml",
                widget: "wgt",
                winhlp: "hlp",
                "wsdl+xml": "wsdl",
                "wspolicy+xml": "wspolicy",
                "x-ace-compressed": "ace",
                "x-authorware-bin": ["aab", "x32", "u32", "vox"],
                "x-authorware-map": "aam",
                "x-authorware-seg": "aas",
                "x-blorb": ["blb", "blorb"],
                "x-bzip": "bz",
                "x-bzip2": ["bz2", "boz"],
                "x-cfs-compressed": "cfs",
                "x-chat": "chat",
                "x-conference": "nsc",
                "x-dgc-compressed": "dgc",
                "x-dtbncx+xml": "ncx",
                "x-dtbook+xml": "dtb",
                "x-dtbresource+xml": "res",
                "x-eva": "eva",
                "x-font-bdf": "bdf",
                "x-font-ghostscript": "gsf",
                "x-font-linux-psf": "psf",
                "x-font-otf": "otf",
                "x-font-pcf": "pcf",
                "x-font-snf": "snf",
                "x-font-ttf": ["ttf", "ttc"],
                "x-font-type1": ["pfa", "pfb", "pfm", "afm"],
                "x-font-woff": "woff",
                "x-freearc": "arc",
                "x-gca-compressed": "gca",
                "x-glulx": "ulx",
                "x-gramps-xml": "gramps",
                "x-install-instructions": "install",
                "x-lzh-compressed": ["lzh", "lha"],
                "x-mie": "mie",
                "x-mobipocket-ebook": ["prc", "mobi"],
                "x-ms-application": "application",
                "x-ms-shortcut": "lnk",
                "x-ms-xbap": "xbap",
                "x-msbinder": "obd",
                "x-mscardfile": "crd",
                "x-msclip": "clp",
                "x-msdownload": ["exe", "dll", "com", "bat", "msi"],
                "x-msmediaview": ["mvb", "m13", "m14"],
                "x-msmetafile": ["wmf", "wmz", "emf", "emz"],
                "x-msmoney": "mny",
                "x-mspublisher": "pub",
                "x-msschedule": "scd",
                "x-msterminal": "trm",
                "x-mswrite": "wri",
                "x-nzb": "nzb",
                "x-pkcs12": ["p12", "pfx"],
                "x-pkcs7-certificates": ["p7b", "spc"],
                "x-research-info-systems": "ris",
                "x-silverlight-app": "xap",
                "x-sql": "sql",
                "x-stuffitx": "sitx",
                "x-subrip": "srt",
                "x-t3vm-image": "t3",
                "x-tads": "gam",
                "x-tex": "tex",
                "x-tex-tfm": "tfm",
                "x-tgif": "obj",
                "x-xliff+xml": "xlf",
                "x-xz": "xz",
                "x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
                "xaml+xml": "xaml",
                "xcap-diff+xml": "xdf",
                "xenc+xml": "xenc",
                "xml-dtd": "dtd",
                "xop+xml": "xop",
                "xproc+xml": "xpl",
                "xslt+xml": "xslt",
                "xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
                yang: "yang",
                "yin+xml": "yin",
                envoy: "evy",
                fractals: "fif",
                "internet-property-stream": "acx",
                olescript: "axs",
                "vnd.ms-outlook": "msg",
                "vnd.ms-pkicertstore": "sst",
                "x-compress": "z",
                "x-compressed": "tgz",
                "x-gzip": "gz",
                "x-perfmon": ["pma", "pmc", "pml", "pmr", "pmw"],
                "x-pkcs7-mime": ["p7c", "p7m"],
                "ynd.ms-pkipko": "pko"
            },
            audio: {
                amr: "amr",
                "amr-wb": "awb",
                annodex: "axa",
                basic: ["au", "snd"],
                flac: "flac",
                midi: ["mid", "midi", "kar", "rmi"],
                mpeg: ["mpga", "mpega", "mp2", "mp3", "m4a", "mp2a", "m2a", "m3a"],
                mpegurl: "m3u",
                ogg: ["oga", "ogg", "spx"],
                "prs.sid": "sid",
                "x-aiff": ["aif", "aiff", "aifc"],
                "x-gsm": "gsm",
                "x-ms-wma": "wma",
                "x-ms-wax": "wax",
                "x-pn-realaudio": "ram",
                "x-realaudio": "ra",
                "x-sd2": "sd2",
                "x-wav": "wav",
                adpcm: "adp",
                mp4: "mp4a",
                s3m: "s3m",
                silk: "sil",
                "vnd.dece.audio": ["uva", "uvva"],
                "vnd.digital-winds": "eol",
                "vnd.dra": "dra",
                "vnd.dts": "dts",
                "vnd.dts.hd": "dtshd",
                "vnd.lucent.voice": "lvp",
                "vnd.ms-playready.media.pya": "pya",
                "vnd.nuera.ecelp4800": "ecelp4800",
                "vnd.nuera.ecelp7470": "ecelp7470",
                "vnd.nuera.ecelp9600": "ecelp9600",
                "vnd.rip": "rip",
                webm: "weba",
                "x-aac": "aac",
                "x-caf": "caf",
                "x-matroska": "mka",
                "x-pn-realaudio-plugin": "rmp",
                xm: "xm",
                mid: ["mid", "rmi"]
            },
            chemical: {
                "x-alchemy": "alc",
                "x-cache": ["cac", "cache"],
                "x-cache-csf": "csf",
                "x-cactvs-binary": ["cbin", "cascii", "ctab"],
                "x-cdx": "cdx",
                "x-chem3d": "c3d",
                "x-cif": "cif",
                "x-cmdf": "cmdf",
                "x-cml": "cml",
                "x-compass": "cpa",
                "x-crossfire": "bsd",
                "x-csml": ["csml", "csm"],
                "x-ctx": "ctx",
                "x-cxf": ["cxf", "cef"],
                "x-embl-dl-nucleotide": ["emb", "embl"],
                "x-gamess-input": ["inp", "gam", "gamin"],
                "x-gaussian-checkpoint": ["fch", "fchk"],
                "x-gaussian-cube": "cub",
                "x-gaussian-input": ["gau", "gjc", "gjf"],
                "x-gaussian-log": "gal",
                "x-gcg8-sequence": "gcg",
                "x-genbank": "gen",
                "x-hin": "hin",
                "x-isostar": ["istr", "ist"],
                "x-jcamp-dx": ["jdx", "dx"],
                "x-kinemage": "kin",
                "x-macmolecule": "mcm",
                "x-macromodel-input": ["mmd", "mmod"],
                "x-mdl-molfile": "mol",
                "x-mdl-rdfile": "rd",
                "x-mdl-rxnfile": "rxn",
                "x-mdl-sdfile": ["sd", "sdf"],
                "x-mdl-tgf": "tgf",
                "x-mmcif": "mcif",
                "x-mol2": "mol2",
                "x-molconn-Z": "b",
                "x-mopac-graph": "gpt",
                "x-mopac-input": ["mop", "mopcrt", "mpc", "zmt"],
                "x-mopac-out": "moo",
                "x-ncbi-asn1": "asn",
                "x-ncbi-asn1-ascii": ["prt", "ent"],
                "x-ncbi-asn1-binary": ["val", "aso"],
                "x-pdb": ["pdb", "ent"],
                "x-rosdal": "ros",
                "x-swissprot": "sw",
                "x-vamas-iso14976": "vms",
                "x-vmd": "vmd",
                "x-xtel": "xtel",
                "x-xyz": "xyz"
            },
            image: {
                gif: "gif",
                ief: "ief",
                jpeg: ["jpeg", "jpg", "jpe"],
                pcx: "pcx",
                png: "png",
                "svg+xml": ["svg", "svgz"],
                tiff: ["tiff", "tif"],
                "vnd.djvu": ["djvu", "djv"],
                "vnd.wap.wbmp": "wbmp",
                "x-canon-cr2": "cr2",
                "x-canon-crw": "crw",
                "x-cmu-raster": "ras",
                "x-coreldraw": "cdr",
                "x-coreldrawpattern": "pat",
                "x-coreldrawtemplate": "cdt",
                "x-corelphotopaint": "cpt",
                "x-epson-erf": "erf",
                "x-icon": "ico",
                "x-jg": "art",
                "x-jng": "jng",
                "x-nikon-nef": "nef",
                "x-olympus-orf": "orf",
                "x-photoshop": "psd",
                "x-portable-anymap": "pnm",
                "x-portable-bitmap": "pbm",
                "x-portable-graymap": "pgm",
                "x-portable-pixmap": "ppm",
                "x-rgb": "rgb",
                "x-xbitmap": "xbm",
                "x-xpixmap": "xpm",
                "x-xwindowdump": "xwd",
                bmp: "bmp",
                cgm: "cgm",
                g3fax: "g3",
                ktx: "ktx",
                "prs.btif": "btif",
                sgi: "sgi",
                "vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
                "vnd.dwg": "dwg",
                "vnd.dxf": "dxf",
                "vnd.fastbidsheet": "fbs",
                "vnd.fpx": "fpx",
                "vnd.fst": "fst",
                "vnd.fujixerox.edmics-mmr": "mmr",
                "vnd.fujixerox.edmics-rlc": "rlc",
                "vnd.ms-modi": "mdi",
                "vnd.ms-photo": "wdp",
                "vnd.net-fpx": "npx",
                "vnd.xiff": "xif",
                webp: "webp",
                "x-3ds": "3ds",
                "x-cmx": "cmx",
                "x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
                "x-pict": ["pic", "pct"],
                "x-tga": "tga",
                "cis-cod": "cod",
                pipeg: "jfif"
            },
            message: {
                rfc822: ["eml", "mime", "mht", "mhtml", "nws"]
            },
            model: {
                iges: ["igs", "iges"],
                mesh: ["msh", "mesh", "silo"],
                vrml: ["wrl", "vrml"],
                "x3d+vrml": ["x3dv", "x3dvz"],
                "x3d+xml": ["x3d", "x3dz"],
                "x3d+binary": ["x3db", "x3dbz"],
                "vnd.collada+xml": "dae",
                "vnd.dwf": "dwf",
                "vnd.gdl": "gdl",
                "vnd.gtw": "gtw",
                "vnd.mts": "mts",
                "vnd.vtu": "vtu"
            },
            text: {
                "cache-manifest": ["manifest", "appcache"],
                calendar: ["ics", "icz", "ifb"],
                css: "css",
                csv: "csv",
                h323: "323",
                html: ["html", "htm", "shtml", "stm"],
                iuls: "uls",
                mathml: "mml",
                plain: ["txt", "text", "brf", "conf", "def", "list", "log", "in", "bas"],
                richtext: "rtx",
                scriptlet: ["sct", "wsc"],
                texmacs: ["tm", "ts"],
                "tab-separated-values": "tsv",
                "vnd.sun.j2me.app-descriptor": "jad",
                "vnd.wap.wml": "wml",
                "vnd.wap.wmlscript": "wmls",
                "x-bibtex": "bib",
                "x-boo": "boo",
                "x-c++hdr": ["h++", "hpp", "hxx", "hh"],
                "x-c++src": ["c++", "cpp", "cxx", "cc"],
                "x-component": "htc",
                "x-dsrc": "d",
                "x-diff": ["diff", "patch"],
                "x-haskell": "hs",
                "x-java": "java",
                "x-literate-haskell": "lhs",
                "x-moc": "moc",
                "x-pascal": ["p", "pas"],
                "x-pcs-gcd": "gcd",
                "x-perl": ["pl", "pm"],
                "x-python": "py",
                "x-scala": "scala",
                "x-setext": "etx",
                "x-tcl": ["tcl", "tk"],
                "x-tex": ["tex", "ltx", "sty", "cls"],
                "x-vcalendar": "vcs",
                "x-vcard": "vcf",
                n3: "n3",
                "prs.lines.tag": "dsc",
                sgml: ["sgml", "sgm"],
                troff: ["t", "tr", "roff", "man", "me", "ms"],
                turtle: "ttl",
                "uri-list": ["uri", "uris", "urls"],
                vcard: "vcard",
                "vnd.curl": "curl",
                "vnd.curl.dcurl": "dcurl",
                "vnd.curl.scurl": "scurl",
                "vnd.curl.mcurl": "mcurl",
                "vnd.dvb.subtitle": "sub",
                "vnd.fly": "fly",
                "vnd.fmi.flexstor": "flx",
                "vnd.graphviz": "gv",
                "vnd.in3d.3dml": "3dml",
                "vnd.in3d.spot": "spot",
                "x-asm": ["s", "asm"],
                "x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
                "x-fortran": ["f", "for", "f77", "f90"],
                "x-opml": "opml",
                "x-nfo": "nfo",
                "x-sfv": "sfv",
                "x-uuencode": "uu",
                webviewhtml: "htt"
            },
            video: {
                avif: ".avif",
                "3gpp": "3gp",
                annodex: "axv",
                dl: "dl",
                dv: ["dif", "dv"],
                fli: "fli",
                gl: "gl",
                mpeg: ["mpeg", "mpg", "mpe", "m1v", "m2v", "mp2", "mpa", "mpv2"],
                mp4: ["mp4", "mp4v", "mpg4"],
                quicktime: ["qt", "mov"],
                ogg: "ogv",
                "vnd.mpegurl": ["mxu", "m4u"],
                "x-flv": "flv",
                "x-la-asf": ["lsf", "lsx"],
                "x-mng": "mng",
                "x-ms-asf": ["asf", "asx", "asr"],
                "x-ms-wm": "wm",
                "x-ms-wmv": "wmv",
                "x-ms-wmx": "wmx",
                "x-ms-wvx": "wvx",
                "x-msvideo": "avi",
                "x-sgi-movie": "movie",
                "x-matroska": ["mpv", "mkv", "mk3d", "mks"],
                "3gpp2": "3g2",
                h261: "h261",
                h263: "h263",
                h264: "h264",
                jpeg: "jpgv",
                jpm: ["jpm", "jpgm"],
                mj2: ["mj2", "mjp2"],
                "vnd.dece.hd": ["uvh", "uvvh"],
                "vnd.dece.mobile": ["uvm", "uvvm"],
                "vnd.dece.pd": ["uvp", "uvvp"],
                "vnd.dece.sd": ["uvs", "uvvs"],
                "vnd.dece.video": ["uvv", "uvvv"],
                "vnd.dvb.file": "dvb",
                "vnd.fvt": "fvt",
                "vnd.ms-playready.media.pyv": "pyv",
                "vnd.uvvu.mp4": ["uvu", "uvvu"],
                "vnd.vivo": "viv",
                webm: "webm",
                "x-f4v": "f4v",
                "x-m4v": "m4v",
                "x-ms-vob": "vob",
                "x-smv": "smv"
            },
            "x-conference": {
                "x-cooltalk": "ice"
            },
            "x-world": {
                "x-vrml": ["vrm", "vrml", "wrl", "flr", "wrz", "xaf", "xof"]
            }
        };
        (() => {
            const e = {};
            for (let t in F)
                if (F.hasOwnProperty(t))
                    for (let i in F[t])
                        if (F[t].hasOwnProperty(i)) {
                            const n = F[t][i];
                            if ("string" == typeof n) e[n] = t + "/" + i;
                            else
                                for (let s = 0; s < n.length; s++) e[n[s]] = t + "/" + i
                        }
        })();
        const D = [];
        for (let e = 0; e < 256; e++) {
            let t = e;
            for (let e = 0; e < 8; e++) 1 & t ? t = t >>> 1 ^ 3988292384 : t >>>= 1;
            D[e] = t
        }
        const W = class {
                constructor(e) {
                    this.crc = e || -1
                }
                append(e) {
                    let t = 0 | this.crc;
                    for (let i = 0, n = 0 | e.length; i < n; i++) t = t >>> 8 ^ D[255 & (t ^ e[i])];
                    this.crc = t
                }
                get() {
                    return ~this.crc
                }
            },
            P = {
                concat(e, t) {
                    if (0 === e.length || 0 === t.length) return e.concat(t);
                    const i = e[e.length - 1],
                        n = P.getPartial(i);
                    return 32 === n ? e.concat(t) : P._shiftRight(t, n, 0 | i, e.slice(0, e.length - 1))
                },
                bitLength(e) {
                    const t = e.length;
                    if (0 === t) return 0;
                    const i = e[t - 1];
                    return 32 * (t - 1) + P.getPartial(i)
                },
                clamp(e, t) {
                    if (32 * e.length < t) return e;
                    const i = (e = e.slice(0, Math.ceil(t / 32))).length;
                    return t &= 31, i > 0 && t && (e[i - 1] = P.partial(t, e[i - 1] & 2147483648 >> t - 1, 1)), e
                },
                partial: (e, t, i) => 32 === e ? t : (i ? 0 | t : t << 32 - e) + 1099511627776 * e,
                getPartial: e => Math.round(e / 1099511627776) || 32,
                _shiftRight(e, t, i, n) {
                    for (void 0 === n && (n = []); t >= 32; t -= 32) n.push(i), i = 0;
                    if (0 === t) return n.concat(e);
                    for (let s = 0; s < e.length; s++) n.push(i | e[s] >>> t), i = e[s] << 32 - t;
                    const s = e.length ? e[e.length - 1] : 0,
                        a = P.getPartial(s);
                    return n.push(P.partial(t + a & 31, t + a > 32 ? i : n.pop(), 1)), n
                }
            },
            q = {
                bytes: {
                    fromBits(e) {
                        const t = P.bitLength(e) / 8,
                            i = new Uint8Array(t);
                        let n;
                        for (let s = 0; s < t; s++) 0 == (3 & s) && (n = e[s / 4]), i[s] = n >>> 24, n <<= 8;
                        return i
                    },
                    toBits(e) {
                        const t = [];
                        let i, n = 0;
                        for (i = 0; i < e.length; i++) n = n << 8 | e[i], 3 == (3 & i) && (t.push(n), n = 0);
                        return 3 & i && t.push(P.partial(8 * (3 & i), n)), t
                    }
                }
            },
            H = {
                sha1: function(e) {
                    e ? (this._h = e._h.slice(0), this._buffer = e._buffer.slice(0), this._length = e._length) : this.reset()
                }
            };
        H.sha1.prototype = {
            blockSize: 512,
            reset: function() {
                const e = this;
                return e._h = this._init.slice(0), e._buffer = [], e._length = 0, e
            },
            update: function(e) {
                const t = this;
                "string" == typeof e && (e = q.utf8String.toBits(e));
                const i = t._buffer = P.concat(t._buffer, e),
                    n = t._length,
                    s = t._length = n + P.bitLength(e);
                if (s > 9007199254740991) throw new Error("Cannot hash more than 2^53 - 1 bits");
                const a = new Uint32Array(i);
                let r = 0;
                for (let e = t.blockSize + n - (t.blockSize + n & t.blockSize - 1); e <= s; e += t.blockSize) t._block(a.subarray(16 * r, 16 * (r + 1))), r += 1;
                return i.splice(0, 16 * r), t
            },
            finalize: function() {
                const e = this;
                let t = e._buffer;
                const i = e._h;
                t = P.concat(t, [P.partial(1, 1)]);
                for (let e = t.length + 2; 15 & e; e++) t.push(0);
                for (t.push(Math.floor(e._length / 4294967296)), t.push(0 | e._length); t.length;) e._block(t.splice(0, 16));
                return e.reset(), i
            },
            _init: [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
            _key: [1518500249, 1859775393, 2400959708, 3395469782],
            _f: function(e, t, i, n) {
                return e <= 19 ? t & i | ~t & n : e <= 39 ? t ^ i ^ n : e <= 59 ? t & i | t & n | i & n : e <= 79 ? t ^ i ^ n : void 0
            },
            _S: function(e, t) {
                return t << e | t >>> 32 - e
            },
            _block: function(e) {
                const t = this,
                    i = t._h,
                    n = Array(80);
                for (let t = 0; t < 16; t++) n[t] = e[t];
                let s = i[0],
                    a = i[1],
                    r = i[2],
                    o = i[3],
                    l = i[4];
                for (let e = 0; e <= 79; e++) {
                    e >= 16 && (n[e] = t._S(1, n[e - 3] ^ n[e - 8] ^ n[e - 14] ^ n[e - 16]));
                    const i = t._S(5, s) + t._f(e, a, r, o) + l + n[e] + t._key[Math.floor(e / 20)] | 0;
                    l = o, o = r, r = t._S(30, a), a = s, s = i
                }
                i[0] = i[0] + s | 0, i[1] = i[1] + a | 0, i[2] = i[2] + r | 0, i[3] = i[3] + o | 0, i[4] = i[4] + l | 0
            }
        };
        const O = class {
                constructor(e) {
                    const t = this;
                    t._tables = [
                        [
                            [],
                            [],
                            [],
                            [],
                            []
                        ],
                        [
                            [],
                            [],
                            [],
                            [],
                            []
                        ]
                    ], t._tables[0][0][0] || t._precompute();
                    const i = t._tables[0][4],
                        n = t._tables[1],
                        s = e.length;
                    let a, r, o, l = 1;
                    if (4 !== s && 6 !== s && 8 !== s) throw new Error("invalid aes key size");
                    for (t._key = [r = e.slice(0), o = []], a = s; a < 4 * s + 28; a++) {
                        let e = r[a - 1];
                        (a % s == 0 || 8 === s && a % s == 4) && (e = i[e >>> 24] << 24 ^ i[e >> 16 & 255] << 16 ^ i[e >> 8 & 255] << 8 ^ i[255 & e], a % s == 0 && (e = e << 8 ^ e >>> 24 ^ l << 24, l = l << 1 ^ 283 * (l >> 7))), r[a] = r[a - s] ^ e
                    }
                    for (let e = 0; a; e++, a--) {
                        const t = r[3 & e ? a : a - 4];
                        o[e] = a <= 4 || e < 4 ? t : n[0][i[t >>> 24]] ^ n[1][i[t >> 16 & 255]] ^ n[2][i[t >> 8 & 255]] ^ n[3][i[255 & t]]
                    }
                }
                encrypt(e) {
                    return this._crypt(e, 0)
                }
                decrypt(e) {
                    return this._crypt(e, 1)
                }
                _precompute() {
                    const e = this._tables[0],
                        t = this._tables[1],
                        i = e[4],
                        n = t[4],
                        s = [],
                        a = [];
                    let r, o, l, h;
                    for (let e = 0; e < 256; e++) a[(s[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
                    for (let d = r = 0; !i[d]; d ^= o || 1, r = a[r] || 1) {
                        let a = r ^ r << 1 ^ r << 2 ^ r << 3 ^ r << 4;
                        a = a >> 8 ^ 255 & a ^ 99, i[d] = a, n[a] = d, h = s[l = s[o = s[d]]];
                        let c = 16843009 * h ^ 65537 * l ^ 257 * o ^ 16843008 * d,
                            u = 257 * s[a] ^ 16843008 * a;
                        for (let i = 0; i < 4; i++) e[i][d] = u = u << 24 ^ u >>> 8, t[i][a] = c = c << 24 ^ c >>> 8
                    }
                    for (let i = 0; i < 5; i++) e[i] = e[i].slice(0), t[i] = t[i].slice(0)
                }
                _crypt(e, t) {
                    if (4 !== e.length) throw new Error("invalid aes block size");
                    const i = this._key[t],
                        n = i.length / 4 - 2,
                        s = [0, 0, 0, 0],
                        a = this._tables[t],
                        r = a[0],
                        o = a[1],
                        l = a[2],
                        h = a[3],
                        d = a[4];
                    let c, u, p, m = e[0] ^ i[0],
                        g = e[t ? 3 : 1] ^ i[1],
                        f = e[2] ^ i[2],
                        b = e[t ? 1 : 3] ^ i[3],
                        x = 4;
                    for (let e = 0; e < n; e++) c = r[m >>> 24] ^ o[g >> 16 & 255] ^ l[f >> 8 & 255] ^ h[255 & b] ^ i[x], u = r[g >>> 24] ^ o[f >> 16 & 255] ^ l[b >> 8 & 255] ^ h[255 & m] ^ i[x + 1], p = r[f >>> 24] ^ o[b >> 16 & 255] ^ l[m >> 8 & 255] ^ h[255 & g] ^ i[x + 2], b = r[b >>> 24] ^ o[m >> 16 & 255] ^ l[g >> 8 & 255] ^ h[255 & f] ^ i[x + 3], x += 4, m = c, g = u, f = p;
                    for (let e = 0; e < 4; e++) s[t ? 3 & -e : e] = d[m >>> 24] << 24 ^ d[g >> 16 & 255] << 16 ^ d[f >> 8 & 255] << 8 ^ d[255 & b] ^ i[x++], c = m, m = g, g = f, f = b, b = c;
                    return s
                }
            },
            j = class {
                constructor(e, t) {
                    this._prf = e, this._initIv = t, this._iv = t
                }
                reset() {
                    this._iv = this._initIv
                }
                update(e) {
                    return this.calculate(this._prf, e, this._iv)
                }
                incWord(e) {
                    if (255 == (e >> 24 & 255)) {
                        let t = e >> 16 & 255,
                            i = e >> 8 & 255,
                            n = 255 & e;
                        255 === t ? (t = 0, 255 === i ? (i = 0, 255 === n ? n = 0 : ++n) : ++i) : ++t, e = 0, e += t << 16, e += i << 8, e += n
                    } else e += 1 << 24;
                    return e
                }
                incCounter(e) {
                    0 === (e[0] = this.incWord(e[0])) && (e[1] = this.incWord(e[1]))
                }
                calculate(e, t, i) {
                    let n;
                    if (!(n = t.length)) return [];
                    const s = P.bitLength(t);
                    for (let s = 0; s < n; s += 4) {
                        this.incCounter(i);
                        const n = e.encrypt(i);
                        t[s] ^= n[0], t[s + 1] ^= n[1], t[s + 2] ^= n[2], t[s + 3] ^= n[3]
                    }
                    return P.clamp(t, s)
                }
            },
            Z = class {
                constructor(e) {
                    const t = this,
                        i = t._hash = H.sha1,
                        n = [
                            [],
                            []
                        ],
                        s = i.prototype.blockSize / 32;
                    t._baseHash = [new i, new i], e.length > s && (e = i.hash(e));
                    for (let t = 0; t < s; t++) n[0][t] = 909522486 ^ e[t], n[1][t] = 1549556828 ^ e[t];
                    t._baseHash[0].update(n[0]), t._baseHash[1].update(n[1]), t._resultHash = new i(t._baseHash[0])
                }
                reset() {
                    const e = this;
                    e._resultHash = new e._hash(e._baseHash[0]), e._updated = !1
                }
                update(e) {
                    this._updated = !0, this._resultHash.update(e)
                }
                digest() {
                    const e = this,
                        t = e._resultHash.finalize(),
                        i = new e._hash(e._baseHash[1]).update(t).finalize();
                    return e.reset(), i
                }
            },
            K = "Invalid pasword",
            Q = 16,
            X = {
                name: "PBKDF2"
            },
            G = Object.assign({
                hash: {
                    name: "HMAC"
                }
            }, X),
            J = Object.assign({
                iterations: 1e3,
                hash: {
                    name: "SHA-1"
                }
            }, X),
            Y = ["deriveBits"],
            $ = [8, 12, 16],
            ee = [16, 24, 32],
            te = 10,
            ie = [0, 0, 0, 0],
            ne = q.bytes,
            se = O,
            ae = j,
            re = Z;
        class oe {
            constructor(e, t, i) {
                Object.assign(this, {
                    password: e,
                    signed: t,
                    strength: i - 1,
                    pendingInput: new Uint8Array(0)
                })
            }
            async append(e) {
                const t = this;
                if (t.password) {
                    const i = ue(e, 0, $[t.strength] + 2);
                    await async function(e, t, i) {
                        await de(e, i, ue(t, 0, $[e.strength]));
                        const n = ue(t, $[e.strength]),
                            s = e.keys.passwordVerification;
                        if (s[0] != n[0] || s[1] != n[1]) throw new Error(K)
                    }(t, i, t.password), t.password = null, t.aesCtrGladman = new ae(new se(t.keys.key), Array.from(ie)), t.hmac = new re(t.keys.authentication), e = ue(e, $[t.strength] + 2)
                }
                return he(t, e, new Uint8Array(e.length - te - (e.length - te) % Q), 0, te, !0)
            }
            flush() {
                const e = this,
                    t = e.pendingInput,
                    i = ue(t, 0, t.length - te),
                    n = ue(t, t.length - te);
                let s = new Uint8Array(0);
                if (i.length) {
                    const t = ne.toBits(i);
                    e.hmac.update(t);
                    const n = e.aesCtrGladman.update(t);
                    s = ne.fromBits(n)
                }
                let a = !0;
                if (e.signed) {
                    const t = ue(ne.fromBits(e.hmac.digest()), 0, te);
                    for (let e = 0; e < te; e++) t[e] != n[e] && (a = !1)
                }
                return {
                    valid: a,
                    data: s
                }
            }
        }
        class le {
            constructor(e, t) {
                Object.assign(this, {
                    password: e,
                    strength: t - 1,
                    pendingInput: new Uint8Array(0)
                })
            }
            async append(e) {
                const t = this;
                let i = new Uint8Array(0);
                t.password && (i = await async function(e, t) {
                    const i = crypto.getRandomValues(new Uint8Array($[e.strength]));
                    return await de(e, t, i), ce(i, e.keys.passwordVerification)
                }(t, t.password), t.password = null, t.aesCtrGladman = new ae(new se(t.keys.key), Array.from(ie)), t.hmac = new re(t.keys.authentication));
                const n = new Uint8Array(i.length + e.length - e.length % Q);
                return n.set(i, 0), he(t, e, n, i.length, 0)
            }
            flush() {
                const e = this;
                let t = new Uint8Array(0);
                if (e.pendingInput.length) {
                    const i = e.aesCtrGladman.update(ne.toBits(e.pendingInput));
                    e.hmac.update(i), t = ne.fromBits(i)
                }
                const i = ue(ne.fromBits(e.hmac.digest()), 0, te);
                return {
                    data: ce(t, i),
                    signature: i
                }
            }
        }

        function he(e, t, i, n, s, a) {
            const r = t.length - s;
            let o;
            for (e.pendingInput.length && (t = ce(e.pendingInput, t), i = function(e, t) {
                    if (t && t > e.length) {
                        const i = e;
                        (e = new Uint8Array(t)).set(i, 0)
                    }
                    return e
                }(i, r - r % Q)), o = 0; o <= r - Q; o += Q) {
                const s = ne.toBits(ue(t, o, o + Q));
                a && e.hmac.update(s);
                const r = e.aesCtrGladman.update(s);
                a || e.hmac.update(r), i.set(ne.fromBits(r), o + n)
            }
            return e.pendingInput = ue(t, o), i
        }
        async function de(e, t, i) {
            const n = (new TextEncoder).encode(t),
                s = await crypto.subtle.importKey("raw", n, G, !1, Y),
                a = await crypto.subtle.deriveBits(Object.assign({
                    salt: i
                }, J), s, 8 * (2 * ee[e.strength] + 2)),
                r = new Uint8Array(a);
            e.keys = {
                key: ne.toBits(ue(r, 0, ee[e.strength])),
                authentication: ne.toBits(ue(r, ee[e.strength], 2 * ee[e.strength])),
                passwordVerification: ue(r, 2 * ee[e.strength])
            }
        }

        function ce(e, t) {
            let i = e;
            return e.length + t.length && (i = new Uint8Array(e.length + t.length), i.set(e, 0), i.set(t, e.length)), i
        }

        function ue(e, t, i) {
            return e.subarray(t, i)
        }
        class pe {
            constructor(e, t) {
                Object.assign(this, {
                    password: e,
                    passwordVerification: t
                }), be(this, e)
            }
            append(e) {
                const t = this;
                if (t.password) {
                    const i = ge(t, e.subarray(0, 12));
                    if (t.password = null, i[11] != t.passwordVerification) throw new Error(K);
                    e = e.subarray(12)
                }
                return ge(t, e)
            }
            flush() {
                return {
                    valid: !0,
                    data: new Uint8Array(0)
                }
            }
        }
        class me {
            constructor(e, t) {
                Object.assign(this, {
                    password: e,
                    passwordVerification: t
                }), be(this, e)
            }
            append(e) {
                const t = this;
                let i, n;
                if (t.password) {
                    t.password = null;
                    const s = crypto.getRandomValues(new Uint8Array(12));
                    s[11] = t.passwordVerification, i = new Uint8Array(e.length + s.length), i.set(fe(t, s), 0), n = 12
                } else i = new Uint8Array(e.length), n = 0;
                return i.set(fe(t, e), n), i
            }
            flush() {
                return {
                    data: new Uint8Array(0)
                }
            }
        }

        function ge(e, t) {
            const i = new Uint8Array(t.length);
            for (let n = 0; n < t.length; n++) i[n] = we(e) ^ t[n], xe(e, i[n]);
            return i
        }

        function fe(e, t) {
            const i = new Uint8Array(t.length);
            for (let n = 0; n < t.length; n++) i[n] = we(e) ^ t[n], xe(e, t[n]);
            return i
        }

        function be(e, t) {
            e.keys = [305419896, 591751049, 878082192], e.crcKey0 = new W(e.keys[0]), e.crcKey2 = new W(e.keys[2]);
            for (let i = 0; i < t.length; i++) xe(e, t.charCodeAt(i))
        }

        function xe(e, t) {
            e.crcKey0.append([t]), e.keys[0] = ~e.crcKey0.get(), e.keys[1] = _e(e.keys[1] + ve(e.keys[0])), e.keys[1] = _e(Math.imul(e.keys[1], 134775813) + 1), e.crcKey2.append([e.keys[1] >>> 24]), e.keys[2] = ~e.crcKey2.get()
        }

        function we(e) {
            const t = 2 | e.keys[2];
            return ve(Math.imul(t, 1 ^ t) >>> 8)
        }

        function ve(e) {
            return 255 & e
        }

        function _e(e) {
            return 4294967295 & e
        }
        const ye = "deflate",
            ke = "inflate",
            Ae = "Invalid signature";
        class Ce {
            constructor(e, {
                signature: t,
                password: i,
                signed: n,
                compressed: s,
                zipCrypto: a,
                passwordVerification: r,
                encryptionStrength: o
            }, {
                chunkSize: l
            }) {
                const h = Boolean(i);
                Object.assign(this, {
                    signature: t,
                    encrypted: h,
                    signed: n,
                    compressed: s,
                    inflate: s && new e({
                        chunkSize: l
                    }),
                    crc32: n && new W,
                    zipCrypto: a,
                    decrypt: h && a ? new pe(i, r) : new oe(i, n, o)
                })
            }
            async append(e) {
                const t = this;
                return t.encrypted && e.length && (e = await t.decrypt.append(e)), t.compressed && e.length && (e = await t.inflate.append(e)), (!t.encrypted || t.zipCrypto) && t.signed && e.length && t.crc32.append(e), e
            }
            async flush() {
                const e = this;
                let t, i = new Uint8Array(0);
                if (e.encrypted) {
                    const t = e.decrypt.flush();
                    if (!t.valid) throw new Error(Ae);
                    i = t.data
                }
                if ((!e.encrypted || e.zipCrypto) && e.signed) {
                    const i = new DataView(new Uint8Array(4).buffer);
                    if (t = e.crc32.get(), i.setUint32(0, t), e.signature != i.getUint32(0, !1)) throw new Error(Ae)
                }
                return e.compressed && (i = await e.inflate.append(i) || new Uint8Array(0), await e.inflate.flush()), {
                    data: i,
                    signature: t
                }
            }
        }
        class Ve {
            constructor(e, {
                encrypted: t,
                signed: i,
                compressed: n,
                level: s,
                zipCrypto: a,
                password: r,
                passwordVerification: o,
                encryptionStrength: l
            }, {
                chunkSize: h
            }) {
                Object.assign(this, {
                    encrypted: t,
                    signed: i,
                    compressed: n,
                    deflate: n && new e({
                        level: s || 5,
                        chunkSize: h
                    }),
                    crc32: i && new W,
                    zipCrypto: a,
                    encrypt: t && a ? new me(r, o) : new le(r, l)
                })
            }
            async append(e) {
                const t = this;
                let i = e;
                return t.compressed && e.length && (i = await t.deflate.append(e)), t.encrypted && i.length && (i = await t.encrypt.append(i)), (!t.encrypted || t.zipCrypto) && t.signed && e.length && t.crc32.append(e), i
            }
            async flush() {
                const e = this;
                let t, i = new Uint8Array(0);
                if (e.compressed && (i = await e.deflate.flush() || new Uint8Array(0)), e.encrypted) {
                    i = await e.encrypt.append(i);
                    const n = e.encrypt.flush();
                    t = n.signature;
                    const s = new Uint8Array(i.length + n.data.length);
                    s.set(i, 0), s.set(n.data, i.length), i = s
                }
                return e.encrypted && !e.zipCrypto || !e.signed || (t = e.crc32.get()), {
                    data: i,
                    signature: t
                }
            }
        }
        const Se = "init",
            Ee = "append",
            Ie = "flush";
        let Be = !0;
        const Le = (e, t, i, n, s, a, r) => (Object.assign(e, {
            busy: !0,
            codecConstructor: t,
            options: Object.assign({}, i),
            scripts: r,
            terminate() {
                e.worker && !e.busy && (e.worker.terminate(), e.interface = null)
            },
            onTaskFinished() {
                e.busy = !1, s(e)
            }
        }), a ? function(e, t) {
            let i;
            const n = {
                type: "module"
            };
            if (!e.interface) {
                if (Be) try {
                    e.worker = s()
                } catch (t) {
                    Be = !1, e.worker = s(n)
                } else e.worker = s(n);
                e.worker.addEventListener("message", (function(t) {
                    const n = t.data;
                    if (i) {
                        const t = n.error,
                            s = n.type;
                        if (t) {
                            const n = new Error(t.message);
                            n.stack = t.stack, i.reject(n), i = null, e.onTaskFinished()
                        } else if (s == Se || s == Ie || s == Ee) {
                            const t = n.data;
                            s == Ie ? (i.resolve({
                                data: new Uint8Array(t),
                                signature: n.signature
                            }), i = null, e.onTaskFinished()) : i.resolve(t && new Uint8Array(t))
                        }
                    }
                }), !1), e.interface = {
                    append: e => a({
                        type: Ee,
                        data: e
                    }), flush: () => a({
                        type: Ie
                    })
                }
            }
            return e.interface;

            function s(t = {}) {
                return new Worker(new URL(e.scripts[0], "file:///C:/Users/Will/Dropbox/Projects/0x40-web/node_modules/@zip.js/zip.js/lib/core/codecs/codec-pool-worker.js"), t)
            }
            async function a(n) {
                if (!i) {
                    const i = e.options,
                        n = e.scripts.slice(1);
                    await r({
                        scripts: n,
                        type: Se,
                        options: i,
                        config: {
                            chunkSize: t.chunkSize
                        }
                    })
                }
                return r(n)
            }

            function r(t) {
                const n = e.worker,
                    s = new Promise(((e, t) => i = {
                        resolve: e,
                        reject: t
                    }));
                try {
                    if (t.data) try {
                        t.data = t.data.buffer, n.postMessage(t, [t.data])
                    } catch (e) {
                        n.postMessage(t)
                    } else n.postMessage(t)
                } catch (t) {
                    i.reject(t), i = null, e.onTaskFinished()
                }
                return s
            }
        }(e, n) : function(e, t) {
            const i = function(e, t, i) {
                return t.codecType.startsWith(ye) ? new Ve(e, t, i) : t.codecType.startsWith(ke) ? new Ce(e, t, i) : void 0
            }(e.codecConstructor, e.options, t);
            return {
                async append(t) {
                    try {
                        return await i.append(t)
                    } catch (t) {
                        throw e.onTaskFinished(), t
                    }
                },
                async flush() {
                    try {
                        return await i.flush()
                    } finally {
                        e.onTaskFinished()
                    }
                }
            }
        }(e, n));
        let Ue = [],
            Me = [];

        function ze(e, t, i) {
            const n = !(!t.compressed && !t.signed && !t.encrypted) && (t.useWebWorkers || void 0 === t.useWebWorkers && i.useWebWorkers),
                s = n && i.workerScripts ? i.workerScripts[t.codecType] : [];
            if (Ue.length < i.maxWorkers) {
                const r = {};
                return Ue.push(r), Le(r, e, t, i, a, n, s)
            } {
                const r = Ue.find((e => !e.busy));
                return r ? (Te(r), Le(r, e, t, i, a, n, s)) : new Promise((i => Me.push({
                    resolve: i,
                    codecConstructor: e,
                    options: t,
                    webWorker: n,
                    scripts: s
                })))
            }

            function a(e) {
                if (Me.length) {
                    const [{
                        resolve: t,
                        codecConstructor: n,
                        options: s,
                        webWorker: r,
                        scripts: o
                    }] = Me.splice(0, 1);
                    t(Le(e, n, s, i, a, r, o))
                } else e.worker ? (Te(e), Number.isFinite(i.terminateWorkerTimeout) && i.terminateWorkerTimeout >= 0 && (e.terminateTimeout = setTimeout((() => {
                    Ue = Ue.filter((t => t != e)), e.terminate()
                }), i.terminateWorkerTimeout))) : Ue = Ue.filter((t => t != e))
            }
        }

        function Te(e) {
            e.terminateTimeout && (clearTimeout(e.terminateTimeout), e.terminateTimeout = null)
        }
        const Ne = 4294967295,
            Re = 65535,
            Fe = 67324752,
            De = 33639248,
            We = 101010256,
            Pe = 101075792,
            qe = 117853008,
            He = 21589,
            Oe = 2048,
            je = "/",
            Ze = new Date(2107, 11, 31),
            Ke = new Date(1980, 0, 1),
            Qe = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split("");
        async function Xe(e, t, i, n, s, a, r) {
            const o = Math.max(a.chunkSize, 64);
            return async function a(l = 0, h = 0) {
                const d = r.signal;
                if (l < s) {
                    Ge(d, e);
                    const c = await t.readUint8Array(l + n, Math.min(o, s - l)),
                        u = c.length;
                    Ge(d, e);
                    const p = await e.append(c);
                    if (Ge(d, e), h += await Je(i, p), r.onprogress) try {
                        r.onprogress(l + u, s)
                    } catch (e) {}
                    return a(l + o, h)
                } {
                    const t = await e.flush();
                    return h += await Je(i, t.data), {
                        signature: t.signature,
                        length: h
                    }
                }
            }()
        }

        function Ge(e, t) {
            if (e && e.aborted) throw t.flush(), new Error("Abort error")
        }
        async function Je(e, t) {
            return t.length && await e.writeUint8Array(t), t.length
        }
        const Ye = ["filename", "rawFilename", "directory", "encrypted", "compressedSize", "uncompressedSize", "lastModDate", "rawLastModDate", "comment", "rawComment", "signature", "extraField", "rawExtraField", "bitFlag", "extraFieldZip64", "extraFieldUnicodePath", "extraFieldUnicodeComment", "extraFieldAES", "filenameUTF8", "commentUTF8", "offset", "zip64", "compressionMethod", "extraFieldNTFS", "lastAccessDate", "creationDate", "extraFieldExtendedTimestamp", "version", "versionMadeBy", "msDosCompatible", "internalFileAttribute", "externalFileAttribute"];
        class $e {
            constructor(e) {
                Ye.forEach((t => this[t] = e[t]))
            }
        }
        const et = "File format is not recognized",
            tt = "Compression method not supported",
            it = "utf-8",
            nt = ["uncompressedSize", "compressedSize", "offset"];
        class st {
            constructor(e, t = {}) {
                Object.assign(this, {
                    reader: e,
                    options: t,
                    config: N()
                })
            }
            async getEntries(e = {}) {
                const t = this,
                    i = t.reader;
                if (i.initialized || await i.init(), i.size < 22) throw new Error(et);
                const n = await async function(e, t, i, n, s) {
                    const a = new Uint8Array(4);
                    bt(a).setUint32(0, 101010256, !0);
                    return await r(22) || await r(Math.min(1048582, i));
                    async function r(t) {
                        const n = i - t,
                            s = await xt(e, n, t);
                        for (let e = s.length - 22; e >= 0; e--)
                            if (s[e] == a[0] && s[e + 1] == a[1] && s[e + 2] == a[2] && s[e + 3] == a[3]) return {
                                offset: n + e,
                                buffer: s.slice(e, e + 22).buffer
                            }
                    }
                }(i, 0, i.size);
                if (!n) throw new Error("End of central directory not found");
                const s = bt(n);
                let a = gt(s, 12),
                    r = gt(s, 16),
                    o = mt(s, 8),
                    l = 0;
                if (r == Ne || a == Ne || o == Re) {
                    const e = bt(await xt(i, n.offset - 20, 20));
                    if (gt(e, 0) != qe) throw new Error("End of Zip64 central directory not found");
                    r = ft(e, 8);
                    let t = await xt(i, r, 56),
                        s = bt(t);
                    const h = n.offset - 20 - 56;
                    if (gt(s, 0) != Pe && r != h) {
                        const e = r;
                        r = h, l = r - e, t = await xt(i, r, 56), s = bt(t)
                    }
                    if (gt(s, 0) != Pe) throw new Error("End of Zip64 central directory locator not found");
                    o = ft(s, 32), a = ft(s, 40), r -= a
                }
                if (r < 0 || r >= i.size) throw new Error(et);
                let h = 0,
                    d = await xt(i, r, a),
                    c = bt(d);
                const u = n.offset - a;
                if (gt(c, h) != De && r != u) {
                    const e = r;
                    r = u, l = r - e, d = await xt(i, r, a), c = bt(d)
                }
                if (r < 0 || r >= i.size) throw new Error(et);
                const p = [];
                for (let n = 0; n < o; n++) {
                    const s = new at(i, t.config, t.options);
                    if (gt(c, h) != De) throw new Error("Central directory header not found");
                    rt(s, c, h + 6);
                    const a = Boolean(s.bitFlag.languageEncodingFlag),
                        r = h + 46,
                        u = r + s.filenameLength,
                        m = u + s.extraFieldLength,
                        g = mt(c, h + 4),
                        f = 0 == (0 & g);
                    Object.assign(s, {
                        versionMadeBy: g,
                        msDosCompatible: f,
                        compressedSize: 0,
                        uncompressedSize: 0,
                        commentLength: mt(c, h + 32),
                        directory: f && 16 == (16 & pt(c, h + 38)),
                        offset: gt(c, h + 42) + l,
                        internalFileAttribute: gt(c, h + 34),
                        externalFileAttribute: gt(c, h + 38),
                        rawFilename: d.subarray(r, u),
                        filenameUTF8: a,
                        commentUTF8: a,
                        rawExtraField: d.subarray(u, m)
                    });
                    const b = m + s.commentLength;
                    s.rawComment = d.subarray(m, b), s.filename = dt(s.rawFilename, s.filenameUTF8 ? it : ht(t, e, "filenameEncoding")), s.comment = dt(s.rawComment, s.commentUTF8 ? it : ht(t, e, "commentEncoding")), !s.directory && s.filename.endsWith(je) && (s.directory = !0), ot(s, s, c, h + 6);
                    const x = new $e(s);
                    if (x.getData = (e, t) => s.getData(e, x, t), p.push(x), h = b, e.onprogress) try {
                        e.onprogress(n + 1, o, new $e(s))
                    } catch (e) {}
                }
                return p
            }
            async close() {}
        }
        class at {
            constructor(e, t, i) {
                Object.assign(this, {
                    reader: e,
                    config: t,
                    options: i
                })
            }
            async getData(e, t, i = {}) {
                const n = this,
                    {
                        reader: s,
                        offset: a,
                        extraFieldAES: r,
                        compressionMethod: o,
                        config: l,
                        bitFlag: h,
                        signature: d,
                        rawLastModDate: c,
                        compressedSize: u
                    } = n,
                    p = n.localDirectory = {};
                s.initialized || await s.init();
                let m = await xt(s, a, 30);
                const g = bt(m);
                let f = ht(n, i, "password");
                if (f = f && f.length && f, r && 99 != r.originalCompressionMethod) throw new Error(tt);
                if (0 != o && 8 != o) throw new Error(tt);
                if (gt(g, 0) != Fe) throw new Error("Local file header not found");
                rt(p, g, 4), m = await xt(s, a, 30 + p.filenameLength + p.extraFieldLength), p.rawExtraField = m.subarray(30 + p.filenameLength), ot(n, p, g, 4), t.lastAccessDate = p.lastAccessDate, t.creationDate = p.creationDate;
                const b = n.encrypted && p.encrypted,
                    x = b && !r;
                if (b) {
                    if (!x && void 0 === r.strength) throw new Error("Encryption method not supported");
                    if (!f) throw new Error("File contains encrypted entry")
                }
                const w = await ze(l.Inflate, {
                    codecType: ke,
                    password: f,
                    zipCrypto: x,
                    encryptionStrength: r && r.strength,
                    signed: ht(n, i, "checkSignature"),
                    passwordVerification: x && (h.dataDescriptor ? c >>> 8 & 255 : d >>> 24 & 255),
                    signature: d,
                    compressed: 0 != o,
                    encrypted: b,
                    useWebWorkers: ht(n, i, "useWebWorkers")
                }, l);
                e.initialized || await e.init();
                const v = ht(n, i, "signal"),
                    _ = a + 30 + p.filenameLength + p.extraFieldLength;
                return await Xe(w, s, e, _, u, l, {
                    onprogress: i.onprogress,
                    signal: v
                }), e.getData()
            }
        }

        function rt(e, t, i) {
            const n = e.rawBitFlag = mt(t, i + 2),
                s = 1 == (1 & n),
                a = gt(t, i + 6);
            Object.assign(e, {
                encrypted: s,
                version: mt(t, i),
                bitFlag: {
                    level: (6 & n) >> 1,
                    dataDescriptor: 8 == (8 & n),
                    languageEncodingFlag: (n & Oe) == Oe
                },
                rawLastModDate: a,
                lastModDate: ct(a),
                filenameLength: mt(t, i + 22),
                extraFieldLength: mt(t, i + 24)
            })
        }

        function ot(e, t, i, n) {
            const s = t.rawExtraField,
                a = t.extraField = new Map,
                r = bt(new Uint8Array(s));
            let o = 0;
            try {
                for (; o < s.length;) {
                    const e = mt(r, o),
                        t = mt(r, o + 2);
                    a.set(e, {
                        type: e,
                        data: s.slice(o + 4, o + 4 + t)
                    }), o += 4 + t
                }
            } catch (e) {}
            const l = mt(i, n + 4);
            t.signature = gt(i, n + 10), t.uncompressedSize = gt(i, n + 18), t.compressedSize = gt(i, n + 14);
            const h = a.get(1);
            h && (function(e, t) {
                t.zip64 = !0;
                const i = bt(e.data);
                e.values = [];
                for (let t = 0; t < Math.floor(e.data.length / 8); t++) e.values.push(ft(i, 0 + 8 * t));
                const n = nt.filter((e => t[e] == Ne));
                for (let t = 0; t < n.length; t++) e[n[t]] = e.values[t];
                nt.forEach((i => {
                    if (t[i] == Ne) {
                        if (void 0 === e[i]) throw new Error("Zip64 extra field not found");
                        t[i] = e[i]
                    }
                }))
            }(h, t), t.extraFieldZip64 = h);
            const d = a.get(28789);
            d && (lt(d, "filename", "rawFilename", t, e), t.extraFieldUnicodePath = d);
            const c = a.get(25461);
            c && (lt(c, "comment", "rawComment", t, e), t.extraFieldUnicodeComment = c);
            const u = a.get(39169);
            u ? (function(e, t, i) {
                const n = bt(e.data);
                e.vendorVersion = pt(n, 0), e.vendorId = pt(n, 2);
                const s = pt(n, 4);
                e.strength = s, e.originalCompressionMethod = i, t.compressionMethod = e.compressionMethod = mt(n, 5)
            }(u, t, l), t.extraFieldAES = u) : t.compressionMethod = l;
            const p = a.get(10);
            p && (function(e, t) {
                const i = bt(e.data);
                let n, s = 4;
                try {
                    for (; s < e.data.length && !n;) {
                        const t = mt(i, s),
                            a = mt(i, s + 2);
                        1 == t && (n = e.data.slice(s + 4, s + 4 + a)), s += 4 + a
                    }
                } catch (e) {}
                try {
                    if (n && 24 == n.length) {
                        const i = bt(n),
                            s = i.getBigUint64(0, !0),
                            a = i.getBigUint64(8, !0),
                            r = i.getBigUint64(16, !0);
                        Object.assign(e, {
                            rawLastModDate: s,
                            rawLastAccessDate: a,
                            rawCreationDate: r
                        });
                        const o = ut(s),
                            l = {
                                lastModDate: o,
                                lastAccessDate: ut(a),
                                creationDate: ut(r)
                            };
                        Object.assign(e, l), Object.assign(t, l)
                    }
                } catch (e) {}
            }(p, t), t.extraFieldNTFS = p);
            const m = a.get(He);
            m && (function(e, t) {
                const i = bt(e.data),
                    n = pt(i, 0),
                    s = [],
                    a = [];
                1 == (1 & n) && (s.push("lastModDate"), a.push("rawLastModDate")), 2 == (2 & n) && (s.push("lastAccessDate"), a.push("rawLastAccessDate")), 4 == (4 & n) && (s.push("creationDate"), a.push("rawCreationDate"));
                let r = 1;
                s.forEach(((n, s) => {
                    if (e.data.length >= r + 4) {
                        const o = gt(i, r);
                        t[n] = e[n] = new Date(1e3 * o);
                        const l = a[s];
                        e[l] = o
                    }
                    r += 4
                }))
            }(m, t), t.extraFieldExtendedTimestamp = m)
        }

        function lt(e, t, i, n, s) {
            const a = bt(e.data);
            e.version = pt(a, 0), e.signature = gt(a, 1);
            const r = new W;
            r.append(s[i]);
            const o = bt(new Uint8Array(4));
            o.setUint32(0, r.get(), !0), e[t] = (new TextDecoder).decode(e.data.subarray(5)), e.valid = !s.bitFlag.languageEncodingFlag && e.signature == gt(o, 0), e.valid && (n[t] = e[t], n[t + "UTF8"] = !0)
        }

        function ht(e, t, i) {
            return void 0 === t[i] ? e.options[i] : t[i]
        }

        function dt(e, t) {
            return t && "cp437" != t.trim().toLowerCase() ? new TextDecoder(t).decode(e) : (e => {
                let t = "";
                for (let i = 0; i < e.length; i++) t += Qe[e[i]];
                return t
            })(e)
        }

        function ct(e) {
            const t = (4294901760 & e) >> 16,
                i = 65535 & e;
            try {
                return new Date(1980 + ((65024 & t) >> 9), ((480 & t) >> 5) - 1, 31 & t, (63488 & i) >> 11, (2016 & i) >> 5, 2 * (31 & i), 0)
            } catch (e) {}
        }

        function ut(e) {
            return new Date(Number(e / BigInt(1e4) - BigInt(116444736e5)))
        }

        function pt(e, t) {
            return e.getUint8(t)
        }

        function mt(e, t) {
            return e.getUint16(t, !0)
        }

        function gt(e, t) {
            return e.getUint32(t, !0)
        }

        function ft(e, t) {
            return Number(e.getBigUint64(t, !0))
        }

        function bt(e) {
            return new DataView(e.buffer)
        }

        function xt(e, t, i) {
            return e.readUint8Array(t, i)
        }
        const wt = "HTTP error ",
            vt = "HTTP Range not supported",
            _t = "text/plain",
            yt = "Content-Length",
            kt = "Accept-Ranges",
            At = "Range",
            Ct = "HEAD",
            Vt = "GET",
            St = "bytes";
        class Et {
            constructor() {
                this.size = 0
            }
            init() {
                this.initialized = !0
            }
        }
        class It extends Et {}
        class Bt extends Et {
            writeUint8Array(e) {
                this.size += e.length
            }
        }
        class Lt extends It {
            constructor(e) {
                super(), this.blobReader = new Tt(new Blob([e], {
                    type: _t
                }))
            }
            async init() {
                super.init(), this.blobReader.init(), this.size = this.blobReader.size
            }
            async readUint8Array(e, t) {
                return this.blobReader.readUint8Array(e, t)
            }
        }
        class Ut extends Bt {
            constructor(e) {
                super(), this.encoding = e, this.blob = new Blob([], {
                    type: _t
                })
            }
            async writeUint8Array(e) {
                super.writeUint8Array(e), this.blob = new Blob([this.blob, e.buffer], {
                    type: _t
                })
            }
            getData() {
                if (this.blob.text) return this.blob.text(); {
                    const e = new FileReader;
                    return new Promise(((t, i) => {
                        e.onload = e => t(e.target.result), e.onerror = () => i(e.error), e.readAsText(this.blob, this.encoding)
                    }))
                }
            }
        }
        class Mt extends It {
            constructor(e) {
                super(), this.dataURI = e;
                let t = e.length;
                for (;
                    "=" == e.charAt(t - 1);) t--;
                this.dataStart = e.indexOf(",") + 1, this.size = Math.floor(.75 * (t - this.dataStart))
            }
            async readUint8Array(e, t) {
                const i = new Uint8Array(t),
                    n = 4 * Math.floor(e / 3),
                    s = atob(this.dataURI.substring(n + this.dataStart, 4 * Math.ceil((e + t) / 3) + this.dataStart)),
                    a = e - 3 * Math.floor(n / 4);
                for (let e = a; e < a + t; e++) i[e - a] = s.charCodeAt(e);
                return i
            }
        }
        class zt extends Bt {
            constructor(e) {
                super(), this.data = "data:" + (e || "") + ";base64,", this.pending = []
            }
            async writeUint8Array(e) {
                super.writeUint8Array(e);
                let t = 0,
                    i = this.pending;
                const n = this.pending.length;
                for (this.pending = "", t = 0; t < 3 * Math.floor((n + e.length) / 3) - n; t++) i += String.fromCharCode(e[t]);
                for (; t < e.length; t++) this.pending += String.fromCharCode(e[t]);
                i.length > 2 ? this.data += btoa(i) : this.pending = i
            }
            getData() {
                return this.data + btoa(this.pending)
            }
        }
        class Tt extends It {
            constructor(e) {
                super(), this.blob = e, this.size = e.size
            }
            async readUint8Array(e, t) {
                if (this.blob.arrayBuffer) return new Uint8Array(await this.blob.slice(e, e + t).arrayBuffer()); {
                    const i = new FileReader;
                    return new Promise(((n, s) => {
                        i.onload = e => n(new Uint8Array(e.target.result)), i.onerror = () => s(i.error), i.readAsArrayBuffer(this.blob.slice(e, e + t))
                    }))
                }
            }
        }
        class Nt extends Bt {
            constructor(e) {
                super(), this.contentType = e, this.arrayBuffers = []
            }
            async writeUint8Array(e) {
                super.writeUint8Array(e), this.arrayBuffers.push(e.buffer)
            }
            getData() {
                return this.blob || (this.blob = new Blob(this.arrayBuffers, {
                    type: this.contentType
                })), this.blob
            }
        }
        class Rt extends It {
            constructor(e, t) {
                super(), this.url = e, this.preventHeadRequest = t.preventHeadRequest, this.useRangeHeader = t.useRangeHeader, this.forceRangeRequests = t.forceRangeRequests, this.options = Object.assign({}, t), delete this.options.preventHeadRequest, delete this.options.useRangeHeader, delete this.options.forceRangeRequests, delete this.options.useXHR
            }
            async init() {
                if (super.init(), Zt(this.url) && !this.preventHeadRequest) {
                    const e = await Dt(Ct, this.url, this.options);
                    if (this.size = Number(e.headers.get(yt)), !this.forceRangeRequests && this.useRangeHeader && e.headers.get(kt) != St) throw new Error(vt);
                    void 0 === this.size && await Ft(this, this.options)
                } else await Ft(this, this.options)
            }
            async readUint8Array(e, t) {
                if (this.useRangeHeader) {
                    const i = await Dt(Vt, this.url, this.options, Object.assign({}, this.options.headers, {
                        [At]: "bytes=" + e + "-" + (e + t - 1)
                    }));
                    if (206 != i.status) throw new Error(vt);
                    return new Uint8Array(await i.arrayBuffer())
                }
                return this.data || await Ft(this, this.options), new Uint8Array(this.data.subarray(e, e + t))
            }
        }
        async function Ft(e, t) {
            const i = await Dt(Vt, e.url, t);
            e.data = new Uint8Array(await i.arrayBuffer()), e.size || (e.size = e.data.length)
        }
        async function Dt(e, t, i, n) {
            n = Object.assign({}, i.headers, n);
            const s = await fetch(t, Object.assign({}, i, {
                method: e,
                headers: n
            }));
            if (s.status < 400) return s;
            throw new Error(wt + (s.statusText || s.status))
        }
        class Wt extends It {
            constructor(e, t) {
                super(), this.url = e, this.preventHeadRequest = t.preventHeadRequest, this.useRangeHeader = t.useRangeHeader, this.forceRangeRequests = t.forceRangeRequests
            }
            async init() {
                if (super.init(), Zt(this.url) && !this.preventHeadRequest) return new Promise(((e, t) => qt(Ct, this.url, (i => {
                    this.size = Number(i.getResponseHeader(yt)), this.useRangeHeader ? this.forceRangeRequests || i.getResponseHeader(kt) == St ? e() : t(new Error(vt)) : void 0 === this.size ? Pt(this, this.url).then((() => e())).catch(t) : e()
                }), t)));
                await Pt(this, this.url)
            }
            async readUint8Array(e, t) {
                if (this.useRangeHeader) {
                    const i = await new Promise(((i, n) => qt(Vt, this.url, (e => i(e)), n, [
                        [At, "bytes=" + e + "-" + (e + t - 1)]
                    ])));
                    if (206 != i.status) throw new Error(vt);
                    return new Uint8Array(i.response)
                }
                return this.data || await Pt(this, this.url), new Uint8Array(this.data.subarray(e, e + t))
            }
        }

        function Pt(e, t) {
            return new Promise(((i, n) => qt(Vt, t, (t => {
                e.data = new Uint8Array(t.response), e.size || (e.size = e.data.length), i()
            }), n)))
        }

        function qt(e, t, i, n, s = []) {
            const a = new XMLHttpRequest;
            return a.addEventListener("load", (() => {
                a.status < 400 ? i(a) : n(wt + (a.statusText || a.status))
            }), !1), a.addEventListener("error", n, !1), a.open(e, t), s.forEach((e => a.setRequestHeader(e[0], e[1]))), a.responseType = "arraybuffer", a.send(), a
        }
        class Ht extends It {
            constructor(e, t = {}) {
                super(), this.url = e, t.useXHR ? this.reader = new Wt(e, t) : this.reader = new Rt(e, t)
            }
            set size(e) {}
            get size() {
                return this.reader.size
            }
            async init() {
                super.init(), await this.reader.init()
            }
            async readUint8Array(e, t) {
                return this.reader.readUint8Array(e, t)
            }
        }
        class Ot extends It {
            constructor(e) {
                super(), this.array = e, this.size = e.length
            }
            async readUint8Array(e, t) {
                return this.array.slice(e, e + t)
            }
        }
        class jt extends Bt {
            constructor() {
                super(), this.array = new Uint8Array(0)
            }
            async writeUint8Array(e) {
                super.writeUint8Array(e);
                const t = this.array;
                this.array = new Uint8Array(t.length + e.length), this.array.set(t), this.array.set(e, t.length)
            }
            getData() {
                return this.array
            }
        }

        function Zt(e) {
            if ("undefined" != typeof document) {
                const t = document.createElement("a");
                return t.href = e, "http:" == t.protocol || "https:" == t.protocol
            }
            return /^https?:\/\//i.test(e)
        }
        const Kt = "Version exceeds 65535",
            Qt = "Zip64 is not supported",
            Xt = new Uint8Array([7, 0, 2, 0, 65, 69, 3, 0, 0]);
        let Gt = 0;
        class Jt {
            constructor(e, t = {}) {
                Object.assign(this, {
                    writer: e,
                    options: t,
                    config: N(),
                    files: new Map,
                    offset: e.size,
                    pendingCompressedSize: 0,
                    pendingEntries: []
                })
            }
            async add(e = "", t, i = {}) {
                const n = this;
                if (!(Gt < n.config.maxWorkers)) return new Promise(((s, a) => n.pendingEntries.push({
                    name: e,
                    reader: t,
                    options: i,
                    resolve: s,
                    reject: a
                })));
                Gt++;
                try {
                    return await async function(e, t, i, n) {
                        if (t = t.trim(), n.directory && !t.endsWith(je) ? t += je : n.directory = t.endsWith(je), e.files.has(t)) throw new Error("File already exists");
                        const s = (new TextEncoder).encode(t);
                        if (s.length > Re) throw new Error("File entry name exceeds 64KB");
                        const a = n.comment || "",
                            r = (new TextEncoder).encode(a);
                        if (r.length > Re) throw new Error("File entry comment exceeds 64KB");
                        const o = e.options.version || n.version || 0;
                        if (o > Re) throw new Error(Kt);
                        const l = e.options.versionMadeBy || n.versionMadeBy || 20;
                        if (l > Re) throw new Error(Kt);
                        const h = ei(e, n, "lastModDate") || new Date,
                            d = ei(e, n, "lastAccessDate"),
                            c = ei(e, n, "creationDate"),
                            u = ei(e, n, "password"),
                            p = ei(e, n, "encryptionStrength") || 3,
                            m = ei(e, n, "zipCrypto");
                        if (void 0 !== u && void 0 !== p && (p < 1 || p > 3)) throw new Error("The strength must equal 1, 2, or 3");
                        let g = new Uint8Array(0);
                        const f = n.extraField;
                        if (f) {
                            let e = 0,
                                t = 0;
                            f.forEach((t => e += 4 + t.length)), g = new Uint8Array(e), f.forEach(((e, i) => {
                                if (i > Re) throw new Error("Extra field type exceeds 65535");
                                if (e.length > Re) throw new Error("Extra field data exceeds 64KB");
                                ai(g, new Uint16Array([i]), t), ai(g, new Uint16Array([e.length]), t + 2), ai(g, e, t + 4), t += 4 + e.length
                            }))
                        }
                        let b = ei(e, n, "extendedTimestamp");
                        void 0 === b && (b = !0);
                        let x = 0,
                            w = ei(e, n, "keepOrder");
                        void 0 === w && (w = !0);
                        let v = 0,
                            _ = ei(e, n, "msDosCompatible");
                        void 0 === _ && (_ = !0);
                        const y = ei(e, n, "internalFileAttribute") || 0,
                            k = ei(e, n, "externalFileAttribute") || 0;
                        i && (i.initialized || await i.init(), v = i.size, x = function(e) {
                            return e + 5 * (Math.floor(e / 16383) + 1)
                        }(v));
                        let A = n.zip64 || e.options.zip64 || !1;
                        if (e.offset + e.pendingCompressedSize >= Ne || v >= Ne || x >= Ne) {
                            if (!1 === n.zip64 || !1 === e.options.zip64 || !w) throw new Error(Qt);
                            A = !0
                        }
                        e.pendingCompressedSize += x, await Promise.resolve();
                        const C = ei(e, n, "level"),
                            V = ei(e, n, "useWebWorkers"),
                            S = ei(e, n, "bufferedWrite");
                        let E = ei(e, n, "dataDescriptor"),
                            I = ei(e, n, "dataDescriptorSignature");
                        const B = ei(e, n, "signal");
                        void 0 === E && (E = !0), E && void 0 === I && (I = !0);
                        const L = await async function(e, t, i, n) {
                            const s = e.files,
                                a = e.writer,
                                r = Array.from(s.values()).pop();
                            let o, l, h, d = {};
                            s.set(t, d);
                            try {
                                let c, u, p;
                                if (n.keepOrder && (c = r && r.lock), d.lock = p = new Promise((e => h = e)), n.bufferedWrite || e.lockWrite || !n.dataDescriptor ? (u = new Nt, u.init(), o = !0) : (e.lockWrite = new Promise((e => l = e)), a.initialized || await a.init(), u = a), d = await async function(e, t, i, n) {
                                        const {
                                            rawFilename: s,
                                            lastAccessDate: a,
                                            creationDate: r,
                                            password: o,
                                            level: l,
                                            zip64: h,
                                            zipCrypto: d,
                                            dataDescriptor: c,
                                            dataDescriptorSignature: u,
                                            directory: p,
                                            version: m,
                                            versionMadeBy: g,
                                            rawComment: f,
                                            rawExtraField: b,
                                            useWebWorkers: x,
                                            onprogress: w,
                                            signal: v,
                                            encryptionStrength: _,
                                            extendedTimestamp: y,
                                            msDosCompatible: k,
                                            internalFileAttribute: A,
                                            externalFileAttribute: C
                                        } = n, V = Boolean(o && o.length), S = 0 !== l && !p;
                                        let E, I, B;
                                        if (V && !d) {
                                            E = new Uint8Array(Xt.length + 2);
                                            const e = ri(E);
                                            ii(e, 0, 39169), ai(E, Xt, 2), ti(e, 8, _)
                                        } else E = new Uint8Array(0);
                                        if (y) {
                                            B = new Uint8Array(9 + (a ? 4 : 0) + (r ? 4 : 0));
                                            const e = ri(B);
                                            ii(e, 0, He), ii(e, 2, B.length - 4), ti(e, 4, 1 + (a ? 2 : 0) + (r ? 4 : 0)), ni(e, 5, Math.floor(n.lastModDate.getTime() / 1e3)), a && ni(e, 9, Math.floor(a.getTime() / 1e3)), r && ni(e, 13, Math.floor(r.getTime() / 1e3));
                                            try {
                                                I = new Uint8Array(36);
                                                const e = ri(I),
                                                    t = $t(n.lastModDate);
                                                ii(e, 0, 10), ii(e, 2, 32), ii(e, 8, 1), ii(e, 10, 24), si(e, 12, t), si(e, 20, $t(a) || t), si(e, 28, $t(r) || t)
                                            } catch (e) {
                                                I = new Uint8Array(0)
                                            }
                                        } else I = B = new Uint8Array(0);
                                        const L = {
                                            version: m || 20,
                                            versionMadeBy: g,
                                            zip64: h,
                                            directory: Boolean(p),
                                            filenameUTF8: !0,
                                            rawFilename: s,
                                            commentUTF8: !0,
                                            rawComment: f,
                                            rawExtraFieldZip64: h ? new Uint8Array(28) : new Uint8Array(0),
                                            rawExtraFieldExtendedTimestamp: B,
                                            rawExtraFieldNTFS: I,
                                            rawExtraFieldAES: E,
                                            rawExtraField: b,
                                            extendedTimestamp: y,
                                            msDosCompatible: k,
                                            internalFileAttribute: A,
                                            externalFileAttribute: C
                                        };
                                        let U = L.uncompressedSize = 0,
                                            M = Oe;
                                        c && (M |= 8);
                                        let z = 0;
                                        S && (z = 8), h && (L.version = L.version > 45 ? L.version : 45), V && (M |= 1, d || (L.version = L.version > 51 ? L.version : 51, z = 99, S && (L.rawExtraFieldAES[9] = 8))), L.compressionMethod = z;
                                        const T = L.headerArray = new Uint8Array(26),
                                            N = ri(T);
                                        ii(N, 0, L.version), ii(N, 2, M), ii(N, 4, z);
                                        const R = new Uint32Array(1),
                                            F = ri(R);
                                        let D;
                                        D = n.lastModDate < Ke ? Ke : n.lastModDate > Ze ? Ze : n.lastModDate, ii(F, 0, (D.getHours() << 6 | D.getMinutes()) << 5 | D.getSeconds() / 2), ii(F, 2, (D.getFullYear() - 1980 << 4 | D.getMonth() + 1) << 5 | D.getDate());
                                        const W = R[0];
                                        ni(N, 6, W), ii(N, 22, s.length);
                                        const P = E.length + B.length + I.length + L.rawExtraField.length;
                                        ii(N, 24, P);
                                        const q = new Uint8Array(30 + s.length + P);
                                        let H;
                                        ni(ri(q), 0, Fe), ai(q, T, 4), ai(q, s, 30), ai(q, E, 30 + s.length), ai(q, B, 30 + s.length + E.length), ai(q, I, 30 + s.length + E.length + B.length), ai(q, L.rawExtraField, 30 + s.length + E.length + B.length + I.length);
                                        let O = 0;
                                        if (e) {
                                            U = L.uncompressedSize = e.size;
                                            const n = await ze(i.Deflate, {
                                                codecType: ye,
                                                level: l,
                                                password: o,
                                                encryptionStrength: _,
                                                zipCrypto: V && d,
                                                passwordVerification: V && d && W >> 8 & 255,
                                                signed: !0,
                                                compressed: S,
                                                encrypted: V,
                                                useWebWorkers: x
                                            }, i);
                                            await t.writeUint8Array(q), L.dataWritten = !0, H = await Xe(n, e, t, 0, U, i, {
                                                onprogress: w,
                                                signal: v
                                            }), O = H.length
                                        } else await t.writeUint8Array(q), L.dataWritten = !0;
                                        let j, Z = new Uint8Array(0),
                                            K = 0;
                                        if (c && (Z = new Uint8Array(h ? u ? 24 : 20 : u ? 16 : 12), j = ri(Z), u && (K = 4, ni(j, 0, 134695760))), e) {
                                            const e = H.signature;
                                            if (V && !d || void 0 === e || (ni(N, 10, e), L.signature = e, c && ni(j, K, e)), h) {
                                                const e = ri(L.rawExtraFieldZip64);
                                                ii(e, 0, 1), ii(e, 2, 24), ni(N, 14, Ne), si(e, 12, BigInt(O)), ni(N, 18, Ne), si(e, 4, BigInt(U)), c && (si(j, K + 4, BigInt(O)), si(j, K + 12, BigInt(U)))
                                            } else ni(N, 14, O), ni(N, 18, U), c && (ni(j, K + 4, O), ni(j, K + 8, U))
                                        }
                                        c && await t.writeUint8Array(Z);
                                        const Q = q.length + O + Z.length;
                                        return Object.assign(L, {
                                            compressedSize: O,
                                            lastModDate: D,
                                            rawLastModDate: W,
                                            creationDate: r,
                                            lastAccessDate: a,
                                            encrypted: V,
                                            length: Q
                                        }), L
                                    }(i, u, e.config, n), d.lock = p, s.set(t, d), d.filename = t, o) {
                                    let t = 0;
                                    const i = u.getData();
                                    let r;
                                    await Promise.all([e.lockWrite, c]);
                                    do {
                                        r = Array.from(s.values()).find((e => e.writingBufferedData)), r && await r.lock
                                    } while (r && r.lock);
                                    if (d.writingBufferedData = !0, !n.dataDescriptor) {
                                        const e = 26,
                                            s = await Yt(i, 0, e),
                                            r = new DataView(s);
                                        d.encrypted && !n.zipCrypto || ni(r, 14, d.signature), d.zip64 ? (ni(r, 18, Ne), ni(r, 22, Ne)) : (ni(r, 18, d.compressedSize), ni(r, 22, d.uncompressedSize)), await a.writeUint8Array(new Uint8Array(s)), t = e
                                    }
                                    await async function(e, t, i = 0) {
                                        const n = 536870912;
                                        await async function s() {
                                            if (i < t.size) {
                                                const a = await Yt(t, i, i + n);
                                                await e.writeUint8Array(new Uint8Array(a)), i += n, await s()
                                            }
                                        }()
                                    }(a, i, t), delete d.writingBufferedData
                                }
                                if (d.offset = e.offset, d.zip64) si(ri(d.rawExtraFieldZip64), 20, BigInt(d.offset));
                                else if (d.offset >= Ne) throw new Error(Qt);
                                return e.offset += d.length, d
                            } catch (i) {
                                throw (o && d.writingBufferedData || !o && d.dataWritten) && (i.corruptedEntry = e.hasCorruptedEntries = !0, d.uncompressedSize && (e.offset += d.uncompressedSize)), s.delete(t), i
                            } finally {
                                h(), l && l()
                            }
                        }(e, t, i, Object.assign({}, n, {
                            rawFilename: s,
                            rawComment: r,
                            version: o,
                            versionMadeBy: l,
                            lastModDate: h,
                            lastAccessDate: d,
                            creationDate: c,
                            rawExtraField: g,
                            zip64: A,
                            password: u,
                            level: C,
                            useWebWorkers: V,
                            encryptionStrength: p,
                            extendedTimestamp: b,
                            zipCrypto: m,
                            bufferedWrite: S,
                            keepOrder: w,
                            dataDescriptor: E,
                            dataDescriptorSignature: I,
                            signal: B,
                            msDosCompatible: _,
                            internalFileAttribute: y,
                            externalFileAttribute: k
                        }));
                        return x && (e.pendingCompressedSize -= x), Object.assign(L, {
                            name: t,
                            comment: a,
                            extraField: f
                        }), new $e(L)
                    }(n, e, t, i)
                } finally {
                    Gt--;
                    const e = n.pendingEntries.shift();
                    e && n.add(e.name, e.reader, e.options).then(e.resolve).catch(e.reject)
                }
            }
            async close(e = new Uint8Array(0), t = {}) {
                return await async function(e, t, i) {
                    const n = e.writer,
                        s = e.files;
                    let a = 0,
                        r = 0,
                        o = e.offset,
                        l = s.size;
                    for (const [, e] of s) r += 46 + e.rawFilename.length + e.rawComment.length + e.rawExtraFieldZip64.length + e.rawExtraFieldAES.length + e.rawExtraFieldExtendedTimestamp.length + e.rawExtraFieldNTFS.length + e.rawExtraField.length;
                    let h = i.zip64 || e.options.zip64 || !1;
                    if (o >= Ne || r >= Ne || l >= Re) {
                        if (!1 === i.zip64 || !1 === e.options.zip64) throw new Error(Qt);
                        h = !0
                    }
                    const d = new Uint8Array(r + (h ? 98 : 22)),
                        c = ri(d);
                    if (t && t.length) {
                        if (!(t.length <= Re)) throw new Error("Zip file comment exceeds 64KB");
                        ii(c, a + 20, t.length)
                    }
                    for (const [e, t] of Array.from(s.values()).entries()) {
                        const {
                            rawFilename: n,
                            rawExtraFieldZip64: r,
                            rawExtraFieldAES: o,
                            rawExtraField: l,
                            rawComment: h,
                            versionMadeBy: u,
                            headerArray: p,
                            directory: m,
                            zip64: g,
                            msDosCompatible: f,
                            internalFileAttribute: b,
                            externalFileAttribute: x
                        } = t;
                        let w, v;
                        if (t.extendedTimestamp) {
                            v = t.rawExtraFieldNTFS, w = new Uint8Array(9);
                            const e = ri(w);
                            ii(e, 0, He), ii(e, 2, w.length - 4), ti(e, 4, 1), ni(e, 5, Math.floor(t.lastModDate.getTime() / 1e3))
                        } else v = w = new Uint8Array(0);
                        const _ = r.length + o.length + w.length + v.length + l.length;
                        if (ni(c, a, De), ii(c, a + 4, u), ai(d, p, a + 6), ii(c, a + 30, _), ii(c, a + 32, h.length), ni(c, a + 34, b), x ? ni(c, a + 38, x) : m && f && ti(c, a + 38, 16), ni(c, a + 42, g ? Ne : t.offset), ai(d, n, a + 46), ai(d, r, a + 46 + n.length), ai(d, o, a + 46 + n.length + r.length), ai(d, w, a + 46 + n.length + r.length + o.length), ai(d, v, a + 46 + n.length + r.length + o.length + w.length), ai(d, l, a + 46 + n.length + r.length + o.length + w.length + v.length), ai(d, h, a + 46 + n.length + _), a += 46 + n.length + _ + h.length, i.onprogress) try {
                            i.onprogress(e + 1, s.size, new $e(t))
                        } catch (e) {}
                    }
                    h && (ni(c, a, Pe), si(c, a + 4, BigInt(44)), ii(c, a + 12, 45), ii(c, a + 14, 45), si(c, a + 24, BigInt(l)), si(c, a + 32, BigInt(l)), si(c, a + 40, BigInt(r)), si(c, a + 48, BigInt(o)), ni(c, a + 56, qe), si(c, a + 64, BigInt(o) + BigInt(r)), ni(c, a + 72, 1), l = Re, o = Ne, r = Ne, a += 76), ni(c, a, We), ii(c, a + 8, l), ii(c, a + 10, l), ni(c, a + 12, r), ni(c, a + 16, o), await n.writeUint8Array(d), t && t.length && await n.writeUint8Array(t)
                }(this, e, t), this.writer.getData()
            }
        }

        function Yt(e, t, i) {
            if (e.arrayBuffer) return t || i ? e.slice(t, i).arrayBuffer() : e.arrayBuffer(); {
                const n = new FileReader;
                return new Promise(((s, a) => {
                    n.onload = e => s(e.target.result), n.onerror = () => a(n.error), n.readAsArrayBuffer(t || i ? e.slice(t, i) : e)
                }))
            }
        }

        function $t(e) {
            if (e) return (BigInt(e.getTime()) + BigInt(116444736e5)) * BigInt(1e4)
        }

        function ei(e, t, i) {
            return void 0 === t[i] ? e.options[i] : t[i]
        }

        function ti(e, t, i) {
            e.setUint8(t, i)
        }

        function ii(e, t, i) {
            e.setUint16(t, i, !0)
        }

        function ni(e, t, i) {
            e.setUint32(t, i, !0)
        }

        function si(e, t, i) {
            e.setBigUint64(t, i, !0)
        }

        function ai(e, t, i) {
            e.set(t, i)
        }

        function ri(e) {
            return new DataView(e.buffer)
        }
        const oi = 524288;
        class li {
            constructor(e, t, i, n) {
                const s = this;
                if (e.root && n && n.getChildByName(t)) throw new Error("Entry filename already exists");
                i || (i = {}), Object.assign(s, {
                    fs: e,
                    name: t,
                    data: i.data,
                    id: e.entries.length,
                    parent: n,
                    children: [],
                    uncompressedSize: 0
                }), e.entries.push(s), n && s.parent.children.push(s)
            }
            moveTo(e) {
                this.fs.move(this, e)
            }
            getFullname() {
                return this.getRelativeName()
            }
            getRelativeName(e = this.fs.root) {
                let t = this.name,
                    i = this.parent;
                for (; i && i != e;) t = (i.name ? i.name + "/" : "") + t, i = i.parent;
                return t
            }
            isDescendantOf(e) {
                let t = this.parent;
                for (; t && t.id != e.id;) t = t.parent;
                return Boolean(t)
            }
        }
        class hi extends li {
            constructor(e, t, i, n) {
                super(e, t, i, n);
                const s = this;
                s.Reader = i.Reader, s.Writer = i.Writer, i.getData && (s.getData = i.getData)
            }
            async getData(e, t = {}) {
                const i = this;
                return !e || e.constructor == i.Writer && i.data ? i.data : (i.reader = new i.Reader(i.data, t), await i.reader.init(), e.initialized || await e.init(), i.uncompressedSize = i.reader.size, async function(e, t) {
                    return async function i(n = 0) {
                        const s = n * oi;
                        if (s < e.size) {
                            const a = await e.readUint8Array(s, Math.min(oi, e.size - s));
                            return await t.writeUint8Array(a), i(n + 1)
                        }
                        return t.getData()
                    }()
                }(i.reader, e))
            }
            getText(e, t) {
                return this.getData(new Ut(e), t)
            }
            getBlob(e, t) {
                return this.getData(new Nt(e), t)
            }
            getData64URI(e, t) {
                return this.getData(new zt(e), t)
            }
            getUint8Array(e) {
                return this.getData(new jt, e)
            }
            replaceBlob(e) {
                Object.assign(this, {
                    data: e,
                    Reader: Tt,
                    Writer: Nt,
                    reader: null
                })
            }
            replaceText(e) {
                Object.assign(this, {
                    data: e,
                    Reader: Lt,
                    Writer: Ut,
                    reader: null
                })
            }
            replaceData64URI(e) {
                Object.assign(this, {
                    data: e,
                    Reader: Mt,
                    Writer: zt,
                    reader: null
                })
            }
            replaceUint8Array(e) {
                Object.assign(this, {
                    data: e,
                    Reader: Ot,
                    Writer: jt,
                    reader: null
                })
            }
        }
        class di extends li {
            constructor(e, t, i, n) {
                super(e, t, i, n), this.directory = !0
            }
            addDirectory(e) {
                return gi(this, e, null, !0)
            }
            addText(e, t) {
                return gi(this, e, {
                    data: t,
                    Reader: Lt,
                    Writer: Ut
                })
            }
            addBlob(e, t) {
                return gi(this, e, {
                    data: t,
                    Reader: Tt,
                    Writer: Nt
                })
            }
            addData64URI(e, t) {
                return gi(this, e, {
                    data: t,
                    Reader: Mt,
                    Writer: zt
                })
            }
            addUint8Array(e, t) {
                return gi(this, e, {
                    data: t,
                    Reader: Ot,
                    Writer: jt
                })
            }
            addHttpContent(e, t, i = {}) {
                return gi(this, e, {
                    data: t,
                    Reader: class extends Ht {
                        constructor(e) {
                            super(e, i)
                        }
                    }
                })
            }
            async addFileSystemEntry(e) {
                return async function(e, t) {
                    if (t.isDirectory) {
                        const i = e.addDirectory(t.name);
                        return await async function e(t, i) {
                            const n = await
                            function(e) {
                                return new Promise(((t, i) => {
                                    let n = [];

                                    function s(e) {
                                        e.readEntries((i => {
                                            i.length ? (n = n.concat(i), s(e)) : t(n)
                                        }), i)
                                    }
                                    e.isDirectory && s(e.createReader()), e.isFile && t(n)
                                }))
                            }(i);
                            for (const i of n) i.isDirectory ? await e(t.addDirectory(i.name), i) : await new Promise(((e, n) => {
                                i.file((n => {
                                    const s = t.addBlob(i.name, n);
                                    s.uncompressedSize = n.size, e(s)
                                }), n)
                            }))
                        }(i, t), i
                    }
                    return new Promise(((i, n) => t.file((n => i(e.addBlob(t.name, n))), n)))
                }(this, e)
            }
            async addData(e, t) {
                return gi(this, e, t)
            }
            async importBlob(e, t = {}) {
                await this.importZip(new Tt(e), t)
            }
            async importData64URI(e, t = {}) {
                await this.importZip(new Mt(e), t)
            }
            async importUint8Array(e, t = {}) {
                await this.importZip(new Ot(e), t)
            }
            async importHttpContent(e, t = {}) {
                await this.importZip(new Ht(e, t), t)
            }
            async exportBlob(e = {}) {
                return this.exportZip(new Nt("application/zip"), e)
            }
            async exportData64URI(e = {}) {
                return this.exportZip(new zt("application/zip"), e)
            }
            async exportUint8Array(e = {}) {
                return this.exportZip(new jt, e)
            }
            async importZip(e, t) {
                e.initialized || await e.init();
                const i = new st(e, t);
                (await i.getEntries()).forEach((e => {
                    let i = this;
                    const n = e.filename.split("/"),
                        s = n.pop();
                    n.forEach((e => i = i.getChildByName(e) || new di(this.fs, e, null, i))), e.directory || gi(i, s, {
                        data: e,
                        Reader: ci(Object.assign({}, t))
                    })
                }))
            }
            async exportZip(e, t) {
                const i = this;
                await ui(i), await e.init();
                const n = new Jt(e, t);
                return await async function(e, t, i, n) {
                    const s = t,
                        a = new Map;
                    await async function e(t, r) {
                        async function o(r) {
                            const o = n.relativePath ? r.getRelativeName(s) : r.getFullname();
                            await t.add(o, r.reader, Object.assign({
                                directory: r.directory
                            }, Object.assign({}, n, {
                                onprogress: e => {
                                    if (n.onprogress) {
                                        a.set(o, e);
                                        try {
                                            n.onprogress(Array.from(a.values()).reduce(((e, t) => e + t)), i)
                                        } catch (e) {}
                                    }
                                }
                            }))), await e(t, r)
                        }
                        await async function() {
                            if (n.bufferedWrite) await Promise.all(r.children.map(o));
                            else
                                for (const e of r.children) await o(e)
                        }()
                    }(e, t)
                }(n, i, function(e, t) {
                    let i = 0;
                    return e.forEach((function e(t) {
                        i += t.uncompressedSize, t.children && t.children.forEach(e)
                    })), i
                }([i]), t), await n.close(), e.getData()
            }
            getChildByName(e) {
                const t = this.children;
                for (let i = 0; i < t.length; i++) {
                    const n = t[i];
                    if (n.name == e) return n
                }
            }
        }

        function ci(e) {
            return class extends It {
                constructor(e, t = {}) {
                    super(), this.entry = e, this.options = t
                }
                async init() {
                    const t = this;
                    t.size = t.entry.uncompressedSize;
                    const i = await t.entry.getData(new Nt, Object.assign({}, t.options, e));
                    t.data = i, t.blobReader = new Tt(i)
                }
                async readUint8Array(e, t) {
                    return this.blobReader.readUint8Array(e, t)
                }
            }
        }
        async function ui(e) {
            if (e.children.length)
                for (const t of e.children) t.directory ? await ui(t) : (t.reader = new t.Reader(t.data), await t.reader.init(), t.uncompressedSize = t.reader.size)
        }

        function pi(e) {
            const t = e.parent.children;
            t.forEach(((i, n) => {
                i.id == e.id && t.splice(n, 1)
            }))
        }

        function mi(e) {
            e.entries = [], e.root = new di(e)
        }

        function gi(e, t, i, n) {
            if (e.directory) return n ? new di(e.fs, t, i, e) : new hi(e.fs, t, i, e);
            throw new Error("Parent entry is not a directory")
        }(() => {
            if ("function" == typeof URL.createObjectURL) {
                const e = '\n\t\t\t\n\nconst t=[];for(let e=0;e<256;e++){let n=e;for(let t=0;t<8;t++)1&n?n=n>>>1^3988292384:n>>>=1;t[e]=n;}class e{constructor(t){this.crc=t||-1;}append(e){let n=0|this.crc;for(let i=0,a=0|e.length;i<a;i++)n=n>>>8^t[255&(n^e[i])];this.crc=n;}get(){return ~this.crc}}const n={concat(t,e){if(0===t.length||0===e.length)return t.concat(e);const i=t[t.length-1],a=n.getPartial(i);return 32===a?t.concat(e):n._shiftRight(e,a,0|i,t.slice(0,t.length-1))},bitLength(t){const e=t.length;if(0===e)return 0;const i=t[e-1];return 32*(e-1)+n.getPartial(i)},clamp(t,e){if(32*t.length<e)return t;const i=(t=t.slice(0,Math.ceil(e/32))).length;return e&=31,i>0&&e&&(t[i-1]=n.partial(e,t[i-1]&2147483648>>e-1,1)),t},partial:(t,e,n)=>32===t?e:(n?0|e:e<<32-t)+1099511627776*t,getPartial:t=>Math.round(t/1099511627776)||32,_shiftRight(t,e,i,a){for(void 0===a&&(a=[]);e>=32;e-=32)a.push(i),i=0;if(0===e)return a.concat(t);for(let n=0;n<t.length;n++)a.push(i|t[n]>>>e),i=t[n]<<32-e;const r=t.length?t[t.length-1]:0,s=n.getPartial(r);return a.push(n.partial(e+s&31,e+s>32?i:a.pop(),1)),a}},i={bytes:{fromBits(t){const e=n.bitLength(t)/8,i=new Uint8Array(e);let a;for(let n=0;n<e;n++)0==(3&n)&&(a=t[n/4]),i[n]=a>>>24,a<<=8;return i},toBits(t){const e=[];let i,a=0;for(i=0;i<t.length;i++)a=a<<8|t[i],3==(3&i)&&(e.push(a),a=0);return 3&i&&e.push(n.partial(8*(3&i),a)),e}}},a={sha1:function(t){t?(this._h=t._h.slice(0),this._buffer=t._buffer.slice(0),this._length=t._length):this.reset();}};a.sha1.prototype={blockSize:512,reset:function(){const t=this;return t._h=this._init.slice(0),t._buffer=[],t._length=0,t},update:function(t){const e=this;"string"==typeof t&&(t=i.utf8String.toBits(t));const a=e._buffer=n.concat(e._buffer,t),r=e._length,s=e._length=r+n.bitLength(t);if(s>9007199254740991)throw new Error("Cannot hash more than 2^53 - 1 bits");const o=new Uint32Array(a);let l=0;for(let t=e.blockSize+r-(e.blockSize+r&e.blockSize-1);t<=s;t+=e.blockSize)e._block(o.subarray(16*l,16*(l+1))),l+=1;return a.splice(0,16*l),e},finalize:function(){const t=this;let e=t._buffer;const i=t._h;e=n.concat(e,[n.partial(1,1)]);for(let t=e.length+2;15&t;t++)e.push(0);for(e.push(Math.floor(t._length/4294967296)),e.push(0|t._length);e.length;)t._block(e.splice(0,16));return t.reset(),i},_init:[1732584193,4023233417,2562383102,271733878,3285377520],_key:[1518500249,1859775393,2400959708,3395469782],_f:function(t,e,n,i){return t<=19?e&n|~e&i:t<=39?e^n^i:t<=59?e&n|e&i|n&i:t<=79?e^n^i:void 0},_S:function(t,e){return e<<t|e>>>32-t},_block:function(t){const e=this,n=e._h,i=Array(80);for(let e=0;e<16;e++)i[e]=t[e];let a=n[0],r=n[1],s=n[2],o=n[3],l=n[4];for(let t=0;t<=79;t++){t>=16&&(i[t]=e._S(1,i[t-3]^i[t-8]^i[t-14]^i[t-16]));const n=e._S(5,a)+e._f(t,r,s,o)+l+i[t]+e._key[Math.floor(t/20)]|0;l=o,o=s,s=e._S(30,r),r=a,a=n;}n[0]=n[0]+a|0,n[1]=n[1]+r|0,n[2]=n[2]+s|0,n[3]=n[3]+o|0,n[4]=n[4]+l|0;}};const r={aes:class{constructor(t){const e=this;e._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],e._tables[0][0][0]||e._precompute();const n=e._tables[0][4],i=e._tables[1],a=t.length;let r,s,o,l=1;if(4!==a&&6!==a&&8!==a)throw new Error("invalid aes key size");for(e._key=[s=t.slice(0),o=[]],r=a;r<4*a+28;r++){let t=s[r-1];(r%a==0||8===a&&r%a==4)&&(t=n[t>>>24]<<24^n[t>>16&255]<<16^n[t>>8&255]<<8^n[255&t],r%a==0&&(t=t<<8^t>>>24^l<<24,l=l<<1^283*(l>>7))),s[r]=s[r-a]^t;}for(let t=0;r;t++,r--){const e=s[3&t?r:r-4];o[t]=r<=4||t<4?e:i[0][n[e>>>24]]^i[1][n[e>>16&255]]^i[2][n[e>>8&255]]^i[3][n[255&e]];}}encrypt(t){return this._crypt(t,0)}decrypt(t){return this._crypt(t,1)}_precompute(){const t=this._tables[0],e=this._tables[1],n=t[4],i=e[4],a=[],r=[];let s,o,l,_;for(let t=0;t<256;t++)r[(a[t]=t<<1^283*(t>>7))^t]=t;for(let d=s=0;!n[d];d^=o||1,s=r[s]||1){let r=s^s<<1^s<<2^s<<3^s<<4;r=r>>8^255&r^99,n[d]=r,i[r]=d,_=a[l=a[o=a[d]]];let c=16843009*_^65537*l^257*o^16843008*d,f=257*a[r]^16843008*r;for(let n=0;n<4;n++)t[n][d]=f=f<<24^f>>>8,e[n][r]=c=c<<24^c>>>8;}for(let n=0;n<5;n++)t[n]=t[n].slice(0),e[n]=e[n].slice(0);}_crypt(t,e){if(4!==t.length)throw new Error("invalid aes block size");const n=this._key[e],i=n.length/4-2,a=[0,0,0,0],r=this._tables[e],s=r[0],o=r[1],l=r[2],_=r[3],d=r[4];let c,f,u,h=t[0]^n[0],b=t[e?3:1]^n[1],w=t[2]^n[2],p=t[e?1:3]^n[3],x=4;for(let t=0;t<i;t++)c=s[h>>>24]^o[b>>16&255]^l[w>>8&255]^_[255&p]^n[x],f=s[b>>>24]^o[w>>16&255]^l[p>>8&255]^_[255&h]^n[x+1],u=s[w>>>24]^o[p>>16&255]^l[h>>8&255]^_[255&b]^n[x+2],p=s[p>>>24]^o[h>>16&255]^l[b>>8&255]^_[255&w]^n[x+3],x+=4,h=c,b=f,w=u;for(let t=0;t<4;t++)a[e?3&-t:t]=d[h>>>24]<<24^d[b>>16&255]<<16^d[w>>8&255]<<8^d[255&p]^n[x++],c=h,h=b,b=w,w=p,p=c;return a}}},s={ctrGladman:class{constructor(t,e){this._prf=t,this._initIv=e,this._iv=e;}reset(){this._iv=this._initIv;}update(t){return this.calculate(this._prf,t,this._iv)}incWord(t){if(255==(t>>24&255)){let e=t>>16&255,n=t>>8&255,i=255&t;255===e?(e=0,255===n?(n=0,255===i?i=0:++i):++n):++e,t=0,t+=e<<16,t+=n<<8,t+=i;}else t+=1<<24;return t}incCounter(t){0===(t[0]=this.incWord(t[0]))&&(t[1]=this.incWord(t[1]));}calculate(t,e,i){let a;if(!(a=e.length))return [];const r=n.bitLength(e);for(let n=0;n<a;n+=4){this.incCounter(i);const a=t.encrypt(i);e[n]^=a[0],e[n+1]^=a[1],e[n+2]^=a[2],e[n+3]^=a[3];}return n.clamp(e,r)}}},o={hmacSha1:class{constructor(t){const e=this,n=e._hash=a.sha1,i=[[],[]],r=n.prototype.blockSize/32;e._baseHash=[new n,new n],t.length>r&&(t=n.hash(t));for(let e=0;e<r;e++)i[0][e]=909522486^t[e],i[1][e]=1549556828^t[e];e._baseHash[0].update(i[0]),e._baseHash[1].update(i[1]),e._resultHash=new n(e._baseHash[0]);}reset(){const t=this;t._resultHash=new t._hash(t._baseHash[0]),t._updated=!1;}update(t){this._updated=!0,this._resultHash.update(t);}digest(){const t=this,e=t._resultHash.finalize(),n=new t._hash(t._baseHash[1]).update(e).finalize();return t.reset(),n}}},l={name:"PBKDF2"},_=Object.assign({hash:{name:"HMAC"}},l),d=Object.assign({iterations:1e3,hash:{name:"SHA-1"}},l),c=["deriveBits"],f=[8,12,16],u=[16,24,32],h=[0,0,0,0],b=i.bytes,w=r.aes,p=s.ctrGladman,x=o.hmacSha1;class g{constructor(t,e,n){Object.assign(this,{password:t,signed:e,strength:n-1,pendingInput:new Uint8Array(0)});}async append(t){const e=this;if(e.password){const n=A(t,0,f[e.strength]+2);await async function(t,e,n){await k(t,n,A(e,0,f[t.strength]));const i=A(e,f[t.strength]),a=t.keys.passwordVerification;if(a[0]!=i[0]||a[1]!=i[1])throw new Error("Invalid pasword")}(e,n,e.password),e.password=null,e.aesCtrGladman=new p(new w(e.keys.key),Array.from(h)),e.hmac=new x(e.keys.authentication),t=A(t,f[e.strength]+2);}return m(e,t,new Uint8Array(t.length-10-(t.length-10)%16),0,10,!0)}flush(){const t=this,e=t.pendingInput,n=A(e,0,e.length-10),i=A(e,e.length-10);let a=new Uint8Array(0);if(n.length){const e=b.toBits(n);t.hmac.update(e);const i=t.aesCtrGladman.update(e);a=b.fromBits(i);}let r=!0;if(t.signed){const e=A(b.fromBits(t.hmac.digest()),0,10);for(let t=0;t<10;t++)e[t]!=i[t]&&(r=!1);}return {valid:r,data:a}}}class y{constructor(t,e){Object.assign(this,{password:t,strength:e-1,pendingInput:new Uint8Array(0)});}async append(t){const e=this;let n=new Uint8Array(0);e.password&&(n=await async function(t,e){const n=crypto.getRandomValues(new Uint8Array(f[t.strength]));return await k(t,e,n),v(n,t.keys.passwordVerification)}(e,e.password),e.password=null,e.aesCtrGladman=new p(new w(e.keys.key),Array.from(h)),e.hmac=new x(e.keys.authentication));const i=new Uint8Array(n.length+t.length-t.length%16);return i.set(n,0),m(e,t,i,n.length,0)}flush(){const t=this;let e=new Uint8Array(0);if(t.pendingInput.length){const n=t.aesCtrGladman.update(b.toBits(t.pendingInput));t.hmac.update(n),e=b.fromBits(n);}const n=A(b.fromBits(t.hmac.digest()),0,10);return {data:v(e,n),signature:n}}}function m(t,e,n,i,a,r){const s=e.length-a;let o;for(t.pendingInput.length&&(e=v(t.pendingInput,e),n=function(t,e){if(e&&e>t.length){const n=t;(t=new Uint8Array(e)).set(n,0);}return t}(n,s-s%16)),o=0;o<=s-16;o+=16){const a=b.toBits(A(e,o,o+16));r&&t.hmac.update(a);const s=t.aesCtrGladman.update(a);r||t.hmac.update(s),n.set(b.fromBits(s),o+i);}return t.pendingInput=A(e,o),n}async function k(t,e,n){const i=(new TextEncoder).encode(e),a=await crypto.subtle.importKey("raw",i,_,!1,c),r=await crypto.subtle.deriveBits(Object.assign({salt:n},d),a,8*(2*u[t.strength]+2)),s=new Uint8Array(r);t.keys={key:b.toBits(A(s,0,u[t.strength])),authentication:b.toBits(A(s,u[t.strength],2*u[t.strength])),passwordVerification:A(s,2*u[t.strength])};}function v(t,e){let n=t;return t.length+e.length&&(n=new Uint8Array(t.length+e.length),n.set(t,0),n.set(e,t.length)),n}function A(t,e,n){return t.subarray(e,n)}class U{constructor(t,e){Object.assign(this,{password:t,passwordVerification:e}),E(this,t);}append(t){const e=this;if(e.password){const n=z(e,t.subarray(0,12));if(e.password=null,n[11]!=e.passwordVerification)throw new Error("Invalid pasword");t=t.subarray(12);}return z(e,t)}flush(){return {valid:!0,data:new Uint8Array(0)}}}class S{constructor(t,e){Object.assign(this,{password:t,passwordVerification:e}),E(this,t);}append(t){const e=this;let n,i;if(e.password){e.password=null;const a=crypto.getRandomValues(new Uint8Array(12));a[11]=e.passwordVerification,n=new Uint8Array(t.length+a.length),n.set(I(e,a),0),i=12;}else n=new Uint8Array(t.length),i=0;return n.set(I(e,t),i),n}flush(){return {data:new Uint8Array(0)}}}function z(t,e){const n=new Uint8Array(e.length);for(let i=0;i<e.length;i++)n[i]=M(t)^e[i],C(t,n[i]);return n}function I(t,e){const n=new Uint8Array(e.length);for(let i=0;i<e.length;i++)n[i]=M(t)^e[i],C(t,e[i]);return n}function E(t,n){t.keys=[305419896,591751049,878082192],t.crcKey0=new e(t.keys[0]),t.crcKey2=new e(t.keys[2]);for(let e=0;e<n.length;e++)C(t,n.charCodeAt(e));}function C(t,e){t.crcKey0.append([e]),t.keys[0]=~t.crcKey0.get(),t.keys[1]=H(t.keys[1]+B(t.keys[0])),t.keys[1]=H(Math.imul(t.keys[1],134775813)+1),t.crcKey2.append([t.keys[1]>>>24]),t.keys[2]=~t.crcKey2.get();}function M(t){const e=2|t.keys[2];return B(Math.imul(e,1^e)>>>8)}function B(t){return 255&t}function H(t){return 4294967295&t}class V{constructor(t,{signature:n,password:i,signed:a,compressed:r,zipCrypto:s,passwordVerification:o,encryptionStrength:l},{chunkSize:_}){const d=Boolean(i);Object.assign(this,{signature:n,encrypted:d,signed:a,compressed:r,inflate:r&&new t({chunkSize:_}),crc32:a&&new e,zipCrypto:s,decrypt:d&&s?new U(i,o):new g(i,a,l)});}async append(t){const e=this;return e.encrypted&&t.length&&(t=await e.decrypt.append(t)),e.compressed&&t.length&&(t=await e.inflate.append(t)),(!e.encrypted||e.zipCrypto)&&e.signed&&t.length&&e.crc32.append(t),t}async flush(){const t=this;let e,n=new Uint8Array(0);if(t.encrypted){const e=t.decrypt.flush();if(!e.valid)throw new Error("Invalid signature");n=e.data;}if((!t.encrypted||t.zipCrypto)&&t.signed){const n=new DataView(new Uint8Array(4).buffer);if(e=t.crc32.get(),n.setUint32(0,e),t.signature!=n.getUint32(0,!1))throw new Error("Invalid signature")}return t.compressed&&(n=await t.inflate.append(n)||new Uint8Array(0),await t.inflate.flush()),{data:n,signature:e}}}class D{constructor(t,{encrypted:n,signed:i,compressed:a,level:r,zipCrypto:s,password:o,passwordVerification:l,encryptionStrength:_},{chunkSize:d}){Object.assign(this,{encrypted:n,signed:i,compressed:a,deflate:a&&new t({level:r||5,chunkSize:d}),crc32:i&&new e,zipCrypto:s,encrypt:n&&s?new S(o,l):new y(o,_)});}async append(t){const e=this;let n=t;return e.compressed&&t.length&&(n=await e.deflate.append(t)),e.encrypted&&n.length&&(n=await e.encrypt.append(n)),(!e.encrypted||e.zipCrypto)&&e.signed&&t.length&&e.crc32.append(t),n}async flush(){const t=this;let e,n=new Uint8Array(0);if(t.compressed&&(n=await t.deflate.flush()||new Uint8Array(0)),t.encrypted){n=await t.encrypt.append(n);const i=t.encrypt.flush();e=i.signature;const a=new Uint8Array(n.length+i.data.length);a.set(n,0),a.set(i.data,n.length),n=a;}return t.encrypted&&!t.zipCrypto||!t.signed||(e=t.crc32.get()),{data:n,signature:e}}}const j={init(t){t.scripts&&t.scripts.length&&importScripts.apply(void 0,t.scripts);const e=t.options;let n;self.initCodec&&self.initCodec(),e.codecType.startsWith("deflate")?n=self.Deflate:e.codecType.startsWith("inflate")&&(n=self.Inflate),O=function(t,e,n){return e.codecType.startsWith("deflate")?new D(t,e,n):e.codecType.startsWith("inflate")?new V(t,e,n):void 0}(n,e,t.config);},append:async t=>({data:await O.append(t.data)}),flush:()=>O.flush()};let O;addEventListener("message",(async t=>{const e=t.data,n=e.type,i=j[n];if(i)try{e.data&&(e.data=new Uint8Array(e.data));const t=await i(e)||{};if(t.type=n,t.data)try{t.data=t.data.buffer,postMessage(t,[t.data]);}catch(e){postMessage(t);}else postMessage(t);}catch(t){postMessage({type:n,error:{message:t.message,stack:t.stack}});}}));function P(t){return K(t.map((([t,e])=>new Array(t).fill(e,0,t))))}function K(t){return t.reduce(((t,e)=>t.concat(Array.isArray(e)?K(e):e)),[])}const G=[0,1,2,3].concat(...P([[2,4],[2,5],[4,6],[4,7],[8,8],[8,9],[16,10],[16,11],[32,12],[32,13],[64,14],[64,15],[2,0],[1,16],[1,17],[2,18],[2,19],[4,20],[4,21],[8,22],[8,23],[16,24],[16,25],[32,26],[32,27],[64,28],[64,29]]));function W(){const t=this;function e(t,e){let n=0;do{n|=1&t,t>>>=1,n<<=1;}while(--e>0);return n>>>1}t.build_tree=function(n){const i=t.dyn_tree,a=t.stat_desc.static_tree,r=t.stat_desc.elems;let s,o,l,_=-1;for(n.heap_len=0,n.heap_max=573,s=0;s<r;s++)0!==i[2*s]?(n.heap[++n.heap_len]=_=s,n.depth[s]=0):i[2*s+1]=0;for(;n.heap_len<2;)l=n.heap[++n.heap_len]=_<2?++_:0,i[2*l]=1,n.depth[l]=0,n.opt_len--,a&&(n.static_len-=a[2*l+1]);for(t.max_code=_,s=Math.floor(n.heap_len/2);s>=1;s--)n.pqdownheap(i,s);l=r;do{s=n.heap[1],n.heap[1]=n.heap[n.heap_len--],n.pqdownheap(i,1),o=n.heap[1],n.heap[--n.heap_max]=s,n.heap[--n.heap_max]=o,i[2*l]=i[2*s]+i[2*o],n.depth[l]=Math.max(n.depth[s],n.depth[o])+1,i[2*s+1]=i[2*o+1]=l,n.heap[1]=l++,n.pqdownheap(i,1);}while(n.heap_len>=2);n.heap[--n.heap_max]=n.heap[1],function(e){const n=t.dyn_tree,i=t.stat_desc.static_tree,a=t.stat_desc.extra_bits,r=t.stat_desc.extra_base,s=t.stat_desc.max_length;let o,l,_,d,c,f,u=0;for(d=0;d<=15;d++)e.bl_count[d]=0;for(n[2*e.heap[e.heap_max]+1]=0,o=e.heap_max+1;o<573;o++)l=e.heap[o],d=n[2*n[2*l+1]+1]+1,d>s&&(d=s,u++),n[2*l+1]=d,l>t.max_code||(e.bl_count[d]++,c=0,l>=r&&(c=a[l-r]),f=n[2*l],e.opt_len+=f*(d+c),i&&(e.static_len+=f*(i[2*l+1]+c)));if(0!==u){do{for(d=s-1;0===e.bl_count[d];)d--;e.bl_count[d]--,e.bl_count[d+1]+=2,e.bl_count[s]--,u-=2;}while(u>0);for(d=s;0!==d;d--)for(l=e.bl_count[d];0!==l;)_=e.heap[--o],_>t.max_code||(n[2*_+1]!=d&&(e.opt_len+=(d-n[2*_+1])*n[2*_],n[2*_+1]=d),l--);}}(n),function(t,n,i){const a=[];let r,s,o,l=0;for(r=1;r<=15;r++)a[r]=l=l+i[r-1]<<1;for(s=0;s<=n;s++)o=t[2*s+1],0!==o&&(t[2*s]=e(a[o]++,o));}(i,t.max_code,n.bl_count);};}function L(t,e,n,i,a){const r=this;r.static_tree=t,r.extra_bits=e,r.extra_base=n,r.elems=i,r.max_length=a;}W._length_code=[0,1,2,3,4,5,6,7].concat(...P([[2,8],[2,9],[2,10],[2,11],[4,12],[4,13],[4,14],[4,15],[8,16],[8,17],[8,18],[8,19],[16,20],[16,21],[16,22],[16,23],[32,24],[32,25],[32,26],[31,27],[1,28]])),W.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0],W.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576],W.d_code=function(t){return t<256?G[t]:G[256+(t>>>7)]},W.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],W.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],W.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],W.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],L.static_ltree=[12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8],L.static_dtree=[0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5],L.static_l_desc=new L(L.static_ltree,W.extra_lbits,257,286,15),L.static_d_desc=new L(L.static_dtree,W.extra_dbits,0,30,15),L.static_bl_desc=new L(null,W.extra_blbits,0,19,7);function T(t,e,n,i,a){const r=this;r.good_length=t,r.max_lazy=e,r.nice_length=n,r.max_chain=i,r.func=a;}const q=[new T(0,0,0,0,0),new T(4,4,8,4,1),new T(4,5,16,8,1),new T(4,6,32,32,1),new T(4,4,16,16,2),new T(8,16,32,32,2),new T(8,16,128,128,2),new T(8,32,128,256,2),new T(32,128,258,1024,2),new T(32,258,258,4096,2)],R=["need dictionary","stream end","","","stream error","data error","","buffer error","",""];function F(t,e,n,i){const a=t[2*e],r=t[2*n];return a<r||a==r&&i[e]<=i[n]}function J(){const t=this;let e,n,i,a,r,s,o,l,_,d,c,f,u,h,b,w,p,x,g,y,m,k,v,A,U,S,z,I,E,C,M,B,H;const V=new W,D=new W,j=new W;let O,P,K,G,T,J,N,Q;function X(){let e;for(e=0;e<286;e++)M[2*e]=0;for(e=0;e<30;e++)B[2*e]=0;for(e=0;e<19;e++)H[2*e]=0;M[512]=1,t.opt_len=t.static_len=0,K=T=0;}function Y(t,e){let n,i=-1,a=t[1],r=0,s=7,o=4;0===a&&(s=138,o=3),t[2*(e+1)+1]=65535;for(let l=0;l<=e;l++)n=a,a=t[2*(l+1)+1],++r<s&&n==a||(r<o?H[2*n]+=r:0!==n?(n!=i&&H[2*n]++,H[32]++):r<=10?H[34]++:H[36]++,r=0,i=n,0===a?(s=138,o=3):n==a?(s=6,o=3):(s=7,o=4));}function Z(e){t.pending_buf[t.pending++]=e;}function $(t){Z(255&t),Z(t>>>8&255);}function tt(t,e){let n;const i=e;Q>16-i?(n=t,N|=n<<Q&65535,$(N),N=n>>>16-Q,Q+=i-16):(N|=t<<Q&65535,Q+=i);}function et(t,e){const n=2*t;tt(65535&e[n],65535&e[n+1]);}function nt(t,e){let n,i,a=-1,r=t[1],s=0,o=7,l=4;for(0===r&&(o=138,l=3),n=0;n<=e;n++)if(i=r,r=t[2*(n+1)+1],!(++s<o&&i==r)){if(s<l)do{et(i,H);}while(0!=--s);else 0!==i?(i!=a&&(et(i,H),s--),et(16,H),tt(s-3,2)):s<=10?(et(17,H),tt(s-3,3)):(et(18,H),tt(s-11,7));s=0,a=i,0===r?(o=138,l=3):i==r?(o=6,l=3):(o=7,l=4);}}function it(){16==Q?($(N),N=0,Q=0):Q>=8&&(Z(255&N),N>>>=8,Q-=8);}function at(e,n){let i,a,r;if(t.pending_buf[G+2*K]=e>>>8&255,t.pending_buf[G+2*K+1]=255&e,t.pending_buf[O+K]=255&n,K++,0===e?M[2*n]++:(T++,e--,M[2*(W._length_code[n]+256+1)]++,B[2*W.d_code(e)]++),0==(8191&K)&&z>2){for(i=8*K,a=m-p,r=0;r<30;r++)i+=B[2*r]*(5+W.extra_dbits[r]);if(i>>>=3,T<Math.floor(K/2)&&i<Math.floor(a/2))return !0}return K==P-1}function rt(e,n){let i,a,r,s,o=0;if(0!==K)do{i=t.pending_buf[G+2*o]<<8&65280|255&t.pending_buf[G+2*o+1],a=255&t.pending_buf[O+o],o++,0===i?et(a,e):(r=W._length_code[a],et(r+256+1,e),s=W.extra_lbits[r],0!==s&&(a-=W.base_length[r],tt(a,s)),i--,r=W.d_code(i),et(r,n),s=W.extra_dbits[r],0!==s&&(i-=W.base_dist[r],tt(i,s)));}while(o<K);et(256,e),J=e[513];}function st(){Q>8?$(N):Q>0&&Z(255&N),N=0,Q=0;}function ot(e,n,i){tt(0+(i?1:0),3),function(e,n,i){st(),J=8,i&&($(n),$(~n)),t.pending_buf.set(l.subarray(e,e+n),t.pending),t.pending+=n;}(e,n,!0);}function lt(e,n,i){let a,r,s=0;z>0?(V.build_tree(t),D.build_tree(t),s=function(){let e;for(Y(M,V.max_code),Y(B,D.max_code),j.build_tree(t),e=18;e>=3&&0===H[2*W.bl_order[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(),a=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=a&&(a=r)):a=r=n+5,n+4<=a&&-1!=e?ot(e,n,i):r==a?(tt(2+(i?1:0),3),rt(L.static_ltree,L.static_dtree)):(tt(4+(i?1:0),3),function(t,e,n){let i;for(tt(t-257,5),tt(e-1,5),tt(n-4,4),i=0;i<n;i++)tt(H[2*W.bl_order[i]+1],3);nt(M,t-1),nt(B,e-1);}(V.max_code+1,D.max_code+1,s+1),rt(M,B)),X(),i&&st();}function _t(t){lt(p>=0?p:-1,m-p,t),p=m,e.flush_pending();}function dt(){let t,n,i,a;do{if(a=_-v-m,0===a&&0===m&&0===v)a=r;else if(-1==a)a--;else if(m>=r+r-262){l.set(l.subarray(r,r+r),0),k-=r,m-=r,p-=r,t=u,i=t;do{n=65535&c[--i],c[i]=n>=r?n-r:0;}while(0!=--t);t=r,i=t;do{n=65535&d[--i],d[i]=n>=r?n-r:0;}while(0!=--t);a+=r;}if(0===e.avail_in)return;t=e.read_buf(l,m+v,a),v+=t,v>=3&&(f=255&l[m],f=(f<<w^255&l[m+1])&b);}while(v<262&&0!==e.avail_in)}function ct(t){let e,n,i=U,a=m,s=A;const _=m>r-262?m-(r-262):0;let c=C;const f=o,u=m+258;let h=l[a+s-1],b=l[a+s];A>=E&&(i>>=2),c>v&&(c=v);do{if(e=t,l[e+s]==b&&l[e+s-1]==h&&l[e]==l[a]&&l[++e]==l[a+1]){a+=2,e++;do{}while(l[++a]==l[++e]&&l[++a]==l[++e]&&l[++a]==l[++e]&&l[++a]==l[++e]&&l[++a]==l[++e]&&l[++a]==l[++e]&&l[++a]==l[++e]&&l[++a]==l[++e]&&a<u);if(n=258-(u-a),a=u-258,n>s){if(k=t,s=n,n>=c)break;h=l[a+s-1],b=l[a+s];}}}while((t=65535&d[t&f])>_&&0!=--i);return s<=v?s:v}function ft(e){return e.total_in=e.total_out=0,e.msg=null,t.pending=0,t.pending_out=0,n=113,a=0,V.dyn_tree=M,V.stat_desc=L.static_l_desc,D.dyn_tree=B,D.stat_desc=L.static_d_desc,j.dyn_tree=H,j.stat_desc=L.static_bl_desc,N=0,Q=0,J=8,X(),function(){_=2*r,c[u-1]=0;for(let t=0;t<u-1;t++)c[t]=0;S=q[z].max_lazy,E=q[z].good_length,C=q[z].nice_length,U=q[z].max_chain,m=0,p=0,v=0,x=A=2,y=0,f=0;}(),0}t.depth=[],t.bl_count=[],t.heap=[],M=[],B=[],H=[],t.pqdownheap=function(e,n){const i=t.heap,a=i[n];let r=n<<1;for(;r<=t.heap_len&&(r<t.heap_len&&F(e,i[r+1],i[r],t.depth)&&r++,!F(e,a,i[r],t.depth));)i[n]=i[r],n=r,r<<=1;i[n]=a;},t.deflateInit=function(e,n,a,_,f,p){return _||(_=8),f||(f=8),p||(p=0),e.msg=null,-1==n&&(n=6),f<1||f>9||8!=_||a<9||a>15||n<0||n>9||p<0||p>2?-2:(e.dstate=t,s=a,r=1<<s,o=r-1,h=f+7,u=1<<h,b=u-1,w=Math.floor((h+3-1)/3),l=new Uint8Array(2*r),d=[],c=[],P=1<<f+6,t.pending_buf=new Uint8Array(4*P),i=4*P,G=Math.floor(P/2),O=3*P,z=n,I=p,ft(e))},t.deflateEnd=function(){return 42!=n&&113!=n&&666!=n?-2:(t.pending_buf=null,c=null,d=null,l=null,t.dstate=null,113==n?-3:0)},t.deflateParams=function(t,e,n){let i=0;return -1==e&&(e=6),e<0||e>9||n<0||n>2?-2:(q[z].func!=q[e].func&&0!==t.total_in&&(i=t.deflate(1)),z!=e&&(z=e,S=q[z].max_lazy,E=q[z].good_length,C=q[z].nice_length,U=q[z].max_chain),I=n,i)},t.deflateSetDictionary=function(t,e,i){let a,s=i,_=0;if(!e||42!=n)return -2;if(s<3)return 0;for(s>r-262&&(s=r-262,_=i-s),l.set(e.subarray(_,_+s),0),m=s,p=s,f=255&l[0],f=(f<<w^255&l[1])&b,a=0;a<=s-3;a++)f=(f<<w^255&l[a+2])&b,d[a&o]=c[f],c[f]=a;return 0},t.deflate=function(_,h){let U,E,C,M,B;if(h>4||h<0)return -2;if(!_.next_out||!_.next_in&&0!==_.avail_in||666==n&&4!=h)return _.msg=R[4],-2;if(0===_.avail_out)return _.msg=R[7],-5;var H;if(e=_,M=a,a=h,42==n&&(E=8+(s-8<<4)<<8,C=(z-1&255)>>1,C>3&&(C=3),E|=C<<6,0!==m&&(E|=32),E+=31-E%31,n=113,Z((H=E)>>8&255),Z(255&H)),0!==t.pending){if(e.flush_pending(),0===e.avail_out)return a=-1,0}else if(0===e.avail_in&&h<=M&&4!=h)return e.msg=R[7],-5;if(666==n&&0!==e.avail_in)return _.msg=R[7],-5;if(0!==e.avail_in||0!==v||0!=h&&666!=n){switch(B=-1,q[z].func){case 0:B=function(t){let n,a=65535;for(a>i-5&&(a=i-5);;){if(v<=1){if(dt(),0===v&&0==t)return 0;if(0===v)break}if(m+=v,v=0,n=p+a,(0===m||m>=n)&&(v=m-n,m=n,_t(!1),0===e.avail_out))return 0;if(m-p>=r-262&&(_t(!1),0===e.avail_out))return 0}return _t(4==t),0===e.avail_out?4==t?2:0:4==t?3:1}(h);break;case 1:B=function(t){let n,i=0;for(;;){if(v<262){if(dt(),v<262&&0==t)return 0;if(0===v)break}if(v>=3&&(f=(f<<w^255&l[m+2])&b,i=65535&c[f],d[m&o]=c[f],c[f]=m),0!==i&&(m-i&65535)<=r-262&&2!=I&&(x=ct(i)),x>=3)if(n=at(m-k,x-3),v-=x,x<=S&&v>=3){x--;do{m++,f=(f<<w^255&l[m+2])&b,i=65535&c[f],d[m&o]=c[f],c[f]=m;}while(0!=--x);m++;}else m+=x,x=0,f=255&l[m],f=(f<<w^255&l[m+1])&b;else n=at(0,255&l[m]),v--,m++;if(n&&(_t(!1),0===e.avail_out))return 0}return _t(4==t),0===e.avail_out?4==t?2:0:4==t?3:1}(h);break;case 2:B=function(t){let n,i,a=0;for(;;){if(v<262){if(dt(),v<262&&0==t)return 0;if(0===v)break}if(v>=3&&(f=(f<<w^255&l[m+2])&b,a=65535&c[f],d[m&o]=c[f],c[f]=m),A=x,g=k,x=2,0!==a&&A<S&&(m-a&65535)<=r-262&&(2!=I&&(x=ct(a)),x<=5&&(1==I||3==x&&m-k>4096)&&(x=2)),A>=3&&x<=A){i=m+v-3,n=at(m-1-g,A-3),v-=A-1,A-=2;do{++m<=i&&(f=(f<<w^255&l[m+2])&b,a=65535&c[f],d[m&o]=c[f],c[f]=m);}while(0!=--A);if(y=0,x=2,m++,n&&(_t(!1),0===e.avail_out))return 0}else if(0!==y){if(n=at(0,255&l[m-1]),n&&_t(!1),m++,v--,0===e.avail_out)return 0}else y=1,m++,v--;}return 0!==y&&(n=at(0,255&l[m-1]),y=0),_t(4==t),0===e.avail_out?4==t?2:0:4==t?3:1}(h);}if(2!=B&&3!=B||(n=666),0==B||2==B)return 0===e.avail_out&&(a=-1),0;if(1==B){if(1==h)tt(2,3),et(256,L.static_ltree),it(),1+J+10-Q<9&&(tt(2,3),et(256,L.static_ltree),it()),J=7;else if(ot(0,0,!1),3==h)for(U=0;U<u;U++)c[U]=0;if(e.flush_pending(),0===e.avail_out)return a=-1,0}}return 4!=h?0:1};}function N(){const t=this;t.next_in_index=0,t.next_out_index=0,t.avail_in=0,t.total_in=0,t.avail_out=0,t.total_out=0;}function Q(t){const e=new N,n=(i=t&&t.chunkSize?t.chunkSize:65536)+5*(Math.floor(i/16383)+1);var i;const a=new Uint8Array(n);let r=t?t.level:-1;void 0===r&&(r=-1),e.deflateInit(r),e.next_out=a,this.append=function(t,i){let r,s,o=0,l=0,_=0;const d=[];if(t.length){e.next_in_index=0,e.next_in=t,e.avail_in=t.length;do{if(e.next_out_index=0,e.avail_out=n,r=e.deflate(0),0!=r)throw new Error("deflating: "+e.msg);e.next_out_index&&(e.next_out_index==n?d.push(new Uint8Array(a)):d.push(a.slice(0,e.next_out_index))),_+=e.next_out_index,i&&e.next_in_index>0&&e.next_in_index!=o&&(i(e.next_in_index),o=e.next_in_index);}while(e.avail_in>0||0===e.avail_out);return d.length>1?(s=new Uint8Array(_),d.forEach((function(t){s.set(t,l),l+=t.length;}))):s=d[0]||new Uint8Array(0),s}},this.flush=function(){let t,i,r=0,s=0;const o=[];do{if(e.next_out_index=0,e.avail_out=n,t=e.deflate(4),1!=t&&0!=t)throw new Error("deflating: "+e.msg);n-e.avail_out>0&&o.push(a.slice(0,e.next_out_index)),s+=e.next_out_index;}while(e.avail_in>0||0===e.avail_out);return e.deflateEnd(),i=new Uint8Array(s),o.forEach((function(t){i.set(t,r),r+=t.length;})),i};}N.prototype={deflateInit:function(t,e){const n=this;return n.dstate=new J,e||(e=15),n.dstate.deflateInit(n,t,e)},deflate:function(t){const e=this;return e.dstate?e.dstate.deflate(e,t):-2},deflateEnd:function(){const t=this;if(!t.dstate)return -2;const e=t.dstate.deflateEnd();return t.dstate=null,e},deflateParams:function(t,e){const n=this;return n.dstate?n.dstate.deflateParams(n,t,e):-2},deflateSetDictionary:function(t,e){const n=this;return n.dstate?n.dstate.deflateSetDictionary(n,t,e):-2},read_buf:function(t,e,n){const i=this;let a=i.avail_in;return a>n&&(a=n),0===a?0:(i.avail_in-=a,t.set(i.next_in.subarray(i.next_in_index,i.next_in_index+a),e),i.next_in_index+=a,i.total_in+=a,a)},flush_pending:function(){const t=this;let e=t.dstate.pending;e>t.avail_out&&(e=t.avail_out),0!==e&&(t.next_out.set(t.dstate.pending_buf.subarray(t.dstate.pending_out,t.dstate.pending_out+e),t.next_out_index),t.next_out_index+=e,t.dstate.pending_out+=e,t.total_out+=e,t.avail_out-=e,t.dstate.pending-=e,0===t.dstate.pending&&(t.dstate.pending_out=0));}};const X=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],Y=[96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,192,80,7,10,0,8,96,0,8,32,0,9,160,0,8,0,0,8,128,0,8,64,0,9,224,80,7,6,0,8,88,0,8,24,0,9,144,83,7,59,0,8,120,0,8,56,0,9,208,81,7,17,0,8,104,0,8,40,0,9,176,0,8,8,0,8,136,0,8,72,0,9,240,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,200,81,7,13,0,8,100,0,8,36,0,9,168,0,8,4,0,8,132,0,8,68,0,9,232,80,7,8,0,8,92,0,8,28,0,9,152,84,7,83,0,8,124,0,8,60,0,9,216,82,7,23,0,8,108,0,8,44,0,9,184,0,8,12,0,8,140,0,8,76,0,9,248,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,196,81,7,11,0,8,98,0,8,34,0,9,164,0,8,2,0,8,130,0,8,66,0,9,228,80,7,7,0,8,90,0,8,26,0,9,148,84,7,67,0,8,122,0,8,58,0,9,212,82,7,19,0,8,106,0,8,42,0,9,180,0,8,10,0,8,138,0,8,74,0,9,244,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,204,81,7,15,0,8,102,0,8,38,0,9,172,0,8,6,0,8,134,0,8,70,0,9,236,80,7,9,0,8,94,0,8,30,0,9,156,84,7,99,0,8,126,0,8,62,0,9,220,82,7,27,0,8,110,0,8,46,0,9,188,0,8,14,0,8,142,0,8,78,0,9,252,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,194,80,7,10,0,8,97,0,8,33,0,9,162,0,8,1,0,8,129,0,8,65,0,9,226,80,7,6,0,8,89,0,8,25,0,9,146,83,7,59,0,8,121,0,8,57,0,9,210,81,7,17,0,8,105,0,8,41,0,9,178,0,8,9,0,8,137,0,8,73,0,9,242,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,202,81,7,13,0,8,101,0,8,37,0,9,170,0,8,5,0,8,133,0,8,69,0,9,234,80,7,8,0,8,93,0,8,29,0,9,154,84,7,83,0,8,125,0,8,61,0,9,218,82,7,23,0,8,109,0,8,45,0,9,186,0,8,13,0,8,141,0,8,77,0,9,250,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,198,81,7,11,0,8,99,0,8,35,0,9,166,0,8,3,0,8,131,0,8,67,0,9,230,80,7,7,0,8,91,0,8,27,0,9,150,84,7,67,0,8,123,0,8,59,0,9,214,82,7,19,0,8,107,0,8,43,0,9,182,0,8,11,0,8,139,0,8,75,0,9,246,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,206,81,7,15,0,8,103,0,8,39,0,9,174,0,8,7,0,8,135,0,8,71,0,9,238,80,7,9,0,8,95,0,8,31,0,9,158,84,7,99,0,8,127,0,8,63,0,9,222,82,7,27,0,8,111,0,8,47,0,9,190,0,8,15,0,8,143,0,8,79,0,9,254,96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,193,80,7,10,0,8,96,0,8,32,0,9,161,0,8,0,0,8,128,0,8,64,0,9,225,80,7,6,0,8,88,0,8,24,0,9,145,83,7,59,0,8,120,0,8,56,0,9,209,81,7,17,0,8,104,0,8,40,0,9,177,0,8,8,0,8,136,0,8,72,0,9,241,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,201,81,7,13,0,8,100,0,8,36,0,9,169,0,8,4,0,8,132,0,8,68,0,9,233,80,7,8,0,8,92,0,8,28,0,9,153,84,7,83,0,8,124,0,8,60,0,9,217,82,7,23,0,8,108,0,8,44,0,9,185,0,8,12,0,8,140,0,8,76,0,9,249,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,197,81,7,11,0,8,98,0,8,34,0,9,165,0,8,2,0,8,130,0,8,66,0,9,229,80,7,7,0,8,90,0,8,26,0,9,149,84,7,67,0,8,122,0,8,58,0,9,213,82,7,19,0,8,106,0,8,42,0,9,181,0,8,10,0,8,138,0,8,74,0,9,245,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,205,81,7,15,0,8,102,0,8,38,0,9,173,0,8,6,0,8,134,0,8,70,0,9,237,80,7,9,0,8,94,0,8,30,0,9,157,84,7,99,0,8,126,0,8,62,0,9,221,82,7,27,0,8,110,0,8,46,0,9,189,0,8,14,0,8,142,0,8,78,0,9,253,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,195,80,7,10,0,8,97,0,8,33,0,9,163,0,8,1,0,8,129,0,8,65,0,9,227,80,7,6,0,8,89,0,8,25,0,9,147,83,7,59,0,8,121,0,8,57,0,9,211,81,7,17,0,8,105,0,8,41,0,9,179,0,8,9,0,8,137,0,8,73,0,9,243,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,203,81,7,13,0,8,101,0,8,37,0,9,171,0,8,5,0,8,133,0,8,69,0,9,235,80,7,8,0,8,93,0,8,29,0,9,155,84,7,83,0,8,125,0,8,61,0,9,219,82,7,23,0,8,109,0,8,45,0,9,187,0,8,13,0,8,141,0,8,77,0,9,251,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,199,81,7,11,0,8,99,0,8,35,0,9,167,0,8,3,0,8,131,0,8,67,0,9,231,80,7,7,0,8,91,0,8,27,0,9,151,84,7,67,0,8,123,0,8,59,0,9,215,82,7,19,0,8,107,0,8,43,0,9,183,0,8,11,0,8,139,0,8,75,0,9,247,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,207,81,7,15,0,8,103,0,8,39,0,9,175,0,8,7,0,8,135,0,8,71,0,9,239,80,7,9,0,8,95,0,8,31,0,9,159,84,7,99,0,8,127,0,8,63,0,9,223,82,7,27,0,8,111,0,8,47,0,9,191,0,8,15,0,8,143,0,8,79,0,9,255],Z=[80,5,1,87,5,257,83,5,17,91,5,4097,81,5,5,89,5,1025,85,5,65,93,5,16385,80,5,3,88,5,513,84,5,33,92,5,8193,82,5,9,90,5,2049,86,5,129,192,5,24577,80,5,2,87,5,385,83,5,25,91,5,6145,81,5,7,89,5,1537,85,5,97,93,5,24577,80,5,4,88,5,769,84,5,49,92,5,12289,82,5,13,90,5,3073,86,5,193,192,5,24577],$=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],tt=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,112,112],et=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],nt=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];function it(){let t,e,n,i,a,r;function s(t,e,s,o,l,_,d,c,f,u,h){let b,w,p,x,g,y,m,k,v,A,U,S,z,I,E;A=0,g=s;do{n[t[e+A]]++,A++,g--;}while(0!==g);if(n[0]==s)return d[0]=-1,c[0]=0,0;for(k=c[0],y=1;y<=15&&0===n[y];y++);for(m=y,k<y&&(k=y),g=15;0!==g&&0===n[g];g--);for(p=g,k>g&&(k=g),c[0]=k,I=1<<y;y<g;y++,I<<=1)if((I-=n[y])<0)return -3;if((I-=n[g])<0)return -3;for(n[g]+=I,r[1]=y=0,A=1,z=2;0!=--g;)r[z]=y+=n[A],z++,A++;g=0,A=0;do{0!==(y=t[e+A])&&(h[r[y]++]=g),A++;}while(++g<s);for(s=r[p],r[0]=g=0,A=0,x=-1,S=-k,a[0]=0,U=0,E=0;m<=p;m++)for(b=n[m];0!=b--;){for(;m>S+k;){if(x++,S+=k,E=p-S,E=E>k?k:E,(w=1<<(y=m-S))>b+1&&(w-=b+1,z=m,y<E))for(;++y<E&&!((w<<=1)<=n[++z]);)w-=n[z];if(E=1<<y,u[0]+E>1440)return -3;a[x]=U=u[0],u[0]+=E,0!==x?(r[x]=g,i[0]=y,i[1]=k,y=g>>>S-k,i[2]=U-a[x-1]-y,f.set(i,3*(a[x-1]+y))):d[0]=U;}for(i[1]=m-S,A>=s?i[0]=192:h[A]<o?(i[0]=h[A]<256?0:96,i[2]=h[A++]):(i[0]=_[h[A]-o]+16+64,i[2]=l[h[A++]-o]),w=1<<m-S,y=g>>>S;y<E;y+=w)f.set(i,3*(U+y));for(y=1<<m-1;0!=(g&y);y>>>=1)g^=y;for(g^=y,v=(1<<S)-1;(g&v)!=r[x];)x--,S-=k,v=(1<<S)-1;}return 0!==I&&1!=p?-5:0}function o(s){let o;for(t||(t=[],e=[],n=new Int32Array(16),i=[],a=new Int32Array(15),r=new Int32Array(16)),e.length<s&&(e=[]),o=0;o<s;o++)e[o]=0;for(o=0;o<16;o++)n[o]=0;for(o=0;o<3;o++)i[o]=0;a.set(n.subarray(0,15),0),r.set(n.subarray(0,16),0);}this.inflate_trees_bits=function(n,i,a,r,l){let _;return o(19),t[0]=0,_=s(n,0,19,19,null,null,a,i,r,t,e),-3==_?l.msg="oversubscribed dynamic bit lengths tree":-5!=_&&0!==i[0]||(l.msg="incomplete dynamic bit lengths tree",_=-3),_},this.inflate_trees_dynamic=function(n,i,a,r,l,_,d,c,f){let u;return o(288),t[0]=0,u=s(a,0,n,257,$,tt,_,r,c,t,e),0!=u||0===r[0]?(-3==u?f.msg="oversubscribed literal/length tree":-4!=u&&(f.msg="incomplete literal/length tree",u=-3),u):(o(288),u=s(a,n,i,0,et,nt,d,l,c,t,e),0!=u||0===l[0]&&n>257?(-3==u?f.msg="oversubscribed distance tree":-5==u?(f.msg="incomplete distance tree",u=-3):-4!=u&&(f.msg="empty distance tree with lengths",u=-3),u):0)};}it.inflate_trees_fixed=function(t,e,n,i){return t[0]=9,e[0]=5,n[0]=Y,i[0]=Z,0};function at(){const t=this;let e,n,i,a,r=0,s=0,o=0,l=0,_=0,d=0,c=0,f=0,u=0,h=0;function b(t,e,n,i,a,r,s,o){let l,_,d,c,f,u,h,b,w,p,x,g,y,m,k,v;h=o.next_in_index,b=o.avail_in,f=s.bitb,u=s.bitk,w=s.write,p=w<s.read?s.read-w-1:s.end-w,x=X[t],g=X[e];do{for(;u<20;)b--,f|=(255&o.read_byte(h++))<<u,u+=8;if(l=f&x,_=n,d=i,v=3*(d+l),0!==(c=_[v]))for(;;){if(f>>=_[v+1],u-=_[v+1],0!=(16&c)){for(c&=15,y=_[v+2]+(f&X[c]),f>>=c,u-=c;u<15;)b--,f|=(255&o.read_byte(h++))<<u,u+=8;for(l=f&g,_=a,d=r,v=3*(d+l),c=_[v];;){if(f>>=_[v+1],u-=_[v+1],0!=(16&c)){for(c&=15;u<c;)b--,f|=(255&o.read_byte(h++))<<u,u+=8;if(m=_[v+2]+(f&X[c]),f>>=c,u-=c,p-=y,w>=m)k=w-m,w-k>0&&2>w-k?(s.window[w++]=s.window[k++],s.window[w++]=s.window[k++],y-=2):(s.window.set(s.window.subarray(k,k+2),w),w+=2,k+=2,y-=2);else {k=w-m;do{k+=s.end;}while(k<0);if(c=s.end-k,y>c){if(y-=c,w-k>0&&c>w-k)do{s.window[w++]=s.window[k++];}while(0!=--c);else s.window.set(s.window.subarray(k,k+c),w),w+=c,k+=c,c=0;k=0;}}if(w-k>0&&y>w-k)do{s.window[w++]=s.window[k++];}while(0!=--y);else s.window.set(s.window.subarray(k,k+y),w),w+=y,k+=y,y=0;break}if(0!=(64&c))return o.msg="invalid distance code",y=o.avail_in-b,y=u>>3<y?u>>3:y,b+=y,h-=y,u-=y<<3,s.bitb=f,s.bitk=u,o.avail_in=b,o.total_in+=h-o.next_in_index,o.next_in_index=h,s.write=w,-3;l+=_[v+2],l+=f&X[c],v=3*(d+l),c=_[v];}break}if(0!=(64&c))return 0!=(32&c)?(y=o.avail_in-b,y=u>>3<y?u>>3:y,b+=y,h-=y,u-=y<<3,s.bitb=f,s.bitk=u,o.avail_in=b,o.total_in+=h-o.next_in_index,o.next_in_index=h,s.write=w,1):(o.msg="invalid literal/length code",y=o.avail_in-b,y=u>>3<y?u>>3:y,b+=y,h-=y,u-=y<<3,s.bitb=f,s.bitk=u,o.avail_in=b,o.total_in+=h-o.next_in_index,o.next_in_index=h,s.write=w,-3);if(l+=_[v+2],l+=f&X[c],v=3*(d+l),0===(c=_[v])){f>>=_[v+1],u-=_[v+1],s.window[w++]=_[v+2],p--;break}}else f>>=_[v+1],u-=_[v+1],s.window[w++]=_[v+2],p--;}while(p>=258&&b>=10);return y=o.avail_in-b,y=u>>3<y?u>>3:y,b+=y,h-=y,u-=y<<3,s.bitb=f,s.bitk=u,o.avail_in=b,o.total_in+=h-o.next_in_index,o.next_in_index=h,s.write=w,0}t.init=function(t,r,s,o,l,_){e=0,c=t,f=r,i=s,u=o,a=l,h=_,n=null;},t.proc=function(t,w,p){let x,g,y,m,k,v,A,U=0,S=0,z=0;for(z=w.next_in_index,m=w.avail_in,U=t.bitb,S=t.bitk,k=t.write,v=k<t.read?t.read-k-1:t.end-k;;)switch(e){case 0:if(v>=258&&m>=10&&(t.bitb=U,t.bitk=S,w.avail_in=m,w.total_in+=z-w.next_in_index,w.next_in_index=z,t.write=k,p=b(c,f,i,u,a,h,t,w),z=w.next_in_index,m=w.avail_in,U=t.bitb,S=t.bitk,k=t.write,v=k<t.read?t.read-k-1:t.end-k,0!=p)){e=1==p?7:9;break}o=c,n=i,s=u,e=1;case 1:for(x=o;S<x;){if(0===m)return t.bitb=U,t.bitk=S,w.avail_in=m,w.total_in+=z-w.next_in_index,w.next_in_index=z,t.write=k,t.inflate_flush(w,p);p=0,m--,U|=(255&w.read_byte(z++))<<S,S+=8;}if(g=3*(s+(U&X[x])),U>>>=n[g+1],S-=n[g+1],y=n[g],0===y){l=n[g+2],e=6;break}if(0!=(16&y)){_=15&y,r=n[g+2],e=2;break}if(0==(64&y)){o=y,s=g/3+n[g+2];break}if(0!=(32&y)){e=7;break}return e=9,w.msg="invalid literal/length code",p=-3,t.bitb=U,t.bitk=S,w.avail_in=m,w.total_in+=z-w.next_in_index,w.next_in_index=z,t.write=k,t.inflate_flush(w,p);case 2:for(x=_;S<x;){if(0===m)return t.bitb=U,t.bitk=S,w.avail_in=m,w.total_in+=z-w.next_in_index,w.next_in_index=z,t.write=k,t.inflate_flush(w,p);p=0,m--,U|=(255&w.read_byte(z++))<<S,S+=8;}r+=U&X[x],U>>=x,S-=x,o=f,n=a,s=h,e=3;case 3:for(x=o;S<x;){if(0===m)return t.bitb=U,t.bitk=S,w.avail_in=m,w.total_in+=z-w.next_in_index,w.next_in_index=z,t.write=k,t.inflate_flush(w,p);p=0,m--,U|=(255&w.read_byte(z++))<<S,S+=8;}if(g=3*(s+(U&X[x])),U>>=n[g+1],S-=n[g+1],y=n[g],0!=(16&y)){_=15&y,d=n[g+2],e=4;break}if(0==(64&y)){o=y,s=g/3+n[g+2];break}return e=9,w.msg="invalid distance code",p=-3,t.bitb=U,t.bitk=S,w.avail_in=m,w.total_in+=z-w.next_in_index,w.next_in_index=z,t.write=k,t.inflate_flush(w,p);case 4:for(x=_;S<x;){if(0===m)return t.bitb=U,t.bitk=S,w.avail_in=m,w.total_in+=z-w.next_in_index,w.next_in_index=z,t.write=k,t.inflate_flush(w,p);p=0,m--,U|=(255&w.read_byte(z++))<<S,S+=8;}d+=U&X[x],U>>=x,S-=x,e=5;case 5:for(A=k-d;A<0;)A+=t.end;for(;0!==r;){if(0===v&&(k==t.end&&0!==t.read&&(k=0,v=k<t.read?t.read-k-1:t.end-k),0===v&&(t.write=k,p=t.inflate_flush(w,p),k=t.write,v=k<t.read?t.read-k-1:t.end-k,k==t.end&&0!==t.read&&(k=0,v=k<t.read?t.read-k-1:t.end-k),0===v)))return t.bitb=U,t.bitk=S,w.avail_in=m,w.total_in+=z-w.next_in_index,w.next_in_index=z,t.write=k,t.inflate_flush(w,p);t.window[k++]=t.window[A++],v--,A==t.end&&(A=0),r--;}e=0;break;case 6:if(0===v&&(k==t.end&&0!==t.read&&(k=0,v=k<t.read?t.read-k-1:t.end-k),0===v&&(t.write=k,p=t.inflate_flush(w,p),k=t.write,v=k<t.read?t.read-k-1:t.end-k,k==t.end&&0!==t.read&&(k=0,v=k<t.read?t.read-k-1:t.end-k),0===v)))return t.bitb=U,t.bitk=S,w.avail_in=m,w.total_in+=z-w.next_in_index,w.next_in_index=z,t.write=k,t.inflate_flush(w,p);p=0,t.window[k++]=l,v--,e=0;break;case 7:if(S>7&&(S-=8,m++,z--),t.write=k,p=t.inflate_flush(w,p),k=t.write,v=k<t.read?t.read-k-1:t.end-k,t.read!=t.write)return t.bitb=U,t.bitk=S,w.avail_in=m,w.total_in+=z-w.next_in_index,w.next_in_index=z,t.write=k,t.inflate_flush(w,p);e=8;case 8:return p=1,t.bitb=U,t.bitk=S,w.avail_in=m,w.total_in+=z-w.next_in_index,w.next_in_index=z,t.write=k,t.inflate_flush(w,p);case 9:return p=-3,t.bitb=U,t.bitk=S,w.avail_in=m,w.total_in+=z-w.next_in_index,w.next_in_index=z,t.write=k,t.inflate_flush(w,p);default:return p=-2,t.bitb=U,t.bitk=S,w.avail_in=m,w.total_in+=z-w.next_in_index,w.next_in_index=z,t.write=k,t.inflate_flush(w,p)}},t.free=function(){};}const rt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function st(t,e){const n=this;let i,a=0,r=0,s=0,o=0;const l=[0],_=[0],d=new at;let c=0,f=new Int32Array(4320);const u=new it;n.bitk=0,n.bitb=0,n.window=new Uint8Array(e),n.end=e,n.read=0,n.write=0,n.reset=function(t,e){e&&(e[0]=0),6==a&&d.free(t),a=0,n.bitk=0,n.bitb=0,n.read=n.write=0;},n.reset(t,null),n.inflate_flush=function(t,e){let i,a,r;return a=t.next_out_index,r=n.read,i=(r<=n.write?n.write:n.end)-r,i>t.avail_out&&(i=t.avail_out),0!==i&&-5==e&&(e=0),t.avail_out-=i,t.total_out+=i,t.next_out.set(n.window.subarray(r,r+i),a),a+=i,r+=i,r==n.end&&(r=0,n.write==n.end&&(n.write=0),i=n.write-r,i>t.avail_out&&(i=t.avail_out),0!==i&&-5==e&&(e=0),t.avail_out-=i,t.total_out+=i,t.next_out.set(n.window.subarray(r,r+i),a),a+=i,r+=i),t.next_out_index=a,n.read=r,e},n.proc=function(t,e){let h,b,w,p,x,g,y,m;for(p=t.next_in_index,x=t.avail_in,b=n.bitb,w=n.bitk,g=n.write,y=g<n.read?n.read-g-1:n.end-g;;){let k,v,A,U,S,z,I,E;switch(a){case 0:for(;w<3;){if(0===x)return n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);e=0,x--,b|=(255&t.read_byte(p++))<<w,w+=8;}switch(h=7&b,c=1&h,h>>>1){case 0:b>>>=3,w-=3,h=7&w,b>>>=h,w-=h,a=1;break;case 1:k=[],v=[],A=[[]],U=[[]],it.inflate_trees_fixed(k,v,A,U),d.init(k[0],v[0],A[0],0,U[0],0),b>>>=3,w-=3,a=6;break;case 2:b>>>=3,w-=3,a=3;break;case 3:return b>>>=3,w-=3,a=9,t.msg="invalid block type",e=-3,n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e)}break;case 1:for(;w<32;){if(0===x)return n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);e=0,x--,b|=(255&t.read_byte(p++))<<w,w+=8;}if((~b>>>16&65535)!=(65535&b))return a=9,t.msg="invalid stored block lengths",e=-3,n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);r=65535&b,b=w=0,a=0!==r?2:0!==c?7:0;break;case 2:if(0===x)return n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);if(0===y&&(g==n.end&&0!==n.read&&(g=0,y=g<n.read?n.read-g-1:n.end-g),0===y&&(n.write=g,e=n.inflate_flush(t,e),g=n.write,y=g<n.read?n.read-g-1:n.end-g,g==n.end&&0!==n.read&&(g=0,y=g<n.read?n.read-g-1:n.end-g),0===y)))return n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);if(e=0,h=r,h>x&&(h=x),h>y&&(h=y),n.window.set(t.read_buf(p,h),g),p+=h,x-=h,g+=h,y-=h,0!=(r-=h))break;a=0!==c?7:0;break;case 3:for(;w<14;){if(0===x)return n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);e=0,x--,b|=(255&t.read_byte(p++))<<w,w+=8;}if(s=h=16383&b,(31&h)>29||(h>>5&31)>29)return a=9,t.msg="too many length or distance symbols",e=-3,n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);if(h=258+(31&h)+(h>>5&31),!i||i.length<h)i=[];else for(m=0;m<h;m++)i[m]=0;b>>>=14,w-=14,o=0,a=4;case 4:for(;o<4+(s>>>10);){for(;w<3;){if(0===x)return n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);e=0,x--,b|=(255&t.read_byte(p++))<<w,w+=8;}i[rt[o++]]=7&b,b>>>=3,w-=3;}for(;o<19;)i[rt[o++]]=0;if(l[0]=7,h=u.inflate_trees_bits(i,l,_,f,t),0!=h)return -3==(e=h)&&(i=null,a=9),n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);o=0,a=5;case 5:for(;h=s,!(o>=258+(31&h)+(h>>5&31));){let r,d;for(h=l[0];w<h;){if(0===x)return n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);e=0,x--,b|=(255&t.read_byte(p++))<<w,w+=8;}if(h=f[3*(_[0]+(b&X[h]))+1],d=f[3*(_[0]+(b&X[h]))+2],d<16)b>>>=h,w-=h,i[o++]=d;else {for(m=18==d?7:d-14,r=18==d?11:3;w<h+m;){if(0===x)return n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);e=0,x--,b|=(255&t.read_byte(p++))<<w,w+=8;}if(b>>>=h,w-=h,r+=b&X[m],b>>>=m,w-=m,m=o,h=s,m+r>258+(31&h)+(h>>5&31)||16==d&&m<1)return i=null,a=9,t.msg="invalid bit length repeat",e=-3,n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);d=16==d?i[m-1]:0;do{i[m++]=d;}while(0!=--r);o=m;}}if(_[0]=-1,S=[],z=[],I=[],E=[],S[0]=9,z[0]=6,h=s,h=u.inflate_trees_dynamic(257+(31&h),1+(h>>5&31),i,S,z,I,E,f,t),0!=h)return -3==h&&(i=null,a=9),e=h,n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);d.init(S[0],z[0],f,I[0],f,E[0]),a=6;case 6:if(n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,1!=(e=d.proc(n,t,e)))return n.inflate_flush(t,e);if(e=0,d.free(t),p=t.next_in_index,x=t.avail_in,b=n.bitb,w=n.bitk,g=n.write,y=g<n.read?n.read-g-1:n.end-g,0===c){a=0;break}a=7;case 7:if(n.write=g,e=n.inflate_flush(t,e),g=n.write,y=g<n.read?n.read-g-1:n.end-g,n.read!=n.write)return n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);a=8;case 8:return e=1,n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);case 9:return e=-3,n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e);default:return e=-2,n.bitb=b,n.bitk=w,t.avail_in=x,t.total_in+=p-t.next_in_index,t.next_in_index=p,n.write=g,n.inflate_flush(t,e)}}},n.free=function(t){n.reset(t,null),n.window=null,f=null;},n.set_dictionary=function(t,e,i){n.window.set(t.subarray(e,e+i),0),n.read=n.write=i;},n.sync_point=function(){return 1==a?1:0};}const ot=[0,0,255,255];function lt(){const t=this;function e(t){return t&&t.istate?(t.total_in=t.total_out=0,t.msg=null,t.istate.mode=7,t.istate.blocks.reset(t,null),0):-2}t.mode=0,t.method=0,t.was=[0],t.need=0,t.marker=0,t.wbits=0,t.inflateEnd=function(e){return t.blocks&&t.blocks.free(e),t.blocks=null,0},t.inflateInit=function(n,i){return n.msg=null,t.blocks=null,i<8||i>15?(t.inflateEnd(n),-2):(t.wbits=i,n.istate.blocks=new st(n,1<<i),e(n),0)},t.inflate=function(t,e){let n,i;if(!t||!t.istate||!t.next_in)return -2;const a=t.istate;for(e=4==e?-5:0,n=-5;;)switch(a.mode){case 0:if(0===t.avail_in)return n;if(n=e,t.avail_in--,t.total_in++,8!=(15&(a.method=t.read_byte(t.next_in_index++)))){a.mode=13,t.msg="unknown compression method",a.marker=5;break}if(8+(a.method>>4)>a.wbits){a.mode=13,t.msg="invalid window size",a.marker=5;break}a.mode=1;case 1:if(0===t.avail_in)return n;if(n=e,t.avail_in--,t.total_in++,i=255&t.read_byte(t.next_in_index++),((a.method<<8)+i)%31!=0){a.mode=13,t.msg="incorrect header check",a.marker=5;break}if(0==(32&i)){a.mode=7;break}a.mode=2;case 2:if(0===t.avail_in)return n;n=e,t.avail_in--,t.total_in++,a.need=(255&t.read_byte(t.next_in_index++))<<24&4278190080,a.mode=3;case 3:if(0===t.avail_in)return n;n=e,t.avail_in--,t.total_in++,a.need+=(255&t.read_byte(t.next_in_index++))<<16&16711680,a.mode=4;case 4:if(0===t.avail_in)return n;n=e,t.avail_in--,t.total_in++,a.need+=(255&t.read_byte(t.next_in_index++))<<8&65280,a.mode=5;case 5:return 0===t.avail_in?n:(n=e,t.avail_in--,t.total_in++,a.need+=255&t.read_byte(t.next_in_index++),a.mode=6,2);case 6:return a.mode=13,t.msg="need dictionary",a.marker=0,-2;case 7:if(n=a.blocks.proc(t,n),-3==n){a.mode=13,a.marker=0;break}if(0==n&&(n=e),1!=n)return n;n=e,a.blocks.reset(t,a.was),a.mode=12;case 12:return 1;case 13:return -3;default:return -2}},t.inflateSetDictionary=function(t,e,n){let i=0,a=n;if(!t||!t.istate||6!=t.istate.mode)return -2;const r=t.istate;return a>=1<<r.wbits&&(a=(1<<r.wbits)-1,i=n-a),r.blocks.set_dictionary(e,i,a),r.mode=7,0},t.inflateSync=function(t){let n,i,a,r,s;if(!t||!t.istate)return -2;const o=t.istate;if(13!=o.mode&&(o.mode=13,o.marker=0),0===(n=t.avail_in))return -5;for(i=t.next_in_index,a=o.marker;0!==n&&a<4;)t.read_byte(i)==ot[a]?a++:a=0!==t.read_byte(i)?0:4-a,i++,n--;return t.total_in+=i-t.next_in_index,t.next_in_index=i,t.avail_in=n,o.marker=a,4!=a?-3:(r=t.total_in,s=t.total_out,e(t),t.total_in=r,t.total_out=s,o.mode=7,0)},t.inflateSyncPoint=function(t){return t&&t.istate&&t.istate.blocks?t.istate.blocks.sync_point():-2};}function _t(){}function dt(t){const e=new _t,n=t&&t.chunkSize?Math.floor(2*t.chunkSize):131072,i=new Uint8Array(n);let a=!1;e.inflateInit(),e.next_out=i,this.append=function(t,r){const s=[];let o,l,_=0,d=0,c=0;if(0!==t.length){e.next_in_index=0,e.next_in=t,e.avail_in=t.length;do{if(e.next_out_index=0,e.avail_out=n,0!==e.avail_in||a||(e.next_in_index=0,a=!0),o=e.inflate(0),a&&-5===o){if(0!==e.avail_in)throw new Error("inflating: bad input")}else if(0!==o&&1!==o)throw new Error("inflating: "+e.msg);if((a||1===o)&&e.avail_in===t.length)throw new Error("inflating: bad input");e.next_out_index&&(e.next_out_index===n?s.push(new Uint8Array(i)):s.push(i.slice(0,e.next_out_index))),c+=e.next_out_index,r&&e.next_in_index>0&&e.next_in_index!=_&&(r(e.next_in_index),_=e.next_in_index);}while(e.avail_in>0||0===e.avail_out);return s.length>1?(l=new Uint8Array(c),s.forEach((function(t){l.set(t,d),d+=t.length;}))):l=s[0]||new Uint8Array(0),l}},this.flush=function(){e.inflateEnd();};}_t.prototype={inflateInit:function(t){const e=this;return e.istate=new lt,t||(t=15),e.istate.inflateInit(e,t)},inflate:function(t){const e=this;return e.istate?e.istate.inflate(e,t):-2},inflateEnd:function(){const t=this;if(!t.istate)return -2;const e=t.istate.inflateEnd(t);return t.istate=null,e},inflateSync:function(){const t=this;return t.istate?t.istate.inflateSync(t):-2},inflateSetDictionary:function(t,e){const n=this;return n.istate?n.istate.inflateSetDictionary(n,t,e):-2},read_byte:function(t){return this.next_in[t]},read_buf:function(t,e){return this.next_in.subarray(t,t+e)}},self.initCodec=()=>{self.Deflate=Q,self.Inflate=dt;};\n\n\t\t',
                    t = URL.createObjectURL(new Blob([e], {
                        type: "text/javascript"
                    }));
                R({
                    workerScripts: {
                        inflate: [t],
                        deflate: [t]
                    }
                })
            }
        })(), R({
                Deflate: function(e) {
                    const t = new g,
                        i = (n = e && e.chunkSize ? e.chunkSize : 65536) + 5 * (Math.floor(n / 16383) + 1);
                    var n;
                    const s = new Uint8Array(i);
                    let a = e ? e.level : -1;
                    void 0 === a && (a = -1), t.deflateInit(a), t.next_out = s, this.append = function(e, n) {
                        let a, r, o = 0,
                            l = 0,
                            h = 0;
                        const d = [];
                        if (e.length) {
                            t.next_in_index = 0, t.next_in = e, t.avail_in = e.length;
                            do {
                                if (t.next_out_index = 0, t.avail_out = i, a = t.deflate(0), 0 != a) throw new Error("deflating: " + t.msg);
                                t.next_out_index && (t.next_out_index == i ? d.push(new Uint8Array(s)) : d.push(s.slice(0, t.next_out_index))), h += t.next_out_index, n && t.next_in_index > 0 && t.next_in_index != o && (n(t.next_in_index), o = t.next_in_index)
                            } while (t.avail_in > 0 || 0 === t.avail_out);
                            return d.length > 1 ? (r = new Uint8Array(h), d.forEach((function(e) {
                                r.set(e, l), l += e.length
                            }))) : r = d[0] || new Uint8Array(0), r
                        }
                    }, this.flush = function() {
                        let e, n, a = 0,
                            r = 0;
                        const o = [];
                        do {
                            if (t.next_out_index = 0, t.avail_out = i, e = t.deflate(4), 1 != e && 0 != e) throw new Error("deflating: " + t.msg);
                            i - t.avail_out > 0 && o.push(s.slice(0, t.next_out_index)), r += t.next_out_index
                        } while (t.avail_in > 0 || 0 === t.avail_out);
                        return t.deflateEnd(), n = new Uint8Array(r), o.forEach((function(e) {
                            n.set(e, a), a += e.length
                        })), n
                    }
                },
                Inflate: function(e) {
                    const t = new M,
                        i = e && e.chunkSize ? Math.floor(2 * e.chunkSize) : 131072,
                        n = new Uint8Array(i);
                    let s = !1;
                    t.inflateInit(), t.next_out = n, this.append = function(e, a) {
                        const r = [];
                        let o, l, h = 0,
                            d = 0,
                            c = 0;
                        if (0 !== e.length) {
                            t.next_in_index = 0, t.next_in = e, t.avail_in = e.length;
                            do {
                                if (t.next_out_index = 0, t.avail_out = i, 0 !== t.avail_in || s || (t.next_in_index = 0, s = !0), o = t.inflate(0), s && o === x) {
                                    if (0 !== t.avail_in) throw new Error("inflating: bad input")
                                } else if (0 !== o && 1 !== o) throw new Error("inflating: " + t.msg);
                                if ((s || 1 === o) && t.avail_in === e.length) throw new Error("inflating: bad input");
                                t.next_out_index && (t.next_out_index === i ? r.push(new Uint8Array(n)) : r.push(n.slice(0, t.next_out_index))), c += t.next_out_index, a && t.next_in_index > 0 && t.next_in_index != h && (a(t.next_in_index), h = t.next_in_index)
                            } while (t.avail_in > 0 || 0 === t.avail_out);
                            return r.length > 1 ? (l = new Uint8Array(c), r.forEach((function(e) {
                                l.set(e, d), d += e.length
                            }))) : l = r[0] || new Uint8Array(0), l
                        }
                    }, this.flush = function() {
                        t.inflateEnd()
                    }
                }
            }),
            function(e, t) {
                const i = new RegExp("\\.(mp3|ogg|wav)$", "i"),
                    n = new RegExp("\\.(png|gif|jpg|jpeg)$", "i");
                new RegExp("(.*?)_\\d+$"), e.Respack = class {
                    constructor() {
                        this.songs = [], this.songQueue = [], this.images = [], this.imageQueue = [], this.name = "<no name>", this.author = "<unknown>", this.description = "<no description>", this.link = null, this.size = -1, this.downloaded = -1, this.enabled = !0, this._xmlQueue = [], this.totalFiles = -1, this.progressCallback = null, this.filesToLoad = 0, this.filesLoaded = 0, this.loadedFromURL = !1
                    }
                    updateProgress(e) {
                        if (this.progressCallback) {
                            let t = this.filesLoaded / this.filesToLoad;
                            this.loadedFromURL && (t = t / 2 + .5), this.progressCallback("number" == typeof e ? e : t, this)
                        }
                    }
                    loadFromURL(e, t) {
                        return this.loadedFromURL = !0, t && (this.progressCallback = t), this.getBlob(e).then((e => this.loadFromBlob(e)))
                    }
                    getBlob(e, t) {
                        return t && (this.progressCallback = t), new Promise(((t, i) => {
                            let n = new XMLHttpRequest;
                            n.open("GET", e, !0), n.responseType = "blob", n.onload = () => {
                                200 == n.status ? t(n.response) : i(Error(n.status + ": Could not fetch respack at " + e))
                            }, n.onerror = function() {
                                i(Error(n.status + ": Could not fetch respack at " + e))
                            }, n.onprogress = e => {
                                if (e.lengthComputable) {
                                    this.size = e.total, this.downloaded = e.loaded;
                                    let t = e.loaded / e.total;
                                    this.progressCallback && this.progressCallback(t / 2, this)
                                }
                            }, n.send()
                        })).catch((t => {
                            throw 1012 == t.code ? Error("Respack at URL " + e + " is restricted. Check CORS.") : t
                        }))
                    }
                    loadFromBlob(e, t) {
                        t && (this.progressCallback = t), this.updateProgress(this.loadedFromURL ? .5 : 0), this.size = e.size;
                        let i = new class {
                            constructor() {
                                mi(this)
                            }
                            get children() {
                                return this.root.children
                            }
                            remove(e) {
                                pi(e), this.entries[e.id] = null
                            }
                            move(e, t) {
                                if (e == this.root) throw new Error("Root directory cannot be moved");
                                if (!t.directory) throw new Error("Target entry is not a directory");
                                if (t.isDescendantOf(e)) throw new Error("Entry is a ancestor of target entry");
                                if (e != t) {
                                    if (t.getChildByName(e.name)) throw new Error("Entry filename already exists");
                                    pi(e), e.parent = t, t.children.push(e)
                                }
                            }
                            find(e) {
                                const t = e.split("/");
                                let i = this.root;
                                for (let e = 0; i && e < t.length; e++) i = i.getChildByName(t[e]);
                                return i
                            }
                            getById(e) {
                                return this.entries[e]
                            }
                            getChildByName(e) {
                                return this.root.getChildByName(e)
                            }
                            addDirectory(e) {
                                return this.root.addDirectory(e)
                            }
                            addText(e, t) {
                                return this.root.addText(e, t)
                            }
                            addBlob(e, t) {
                                return this.root.addBlob(e, t)
                            }
                            addData64URI(e, t) {
                                return this.root.addData64URI(e, t)
                            }
                            addHttpContent(e, t, i) {
                                return this.root.addHttpContent(e, t, i)
                            }
                            async addFileSystemEntry(e) {
                                return this.root.addFileSystemEntry(e)
                            }
                            async addData(e, t) {
                                return this.root.addData(e, t)
                            }
                            async importBlob(e, t) {
                                mi(this), await this.root.importBlob(e, t)
                            }
                            async importData64URI(e, t) {
                                mi(this), await this.root.importData64URI(e, t)
                            }
                            async importHttpContent(e, t) {
                                mi(this), await this.root.importHttpContent(e, t)
                            }
                            async exportBlob(e) {
                                return this.root.exportBlob(e)
                            }
                            async exportData64URI(e) {
                                return this.root.exportData64URI(e)
                            }
                        };
                        return i.importBlob(e).then((() => (console.log(i), this.parseZip(i)))).then((() => this)).catch((e => {
                            throw Error("Respack error:" + e.toString())
                        }))
                    }
                    parseZip(e) {
                        let t = e.entries;
                        this.totalFiles = 0, this.filesToLoad = 0, this.filesLoaded = 0;
                        for (let e = 0; e < t.length; e++) !t[e].directory && t[e].name && (t[e].extension = t[e].name.split(".").pop().toLowerCase(), this.totalFiles++, this.parseFile(t[e]));
                        return this.parseSongQueue().then((() => this.parseImageQueue())).then((() => this.parseXML())).then((() => {
                            this._xmlQueue = [], console.log("Loaded", this.name, "successfully with", this.songs.length, "songs and", this.images.length, "images.")
                        }))
                    }
                    parseFile(e) {
                        let t = e.name;
                        t.match(i) ? (this.songQueue.push(this.parseSong(e)), this.filesToLoad++) : t.match(n) ? (this.imageQueue.push(this.parseImage(e)), this.filesToLoad++) : t.toLowerCase().endsWith(".xml") && this._xmlQueue.push(this.loadXML(e))
                    }
                    parseSong(e) {
                        let t = e.name.replace(i, "");
                        if (!this.containsSong(t)) {
                            let i = {
                                    name: t,
                                    title: null,
                                    rhythm: null,
                                    source: null,
                                    sound: null,
                                    enabled: !0,
                                    filename: e.name,
                                    charsPerBeat: null
                                },
                                n = "";
                            switch (e.extension) {
                                case "mp3":
                                    n = "audio/mpeg3";
                                    break;
                                case "ogg":
                                    n = "audio/ogg";
                                    break;
                                case "wav":
                                    n = "audio/wav";
                                    break;
                                default:
                                    n = "application/octet-stream"
                            }
                            return this.songs.push(i), e.getBlob().then((e => new Promise(((t, i) => {
                                let n = new FileReader;
                                n.onload = () => {
                                    t(n.result)
                                }, n.readAsArrayBuffer(e)
                            })))).then((e => {
                                i.sound = e, this.filesLoaded++, this.updateProgress()
                            }))
                        }
                        this.getSong(t).name
                    }
                    parseSongQueue() {
                        return this.songQueue.reduce(((e, t) => e.then((() => t))), Promise.resolve())
                    }
                    parseImage(e) {
                        let t, i, s = e.name.replace(n, "");
                        if (t = s.match(new RegExp("^(.*)_(\\d+)$"))) i = this.getImage(t[1]), i || (i = {
                            name: t[1],
                            fullname: t[1],
                            align: "center",
                            bitmaps: [],
                            frameDurations: [33],
                            source: null,
                            enabled: !0,
                            animated: !0,
                            beatsPerAnim: null
                        }, this.images.push(i));
                        else {
                            if (this.containsImage(s)) {
                                let t = this.getImage(s);
                                return void console.log("WARNING: Image", s, "already exists! Conflict with", e.name, "and", t.name)
                            }
                            i = {
                                name: s,
                                fullname: s,
                                bitmap: null,
                                align: "center",
                                source: null,
                                enabled: !0,
                                filename: e.name,
                                animated: !1
                            }, this.images.push(i)
                        }
                        return this.loadImage(e, i)
                    }
                    loadImage(e, t) {
                        let i = "";
                        switch (e.extension) {
                            case "png":
                                i = "image/png";
                                break;
                            case "gif":
                                i = "image/gif";
                                break;
                            case "jpg":
                            case "jpeg":
                                i = "image/jpeg";
                                break;
                            default:
                                i = "application/octet-stream"
                        }
                        return e.getData64URI(i).then((e => (this.filesLoaded++, this.updateProgress(), {
                            bitmap: e,
                            img: t
                        })))
                    }
                    parseImageQueue() {
                        return this.imageQueue.reduce(((e, t) => e.then((() => t)).then((e => {
                            if (!e) return;
                            let t = new Image;
                            t.src = e.bitmap, e.img.animated ? e.img.bitmaps.push(t) : e.img.bitmap = t
                        }))), Promise.resolve())
                    }
                    loadXML(e) {
                        return e.getText().then((e => (e = (e = e.replace(/&amp;/g, "&")).replace(/&/g, "&amp;"), (new DOMParser).parseFromString(e, "text/xml"))))
                    }
                    parseXML() {
                        for (let e = 0; e < this._xmlQueue.length; e++) this._xmlQueue[e] = this._xmlQueue[e].then((e => {
                            switch (e.documentElement.nodeName) {
                                case "songs":
                                    this.songs.length > 0 && this.parseSongFile(e);
                                    break;
                                case "images":
                                    this.images.length > 0 && this.parseImageFile(e);
                                    break;
                                case "info":
                                    this.parseInfoFile(e);
                                    break;
                                default:
                                    console.log("XML found with no songs, images or info")
                            }
                        }));
                        return Promise.all(this._xmlQueue)
                    }
                    parseSongFile(e) {
                        let t = [],
                            i = e.documentElement.firstElementChild;
                        for (; i; i = i.nextElementSibling) {
                            let e = this.getSong(i.attributes[0].value);
                            if (e) {
                                if (e.title = i.getTag("title"), e.title || (e.title = "<no name>", e.name), e.rhythm = i.getTag("rhythm"), e.rhythm || (e.rhythm = "..no..rhythm..", e.name), e.buildupName = i.getTag("buildup"), e.buildupName) {
                                    e.buildupName, e.name;
                                    let t = this.getSong(e.buildupName);
                                    t ? (e.buildup = t.sound, e.buildupPlayed = !1, this.songs.splice(this.songs.indexOf(t), 1)) : e.buildupName
                                }
                                e.buildupRhythm = i.getTag("buildupRhythm"), e.independentBuild = i.getTag("independentBuild"), e.source = i.getTag("source"), e.charsPerBeat = parseFloat(i.getTag("charsPerBeat")), "PackShit" == this.name && (e.forceTrim = !0), t.push(e), e.name, e.title
                            } else i.attributes[0].value
                        }
                        for (let e = 0; e < this.songs.length; e++) - 1 == t.indexOf(this.songs[e]) && this.songs[e].name;
                        this.songs = t
                    }
                    parseInfoFile(e) {
                        let t = e.documentElement;
                        this.name = t.getTag("name", this.name), this.author = t.getTag("author", this.author), this.description = t.getTag("description", this.description), this.link = t.getTag("link", this.link)
                    }
                    parseImageFile(e) {
                        let t = [],
                            i = e.documentElement.firstElementChild;
                        for (; i; i = i.nextElementSibling) {
                            let e = this.getImage(i.attributes[0].value);
                            if (e) {
                                e.fullname = i.getTag("fullname"), e.fullname || e.name, e.source = i.getTag("source"), e.align = i.getTag("align", e.align), e.beatsPerAnim = parseFloat(i.getTag("beatsPerAnim")), e.syncOffset = parseFloat(i.getTag("syncOffset"));
                                let n = i.getTag("frameDuration");
                                if (n) {
                                    e.frameDurations = [];
                                    let t = n.split(",");
                                    for (let i = 0; i < t.length; i++) e.frameDurations.push(parseInt(t[i]));
                                    for (; e.frameDurations.length < e.bitmaps.length;) e.frameDurations.push(e.frameDurations[e.frameDurations.length - 1]);
                                    e.frameDurations
                                }
                                e.name, e.fullname, e.bitmap || e.bitmaps ? t.push(e) : e.name
                            } else i.attributes[0].value
                        }
                        for (let e = 0; e < this.images.length; e++) {
                            let i = this.images[e]; - 1 == t.indexOf(i) && t.push(i)
                        }
                        t.sort((function(e, t) {
                            return e.name.localeCompare(t.name)
                        })), this.images = t
                    }
                    containsSong(e) {
                        return null !== this.getSong(e)
                    }
                    containsImage(e) {
                        return null !== this.getImage(e)
                    }
                    getSong(e) {
                        for (let t = 0; t < this.songs.length; t++)
                            if (e == this.songs[t].name) return this.songs[t];
                        return null
                    }
                    getImage(e) {
                        for (let t = 0; t < this.images.length; t++)
                            if (e == this.images[t].name) return this.images[t];
                        return null
                    }
                }, Element.prototype.getTag = function(e, t) {
                    let i = this.getElementsByTagName(e)[0];
                    return i ? i.textContent : t || null
                }
            }(window, document),
            function(e, t) {
                let i = 100,
                    n = 20;
                e.HuesEditor = class {
                    constructor(e, t) {
                        this.buildEditSize = 80, this.buildEdit = null, this.loopEdit = null, this.editArea = null, this.wrapAt = 32, this.hilightWidth = 0, this.hilightHeight = 0, this.undoBuffer = [], this.redoBuffer = [], this.batchUndoArray = null, this.buildWave = null, this.loopWave = null, this.buildWaveBuff = null, this.loopWaveBuff = null, this.waveContext = null, this.waveCanvas = null, this.respack = null, this.linked = !1, this.core = e, e.settings.enableWindow && (this.initUI(), e.addEventListener("beat", this.onBeat.bind(this)), e.addEventListener("newsong", this.onNewSong.bind(this)), t.addTab("EDITOR", this.root))
                    }
                    initUI() {
                        this.root = t.createElement("div"), this.root.className = "editor";
                        let i = t.createElement("div");
                        i.className = "editor__title-buttons", this.root.appendChild(i), this.saveBtn = this.createButton("Save XML", i, !0), this.saveBtn.addEventListener("click", this.saveXML.bind(this)), this.copyBtn = this.createButton("Copy XML", i, !0), this.copyBtn.addEventListener("click", this.copyXML.bind(this)), this.undoBtn = this.createButton("Undo", i, !0), this.undoBtn.addEventListener("click", this.undo.bind(this)), this.redoBtn = this.createButton("Redo", i, !0), this.redoBtn.addEventListener("click", this.redo.bind(this));
                        let n = this.createButton("Help?", i);
                        n.style.backgroundColor = "rgba(0,160,0,0.3)", n.addEventListener("click", (() => {
                            e.open("https://github.com/mon/0x40-web/tree/master/docs/Editor.md", "_blank")
                        })), this.statusMsg = t.createElement("span"), this.statusMsg.className = "editor__status-msg", i.appendChild(this.statusMsg), this.topBar = t.createElement("div"), this.topBar.className = "editor__top-bar", this.root.appendChild(this.topBar), this.uiCreateInfo(), this.uiCreateImport(), this.root.appendChild(t.createElement("hr")), this.uiCreateEditArea(), this.uiCreateControls(), this.uiCreateVisualiser(), t.addEventListener("keydown", (t => {
                            if ((t = t || e.event).defaultPrevented) return !0;
                            let i = t.keyCode || t.which;
                            return !t.ctrlKey || (90 == i ? this.undo() : 89 == i && this.redo(), 90 != i && 89 != i) || (t.preventDefault(), !1)
                        })), e.addEventListener("resize", this.resize.bind(this)), this.core.window.addEventListener("tabselected", this.resize.bind(this, !1)), this.resize()
                    }
                    resize(i) {
                        this.root.style.height = e.innerHeight - 200 + "px";
                        let n = this.editArea.offsetHeight,
                            s = this.buildEdit._header.offsetHeight,
                            a = this.loopEdit._header.offsetHeight,
                            r = this.resizeHandle.offsetHeight,
                            o = s,
                            l = n - r - a - s,
                            h = Math.min(l, Math.max(o, this.buildEditSize - r));
                        this.buildEdit.style.height = h + "px", this.buildEdit._box.style.height = h - s + "px";
                        let d = l - h + a;
                        if (this.loopEdit.style.height = d + "px", this.loopEdit._box.style.height = d - a + "px", this.editArea.offsetHeight != n && this.resize(), this.timeLock.style.height = h + r + "px", !i) {
                            let e = t.createElement("div");
                            e.className = "beat-hilight";
                            let i = "";
                            for (let e = 0; e < 99; e++) i += "<br />";
                            for (let e = 0; e < 100; e++) i += "&nbsp;";
                            e.innerHTML = i, this.loopEdit.appendChild(e), this.hilightWidth = e.clientWidth / 100, this.hilightHeight = e.clientHeight / 100, this.loopEdit.removeChild(e), this.waveCanvas.width = this.waveCanvas.clientWidth
                        }
                    }
                    getOther(e) {
                        return e == this.loopEdit ? this.buildEdit : this.loopEdit
                    }
                    onNewSong(e) {
                        this.linked ? e == this.song ? (this.updateInfo(), this.updateWaveform()) : (this.linked = !1, this.buildEdit._hilight.innerHTML = "&block;", this.loopEdit._hilight.innerHTML = "&block;", this.buildEdit._hilight.className = "beat-hilight invisible", this.loopEdit._hilight.className = "beat-hilight invisible", this.waveContext.clearRect(0, 0, this.waveCanvas.width, n)) : e == this.song && (this.linked = !0)
                    }
                    onBeat(e, t) {
                        if (!this.song || this.core.currentSong != this.song) return;
                        let i;
                        t < 0 ? (t += this.core.currentSong.buildupRhythm.length, i = this.buildEdit, this.loopEdit._hilight.className = "beat-hilight invisible") : (i = this.loopEdit, this.song.buildup && (this.buildEdit._hilight.className = "beat-hilight invisible")), i._hilight.className = "beat-hilight";
                        let n = t % this.wrapAt,
                            s = Math.floor(t / this.wrapAt);
                        i._hilight.style.left = Math.floor(n * this.hilightWidth) + "px", i._hilight.style.top = Math.floor(s * this.hilightHeight) + "px"
                    }
                    reflow(e, t) {
                        if (!t) return e._beatmap.textContent = "", e._hilight.textContent = "[none]", e._hilight.className = "beat-hilight", e._hilight.style.top = "0", e._hilight.style.left = "0", void(e._beatCount.textContent = "0 beats");
                        e._hilight.innerHTML = "&block;", e._beatCount.textContent = t.length + " beats";
                        let i = new RegExp("(.{" + this.wrapAt + "})", "g");
                        e._beatmap.innerHTML = t.replace(i, "$1<br />")
                    }
                    updateInfo() {
                        if (this.seekStart.classList.add("hues-button--disabled"), this.seekLoop.classList.add("hues-button--disabled"), this.saveBtn.classList.add("hues-button--disabled"), this.copyBtn.classList.add("hues-button--disabled"), this.buildEdit._removeBtn.classList.add("hues-button--disabled"), this.loopEdit._removeBtn.classList.add("hues-button--disabled"), !this.song) return;
                        if (this.saveBtn.classList.remove("hues-button--disabled"), this.copyBtn.classList.remove("hues-button--disabled"), this.song.independentBuild ? (this.timeLock._locker.innerHTML = "&#xe904;", this.timeLock.classList.add("edit-area__timelock--unlocked")) : (this.timeLock._locker.innerHTML = "&#xe905;", this.timeLock.classList.remove("edit-area__timelock--unlocked")), this.song.sound && (this.seekLoop.classList.remove("hues-button--disabled"), this.loopEdit._removeBtn.classList.remove("hues-button--disabled")), this.song.buildup && (this.seekStart.classList.remove("hues-button--disabled"), this.buildEdit._removeBtn.classList.remove("hues-button--disabled")), !this.linked) return;
                        let e = this.core.soundManager.loopLength,
                            t = this.core.soundManager.buildLength,
                            i = e / this.song.rhythm.length * 1e3;
                        this.loopLen.textContent = e.toFixed(2), this.buildLen.textContent = t.toFixed(2), this.beatLen.textContent = i.toFixed(2)
                    }
                    loadAudio(e) {
                        if (e._fileInput.files.length < 1) return;
                        this.newSong(this.song);
                        let t = !this.song[e._sound] && !!this.song[this.getOther(e)._sound],
                            i = e._fileInput.files[0];
                        this.blobToArrayBuffer(i).then((e => {
                            let t = {
                                test: e
                            };
                            return this.core.soundManager.loadBuffer(t, "test").then((() => t.test))
                        })).then((t => {
                            this.song[e._sound] = t;
                            let n = i.name.replace(/\.[^/.]+$/, "");
                            if ("sound" == e._sound ? this.song.name = n : this.song.buildupName = n, this.getText(e) || this.setText(e, "x...o...x...o..."), this.song.sound) return this.core.soundManager.playSong(this.song, !0, !0)
                        })).then((() => {
                            t && this.setIndependentBuild(!1), this.updateInfo(), this.core.updateBeatLength(), this.core.recalcBeatIndex(), this.updateWaveform()
                        })).catch((e => {
                            console.log(e), this.alert("Couldn't load song! Is it a LAME encoded MP3?")
                        }))
                    }
                    removeAudio(e) {
                        this.song && (this.song[e._sound] = null, this.song[e._rhythm] = "", this.setIndependentBuild(!0), this.reflow(e, ""), this.song.sound && this.linked ? this.core.soundManager.playSong(this.song, !0, !0).then((() => {
                            this.updateWaveform()
                        })) : (this.core.soundManager.stop(), this.updateWaveform()), this.updateInfo(), this.updateHalveDoubleButtons(e))
                    }
                    blobToArrayBuffer(e) {
                        return new Promise(((t, i) => {
                            let n = new FileReader;
                            n.onload = () => {
                                t(n.result)
                            }, n.onerror = () => {
                                i(new Error("File read failed!"))
                            }, n.readAsArrayBuffer(e)
                        }))
                    }
                    newSong(e) {
                        e || (e = {
                            name: "Name",
                            title: "Title",
                            rhythm: "",
                            source: "",
                            sound: null,
                            enabled: !0,
                            filename: null,
                            charsPerBeat: null,
                            independentBuild: !0
                        }, this.respack || (this.respack = new Respack, this.respack.name = "Editor Respack", this.respack.author = "You!", this.respack.description = "An internal resourcepack for editing new songs", this.core.resourceManager.addPack(this.respack)), this.respack.songs.push(e), this.core.resourceManager.rebuildArrays(), this.core.resourceManager.rebuildEnabled(), this.core.setSongOject(e)), this.buildEdit._hilight.className = "beat-hilight invisible", this.loopEdit._hilight.className = "beat-hilight invisible", this.newSongBtn.classList.remove("hues-button--glow"), this.fromSongBtn.classList.remove("hues-button--glow"), this.title.disabled = !1, this.source.disabled = !1, this.clearUndoRedo(), this.song = e, this.reflow(this.buildEdit, e.buildupRhythm), this.reflow(this.loopEdit, e.rhythm), this.title.value = e.title, this.source.value = e.source, this.updateIndependentBuild(), this.setLocked(this.buildEdit, 0), this.setLocked(this.loopEdit, 0), this.linked = !0, this.updateInfo(), this.updateWaveform()
                    }
                    updateIndependentBuild() {
                        !!this.song.buildup != !!this.song.sound && this.setIndependentBuild(!0)
                    }
                    setIndependentBuild(e) {
                        if (this.song.independentBuild = e, !e) {
                            let e = this.loopEdit._locked && this.buildEdit._locked;
                            this.loopEdit._locked = 0, this.buildEdit._locked = 0, this.setText(this.loopEdit, this.getText(this.loopEdit)), e && (this.loopEdit._locked = this.song.rhythm.length, this.buildEdit._locked = this.song.buildupRhythm.length)
                        }
                        this.updateInfo()
                    }
                    batchUndo() {
                        this.batchUndoArray || (this.batchUndoArray = [])
                    }
                    commitUndo() {
                        this.batchUndoArray && (this.undoBuffer.push(this.batchUndoArray), this.trimUndo(), this.batchUndoArray = null, this.updateUndoUI())
                    }
                    pushUndo(e, t, i, n) {
                        if (i == n) return;
                        this.redoBuffer = [];
                        let s = {
                            songVar: e,
                            editor: t,
                            text: i,
                            indep: this.song.independentBuild
                        };
                        this.batchUndoArray ? this.batchUndoArray.push(s) : (this.undoBuffer.push([s]), this.trimUndo()), this.updateUndoUI()
                    }
                    trimUndo() {
                        for (; this.undoBuffer.length > 50;) this.undoBuffer.shift()
                    }
                    undo() {
                        this.undoRedo(this.undoBuffer, this.redoBuffer)
                    }
                    redo() {
                        this.undoRedo(this.redoBuffer, this.undoBuffer)
                    }
                    undoRedo(e, t) {
                        if (0 === e.length || !this.song) return;
                        let i = e.pop(),
                            n = [];
                        for (let e = 0; e < i.length; e++) {
                            let t = i[e];
                            n.push({
                                songVar: t.songVar,
                                editor: t.editor,
                                text: this.song[t.songVar],
                                indep: this.song.independentBuild
                            }), this.song[t.songVar] = t.text, this.song.independentBuild = t.indep, t.editor._locked && (t.editor._locked = t.text.length), this.reflow(t.editor, this.song[t.songVar]), this.updateHalveDoubleButtons(t.editor)
                        }
                        t.push(n), this.updateUndoUI(), this.updateInfo(), this.core.updateBeatLength(), this.core.recalcBeatIndex()
                    }
                    clearUndoRedo() {
                        this.undoBuffer = [], this.redoBuffer = [], this.updateUndoUI()
                    }
                    updateUndoUI() {
                        this.undoBtn.className = "hues-button hues-button--disabled", this.redoBtn.className = "hues-button hues-button--disabled", this.undoBuffer.length > 0 && this.undoBtn.classList.remove("hues-button--disabled"), this.redoBuffer.length > 0 && this.redoBtn.classList.remove("hues-button--disabled")
                    }
                    halveBeats(e) {
                        let t = !1;
                        if (!this.song.independentBuild) {
                            t = !0, this.batchUndo();
                            let i = this.getOther(e);
                            this.song.independentBuild = !0, this.halveBeats(i)
                        }
                        this.setText(e, this.song[e._rhythm].replace(/(.)./g, "$1")), t && (this.commitUndo(), this.setIndependentBuild(!1))
                    }
                    doubleBeats(e) {
                        let t = !1;
                        if (!this.song.independentBuild) {
                            t = !0, this.batchUndo();
                            let i = this.getOther(e);
                            this.song.independentBuild = !0, this.doubleBeats(i)
                        }
                        this.setText(e, this.song[e._rhythm].replace(/(.)/g, "$1.")), t && (this.commitUndo(), this.setIndependentBuild(!1))
                    }
                    updateHalveDoubleButtons(e) {
                        if (e._halveBtn.className = "hues-button hues-button--disabled", e._doubleBtn.className = "hues-button hues-button--disabled", !e._locked) {
                            let t = this.getText(e).length;
                            if (!this.song.independentBuild) {
                                let i = this.getOther(e);
                                t = Math.min(t, this.getText(i).length)
                            }
                            t > 0 && (e._doubleBtn.className = "hues-button"), t > 1 && (e._halveBtn.className = "hues-button")
                        }
                    }
                    createTextInput(e, i, n) {
                        let s = t.createElement("div");
                        s.className = "editor__label";
                        let a = t.createElement("label");
                        a.innerHTML = e, s.appendChild(a);
                        let r = t.createElement("span");
                        r.className = "editor__textinput-container";
                        let o = t.createElement("input");
                        return o.className = "editor__textinput", o.type = "text", o.value = i, r.appendChild(o), s.appendChild(r), n.appendChild(s), o
                    }
                    createButton(e, i, n, s) {
                        let a = t.createElement("span");
                        return a.className = "hues-button", n && a.classList.add("hues-button--disabled"), s && (a.className += " " + s), a.addEventListener("click", (e => !a.classList.contains("hues-button--disabled") || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), !1))), a.innerHTML = e.toUpperCase(), i.appendChild(a), a
                    }
                    uiCreateInfo() {
                        let e = t.createElement("div");
                        this.topBar.appendChild(e), e.className = "editor__info";
                        let i = function(e) {
                            this.song && (this.song[e] = this[e].value, this.song == this.core.currentSong && this.core.callEventListeners("newsong", this.song))
                        };
                        this.title = this.createTextInput("Title:", "Song name", e), this.title.oninput = i.bind(this, "title"), this.title.disabled = !0, this.source = this.createTextInput("Link:&nbsp;", "Source link", e), this.source.oninput = i.bind(this, "source"), this.source.disabled = !0
                    }
                    uiCreateImport() {
                        let e = t.createElement("div");
                        this.topBar.appendChild(e), e.className = "editor__imports";
                        let i = t.createElement("div");
                        e.appendChild(i);
                        let n = this.createButton("New song", i, !1, "hues-button--glow");
                        n.addEventListener("click", (() => {
                            this.newSong()
                        })), this.newSongBtn = n;
                        let s = this.createButton("Edit current song", i, !1, "hues-button--glow");
                        s.addEventListener("click", (() => {
                            this.core.currentSong && this.newSong(this.core.currentSong)
                        })), this.fromSongBtn = s;
                        let a = t.createElement("div");
                        a.className = "settings-individual editor__song-stats", e.appendChild(a), this.loopLen = this.uiCreateSongStat("Loop length (s):", "0.00", a), this.buildLen = this.uiCreateSongStat("Build length (s):", "0.00", a), this.beatLen = this.uiCreateSongStat("Beat length (ms):", "0.00", a)
                    }
                    uiCreateSongStat(e, i, n) {
                        let s = t.createElement("div");
                        n.appendChild(s);
                        let a = t.createElement("span");
                        a.textContent = e, s.appendChild(a);
                        let r = t.createElement("span");
                        return r.textContent = i, r.className = "editor__song-stats__value", s.appendChild(r), r
                    }
                    uiCreateEditArea() {
                        let e = t.createElement("div");
                        this.editArea = e, e.className = "edit-area", this.root.appendChild(e), this.timeLock = t.createElement("div"), e.appendChild(this.timeLock), this.timeLock.className = "hues-icon edit-area__timelock edit-area__timelock--unlocked";
                        let i = this.createButton("&#xe904;", this.timeLock);
                        i.addEventListener("click", (() => {
                            this.song && this.song.buildup && this.song.sound && this.setIndependentBuild(!this.song.independentBuild)
                        })), this.timeLock._locker = i, this.buildEdit = this.uiCreateSingleEditor("Buildup", "buildup", "buildupRhythm", e), this.seekStart = this.buildEdit._seek, this.seekStart.innerHTML = "&#xe90b;", this.seekStart.addEventListener("click", (() => {
                            this.core.soundManager.seek(-this.core.soundManager.buildLength)
                        }));
                        let n = t.createElement("div");
                        n.className = "resize-handle", e.appendChild(n);
                        let s = t.createElement("div");
                        s.className = "hues-icon resize-handle__handle", s.innerHTML = "&#xe908;", n.appendChild(s), this.resizeHandle = n, n.addEventListener("mousedown", (e => {
                            e.preventDefault();
                            let i = this.editArea.getBoundingClientRect().top,
                                n = this.resizeHandle.clientHeight,
                                s = e => {
                                    this.buildEditSize = Math.floor(e.clientY - i + n / 2), this.resize(!0)
                                },
                                a = function(e) {
                                    t.removeEventListener("mousemove", s), t.removeEventListener("mouseup", a)
                                };
                            t.addEventListener("mousemove", s), t.addEventListener("mouseup", a)
                        })), this.loopEdit = this.uiCreateSingleEditor("Rhythm&nbsp;", "sound", "rhythm", e), this.seekLoop = this.loopEdit._seek, this.seekLoop.innerHTML = "&#xe90b;", this.seekLoop.addEventListener("click", (() => {
                            this.core.soundManager.seek(0)
                        })), this.buildEdit._hilight.textContent = "[none]", this.loopEdit._hilight.innerHTML = '<br />Click [LOAD RHYTHM] to load a loop! LAME encoded MP3s work best.<br />(LAME is important for seamless MP3 loops)<br /><br />[DOUBLE] doubles the selected map length by padding it with "."s.<br />[HALVE] shortens the map length by removing every other character.<br /><br />You can also add a buildup with [LOAD BUILDUP], or remove it<br />with [REMOVE].<br /><br />[NEW SONG] adds a completely empty song for you to edit, and<br />[EDIT CURRENT SONG] takes the current playing song to the editor.<br /><br />[COPY/SAVE XML] allow for storing the rhythms and easy <br />inclusion into a Resource Pack!'
                    }
                    uiCreateSingleEditor(e, i, n, s) {
                        let a = t.createElement("div");
                        s.appendChild(a);
                        let r = t.createElement("div");
                        r.className = "edit-area__header", a.appendChild(r);
                        let o = t.createElement("span");
                        r.appendChild(o), o.innerHTML = e;
                        let l = this.createButton("", r, !0, "hues-icon");
                        r.appendChild(l), a._seek = l;
                        let h = t.createElement("span");
                        r.appendChild(h), h.className = "edit-area__beat-count", h.textContent = "0 beats", a._lockedBtn = this.createButton("&#xe907;", r, !1, "hues-icon"), a._lockedBtn.addEventListener("click", (() => {
                            if (a._locked) this.setLocked(a, 0);
                            else {
                                let e = this.getText(a).length;
                                this.setLocked(a, e)
                            }
                        }));
                        let d = t.createElement("span");
                        d.className = "edit-area__header__right", r.appendChild(d), a._halveBtn = this.createButton("Halve", d, !0), a._halveBtn.addEventListener("click", this.halveBeats.bind(this, a)), a._doubleBtn = this.createButton("Double", d, !0), a._doubleBtn.addEventListener("click", this.doubleBeats.bind(this, a));
                        let c = t.createElement("input");
                        c.type = "file", c.accept = ".mp3, .wav, .ogg", c.multiple = !1, c.onchange = this.loadAudio.bind(this, a), this.createButton("Load " + e.replace(/&nbsp;/g, ""), d).addEventListener("click", (() => {
                            c.click()
                        })), a._removeBtn = this.createButton("Remove", d, !0), a._removeBtn.addEventListener("click", this.removeAudio.bind(this, a));
                        let u = t.createElement("div");
                        u.className = "edit-area__box";
                        let p = t.createElement("div");
                        p.className = "edit-area__beatmap", p.contentEditable = !0, p.spellcheck = !1, p.oninput = this.textUpdated.bind(this, a), p.oncontextmenu = this.rightClick.bind(this, a);
                        let m = t.createElement("div");
                        return m.className = "beat-hilight", u.appendChild(m), u.appendChild(p), a.appendChild(u), a._header = r, a._beatCount = h, a._box = u, a._beatmap = p, a._hilight = m, a._fileInput = c, a._sound = i, a._rhythm = n, a._locked = 0, a
                    }
                    uiCreateControls() {
                        let e = t.createElement("div");
                        e.className = "edit__controls", this.root.appendChild(e);
                        let i = function(e) {
                                let t = this.core.soundManager.playbackRate;
                                t += e, this.core.soundManager.setRate(t);
                                let i = this.core.soundManager.playbackRate;
                                s.textContent = i.toFixed(2) + "x"
                            },
                            n = t.createElement("div");
                        e.appendChild(n), this.createButton("&#xe909;", n, !1, "hues-icon").addEventListener("click", i.bind(this, -.25)), this.createButton("&#xe90a;", n, !1, "hues-icon").addEventListener("click", i.bind(this, .25));
                        let s = t.createElement("span");
                        s.className = "settings-individual", s.textContent = "1.00x", n.appendChild(s);
                        let a = t.createElement("div");
                        e.appendChild(a);
                        let r = t.createElement("span");
                        r.className = "settings-individual", r.textContent = "New line at beat ", a.appendChild(r);
                        let o = t.createElement("input");
                        o.className = "settings-input", o.value = this.wrapAt, o.type = "text", o.oninput = () => {
                            o.value = o.value.replace(/\D/g, ""), "" === o.value || o.value < 1 ? o.value = "" : (this.wrapAt = parseInt(o.value), this.reflow(this.buildEdit, this.song.buildupRhythm), this.reflow(this.loopEdit, this.song.rhythm))
                        }, a.appendChild(o)
                    }
                    uiCreateVisualiser() {
                        let e = t.createElement("canvas");
                        e.className = "waveform", e.height = n, this.root.appendChild(e), this.waveCanvas = e, this.waveContext = e.getContext("2d"), this.core.addEventListener("frame", this.drawWave.bind(this))
                    }
                    rightClick(e, t) {
                        if (!this.linked) return;
                        let i = this.getTextCoords(t);
                        if (i.x > this.wrapAt) return !0;
                        let n = i.y * this.wrapAt + i.x,
                            s = this.getText(e).length;
                        if (n > s) return !0;
                        this.setCaret(e._beatmap, n);
                        let a = n / s,
                            r = 0;
                        if (e == this.loopEdit) r = this.core.soundManager.loopLength * a;
                        else {
                            let e = this.core.soundManager.buildLength;
                            r = e * a - e
                        }
                        return this.core.soundManager.seek(r), t.preventDefault(), !1
                    }
                    getTextCoords(e) {
                        let t = e.target,
                            i = 0,
                            n = 0;
                        for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop);) i += t.offsetLeft - t.scrollLeft, n += t.offsetTop - t.scrollTop, t = t.offsetParent;
                        return i = Math.floor((e.clientX - i) / this.hilightWidth), n = Math.floor((e.clientY - n) / this.hilightHeight), {
                            x: i,
                            y: n
                        }
                    }
                    textUpdated(e) {
                        if (!this.song || !this.song[e._sound]) return void this.reflow(e, "");
                        let t = e._beatmap.textContent.replace(/ |\u00a0/g, "");
                        0 === t.length && (t = "."), this.setText(e, t)
                    }
                    getText(e) {
                        return this.song && this.song[e._rhythm] ? this.song[e._rhythm] : ""
                    }
                    setText(t, i, n) {
                        if (!this.song || !this.song[t._sound]) return void this.reflow(t, "");
                        let s = !1,
                            a = n ? i.length : this.getCaret(t._beatmap);
                        if (t._locked)
                            if (a = Math.min(t._locked, a), i.length > t._locked) i = i.slice(0, a) + i.slice(a + (i.length - t._locked), i.length);
                            else
                                for (; i.length < t._locked;) i += ".";
                        else if (!this.song.independentBuild && this.song.buildupRhythm && this.song.rhythm) {
                            let e;
                            e = t == this.loopEdit ? this.core.soundManager.loopLength / this.core.soundManager.buildLength : this.core.soundManager.buildLength / this.core.soundManager.loopLength;
                            let n = Math.round(i.length / e);
                            for (; 0 === n;) i += ".", n = Math.round(i.length / e);
                            let a = this.getOther(t),
                                r = a._locked;
                            a._locked = n, this.batchUndo(), s = !0, this.song.independentBuild = !0, this.setText(a, this.song[a._rhythm], !0), this.song.independentBuild = !1, r || (a._locked = 0), this.updateHalveDoubleButtons(a)
                        }
                        this.pushUndo(t._rhythm, t, this.song[t._rhythm], i), s && this.commitUndo(), e.onbeforeunload = this.confirmLeave, this.song[t._rhythm] = i, this.reflow(t, this.song[t._rhythm]), this.setCaret(t._beatmap, a), this.updateHalveDoubleButtons(t), this.core.updateBeatLength(), this.core.recalcBeatIndex(), this.updateInfo()
                    }
                    getCaret(t) {
                        let i = 0,
                            n = e.getSelection();
                        if (n.rangeCount) {
                            let e = n.getRangeAt(0);
                            for (let n = 0; n < t.childNodes.length; n++) {
                                if (e.commonAncestorContainer == t.childNodes[n]) return i += e.endOffset, i;
                                i += t.childNodes[n].textContent.length
                            }
                        }
                        return 0
                    }
                    setCaret(i, n) {
                        let s = t.createRange(),
                            a = e.getSelection();
                        for (let e = 0; e < i.childNodes.length; e += 2) {
                            let t = i.childNodes[e].textContent.length;
                            if (!(n > t)) {
                                s.setStart(i.childNodes[e], n), s.collapse(!0), a.removeAllRanges(), a.addRange(s);
                                break
                            }
                            n -= t
                        }
                    }
                    setLocked(e, t) {
                        if (e._locked = t, e._lockedBtn.innerHTML = t ? "&#xe906;" : "&#xe907;", !this.song.independentBuild) {
                            let i = this.getOther(e),
                                n = t ? this.getText(i).length : 0;
                            this.song.independentBuild = !0, this.setLocked(i, n), this.song.independentBuild = !1
                        }
                        this.updateHalveDoubleButtons(e)
                    }
                    updateWaveform() {
                        this.buildWaveBuff != this.core.soundManager.buildup && (this.buildWaveBuff = this.core.soundManager.buildup, this.buildWave = this.renderWave(this.buildWaveBuff, this.core.soundManager.buildLength)), this.loopWaveBuff != this.core.soundManager.loop && (this.loopWaveBuff = this.core.soundManager.loop, this.loopWave = this.renderWave(this.loopWaveBuff, this.core.soundManager.loopLength))
                    }
                    renderWave(e, s) {
                        if (!e) return null;
                        let a = t.createElement("canvas"),
                            r = a.getContext("2d");
                        a.height = n, a.width = Math.floor(i * s);
                        let o = Math.floor(e.sampleRate / i),
                            l = [];
                        for (let t = 0; t < e.numberOfChannels; t++) l.push(e.getChannelData(t));
                        let h = e.numberOfChannels,
                            d = .5,
                            c = 10;
                        for (let t = 0; t < e.length; t += o) {
                            let i, n = 0,
                                s = 0,
                                a = 0,
                                u = 0;
                            for (i = 0; i < o && t + i < e.length; i++)
                                for (let e = 0; e < h; e++) {
                                    let r = l[e][t + i];
                                    r > 0 ? a += r : u += r, r > s && (s = r), r < n && (n = r)
                                }
                            let p = Math.floor(c + s * c),
                                m = Math.floor(c + n * c);
                            r.strokeStyle = "black", r.globalAlpha = "1", r.beginPath(), r.moveTo(d, p), r.lineTo(d, m), r.stroke(), a /= i * h, u /= i * h;
                            let g = Math.floor(c + a * c),
                                f = Math.floor(c + u * c);
                            r.strokeStyle = "white", r.globalAlpha = "0.5", r.beginPath(), r.moveTo(d, g), r.lineTo(d, f), r.stroke(), d += 1
                        }
                        return a
                    }
                    drawWave() {
                        if (!this.buildWave && !this.loopWave || !this.linked) return;
                        let e, t, s = this.waveCanvas.width,
                            a = this.core.soundManager.currentTime,
                            r = s / i / 2,
                            o = a - r,
                            l = a + r,
                            h = this.core.soundManager.buildLength,
                            d = this.core.soundManager.loopLength;
                        if (e = h ? Math.max(o, -h) : Math.max(o, 0), t = Math.floor((e - o) * i), this.waveContext.clearRect(0, 0, s, n), this.buildWave && h && o < 0) {
                            let i = Math.floor((1 - e / -h) * (this.buildWave.width - 1));
                            try {
                                t = this.drawOneWave(this.buildWave, i, t, s)
                            } catch (e) {
                                console.log(this.waveCanvas)
                            }
                            e = 0
                        }
                        let c = [];
                        if (this.loopWave && d && l > 0)
                            for (; t < s;) {
                                0 === e && c.push(t);
                                let i = Math.floor(e / d * (this.loopWave.width - 1));
                                t = this.drawOneWave(this.loopWave, i, t, s), e = 0
                            }
                        this.drawWaveBar("red", s / 2);
                        for (let e of c) this.drawWaveBar("green", e)
                    }
                    drawOneWave(e, t, i, s) {
                        let a = Math.min(s - i, e.width - t);
                        return this.waveContext.drawImage(e, t, 0, a, n, i, 0, a, n), i + a
                    }
                    drawWaveBar(e, t) {
                        this.waveContext.strokeStyle = e, this.waveContext.lineWidth = 2, this.waveContext.beginPath(), this.waveContext.moveTo(t, 0), this.waveContext.lineTo(t, n), this.waveContext.stroke()
                    }
                    confirmLeave() {
                        return "Unsaved beatmap - leave anyway?"
                    }
                    alert(e) {
                        this.statusMsg.classList.remove("editor__status-msg--fade"), this.statusMsg.textContent = e, this.statusMsg.offsetWidth, this.statusMsg.classList.add("editor__status-msg--fade")
                    }
                    generateXML() {
                        if (!this.song) return null;
                        let e = '  <song name="' + this.song.name + '">\n';
                        return e += "    <title>" + this.song.title + "</title>\n", this.song.source && (e += "    <source>" + this.song.source + "</source>\n"), e += "    <rhythm>" + this.song.rhythm + "</rhythm>\n", this.song.buildup && (e += "    <buildup>" + this.song.buildupName + "</buildup>\n", e += "    <buildupRhythm>" + this.song.buildupRhythm + "</buildupRhythm>\n", this.song.independentBuild && (e += "    <independentBuild>true</independentBuild>\n")), e += "  </song>\n", e
                    }
                    saveXML() {
                        let i = this.generateXML();
                        if (!i) return;
                        let n = "<songs>\n";
                        n += i, n += "</songs>\n";
                        let s = t.createElement("a");
                        s.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(n)), s.setAttribute("download", "0x40Hues - " + this.song.name + ".xml"), s.style.display = "none", t.body.appendChild(s), s.click(), t.body.removeChild(s), e.onbeforeunload = null
                    }
                    copyXML() {
                        let e = this.generateXML();
                        if (!e) return;
                        let i, n = t.createElement("textarea");
                        n.className = "copybox", n.value = e, t.body.appendChild(n), n.select();
                        try {
                            i = t.execCommand("copy")
                        } catch (e) {
                            i = !1
                        }
                        t.body.removeChild(n), i ? this.alert("Beatmap XML copied to clipboard!") : this.alert("Copy failed! Try saving instead")
                    }
                }
            }(window, document),
            function(e, t) {
                const i = {
                        workersPath: "lib/workers/",
                        respacks: [],
                        parseQueryString: !0,
                        respackPath: "respacks/",
                        load: !0,
                        autoplay: !0,
                        overwriteLocal: !1,
                        firstSong: null,
                        firstImage: null,
                        fullAuto: !0,
                        packsURL: "https://cdn.0x40hu.es/getRespacks.php",
                        disableRemoteResources: !1,
                        enableWindow: !0,
                        showWindow: !1,
                        firstWindow: "INFO",
                        preloadPrefix: "0x",
                        preloadBase: 16,
                        preloadMax: 64,
                        preloadTitle: "",
                        huesName: "0x40 Hues of JS, v%VERSION% (absurd edition)",
                        root: null,
                        disableKeyboard: !1,
                        smartAlign: "on",
                        blurAmount: "medium",
                        blurDecay: "fast",
                        blurQuality: "medium",
                        currentUI: "modern",
                        colourSet: "normal",
                        blackoutUI: "off",
                        playBuildups: "on",
                        visualiser: "off",
                        shuffleImages: "on",
                        autoSong: "off",
                        autoSongDelay: 5,
                        autoSongShuffle: "on",
                        autoSongFadeout: "on",
                        trippyMode: "off",
                        volume: .7,
                        skipPreloader: "off"
                    },
                    n = {
                        Functionality: ["autoSong", "autoSongShuffle", "autoSongFadeout", "playBuildups"],
                        Graphics: ["blurAmount", "blurDecay", "blurQuality", "trippyMode"],
                        Visuals: ["smartAlign", "shuffleImages", "colourSet", "visualiser"],
                        Interface: ["currentUI", "blackoutUI", "skipPreloader"]
                    },
                    s = {
                        smartAlign: {
                            name: "Smart Align images",
                            options: ["off", "on"]
                        },
                        blurAmount: {
                            name: "Blur amount",
                            options: ["low", "medium", "high"]
                        },
                        blurDecay: {
                            name: "Blur decay",
                            options: ["slow", "medium", "fast", "faster!"]
                        },
                        blurQuality: {
                            name: "Blur quality",
                            options: ["low", "medium", "high", "extreme"]
                        },
                        visualiser: {
                            name: "Spectrum analyser",
                            options: ["off", "on"]
                        },
                        currentUI: {
                            name: "UI style",
                            options: ["retro", "v4.20", "modern", "xmas", "hlwn", "mini"]
                        },
                        colourSet: {
                            name: "Colour set",
                            options: ["normal", "pastel", "v4.20"]
                        },
                        blackoutUI: {
                            name: "Blackout affects UI",
                            options: ["off", "on"]
                        },
                        playBuildups: {
                            name: "Play buildups",
                            options: ["off", "once", "on"]
                        },
                        autoSong: {
                            name: "AutoSong",
                            options: ["off", "loop", "time", {
                                type: "varText",
                                text: function() {
                                    return "off" == this.autoSong ? "" : "after"
                                }
                            }, {
                                type: "input",
                                variable: "autoSongDelay",
                                inputType: "int",
                                visiblity: function() {
                                    return "off" != this.autoSong
                                }
                            }, {
                                type: "varText",
                                text: function() {
                                    let e = "";
                                    switch (this.autoSong) {
                                        case "loop":
                                            e = "loop";
                                            break;
                                        case "time":
                                            e = "min";
                                            break;
                                        default:
                                            return ""
                                    }
                                    return this.autoSongDelay > 1 && (e += "s"), e
                                }
                            }]
                        },
                        autoSongShuffle: {
                            name: "AutoSong shuffle",
                            options: ["off", "on"]
                        },
                        autoSongFadeout: {
                            name: "AutoSong fade out",
                            options: ["off", "on"]
                        },
                        trippyMode: {
                            name: "Trippy Mode",
                            options: ["off", "on"]
                        },
                        shuffleImages: {
                            name: "Shuffle images",
                            options: ["off", "on"]
                        },
                        skipPreloader: {
                            name: "Skip preloader warning",
                            options: ["off", "on"]
                        }
                    };
                e.HuesSettings = class {
                    constructor(e) {
                        this.eventListeners = {
                            updated: []
                        }, "1" != localStorage.settingsVersion && (localStorage.clear(), localStorage.settingsVersion = "1"), this.hasUI = !1, this.settingCheckboxes = {}, this.textCallbacks = [], this.visCallbacks = [], this.ephemerals = {};
                        for (let t in i) i.hasOwnProperty(t) && (Object.defineProperty(this, t, {
                            set: this.makeSetter(t),
                            get: this.makeGetter(t)
                        }), void 0 !== e[t] && (e.overwriteLocal ? this[t] = e[t] : this.ephemerals[t] = e[t]));
                        if (this.parseQueryString) {
                            let e = this.getQuerySettings();
                            for (let t in i) void 0 !== e[t] && "respacks" != t && (this.ephemerals[t] = e[t]);
                            this.respacks = this.respacks.concat(e.respacks)
                        }
                    }
                    getQuerySettings() {
                        let t = {
                                respacks: []
                            },
                            i = e.location.search.substring(1).split("&");
                        for (let e = 0; e < i.length; e++) {
                            let n = i[e].split("="),
                                s = decodeURIComponent(n[1]);
                            if ("packs" == n[0] || "respacks" == n[0]) {
                                let e = s.split(",");
                                for (let i = 0; i < e.length; i++) t.respacks.push(this.respackPath + e[i])
                            } else "song" == n[0] ? t.firstSong = s : ("true" !== s && "false" !== s || (s = "true" == s), t[n[0]] = s)
                        }
                        return t
                    }
                    initUI(e) {
                        let i = t.createElement("div");
                        i.className = "hues-options";
                        let a = function(e, t) {
                            this.value = this.value.replace(/\D/g, ""), "" === this.value || this.value < 1 ? this.value = "" : (e[t] = this.value, e.updateConditionals(), e.callEventListeners("updated"))
                        };
                        for (let e in n)
                            if (n.hasOwnProperty(e)) {
                                let r = t.createElement("div");
                                r.textContent = e, r.className = "settings-category";
                                let o = n[e];
                                for (let e = 0; e < o.length; e++) {
                                    let i = o[e],
                                        n = t.createElement("div"),
                                        l = s[i];
                                    n.textContent = l.name, n.className = "settings-individual";
                                    let h = t.createElement("div");
                                    h.className = "settings-buttons";
                                    for (let e = 0; e < l.options.length; e++) {
                                        let n = l.options[e];
                                        if ("string" == typeof n) {
                                            let e = t.createElement("input");
                                            this.settingCheckboxes[i + "-" + n] = e, e.className = "settings-checkbox", e.type = "radio", e.value = n;
                                            let s = 0,
                                                a = i + "-" + n + "-";
                                            for (; t.getElementById(a + s);) s++;
                                            e.name = i + "-" + s, e.id = a + s, this[i] == n && (e.checked = !0), e.onclick = function(e) {
                                                e[i] = this.value
                                            }.bind(e, this), h.appendChild(e);
                                            let r = t.createElement("label");
                                            r.className = "settings-label", r.htmlFor = e.id, r.textContent = n.toUpperCase(), h.appendChild(r)
                                        } else if ("varText" == n.type) {
                                            let e = t.createElement("span");
                                            e.textContent = n.text.bind(this)(), h.appendChild(e), this.textCallbacks.push({
                                                func: n.text.bind(this),
                                                element: e
                                            })
                                        } else if ("input" == n.type) {
                                            let e = t.createElement("input");
                                            e.setAttribute("type", "text"), e.className = "settings-input", e.value = this[n.variable], "int" == n.inputType && (e.oninput = a.bind(e, this, n.variable)), e.autofocus = !1, h.appendChild(e), n.visiblity && (this.visCallbacks.push({
                                                func: n.visiblity.bind(this),
                                                element: e
                                            }), e.style.visibility = n.visiblity.bind(this)() ? "visible" : "hidden")
                                        }
                                    }
                                    n.appendChild(h), r.appendChild(n)
                                }
                                i.appendChild(r)
                            } e.addTab("OPTIONS", i), this.hasUI = !0
                    }
                    makeGetter(e) {
                        return () => i.hasOwnProperty(e) ? void 0 !== this.ephemerals[e] ? this.ephemerals[e] : void 0 !== localStorage[e] ? localStorage[e] : i[e] : (console.log("WARNING: Attempted to fetch invalid setting:", e), null)
                    }
                    makeSetter(e) {
                        return t => {
                            if (this.isEphemeral(e)) this.ephemerals[e] = t;
                            else {
                                let i = s[e];
                                if (!i || -1 == i.options.indexOf(t)) return console.log(t, "is not a valid value for", e), !1;
                                try {
                                    this.settingCheckboxes[e + "-" + t].checked = !0
                                } catch (e) {}
                                localStorage[e] = t, this.ephemerals[e] = void 0
                            }
                            return this.updateConditionals(), this.callEventListeners("updated"), !0
                        }
                    }
                    isEphemeral(e) {
                        return void 0 === s[e]
                    }
                    updateConditionals() {
                        for (let e = 0; e < this.textCallbacks.length; e++) {
                            let t = this.textCallbacks[e];
                            t.element.textContent = t.func()
                        }
                        for (let e = 0; e < this.visCallbacks.length; e++) {
                            let t = this.visCallbacks[e];
                            t.element.style.visibility = t.func() ? "visible" : "hidden"
                        }
                    }
                    callEventListeners(e) {
                        let t = Array.prototype.slice.call(arguments, 1);
                        this.eventListeners[e].forEach((function(e) {
                            e.apply(null, t)
                        }))
                    }
                    addEventListener(e, t) {
                        if (e = e.toLowerCase(), void 0 === this.eventListeners[e]) throw Error("Unknown event: " + e);
                        this.eventListeners[e].push(t)
                    }
                    removeEventListener(e, t) {
                        if (e = e.toLowerCase(), void 0 === this.eventListeners[e]) throw Error("Unknown event: " + e);
                        this.eventListeners[e] = this.eventListeners[e].filter((function(e) {
                            return e !== t
                        }))
                    }
                }
            }(window, document), i(744),
            function(e, t) {
                class i {
                    constructor(e, i) {
                        e && (this.root = t.createElement("div"), this.root.className = i || this.constructor.name, e.appendChild(this.root), this.root.style.visibility = "hidden", this.core = null, this.imageName = null, this.imageLink = null, this.songName = null, this.songLink = null, this.hueName = null, this.imagePrev = null, this.imageNext = null, this.songPrev = null, this.songNext = null, this.beatCount = null, this.timer = null, this.xBlur = null, this.yBlur = null, this.settingsToggle = null, this.hideToggle = null, this.callbacks = [], this.listContainer = null, this.visualiserContainer = null, this.hidden = !1, this.initUI())
                    }
                    addCoreCallback(e, t) {
                        this.callbacks.push({
                            name: e,
                            func: t
                        })
                    }
                    initUI() {
                        let e = t.createElement("div");
                        this.imageName = e, this.imageLink = t.createElement("a"), this.imageLink.target = "_blank", this.imageName.appendChild(this.imageLink);
                        let i = t.createElement("div");
                        this.songName = i, this.songLink = t.createElement("a"), this.songLink.target = "_blank", this.songName.appendChild(this.songLink);
                        let n = t.createElement("div");
                        this.hueName = n;
                        let s = t.createElement("div");
                        s.textContent = "<", s.onclick = () => {
                            this.core.previousImage()
                        }, this.imagePrev = s;
                        let a = t.createElement("div");
                        a.textContent = ">", a.onclick = () => {
                            this.core.nextImage()
                        }, this.imageNext = a;
                        let r = t.createElement("div");
                        r.textContent = "<", this.songPrev = r, r.onclick = () => {
                            this.core.previousSong()
                        };
                        let o = t.createElement("div");
                        o.textContent = ">", o.onclick = () => {
                            this.core.nextSong()
                        }, this.songNext = o;
                        let l = t.createElement("div");
                        l.textContent = "SONGS", l.onclick = () => {
                            this.core.toggleSongList()
                        }, this.songList = l;
                        let h = t.createElement("div");
                        h.textContent = "IMAGES", h.onclick = () => {
                            this.core.toggleImageList()
                        }, this.imageList = h, this.timer = t.createElement("div"), this.timer.textContent = "T=$0x00000", this.beatCount = t.createElement("div"), this.beatCount.textContent = "B=$0x0000", this.xBlur = t.createElement("div"), this.xBlur.textContent = "X=$0x00", this.yBlur = t.createElement("div"), this.yBlur.textContent = "Y=$0x00", this.settingsToggle = t.createElement("div"), this.settingsToggle.innerHTML = "&#xe900;", this.settingsToggle.className = "hues-icon", this.settingsToggle.onclick = () => {
                            this.core.window.toggle()
                        }, this.hideToggle = t.createElement("div"), this.hideToggle.innerHTML = "&#x25BC;", this.hideToggle.onclick = () => {
                            this.toggleHide()
                        }, this.listContainer = t.createElement("div"), this.visualiserContainer = t.createElement("div"), this.addCoreCallback("newsong", this.newSong.bind(this)), this.addCoreCallback("newimage", this.newImage.bind(this)), this.addCoreCallback("newcolour", this.newColour.bind(this)), this.addCoreCallback("blurupdate", this.blurUpdated.bind(this)), this.addCoreCallback("time", this.updateTime.bind(this)), this.addCoreCallback("invert", this.invert.bind(this)), this.resizeHandler = this.resize.bind(this)
                    }
                    connectCore(t) {
                        this.core = t, this.root.style.visibility = "visible", t.resourceManager.hasUI && this.listContainer.appendChild(t.resourceManager.listView), this.visualiserContainer.appendChild(this.core.visualiser), this.callbacks.forEach((function(e) {
                            t.addEventListener(e.name, e.func)
                        })), e.addEventListener("resize", this.resizeHandler), this.resizeHandler()
                    }
                    disconnect() {
                        for (this.callbacks.forEach((e => {
                                this.core.removeEventListener(e.name, e.func)
                            })), this.core = null, this.root.style.visibility = "hidden"; this.listContainer.firstElementChild;) this.listContainer.removeChild(this.listContainer.firstElementChild);
                        for (; this.visualiserContainer.firstElementChild;) this.visualiserContainer.removeChild(this.visualiserContainer.firstElementChild);
                        e.removeEventListener("resize", this.resizeHandler)
                    }
                    show() {
                        this.root.style.visibility = "visible"
                    }
                    hide() {
                        this.root.style.visibility = "hidden"
                    }
                    toggleHide() {
                        this.hidden = !this.hidden, this.hidden ? this.root.classList.add("hues-ui--hidden") : this.root.classList.remove("hues-ui--hidden")
                    }
                    resize() {}
                    updateVolume(e) {}
                    newSong(e) {
                        e && (this.songLink.textContent = e.title.toUpperCase(), this.songLink.href = e.source)
                    }
                    newImage(e) {
                        if (!e) return;
                        let t = e.fullname ? e.fullname : e.name;
                        this.imageLink.textContent = t.toUpperCase(), this.imageLink.href = e.source ? e.source : ""
                    }
                    newColour(e) {
                        this.hueName.textContent = e.n.toUpperCase()
                    }
                    blurUpdated(e, t) {
                        e = Math.floor(255 * e), t = Math.floor(255 * t), this.xBlur.textContent = "X=" + this.intToHex(e, 2), this.yBlur.textContent = "Y=" + this.intToHex(t, 2)
                    }
                    updateTime(e) {
                        e = Math.floor(1e3 * e), this.timer.textContent = "T=" + this.intToHex(e, 5)
                    }
                    intToHex(e, t) {
                        let i = Math.abs(e).toString(16);
                        for (; i.length < t;) i = "0" + i;
                        return (e < 0 ? "-" : "$") + "0x" + i
                    }
                    invert(e) {
                        e ? this.root.classList.add("inverted") : this.root.classList.remove("inverted")
                    }
                }
                class n extends i {
                    constructor(e, t) {
                        super(e, t || "RetroUI")
                    }
                    initUI() {
                        super.initUI();
                        let e = t.createElement("div");
                        e.className = "hues-r-container", this.root.appendChild(e), this.container = e, this.mode = t.createElement("div"), e.appendChild(this.mode), e.appendChild(this.imageName), e.appendChild(this.timer), e.appendChild(this.beatCount), e.appendChild(this.xBlur), e.appendChild(this.yBlur), this.colourIndex = t.createElement("div"), this.colourIndex.textContent = "C=$0x00", e.appendChild(this.colourIndex), this.version = t.createElement("div"), e.appendChild(this.version), e.appendChild(this.hueName), e.appendChild(this.songName), this.beatBar = t.createElement("div"), e.appendChild(this.beatBar), this.controls = t.createElement("div"), this.controls.className = "hues-r-controls";
                        let i = t.createElement("div");
                        this.imageModeManual = t.createElement("div"), this.imageModeManual.textContent = "NORMAL", this.imageModeManual.onclick = () => {
                            this.core.setIsFullAuto(!1)
                        }, this.imageModeManual.className = "hues-r-manualmode hues-r-button", this.imageModeAuto = t.createElement("div"), this.imageModeAuto.textContent = "FULL AUTO", this.imageModeAuto.onclick = () => {
                            this.core.setIsFullAuto(!0)
                        }, this.imageModeAuto.className = "hues-r-automode hues-r-button", i.appendChild(this.imageModeManual), i.appendChild(this.imageModeAuto), this.imagePrev.className = "hues-r-button", this.imageNext.className = "hues-r-button", this.songPrev.className = "hues-r-button", this.songNext.className = "hues-r-button", this.controls.appendChild(this.imagePrev), this.controls.appendChild(i), this.controls.appendChild(this.imageNext), this.songList.className = "hues-r-songs hues-r-button", this.controls.appendChild(this.songPrev), this.controls.appendChild(this.songList), this.controls.appendChild(this.songNext), this.root.appendChild(this.controls);
                        let n = t.createElement("div");
                        n.className = "hues-r-subcontrols", n.appendChild(this.settingsToggle), this.imageList.textContent = "C", n.appendChild(this.imageList), n.appendChild(this.hideToggle), this.subControls = n, this.root.appendChild(n), this.hideRestore = t.createElement("div"), this.hideRestore.className = "hues-r-hiderestore", this.hideRestore.innerHTML = "&#x25B2;", this.hideRestore.onclick = () => {
                            this.toggleHide()
                        }, this.root.appendChild(this.hideRestore), this.listContainer.className = "hues-r-listcontainer", this.root.appendChild(this.listContainer), this.visualiserContainer.className = "hues-r-visualisercontainer", this.root.appendChild(this.visualiserContainer), this.addCoreCallback("beat", this.beat.bind(this)), this.addCoreCallback("newmode", this.newMode.bind(this))
                    }
                    toggleHide() {
                        this.hidden = !this.hidden, this.hidden ? (this.subControls.classList.add("hues-ui--hidden"), this.controls.classList.add("hues-ui--hidden"), this.container.classList.add("hues-ui--hidden"), this.hideRestore.classList.add("hues-ui--hidden")) : (this.subControls.classList.remove("hues-ui--hidden"), this.controls.classList.remove("hues-ui--hidden"), this.container.classList.remove("hues-ui--hidden"), this.hideRestore.classList.remove("hues-ui--hidden"))
                    }
                    connectCore(e) {
                        super.connectCore(e), this.version.textContent = "V=$" + e.versionHex
                    }
                    newMode(e) {
                        this.mode.textContent = "M=" + (e ? "FULL AUTO" : "NORMAL")
                    }
                    newImage(e) {
                        e && (this.imageLink.textContent = "I=" + e.name.toUpperCase(), this.imageLink.href = e.source)
                    }
                    newColour(e) {
                        super.newColour(e), this.colourIndex.textContent = "C=" + this.intToHex(this.core.colourIndex, 2)
                    }
                    beat(e, t) {
                        let i = e.slice(1);
                        this.beatBar.textContent = ">>" + i, this.beatCount.textContent = "B=" + this.intToHex(t, 4)
                    }
                    resize() {
                        this.core.visualiser.width = this.visualiserContainer.offsetWidth, this.core.resizeVisualiser()
                    }
                }
                class s extends i {
                    constructor(e, t) {
                        super(e, t || "ModernUI"), this.textSize_normal = 0, this.textSize_small = 0, this.songLink_size = 0, this.imageLink_size = 0, this.currentBeat = ".", this.hidden = 0
                    }
                    initUI() {
                        super.initUI(), this.imageName.className = "hues-m-imagename", this.songName.className = "hues-m-songtitle";
                        let e = t.createElement("div");
                        e.className = "hues-m-controls", this.root.appendChild(e), this.controls = e, e.appendChild(this.imageName), e.appendChild(this.songName);
                        let i = t.createElement("div");
                        i.className = "hues-m-leftbox", e.appendChild(i), this.leftBox = i, this.hueName.className = "hues-m-huename", i.appendChild(this.hueName);
                        let n = t.createElement("div");
                        n.className = "hues-m-vol-cluster", i.appendChild(n), this.settingsToggle.className += " hues-m-cog", n.appendChild(this.settingsToggle), this.hideToggle.className = "hues-m-hide", n.appendChild(this.hideToggle);
                        let s = t.createElement("div");
                        s.className = "hues-m-vol-bar", this.volBar = s, n.appendChild(s);
                        let a = t.createElement("div");
                        a.textContent = "VOL", a.className = "hues-m-vol-label", a.onclick = () => {
                            this.core.soundManager.toggleMute()
                        }, s.appendChild(a), this.volLabel = a, this.infoToggle = t.createElement("div"), this.infoToggle.innerHTML = "?", this.infoToggle.className = "hues-m-question", this.infoToggle.onclick = () => {
                            this.core.window.selectTab("INFO")
                        }, n.appendChild(this.infoToggle);
                        let r = t.createElement("input");
                        r.type = "range", r.min = 0, r.max = 1, r.step = .1, s.appendChild(r), this.volInput = r, r.oninput = () => {
                            this.core.soundManager.setVolume(parseFloat(r.value))
                        };
                        let o = t.createElement("div");
                        o.className = "hues-m-rightbox", e.appendChild(o), this.rightBox = o;
                        let l = t.createElement("div");
                        l.className = "hues-m-controlblock", this.songBlock = l, this.songList.className = "hues-m-songbutton";
                        let h = t.createElement("div");
                        h.className = "hues-m-controlbuttons", this.songPrev.className = "hues-m-prevbutton", this.songNext.className = "hues-m-nextbutton", this.songShuffle = t.createElement("div"), this.songShuffle.innerHTML = "&#xe903;", this.songShuffle.className = "hues-m-actbutton hues-icon", this.songShuffle.onclick = () => {
                            this.core.randomSong()
                        }, l.appendChild(this.songList), h.appendChild(this.songPrev), h.appendChild(this.songShuffle), h.appendChild(this.songNext), l.appendChild(h), o.appendChild(l);
                        let d = t.createElement("div");
                        d.className = "hues-m-controlblock", this.imageList.className = "hues-m-songbutton", this.imageBlock = d;
                        let c = t.createElement("div");
                        c.className = "hues-m-controlbuttons", this.imageMode = t.createElement("div"), this.imageMode.innerHTML = "&#xe901;", this.imageMode.className = "hues-m-actbutton hues-icon", this.imageMode.onclick = () => {
                            this.core.toggleFullAuto()
                        }, this.imagePrev.className = "hues-m-prevbutton", this.imageNext.className = "hues-m-nextbutton", d.appendChild(this.imageList), c.appendChild(this.imagePrev), c.appendChild(this.imageMode), c.appendChild(this.imageNext), d.appendChild(c), o.appendChild(d);
                        let u = t.createElement("div");
                        u.className = "hues-m-leftinfo";
                        let p = t.createElement("div");
                        p.className = "hues-m-rightinfo", u.appendChild(this.xBlur), u.appendChild(this.yBlur), p.appendChild(this.timer), p.appendChild(this.beatCount), this.rightInfo = p, this.leftInfo = u, e.appendChild(u), e.appendChild(p), this.visualiserContainer.className = "hues-m-visualisercontainer", e.appendChild(this.visualiserContainer);
                        let m = t.createElement("div");
                        m.className = "hues-m-beatbar", this.root.appendChild(m), this.beatBar = m;
                        let g = t.createElement("div");
                        g.className = "hues-m-beatleft", m.appendChild(g), this.beatLeft = g;
                        let f = t.createElement("div");
                        f.className = "hues-m-beatright", m.appendChild(f), this.beatRight = f;
                        let b = t.createElement("div");
                        b.className = "hues-m-beatcenter", this.root.appendChild(b), this.beatCenter = b, this.hideRestore = t.createElement("div"), this.hideRestore.className = "hues-m-hiderestore", this.hideRestore.onclick = () => {
                            this.toggleHide()
                        }, this.root.appendChild(this.hideRestore), this.listContainer.className = "hues-m-listcontainer", this.root.appendChild(this.listContainer), this.addCoreCallback("beat", this.beat.bind(this)), this.addCoreCallback("newmode", this.newMode.bind(this))
                    }
                    toggleHide() {
                        switch (this.beatBar.classList.remove("hues-ui--hidden"), this.beatCenter.classList.remove("hues-ui--hidden"), this.controls.classList.remove("hues-ui--hidden"), this.hideRestore.classList.remove("hues-ui--hidden"), this.hidden) {
                            case 1:
                                this.beatBar.classList.add("hues-ui--hidden"), this.beatCenter.classList.add("hues-ui--hidden");
                            case 0:
                                this.controls.classList.add("hues-ui--hidden"), this.hideRestore.classList.add("hues-ui--hidden")
                        }
                        this.hidden = (this.hidden + 1) % 3
                    }
                    updateVolume(e) {
                        this.volInput.value = e, this.volLabel.textContent = 0 === e ? "(VOL)" : "VOL"
                    }
                    newMode(e) {
                        this.imageMode.innerHTML = e ? "&#xe902;" : "&#xe901;"
                    }
                    beat(e, t) {
                        this.currentBeat = e[0];
                        let i = e.slice(1);
                        if (this.beatLeft.textContent = i, this.beatRight.textContent = i, "." != this.currentBeat) {
                            for (; this.beatCenter.firstElementChild;) this.beatCenter.removeChild(this.beatCenter.firstElementChild);
                            let e = this.beatCenter.ownerDocument.createElement("span");
                            e.textContent = this.currentBeat, this.beatCenter.appendChild(e)
                        }
                        this.beatCount.textContent = "B=" + this.intToHex(t, 4)
                    }
                    textWidth(e) {
                        let t = this.songLink,
                            i = t.innerHTML,
                            n = "";
                        for (let e = 0; e < 100; e++) n += "&nbsp;";
                        t.innerHTML = n, t.className = e;
                        let s = t.offsetWidth / 100;
                        return t.innerHTML = i, s
                    }
                    resize() {
                        this.textSize_normal = this.textWidth(""), this.textSize_small = this.textWidth("small"), this.songLink_size = this.songName.clientWidth, this.imageLink_size = this.imageName.clientWidth, this.resizeSong(), this.resizeImage(), this.core.visualiser.width = this.controls.offsetWidth, this.core.resizeVisualiser()
                    }
                    resizeElement(e, t) {
                        let i = e.textContent.length;
                        i * this.textSize_normal < t ? e.className = "" : i * this.textSize_small < t ? e.className = "small" : e.className = "x-small"
                    }
                    resizeSong() {
                        this.resizeElement(this.songLink, this.songLink_size)
                    }
                    resizeImage() {
                        this.resizeElement(this.imageLink, this.imageLink_size)
                    }
                    newSong(e) {
                        super.newSong(e), e && this.resizeSong()
                    }
                    newImage(e) {
                        super.newImage(e), e && this.resizeImage()
                    }
                }
                let a = [{
                        angle: 122.529582194,
                        x: 19.4,
                        y: -19.35
                    }, {
                        angle: 92.5309436511,
                        x: 25.4,
                        y: 38.7
                    }, {
                        angle: 107.530202659,
                        x: 39.4,
                        y: 107.75
                    }, {
                        angle: 77.5309700777,
                        x: 20.75,
                        y: 184.8
                    }, {
                        angle: 77.5309700777,
                        x: 32.3,
                        y: 249.8
                    }, {
                        angle: 107.530202659,
                        x: 40.45,
                        y: 327.9
                    }, {
                        angle: 88.3307935055,
                        x: 35,
                        y: 410.9
                    }, {
                        angle: 107.530202659,
                        x: 54.35,
                        y: 490.95
                    }, {
                        angle: 74.9981580491,
                        x: 28.15,
                        y: 573.8
                    }, {
                        angle: 89.9973772074,
                        x: 23.45,
                        y: 675.35
                    }, {
                        angle: 107.530202659,
                        x: 21.65,
                        y: 762.6
                    }, {
                        angle: 107.530202659,
                        x: 15.8,
                        y: 842.75
                    }, {
                        angle: 92.5309436511,
                        x: 36.55,
                        y: 905.7
                    }, {
                        angle: 88.3307935055,
                        x: 31.1,
                        y: 988.7
                    }, {
                        angle: 107.530202659,
                        x: 50.45,
                        y: 1068.75
                    }, {
                        angle: 74.9981580491,
                        x: 45.75,
                        y: 1158.5
                    }, {
                        angle: 88.3307935055,
                        x: 35.85,
                        y: 1238.55
                    }],
                    r = [{
                        angle: 120.001009518,
                        x: 33.3,
                        y: -29.75
                    }, {
                        angle: 90.0026227926,
                        x: 35.35,
                        y: 53.65
                    }, {
                        angle: 102.469029922,
                        x: 41.5,
                        y: 136.5
                    }, {
                        angle: 91.6692064945,
                        x: 22.15,
                        y: 216.55
                    }, {
                        angle: 72.4697973408,
                        x: 34.4,
                        y: 278.25
                    }, {
                        angle: 102.469029922,
                        x: 45.75,
                        y: 361.85
                    }, {
                        angle: 87.4699314665,
                        x: 26.65,
                        y: 426.35
                    }, {
                        angle: 72.4697973408,
                        x: 41.6,
                        y: 502.15
                    }, {
                        angle: 102.469029922,
                        x: 27.5,
                        y: 566
                    }, {
                        angle: 72.4697973408,
                        x: 7.65,
                        y: 638.45
                    }, {
                        angle: 102.469029922,
                        x: 11,
                        y: 721.25
                    }, {
                        angle: 76.1887724128,
                        x: 7.65,
                        y: 792.7
                    }, {
                        angle: 87.4690563489,
                        x: 36.15,
                        y: 850.35
                    }, {
                        angle: 102.46813454,
                        x: 16.6,
                        y: 924.3
                    }, {
                        angle: 72.4697973408,
                        x: 15.3,
                        y: 990.8
                    }, {
                        angle: 76.1887724128,
                        x: 11.95,
                        y: 1062.25
                    }, {
                        angle: 87.4690563489,
                        x: 40.45,
                        y: 1119.9
                    }, {
                        angle: 102.46813454,
                        x: 20.9,
                        y: 1193.85
                    }],
                    o = [{
                        angle: 32.5804579323,
                        x: 110.35,
                        y: -12.1
                    }, {
                        angle: 3.28979777069,
                        x: 168.05,
                        y: -5.55
                    }, {
                        angle: 17.6989154099,
                        x: 238.35,
                        y: 7.7
                    }, {
                        angle: -12.6587029361,
                        x: 314.8,
                        y: -10.4
                    }, {
                        angle: -12.6587029361,
                        x: 379.4,
                        y: 1.05
                    }, {
                        angle: 17.6989154099,
                        x: 457.75,
                        y: 9.4
                    }, {
                        angle: 2.59102780115,
                        x: 540.6,
                        y: 3.75
                    }, {
                        angle: 17.6989154099,
                        x: 620.35,
                        y: 22.7
                    }, {
                        angle: -15.134241831,
                        x: 703,
                        y: -2.9
                    }, {
                        angle: 2.30443717424,
                        x: 804.75,
                        y: -7.85
                    }, {
                        angle: 17.6989154099,
                        x: 892.45,
                        y: -9.55
                    }, {
                        angle: 17.6989154099,
                        x: 971.65,
                        y: -15.5
                    }, {
                        angle: 3.28979777069,
                        x: 1035.2,
                        y: 4.35
                    }, {
                        angle: 2.59102780115,
                        x: 1118,
                        y: .2
                    }, {
                        angle: 17.6989154099,
                        x: 1198.05,
                        y: 18.95
                    }, {
                        angle: -18.378894807,
                        x: 1288.2,
                        y: 14.2
                    }, {
                        angle: -4.561224264,
                        x: 1367.9,
                        y: 4.6
                    }, {
                        angle: 32.5804579323,
                        x: 1452.6,
                        y: -1.7
                    }, {
                        angle: 3.28979777069,
                        x: 1511.45,
                        y: 4.45
                    }, {
                        angle: 17.6989154099,
                        x: 1580.6,
                        y: 17.6
                    }, {
                        angle: -12.6587029361,
                        x: 1656.6,
                        y: -.95
                    }, {
                        angle: -12.6587029361,
                        x: 1722.1,
                        y: 11.1
                    }, {
                        angle: 17.6989154099,
                        x: 1800.5,
                        y: 18.8
                    }, {
                        angle: 2.59102780115,
                        x: 1883.1,
                        y: 13
                    }, {
                        angle: 17.6989154099,
                        x: 1963,
                        y: 32.6
                    }, {
                        angle: -15.134241831,
                        x: 2045.8,
                        y: 7
                    }, {
                        angle: 2.30443717424,
                        x: 2147.55,
                        y: 1.55
                    }, {
                        angle: 17.6989154099,
                        x: 2234.1,
                        y: .4
                    }, {
                        angle: 17.6989154099,
                        x: 2315,
                        y: -5.6
                    }, {
                        angle: 3.28979777069,
                        x: 2377.8,
                        y: 14.5
                    }, {
                        angle: 2.59102780115,
                        x: 2460.65,
                        y: 9.75
                    }, {
                        angle: 17.6989154099,
                        x: 2540.2,
                        y: 28.5
                    }, {
                        angle: -18.378894807,
                        x: 2627.55,
                        y: 24.9
                    }, {
                        angle: -4.561224264,
                        x: 2710.4,
                        y: 14.4
                    }];
                e.RetroUI = n, e.WeedUI = class extends n {
                    constructor(e, t) {
                        super(e, t || "WeedUI"), this.xVariance = 10, this.yVariance = 20
                    }
                    initUI() {
                        super.initUI(), this.container.removeChild(this.beatBar), this.controls.className = "hues-w-controls", this.subControls.className = "hues-w-subcontrols";
                        let e = t.createElement("div");
                        e.className = "hues-w-beatbar", this.root.appendChild(e), this.beatBar = e;
                        let i = t.createElement("div");
                        i.className = "hues-w-beatleft", e.appendChild(i), this.beatLeft = i;
                        let n = t.createElement("div");
                        n.className = "hues-w-beatright", e.appendChild(n), this.beatRight = n, this.imageModeManual.textContent = "ONE", this.imageModeAuto.textContent = "MANY", this.visualiserContainer.className += " hues-w-visualisercontainer"
                    }
                    toggleHide() {
                        super.toggleHide(this), this.hidden ? this.beatBar.classList.add("hues-ui--hidden") : this.beatBar.classList.remove("hues-ui--hidden")
                    }
                    beat(i, n) {
                        let s = i.slice(1);
                        if (this.beatLeft.textContent = s, this.beatRight.textContent = s, this.beatCount.textContent = "B=" + this.intToHex(n, 4), -1 != ["x", "o", "X", "O"].indexOf(i[0])) {
                            let n = t.createElement("div");
                            n.className = "hues-w-beataccent";
                            let s = "rotate(" + this.round10(15 - 30 * Math.random()) + "deg) translate(" + this.round10(-this.xVariance / 2 + Math.random() * this.xVariance) + "px, " + this.round10(30 - this.yVariance / 2 + Math.random() * this.yVariance) + "px)";
                            n.style.MozTransform = s, n.style.webkitTransform = s, n.style.transform = s, n.textContent = i[0].toUpperCase(), this.root.appendChild(n), e.setTimeout(this.removeBeat.bind(this, n), 1500)
                        }
                    }
                    round10(e) {
                        return Math.round(10 * e) / 10
                    }
                    removeBeat(e) {
                        this.root.removeChild(e)
                    }
                }, e.ModernUI = s, e.XmasUI = class extends s {
                    constructor(e, i) {
                        super(e, i || "XmasUI"), this.initSnow(), this.invert(!0), this.controls.className += " hues-x-controls", this.beatBar.className += " hues-x-beatbar", this.lights = [];
                        let n = t.createElement("div");
                        n.className = "hues-x-wires";
                        let s = t.createElement("div");
                        s.className = "hues-x-wiresleft", a.forEach((function(e, t, i) {
                            let n = this.newLight(e, s);
                            n.style.transform = "rotate(" + e.angle + "deg)", n.style.left = e.x + "px", n.style.top = e.y + "px", this.lights.push(n)
                        }), this);
                        let l = t.createElement("div");
                        l.className = "hues-x-wiresright", r.forEach((function(e, t, i) {
                            let n = this.newLight(e, l);
                            n.style.transform = "rotate(" + -e.angle + "deg)", n.style.right = e.x + "px", n.style.top = e.y + "px", this.lights.push(n)
                        }), this);
                        let h = t.createElement("div");
                        h.className = "hues-x-wiresbottomhelper";
                        let d = t.createElement("div");
                        d.className = "hues-x-wiresbottom", o.forEach((function(e, t, i) {
                            let n = this.newLight(e, d);
                            n.style.transform = "rotate(" + e.angle + "deg)", n.style.left = e.x + "px", n.style.bottom = e.y + "px", this.lights.push(n)
                        }), this), n.appendChild(s), n.appendChild(l), h.appendChild(d), n.appendChild(h), this.root.appendChild(n), this.visualiserContainer.className = "hues-x-visualisercontainer", this.controls.removeChild(this.visualiserContainer), this.beatBar.appendChild(this.visualiserContainer)
                    }
                    invert(e) {
                        super.invert(e), this.snowContext.fillStyle = e ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"
                    }
                    connectCore(e) {
                        super.connectCore(e), this.startSnow()
                    }
                    disconnect() {
                        this.stopSnow(), super.disconnect()
                    }
                    lightOn(e) {
                        e.on.className = "hues-x-lighton", e.off.className = "hues-x-lightoff"
                    }
                    lightOff(e) {
                        e.on.className = "hues-x-lighton off", e.off.className = "hues-x-lightoff off"
                    }
                    lightFadeOut(e) {
                        e.on.className = "hues-x-lighton hues-x-fade off", e.off.className = "hues-x-lightoff hues-x-fade off"
                    }
                    lightRecolour(e) {
                        let t = -56 * Math.floor(7 * Math.random());
                        e.on.style.backgroundPosition = t + "px 0", e.off.style.backgroundPosition = t + "px 0"
                    }
                    randomLight(e) {
                        Math.random() >= .5 ? this.lightOn(e) : this.lightOff(e)
                    }
                    newLight(e, i) {
                        let n = t.createElement("div");
                        n.className = "hues-x-light";
                        let s = t.createElement("div"),
                            a = t.createElement("div"),
                            r = t.createElement("div");
                        return s.appendChild(a), s.appendChild(r), n.appendChild(s), i.appendChild(n), n.on = a, n.off = r, n.bulb = s, this.randomLight(n), this.lightRecolour(n), n
                    }
                    beat(e, t) {
                        super.beat(e, t), "." != this.currentBeat && this.lights.forEach((function(e, t, i) {
                            switch (this.currentBeat) {
                                case ":":
                                    this.lightOn(e), this.lightRecolour(e);
                                    break;
                                case "+":
                                    this.lightFadeOut(e);
                                    break;
                                default:
                                    this.randomLight(e)
                            }
                        }), this)
                    }
                    initSnow() {
                        this.snowCanvas = t.createElement("canvas"), this.snowContext = this.snowCanvas.getContext("2d"), this.snowCanvas.width = 1280, this.snowCanvas.height = 720, this.snowCanvas.style.display = "none", this.snowCanvas.className = "hues-canvas hues-x-snow", this.root.appendChild(this.snowCanvas), this.snowing = !1, this.maxSnow = 30, this.snowAngle = 0, this.lastSnow = 0, this.snowflakes = [], this.addCoreCallback("frame", this.drawSnow.bind(this))
                    }
                    startSnow() {
                        this.snowing = !0, this.snowCanvas.style.display = "block";
                        let e = this.snowCanvas.height,
                            t = this.snowCanvas.width;
                        this.snowAngle = 0, this.snowflakes = [];
                        for (let i = 0; i < this.maxSnow; i++) this.snowflakes.push({
                            x: Math.random() * t,
                            y: Math.random() * e,
                            r: 4 * Math.random() + 1,
                            d: 25 * Math.random()
                        });
                        this.lastSnow = Date.now() / 1e3
                    }
                    stopSnow() {
                        this.snowing = !1, this.snowCanvas.style.display = "none"
                    }
                    drawSnow() {
                        let e = this.snowCanvas.width,
                            t = this.snowCanvas.height,
                            i = Date.now() / 1e3,
                            n = this.lastSnow - i;
                        this.lastSnow = i, this.snowContext.clearRect(0, 0, e, t), this.snowContext.beginPath();
                        for (let e = 0; e < this.maxSnow; e++) {
                            let t = this.snowflakes[e];
                            this.snowContext.moveTo(t.x, t.y), this.snowContext.arc(t.x, t.y, t.r, 0, 2 * Math.PI, !0)
                        }
                        this.snowContext.fill(), this.snowAngle += n / 6;
                        for (let i = 0; i < this.maxSnow; i++) {
                            let n = this.snowflakes[i];
                            n.y += Math.cos(this.snowAngle + n.d) + 1 + n.r / 2, n.x += 2 * Math.sin(this.snowAngle), (n.x > e + 5 || n.x < -5 || n.y > t) && (i % 3 > 0 ? this.snowflakes[i] = {
                                x: Math.random() * e,
                                y: -10,
                                r: n.r,
                                d: n.d
                            } : Math.sin(this.snowAngle) > 0 ? this.snowflakes[i] = {
                                x: -5,
                                y: Math.random() * t,
                                r: n.r,
                                d: n.d
                            } : this.snowflakes[i] = {
                                x: e + 5,
                                y: Math.random() * t,
                                r: n.r,
                                d: n.d
                            })
                        }
                    }
                    resize() {
                        super.resize();
                        let t = e.innerWidth / e.innerHeight,
                            i = this.snowContext.fillStyle;
                        this.snowCanvas.width = Math.ceil(720 * t), this.snowContext.fillStyle = i
                    }
                }, e.HalloweenUI = class extends s {
                    constructor(e, t) {
                        super(e, t || "HalloweenUI"), this.invert(!0)
                    }
                    initUI() {
                        super.initUI(), this.controls.className += " hues-h-controls", this.beatBar.className += " hues-h-beatbar", this.leftBox.className += " hues-h-leftbox", this.rightBox.className += " hues-h-rightbox", this.volBar.className += " hues-h-vol-bar", this.beatLeft.className += " hues-h-text", this.beatRight.className += " hues-h-text", this.beatCenter.className += " hues-h-text", this.songShuffle.className += " hues-h-text", this.songNext.className += " hues-h-text", this.songPrev.className += " hues-h-text", this.songList.className += " hues-h-text", this.songName.className += " hues-h-text", this.imageMode.className += " hues-h-text", this.imageNext.className += " hues-h-text", this.imagePrev.className += " hues-h-text", this.imageList.className += " hues-h-text", this.imageName.className += " hues-h-text", this.hueName.className += " hues-h-text", this.settingsToggle.className += " hues-h-text", this.hideToggle.className += " hues-h-text", this.infoToggle.className += " hues-h-text", this.volLabel.className += " hues-h-text", this.timer.className = "hues-h-textfade", this.beatCount.className = "hues-h-textfade", this.xBlur.className = "hues-h-textfade", this.yBlur.className = "hues-h-textfade";
                        let e = t.createElement("div");
                        e.className = "hues-h-tombstone", this.leftBox.appendChild(e);
                        let i = t.createElement("div");
                        i.className = "hues-h-tombstone", this.songBlock.insertBefore(i, this.songBlock.firstChild);
                        let n = t.createElement("div");
                        n.className = "hues-h-tombstone", this.imageBlock.insertBefore(n, this.imageBlock.firstChild);
                        let s = t.createElement("div");
                        s.className = "hues-h-topleft";
                        let a = t.createElement("div");
                        a.className = "hues-h-topright";
                        let r = t.createElement("div");
                        r.className = "hues-h-bottomright", this.root.appendChild(s), this.root.appendChild(a), this.root.appendChild(r);
                        let o = t.createElement("div");
                        o.className = "hues-h-left-hand", this.beatBar.appendChild(o);
                        let l = t.createElement("div");
                        l.className = "hues-h-right-hand", this.beatBar.appendChild(l), this.vignette = t.createElement("div"), this.vignette.className = "hues-h-vignette", this.root.appendChild(this.vignette)
                    }
                    beat(e, t) {
                        if (super.beat(e, t), "." != this.currentBeat) {
                            let e = this.beatCenter.ownerDocument.createElement("div");
                            e.className = "hues-m-beatcenter hues-h-eyes", this.beatCenter.appendChild(e)
                        }
                    }
                    connectCore(e) {
                        super.connectCore(e), this.core.preloader.classList.add("hues-h-text")
                    }
                    disconnect() {
                        this.core.preloader.classList.remove("hues-h-text"), super.disconnect()
                    }
                }, e.MinimalUI = class extends n {
                    constructor(e, t) {
                        super(e, t || "MinimalUI")
                    }
                    initUI() {
                        super.initUI(), this.root.removeChild(this.controls), this.root.removeChild(this.subControls), this.container.removeChild(this.beatBar), this.container.innerHTML = "", this.container.appendChild(this.beatBar)
                    }
                }
            }(window, document),
            function(e, t) {
                let i = 0;
                e.Resources = class {
                    constructor(e, t) {
                        this.core = e, this.hasUI = !1, this.resourcePacks = [], this.allSongs = [], this.allImages = [], this.enabledSongs = [], this.enabledImages = [], this.progressState = [], this.progressCallback = null, this.listView = null, this.enabledSongList = null, this.enabledImageList = null, this.packView = {
                            pack: null,
                            name: null,
                            creator: null,
                            size: null,
                            desc: null,
                            songCount: null,
                            imageCount: null,
                            songList: null,
                            imageList: null,
                            packButtons: null,
                            totalSongs: null,
                            totalImages: null
                        }, this.packsView = {
                            respackList: null,
                            remoteList: null,
                            loadRemote: null,
                            progressBar: null,
                            progressStatus: null,
                            progressCurrent: null,
                            progressTop: null,
                            progressPercent: null
                        }, this.currentTab = 0, this.unique = i++, this.remotes = null, this.fileInput = null, this.fileParseQueue = [], e.settings.enableWindow && (this.initUI())
                    }
                    getSizes(e) {
                        let t = [];
                        return e.forEach((e => {
                            let i = new Promise(((t, i) => {
                                let n = new XMLHttpRequest;
                                n.open("HEAD", e, !0), n.onreadystatechange = function() {
                                    if (this.readyState == this.DONE) {
                                        let e = parseInt(n.getResponseHeader("Content-Length"));
                                        t(e / 1024 / 1024)
                                    }
                                }, n.onerror = function() {
                                    i(Error(req.status + ": Could not fetch respack at " + e))
                                }, n.send()
                            })).catch((t => {
                                throw 1012 == t.code ? Error("Respack at URL " + e + " is restricted. Check CORS.") : t
                            }));
                            t.push(i)
                        })), Promise.all(t)
                    }
                    addAll(e, t) {
                        t && (this.progressCallback = t, this.progressState = Array.apply(null, Array(e.length)).map(Number.prototype.valueOf, 0));
                        let i = [],
                            n = function(e, t, i) {
                                this.progressState[e] = t, this.updateProgress(i)
                            };
                        for (let t = 0; t < e.length; t++) {
                            let s = new Respack;
                            i.push(s.loadFromURL(e[t], n.bind(this, t)))
                        }
                        return i.reduce(((e, t) => e.then((() => t)).then((e => {
                            this.addPack(e)
                        }))), Promise.resolve())
                    }
                    updateProgress(e) {
                        let t = 0;
                        for (let e = 0; e < this.progressState.length; e++) t += this.progressState[e];
                        t /= this.progressState.length, this.progressCallback(t, e)
                    }
                    addPack(e) {
                        console.log("Added", e.name, "to respacks");
                        let t = this.resourcePacks.length;
                        this.resourcePacks.push(e), this.addResourcesToArrays(e), this.rebuildEnabled(), this.updateTotals();
                        let i = this;
                        this.appendListItem("respacks", e.name, "res" + t, this.packsView.respackList, (function() {
                            e.enabled = this.checked, i.rebuildEnabled()
                        }), function(e) {
                            this.selectPack(e)
                        }.bind(this, t))
                    }
                    addResourcesToArrays(e) {
                        this.allImages = this.allImages.concat(e.images), this.allSongs = this.allSongs.concat(e.songs)
                    }
                    rebuildArrays() {
                        this.allSongs = [], this.allImages = [], this.allAnimations = [];
                        for (let e = 0; e < this.resourcePacks.length; e++) this.addResourcesToArrays(this.resourcePacks[e])
                    }
                    rebuildEnabled() {
                        this.enabledSongs = [], this.enabledImages = [];
                        for (let e = 0; e < this.resourcePacks.length; e++) {
                            let t = this.resourcePacks[e];
                            if (!0 === t.enabled) {
                                for (let e = 0; e < t.songs.length; e++) {
                                    let i = t.songs[e];
                                    i.enabled && -1 == this.enabledSongs.indexOf(i) && this.enabledSongs.push(i)
                                }
                                for (let e = 0; e < t.images.length; e++) {
                                    let i = t.images[e];
                                    i.enabled && -1 == this.enabledImages.indexOf(i) && this.enabledImages.push(i)
                                }
                            }
                        }
                        if (this.hasUI) {
                            let e = this.enabledSongList;
                            for (; e.firstElementChild;) e.removeChild(e.firstElementChild);
                            let t = this.enabledImageList;
                            for (; t.firstElementChild;) t.removeChild(t.firstElementChild);
                            for (let t = 0; t < this.enabledSongs.length; t++) {
                                let i = this.enabledSongs[t];
                                this.appendSimpleListItem(i.title, e, function(e) {
                                    this.core.setSong(e)
                                }.bind(this, t))
                            }
                            for (let e = 0; e < this.enabledImages.length; e++) {
                                let i = this.enabledImages[e];
                                this.appendSimpleListItem(i.name, t, function(e) {
                                    this.core.setImage(e), this.core.setIsFullAuto(!1)
                                }.bind(this, e))
                            }
                        }
                        this.updateTotals()
                    }
                    removePack(e) {
                        let t = this.resourcePacks.indexOf(e); - 1 != t && (this.resourcePacks.splice(t, 1), this.rebuildArrays(), this.rebuildEnabled())
                    }
                    removeAllPacks() {
                        this.resourcePacks = [], this.rebuildArrays(), this.rebuildEnabled()
                    }
                    getSongNames() {
                        let e = [];
                        for (let t = 0; t < this.allSongs.length; t++) e.push(this.allSongs[t]);
                        return e
                    }
                    loadLocal() {
                        console.log("Loading local zip(s)");
                        let e = this.fileInput.files,
                            t = Promise.resolve();
                        for (let i = 0; i < e.length; i++) {
                            let n = new Respack;
                            t = t.then((() => n.loadFromBlob(e[i], ((e, t) => {
                                this.localProgress(e, t)
                            })))).then((e => {
                                this.addPack(e), this.localComplete()
                            }))
                        }
                        return t.then((() => {
                            console.log("Local respack parsing complete")
                        }))
                    }
                    localProgress(e, t) {
                        this.hasUI && (this.packsView.progressStatus.textContent = "Processing...", this.packsView.progressBar.style.width = 100 * e + "%", this.packsView.progressCurrent.textContent = t.filesLoaded, this.packsView.progressTop.textContent = t.filesToLoad, this.packsView.progressPercent.textContent = Math.round(100 * e) + "%")
                    }
                    localComplete(t) {
                        let i = this.packsView.progressStatus;
                        i.textContent = "Complete", e.setTimeout((function() {
                            i.textContent = "Idle"
                        }), 2e3), this.packsView.progressBar.style.width = "100%", this.packsView.progressCurrent.textContent = "0b", this.packsView.progressTop.textContent = "0b", this.packsView.progressPercent.textContent = "0%"
                    }
                    initUI() {
                        this.root = t.createElement("div"), this.root.className = "respacks";
                        let e = t.createElement("div");
                        e.className = "respacks__manager";
                        let i = t.createElement("div");
                        i.textContent = "Current respacks", i.className = "respacks__header";
                        let n = t.createElement("div");
                        n.className = "resource-list", this.packsView.respackList = n;
                        let s = null,
                            a = null;
                        this.core.settings.disableRemoteResources || (s = t.createElement("div"), s.textContent = "Remote respacks", s.className = "respacks__header", a = t.createElement("div"), a.className = "resource-list resource-list--fill", n.classList.add("resource-list--fill"), this.appendSimpleListItem("Click to load the list", a, this.loadRemotes.bind(this)), this.packsView.remoteList = a);
                        let r = t.createElement("div");
                        r.className = "respacks-buttons";
                        let o = t.createElement("div");
                        o.className = "hues-button hidden", o.textContent = "LOAD REMOTE", o.onclick = this.loadCurrentRemote.bind(this);
                        let l = t.createElement("div");
                        l.className = "hues-button", l.textContent = "LOAD ZIPS", l.onclick = () => {
                            this.fileInput.click()
                        }, r.appendChild(l), r.appendChild(o), this.packsView.loadRemote = o, this.fileInput = t.createElement("input"), this.fileInput.type = "file", this.fileInput.accept = "application/zip", this.fileInput.multiple = !0, this.fileInput.onchange = this.loadLocal.bind(this);
                        let h = t.createElement("div");
                        h.className = "progress-container respacks-bottom-container";
                        let d = t.createElement("div");
                        d.className = "progress-bar";
                        let c = t.createElement("span");
                        c.className = "progress-bar--filled", d.appendChild(c);
                        let u = t.createElement("div");
                        u.textContent = "Idle";
                        let p = t.createElement("div");
                        p.className = "stat-text";
                        let m = t.createElement("div");
                        m.textContent = "0b";
                        let g = t.createElement("div");
                        g.textContent = "0b";
                        let f = t.createElement("div");
                        f.textContent = "0%", p.appendChild(m), p.appendChild(g), p.appendChild(f), this.packsView.progressBar = c, this.packsView.progressStatus = u, this.packsView.progressCurrent = m, this.packsView.progressTop = g, this.packsView.progressPercent = f, h.appendChild(u), h.appendChild(d), h.appendChild(p), e.appendChild(i), e.appendChild(n), this.core.settings.disableRemoteResources || (e.appendChild(s), e.appendChild(a)), e.appendChild(r), e.appendChild(h);
                        let b = t.createElement("div");
                        b.className = "respacks__display";
                        let x = t.createElement("div");
                        x.textContent = "<select a respack>", x.className = "respacks__header";
                        let w = t.createElement("div");
                        w.className = "stat-text";
                        let v = t.createElement("div"),
                            _ = t.createElement("a");
                        _.className = "unstyled-link", _.textContent = "<author>", v.appendChild(_), w.appendChild(v);
                        let y = t.createElement("div");
                        y.textContent = "0b", w.appendChild(y);
                        let k = t.createElement("div");
                        k.className = "respack-description", k.textContent = "<no description>";
                        let A = t.createElement("div");
                        A.className = "respack-tab-container";
                        let C = t.createElement("div");
                        C.textContent = "Songs:", C.className = "respack-tab respack-tab--checked";
                        let V = t.createElement("div");
                        V.textContent = "Images:", V.className = "respack-tab";
                        let S = t.createElement("div");
                        S.className = "resource-list respack-tab__content respack-tab__content--checked";
                        let E = t.createElement("div");
                        E.className = "resource-list respack-tab__content", C.onclick = () => {
                            C.classList.add("respack-tab--checked"), V.classList.remove("respack-tab--checked"), S.classList.add("respack-tab__content--checked"), E.classList.remove("respack-tab__content--checked"), this.currentTab = 0
                        }, V.onclick = () => {
                            V.classList.add("respack-tab--checked"), C.classList.remove("respack-tab--checked"), E.classList.add("respack-tab__content--checked"), S.classList.remove("respack-tab__content--checked"), this.currentTab = 1
                        };
                        let I = t.createElement("div");
                        I.className = "respacks-buttons respacks-buttons--fill invisible";
                        let B = t.createElement("div");
                        B.textContent = "ENABLE ALL", B.className = "hues-button", B.onclick = this.enableAll.bind(this);
                        let L = t.createElement("div");
                        L.textContent = "INVERT", L.className = "hues-button", L.onclick = this.invert.bind(this);
                        let U = t.createElement("div");
                        U.textContent = "DISABLE ALL", U.className = "hues-button", U.onclick = this.disableAll.bind(this), I.appendChild(B), I.appendChild(L), I.appendChild(U);
                        let M = t.createElement("div");
                        M.className = "respacks-bottom-container";
                        let z = t.createElement("div");
                        z.className = "respacks-count-container";
                        let T = t.createElement("span");
                        T.textContent = "Total Songs:";
                        let N = t.createElement("span");
                        N.className = "respacks-counts", z.appendChild(T), z.appendChild(N);
                        let R = t.createElement("div");
                        R.className = "respacks-count-container";
                        let F = t.createElement("span");
                        F.textContent = "Total images:";
                        let D = t.createElement("span");
                        D.className = "respacks-counts", R.appendChild(F), R.appendChild(D), M.appendChild(z), M.appendChild(R), this.packView.name = x, this.packView.creator = _, this.packView.size = y, this.packView.desc = k, this.packView.songCount = C, this.packView.imageCount = V, this.packView.songList = S, this.packView.imageList = E, this.packView.packButtons = I, this.packView.totalSongs = N, this.packView.totalImages = D, b.appendChild(x), b.appendChild(w), b.appendChild(k), A.appendChild(C), A.appendChild(V), b.appendChild(A), b.appendChild(S), b.appendChild(E), b.appendChild(I), b.appendChild(M), this.root.appendChild(e), this.root.appendChild(b), this.listView = t.createElement("div"), this.enabledSongList = t.createElement("div"), this.enabledSongList.className = "resource-list respacks-enabledsongs hidden", this.enabledImageList = t.createElement("div"), this.enabledImageList.className = "resource-list respacks-enabledimages hidden", this.listView.appendChild(this.enabledSongList), this.listView.appendChild(this.enabledImageList), this.hasUI = !0
                    }
                    hideLists() {
                        this.hasUI && (this.enabledSongList.classList.add("hidden"), this.enabledImageList.classList.add("hidden"))
                    }
                    toggleVisible(e, t) {
                        this.hasUI && (e.classList.contains("hidden") ? e.classList.remove("hidden") : e.classList.add("hidden"), t.classList.add("hidden"))
                    }
                    toggleSongList() {
                        this.toggleVisible(this.enabledSongList, this.enabledImageList)
                    }
                    toggleImageList() {
                        this.toggleVisible(this.enabledImageList, this.enabledSongList)
                    }
                    updateTotals() {
                        this.hasUI && (this.packView.totalSongs.textContent = this.enabledSongs.length + "/" + this.allSongs.length, this.packView.totalImages.textContent = this.enabledImages.length + "/" + this.allImages.length)
                    }
                    truncateNum(e) {
                        return Math.round(100 * e) / 100
                    }
                    selectPack(e) {
                        let t = this.resourcePacks[e];
                        this.packView.pack = t, this.packView.packButtons.classList.remove("invisible"), this.packsView.loadRemote.classList.add("hidden"), this.packView.name.textContent = t.name, this.packView.creator.textContent = t.author, this.packView.creator.href = t.link ? t.link : "";
                        let i = t.size / 1024;
                        this.packView.size.textContent = i < 512 ? this.truncateNum(i) + "kB" : this.truncateNum(i / 1024) + "MB", this.packView.desc.textContent = t.description, this.packView.songCount.textContent = "Songs: " + t.songs.length, this.packView.imageCount.textContent = "Images: " + t.images.length;
                        let n = this.packView.songList,
                            s = this.packView.imageList;
                        for (; n.firstElementChild;) n.removeChild(n.firstElementChild);
                        for (; s.firstElementChild;) s.removeChild(s.firstElementChild);
                        for (let e = 0; e < t.songs.length; e++) {
                            let i = t.songs[e];
                            this.appendListItem("songs", i.title, "song" + e, n, this.selectResourceCallback(i), this.clickResourceCallback.bind(this, i, !0), i.enabled)
                        }
                        for (let e = 0; e < t.images.length; e++) {
                            let i = t.images[e];
                            this.appendListItem("images", i.name, "image" + e, s, this.selectResourceCallback(i), this.clickResourceCallback.bind(this, i, !1), i.enabled)
                        }
                    }
                    selectResourceCallback(e) {
                        let t = this;
                        return function() {
                            e.enabled = this.checked, t.rebuildEnabled()
                        }
                    }
                    clickResourceCallback(e, t) {
                        e.enabled || (e.enabled = !0, this.rebuildEnabled(), this.selectPack(this.resourcePacks.indexOf(this.packView.pack))), t ? this.core.setSong(this.enabledSongs.indexOf(e)) : (this.core.setImage(this.enabledImages.indexOf(e)), this.core.setIsFullAuto(!1))
                    }
                    getEnabledTabContents() {
                        let e = this.packView.pack;
                        return e ? 0 == this.currentTab ? {
                            arr: e.songs,
                            elName: "song"
                        } : {
                            arr: e.images,
                            elName: "image"
                        } : null
                    }
                    enableAll() {
                        let e = this.getEnabledTabContents();
                        if (e) {
                            for (let i = 0; i < e.arr.length; i++) e.arr[i].enabled = !0, t.getElementById(e.elName + i + "-" + this.unique).checked = !0;
                            this.rebuildEnabled()
                        }
                    }
                    disableAll() {
                        let e = this.getEnabledTabContents();
                        if (e) {
                            for (let i = 0; i < e.arr.length; i++) e.arr[i].enabled = !1, t.getElementById(e.elName + i + "-" + this.unique).checked = !1;
                            this.rebuildEnabled()
                        }
                    }
                    invert() {
                        let e = this.getEnabledTabContents();
                        if (e) {
                            for (let i = 0; i < e.arr.length; i++) e.arr[i].enabled = !e.arr[i].enabled, t.getElementById(e.elName + i + "-" + this.unique).checked = e.arr[i].enabled;
                            this.rebuildEnabled()
                        }
                    }
                    appendListItem(e, i, n, s, a, r, o) {
                        if (!this.hasUI) return;
                        void 0 === o && (o = !0);
                        let l = t.createElement("div");
                        l.className = "respacks-listitem";
                        let h = t.createElement("input");
                        h.type = "checkbox", h.name = e, h.value = i, h.id = n + "-" + this.unique, h.checked = o, h.onclick = a;
                        let d = t.createElement("label");
                        d.htmlFor = h.id;
                        let c = t.createElement("span");
                        c.textContent = i, c.onclick = r, l.appendChild(h), l.appendChild(d), l.appendChild(c), s.appendChild(l)
                    }
                    loadRemotes() {
                        let e = this.packsView.remoteList;
                        for (; e.firstElementChild;) e.removeChild(e.firstElementChild);
                        let t = this.appendSimpleListItem("Loading...", e),
                            i = new XMLHttpRequest;
                        i.open("GET", this.core.settings.packsURL, !0), i.responseType = "json", i.onload = () => {
                            i.response || i.onerror(), this.remotes = i.response, this.populateRemotes()
                        }, i.onerror = () => {
                            t.textContent = "Could not load list! Click to try again", t.onclick = this.loadRemotes.bind(this)
                        }, i.send()
                    }
                    populateRemotes() {
                        let e = this.packsView.remoteList;
                        for (; e.firstElementChild;) e.removeChild(e.firstElementChild);
                        for (let t = 0; t < this.remotes.length; t++) this.remotes[t].loaded = !1, this.appendSimpleListItem(this.remotes[t].name, e, function(e) {
                            this.selectRemotePack(e)
                        }.bind(this, t))
                    }
                    selectRemotePack(e) {
                        let t = this.remotes[e];
                        this.packView.pack = t, this.packView.packButtons.classList.add("invisible"), this.packsView.loadRemote.classList.remove("hidden"), t.loaded ? (this.packsView.loadRemote.classList.add("hues-button--loaded"), this.packsView.loadRemote.textContent = "LOADED") : (this.packsView.loadRemote.classList.remove("hues-button--loaded"), this.packsView.loadRemote.textContent = "LOAD REMOTE"), this.packView.name.textContent = t.name, this.packView.creator.textContent = t.author, this.packView.creator.href = t.link ? t.link : "";
                        let i = t.size / 1024;
                        this.packView.size.textContent = i < 512 ? this.truncateNum(i) + "kB" : this.truncateNum(i / 1024) + "MB", this.packView.desc.textContent = t.description, this.packView.songCount.textContent = "Songs: " + t.songcount, this.packView.imageCount.textContent = "Images: " + t.imagecount;
                        let n = this.packView.songList,
                            s = this.packView.imageList;
                        for (; n.firstElementChild;) n.removeChild(n.firstElementChild);
                        for (; s.firstElementChild;) s.removeChild(s.firstElementChild);
                        for (let e = 0; e < t.songs.length; e++) {
                            let i = t.songs[e];
                            this.appendSimpleListItem(i, n)
                        }
                        let a = t.songcount - t.songs.length;
                        if (a > 0) {
                            let e = "... and " + a + " more song";
                            a > 1 && (e += "s"), this.appendSimpleListItem(e + ".", n), this.appendSimpleListItem("Load the respack to show the rest!", n)
                        }
                        for (let e = 0; e < t.images.length; e++) {
                            let i = t.images[e];
                            this.appendSimpleListItem(i, s)
                        }
                        let r = t.imagecount - t.images.length;
                        if (r > 0) {
                            let e = "... and " + r + " more image";
                            r > 1 && (e += "s"), this.appendSimpleListItem(e + ".", s), this.appendSimpleListItem("Load the respack to show the rest!", s)
                        }
                    }
                    loadCurrentRemote() {
                        let e = this.packView.pack;
                        void 0 === e.loaded || e.loaded || (e.loaded = !0, this.packsView.loadRemote.className = "hues-button hues-button--loaded", this.packsView.loadRemote.textContent = "LOADING", this.addAll([e.url], ((e, t) => {
                            this.remoteProgress(e, t)
                        })).then(this.remoteComplete.bind(this)))
                    }
                    remoteProgress(e, t) {
                        e < .5 ? (this.packsView.progressStatus.textContent = "Downloading...", this.packsView.progressCurrent.textContent = Math.round(t.downloaded / 1024) + "b", this.packsView.progressTop.textContent = Math.round(t.size / 1024) + "b", this.packsView.progressBar.style.width = 2 * e * 100 + "%", this.packsView.progressPercent.textContent = Math.round(2 * e * 100) + "%") : (this.packsView.progressStatus.textContent = "Processing...", this.packsView.progressCurrent.textContent = t.filesLoaded, this.packsView.progressTop.textContent = t.filesToLoad, this.packsView.progressBar.style.width = 2 * (e - .5) * 100 + "%", this.packsView.progressPercent.textContent = Math.round(2 * (e - .5) * 100) + "%")
                    }
                    remoteComplete() {
                        let t = this.packsView.progressStatus;
                        t.textContent = "Complete", e.setTimeout((function() {
                            t.textContent = "Idle"
                        }), 2e3), this.packsView.loadRemote.textContent = "LOADED", this.packsView.progressBar.style.width = "100%", this.packsView.progressCurrent.textContent = "0b", this.packsView.progressTop.textContent = "0b", this.packsView.progressPercent.textContent = "0%"
                    }
                    appendSimpleListItem(e, i, n) {
                        let s = t.createElement("div");
                        s.className = "respacks-listitem";
                        let a = t.createElement("span");
                        return a.textContent = e.replace(/&amp;/g, "&"), a.onclick = n, s.appendChild(a), i.appendChild(s), a
                    }
                }
            }(window, document), i(358), i(187), i(427), i(131),
            function(e, t) {
                class i {
                    constructor(n) {
                        this.eventListeners = {
                            loaded: [],
                            time: [],
                            blurupdate: [],
                            newsong: [],
                            newimage: [],
                            newcolour: [],
                            newmode: [],
                            beat: [],
                            invert: [],
                            frame: [],
                            songstarted: [],
                            settingsupdated: []
                        }, this.version = 42, this.versionStr = (this.version / 10).toFixed(1), this.versionHex = this.version.toString(16), this.beatIndex = 0, this.buildLength = -1, this.loopLength = -1, this.currentSong = null, this.currentImage = null, this.songIndex = -1, this.imageIndex = -1, this.lastSongArray = [], this.lastImageArray = [], this.colourIndex = 63, this.colours = i.oldColours, this.invert = !1, this.loopCount = 0, this.doBuildup = !0, this.userInterface = null, this.uiArray = [], this.settings = new HuesSettings(n), this.root = null, this.settings.root ? "string" == typeof this.settings.root ? this.settings.root && t.getElementById(this.settings.root) ? this.root = t.getElementById(this.settings.root) : this.root = t.body : this.root = this.settings.root : this.root = t.body, this.root.classList.add("hues-root"), this.root === t.body && (t.documentElement.className = "hues-root"), this.root.innerHTML = "", this.makePreloader(this.root), e.onerror = (e, t, i, n, s) => (this.error(e), !1), this.window = new HuesWindow(this.root, this.settings), console.log("0x40 Hues v" + this.versionStr + " - start your engines!"), this.resourceManager = new Resources(this, this.window), this.settings.initUI(this.window), populateHuesInfo(this.versionStr, this.window, this.settings), this.window.selectTab(this.settings.firstWindow, !0);
                        let s = t.createElement("div");
                        s.className = "hues-ui", this.root.appendChild(s), this.uiArray.push(new RetroUI(s), new WeedUI(s), new ModernUI(s), new XmasUI(s), new HalloweenUI(s), new MinimalUI(s)), this.autoSong = this.settings.autoSong, this.visualiser = t.createElement("canvas"), this.visualiser.className = "hues-visualiser", this.visualiser.height = "64", this.vCtx = this.visualiser.getContext("2d"), this.soundManager = new SoundManager(this, this.settings.volume), this.soundManager.init().then((() => this.soundManager.locked || "on" != this.settings.skipPreloader ? this.resourceManager.getSizes(this.settings.respacks) : null)).then((e => {
                            if (null === e) return;
                            let t = e.reduce(((e, t) => "number" == typeof t ? e + t : null), 0);
                            t = "number" == typeof t ? t.toFixed(1) : '<abbr title="Content-Length header not present for respack URLs">???</abbr>';
                            let i = t + "MB of music/images.<br />WARNING: Flashing lights!<br /><br>Use browser zoom if elements don't fit<br /><b>Tap or click to start</b>";
                            return this.soundManager.locked || (i += "<br /><span>Skip this screen from Options</span>"), this.warning(i), this.soundManager.unlock()
                        })).then((() => (this.clearMessage(), setInterval(this.loopCheck.bind(this), 1e3), this.renderer = new HuesRender(this.root, this.soundManager, this), this.settings.addEventListener("updated", this.settingsUpdated.bind(this)), this.settingsUpdated(), this.setColour(this.colourIndex), this.animationLoop(), this.settings.load ? this.resourceManager.addAll(this.settings.respacks, (e => {
                            this.preloader.style.backgroundPosition = 100 - 100 * e + "% 0%";
                            let t = Math.floor(e * this.settings.preloadMax),
                                i = this.settings.preloadMax.toString(this.settings.preloadBase).length;
                            this.preloadMsg.textContent = this.settings.preloadPrefix + (Array(i).join("0") + t.toString(this.settings.preloadBase)).slice(-i)
                        })) : void(this.preloader.style.display = "none")))).then((() => {
                            this.preloader.classList.add("hues-preloader--loaded"), this.callEventListeners("loaded"), this.settings.firstImage ? this.setImageByName(this.settings.firstImage) : this.setImage(0), this.settings.autoplay && (this.settings.firstSong ? this.setSongByName(this.settings.firstSong) : this.setSong(0))
                        })).catch((e => {
                            this.error(e)
                        })), this.settings.disableKeyboard || t.addEventListener("keydown", (t => {
                            if ((t = t || e.event).defaultPrevented) return !0;
                            if (t.altKey || t.ctrlKey || t.metaKey || t.shiftKey) return !0;
                            if ("input" == t.target.tagName.toLowerCase() && "text" == t.target.type || "true" === t.target.contentEditable) return !0;
                            let i = t.keyCode || t.which;
                            return this.keyHandler(i)
                        }))
                    }
                    callEventListeners(e) {
                        let t = Array.prototype.slice.call(arguments, 1);
                        this.eventListeners[e].forEach((function(e) {
                            e.apply(null, t)
                        }))
                    }
                    addEventListener(e, t) {
                        if (e = e.toLowerCase(), void 0 === this.eventListeners[e]) throw Error("Unknown event: " + e);
                        this.eventListeners[e].push(t)
                    }
                    removeEventListener(e, t) {
                        if (e = e.toLowerCase(), void 0 === this.eventListeners[e]) throw Error("Unknown event: " + e);
                        this.eventListeners[e] = this.eventListeners[e].filter((function(e) {
                            return e !== t
                        }))
                    }
                    makePreloader(e) {
                        this.preloader = t.createElement("div"), this.preloader.className = "hues-preloader", e.appendChild(this.preloader), this.settings.preloadTitle && (this.preloadTitle = t.createElement("div"), this.preloadTitle.className = "hues-preloader__title", this.preloadTitle.textContent = this.settings.preloadTitle, this.preloader.appendChild(this.preloadTitle)), this.preloadMsg = t.createElement("div"), this.preloadMsg.className = "hues-preloader__text", this.preloadMsg.textContent = "Initialising...", this.preloader.appendChild(this.preloadMsg), this.preloadSubMsg = t.createElement("div"), this.preloadSubMsg.className = "hues-preloader__subtext", this.preloader.appendChild(this.preloadSubMsg)
                    }
                    resizeVisualiser() {
                        this.soundManager.initVisualiser(this.visualiser.width / 2)
                    }
                    updateVisualiser() {
                        if ("on" != this.settings.visualiser) return;
                        let e = this.soundManager.getVisualiserData();
                        if (!e) return;
                        this.vCtx.clearRect(0, 0, this.vCtx.canvas.width, this.vCtx.canvas.height);
                        let t = this.vCtx.createLinearGradient(0, 64, 0, 0);
                        this.invert ? (t.addColorStop(1, "rgba(20,20,20,0.6)"), t.addColorStop(0, "rgba(255,255,255,0.6)")) : (t.addColorStop(1, "rgba(255,255,255,0.6)"), t.addColorStop(0, "rgba(20,20,20,0.6)")), this.vCtx.fillStyle = t;
                        let i, n = 0;
                        for (let t = 0; t < e.length; t++) {
                            let s = e[t];
                            for (let a = 0; a < s.length; a++) {
                                let r = 0;
                                r = 2 == e.length && 0 === t ? s.length - a - 1 : a, i = s[r] / 4, this.vCtx.fillRect(n, this.vCtx.canvas.height - i, 2, i), n += 2
                            }
                        }
                    }
                    animationLoop() {
                        if (requestAnimationFrame(this.animationLoop.bind(this)), !this.soundManager.playing) return void this.callEventListeners("frame");
                        this.updateVisualiser();
                        let e = this.soundManager.currentTime;
                        this.callEventListeners("time", this.soundManager.clampedTime), e >= 0 && this.doBuildup && (this.currentSong.buildupPlayed = !0);
                        for (let t = this.beatIndex * this.getBeatLength(); t < e; t = ++this.beatIndex * this.getBeatLength()) {
                            let e = this.getBeat(this.beatIndex);
                            this.beater(e)
                        }
                        this.callEventListeners("frame")
                    }
                    recalcBeatIndex(e) {
                        let t = "number" == typeof e ? e : this.soundManager.currentTime;
                        if (this.beatIndex = Math.floor(t / (t < 0 ? this.buildLength : this.loopLength)), this.beatIndex != this.beatIndex) return void this.setInvert(!1);
                        let i, n = this.currentSong.buildupRhythm,
                            s = this.currentSong.rhythm;
                        if (this.beatIndex < 0) i = n.slice(0, Math.max(this.beatIndex + n.length, 0));
                        else {
                            if ((s.match(/i|I/g) || []).length % 2) return;
                            i = (n || "") + s.slice(0, this.beatIndex)
                        }
                        let a = (i.match(/i|I/g) || []).length;
                        this.setInvert(a % 2)
                    }
                    getBeatIndex() {
                        return this.soundManager.playing ? this.beatIndex < 0 ? this.beatIndex : this.beatIndex % this.currentSong.rhythm.length : 0
                    }
                    getSafeBeatIndex() {
                        let e = this.getBeatIndex();
                        return e < 0 ? 0 : e
                    }
                    blurUpdated(e, t) {
                        this.callEventListeners("blurupdate", e, t)
                    }
                    nextSong() {
                        let e = (this.songIndex + 1) % this.resourceManager.enabledSongs.length;
                        this.setSong(e)
                    }
                    previousSong() {
                        let e = (this.songIndex - 1 + this.resourceManager.enabledSongs.length) % this.resourceManager.enabledSongs.length;
                        this.setSong(e)
                    }
                    setSongByName(e) {
                        let t = this.resourceManager.enabledSongs,
                            i = 0,
                            n = 0;
                        for (let s = 0; s < t.length; s++) {
                            let a = t[s].title.score(e);
                            a > n && (n = a, i = s)
                        }
                        return this.setSong(i)
                    }
                    setSongOject(e) {
                        for (let t = 0; t < this.resourceManager.enabledSongs.length; t++)
                            if (this.resourceManager.enabledSongs[t] === e) return this.setSong(t)
                    }
                    setSong(e, t) {
                        if (this.currentSong != this.resourceManager.enabledSongs[e]) {
                            if (t || (this.lastSongArray = []), this.lastSongArray.push(e), this.songIndex = e, this.currentSong = this.resourceManager.enabledSongs[this.songIndex], void 0 === this.currentSong && (this.currentSong = {
                                    name: "None",
                                    title: "None",
                                    rhythm: ".",
                                    source: null,
                                    crc: "none",
                                    sound: null,
                                    enabled: !0,
                                    filename: "none"
                                }), console.log("Next song:", this.songIndex, this.currentSong), this.callEventListeners("newsong", this.currentSong), this.loopCount = 0, this.currentSong.buildup) switch (this.settings.playBuildups) {
                                case "off":
                                    this.currentSong.buildupPlayed = !0, this.doBuildup = !1;
                                    break;
                                case "on":
                                    this.currentSong.buildupPlayed = !1, this.doBuildup = !0;
                                    break;
                                case "once":
                                    this.doBuildup = !this.currentSong.buildupPlayed
                            }
                            return this.setInvert(!1), this.renderer.doInstantBlackout(), this.soundManager.playSong(this.currentSong, this.doBuildup).then((() => {
                                this.resetAudio(), this.fillBuildup(), this.callEventListeners("songstarted", this.currentSong)
                            }))
                        }
                    }
                    updateBeatLength() {
                        this.loopLength = this.soundManager.loopLength / this.currentSong.rhythm.length, this.currentSong.buildup ? (this.currentSong.buildupRhythm || (this.currentSong.buildupRhythm = "."), this.buildLength = this.soundManager.buildLength / this.currentSong.buildupRhythm.length) : this.buildLength = -1
                    }
                    getBeatLength() {
                        return this.beatIndex < 0 ? this.buildLength : this.loopLength
                    }
                    fillBuildup() {
                        if (this.updateBeatLength(), this.currentSong.buildup)
                            if (this.currentSong.independentBuild) console.log("New behaviour - separate build/loop lengths");
                            else {
                                console.log("Flash behaviour - filling buildup");
                                let e = Math.floor(this.soundManager.buildLength / this.loopLength);
                                for (e < 1 && (e = 1); this.currentSong.buildupRhythm.length < e;) this.currentSong.buildupRhythm = this.currentSong.buildupRhythm + ".";
                                console.log("Buildup length:", e)
                            } this.updateBeatLength(), this.recalcBeatIndex(this.doBuildup ? -this.soundManager.buildLength : 0)
                    }
                    randomSong() {
                        let e = this.resourceManager.enabledSongs.length,
                            t = Math.floor(Math.random() * e);
                        if (e > 1 && (t == this.songIndex || -1 != this.lastSongArray.indexOf(t))) this.randomSong();
                        else {
                            console.log("Randoming a song!"), this.setSong(t, !0);
                            let i = Math.min(5, Math.floor(e / 2));
                            for (; this.lastSongArray.length > i && i >= 0;) this.lastSongArray.shift()
                        }
                    }
                    loopCheck() {
                        Math.floor(this.soundManager.currentTime / this.soundManager.loopLength) > this.loopCount && this.onLoop()
                    }
                    onLoop() {
                        switch (this.loopCount++, this.settings.autoSong) {
                            case "loop":
                                console.log("Checking loops"), this.loopCount >= this.settings.autoSongDelay && this.doAutoSong();
                                break;
                            case "time":
                                console.log("Checking times"), this.soundManager.loopLength * this.loopCount >= 60 * this.settings.autoSongDelay && this.doAutoSong()
                        }
                    }
                    doAutoSong() {
                        let e = null;
                        this.resourceManager.enabledSongs.length < 2 || (e = "on" == this.settings.autoSongShuffle ? this.randomSong : this.nextSong, "on" == this.settings.autoSongFadeout ? this.soundManager.fadeOut((() => {
                            e.call(this)
                        })) : e.call(this))
                    }
                    songDataUpdated() {
                        this.currentSong && (this.callEventListeners("newsong", this.currentSong), this.callEventListeners("newimage", this.currentImage))
                    }
                    resetAudio() {
                        this.beatIndex = 0, this.songDataUpdated(), "on" == this.settings.visualiser && this.soundManager.initVisualiser(this.visualiser.width / 2)
                    }
                    randomImage() {
                        if ("on" == this.settings.shuffleImages) {
                            let e = this.resourceManager.enabledImages.length,
                                t = Math.floor(Math.random() * e);
                            if ((t == this.imageIndex || -1 != this.lastImageArray.indexOf(t)) && e > 1) this.randomImage();
                            else {
                                this.setImage(t, !0), this.lastImageArray.push(t);
                                let i = Math.min(20, Math.floor(e / 2));
                                for (; this.lastImageArray.length > i && i >= 0;) this.lastImageArray.shift()
                            }
                        } else {
                            let e = (this.imageIndex + 1) % this.resourceManager.enabledImages.length;
                            this.setImage(e)
                        }
                    }
                    setImage(e, t) {
                        this.imageIndex = e || 0;
                        let i = this.resourceManager.enabledImages[this.imageIndex];
                        i == this.currentImage && null !== i || (t || (this.lastImageArray = []), i ? this.currentImage = i : (this.currentImage = {
                            name: "None",
                            fullname: "None",
                            align: "center",
                            bitmap: null,
                            source: null,
                            enabled: !0
                        }, this.imageIndex = -1, this.lastImageArray = []), this.callEventListeners("newimage", this.currentImage))
                    }
                    setImageByName(e) {
                        let t = this.resourceManager.enabledImages;
                        for (let i = 0; i < t.length; i++)
                            if (t[i].name == e || t[i].fullname == e) return void this.setImage(i);
                        this.setImage(0)
                    }
                    nextImage() {
                        this.setIsFullAuto(!1);
                        let e = (this.imageIndex + 1) % this.resourceManager.enabledImages.length;
                        this.setImage(e)
                    }
                    previousImage() {
                        this.setIsFullAuto(!1);
                        let e = (this.imageIndex - 1 + this.resourceManager.enabledImages.length) % this.resourceManager.enabledImages.length;
                        this.setImage(e)
                    }
                    randomColourIndex() {
                        let e = Math.floor(Math.random() * this.colours.length);
                        return e == this.colourIndex ? this.randomColourIndex() : e
                    }
                    randomColour(e) {
                        let t = this.randomColourIndex();
                        this.setColour(t, e)
                    }
                    setColour(e, t) {
                        this.colourIndex = e;
                        let i = this.colours[this.colourIndex];
                        this.callEventListeners("newcolour", i, t)
                    }
                    getBeat(e) {
                        return e < 0 ? this.currentSong.buildupRhythm[this.currentSong.buildupRhythm.length + e] : this.currentSong.rhythm[e % this.currentSong.rhythm.length]
                    }
                    beater(e) {
                        switch (this.callEventListeners("beat", this.getBeatString(), this.getBeatIndex()), e) {
                            case "X":
                            case "x":
                                this.renderer.doYBlur();
                                break;
                            case "O":
                            case "o":
                                this.renderer.doXBlur();
                                break;
                            case ")":
                                this.renderer.doTrippyX();
                                break;
                            case "(":
                                this.renderer.doTrippyY();
                                break;
                            case "+":
                                this.renderer.doXBlur(), this.renderer.doBlackout();
                                break;
                            case "¤":
                                this.renderer.doXBlur(), this.renderer.doBlackout(!0);
                                break;
                            case "|":
                                this.renderer.doShortBlackout(this.getBeatLength()), this.randomColour();
                                break;
                            case ":":
                                this.randomColour();
                                break;
                            case "*":
                                this.settings.fullAuto && this.randomImage();
                                break;
                            case "=":
                                this.settings.fullAuto && this.randomImage();
                            case "~":
                                this.renderer.doColourFade(this.timeToNextBeat()), this.randomColour(!0);
                                break;
                            case "S":
                            case "s":
                                this.renderer.doSlice(this.getBeatLength(), this.charsToNextBeat(), !1, !0);
                                break;
                            case "V":
                            case "v":
                                this.renderer.doSlice(this.getBeatLength(), this.charsToNextBeat(), !0, !1);
                                break;
                            case "@":
                            case "#":
                                this.renderer.doSlice(this.getBeatLength(), this.charsToNextBeat(), !0, !0);
                                break;
                            case "I":
                                this.settings.fullAuto && this.randomImage();
                            case "i":
                                this.toggleInvert()
                        } - 1 == [".", "+", "|", "¤"].indexOf(e) && this.renderer.clearBlackout(), -1 == [".", "+", "¤", ":", "*", "X", "O", "~", "=", "i", "I", "s", "v", "#"].indexOf(e) && (this.randomColour(), this.settings.fullAuto && this.randomImage())
                    }
                    charsToNextBeat() {
                        let e, t = this.currentSong.rhythm.length;
                        for (this.beatIndex < 0 && (t -= this.beatIndex), e = 1; e <= t && "." == this.getBeat(e + this.beatIndex); e++);
                        return e
                    }
                    timeToNextBeat() {
                        return this.charsToNextBeat() * this.getBeatLength() / this.soundManager.playbackRate
                    }
                    getBeatString(e) {
                        e = e || 256;
                        let t = "",
                            i = this.currentSong;
                        if (i)
                            for (t = this.beatIndex < 0 ? i.buildupRhythm.slice(i.buildupRhythm.length + this.beatIndex) : i.rhythm.slice(this.beatIndex % i.rhythm.length); t.length < e;) t += i.rhythm;
                        return t
                    }
                    setIsFullAuto(e) {
                        this.settings.fullAuto = e, this.userInterface && this.callEventListeners("newmode", this.settings.fullAuto)
                    }
                    toggleFullAuto() {
                        this.setIsFullAuto(!this.settings.fullAuto)
                    }
                    setInvert(e) {
                        this.invert = !!e, this.callEventListeners("invert", e)
                    }
                    toggleInvert() {
                        this.setInvert(!this.invert)
                    }
                    respackLoaded() {
                        this.init()
                    }
                    changeUI(e) {
                        e >= 0 && this.uiArray.length > e && this.userInterface != this.uiArray[e] && (this.hideLists(), this.userInterface && this.userInterface.disconnect(), this.userInterface = this.uiArray[e], this.userInterface.connectCore(this), this.callEventListeners("newmode", this.settings.fullAuto), this.callEventListeners("newsong", this.currentSong), this.callEventListeners("newimage", this.currentImage), this.callEventListeners("newcolour", this.colours[this.colourIndex], !1), this.callEventListeners("beat", this.getBeatString(), this.getBeatIndex()), this.callEventListeners("invert", this.invert))
                    }
                    settingsUpdated() {
                        switch (this.callEventListeners("settingsupdated"), this.settings.currentUI) {
                            case "retro":
                                this.changeUI(0);
                                break;
                            case "v4.20":
                                this.changeUI(1);
                                break;
                            case "modern":
                                this.changeUI(2);
                                break;
                            case "xmas":
                                this.changeUI(3);
                                break;
                            case "hlwn":
                                this.changeUI(4);
                                break;
                            case "mini":
                                this.changeUI(5)
                        }
                        switch (this.settings.colourSet) {
                            case "normal":
                                this.colours = i.oldColours;
                                break;
                            case "pastel":
                                this.colours = i.pastelColours;
                                break;
                            case "v4.20":
                                this.colours = i.weedColours
                        }
                        switch (this.settings.blackoutUI) {
                            case "off":
                                this.userInterface.show();
                                break;
                            case "on":
                                this.renderer.blackout && this.userInterface.hide()
                        }
                        switch (this.settings.visualiser) {
                            case "off":
                                this.visualiser.classList.add("hidden");
                                break;
                            case "on":
                                this.visualiser.classList.remove("hidden"), this.soundManager.vReady || this.soundManager.initVisualiser(this.visualiser.width / 2)
                        }
                        "off" == this.autoSong && "off" != this.settings.autoSong && (console.log("Resetting loopCount since AutoSong was enabled"), this.loopCount = 0), this.autoSong = this.settings.autoSong
                    }
                    enabledChanged() {
                        this.resourceManager.rebuildEnabled()
                    }
                    hideLists() {
                        this.resourceManager.hideLists()
                    }
                    toggleSongList() {
                        this.window.hide(), this.resourceManager.toggleSongList()
                    }
                    toggleImageList() {
                        this.window.hide(), this.resourceManager.toggleImageList()
                    }
                    openSongSource() {
                        this.currentSong && this.currentSong.source && e.open(this.currentSong.source, "_blank")
                    }
                    openImageSource() {
                        this.currentImage && this.currentImage.source && e.open(this.currentImage.source, "_blank")
                    }
                    keyHandler(e) {
                        switch (e) {
                            case 37:
                                this.previousImage();
                                break;
                            case 39:
                                this.nextImage();
                                break;
                            case 38:
                                this.nextSong();
                                break;
                            case 40:
                                this.previousSong();
                                break;
                            case 70:
                                this.toggleFullAuto();
                                break;
                            case 109:
                            case 189:
                            case 173:
                                this.soundManager.decreaseVolume();
                                break;
                            case 107:
                            case 187:
                            case 61:
                                this.soundManager.increaseVolume();
                                break;
                            case 66:
                                this.soundManager.seek(-this.soundManager.buildLength);
                                break;
                            case 77:
                                this.soundManager.toggleMute();
                                break;
                            case 72:
                                this.userInterface.toggleHide();
                                break;
                            case 82:
                                this.window.selectTab("RESOURCES");
                                break;
                            case 69:
                                this.window.selectTab("EDITOR");
                                break;
                            case 79:
                                this.window.selectTab("OPTIONS");
                                break;
                            case 73:
                                this.window.selectTab("INFO");
                                break;
                            case 49:
                                this.settings.currentUI = "retro";
                                break;
                            case 50:
                                this.settings.currentUI = "v4.20";
                                break;
                            case 51:
                                this.settings.currentUI = "modern";
                                break;
                            case 52:
                                this.settings.currentUI = "xmas";
                                break;
                            case 53:
                                this.settings.currentUI = "hlwn";
                                break;
                            case 54:
                                this.settings.currentUI = "mini";
                                break;
                            case 67:
                                this.toggleImageList();
                                break;
                            case 83:
                                this.toggleSongList();
                                break;
                            case 87:
                                this.window.toggle();
                                break;
                            case 78:
                                this.randomSong();
                                break;
                            case 76:
                                this.resourceManager.fileInput.click();
                                break;
                            default:
                                return !0
                        }
                        return !1
                    }
                    error(e) {
                        console.log(e), this.preloadSubMsg.textContent = e, this.preloadMsg.style.color = "#F00"
                    }
                    warning(e) {
                        console.log(e), this.preloadSubMsg.innerHTML = e, this.preloadMsg.style.color = "#F93"
                    }
                    clearMessage() {
                        this.preloadSubMsg.textContent = "", this.preloadMsg.style.color = ""
                    }
                }
                i.oldColours = [{
                    c: 0,
                    n: "black"
                }, {
                    c: 5570560,
                    n: "brick"
                }, {
                    c: 11141120,
                    n: "crimson"
                }, {
                    c: 16711680,
                    n: "red"
                }, {
                    c: 21760,
                    n: "turtle"
                }, {
                    c: 5592320,
                    n: "sludge"
                }, {
                    c: 11162880,
                    n: "brown"
                }, {
                    c: 16733440,
                    n: "orange"
                }, {
                    c: 43520,
                    n: "green"
                }, {
                    c: 5614080,
                    n: "grass"
                }, {
                    c: 11184640,
                    n: "maize"
                }, {
                    c: 16755200,
                    n: "citrus"
                }, {
                    c: 65280,
                    n: "lime"
                }, {
                    c: 5635840,
                    n: "leaf"
                }, {
                    c: 11206400,
                    n: "chartreuse"
                }, {
                    c: 16776960,
                    n: "yellow"
                }, {
                    c: 85,
                    n: "midnight"
                }, {
                    c: 5570645,
                    n: "plum"
                }, {
                    c: 11141205,
                    n: "pomegranate"
                }, {
                    c: 16711765,
                    n: "rose"
                }, {
                    c: 21845,
                    n: "swamp"
                }, {
                    c: 5592405,
                    n: "dust"
                }, {
                    c: 11162965,
                    n: "dirt"
                }, {
                    c: 16733525,
                    n: "blossom"
                }, {
                    c: 43605,
                    n: "sea"
                }, {
                    c: 5614165,
                    n: "ill"
                }, {
                    c: 11184725,
                    n: "haze"
                }, {
                    c: 16755285,
                    n: "peach"
                }, {
                    c: 65365,
                    n: "spring"
                }, {
                    c: 5635925,
                    n: "mantis"
                }, {
                    c: 11206485,
                    n: "brilliant"
                }, {
                    c: 16777045,
                    n: "canary"
                }, {
                    c: 170,
                    n: "navy"
                }, {
                    c: 5570730,
                    n: "grape"
                }, {
                    c: 11141290,
                    n: "mauve"
                }, {
                    c: 16711850,
                    n: "purple"
                }, {
                    c: 21930,
                    n: "cornflower"
                }, {
                    c: 5592490,
                    n: "deep"
                }, {
                    c: 11163050,
                    n: "lilac"
                }, {
                    c: 16733610,
                    n: "lavender"
                }, {
                    c: 43690,
                    n: "aqua"
                }, {
                    c: 5614250,
                    n: "steel"
                }, {
                    c: 11184810,
                    n: "grey"
                }, {
                    c: 16755370,
                    n: "pink"
                }, {
                    c: 65450,
                    n: "bay"
                }, {
                    c: 5636010,
                    n: "marina"
                }, {
                    c: 11206570,
                    n: "tornado"
                }, {
                    c: 16777130,
                    n: "saltine"
                }, {
                    c: 255,
                    n: "blue"
                }, {
                    c: 5570815,
                    n: "twilight"
                }, {
                    c: 11141375,
                    n: "orchid"
                }, {
                    c: 16711935,
                    n: "magenta"
                }, {
                    c: 22015,
                    n: "azure"
                }, {
                    c: 5592575,
                    n: "liberty"
                }, {
                    c: 11163135,
                    n: "royalty"
                }, {
                    c: 16733695,
                    n: "thistle"
                }, {
                    c: 43775,
                    n: "ocean"
                }, {
                    c: 5614335,
                    n: "sky"
                }, {
                    c: 11184895,
                    n: "periwinkle"
                }, {
                    c: 16755455,
                    n: "carnation"
                }, {
                    c: 65535,
                    n: "cyan"
                }, {
                    c: 5636095,
                    n: "turquoise"
                }, {
                    c: 11206655,
                    n: "powder"
                }, {
                    c: 16777215,
                    n: "white"
                }], i.pastelColours = [{
                    c: 13453898,
                    n: "Mahogany"
                }, {
                    c: 16443317,
                    n: "Banana Mania"
                }, {
                    c: 10453360,
                    n: "Beaver"
                }, {
                    c: 2302755,
                    n: "Black"
                }, {
                    c: 12344664,
                    n: "Chestnut"
                }, {
                    c: 14521461,
                    n: "Copper"
                }, {
                    c: 10145515,
                    n: "Cornflower"
                }, {
                    c: 2845892,
                    n: "Denim"
                }, {
                    c: 15715768,
                    n: "Desert Sand"
                }, {
                    c: 7229792,
                    n: "Eggplant"
                }, {
                    c: 1964308,
                    n: "Electric Lime"
                }, {
                    c: 7453816,
                    n: "Fern"
                }, {
                    c: 16570741,
                    n: "Goldenrod"
                }, {
                    c: 11068576,
                    n: "Granny Smith Apple"
                }, {
                    c: 9802124,
                    n: "Gray"
                }, {
                    c: 1879160,
                    n: "Green"
                }, {
                    c: 16719310,
                    n: "Hot Magenta"
                }, {
                    c: 11725917,
                    n: "Inch Worm"
                }, {
                    c: 6125259,
                    n: "Indigo"
                }, {
                    c: 16645236,
                    n: "Laser Lemon"
                }, {
                    c: 16561365,
                    n: "Lavender"
                }, {
                    c: 16760200,
                    n: "Macaroni and Cheese"
                }, {
                    c: 9935530,
                    n: "Manatee"
                }, {
                    c: 16745027,
                    n: "Mango Tango"
                }, {
                    c: 16628916,
                    n: "Melon"
                }, {
                    c: 1722486,
                    n: "Midnight Blue"
                }, {
                    c: 16753475,
                    n: "Neon Carrot"
                }, {
                    c: 12236908,
                    n: "Olive Green"
                }, {
                    c: 16741688,
                    n: "Orange"
                }, {
                    c: 15116503,
                    n: "Orchid"
                }, {
                    c: 4278860,
                    n: "Outer Space"
                }, {
                    c: 16739914,
                    n: "Outrageous Orange"
                }, {
                    c: 1878473,
                    n: "Pacific Blue"
                }, {
                    c: 12964070,
                    n: "Periwinkle"
                }, {
                    c: 9323909,
                    n: "Plum"
                }, {
                    c: 7619272,
                    n: "Purple Heart"
                }, {
                    c: 14060121,
                    n: "Raw Sienna"
                }, {
                    c: 14886251,
                    n: "Razzmatazz"
                }, {
                    c: 15605837,
                    n: "Red"
                }, {
                    c: 2084555,
                    n: "Robin Egg Blue"
                }, {
                    c: 7885225,
                    n: "Royal Purple"
                }, {
                    c: 16751530,
                    n: "Salmon"
                }, {
                    c: 16525383,
                    n: "Scarlet"
                }, {
                    c: 10478271,
                    n: "Sea Green"
                }, {
                    c: 10840399,
                    n: "Sepia"
                }, {
                    c: 9075037,
                    n: "Shadow"
                }, {
                    c: 4574882,
                    n: "Shamrock"
                }, {
                    c: 16482045,
                    n: "Shocking Pink"
                }, {
                    c: 15526590,
                    n: "Spring Green"
                }, {
                    c: 16604755,
                    n: "Sunset Orange"
                }, {
                    c: 16426860,
                    n: "Tan"
                }, {
                    c: 16550316,
                    n: "Tickle Me Pink"
                }, {
                    c: 14407634,
                    n: "Timberwolf"
                }, {
                    c: 1540205,
                    n: "Tropical Rain Forest"
                }, {
                    c: 7855591,
                    n: "Turquoise Blue"
                }, {
                    c: 16752777,
                    n: "Vivid Tangerine"
                }, {
                    c: 9392285,
                    n: "Vivid Violet"
                }, {
                    c: 15592941,
                    n: "White"
                }, {
                    c: 16728996,
                    n: "Wild Strawberry"
                }, {
                    c: 16542853,
                    n: "Wild Watermelon"
                }, {
                    c: 13477086,
                    n: "Wisteria"
                }, {
                    c: 16574595,
                    n: "Yellow"
                }, {
                    c: 12968836,
                    n: "Yellow Green"
                }, {
                    c: 16758355,
                    n: "Yellow Orange"
                }], i.weedColours = [{
                    c: 65280,
                    n: "Green"
                }, {
                    c: 5923665,
                    n: "Lizard"
                }, {
                    c: 6516567,
                    n: "Cactus"
                }, {
                    c: 4878371,
                    n: "Kakapo"
                }, {
                    c: 4018729,
                    n: "Wet Moss"
                }, {
                    c: 6659378,
                    n: "Tree Moss"
                }, {
                    c: 3297047,
                    n: "Lime Rind"
                }, {
                    c: 8357752,
                    n: "Flight Jacket"
                }, {
                    c: 12381585,
                    n: "Green Mist"
                }, {
                    c: 4751892,
                    n: "Holly"
                }, {
                    c: 5732922,
                    n: "Mtn Dew Bottle"
                }, {
                    c: 7635561,
                    n: "Seaweed Roll"
                }, {
                    c: 8647980,
                    n: "Neon Green"
                }, {
                    c: 12638639,
                    n: "Lichen"
                }, {
                    c: 10934149,
                    n: "Guacamole"
                }, {
                    c: 6848090,
                    n: "Pond Scum"
                }, {
                    c: 4153387,
                    n: "Douglas Fir"
                }, {
                    c: 4155430,
                    n: "Royal Palm"
                }, {
                    c: 6582110,
                    n: "Seaweed"
                }, {
                    c: 4680244,
                    n: "Noble Fir"
                }, {
                    c: 6159370,
                    n: "Green Led"
                }, {
                    c: 4414774,
                    n: "Spinach"
                }, {
                    c: 8699498,
                    n: "Frog"
                }, {
                    c: 6003812,
                    n: "Emerald"
                }, {
                    c: 3827241,
                    n: "Circuit Board"
                }, {
                    c: 3178516,
                    n: "Sapgreen"
                }, {
                    c: 3258701,
                    n: "Pool Table"
                }, {
                    c: 5615162,
                    n: "Leaf"
                }, {
                    c: 5094707,
                    n: "Grass"
                }, {
                    c: 5860438,
                    n: "Snake"
                }, {
                    c: 8832636,
                    n: "100 Euro"
                }, {
                    c: 8113264,
                    n: "Night Vision"
                }, {
                    c: 10494192,
                    n: "Purple"
                }, {
                    c: 10170623,
                    n: "Purple"
                }, {
                    c: 9514222,
                    n: "Purple"
                }, {
                    c: 8201933,
                    n: "Purple"
                }, {
                    c: 11141375,
                    n: "Purple"
                }, {
                    c: 8388736,
                    n: "Purple"
                }, {
                    c: 10964139,
                    n: "Turnip"
                }, {
                    c: 9395865,
                    n: "Violet"
                }, {
                    c: 8480391,
                    n: "Eggplant"
                }, {
                    c: 13369599,
                    n: "Grape"
                }, {
                    c: 8522683,
                    n: "Wild Violet"
                }, {
                    c: 6685080,
                    n: "Concord Grape"
                }, {
                    c: 7431037,
                    n: "Garden Plum"
                }, {
                    c: 11694758,
                    n: "Purple Fish"
                }, {
                    c: 6038638,
                    n: "Ultramarine Violet"
                }, {
                    c: 6172025,
                    n: "Purple Rose"
                }, {
                    c: 6830686,
                    n: "Sea Urchin"
                }, {
                    c: 9511326,
                    n: "Cobalt Violet Deep"
                }, {
                    c: 9135755,
                    n: "Plum"
                }, {
                    c: 10040013,
                    n: "Dark Orchid"
                }, {
                    c: 12541951,
                    n: "Violet Flower"
                }, {
                    c: 12427467,
                    n: "Purple Candy"
                }, {
                    c: 5577355,
                    n: "Deep Purple"
                }, {
                    c: 11882652,
                    n: "Thistle"
                }, {
                    c: 8855416,
                    n: "Dark Purple"
                }, {
                    c: 10251160,
                    n: "Purple Ink"
                }, {
                    c: 14381275,
                    n: "Orchid"
                }, {
                    c: 10027161,
                    n: "True Purple"
                }, {
                    c: 9109643,
                    n: "Darkmagenta"
                }, {
                    c: 11935876,
                    n: "Harold's Crayon"
                }, {
                    c: 6898825,
                    n: "Purple Rain"
                }, {
                    c: 16766720,
                    n: "Gold"
                }], e.HuesCore = i
            }(window, document)
    })()
})();