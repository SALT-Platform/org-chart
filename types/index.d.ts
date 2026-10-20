// TypeScript declarations for d3-org-chart (SALT fork). Upstream ships no types.
// Every attribute in the chart state gets a chainable getter/setter; the typed
// surface below covers the attributes and methods intended for public use.

export interface OrgChartTransform { x: number; y: number; k: number }

export interface OrgChartHierarchyNode<Datum> {
  data: Datum & { _expanded?: boolean; _centered?: boolean; _highlighted?: boolean; _upToTheRootHighlighted?: boolean; _directSubordinates?: number; _totalSubordinates?: number };
  id?: string;
  depth: number;
  height: number;
  x: number;
  y: number;
  width: number;
  parent: OrgChartHierarchyNode<Datum> | null;
  children?: OrgChartHierarchyNode<Datum>[];
  _children?: OrgChartHierarchyNode<Datum>[];
  descendants(): OrgChartHierarchyNode<Datum>[];
  ancestors(): OrgChartHierarchyNode<Datum>[];
}

export type OrgChartLayout = "top" | "bottom" | "left" | "right";

type Accessor<Datum, R> = (node: OrgChartHierarchyNode<Datum>) => R;

export interface OrgChartState<Datum> {
  id: string;
  container: string | HTMLElement;
  data: Datum[] | null;
  svgWidth: number;
  svgHeight: number;
  lastTransform: OrgChartTransform;
  allNodes: OrgChartHierarchyNode<Datum>[] | null;
  root: OrgChartHierarchyNode<Datum> | null;
  svg: unknown;
  chart: unknown;
  [key: string]: unknown;
}

export class OrgChart<Datum = Record<string, unknown>> {
  constructor();
  getChartState(): OrgChartState<Datum>;

  container(value: string | HTMLElement): this;
  data(value: Datum[]): this;
  data(): Datum[] | null;
  svgWidth(value: number): this;
  svgHeight(value: number): this;
  layout(value: OrgChartLayout): this;
  compact(value: boolean): this;
  duration(value: number): this;
  initialZoom(value: number): this;
  initialExpandLevel(value: number): this;
  scaleExtent(value: [number, number]): this;
  rootMargin(value: number): this;
  nodeId(accessor: (d: Datum) => string): this;
  parentNodeId(accessor: (d: Datum) => string | null | undefined): this;
  nodeWidth(accessor: Accessor<Datum, number>): this;
  nodeHeight(accessor: Accessor<Datum, number>): this;
  childrenMargin(accessor: Accessor<Datum, number>): this;
  siblingsMargin(accessor: Accessor<Datum, number>): this;
  neighbourMargin(accessor: (a: OrgChartHierarchyNode<Datum>, b: OrgChartHierarchyNode<Datum>) => number): this;
  compactMarginBetween(accessor: Accessor<Datum, number>): this;
  compactMarginPair(accessor: Accessor<Datum, number>): this;
  nodeButtonWidth(accessor: Accessor<Datum, number>): this;
  nodeButtonHeight(accessor: Accessor<Datum, number>): this;
  /** Returns trusted HTML. Callers MUST escape all data-derived text. */
  nodeContent(render: (node: OrgChartHierarchyNode<Datum>, index: number, nodes: unknown[], state: OrgChartState<Datum>) => string): this;
  /** Returns trusted HTML for the expand/collapse button. */
  buttonContent(render: (args: { node: OrgChartHierarchyNode<Datum>; state: OrgChartState<Datum> }) => string): this;
  nodeUpdate(callback: (this: SVGGElement, node: OrgChartHierarchyNode<Datum>, index: number, nodes: SVGGElement[]) => void): this;
  linkUpdate(callback: (this: SVGPathElement, node: OrgChartHierarchyNode<Datum>, index: number, nodes: SVGPathElement[]) => void): this;
  onNodeClick(callback: (node: OrgChartHierarchyNode<Datum>) => void): this;
  onZoom(callback: (event: { transform: OrgChartTransform }, d: unknown) => void): this;
  onZoomStart(callback: (event: unknown, d: unknown) => void): this;
  onZoomEnd(callback: (event: unknown, d: unknown) => void): this;
  onExpandOrCollapse(callback: (node: OrgChartHierarchyNode<Datum>) => void): this;

  render(): this;
  update(node: OrgChartHierarchyNode<Datum>): this;
  fit(options?: { animate?: boolean; nodes?: OrgChartHierarchyNode<Datum>[]; scale?: boolean; onCompleted?: () => void }): this;
  zoomIn(): void;
  zoomOut(): void;
  expandAll(): this;
  collapseAll(): this;
  setExpanded(id: string, expanded?: boolean): this;
  setCentered(id: string): this;
  setHighlighted(id: string): this;
  setUpToTheRootHighlighted(id: string): this;
  clearHighlighting(): this;
  fullscreen(element?: string | HTMLElement): void;
  exportImg(options?: { full?: boolean; scale?: number; onLoad?: (dataUrl: string) => void; save?: boolean; backgroundColor?: string }): void;
  exportSvg(): this;
  addNode(datum: Datum): this;
  removeNode(id: string): this;
  getTextWidth(text: string, options?: { fontSize?: number; fontWeight?: number; defaultFont?: string; ctx?: CanvasRenderingContext2D | null }): number;
  clear(): void;
  /** SALT fork: remove listeners, zoom handlers and the svg; safe to call twice. */
  destroy(): this;
}
