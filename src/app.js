import run from "@cycle/run";
import { div, p, input, makeDOMDriver } from "@cycle/dom";
import xs from "xstream";

function main(driverSources) {
  const inputData_ = driverSources.DOM.select("input").events("keyup");

  const driverSinks = {
    DOM: inputData_
      .map(ev => ev.target.value)
      .startWith("")
      .map(value => {
        return div([input({ attrs: { value } }), p(value)]);
      })
  };
  return driverSinks;
}

const drivers = {
  DOM: makeDOMDriver("#app")
};

run(main, drivers);
