
type Constructor<T> = new (...args: any[]) => T;

type WaveDefinition = Array<EnemyType, number, number>

interface TouchCoord {
	x: number
	y: number
	clientX: number
	clientY: number
	uiObjects: number[]
	objects: number[]
	identifier: number | null
}
interface TiledMapData {
	width: number;
	height: number;
	tilewidth: number;
	tileheight: number;
	layers: TiledLayer[];
	tilesets: Array<{ firstgid: number, source: string }>;
}

interface TiledLayer {
	name: string;
	width?: number;
	height?: number;
	data?: number[];
	id: number
	x: number
	y: number
	visible: boolean
	type: string
	opacity: number
	draworder?: string
	objects?: TiledObject[]
}

interface TiledTileset {
	name: string;
	tilewidth: number;
	tileheight: number;
	spacing: number;
	margin: number;
	image: string;
	imageWidth: number;
	imageHeight: number;
	tilecount: number;
	columns: number
}
interface TiledMapTileset extends TiledTileset {
	firstgid: number
	img: HTMLImageElement
}
interface TiledObject {
	class: string
	height: number
	id: number
	name: string
	properties: TiledProperty[]
	rotation: number
	visible: boolean
	width: number
	x: number
	y: number
}
interface TiledProperty {
	name: string
	type: string
	value: unknown
}

type nodeDirection = 'left' | 'right' | 'top'
