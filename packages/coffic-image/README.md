# @coffic/image

一个强大的图片处理 SDK，提供图片编辑和图片生成功能，基于阿里云 DashScope API。

## 功能特性

### 🎨 图片编辑

- **整体风格化** - 将整张图片转换为指定风格
- **局部风格化** - 将图片的特定部分转换为指定风格
- **指令编辑** - 根据文字描述修改图片中的特定内容
- **局部重绘** - 根据文字描述和蒙版指定区域进行精确重绘
- **图像修复** - 修复图片中的缺陷
- **去文字水印** - 去除图片中的水印和文字
- **扩图** - 向四个方向扩展图片，支持自定义缩放比例
- **图像超分** - 提高图片分辨率，支持自定义放大倍数
- **图像上色** - 为黑白图片添加颜色
- **线稿生图** - 将线稿或涂鸦转换为完整的图片
- **卡通形象控制** - 支持参考卡通形象生成图像

### 🖼️ 文本转图片

- 根据文字描述生成高质量图片
- 支持多种模型和尺寸
- 支持批量生成
- 异步任务处理

## 安装

```bash
npm install @coffic/image
# 或
yarn add @coffic/image
# 或
pnpm add @coffic/image
```

## 快速开始

### 图片编辑

```typescript
import { imageEdit } from '@coffic/image';

// 创建图片编辑实例
const imageEditCore = imageEdit.createImageEditCore('your-dashscope-api-key');

// 执行图片编辑
const result = await imageEditCore.editImage({
  imageUrl: 'https://example.com/image.jpg',
  prompt: '将图片转换为水彩画风格',
  function: 'stylization_all',
  n: 1,
});

if (result.success) {
  console.log('任务已提交，任务ID:', result.taskId);
  
  // 查询任务状态
  const statusCore = imageEdit.createImageEditStatusCore('your-dashscope-api-key');
  const status = await statusCore.queryStatus({
    taskId: result.taskId!,
    dashScopeApiKey: 'your-dashscope-api-key',
  });
  
  if (status.success && status.images) {
    console.log('生成的图片:', status.images);
  }
}
```

### 文本转图片

```typescript
import { text2image } from '@coffic/image';

// 创建文本转图片实例
const text2imageCore = text2image.createText2ImageCore('your-dashscope-api-key');

// 创建生成任务
const response = await text2imageCore.createTask({
  prompt: '一只可爱的小猫坐在窗台上，阳光洒在它的身上',
  size: '1024*1024',
  n: 1,
  model: 'wan2.2-t2i-plus',
});

console.log('任务ID:', response.output.task_id);

// 查询任务状态
const status = await text2imageCore.getTaskStatus({
  task_id: response.output.task_id,
  dashScopeApiKey: 'your-dashscope-api-key',
});

if (status.output.task_status === 'SUCCEEDED') {
  console.log('生成的图片:', status.output.results);
}
```

## API 文档

### 图片编辑 (imageEdit)

#### `createImageEditCore(apiKey: string): ImageEditCore`

创建图片编辑核心实例。

#### `ImageEditCore.editImage(request: ImageEditRequest): Promise<ImageEditResult>`

执行图片编辑任务。

**参数：**

- `imageUrl` (string, 必需) - 输入图像的 URL 或 Base64 编码数据
- `prompt` (string, 必需) - 编辑指令描述，最多 800 个字符
- `function` (ImageEditFunction, 可选) - 编辑功能类型，默认为 `stylization_all`
- `maskUrl` (string, 可选) - 蒙版图片 URL，用于指定编辑区域
- `n` (number, 可选) - 生成图片数量，默认 1，范围 1-4
- `topScale` / `bottomScale` / `leftScale` / `rightScale` (number, 可选) - 扩图功能的缩放比例，默认 1.5
- `upscaleFactor` (number, 可选) - 图像超分的放大倍数，默认 2，范围 2-4
- `model` (string, 可选) - 使用的图像编辑模型
- `dashScopeApiKey` (string, 可选) - DashScope API 密钥，如果不提供则使用构造函数中的密钥

