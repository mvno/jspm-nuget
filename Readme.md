jspm-nuget
==========

## What is it?
A jspm registry backend for NuGet, making it possible for jspm to interface
with a NuGet package source.

## Why?

Why on earth would you install jspm packages from a nuget package source?
Honestly, there should be no reason for using this repository backend if you
just want to install different packages downloaded from the Internet. However,
if you already have infrastructure built up around nuget and .nupkg packages,
and you just want to start using jspm, then this package might be just what you
need!

## Installation/configuration

Before usage, you need to have a working nuget.exe in your PATH (e.g. downloaded
from https://www.nuget.org/nuget.exe).

1. To install this module, run `npm install jspm-nuget --save` in the project root
directory.
1. Run `jspm registry create nuget jspm-nuget` to register "nuget" as a registry
resolved by jspm-nuget.
1. Now you can install nuget packages by using `jspm install nuget:My.Package` and
it will be seamlessly integrated with other packages from other sources.

## Package requirements

If you create packages that are meant to be published to nuget and downloaded by
this tool, the package should have a package.json in the root, containing all of
the requirements jspm otherwise has on a package. Otherwise the package install
will fail miserably.

The same goes for trying to install a random package; if the package doesn't have
a package.json, then the install will fail.

## Contributing

This is a bare-bones version (hence the version number). PR's are accepted.
