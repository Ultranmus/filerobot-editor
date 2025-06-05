import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    loader: "imgix",
    path: "/",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    'react-filerobot-image-editor',
    'filerobot-image-editor',
    'konva',
  ],
  experimental: { esmExternals: 'loose', },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Avoid bundling canvas on server – Konva uses it in SSR context
      config.externals = [
        ...(config.externals || []),
        {
          canvas: 'commonjs canvas',
        },
      ];
    }

    return config;
  },
};

export default nextConfig;
