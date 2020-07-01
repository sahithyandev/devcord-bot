import { Client, Collection } from 'discord.js';

export default class extends Client {
	commands: Collection<any, any>;
	queue: Map<any,any>
	config: any;
	
	constructor(config?: any) {
        super();
		// super({
		// 	disableEveryone: true,
		// 	disabledEvents: ['TYPING_START'],
		// });

		this.commands = new Collection();

		this.queue = new Map();

		this.config = config;
	}
};