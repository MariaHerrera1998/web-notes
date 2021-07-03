import App from './App.svelte'
import './firebase'
import 'firebase/auth'

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;