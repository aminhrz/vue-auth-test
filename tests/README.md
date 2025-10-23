# Testing Roadmap

This project does not ship with automated tests yet, but the structure below keeps space for future work.

## Suggested Unit Test Setup

- Framework: [`vitest`](https://vitest.dev/) for a fast, Vite-native runner.
- Component Testing: [`@vue/test-utils`](https://test-utils.vuejs.org/) paired with Vitest snapshots.
- Store Testing: exercise Pinia actions such as `login`, `register`, and the auth initialisation promise to assert state transitions and error handling.
- Form Validation: reuse the Zod schemas directly inside tests to confirm edge cases and translation messages stay in sync.

Create the following scaffolding when you are ready to add tests:

```
/tests
  ├── unit
  │   ├── auth-store.spec.ts
  │   └── auth-form.spec.ts
  └── setup.ts
```

The `setup.ts` file can configure the test environment (e.g. mocking Firebase modules or providing a Pinia testing instance).

## Manual Smoke Test Checklist

Until automated coverage lands, run this quick checklist before publishing:

1. ✅ Register a new account and confirm it routes back to the login screen with a success toast.
2. ✅ Log in with the fresh account and ensure the dashboard renders without unwanted redirects.
3. ✅ Refresh the dashboard and confirm the session persists without an intermediate logout.
4. ✅ Wait at least one hour or manually invalidate credentials to confirm the token refresh logic logs you out gracefully.
5. ✅ Attempt a login with an invalid password to see the translated error surface via toasts.

Document the results of each run inside this folder to keep a history of manual verification.
