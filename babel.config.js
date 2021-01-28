module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "sourceMaps": true,
  "comments": false,
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
  "test": {
  }
}
