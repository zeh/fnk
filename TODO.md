=======
OVERALL
-------

* 1. Create fnkcore, fnklib (core library), fnkui (editor)
* 2. Port everything from the JS version
* 2. Start using a build structure similar to KAB, with Gulp: https://github.com/zeh/key-action-binder.ts/blob/master/gulpfile.js
* 3. Create a HTML with AMD loader to be able to test


BUILD
-----

* Use npm to set major/minor/patch versions: http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/
* Setup auto build

Good references: https://github.com/trending/typescript
Project structure using AMD and requirejs: https://github.com/Microsoft/TypeScriptSamples/blob/master/amd/app.ts
Use webpack? https://basarat.gitbooks.io/typescript/content/docs/quick/browser.html
http://www.jbrantly.com/es6-modules-with-typescript-and-webpack/

CORE
----

* Use abstract classes for nodes? https://blogs.msdn.microsoft.com/typescript/2015/09/16/announcing-typescript-1-6/
* Clean up logs, FNK.ts
* Use generics for connectors (data types need to be overhauled)
* Add proper dispose() to nodes
* Implement change booleans, caches, signals?
* Nodes
  * Everything
  * Web Socket
  * IFrames
  * Video
  * NodeRendererItemText: need to interpret multiple text item nodes properly
  * IO Nodes need to have a separate "input" for when the value is changed by the user
  * VisualNodes shouldn't update their visuals immediately on node changes; mark as "dirty" instead and update later?
  * Connector positions are not properly updated the first time they're rendered, because JS doesn't know trhe proper width of the elements (which is CSS-based)


EDITOR
------

* Draw links
* Allow proper selection of several elements
* Get rid of the old example
* Re-add touch screen move events
* Allow a selection window when clicking and dragging on PatchEditor background

* Setup [Electron](http://electron.atom.io/) for a standalone app build
* Also check [VSCode's source](https://github.com/Microsoft/vscode/blob/master/src/main.js) for a good example of structure
* [BlackScreen](https://github.com/shockone/black-screen) is also a TS editor using Electron

* File Format
  * Decide on new file schema
  * Add Meta-data for links and nodes (for size, position)
  * Add save and load

* Help XMLs

* Visual Nodes
  * Draw values
  * How to decide how to draw the values?
  * When resizing, force the cursor to always be correct even when the cursor is not on top of the correct handle? (need to set the cursor of the background to match the current handle cursor)
  * When resizing, if resized to minimum height, then resized up, it resizes as relative values instead of absolute values.. looks weird

* Add process() call
* Add proper dispose() where needed


========
DETAILED
--------


KEYBOARDSTATE
-------------

* Test on other browsers (MSIE?) to make sure it's working
