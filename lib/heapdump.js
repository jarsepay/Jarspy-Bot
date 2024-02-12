import {
  isMainThread,
  parentPort
} from 'worker_threads'
import { writeHeapSnapshot } from 'v8'

if (isMainThread) {
	// code
} else {
  parentPort.once('message', (message) => {
    if (message === 'heapdump') {
      // Generate a heapdump for the worker
      // and return the filename to the parent.
      parentPort.postMessage(writeHeapSnapshot());
    }
  });
}