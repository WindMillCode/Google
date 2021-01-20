const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    entry: {
        'triggers': 'src/app/importantExports.ts',
    },
    output: {
        // path: 'dist',
        filename: 'triggers.js' // output: abc.js, cde.js
    },
    plugins: [
        new JavaScriptObfuscator({
            compact: true,
            controlFlowFlattening: false,
            deadCodeInjection: false,
            debugProtection: false,
            disableConsoleOutput: true,
            identifiersPrefix: 'see',
            shuffleStringArray: true,
            selfDefending: true,
            rotateStringArray: true,
            simplify: true,
            splitStrings: false,
            splitStringsChunkLength: 5,      
            transformObjectKeys: true,
        unicodeEscapeSequence:true           
        }, ['triggers.js'])
    ]
};


