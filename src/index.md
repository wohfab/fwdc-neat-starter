---
layout: default
title: FWDC NEAT Starter
path: home
prism: true
---
## Functionality
### Shortcodes

#### getSpotifyCode

Embeds a Spotify Share Code by *Spotify URI*.

``` js
{{ "{% getSpotifyCode id, classes, createLink, showSpotifyLogo, fileType, bg, color, size, mediaType %}" }}
```

{% getSpotifyCode '4x5wzixdnGpq36kopc3oju', 'mx-auto h-auto w-64 fill-current text-pink-600' %}

Options, their default values, and their types:

``` js
id // Str, Spotify URI, required
classes = '' // Str, adds classes to output
createLink = true // Bool, add <a> to output
showSpotifyLogo = true // Bool, shows/hides Spotify Logo
removeBg = true // Bool, removes Background color for transparency
removeFg = true // Bool, Removes Foreground color to use own
fileType = 'svg' // Str, Output format (svg or png)
bg = 'FFFFFF' // Str, HEX-Code for Background color
color = 'black' // Str, HTML-Color (e.g. white, green) for foreground
size = 1000 // Int, Size in px
mediaType = 'track' // Str, Media Type (e.g. playlist)
```


### Quicklinks
