# Paircel

![Paircel](https://raw.githubusercontent.com/vmbdev/paircel/main/src/assets/ogpaircel.png)

**Paircel** helps managing the parking spots you've left your vehicles on.

## Prerequisites

Paircel requires [Node.js](https://nodejs.org/) 20 or later installed on your
system to build.

## Getting started

### Setup

First, install the dependencies using NPM:

```bash
npm i
```

We'll need a Google Maps API Key to use the maps inside the application. Go to
the [Google Maps Platform](https://developers.google.com/maps/documentation/javascript/get-api-key) to create one.

Now rename **/src/config.example.ts** to **/src/config.ts** and edit the
GMAPS_API_KEY parameter with the new key you've obtained.

### Running and building

To run Paircel as a PWA in dev mode:

```bash
npm run dev
```

To build Paircel as a PWA:

```bash
npm run build
```

### Building an Android app

Let's init the Android platform on Capacitor:

```bash
npx cap add android
```

Then edit **AndroidManifest.xml** (located in **/android/app/src/main**) and
the following permissions (needed for geolocation).

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

Also, under the application tag, add your Google Maps API key with this:

```xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="YOUR_API_KEY_HERE"
/>
```

Then we'll compile the assets (icons, splash screen) for our application:

```bash
npx capacitor-assets generate
```

Everytime you build the application (npm run build) you need to sync the files:

```bash
npx cap sync
```

Then we can run it in our emulator (or devices, if configured) with:

```bash
npx cap run <platform>
```

Or build it with Xcode/Android Studio with:

```bash
npx cap open <platform>
```

**NOTE**: Paircel uses the Google Maps plugin of Capacitor, so if you want to
restrict the key usage (you should), make sure you allow the API usage of the
platform you're building it into (iOS, Android or web), as the plugin uses
native access to Google Maps.

## Built with

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Capacitor](https://capacitorjs.com/) - Runtime for building Web Native apps
- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Vue I18n](https://vue-i18n.intlify.dev/) - Internationalization plugin for Vue.js
- [Pinia](https://pinia.vuejs.org/) - The intuitive store for Vue.js
- [PrimeVue](https://primevue.org/) - Vue UI component library
- [PrimeFlex](https://primeflex.org) - CSS utility library
- [Dexie.js](https://dexie.org) - A Minimalistic Wrapper for IndexedDB

## License

Paircel is licensed under the MIT License - see the
[LICENSE](https://github.com/vmbdev/paircel/blob/main/LICENSE)
file for more details.
