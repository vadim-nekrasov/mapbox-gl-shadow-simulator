/**
 * Mapbox GL Shadow Simulator - Deobfuscated Source
 * Original Package: mapbox-gl-shadow-simulator v0.63.0
 * Copyright Ted Piotrowski 2025
 *
 * This is a deobfuscated version for development and modification purposes.
 * Original minified code has been reformatted and partially renamed for readability.
 *
 * For licensing visit: https://shademap.app/about/
 */
import type { Map as MapboxMap, MapboxGeoJSONFeature } from "mapbox-gl";
export interface TerrainSourceOptions {
    maxZoom: number;
    tileSize: number;
    _overzoom?: number;
    getSourceUrl: (coords: {
        x: number;
        y: number;
        z: number;
    }) => string;
    getElevation: (pixel: {
        r: number;
        g: number;
        b: number;
        a: number;
    }) => number;
}
export interface DSMSourceOptions {
    bounds: Array<{
        lat: number;
        lng: number;
    }>;
    data: Uint8ClampedArray;
    width: number;
    height: number;
    maxHeight: number;
}
export interface CanopySourceOptions {
    bounds: Array<{
        lat: number;
        lng: number;
    }>;
    data: Uint8ClampedArray;
    width: number;
    height: number;
    maxHeight: number;
}
export interface SunExposureOptions {
    enabled?: boolean;
    startDate?: Date;
    endDate?: Date;
    iterations?: number;
}
export interface SunExposureSetOptions {
    startDate?: Date;
    endDate?: Date;
    iterations?: number;
}
export interface ShadeMapOptions {
    apiKey: string;
    date?: Date;
    color?: string;
    opacity?: number;
    sunExposure?: SunExposureOptions;
    terrainSource?: TerrainSourceOptions;
    canopySource?: CanopySourceOptions;
    dsmSource?: DSMSourceOptions;
    belowCanopy?: boolean;
    getFeatures?: () => Promise<MapboxGeoJSONFeature[]>;
    getSize?: () => {
        width: number;
        height: number;
    };
    debug?: (message: string) => void;
}
export type TileLoadedCallback = (loadedTiles: number, totalTiles: number) => void;
export type IdleCallback = () => void;
export type EventCallback = (...args: any[]) => void;
declare class EventEmitter {
    protected events: Record<string, EventCallback[]>;
    constructor();
    on(eventName: string, callback: EventCallback): () => void;
    removeListener(eventName: string, callback: EventCallback): void;
    removeAllListeners(): void;
    emit(eventName: string, ...args: any[]): void;
    once(eventName: string, callback: EventCallback): () => void;
}
declare class ShadeMapBase extends EventEmitter {
    protected options: Required<ShadeMapOptions> & {
        sunExposure: Required<SunExposureOptions>;
        terrainSource: Required<TerrainSourceOptions>;
        dsmSource: Required<DSMSourceOptions>;
        canopySource?: CanopySourceOptions;
        getFeatures: () => Promise<MapboxGeoJSONFeature[]>;
        getSize: () => {
            width: number;
            height: number;
        };
        debug: (message: string) => void;
    };
    protected _canvas?: HTMLCanvasElement;
    protected _color?: {
        r: number;
        g: number;
        b: number;
    };
    protected _map?: MapboxMap;
    protected _heightMap?: any;
    protected _compiledKernel?: any;
    protected _gl?: WebGL2RenderingContext | WebGLRenderingContext;
    protected _bounds?: any;
    protected _buildingRasterizer?: BuildingRasterizer;
    protected _tileMerger?: any;
    protected _canopyMerger?: any;
    constructor(options: ShadeMapOptions);
    onRemove(): this;
    setDate(date: Date): this;
    _setDateForTimezone(t: any, e: any): void;
    setColor(t: any): this;
    setOpacity(t: any): this;
    setBelowCanopy(t: any): this;
    setTerrainSource(t: any): this;
    setCanopySource(t: any): this;
    setDSMSource(t: any): this;
    setSunExposure(enabled?: boolean, options?: SunExposureSetOptions): Promise<this>;
    _lngLatToTextureCoords(t: any): any;
    _getBounds(t: any, e: any): any;
    _getDEMZoom(t: any): number;
    _reset(): Promise<this>;
    _draw(e: any): Promise<this>;
    readPixel(t: any, e: any): Uint8Array<ArrayBuffer>;
    readPixels(t: any, e: any, r: any, o: any): Uint8Array<ArrayBuffer>;
    isPositionInSun(e: any, r: any): Promise<boolean>;
    isPositionInShade(e: any, r: any): Promise<boolean>;
    toGeoTiff(): {
        data: Uint8Array<ArrayBuffer>;
        metadata: {
            width: any;
            height: any;
            ModelTiepoint: any[];
            ModelPixelScale: number[];
            GeographicTypeGeoKey: number;
            GeogCitationGeoKey: string;
        };
    };
    _generateShadeProfile(t: any): any;
    _generateLocationShadeProfile(t: any): {
        data: any;
        width: any;
        height: any;
    };
    getHoursOfSun(t: any, e: any): number;
    _repositionCanvas(t: any): void;
    _flush(): void;
    flushSync(): void;
    _parseColor(t: any): {
        r: number;
        g: number;
        b: number;
    };
}
declare class BuildingRasterizer {
    gl: WebGL2RenderingContext | WebGLRenderingContext;
    program: WebGLProgram;
    positionAttributeLocation: number;
    dsmAttributeLocation: number;
    useDSMUniformLocation: WebGLUniformLocation | null;
    isNegative: WebGLUniformLocation | null;
    xyzUniformLocation: WebGLUniformLocation | null;
    dimensionsUniformLocation: WebGLUniformLocation | null;
    heightMapUniformLocation: WebGLUniformLocation | null;
    canopyMapUniformLocation: WebGLUniformLocation | null;
    centroidUniformLocation: WebGLUniformLocation | null;
    colorUniformLocation: WebGLUniformLocation | null;
    positionBuffer: WebGLBuffer | null;
    dsmBuffer: WebGLBuffer | null;
    indexBuffer: WebGLBuffer | null;
    targetTexture: WebGLTexture | null;
    constructor(t: WebGL2RenderingContext | WebGLRenderingContext);
    raster(t: any): {
        maxHeight: number;
        heightMapTex: WebGLTexture;
    };
}
declare class MapboxShadeMap extends ShadeMapBase {
    id: string;
    type: string;
    canvasSourceId: string;
    attributionSourceId: string;
    canvasLayerId: string;
    attributionLayerId: string;
    protected _refreshing: number;
    protected _raf: number;
    protected _moveEndHandler: () => void;
    protected _gl?: any;
    protected _framebuffer?: any;
    protected _tileMerger?: any;
    protected _canopyMerger?: any;
    protected _buildingRasterizer?: any;
    protected _bounds?: any;
    constructor(options: ShadeMapOptions);
    render(gl: WebGLRenderingContext, matrix: number[]): void;
    addTo(map: MapboxMap): this;
    onAdd(e: any, gl?: any): this;
    onRemove(): this;
    _getHeightMapCoords(t: any, e: any): any;
    getHoursOfSun(t: any, e: any): number;
    remove(): void;
    readPixel(t: any, e: any): Uint8Array<ArrayBuffer>;
    readPixels(t: any, e: any, r: any, o: any): Uint8Array<ArrayBuffer>;
    isPositionInSun(x: number, y: number): Promise<boolean>;
    isPositionInShade(x: number, y: number): Promise<boolean>;
    _flush(): void;
    _repositionCanvas(t: any): this;
}
export default MapboxShadeMap;
