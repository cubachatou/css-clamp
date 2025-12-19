const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const disposable = vscode.commands.registerCommand('css-clamp.convert', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const config = vscode.workspace.getConfiguration('clampExtension');
        const globalMinViewport = config.get('globalMinViewport', 500);
        const globalMaxViewport = config.get('globalMaxViewport', 1500);
        const baseFontSize = config.get('baseFontSize', 14);

        editor.edit(editBuilder => {
            editor.selections.forEach(selection => {
                let range = selection;
                let text = document.getText(range);

                // Regex to match 2 or 4 numbers separated by spaces or commas
                // Matches: num1, num2 [, num3, num4]
                const regex = /(-?\d*\.?\d+)[,\s]+(-?\d*\.?\d+)(?:[,\s]+(-?\d*\.?\d+)[,\s]+(-?\d*\.?\d+))?/;

                // If no text selected, try to find the pattern around the cursor
                if (selection.isEmpty) {
                    const rangeAtCursor = document.getWordRangeAtPosition(selection.active, regex);
                    if (rangeAtCursor) {
                        range = rangeAtCursor;
                        text = document.getText(range);
                    } else {
                        return; // No pattern found
                    }
                }

                const match = text.match(regex);
                if (!match) {
                    return; // Selected text doesn't match
                }

                const minFont = parseFloat(match[1]);
                const maxFont = parseFloat(match[2]);
                let minWidth, maxWidth;

                if (match[3] && match[4]) {
                    minWidth = parseFloat(match[3]);
                    maxWidth = parseFloat(match[4]);
                } else {
                    minWidth = globalMinViewport;
                    maxWidth = globalMaxViewport;
                }

                if (minWidth === maxWidth) {
                    vscode.window.showErrorMessage('Min width and max width cannot be the same.');
                    return;
                }

                const slope = (maxFont - minFont) / (maxWidth - minWidth);
                const yIntercept = minFont - (slope * minWidth);
                const slopeVW = slope * 100;

                const toRem = (px) => parseFloat((px / baseFontSize).toFixed(4)) + 'rem';

                const minRem = toRem(minFont);
                const maxRem = toRem(maxFont);
                const yInterceptRem = parseFloat((yIntercept / baseFontSize).toFixed(4));
                
                // Construct the value part: "0.123rem + 4.56vw"
                // Handle sign of yIntercept for cleaner output
                let valString = `${parseFloat(slopeVW.toFixed(4))}vw`;
                if (yInterceptRem !== 0) {
                    const sign = yInterceptRem > 0 ? '+' : '-';
                    // If positive, we put rem first usually: 1rem + 2vw
                    // If negative, we can do -1rem + 2vw or 2vw - 1rem
                    // Standard CSS calc often puts the variable part last or first.
                    // Let's do: Y-Intercept + Slope
                    valString = `${yInterceptRem}rem + ${valString}`;
                    // Fix double signs if yInterceptRem is negative: "-1rem + 2vw" is fine.
                }

                const clampString = `clamp(${minRem}, ${valString}, ${maxRem})`;

                editBuilder.replace(range, clampString);
            });
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