**支持的编辑功能：**

- `stylization_all` - 整体风格化
- `stylization_local` - 局部风格化
- `description_edit` - 指令编辑
- `description_edit_with_mask` - 局部重绘
- `remove_watermark` - 去文字水印
- `inpainting` - 图像修复
- `expand` - 扩图
- `super_resolution` - 图像超分
- `colorization` - 图像上色
- `doodle` - 线稿生图
- `control_cartoon_feature` - 卡通形象控制

#### `createImageEditStatusCore(apiKey?: string): ImageEditStatusCore`

创建图片编辑状态查询实例。

#### `ImageEditStatusCore.queryStatus(request: ImageEditStatusRequest): Promise<ImageEditStatusResult>`

查询图片编辑任务状态。

**参数：**

- `taskId` (string, 必需) - 图像编辑任务的 ID
- `dashScopeApiKey` (string, 可选) - DashScope API 密钥

#### 模型查询函数

```typescript
// 获取所有模型
const models = imageEdit.getAllModels();

// 获取推荐模型
const recommended = imageEdit.getRecommendedModels();

// 按功能筛选模型
const modelsByCapability = imageEdit.getModelsByCapability('风格化');

// 获取所有支持的功能
const capabilities = imageEdit.getAllCapabilities();

// 根据名称获取模型
const model = imageEdit.getModelByName('wanx2.1-imageedit');
```

### 文本转图片 (text2image)

#### `createText2ImageCore(apiKey: string): Text2ImageCore`

创建文本转图片核心实例。

#### `Text2ImageCore.createTask(request: Text2ImageRequest): Promise<DashScopeResponse>`

创建文本转图片任务。

**参数：**

- `prompt` (string, 必需) - 文字描述，最多 800 个字符
- `size` (string, 可选) - 图像尺寸，默认 `1024*1024`，范围 [512, 1440]
- `n` (number, 可选) - 生成图片数量，默认 1
- `model` (string, 可选) - 使用的模型，默认 `wan2.2-t2i-plus`
- `dashScopeApiKey` (string, 可选) - DashScope API 密钥

#### `Text2ImageCore.getTaskStatus(request: Text2ImageStatusRequest): Promise<TaskStatusResponse>`

查询文本转图片任务状态。

**参数：**

- `task_id` (string, 必需) - 任务 ID
- `dashScopeApiKey` (string, 可选) - DashScope API 密钥

#### 模型信息

```typescript
// 获取所有支持的模型
const models = text2image.text2imageModels;

// 模型信息包含：
// - id: 模型 ID
// - name: 模型名称
// - version: 版本号
// - type: 类型（专业版/极速版）
// - description: 描述
// - recommended: 是否推荐
```

## 完整示例

### 图片编辑完整流程

```typescript
import { imageEdit } from '@coffic/image';

async function editImageExample() {
  const apiKey = 'your-dashscope-api-key';
  const imageEditCore = imageEdit.createImageEditCore(apiKey);
  
  // 1. 验证请求参数
  const request = {
    imageUrl: 'https://example.com/image.jpg',
    prompt: '将图片转换为水彩画风格',
    function: 'stylization_all' as const,
    n: 1,
  };
  
  const validation = imageEditCore.validateRequest(request);
  if (!validation.valid) {
    console.error('参数验证失败:', validation.errors);
    return;
  }
  
  // 2. 提交编辑任务
  const result = await imageEditCore.editImage(request);
  if (!result.success) {
    console.error('编辑失败:', result.message);
    return;
  }
  
  console.log('任务已提交，任务ID:', result.taskId);
  
  // 3. 等待一段时间后查询状态
  await new Promise(resolve => setTimeout(resolve, 15000));
  
  // 4. 查询任务状态
  const statusCore = imageEdit.createImageEditStatusCore(apiKey);
  const status = await statusCore.queryStatus({
    taskId: result.taskId!,
    dashScopeApiKey: apiKey,
  });
  
  if (status.success && status.images) {
    console.log('编辑成功！生成的图片:');
    status.images.forEach((url, index) => {
      console.log(`图片 ${index + 1}: ${url}`);
    });
  } else {
    console.log('任务状态:', status.message);
  }
}
```

