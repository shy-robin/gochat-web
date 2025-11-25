# AGENTS.MD - GoChat-Web 开发指南

## 构建/检查/测试命令
- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行ESLint进行代码质量检查
- 没有配置特定的测试运行器（未检测到测试文件）

## 代码风格指南
- 使用TypeScript并启用严格模式
- 遵循Next.js 16+规范和App Router模式
- 使用ES2017+语法和ES模块导入
- 使用React 19函数组件和Hooks
- 尽可能使用React服务器组件，客户端组件需标记'use client'
- 使用Tailwind CSS进行样式设计，采用实用优先的方法
- 使用@/*路径别名的绝对导入（例如 "@/components/Button"）
- 遵循ESLint与Next.js核心Web Vitals和TypeScript规则
- React组件使用PascalCase，函数/变量使用camelCase
- 文件名和文件夹名使用kebab-case
- 导入顺序：外部库，然后是内部导入(@/*)
- 使用React 19的JSX语法
- 遵循无障碍最佳实践（aria标签，语义化HTML）
- 为所有props和复杂对象使用TypeScript接口/类型
- 使用try-catch块和错误边界优雅地处理错误
- 使用环境变量进行配置