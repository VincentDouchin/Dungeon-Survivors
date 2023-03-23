/**
 * This file is a JSON schema of files created by LDtk level editor (https://ldtk.io).
 *
 * This is the root of any Project JSON file. It contains:  - the project settings, - an
 * array of levels, - a group of definitions (that can probably be safely ignored for most
 * users).
 */
export interface LDTKMapDefinition {
	/**
	 * This object is not actually used by LDtk. It ONLY exists to force explicit references to
	 * all types, to make sure QuickType finds them and integrate all of them. Otherwise,
	 * Quicktype will drop types that are not explicitely used.
	 */
	__FORCED_REFS?: ForcedRefs;
	/**
	 * LDtk application build identifier.<br/>  This is only used to identify the LDtk version
	 * that generated this particular project file, which can be useful for specific bug fixing.
	 * Note that the build identifier is just the date of the release, so it's not unique to
	 * each user (one single global ID per LDtk public release), and as a result, completely
	 * anonymous.
	 */
	appBuildId: number;
	/**
	 * Number of backup files to keep, if the `backupOnSave` is TRUE
	 */
	backupLimit: number;
	/**
	 * If TRUE, an extra copy of the project will be created in a sub folder, when saving.
	 */
	backupOnSave: boolean;
	/**
	 * Project background color
	 */
	bgColor: string;
	/**
	 * An array of command lines that can be ran manually by the user
	 */
	customCommands: LdtkCustomCommand[];
	/**
	 * Default grid size for new layers
	 */
	defaultGridSize: number;
	/**
	 * Default background color of levels
	 */
	defaultLevelBgColor: string;
	/**
	 * **WARNING**: this field will move to the `worlds` array after the "multi-worlds" update.
	 * It will then be `null`. You can enable the Multi-worlds advanced project option to enable
	 * the change immediately.<br/><br/>  Default new level height
	 */
	defaultLevelHeight?: number | null;
	/**
	 * **WARNING**: this field will move to the `worlds` array after the "multi-worlds" update.
	 * It will then be `null`. You can enable the Multi-worlds advanced project option to enable
	 * the change immediately.<br/><br/>  Default new level width
	 */
	defaultLevelWidth?: number | null;
	/**
	 * Default X pivot (0 to 1) for new entities
	 */
	defaultPivotX: number;
	/**
	 * Default Y pivot (0 to 1) for new entities
	 */
	defaultPivotY: number;
	/**
	 * A structure containing all the definitions of this project
	 */
	defs: Definitions;
	/**
	 * If TRUE, the exported PNGs will include the level background (color or image).
	 */
	exportLevelBg: boolean;
	/**
	 * **WARNING**: this deprecated value is no longer exported since version 0.9.3  Replaced
	 * by: `imageExportMode`
	 */
	exportPng?: boolean | null;
	/**
	 * If TRUE, a Tiled compatible file will also be generated along with the LDtk JSON file
	 * (default is FALSE)
	 */
	exportTiled: boolean;
	/**
	 * If TRUE, one file will be saved for the project (incl. all its definitions) and one file
	 * in a sub-folder for each level.
	 */
	externalLevels: boolean;
	/**
	 * An array containing various advanced flags (ie. options or other states). Possible
	 * values: `DiscardPreCsvIntGrid`, `ExportPreCsvIntGridFormat`, `IgnoreBackupSuggest`,
	 * `PrependIndexToLevelFileNames`, `MultiWorlds`, `UseMultilinesType`
	 */
	flags: Flag[];
	/**
	 * Naming convention for Identifiers (first-letter uppercase, full uppercase etc.) Possible
	 * values: `Capitalize`, `Uppercase`, `Lowercase`, `Free`
	 */
	identifierStyle: IdentifierStyle;
	/**
	 * Unique project identifier
	 */
	iid: string;
	/**
	 * "Image export" option when saving project. Possible values: `None`, `OneImagePerLayer`,
	 * `OneImagePerLevel`, `LayersAndLevels`
	 */
	imageExportMode: ImageExportMode;
	/**
	 * File format version
	 */
	jsonVersion: string;
	/**
	 * The default naming convention for level identifiers.
	 */
	levelNamePattern: string;
	/**
	 * All levels. The order of this array is only relevant in `LinearHorizontal` and
	 * `linearVertical` world layouts (see `worldLayout` value).<br/>  Otherwise, you should
	 * refer to the `worldX`,`worldY` coordinates of each Level.
	 */
	levels: Level[];
	/**
	 * If TRUE, the Json is partially minified (no indentation, nor line breaks, default is
	 * FALSE)
	 */
	minifyJson: boolean;
	/**
	 * Next Unique integer ID available
	 */
	nextUid: number;
	/**
	 * File naming pattern for exported PNGs
	 */
	pngFilePattern?: null | string;
	/**
	 * If TRUE, a very simplified will be generated on saving, for quicker & easier engine
	 * integration.
	 */
	simplifiedExport: boolean;
	/**
	 * All instances of entities that have their `exportToToc` flag enabled are listed in this
	 * array.
	 */
	toc: LdtkTableOfContentEntry[];
	/**
	 * This optional description is used by LDtk Samples to show up some informations and
	 * instructions.
	 */
	tutorialDesc?: null | string;
	/**
	 * **WARNING**: this field will move to the `worlds` array after the "multi-worlds" update.
	 * It will then be `null`. You can enable the Multi-worlds advanced project option to enable
	 * the change immediately.<br/><br/>  Height of the world grid in pixels.
	 */
	worldGridHeight?: number | null;
	/**
	 * **WARNING**: this field will move to the `worlds` array after the "multi-worlds" update.
	 * It will then be `null`. You can enable the Multi-worlds advanced project option to enable
	 * the change immediately.<br/><br/>  Width of the world grid in pixels.
	 */
	worldGridWidth?: number | null;
	/**
	 * **WARNING**: this field will move to the `worlds` array after the "multi-worlds" update.
	 * It will then be `null`. You can enable the Multi-worlds advanced project option to enable
	 * the change immediately.<br/><br/>  An enum that describes how levels are organized in
	 * this project (ie. linearly or in a 2D space). Possible values: &lt;`null`&gt;, `Free`,
	 * `GridVania`, `LinearHorizontal`, `LinearVertical`
	 */
	worldLayout?: WorldLayout | null;
	/**
	 * This array is not used yet in current LDtk version (so, for now, it's always
	 * empty).<br/><br/>In a later update, it will be possible to have multiple Worlds in a
	 * single project, each containing multiple Levels.<br/><br/>What will change when "Multiple
	 * worlds" support will be added to LDtk:<br/><br/> - in current version, a LDtk project
	 * file can only contain a single world with multiple levels in it. In this case, levels and
	 * world layout related settings are stored in the root of the JSON.<br/> - after the
	 * "Multiple worlds" update, there will be a `worlds` array in root, each world containing
	 * levels and layout settings. Basically, it's pretty much only about moving the `levels`
	 * array to the `worlds` array, along with world layout related values (eg. `worldGridWidth`
	 * etc).<br/><br/>If you want to start supporting this future update easily, please refer to
	 * this documentation: https://github.com/deepnight/ldtk/issues/231
	 */
	worlds: World[];
	[property: string]: any;
}

