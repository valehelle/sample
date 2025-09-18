## Get started

This app is run using Expo Go.

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

[![Watch demo video](https://img.youtube.com/vi/rPld0T5a1C4/0.jpg)](https://youtube.com/shorts/rPld0T5a1C4?feature=share)

### Design Decisions

I chose React Native because it allows me to build and maintain a single codebase for both Android and iOS. This reduces development time and effort while still delivering a native-like experience on both platforms. It also gives me flexibility to integrate platform-specific features when needed, without duplicating the entire UI logic.

I used Redux Toolkit (RTK) to manage global application state because it provides a clean and predictable way to structure reducers and actions, while reducing boilerplate compared to traditional Redux. For server communication, I used RTK Query since it integrates directly with RTK and handles caching, data fetching, and automatic re-fetching. Combining both allowed me to separate concerns: RTK manages client-side state like UI and user interactions, while RTK Query handles server state and API calls.

For the UI, I deliberately avoided third-party component libraries. Based on my experience, they often make customization difficult and can introduce unnecessary complexity. Instead, I built the UI components myself, which gave me full control over styling and behavior.

### Challenges Faced

The biggest challenge was handling user input for amounts, since it involves currency formatting and depends on the keyboard experience. Many financial apps use custom digit pads, but I chose to rely on the phone’s native numeric keypad for a more natural and accessible experience. To handle formatting, I integrated a third-party library that automatically manages currency display (e.g., commas, decimal points, symbols) while keeping the input controlled.