### 文本转图片完整流程

```typescript
import { text2image } from '@coffic/image';

async function text2imageExample() {
  const apiKey = 'your-dashscope-api-key';
  const text2imageCore = text2image.createText2ImageCore(apiKey);
  
  // 1. 创建生成任务
  const response = await text2imageCore.createTask({
    prompt: '一只可爱的小猫坐在窗台上，阳光洒在它的身上，背景是美丽的城市风景',
    size: '1024*1024',
    n: 1,
    model: 'wan2.2-t2i-plus',
  });
  
  console.log('任务已提交，任务ID:', response.output.task_id);
  
  // 2. 轮询查询任务状态
  let status;
  let attempts = 0;
  const maxAttempts = 20;
  
  do {
    await new Promise(resolve => setTimeout(resolve, 5000));
    status = await text2imageCore.getTaskStatus({
      task_id: response.output.task_id,
      dashScopeApiKey: apiKey,
    });
    
    attempts++;
    console.log(`查询第 ${attempts} 次，状态: ${status.output.task_status}`);
    
    if (status.output.task_status === 'SUCCEEDED') {
      console.log('生成成功！');
      status.output.results.forEach((result, index) => {
        console.log(`图片 ${index + 1}: ${result.url}`);
      });
      break;
    } else if (status.output.task_status === 'FAILED') {
      console.error('生成失败');
      break;
    }
  } while (attempts < maxAttempts);
}
```

## 类型定义

### 图片编辑类型

```typescript
type ImageEditFunction =
  | 'stylization_all'
  | 'stylization_local'
  | 'description_edit'
  | 'description_edit_with_mask'
  | 'remove_watermark'
  | 'inpainting'
  | 'expand'
  | 'super_resolution'
  | 'colorization'
  | 'doodle'
  | 'control_cartoon_feature';

interface ImageEditRequest {
  imageUrl: string;
  prompt: string;
  function?: ImageEditFunction;
  maskUrl?: string;
  n?: number;
  topScale?: number;
  bottomScale?: number;
  leftScale?: number;
  rightScale?: number;
  upscaleFactor?: number;
  model?: string;
  dashScopeApiKey?: string;
}

interface ImageEditResult {
  success: boolean;
  taskId?: string;
  message: string;
  error?: string;
}
```

### 文本转图片类型

```typescript
interface Text2ImageRequest {
  prompt: string;
  size?: string;
  n?: number;
  model?: string;
  dashScopeApiKey?: string;
}

interface TaskStatusResponse {
  request_id: string;
  output: {
    task_id: string;
    task_status: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'CANCELED';
    results: Array<{
      url: string;
      orig_prompt: string;
      actual_prompt: string;
    }>;
  };
  usage: {
    image_count: number;
  };
}
```

## 注意事项

1. **API 密钥**：使用前需要获取阿里云 DashScope API 密钥
2. **异步处理**：图片编辑和生成都是异步任务，需要轮询查询状态
3. **等待时间**：建议在提交任务后等待 15 秒再查询状态
4. **图片格式**：支持 URL 和 Base64 编码格式
5. **字符限制**：提示词最多 800 个字符
6. **生成数量**：单次最多生成 4 张图片

## 许可证

MIT

## 相关链接

- [阿里云 DashScope](https://dashscope.aliyuncs.com/)
- [项目仓库](https://github.com/cofficlab/coffic-box)

## 贡献

欢迎提交 Issue 和 Pull Request！
