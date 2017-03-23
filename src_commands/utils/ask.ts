import * as Prompt from 'prompt';

/**
 * This class is a wrapper for command-line data input in Node.Js console applications
 */
export class Ask {

    /**
     * Prompts a question to the console and awaits a text input. The typings will be displayed as a plain text.
     * @param question {string} A question to be asked before reading the data
     * @returns {Promise<string>} A promise that will be resolved when the user press ENTER key
     */
    public static async TextAsync(question: string): Promise<string> {
        return Ask.Ask(question);
    }

    /**
     * Prompts a question to the console and awaits a text input. The typing won't be displayed in the console.
     * @param question {string} A question to be asked before reading the data
     * @returns {Promise<string>} A promise that will be resolved when the user press ENTER key
     */
    public static async PasswordAsync(question: string): Promise<string> {
        return Ask.Ask(question, true);
    }


    /**
     * 
     * @param question The string that will be displayed before the user input
     * @param hide {boolean} Indicates if the user input needs to be hidden
     */
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