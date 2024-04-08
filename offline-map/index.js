import DRAWING from "https://www.gteh.top/offline-map/drawing.js";
import FetchData from "https://www.gteh.top/offline-map/fetch.js";
import UTILITIES from "https://www.gteh.top/offline-map/utilities.js";
import DATA from "https://www.gteh.top/offline-map/data.js";
import SETTINGS from "./settings.js";
const LON_OFFSET = -122.305641,
  init = () => {
    if (UTILITIES.testMode) {
      let e = 0,
        t = 0;
      const a = () => {
        DRAWING.drawTest(6, e, t),
          (t += 45) >= 180 && ((t = 0), (e += 45) >= 180 && (e = 0));
      };
      setInterval(a, 1e3), a();
    } else
      UTILITIES.obaMode
        ? new FetchData(
            () => {
              const [e, t, a, n] = DRAWING.getCenterLatLon();
              return `https://api.pugetsound.onebusaway.org/api/where/trips-for-location.json?key=TEST&lat=${
                e / 1e5 + 47.653435
              }&lon=${t / 1e5 + LON_OFFSET}&latSpan=${Math.max(
                a / 1e5,
                0.1
              )}&lonSpan=${Math.max(
                n / 1e5,
                0.1
              )}&includeSchedule=true&includeReferences=true`;
            },
            3e4,
            !1,
            () => !0,
            (e) => DATA.parseOBA(e, 47.653435, LON_OFFSET, 1e5)
          ).fetchData()
        : (new FetchData(
            () => SETTINGS.url + "data",
            3e4,
            !1,
            () => !0,
            (e) => DATA.parseMTR(e)
          ).fetchData(),
          new FetchData(
            () => SETTINGS.url + "info",
            5e3,
            !1,
            () => !0,
            (e) => {
              const t = document.getElementById("player_list");
              t.innerText = "";
              for (let a = 0; a < e.length; a++)
                e[a].forEach((e) => {
                  const {
                      player: a,
                      name: n,
                      number: s,
                      destination: r,
                      circular: i,
                      color: o,
                    } = e,
                    l = "" === n && "" === r;
                  t.innerHTML +=
                    '<div class="player text">' +
                    `<img src="https://minotar.net/avatar/${a}" alt=""/>` +
                    `<span style="${
                      l
                        ? ""
                        : "max-width: 6em; min-width: 6em; overflow: hidden"
                    }">&nbsp;&nbsp;&nbsp;${a}</span>` +
                    `<div class="player_route" style="display: ${
                      l ? "none" : ""
                    }; border-left: 0.3em solid ${UTILITIES.convertColor(
                      o
                    )}">` +
                    '<div class="arrival">' +
                    `<span class="arrival_text">&nbsp;${s.replace(
                      /\|/g,
                      " "
                    )} ${n.split("||")[0].replace(/\|/g, " ")}</span>` +
                    '</div><div class="arrival">' +
                    `<span class="material-icons small">${
                      "" === i
                        ? "chevron_right"
                        : "cw" === i
                        ? "rotate_right"
                        : "rotate_left"
                    }</span>` +
                    `<span class="arrival_text">${r.replace(
                      /\|/g,
                      " "
                    )}</span>` +
                    "</div></div></div>";
                }),
                  e[a].length > 0 &&
                    (t.innerHTML += '<div class="spacer"></div>');
              document.getElementById("settings").style.maxHeight =
                window.innerHeight - 80 + "px";
            }
          ).fetchData());
  };
Promise.all(UTILITIES.fonts.map((e) => new FontFaceObserver(e).load())).then(
  init,
  init
);