/**
 * This object is not actually used by LDtk. It ONLY exists to force explicit references to
 * all types, to make sure QuickType finds them and integrate all of them. Otherwise,
 * Quicktype will drop types that are not explicitely used.
 */
export interface ForcedRefs {
	AutoLayerRuleGroup?: AutoLayerRuleGroup;
	AutoRuleDef?: AutoLayerRuleDefinition;
	CustomCommand?: LdtkCustomCommand;
	Definitions?: Definitions;
	EntityDef?: EntityDefinition;
	EntityInstance?: EntityInstance;
	EntityReferenceInfos?: ReferenceToAnEntityInstance;
	EnumDef?: EnumDefinition;
	EnumDefValues?: EnumValueDefinition;
	EnumTagValue?: EnumTagValue;
	FieldDef?: FieldDefinition;
	FieldInstance?: FieldInstance;
	GridPoint?: GridPoint;
	IntGridValueDef?: IntGridValueDefinition;
	IntGridValueInstance?: IntGridValueInstance;
	LayerDef?: LayerDefinition;
	LayerInstance?: LayerInstance;
	Level?: Level;
	LevelBgPosInfos?: LevelBackgroundPosition;
	NeighbourLevel?: NeighbourLevel;
	TableOfContentEntry?: LdtkTableOfContentEntry;
	Tile?: TileInstance;
	TileCustomMetadata?: TileCustomMetadata;
	TilesetDef?: TilesetDefinition;
	TilesetRect?: TilesetRectangle;
	World?: World;
	[property: string]: any;
}

export interface AutoLayerRuleGroup {
	active: boolean;
	/**
	 * *This field was removed in 1.0.0 and should no longer be used.*
	 */
	collapsed?: boolean | null;
	isOptional: boolean;
	name: string;
	rules: AutoLayerRuleDefinition[];
	uid: number;
	usesWizard: boolean;
}

/**
 * This complex section isn't meant to be used by game devs at all, as these rules are
 * completely resolved internally by the editor before any saving. You should just ignore
 * this part.
 */
export interface AutoLayerRuleDefinition {
	/**
	 * If FALSE, the rule effect isn't applied, and no tiles are generated.
	 */
	active: boolean;
	/**
	 * When TRUE, the rule will prevent other rules to be applied in the same cell if it matches
	 * (TRUE by default).
	 */
	breakOnMatch: boolean;
	/**
	 * Chances for this rule to be applied (0 to 1)
	 */
	chance: number;
	/**
	 * Checker mode Possible values: `None`, `Horizontal`, `Vertical`
	 */
	checker: Checker;
	/**
	 * If TRUE, allow rule to be matched by flipping its pattern horizontally
	 */
	flipX: boolean;
	/**
	 * If TRUE, allow rule to be matched by flipping its pattern vertically
	 */
	flipY: boolean;
	/**
	 * Default IntGrid value when checking cells outside of level bounds
	 */
	outOfBoundsValue?: number | null;
	/**
	 * Rule pattern (size x size)
	 */
	pattern: number[];
	/**
	 * If TRUE, enable Perlin filtering to only apply rule on specific random area
	 */
	perlinActive: boolean;
	perlinOctaves: number;
	perlinScale: number;
	perlinSeed: number;
	/**
	 * X pivot of a tile stamp (0-1)
	 */
	pivotX: number;
	/**
	 * Y pivot of a tile stamp (0-1)
	 */
	pivotY: number;
	/**
	 * Pattern width & height. Should only be 1,3,5 or 7.
	 */
	size: number;
	/**
	 * Array of all the tile IDs. They are used randomly or as stamps, based on `tileMode` value.
	 */
	tileIds: number[];
	/**
	 * Defines how tileIds array is used Possible values: `Single`, `Stamp`
	 */
	tileMode: TileMode;
	/**
	 * Unique Int identifier
	 */
	uid: number;
	/**
	 * X cell coord modulo
	 */
	xModulo: number;
	/**
	 * X cell start offset
	 */
	xOffset: number;
	/**
	 * Y cell coord modulo
	 */
	yModulo: number;
	/**
	 * Y cell start offset
	 */
	yOffset: number;
}

/**
 * Checker mode Possible values: `None`, `Horizontal`, `Vertical`
 */
export enum Checker {
	Horizontal = 'Horizontal',
	None = 'None',
	Vertical = 'Vertical',
}

/**
 * Defines how tileIds array is used Possible values: `Single`, `Stamp`
 */
export enum TileMode {
	Single = 'Single',
	Stamp = 'Stamp',
}

export interface LdtkCustomCommand {
	command: string;
	/**
	 * Possible values: `Manual`, `AfterLoad`, `BeforeSave`, `AfterSave`
	 */
	when: When;
}

/**
 * Possible values: `Manual`, `AfterLoad`, `BeforeSave`, `AfterSave`
 */
export enum When {
	AfterLoad = 'AfterLoad',
	AfterSave = 'AfterSave',
	BeforeSave = 'BeforeSave',
	Manual = 'Manual',
}

