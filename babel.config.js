module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@/app": "./src/app",
            "@/assets": "./src/assets",
            "@/components": "./src/components",
            "@/contexts": "./src/contexts",
            "@/styles": "./src/styles",
            "@/utils": "./src/utils",
            "@/hooks": "./src/hooks",
            "@/constants": "./src/constants",
            "@/errors": "./src/errors",
            "@/services": "./src/services",
            "@/screens": "./src/screens",
            "@/tests": "./src/tests",
            "@/shared": "./src/shared",
            "@/routes": "./src/routes",
          },
        },
      ],
    ],
  };
};
