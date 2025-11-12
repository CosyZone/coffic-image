export interface ModelInfo {
	id: string;
	name: string;
	version: string;
	type: string;
	description: string;
	recommended: boolean;
}

const models: ModelInfo[] = [
	{
		id: "wan2.5-t2i-preview",
		name: "wan2.5-t2i-preview",
		version: "2.5",
		type: "专业版",
		description:
			"通义万相2.5-文生图-Preview，全新升级模型架构。画面美学、设计感、真实质感显著提升，精准指令遵循，擅长中英文和小语种文字生成，支持复杂结构化长文本和图表、架构图等内容生成。",
		recommended: true,
	},
	{
		id: "wan2.2-t2i-flash",
		name: "wan2.2-t2i-flash",
		version: "2.2",
		type: "极速版",
		description:
			"万相2.2极速版。在创意性、稳定性、写实质感上全面升级，生成速度快，性价比高。",
		recommended: true,
	},
	{
		id: "wan2.2-t2i-plus",
		name: "wan2.2-t2i-plus",
		version: "2.2",
		type: "专业版",
		description:
			"万相2.2专业版，当前最新模型。在创意性、稳定性、写实质感上全面升级，生成细节丰富。",
		recommended: true,
	},
	{
		id: "wanx2.1-t2i-turbo",
		name: "wanx2.1-t2i-turbo",
		version: "2.1",
		type: "极速版",
		description: "万相2.1极速版。生成速度快，效果均衡。",
		recommended: false,
	},
	{
		id: "wanx2.1-t2i-plus",
		name: "wanx2.1-t2i-plus",
		version: "2.1",
		type: "专业版",
		description: "万相2.1专业版。生成图像细节更丰富，速度稍慢。",
		recommended: false,
	},
	{
		id: "wanx2.0-t2i-turbo",
		name: "wanx2.0-t2i-turbo",
		version: "2.0",
		type: "极速版",
		description: "万相2.0极速版。擅长质感人像与创意设计，性价比高。",
		recommended: false,
	},
	{
		id: "wanx-v1",
		name: "wanx-v1",
		version: "2.0",
		type: "极速版",
		description: "通义万相-文本生成图像大模型，支持中英文双语输入，重点风格包括但不限于水彩、油画、中国画、素描、扁平插画、二次元、3D卡通",
		recommended: false,
	},
];

// 导出模型数据
export const text2imageModels = models;
