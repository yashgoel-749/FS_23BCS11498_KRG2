# Tailwind CSS Fix Instructions

## Problem
Tailwind CSS v4 has breaking changes and requires a different PostCSS plugin setup.

## Solution
Downgraded to Tailwind CSS v3.4.1 which is stable and compatible with the current setup.

## Steps to Fix

1. **Delete node_modules and package-lock.json**:
   ```bash
   cd ems-frontend
   rm -rf node_modules package-lock.json
   ```
   On Windows:
   ```bash
   cd ems-frontend
   rmdir /s /q node_modules
   del package-lock.json
   ```

2. **Reinstall dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## Changes Made

1. **package.json**: Changed Tailwind CSS from `^4.1.17` to `^3.4.1`
2. **tailwind.config.js**: Updated to use CommonJS syntax (module.exports)
3. **postcss.config.js**: Updated to use CommonJS syntax (module.exports)
4. **vite.config.js**: Updated server port to 5173 (Vite default)

## Verification

After reinstalling, the application should start without Tailwind CSS errors. The frontend will be available at `http://localhost:5173`.

