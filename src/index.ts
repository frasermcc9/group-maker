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

import dotenv from "dotenv";
import { Bot } from "./Bot";
import Log from "./helpers/Log";

Bot.Get.start().catch((e) => {
    Log.critical("index", "Failed to startup bot and connect.", e);
});

process.on("uncaughtException", (error: Error) => handleException(error, "Uncaught Exception"));
process.on("unhandledRejection", (error: Error) => handleException(error, "Unhandled Promise Rejection"));

function handleException(error: Error, type: "Unhandled Promise Rejection" | "Uncaught Exception"): void {
    Log.error("Base Exception Handler", type + ": " + error.stack);
}