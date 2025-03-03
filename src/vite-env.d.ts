/// <reference types="vite/client" />
/// <reference types="vitest/globals" />
import '@testing-library/jest-dom'

declare global {
  namespace Vi {
    interface JestAssertion<T = any> extends jest.Matchers<void, T> {
      toBeInTheDocument(): T;
      toBeVisible(): T;
      toHaveTextContent(text: string | RegExp): T;
    }
  }
}