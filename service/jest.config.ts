import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import tsconfig from "./tsconfig.json";

const config: Config = {
  preset: "ts-jest/presets/js-with-ts",
  globalSetup: "<rootDir>/test/globalSetup.ts",
  globalTeardown: "<rootDir>/test/globalTeardown.ts",
  setupFilesAfterEnv: ["<rootDir>/test/setupFile.ts"],
  transformIgnorePatterns: ["/node_modules/(?!dot-prop)", "/dot-prop/"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules", "app"],
  moduleFileExtensions: ["js", "ts", "tsx"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
};

export default config;
