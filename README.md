BridgeJS
=======

**Note**: BridgeJS is currently in alpha state.

BridgeJS aims to make it easy to write JavaScript that'll work with any framework using a [PrototypeJS][2] inspired API. It's created to power some upcoming projects by [Nick Stakenburg][1] and should only be used for that purpose while still in alpha state.

The BridgeJS API is inspired on the good parts of [PrototypeJS][2] with some sugar on top. We don't aim to provide full support for PrototypeJS, all we want is to give you the pure essentials needed to write great apps.

## Using BridgeJS

Insert bridge.js after one of the supported frameworks and it'll automatically insert the required adapter scripts to expose the BridgeJS API.

After that you'll be able to do things like `Bridge.$('id').hide()`, `Bridge.$$('div').invoke("setStyle", { opacity: .5 })` and `Bridge.Function.bind(myFunc, this)` to name a few. At some point I'll probably add some documentation, right now if you want to figure out the API you'll have to work from the existing adapter scripts.

BridgeJS currently provides adapters for the following frameworks:

- [PrototypeJS][2]
- [jQuery][3]

Want to help out? Great! Port away and create an adapter for your framework of choice, that way future scripts using BridgeJS will work with your framework!

  [1]: http://www.nickstakenburg.com
  [2]: http://www.prototypejs.org
  [3]: http://www.jquery.com