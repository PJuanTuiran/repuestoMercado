const nextSettings = {
    optimizeFonts: false,
    //crossOrigin: "anonymous",
    env: {
        title: "Mercado Repuesto",
        titleDescription: "Su mejor opción en repuestos",
    },
    eslint: {
        // Warning: Dangerously allow production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    }
};

module.exports = nextSettings;