/**
 * If you're writing your own LDtk importer, you should probably just ignore *most* stuff in
 * the `defs` section, as it contains data that are mostly important to the editor. To keep
 * you away from the `defs` section and avoid some unnecessary JSON parsing, important data
 * from definitions is often duplicated in fields prefixed with a double underscore (eg.
 * `__identifier` or `__type`).  The 2 only definition types you might need here are
 * **Tilesets** and **Enums**.
 *
 * A structure containing all the definitions of this project
 */
export interface Definitions {
	/**
	 * All entities definitions, including their custom fields
	 */
	entities: EntityDefinition[];
	/**
	 * All internal enums
	 */
	enums: EnumDefinition[];
	/**
	 * Note: external enums are exactly the same as `enums`, except they have a `relPath` to
	 * point to an external source file.
	 */
	externalEnums: EnumDefinition[];
	/**
	 * All layer definitions
	 */
	layers: LayerDefinition[];
	/**
	 * All custom fields available to all levels.
	 */
	levelFields: FieldDefinition[];
	/**
	 * All tilesets
	 */
	tilesets: TilesetDefinition[];
}

export interface EntityDefinition {
	/**
	 * Base entity color
	 */
	color: string;
	/**
	 * User defined documentation for this element to provide help/tips to level designers.
	 */
	doc?: null | string;
	/**
	 * If enabled, all instances of this entity will be listed in the project "Table of content"
	 * object.
	 */
	exportToToc: boolean;
	/**
	 * Array of field definitions
	 */
	fieldDefs: FieldDefinition[];
	fillOpacity: number;
	/**
	 * Pixel height
	 */
	height: number;
	hollow: boolean;
	/**
	 * User defined unique identifier
	 */
	identifier: string;
	/**
	 * Only applies to entities resizable on both X/Y. If TRUE, the entity instance width/height
	 * will keep the same aspect ratio as the definition.
	 */
	keepAspectRatio: boolean;
	/**
	 * Possible values: `DiscardOldOnes`, `PreventAdding`, `MoveLastOne`
	 */
	limitBehavior: LimitBehavior;
	/**
	 * If TRUE, the maxCount is a "per world" limit, if FALSE, it's a "per level". Possible
	 * values: `PerLayer`, `PerLevel`, `PerWorld`
	 */
	limitScope: LimitScope;
	lineOpacity: number;
	/**
	 * Max instances count
	 */
	maxCount: number;
	/**
	 * An array of 4 dimensions for the up/right/down/left borders (in this order) when using
	 * 9-slice mode for `tileRenderMode`.<br/>  If the tileRenderMode is not NineSlice, then
	 * this array is empty.<br/>  See: https://en.wikipedia.org/wiki/9-slice_scaling
	 */
	nineSliceBorders: number[];
	/**
	 * Pivot X coordinate (from 0 to 1.0)
	 */
	pivotX: number;
	/**
	 * Pivot Y coordinate (from 0 to 1.0)
	 */
	pivotY: number;
	/**
	 * Possible values: `Rectangle`, `Ellipse`, `Tile`, `Cross`
	 */
	renderMode: RenderMode;
	/**
	 * If TRUE, the entity instances will be resizable horizontally
	 */
	resizableX: boolean;
	/**
	 * If TRUE, the entity instances will be resizable vertically
	 */
	resizableY: boolean;
	/**
	 * Display entity name in editor
	 */
	showName: boolean;
	/**
	 * An array of strings that classifies this entity
	 */
	tags: string[];
	/**
	 * **WARNING**: this deprecated value is no longer exported since version 1.2.0  Replaced
	 * by: `tileRect`
	 */
	tileId?: number | null;
	tileOpacity: number;
	/**
	 * An object representing a rectangle from an existing Tileset
	 */
	tileRect?: TilesetRectangle | null;
	/**
	 * An enum describing how the the Entity tile is rendered inside the Entity bounds. Possible
	 * values: `Cover`, `FitInside`, `Repeat`, `Stretch`, `FullSizeCropped`,
	 * `FullSizeUncropped`, `NineSlice`
	 */
	tileRenderMode: TileRenderMode;
	/**
	 * Tileset ID used for optional tile display
	 */
	tilesetId?: number | null;
	/**
	 * Unique Int identifier
	 */
	uid: number;
	/**
	 * Pixel width
	 */
	width: number;
}

/**
 * This section is mostly only intended for the LDtk editor app itself. You can safely
 * ignore it.
 */
