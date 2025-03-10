/*
 * @Author: tommy 468369392@qq.com
 * @Date: 2025-02-27 09:51:47
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-03-10 16:12:55
 * @FilePath: \my-site\app\routes.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE,route
 */
import { type RouteConfig, index,route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),route("demo", "routes/demo.tsx"),route("self", "routes/self.tsx")] satisfies RouteConfig;
