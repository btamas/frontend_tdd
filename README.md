[![Build Status](https://travis-ci.org/btamas/frontend_tdd.svg?branch=chat)](https://travis-ci.org/btamas/chat)
[![Coverage Status](https://img.shields.io/coveralls/btamas/frontend_tdd.svg)](https://coveralls.io/r/btamas/frontend_tdd?branch=chat)

Some chat view
============

<a name="module_views/Chat"></a>
#views/Chat
<a name="module_views/Chat..Chat"></a>
##class: views/Chat~Chat
**Extends**: `external:Backbone.Marionette.View`
**Members**

* [class: views/Chat~Chat](#module_views/Chat..Chat)
  * [chat._validateMessage(message)](#module_views/Chat..Chat#_validateMessage)
  * [chat.onSendButtonClick()](#module_views/Chat..Chat#onSendButtonClick)
  * [const: chat.MAX_MESSAGE_LENGTH](#module_views/Chat..Chat#MAX_MESSAGE_LENGTH)

<a name="module_views/Chat..Chat#_validateMessage"></a>
###chat._validateMessage(message)
Validate message

**Params**

- message `String` - Contains the message that should check

**Returns**: `boolean`
**Access**: private
<a name="module_views/Chat..Chat#onSendButtonClick"></a>
###chat.onSendButtonClick()
Handles message send button click

<a name="module_views/Chat..Chat#MAX_MESSAGE_LENGTH"></a>
###const: chat.MAX_MESSAGE_LENGTH
Contains the maximal valid length of a message

