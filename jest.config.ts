import { pathsToModuleNameMapper } from "ts-jest";
import type { JestConfigWithTsJest } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const jestConfig: JestConfigWithTsJest = {
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main/**",
    "!<rootDir>/src/**/index.ts",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  testMatch: ["**/*.spec.ts"],
  transform: {
    "\\.ts$": "ts-jest",
  },
  clearMocks: true,
  setupFiles: ["dotenv/config"],
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  ),
};

export default jestConfig;