export interface FieldDefinition {
	/**
	 * Human readable value type. Possible values: `Int, Float, String, Bool, Color,
	 * ExternEnum.XXX, LocalEnum.XXX, Point, FilePath`.<br/>  If the field is an array, this
	 * field will look like `Array<...>` (eg. `Array<Int>`, `Array<Point>` etc.)<br/>  NOTE: if
	 * you enable the advanced option **Use Multilines type**, you will have "*Multilines*"
	 * instead of "*String*" when relevant.
	 */
	__type: string;
	/**
	 * Optional list of accepted file extensions for FilePath value type. Includes the dot:
	 * `.ext`
	 */
	acceptFileTypes?: string[] | null;
	/**
	 * Possible values: `Any`, `OnlySame`, `OnlyTags`
	 */
	allowedRefs: AllowedRefs;
	allowedRefTags: string[];
	allowOutOfLevelRef: boolean;
	/**
	 * Array max length
	 */
	arrayMaxLength?: number | null;
	/**
	 * Array min length
	 */
	arrayMinLength?: number | null;
	autoChainRef: boolean;
	/**
	 * TRUE if the value can be null. For arrays, TRUE means it can contain null values
	 * (exception: array of Points can't have null values).
	 */
	canBeNull: boolean;
	/**
	 * Default value if selected value is null or invalid.
	 */
	defaultOverride?: any;
	/**
	 * User defined documentation for this field to provide help/tips to level designers about
	 * accepted values.
	 */
	doc?: null | string;
	editorAlwaysShow: boolean;
	editorCutLongValues: boolean;
	/**
	 * Possible values: `Hidden`, `ValueOnly`, `NameAndValue`, `EntityTile`, `Points`,
	 * `PointStar`, `PointPath`, `PointPathLoop`, `RadiusPx`, `RadiusGrid`,
	 * `ArrayCountWithLabel`, `ArrayCountNoLabel`, `RefLinkBetweenPivots`,
	 * `RefLinkBetweenCenters`
	 */
	editorDisplayMode: EditorDisplayMode;
	/**
	 * Possible values: `Above`, `Center`, `Beneath`
	 */
	editorDisplayPos: EditorDisplayPos;
	/**
	 * Possible values: `ZigZag`, `StraightArrow`, `CurvedArrow`, `ArrowsLine`, `DashedLine`
	 */
	editorLinkStyle: EditorLinkStyle;
	editorShowInWorld: boolean;
	editorTextPrefix?: null | string;
	editorTextSuffix?: null | string;
	/**
	 * User defined unique identifier
	 */
	identifier: string;
	/**
	 * TRUE if the value is an array of multiple values
	 */
	isArray: boolean;
	/**
	 * Max limit for value, if applicable
	 */
	max?: number | null;
	/**
	 * Min limit for value, if applicable
	 */
	min?: number | null;
	/**
	 * Optional regular expression that needs to be matched to accept values. Expected format:
	 * `/some_reg_ex/g`, with optional "i" flag.
	 */
	regex?: null | string;
	symmetricalRef: boolean;
	/**
	 * Possible values: &lt;`null`&gt;, `LangPython`, `LangRuby`, `LangJS`, `LangLua`, `LangC`,
	 * `LangHaxe`, `LangMarkdown`, `LangJson`, `LangXml`, `LangLog`
	 */
	textLanguageMode?: TextLanguageMode | null;
	/**
	 * UID of the tileset used for a Tile
	 */
	tilesetUid?: number | null;
	/**
	 * Internal enum representing the possible field types. Possible values: F_Int, F_Float,
	 * F_String, F_Text, F_Bool, F_Color, F_Enum(...), F_Point, F_Path, F_EntityRef, F_Tile
	 */
	type: string;
	/**
	 * Unique Int identifier
	 */
	uid: number;
	/**
	 * If TRUE, the color associated with this field will override the Entity or Level default
	 * color in the editor UI. For Enum fields, this would be the color associated to their
	 * values.
	 */
	useForSmartColor: boolean;
}

/**
 * Possible values: `Any`, `OnlySame`, `OnlyTags`
 */
export enum AllowedRefs {
	Any = 'Any',
	OnlySame = 'OnlySame',
	OnlyTags = 'OnlyTags',
}

/**
 * Possible values: `Hidden`, `ValueOnly`, `NameAndValue`, `EntityTile`, `Points`,
 * `PointStar`, `PointPath`, `PointPathLoop`, `RadiusPx`, `RadiusGrid`,
 * `ArrayCountWithLabel`, `ArrayCountNoLabel`, `RefLinkBetweenPivots`,
 * `RefLinkBetweenCenters`
 */
export enum EditorDisplayMode {
	ArrayCountNoLabel = 'ArrayCountNoLabel',
	ArrayCountWithLabel = 'ArrayCountWithLabel',
	EntityTile = 'EntityTile',
	Hidden = 'Hidden',
	NameAndValue = 'NameAndValue',
	PointPath = 'PointPath',
	PointPathLoop = 'PointPathLoop',
	PointStar = 'PointStar',
	Points = 'Points',
	RadiusGrid = 'RadiusGrid',
	RadiusPx = 'RadiusPx',
	RefLinkBetweenCenters = 'RefLinkBetweenCenters',
	RefLinkBetweenPivots = 'RefLinkBetweenPivots',
	ValueOnly = 'ValueOnly',
}

/**
 * Possible values: `Above`, `Center`, `Beneath`
 */
export enum EditorDisplayPos {
	Above = 'Above',
	Beneath = 'Beneath',
	Center = 'Center',
}

/**
 * Possible values: `ZigZag`, `StraightArrow`, `CurvedArrow`, `ArrowsLine`, `DashedLine`
 */
export enum EditorLinkStyle {
	ArrowsLine = 'ArrowsLine',
	CurvedArrow = 'CurvedArrow',
	DashedLine = 'DashedLine',
	StraightArrow = 'StraightArrow',
	ZigZag = 'ZigZag',
}

export enum TextLanguageMode {
	LangC = 'LangC',
	LangHaxe = 'LangHaxe',
	LangJS = 'LangJS',
	LangJSON = 'LangJson',
	LangLog = 'LangLog',
	LangLua = 'LangLua',
	LangMarkdown = 'LangMarkdown',
	LangPython = 'LangPython',
	LangRuby = 'LangRuby',
	LangXML = 'LangXml',
}

/**
 * Possible values: `DiscardOldOnes`, `PreventAdding`, `MoveLastOne`
 */
export enum LimitBehavior {
	DiscardOldOnes = 'DiscardOldOnes',
	MoveLastOne = 'MoveLastOne',
	PreventAdding = 'PreventAdding',
}

/**
 * If TRUE, the maxCount is a "per world" limit, if FALSE, it's a "per level". Possible
 * values: `PerLayer`, `PerLevel`, `PerWorld`
 */
export enum LimitScope {
	PerLayer = 'PerLayer',
	PerLevel = 'PerLevel',
	PerWorld = 'PerWorld',
}

/**
 * Possible values: `Rectangle`, `Ellipse`, `Tile`, `Cross`
 */
export enum RenderMode {
	Cross = 'Cross',
	Ellipse = 'Ellipse',
	Rectangle = 'Rectangle',
	Tile = 'Tile',
}

/**
 * This object represents a custom sub rectangle in a Tileset image.
 */
export interface TilesetRectangle {
	/**
	 * Height in pixels
	 */
	h: number;
	/**
	 * UID of the tileset
	 */
	tilesetUid: number;
	/**
	 * Width in pixels
	 */
	w: number;
	/**
	 * X pixels coordinate of the top-left corner in the Tileset image
	 */
	x: number;
	/**
	 * Y pixels coordinate of the top-left corner in the Tileset image
	 */
	y: number;
}

/**
 * An enum describing how the the Entity tile is rendered inside the Entity bounds. Possible
 * values: `Cover`, `FitInside`, `Repeat`, `Stretch`, `FullSizeCropped`,
 * `FullSizeUncropped`, `NineSlice`
 */
