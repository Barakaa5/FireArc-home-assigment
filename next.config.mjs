/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ensure the JSON file is included in the server build
      config.module.rules.push({
        test: /\.json$/,
        type: "javascript/auto",
        use: [{ loader: "file-loader", options: { name: "[name].[ext]" } }],
      });
    }

    return config;
  },
};

export default nextConfig;
