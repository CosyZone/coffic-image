import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { imageEdit } from "@coffic/image";

// 获取模型详细信息的 Astro action
export const getModelDetails = defineAction({
	accept: "json",
	input: z.object({
		modelName: z.string().describe("模型名称"),
	}),
	handler: async (input) => {
		try {
			const { modelName } = input;

			// 查找指定名称的模型
			const model = imageEdit.getModelByName(modelName);

			if (!model) {
				throw new Error("未找到指定模型");
			}

			return {
				message: "查询成功",
				model: model,
			};
		} catch (error) {
			console.error("查询模型详情失败:", error);
			throw new Error(
				`查询模型详情失败: ${error instanceof Error ? error.message : "未知错误"}`,
			);
		}
	},
});
