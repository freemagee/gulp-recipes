# Gulp 4 and ES6 syntax

Pretty different to Gulp 3.x!

## Overview

This is a made up task. But it does represent a common process. Take some assets. Process them. Either serve them in a development environment. Or compile them for production.

At the moment this example just caters for SCSS to CSS conversion. But it could be extended to babelify ES6 javascript and concat files, process images, process HTML templates etc.

For more info, install the packages then type `gulp -T`.

## Folder structure

Permanent folders are `/src` and `/public`.
Temporary folders are `/temp` and `/dev`.
Production folder is `/build`.

`/build` is completely deleted and rebuilt when using `gulp build`
`/temp` is generated during `gulp build`, but is removed on task completion.
`/dev` is created when using `gulp develop`, but the folder can stick around after the task. It would probably be wise to add `/dev` and `/build` to a `.gitignore` file.