export enum TileRenderMode {
	Cover = 'Cover',
	FitInside = 'FitInside',
	FullSizeCropped = 'FullSizeCropped',
	FullSizeUncropped = 'FullSizeUncropped',
	NineSlice = 'NineSlice',
	Repeat = 'Repeat',
	Stretch = 'Stretch',
}

export interface EnumDefinition {
	externalFileChecksum?: null | string;
	/**
	 * Relative path to the external file providing this Enum
	 */
	externalRelPath?: null | string;
	/**
	 * Tileset UID if provided
	 */
	iconTilesetUid?: number | null;
	/**
	 * User defined unique identifier
	 */
	identifier: string;
	/**
	 * An array of user-defined tags to organize the Enums
	 */
	tags: string[];
	/**
	 * Unique Int identifier
	 */
	uid: number;
	/**
	 * All possible enum values, with their optional Tile infos.
	 */
	values: EnumValueDefinition[];
}

export interface EnumValueDefinition {
	/**
	 * An array of 4 Int values that refers to the tile in the tileset image: `[ x, y, width,
	 * height ]`
	 */
	__tileSrcRect?: number[] | null;
	/**
	 * Optional color
	 */
	color: number;
	/**
	 * Enum value
	 */
	id: string;
	/**
	 * The optional ID of the tile
	 */
	tileId?: number | null;
}

export interface LayerDefinition {
	/**
	 * Type of the layer (*IntGrid, Entities, Tiles or AutoLayer*)
	 */
	__type: string;
	/**
	 * Contains all the auto-layer rule definitions.
	 */
	autoRuleGroups: AutoLayerRuleGroup[];
	autoSourceLayerDefUid?: number | null;
	/**
	 * **WARNING**: this deprecated value is no longer exported since version 1.2.0  Replaced
	 * by: `tilesetDefUid`
	 */
	autoTilesetDefUid?: number | null;
	/**
	 * Allow editor selections when the layer is not currently active.
	 */
	canSelectWhenInactive: boolean;
	/**
	 * Opacity of the layer (0 to 1.0)
	 */
	displayOpacity: number;
	/**
	 * User defined documentation for this element to provide help/tips to level designers.
	 */
	doc?: null | string;
	/**
	 * An array of tags to forbid some Entities in this layer
	 */
	excludedTags: string[];
	/**
	 * Width and height of the grid in pixels
	 */
	gridSize: number;
	/**
	 * Height of the optional "guide" grid in pixels
	 */
	guideGridHei: number;
	/**
	 * Width of the optional "guide" grid in pixels
	 */
	guideGridWid: number;
	hideFieldsWhenInactive: boolean;
	/**
	 * Hide the layer from the list on the side of the editor view.
	 */
	hideInList: boolean;
	/**
	 * User defined unique identifier
	 */
	identifier: string;
	/**
	 * Alpha of this layer when it is not the active one.
	 */
	inactiveOpacity: number;
	/**
	 * An array that defines extra optional info for each IntGrid value.<br/>  WARNING: the
	 * array order is not related to actual IntGrid values! As user can re-order IntGrid values
	 * freely, you may value "2" before value "1" in this array.
	 */
	intGridValues: IntGridValueDefinition[];
	/**
	 * Parallax horizontal factor (from -1 to 1, defaults to 0) which affects the scrolling
	 * speed of this layer, creating a fake 3D (parallax) effect.
	 */
	parallaxFactorX: number;
	/**
	 * Parallax vertical factor (from -1 to 1, defaults to 0) which affects the scrolling speed
	 * of this layer, creating a fake 3D (parallax) effect.
	 */
	parallaxFactorY: number;
	/**
	 * If true (default), a layer with a parallax factor will also be scaled up/down accordingly.
	 */
	parallaxScaling: boolean;
	/**
	 * X offset of the layer, in pixels (IMPORTANT: this should be added to the `LayerInstance`
	 * optional offset)
	 */
	pxOffsetX: number;
	/**
	 * Y offset of the layer, in pixels (IMPORTANT: this should be added to the `LayerInstance`
	 * optional offset)
	 */
	pxOffsetY: number;
	/**
	 * An array of tags to filter Entities that can be added to this layer
	 */
	requiredTags: string[];
	/**
	 * If the tiles are smaller or larger than the layer grid, the pivot value will be used to
	 * position the tile relatively its grid cell.
	 */
	tilePivotX: number;
	/**
	 * If the tiles are smaller or larger than the layer grid, the pivot value will be used to
	 * position the tile relatively its grid cell.
	 */
	tilePivotY: number;
	/**
	 * Reference to the default Tileset UID being used by this layer definition.<br/>
	 * **WARNING**: some layer *instances* might use a different tileset. So most of the time,
	 * you should probably use the `__tilesetDefUid` value found in layer instances.<br/>  Note:
	 * since version 1.0.0, the old `autoTilesetDefUid` was removed and merged into this value.
	 */
	tilesetDefUid?: number | null;
	/**
	 * Type of the layer as Haxe Enum Possible values: `IntGrid`, `Entities`, `Tiles`,
	 * `AutoLayer`
	 */
	type: Type;
	/**
	 * Unique Int identifier
	 */
	uid: number;
}

/**
 * IntGrid value definition
 */
export interface IntGridValueDefinition {
	color: string;
	/**
	 * User defined unique identifier
	 */
	identifier?: null | string;
	/**
	 * The IntGrid value itself
	 */
	value: number;
}

/**
 * Type of the layer as Haxe Enum Possible values: `IntGrid`, `Entities`, `Tiles`,
 * `AutoLayer`
 */
export enum Type {
	AutoLayer = 'AutoLayer',
	Entities = 'Entities',
	IntGrid = 'IntGrid',
	Tiles = 'Tiles',
}

/**
 * The `Tileset` definition is the most important part among project definitions. It
 * contains some extra informations about each integrated tileset. If you only had to parse
 * one definition section, that would be the one.
 */
