'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "4420f50c8b64e57aa473d1f4b8e943b6",
"version.json": "bd31600ea77f5578740144938496d00f",
"index.html": "5bb26cc01ec689a437fb239ae7df70a6",
"/": "5bb26cc01ec689a437fb239ae7df70a6",
"main.dart.js": "67efd470bd18319f9139cdff1a2db62c",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"firebase_options.js": "dfd1b23484f8737520ebcbb472f5230e",
"assets/AssetManifest.json": "711d0ed6752a88adea1d49dfd7e12c74",
"assets/NOTICES": "8f66c4e932b3a4406b7952d86082765b",
"assets/FontManifest.json": "131300eed11bf6c7a43a24d57c375d01",
"assets/AssetManifest.bin.json": "36d6dfcb39495157510a97ba1d8d4751",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "ca664f67fa2dc3f57d4a473535ab3359",
"assets/fonts/MaterialIcons-Regular.otf": "896d8987cc0113ff54f6206f67803ab4",
"assets/assets/images/DelhiCapital.png": "ffa58aef4ce0ad4b1b798e803af33d30",
"assets/assets/images/KKR.png": "462eb2801c8646dfafb1df97aea533b1",
"assets/assets/images/CSK.png": "e66e65f19c5e0239cee6a253cfb33c5a",
"assets/assets/images/SuriseHydrabad.png": "a9aa72569625b4f667dcca51ee86f0f0",
"assets/assets/images/RR.png": "fc8c7e4fb2deb3293cf33c91706dcd49",
"assets/assets/images/img_image_30x30.png": "d58f74f4e9aa4f54f07d96d7a2d3abf0",
"assets/assets/images/RCB.png": "8ebb2ae85c48ee86da79d67663e1c69e",
"assets/assets/images/img_image_16x17.png": "caa33bfa5c23ccb79be3a60f9b897dc9",
"assets/assets/images/img_vector.svg": "adcef42af4670f53be5ede0cdda44145",
"assets/assets/images/LOGO.png": "13dc7027742e098f2ca86662ec600cb0",
"assets/assets/images/Lucknow.png": "2347648a0aea5320e3aeb99f1af254fb",
"assets/assets/images/battle_image.png": "edcd3995673c42da838ba91827a66f2c",
"assets/assets/images/image_not_found.png": "a88029aaad6e6ea7596096c7c451840b",
"assets/assets/images/img_image_3.png": "9575e6db1c47d01dc4c96cdd55db6d3b",
"assets/assets/images/img_image_2.png": "1311388886d4eb5a0260ba647140a857",
"assets/assets/images/img_image.png": "fe78cb75e6554cc40aac7ae36be88ab6",
"assets/assets/images/PunjabKings.png": "56e67aa8900b68d6af05967dbe8197f3",
"assets/assets/images/MI.png": "28f082424d313c766c6631951b7a6f15",
"assets/assets/images/GujratTitans.png": "a6baea4d96a664ea1c7f72cce6fe6025",
"assets/assets/fonts/RobotoMedium.ttf": "68ea4734cf86bd544650aee05137d7bb",
"assets/assets/fonts/RobotoRegular.ttf": "8a36205bd9b83e03af0591a004bc97f4",
"assets/assets/fonts/RobotoBold.ttf": "b8e42971dec8d49207a8c8e2b919a6ac",
"assets/assets/fonts/MontserratSubrayadaRegular.ttf": "7f9c56b7151403db5640a7fa393f6c09",
"assets/assets/fonts/RobotoExtraBold.ttf": "27fd63e58793434ce14a41e30176a4de",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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
