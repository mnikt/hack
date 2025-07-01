class CommunicateManager {
    private static instance: CommunicateManager;
    private listeners: ((communicate: string | undefined) => void)[] = [];
    private communicates: string[] = [];
    private timeoutId: NodeJS.Timeout | null = null;
    private communicateDurationInMs: number = 5000;
    private delayDurationInMs: number = 10000;

    private constructor() {}

    public static getInstance(): CommunicateManager {
        if (!CommunicateManager.instance) {
            CommunicateManager.instance = new CommunicateManager();
        }
        return CommunicateManager.instance;
    }

    public subscribe(listener: (communicate: string | undefined) => void): void {
        this.listeners.push(listener);
    }

    private notify(message: string | undefined = undefined) {
        this.listeners.forEach(listener => listener(message));
    }

    public addImmediate(communicate: string) {
        this.notify(communicate);

        if (this.timeoutId) clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
            this.timeoutUpdate(true);
        }, this.communicateDurationInMs);
    }

    public add(message: string) {
        this.communicates.push(message);

        if (this.timeoutId === null) {
            this.timeoutUpdate(false);
        }
    }

    private timeoutUpdate(afterMessageWasShown: boolean){
        if (afterMessageWasShown){
            this.notify();
            this.timeoutId = setTimeout(() => {
                this.timeoutUpdate(false);
            }, this.delayDurationInMs);
        } else {
            if (this.communicates.length === 0) {
                this.timeoutId = null;
                return;
            }
            this.notify(this.communicates.shift() as string);
            this.timeoutId = setTimeout(() => {
                this.timeoutUpdate(true);
            }, this.communicateDurationInMs);
        }
    }
}

export default CommunicateManager;
