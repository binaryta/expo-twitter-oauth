import * as fb from 'firebase';
import config from 'config';

export const firebase = fb.initializeApp(config);
