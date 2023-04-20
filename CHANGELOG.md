# TypeGuardian Changelog

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2023-04-21

### Added

* Can now have properties typed `any` (telling TypeScript you don't care about the type, not recommended) or `unknown` (essentially deferring a type check, typically only recommended for deprecated properties)

## [1.3.0] - 2023-04-20

### Added

* The correct type check is now made for `Date` types
* Interfaces that extend another interface are now supported

## [1.2.1] - 2023-04-19

### Fixed

* Typeguards for primitive array types, such as `string[]`, were not generated correctly

## [1.2.0] - 2023-04-05

### Added

* Added the ability to generate type assertion functions, which are easier to debug

## [1.1.1] - 2023-04-04

### Added

* Automatically determine version number from `package.json` when generating documentation comments

## [1.1.0] - 2023-03-31

### Added

* Indentation options
* Include `export` keyword if it exists in the input

### Fixed

* Various UI improvements
* Fixed error when determining name of interface

## [1.0.1] - 2023-03-31

### Fixed

* Fixed format of link in generated JSDoc comment above typeguard functions

## [1.0.0] - 2023-03-31

### Added

* Initial commit
