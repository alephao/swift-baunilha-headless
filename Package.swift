// swift-tools-version: 6.0

import PackageDescription

let package = Package(
  name: "swift-baunilha",
  platforms: [
    .macOS(.v14)
  ],
  products: [
    .library(name: "BaunilhaHeadless", targets: ["BaunilhaHeadless"])
  ],
  dependencies: [
    .package(url: "https://github.com/pointfreeco/swift-html.git", from: "0.5.0"),
    .package(url: "https://github.com/pointfreeco/swift-dependencies", from: "1.0.0"),
    .package(url: "https://github.com/pointfreeco/swift-snapshot-testing", from: "1.0.0"),
  ],
  targets: [
    .target(
      name: "BaunilhaHeadless",
      dependencies: [
        .product(name: "Html", package: "swift-html"),
        .product(name: "Dependencies", package: "swift-dependencies"),
      ],
      resources: [
        .copy("Resources/js/dialog_859fcbfb.js"),
        .copy("Resources/js/flyout_6162dfdf.js"),
      ]
    ),
    .testTarget(
      name: "BaunilhaHeadlessTests",
      dependencies: [
        "BaunilhaHeadless",
        .product(name: "SnapshotTesting", package: "swift-snapshot-testing"),
      ],
      exclude: ["__Snapshots__"]
    ),
  ]
)
