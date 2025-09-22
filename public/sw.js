
// import { FetchEmails } from "../src/utils/APIFetches/APIFetches";

const CACHE_NAME = 'my-cache';
var flowsData = []

self.addEventListener('install', e => {
    console.log('install service worker !!')
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                `/`,
                `/index.html`,
                `static/js/bundle.js`
            ])
                .then(() => self.skipWaiting())
        })
    )
})

self.addEventListener('activate', event => {
    console.log('activating service worker')
    event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
    const getFlowsData = async () => {
        const url = 'http://localhost:3001/table/flows';
        const options = {
            method: 'GET',
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Fetch failed:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }

    // flowsData = getFlowsData()

    // event.respondWith(getFlowsData());
})

// Handle background sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'backgroundSyncData') {
        console.log('service worker background sunc in on')
        // event.waitUntil(runWorkflows())
    }
})

async function runWorkflows() {
    try {
        const workflows = await getPendingWorkflows(flowsData)
        for (const workflow of workflows) {
            await executeWorkflow(workflow)
        }
    } catch (error) {
        console.error('Error running workflows:', error)
    }
}

async function getPendingWorkflows() {
    const db = await openDB('workflowDB', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('workflows')) {
                db.createObjectStore('workflows', { keyPath: 'id', autoIncrement: true })
            }
        }
    })
    const tx = db.transaction('workflows', 'readonly')
    const store = tx.objectStore('workflows')
    const workflows = await store.getAll()
    db.close()
    return workflows
}

async function executeWorkflow(workflow) {
    // Perform workflow actions, e.g., fetch data, post to API, etc.
    console.log('Executing workflow:', workflow)

    // Mark the workflow as completed, or remove it if done
    const db = await openDB('workflowDB', 1)
    const tx = db.transaction('workflows', 'readwrite')
    const store = tx.objectStore('workflows')
    await store.delete(workflow.id)
    db.close()
}

async function openDB(name, version, { upgrade }) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(name, version)
        request.onupgradeneeded = (event) => upgrade(request.result, event.oldVersion, event.newVersion, request.transaction)
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    });
}