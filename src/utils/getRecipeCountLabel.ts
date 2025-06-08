export function getRecipeCountLabel(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    let recipeWord = 'рецептов';
    let adjective = 'новых';

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        recipeWord = 'рецептов';
        adjective = 'новых';
    } else if (lastDigit === 1) {
        recipeWord = 'рецепт';
        adjective = 'новый';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        recipeWord = 'рецепта';
        adjective = 'новых';
    }

    return `${count} ${adjective} ${recipeWord}`;
}
