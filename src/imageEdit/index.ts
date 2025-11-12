// 统一导出图像编辑核心功能
export * from "./models.js";
export * from "./core.js";

// 重新导出类型和函数，保持向后兼容
export type { ImageEditModel } from "./models";
export type {
	ImageEditFunction,
	ImageEditRequest,
	ImageEditResponse,
	ImageEditResult,
} from "./core";

export {
	imageEditModels,
	getAllModels,
	getRecommendedModels,
	getModelsByCapability,
	getAllCapabilities,
	getModelByName,
} from "./models.js";

export {
	ImageEditCore,
	createImageEditCore,
} from "./core.js";

// 导出状态查询功能
export { createImageEditStatusCore, ImageEditStatusCore } from "./status.js";
export type {
	ImageEditStatusRequest,
	ImageEditStatusResult,
	ImageEditStatusResponse,
} from "./status";