export interface TilesetDefinition {
	/**
	 * Grid-based height
	 */
	__cHei: number;
	/**
	 * Grid-based width
	 */
	__cWid: number;
	/**
	 * The following data is used internally for various optimizations. It's always synced with
	 * source image changes.
	 */
	cachedPixelData?: { [key: string]: any } | null;
	/**
	 * An array of custom tile metadata
	 */
	customData: TileCustomMetadata[];
	/**
	 * If this value is set, then it means that this atlas uses an internal LDtk atlas image
	 * instead of a loaded one. Possible values: &lt;`null`&gt;, `LdtkIcons`
	 */
	embedAtlas?: EmbedAtlas | null;
	/**
	 * Tileset tags using Enum values specified by `tagsSourceEnumId`. This array contains 1
	 * element per Enum value, which contains an array of all Tile IDs that are tagged with it.
	 */
	enumTags: EnumTagValue[];
	/**
	 * User defined unique identifier
	 */
	identifier: string;
	/**
	 * Distance in pixels from image borders
	 */
	padding: number;
	/**
	 * Image height in pixels
	 */
	pxHei: number;
	/**
	 * Image width in pixels
	 */
	pxWid: number;
	/**
	 * Path to the source file, relative to the current project JSON file<br/>  It can be null
	 * if no image was provided, or when using an embed atlas.
	 */
	relPath?: null | string;
	/**
	 * Array of group of tiles selections, only meant to be used in the editor
	 */
	savedSelections: { [key: string]: any }[];
	/**
	 * Space in pixels between all tiles
	 */
	spacing: number;
	/**
	 * An array of user-defined tags to organize the Tilesets
	 */
	tags: string[];
	/**
	 * Optional Enum definition UID used for this tileset meta-data
	 */
	tagsSourceEnumUid?: number | null;
	tileGridSize: number;
	/**
	 * Unique Intidentifier
	 */
	uid: number;
}

/**
 * In a tileset definition, user defined meta-data of a tile.
 */
export interface TileCustomMetadata {
	data: string;
	tileId: number;
}

export enum EmbedAtlas {
	LdtkIcons = 'LdtkIcons',
}

/**
 * In a tileset definition, enum based tag infos
 */
export interface EnumTagValue {
	enumValueId: string;
	tileIds: number[];
}

export interface EntityInstance {
	/**
	 * Grid-based coordinates (`[x,y]` format)
	 */
	__grid: number[];
	/**
	 * Entity definition identifier
	 */
	__identifier: string;
	/**
	 * Pivot coordinates  (`[x,y]` format, values are from 0 to 1) of the Entity
	 */
	__pivot: number[];
	/**
	 * The entity "smart" color, guessed from either Entity definition, or one its field
	 * instances.
	 */
	__smartColor: string;
	/**
	 * Array of tags defined in this Entity definition
	 */
	__tags: string[];
	/**
	 * Optional TilesetRect used to display this entity (it could either be the default Entity
	 * tile, or some tile provided by a field value, like an Enum).
	 */
	__tile?: TilesetRectangle | null;
	/**
	 * Reference of the **Entity definition** UID
	 */
	defUid: number;
	/**
	 * An array of all custom fields and their values.
	 */
	fieldInstances: FieldInstance[];
	/**
	 * Entity height in pixels. For non-resizable entities, it will be the same as Entity
	 * definition.
	 */
	height: number;
	/**
	 * Unique instance identifier
	 */
	iid: string;
	/**
	 * Pixel coordinates (`[x,y]` format) in current level coordinate space. Don't forget
	 * optional layer offsets, if they exist!
	 */
	px: number[];
	/**
	 * Entity width in pixels. For non-resizable entities, it will be the same as Entity
	 * definition.
	 */
	width: number;
}

export interface FieldInstance {
	/**
	 * Field definition identifier
	 */
	__identifier: string;
	/**
	 * Optional TilesetRect used to display this field (this can be the field own Tile, or some
	 * other Tile guessed from the value, like an Enum).
	 */
	__tile?: TilesetRectangle | null;
	/**
	 * Type of the field, such as `Int`, `Float`, `String`, `Enum(my_enum_name)`, `Bool`,
	 * etc.<br/>  NOTE: if you enable the advanced option **Use Multilines type**, you will have
	 * "*Multilines*" instead of "*String*" when relevant.
	 */
	__type: string;
	/**
	 * Actual value of the field instance. The value type varies, depending on `__type`:<br/>
	 * - For **classic types** (ie. Integer, Float, Boolean, String, Text and FilePath), you
	 * just get the actual value with the expected type.<br/>   - For **Color**, the value is an
	 * hexadecimal string using "#rrggbb" format.<br/>   - For **Enum**, the value is a String
	 * representing the selected enum value.<br/>   - For **Point**, the value is a
	 * [GridPoint](#ldtk-GridPoint) object.<br/>   - For **Tile**, the value is a
	 * [TilesetRect](#ldtk-TilesetRect) object.<br/>   - For **EntityRef**, the value is an
	 * [EntityReferenceInfos](#ldtk-EntityReferenceInfos) object.<br/><br/>  If the field is an
	 * array, then this `__value` will also be a JSON array.
	 */
	__value: any;
	/**
	 * Reference of the **Field definition** UID
	 */
	defUid: number;
	/**
	 * Editor internal raw values
	 */
	realEditorValues: any[];
}

/**
 * This object describes the "location" of an Entity instance in the project worlds.
 */
export interface ReferenceToAnEntityInstance {
	/**
	 * IID of the refered EntityInstance
	 */
	entityIid: string;
	/**
	 * IID of the LayerInstance containing the refered EntityInstance
	 */
	layerIid: string;
	/**
	 * IID of the Level containing the refered EntityInstance
	 */
	levelIid: string;
	/**
	 * IID of the World containing the refered EntityInstance
	 */
	worldIid: string;
}

/**
 * This object is just a grid-based coordinate used in Field values.
 */
export interface GridPoint {
	/**
	 * X grid-based coordinate
	 */
	cx: number;
	/**
	 * Y grid-based coordinate
	 */
	cy: number;
}

/**
 * IntGrid value instance
 */
export interface IntGridValueInstance {
	/**
	 * Coordinate ID in the layer grid
	 */
	coordId: number;
	/**
	 * IntGrid value
	 */
	v: number;
}

