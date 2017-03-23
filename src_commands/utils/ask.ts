import * as Prompt from 'prompt';

export class Ask {

    public static async TextAsync(question: string): Promise<string> {
        return Ask.Ask(question);
    }

    public static async PasswordAsync(question: string): Promise<string> {
        return Ask.Ask(question, true);
    }

    private static async Ask(question: string, hide: boolean = false): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            Prompt.start();
            Prompt.get([
                {
                    name: question,
                    required: true,
                    hidden: hide
                }
            ], (err, res) => {
                resolve(res[question]);
            })
        });
    }
}