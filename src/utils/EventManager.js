!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.EventManager = t())
    : (e.EventManager = t());
})(window, function () {
  return (function (e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var i = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (n.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (n.t = function (e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var i in e)
            n.d(
              r,
              i,
              function (t) {
                return e[t];
              }.bind(null, i)
            );
        return r;
      }),
      (n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return n.d(t, "a", t), t;
      }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ""),
      n((n.s = 0))
    );
  })([
    function (e, t, n) {
      "use strict";
      n.r(t);
      var r = null;
      try {
        r = n(
          !(function () {
            var e = new Error("Cannot find module 'react-native'");
            throw ((e.code = "MODULE_NOT_FOUND"), e);
          })()
        ).InteractionManager.runAfterInteractions;
      } catch (e) {}
      function i(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = [],
              r = !0,
              i = !1,
              o = void 0;
            try {
              for (
                var a, u = e[Symbol.iterator]();
                !(r = (a = u.next()).done) &&
                (n.push(a.value), !t || n.length !== t);
                r = !0
              );
            } catch (e) {
              (i = !0), (o = e);
            } finally {
              try {
                r || null == u.return || u.return();
              } finally {
                if (i) throw o;
              }
            }
            return n;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      function o(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function a(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      r ||
        (r = function (e) {
          return setTimeout(e, 0);
        }),
        n.d(t, "default", function () {
          return c;
        });
      var u = new Map(),
        l = new Map(),
        c = (function () {
          var e, t, n;
          function c() {
            var e = this;
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, c),
              a(this, "disable", function () {
                (e.enabled = !1),
                  e.removeListenerFromAll(),
                  e.timers.forEach(clearTimeout),
                  e.timers.clear(),
                  e.intervals.forEach(clearInterval),
                  e.intervals.clear();
              }),
              a(this, "ifEnabled", function (t) {
                e.enabled && t();
              }),
              a(this, "addListener", function (t, n) {
                var r = u.get(t);
                r || ((r = []), u.set(t, r)),
                  r.push({ manager: e, key: t, callback: n });
                var i = l.get(e);
                i || ((i = []), l.set(e, i)), i.push(t);
              }),
              a(this, "addListeners", function (t) {
                t.forEach(function (t) {
                  var n = i(t, 2),
                    r = n[0],
                    o = n[1];
                  return e.addListener(r, o);
                });
              }),
              a(this, "removeListener", function (t) {
                var n = u.get(t);
                n &&
                  u.set(
                    t,
                    n.filter(function (t) {
                      return t.manager != e;
                    })
                  );
                var r = l.get(e);
                r &&
                  l.set(
                    e,
                    r.filter(function (e) {
                      return e != t;
                    })
                  );
              }),
              a(this, "removeListenerFromAll", function () {
                var t = l.get(e);
                l.delete(e),
                  t &&
                    t.length > 0 &&
                    t.forEach(function (t) {
                      return e.removeListener(t);
                    });
              }),
              a(this, "afterInteractions", function (t) {
                r(function () {
                  return e.ifEnabled(t);
                });
              }),
              a(this, "onTimeout", function (t, n, r) {
                if ((e.clearTimeout(t), !r)) return null;
                var i = setTimeout(e.ifEnabled, n, r);
                return e.timers.set(t, i), i;
              }),
              a(this, "clearTimeout", function (t) {
                var n = e.timers;
                n.has(t) && (clearTimeout(n.get(t)), n.delete(t));
              }),
              a(this, "onInterval", function (t, n, r) {
                if ((e.clearInterval(t), !r)) return null;
                var i = setInterval(e.ifEnabled, n, r);
                return e.intervals.set(t, i), i;
              }),
              a(this, "clearInterval", function (t) {
                var n = e.intervals;
                n.has(t) && (clearInterval(n.get(t)), n.delete(t));
              }),
              (this.enabled = !0),
              (this.timers = new Map()),
              (this.intervals = new Map());
          }
          return (
            (e = c),
            (n = [
              {
                key: "emitEvent",
                value: function (e, t) {
                  var n = u.get(e);
                  !n ||
                    n.length < 1 ||
                    n.forEach(function (n) {
                      var r = n.manager,
                        i = n.callback;
                      try {
                        r.ifEnabled(function () {
                          return i(t, e);
                        });
                      } catch (e) {
                        console.log("-- error: ", e);
                      }
                    });
                },
              },
            ]),
            (t = null) && o(e.prototype, t),
            n && o(e, n),
            c
          );
        })();
    },
  ]);
});
