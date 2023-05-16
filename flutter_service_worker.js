'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "44abd4f52a5c8ee5b2f0947231ecd6e5",
"assets/assets/fonts/Comfortaa-Bold.ttf": "ba7a464dc19e86479a1fcf8225684d5a",
"assets/assets/fonts/Comfortaa-Light.ttf": "dc4ce4883f73942896c25260f72b25ff",
"assets/assets/fonts/Comfortaa-Medium.ttf": "b08df26bba974c7bf98239928f2871d5",
"assets/assets/fonts/Comfortaa-Regular.ttf": "177d27c79a33cd336e730e404d28513a",
"assets/assets/fonts/Comfortaa-SemiBold.ttf": "c9c219a0f8de926a3c38d73992930a74",
"assets/assets/fonts/Inter-Bold.ttf": "275bfea5dc74c33f51916fee80feae67",
"assets/assets/fonts/Inter-Medium.ttf": "ed533866b5c83114c7dddbcbc2288b19",
"assets/assets/fonts/Inter-Regular.ttf": "079af0e2936ccb99b391ddc0bbb73dcb",
"assets/assets/fonts/Inter-Thin.ttf": "2dce622147cace7b467d9929b7708430",
"assets/assets/icons/arrow_left.png": "73a9da58c7b9fc7dc1766c5b886c360b",
"assets/assets/icons/arrow_right.png": "eb3c8687c619a98687856913b7fd5d6f",
"assets/assets/icons/donstux-base-logo.png": "1ccc85897021c1b330e54bc17247b01c",
"assets/assets/icons/icon-add-white.png": "40b247bcee6320628567e03154710e66",
"assets/assets/icons/icon-envelope-white.png": "109bf1c9d8cc9108f9f899b2bd986e26",
"assets/assets/icons/icon-info-white.png": "d8bbba4b7dc058301e605ae2972dc05b",
"assets/assets/icons/icon-link-white.png": "2da3aac711f89ed77017acd0df37bb36",
"assets/assets/icons/icon-lock-white.png": "b5060f069fc355cb0e999da448889a77",
"assets/assets/icons/icon-logout-white.png": "288fae5237b57b2ef1e19e774bab8167",
"assets/assets/icons/icon-marker-white.png": "26d9d32c8a51d3d4c3e9c55f1fdf0cd8",
"assets/assets/icons/icon-notifications-white.png": "737087c37f1ca2044def6b4fe60a5d15",
"assets/assets/icons/icon-search-white.png": "e30a0a9fd9bdd859e45c94d82480a9b7",
"assets/assets/icons/icon-settings-white.png": "07dc005f67e9bbbc24b5ea0edd60d702",
"assets/assets/icons/icon-time-white.png": "445b219f3026884172936d4aafc7945d",
"assets/assets/icons/icon-user-white.png": "07468415b2f1997068685791188f6928",
"assets/assets/icons/icon-users-white.png": "a0981ce8260555cbb790c0fcbb950fd7",
"assets/assets/main-logo.png": "1ccc85897021c1b330e54bc17247b01c",
"assets/FontManifest.json": "8c30d8773813f5d46fc386e9fc7d0238",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "e917865ab0bada505c97a79fd516bef2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "1ccc85897021c1b330e54bc17247b01c",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "ef2f6d033174f0b3d1229b759fd99663",
"/": "ef2f6d033174f0b3d1229b759fd99663",
"main.dart.js": "a05c8b7578758fe50fd2980dfa7ad34b",
"manifest.json": "3f421ec2995e32b91a2606937e3bdcc3",
"version.json": "3b5c044b04b8f2359a40059906b278de"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
