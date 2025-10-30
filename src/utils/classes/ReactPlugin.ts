import { HistoryAPI } from "./HistoryAPI";
import { HistoryModule } from "./HistoryModule";

export abstract class ReactAppPlugin {
    abstract setup<T>(options?: T): void;
}

export class HistoryAPIPlugin extends ReactAppPlugin {
    setup(): void {
        new HistoryAPI().setupEventDispatchers();
    }
}

export class HistoryModulePlugin extends ReactAppPlugin {
    setup(): void {
        new HistoryModule();
    }
}
