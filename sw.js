// Service Worker for Aneesh's Portfolio
// Version 1.0.0

const CACHE_NAME = 'aneesh-portfolio-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/assets/optimized/profile_circle.webp',
  '/assets/optimized/placeholder_court_proposal_scanne.webp',
  '/assets/optimized/placeholder_solo_leveling_task_app.webp',
  '/assets/optimized/pomodoro_timer.webp',
  '/assets/optimized/placeholder_clothing_consulting_robot.webp',
  '/assets/optimized/placeholder_court_deadline_tracker.webp',
  '/assets/optimized/placeholder_fitness.webp',
  '/assets/optimized/placeholder_videogamestore.webp',
  '/assets/optimized/venom_running.webp',
  '/assets/optimized/projectiles_placeholder.webp',
  '/assets/optimized/flash_run2_placeholder .webp',
  '/assets/optimized/flash_run_placeholder.webp',
  '/assets/optimized/profile.webp',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Install failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName.startsWith('aneesh-portfolio-') && 
                     cacheName !== CACHE_NAME;
            })
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  // Skip non-GET requests and external APIs
  if (event.request.method !== 'GET' || 
      event.request.url.includes('aneesh-chatbot-backend')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('[SW] Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Network request with caching
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone response for caching
            const responseToCache = response.clone();
            
            // Cache the response for future use
            caches.open(CACHE_NAME)
              .then(cache => {
                // Only cache GET requests for same origin
                if (event.request.method === 'GET' && 
                    event.request.url.startsWith(self.location.origin)) {
                  console.log('[SW] Caching new resource:', event.request.url);
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          })
          .catch(error => {
            console.log('[SW] Network request failed:', error);
            
            // Serve offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            
            // For other requests, you could return a default image, etc.
            throw error;
          });
      })
  );
});

// Background sync for offline chatbot messages (future enhancement)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync-chatbot') {
    console.log('[SW] Background sync triggered');
    event.waitUntil(
      // Handle offline chatbot messages when back online
      handleOfflineChatbotMessages()
    );
  }
});

// Push notifications (future enhancement)
self.addEventListener('push', event => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/assets/optimized/profile_circle.webp',
    badge: '/assets/optimized/profile_circle.webp',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: [
      {
        action: 'view',
        title: 'View Portfolio'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Utility function for future offline message handling
async function handleOfflineChatbotMessages() {
  try {
    // Get stored offline messages
    const offlineMessages = await getStoredOfflineMessages();
    
    if (offlineMessages.length > 0) {
      // Process each message
      for (const message of offlineMessages) {
        await sendChatbotMessage(message);
      }
      
      // Clear stored messages after successful send
      await clearStoredOfflineMessages();
    }
  } catch (error) {
    console.error('[SW] Failed to process offline messages:', error);
  }
}

async function getStoredOfflineMessages() {
  // Implementation would retrieve from IndexedDB
  return [];
}

async function clearStoredOfflineMessages() {
  // Implementation would clear IndexedDB
}

async function sendChatbotMessage(message) {
  // Implementation would send to chatbot API
}