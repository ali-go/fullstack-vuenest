import { type App } from 'vue'
import { registerElementIcons } from './registerElementIcons';

export function registerApp(app: App) {
	registerElementIcons(app);
}
