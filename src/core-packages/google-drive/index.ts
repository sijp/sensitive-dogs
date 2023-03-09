import dotenv from "dotenv";
import process from "./src/process";

dotenv.config();

export default process;

export type { ArticleContent, SchemaContent } from "./src/google-adapter";
