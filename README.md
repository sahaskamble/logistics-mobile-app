Link My Logistics App

Link My Logistics is a modern React Native application designed to streamline logistics operations for businesses. The app provides a unified platform for managing shipments, tracking containers, handling documentation, and accessing quick logistics services.

Features
User Authentication: Secure sign-in and onboarding flow with email verification and document upload.
Home Dashboard: Quick access to priority movements, weightment slips, re-scanning, and container staging.
Sidebar Navigation: Multi-level sidebar for easy navigation across modules (CFS, Warehouse, 3PL, Custom, etc.).
Order Tracking: View recent orders and shipment statuses.
Document Management: Upload and verify PAN Card, GST Certificate, and Address Proof.
Responsive UI: Optimized for mobile devices with animated transitions and modern design.
Support & Security: 24/7 support and secure platform indicators.
Getting Started
Prerequisites
Node.js (>= 16.x)
Yarn or npm
Expo CLI (npm install -g expo-cli)

Installation

Clone the repository:
git clone https://github.com/yourusername/logistics-app.git
cd logistics-app

Install dependencies:
yarn install
# or
npm install

Start the development server:
expo start

Scan the QR code with the Expo Go app or run on an emulator.

Project Structure
src/
  components/    # Reusable UI components (Sidebar, Icon, etc.)
  screens/       # App screens (Home, SignIn, Onboarding, EIRCopyRequest, etc.)
  assets/        # Images and static files
  App.tsx        # Entry point

Customization

Update branding, colors, and icons in the styles objects within each screen.
Add new modules or features by creating new screens and updating navigation logic.
Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
