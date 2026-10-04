import './preview.css';
import '../../creators/map-embed.css';

// Loading the renderer dynamically also catches WebGL setup and module failures.
// The creator theme and embedded layout are already present before this starts.
void import('./preview').then(map => map.mapReady).catch(error => {
  console.error('Map initialization failed.',error);
  const status = document.querySelector<HTMLElement>('[data-status]');
  if (status) status.textContent = 'The map couldn’t load. Reload the page to try again.';
  if (document.documentElement.classList.contains('creator-map')) parent.postMessage({type:'creator:load-error'},location.origin);
});
