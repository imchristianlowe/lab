# building locally

To build the application locally the eas-cli tool is required and an [eas.json](https://docs.expo.dev/eas/json/) file is needed

Command to run for a development build

```aiignore
npx eas build --platform ios -e development --local
```

Command to run for a production build

```aiignore
npx eas build --platform ios --local --output app.ipa --message "build"
```

Submitting App to the App Store

```aiignore
npx eas submit -p ios --path app.ipa
```

## Doc Links

- [Creating Your First Build with Expo](https://docs.expo.dev/build/setup/)
- [Building App for App Stores](https://docs.expo.dev/deploy/build-project/)
- [Submitting the App to the App Stores](https://docs.expo.dev/deploy/submit-to-app-stores/)
- [Upload Builds to App Store from CLI](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds)