export interface LayerInstance {
	/**
	 * Grid-based height
	 */
	__cHei: number;
	/**
	 * Grid-based width
	 */
	__cWid: number;
	/**
	 * Grid size
	 */
	__gridSize: number;
	/**
	 * Layer definition identifier
	 */
	__identifier: string;
	/**
	 * Layer opacity as Float [0-1]
	 */
	__opacity: number;
	/**
	 * Total layer X pixel offset, including both instance and definition offsets.
	 */
	__pxTotalOffsetX: number;
	/**
	 * Total layer Y pixel offset, including both instance and definition offsets.
	 */
	__pxTotalOffsetY: number;
	/**
	 * The definition UID of corresponding Tileset, if any.
	 */
	__tilesetDefUid?: number | null;
	/**
	 * The relative path to corresponding Tileset, if any.
	 */
	__tilesetRelPath?: null | string;
	/**
	 * Layer type (possible values: IntGrid, Entities, Tiles or AutoLayer)
	 */
	__type: string;
	/**
	 * An array containing all tiles generated by Auto-layer rules. The array is already sorted
	 * in display order (ie. 1st tile is beneath 2nd, which is beneath 3rd etc.).<br/><br/>
	 * Note: if multiple tiles are stacked in the same cell as the result of different rules,
	 * all tiles behind opaque ones will be discarded.
	 */
	autoLayerTiles: TileInstance[];
	entityInstances: EntityInstance[];
	gridTiles: TileInstance[];
	/**
	 * Unique layer instance identifier
	 */
	iid: string;
	/**
	 * **WARNING**: this deprecated value is no longer exported since version 1.0.0  Replaced
	 * by: `intGridCsv`
	 */
	intGrid?: IntGridValueInstance[] | null;
	/**
	 * A list of all values in the IntGrid layer, stored in CSV format (Comma Separated
	 * Values).<br/>  Order is from left to right, and top to bottom (ie. first row from left to
	 * right, followed by second row, etc).<br/>  `0` means "empty cell" and IntGrid values
	 * start at 1.<br/>  The array size is `__cWid` x `__cHei` cells.
	 */
	intGridCsv: number[];
	/**
	 * Reference the Layer definition UID
	 */
	layerDefUid: number;
	/**
	 * Reference to the UID of the level containing this layer instance
	 */
	levelId: number;
	/**
	 * An Array containing the UIDs of optional rules that were enabled in this specific layer
	 * instance.
	 */
	optionalRules: number[];
	/**
	 * This layer can use another tileset by overriding the tileset UID here.
	 */
	overrideTilesetUid?: number | null;
	/**
	 * X offset in pixels to render this layer, usually 0 (IMPORTANT: this should be added to
	 * the `LayerDef` optional offset, so you should probably prefer using `__pxTotalOffsetX`
	 * which contains the total offset value)
	 */
	pxOffsetX: number;
	/**
	 * Y offset in pixels to render this layer, usually 0 (IMPORTANT: this should be added to
	 * the `LayerDef` optional offset, so you should probably prefer using `__pxTotalOffsetX`
	 * which contains the total offset value)
	 */
	pxOffsetY: number;
	/**
	 * Random seed used for Auto-Layers rendering
	 */
	seed: number;
	/**
	 * Layer instance visibility
	 */
	visible: boolean;
}

/**
 * This structure represents a single tile from a given Tileset.
 */
export interface TileInstance {
	/**
	 * Internal data used by the editor.<br/>  For auto-layer tiles: `[ruleId, coordId]`.<br/>
	 * For tile-layer tiles: `[coordId]`.
	 */
	d: number[];
	/**
	 * "Flip bits", a 2-bits integer to represent the mirror transformations of the tile.<br/>
	 * - Bit 0 = X flip<br/>   - Bit 1 = Y flip<br/>   Examples: f=0 (no flip), f=1 (X flip
	 * only), f=2 (Y flip only), f=3 (both flips)
	 */
	f: number;
	/**
	 * Pixel coordinates of the tile in the **layer** (`[x,y]` format). Don't forget optional
	 * layer offsets, if they exist!
	 */
	px: number[];
	/**
	 * Pixel coordinates of the tile in the **tileset** (`[x,y]` format)
	 */
	src: number[];
	/**
	 * The *Tile ID* in the corresponding tileset.
	 */
	t: number;
}

/**
 * This section contains all the level data. It can be found in 2 distinct forms, depending
 * on Project current settings:  - If "*Separate level files*" is **disabled** (default):
 * full level data is *embedded* inside the main Project JSON file, - If "*Separate level
 * files*" is **enabled**: level data is stored in *separate* standalone `.ldtkl` files (one
 * per level). In this case, the main Project JSON file will still contain most level data,
 * except heavy sections, like the `layerInstances` array (which will be null). The
 * `externalRelPath` string points to the `ldtkl` file.  A `ldtkl` file is just a JSON file
 * containing exactly what is described below.
 */
