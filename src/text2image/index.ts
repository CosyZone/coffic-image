// 统一导出文本转图像核心功能
export * from "./models.js";
export * from "./types.js";
export * from "./core.js";

// 重新导出类型和函数，保持向后兼容
export type { ModelInfo } from "./models";
export type {
	TaskResult,
	TaskMetrics,
	TaskOutput,
	TaskStatusResponse,
	DashScopeResponse,
	Text2ImageRequest,
	Text2ImageStatusRequest,
} from "./types";

export { text2imageModels } from "./models.js";

export {
	Text2ImageCore,
	createText2ImageCore,
} from "./core.js";
