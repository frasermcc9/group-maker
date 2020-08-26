// Copyright 2020 Fraser
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Log from "./helpers/Log";
import { CommandoClient } from "discord.js-commando";
import path from "path";
import { EventManager } from "./EventManager";

export class Bot extends CommandoClient {
    private static readonly bot: Bot = new Bot();

    static get Get(): Bot {
        return this.bot;
    }

    private constructor() {
        Log.logo(process.env.BOTNAME ?? "");
        Log.trace("Bot", "Starting up bot");

        super({
            commandPrefix: "$",
            owner: "202917897176219648",
            disableMentions: "everyone",
        });
    }

    async start(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (process.env.TOKEN === undefined) {
                Log.error("Bot", "No token was provided.");
                return reject(new Error("TOKEN is not provided"));
            }
            this.once("ready", async () => {
                Log.info("Bot", `Bot logged in as ${this.user?.tag}`);
                this.registerCommands();
                this.registerEvents();
                resolve();
            });
            await this.login(process.env.TOKEN).catch((e) => {
                Log.error("Bot", "Bot failed to log in.", e);
                reject();
            });
        });
    }

    private registerCommands(): void {
        this.registry
            .registerDefaultGroups()
            .registerDefaultTypes()
            .registerDefaultCommands({
                unknownCommand: false,
                ping: false,
                prefix: false,
            })
            .registerGroups([["core", "Core bot commands"]])

            .registerCommandsIn({
                filter: /^([^.].*)\.(js|ts)$/,
                dirname: path.join(__dirname, "commands"),
            });
        Log.info("Bot", "Bot commands registered successfully");
    }

    private registerEvents(): void {
        new EventManager().init();
    }
}
