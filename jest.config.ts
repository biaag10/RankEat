import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Importa jest-dom
  testMatch: ['**/?(*.)+(test).[tj]s?(x)'], // Procura arquivos .test.ts, .test.tsx etc.
  moduleNameMapper: {
  '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/mocks/fileMock.js',
},

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json', // Usa seu tsconfig do app
    },
  },
};

export default config;
