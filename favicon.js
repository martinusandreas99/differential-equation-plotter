const fs = require('fs');
const favicons = require('favicons'),
    source = 'src/assets/icon.svg',                     // Source image(s). `string`, `buffer` or array of `string`
    configuration = {
        path: "img/icons/",                                // Path for overriding default icons path. `string`
        manifestRelativePaths: false,
        appName: 'dODEp',                            // Your application's name. `string`
        appShortName: null,                       // Your application's short_name. `string`. Optional. If not set, appName will be used
        appDescription: 'A dynamic ordinary differential equation plotter',                     // Your application's description. `string`
        developerName: 'Martijn Besamusca',                      // Your (or your developer's) name. `string`
        developerURL: null,                       // Your (or your developer's) URL. `string`
        dir: "auto",                              // Primary text direction for name, short_name, and description
        lang: "en-US",                            // Primary language for name and short_name
        background: "#222",                       // Background colour for flattened icons. `string`
        theme_color: "#222",                      // Theme color user for example in Android's task switcher. `string`
        appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
        display: "standalone",                    // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
        orientation: "any",                       // Default orientation: "any", "natural", "portrait" or "landscape". `string`
        scope: "/",                               // set of URLs that the browser considers within your app
        start_url: "/",              // Start URL when launching the application from a device. `string`
        version: "2.0",                           // Your application's version string. `string`
        logging: true,                           // Print logs to console? `boolean`
        pixel_art: false,                         // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
        loadManifestWithCredentials: false,       // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
        icons: {
            // Platform Options:
            // - offset - offset in percentage
            // - background:
            //   * false - use default
            //   * true - force use default, e.g. set background for Android icons
            //   * color - set background for the specified icons
            //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
            //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
            //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
            //
            android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            appleStartup: true,         // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            coast: true,                // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            windows: true,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            yandex: true                // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        }
    },
    callback = function (error, response) {
        if (error) {
            console.log(error.message); // Error description e.g. "An unknown error has occurred"
            return;
        }
        console.log(response.images);   // Array of { name: string, contents: <buffer> }
        console.log(response.files);    // Array of { name: string, contents: <string> }
        console.log(response.html);     // Array of strings (html elements)
        for(const image of response.images) {
            console.log('writing: ' + image.name);
            fs.writeFile('public/img/icons/' + image.name, image.contents, (err)=>{
                if (err) throw err;
                console.log('Saved ' + image.name)
            });
        }
        for(const file of response.files) {
            console.log('writing: ' + file.name);
            fs.writeFile('public/' + file.name, file.contents, (err)=>{
                if (err) throw err;
                console.log('Saved ' + file.name)
            });
        }

        fs.readFile('public/index.html', 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }

            const html = [...response.html];
            html.unshift('<!-- FAVICON PART -->');
            html.push('<!-- END FAVICON PART -->');

            let result = '    ' + data
                .replace(/<!-- FAVICON PART -->((.|\n|\r)*)<!-- END FAVICON PART -->/, html.join('\n    '))
                .replace('img/icons/manifest.json', 'manifest.json')
                .replace('img/icons/browserconfig.xml', 'browserconfig.xml')
                .replace('img/icons/yandex-browser-manifest.json', 'yandex-browser-manifest.json');

            fs.writeFile('public/index.html', result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });

    };

favicons(source, configuration, callback);