export interface Level {
	/**
	 * Background color of the level (same as `bgColor`, except the default value is
	 * automatically used here if its value is `null`)
	 */
	__bgColor: string;
	/**
	 * Position informations of the background image, if there is one.
	 */
	__bgPos?: LevelBackgroundPosition | null;
	/**
	 * An array listing all other levels touching this one on the world map.<br/>  Only relevant
	 * for world layouts where level spatial positioning is manual (ie. GridVania, Free). For
	 * Horizontal and Vertical layouts, this array is always empty.
	 */
	__neighbours: NeighbourLevel[];
	/**
	 * The "guessed" color for this level in the editor, decided using either the background
	 * color or an existing custom field.
	 */
	__smartColor: string;
	/**
	 * Background color of the level. If `null`, the project `defaultLevelBgColor` should be
	 * used.
	 */
	bgColor?: null | string;
	/**
	 * Background image X pivot (0-1)
	 */
	bgPivotX: number;
	/**
	 * Background image Y pivot (0-1)
	 */
	bgPivotY: number;
	/**
	 * An enum defining the way the background image (if any) is positioned on the level. See
	 * `__bgPos` for resulting position info. Possible values: &lt;`null`&gt;, `Unscaled`,
	 * `Contain`, `Cover`, `CoverDirty`
	 */
	bgPos?: BgPos | null;
	/**
	 * The *optional* relative path to the level background image.
	 */
	bgRelPath?: null | string;
	/**
	 * This value is not null if the project option "*Save levels separately*" is enabled. In
	 * this case, this **relative** path points to the level Json file.
	 */
	externalRelPath?: null | string;
	/**
	 * An array containing this level custom field values.
	 */
	fieldInstances: FieldInstance[];
	/**
	 * User defined unique identifier
	 */
	identifier: string;
	/**
	 * Unique instance identifier
	 */
	iid: string;
	/**
	 * An array containing all Layer instances. **IMPORTANT**: if the project option "*Save
	 * levels separately*" is enabled, this field will be `null`.<br/>  This array is **sorted
	 * in display order**: the 1st layer is the top-most and the last is behind.
	 */
	layerInstances?: LayerInstance[] | null;
	/**
	 * Height of the level in pixels
	 */
	pxHei: number;
	/**
	 * Width of the level in pixels
	 */
	pxWid: number;
	/**
	 * Unique Int identifier
	 */
	uid: number;
	/**
	 * If TRUE, the level identifier will always automatically use the naming pattern as defined
	 * in `Project.levelNamePattern`. Becomes FALSE if the identifier is manually modified by
	 * user.
	 */
	useAutoIdentifier: boolean;
	/**
	 * Index that represents the "depth" of the level in the world. Default is 0, greater means
	 * "above", lower means "below".<br/>  This value is mostly used for display only and is
	 * intended to make stacking of levels easier to manage.
	 */
	worldDepth: number;
	/**
	 * World X coordinate in pixels.<br/>  Only relevant for world layouts where level spatial
	 * positioning is manual (ie. GridVania, Free). For Horizontal and Vertical layouts, the
	 * value is always -1 here.
	 */
	worldX: number;
	/**
	 * World Y coordinate in pixels.<br/>  Only relevant for world layouts where level spatial
	 * positioning is manual (ie. GridVania, Free). For Horizontal and Vertical layouts, the
	 * value is always -1 here.
	 */
	worldY: number;
}

/**
 * Level background image position info
 */
export interface LevelBackgroundPosition {
	/**
	 * An array of 4 float values describing the cropped sub-rectangle of the displayed
	 * background image. This cropping happens when original is larger than the level bounds.
	 * Array format: `[ cropX, cropY, cropWidth, cropHeight ]`
	 */
	cropRect: number[];
	/**
	 * An array containing the `[scaleX,scaleY]` values of the **cropped** background image,
	 * depending on `bgPos` option.
	 */
	scale: number[];
	/**
	 * An array containing the `[x,y]` pixel coordinates of the top-left corner of the
	 * **cropped** background image, depending on `bgPos` option.
	 */
	topLeftPx: number[];
}

/**
 * Nearby level info
 */
export interface NeighbourLevel {
	/**
	 * A single lowercase character tipping on the level location (`n`orth, `s`outh, `w`est,
	 * `e`ast).
	 */
	dir: string;
	/**
	 * Neighbour Instance Identifier
	 */
	levelIid: string;
	/**
	 * **WARNING**: this deprecated value is no longer exported since version 1.2.0  Replaced
	 * by: `levelIid`
	 */
	levelUid?: number | null;
}

export enum BgPos {
	Contain = 'Contain',
	Cover = 'Cover',
	CoverDirty = 'CoverDirty',
	Unscaled = 'Unscaled',
}

export interface LdtkTableOfContentEntry {
	identifier: string;
	instances: ReferenceToAnEntityInstance[];
}

/**
 * **IMPORTANT**: this type is not used *yet* in current LDtk version. It's only presented
 * here as a preview of a planned feature.  A World contains multiple levels, and it has its
 * own layout settings.
 */
export interface World {
	/**
	 * Default new level height
	 */
	defaultLevelHeight: number;
	/**
	 * Default new level width
	 */
	defaultLevelWidth: number;
	/**
	 * User defined unique identifier
	 */
	identifier: string;
	/**
	 * Unique instance identifer
	 */
	iid: string;
	/**
	 * All levels from this world. The order of this array is only relevant in
	 * `LinearHorizontal` and `linearVertical` world layouts (see `worldLayout` value).
	 * Otherwise, you should refer to the `worldX`,`worldY` coordinates of each Level.
	 */
	levels: Level[];
	/**
	 * Height of the world grid in pixels.
	 */
	worldGridHeight: number;
	/**
	 * Width of the world grid in pixels.
	 */
	worldGridWidth: number;
	/**
	 * An enum that describes how levels are organized in this project (ie. linearly or in a 2D
	 * space). Possible values: `Free`, `GridVania`, `LinearHorizontal`, `LinearVertical`, `null`
	 */
	worldLayout: WorldLayout | null;
}

export enum WorldLayout {
	Free = 'Free',
	GridVania = 'GridVania',
	LinearHorizontal = 'LinearHorizontal',
	LinearVertical = 'LinearVertical',
}

export enum Flag {
	DiscardPreCSVIntGrid = 'DiscardPreCsvIntGrid',
	ExportPreCSVIntGridFormat = 'ExportPreCsvIntGridFormat',
	IgnoreBackupSuggest = 'IgnoreBackupSuggest',
	MultiWorlds = 'MultiWorlds',
	PrependIndexToLevelFileNames = 'PrependIndexToLevelFileNames',
	UseMultilinesType = 'UseMultilinesType',
}

/**
 * Naming convention for Identifiers (first-letter uppercase, full uppercase etc.) Possible
 * values: `Capitalize`, `Uppercase`, `Lowercase`, `Free`
 */
export enum IdentifierStyle {
	Capitalize = 'Capitalize',
	Free = 'Free',
	Lowercase = 'Lowercase',
	Uppercase = 'Uppercase',
}

/**
 * "Image export" option when saving project. Possible values: `None`, `OneImagePerLayer`,
 * `OneImagePerLevel`, `LayersAndLevels`
 */
export enum ImageExportMode {
	LayersAndLevels = 'LayersAndLevels',
	None = 'None',
	OneImagePerLayer = 'OneImagePerLayer',
	OneImagePerLevel = 'OneImagePerLevel',
}
