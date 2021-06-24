import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';

const key = 'custom';
const cache = createCache({ key });
// eslint-disable-next-line @typescript-eslint/unbound-method
const { extractCritical, constructStyleTagsFromChunks } = createEmotionServer(cache);

export { extractCritical, constructStyleTagsFromChunks, cache };
