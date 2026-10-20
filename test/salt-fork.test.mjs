// SALT fork regression tests: construction must not need a DOM, getters/setters
// must chain, and destroy() must be safe without a render.
import { test } from "node:test";
import assert from "node:assert/strict";
import { OrgChart } from "../index.js";

test("constructs without a DOM (no canvas, no window)", () => {
  assert.equal(typeof globalThis.document, "undefined");
  const chart = new OrgChart();
  assert.equal(chart.getChartState().ctx, null);
  assert.equal(chart.getChartState().svgHeight, 600);
});

test("attribute setters chain and getters read back", () => {
  const data = [{ id: "a", parentId: null }, { id: "b", parentId: "a" }];
  const chart = new OrgChart().data(data).svgHeight(720).compact(false);
  assert.equal(chart.data(), data);
  assert.equal(chart.svgHeight(), 720);
});

test("getTextWidth falls back to an estimate when no canvas exists", () => {
  const chart = new OrgChart();
  assert.equal(chart.getTextWidth("abcd", { fontSize: 10 }), 24);
});

test("destroy() is idempotent before any render", () => {
  const chart = new OrgChart();
  assert.equal(chart.destroy(), chart);
  assert.equal(chart.destroy(), chart);
  assert.equal(chart.getChartState().firstDraw, true);
});
