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

import { BotEvent } from "../Events.interface";
import { Bot } from "../../Bot";
import Log from "../../helpers/Log";

export default class DebugOutput implements BotEvent {
    private client: Bot = Bot.Get;

    start(): void {
        this.client.on("debug", (info: string) => Log.debug("Bot", info));
        this.client.on("warn", (info: string) => Log.warn("Bot", info));
        this.client.on("error", (info: Error) =>
            Log.error("Bot", "Error occurred", info)
        );

        this.client.on("commandError", (command, error, message) => {
            Log.error(
                "Command Error",
                `Error with ${command.name}. Message sent: ${message.content}.`,
                error
            );
        });
    }
}
